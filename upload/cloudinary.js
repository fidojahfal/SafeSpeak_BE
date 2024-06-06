import crypto from 'crypto';

async function cloudinary(type, image, publicId) {
  function createSignature(paramsToSign, apiSecret) {
    const sortedParams = Object.keys(paramsToSign)
      .sort()
      .map((key) => `${key}=${paramsToSign[key]}`)
      .join('&');
    return crypto
      .createHash('sha1')
      .update(sortedParams + apiSecret)
      .digest('hex');
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const paramsToSign =
    type === 'replace'
      ? {
          timestamp,
          upload_preset: process.env.CLOUD_TOKEN,
          public_id: publicId,
        }
      : {
          timestamp,
          upload_preset: process.env.CLOUD_TOKEN,
        };

  const signature = createSignature(
    paramsToSign,
    process.env.CLOUD_API_SECRET_KEY
  );

  const formData = new FormData();
  const blob = new Blob([image.buffer]);
  formData.append('file', blob);
  formData.append('upload_preset', process.env.CLOUD_TOKEN);
  formData.append('api_key', process.env.CLOUD_API_KEY);
  formData.append('signature', signature);
  formData.append('timestamp', timestamp);
  type === 'replace' && formData.append('public_id', publicId);

  let uploadImage;
  try {
    uploadImage = await fetch(process.env.CLOUD_LINK_UPLOAD, {
      method: 'POST',
      body: formData,
    });
  } catch (error) {
    throw new Error(error.message);
  }

  if (!uploadImage.ok) {
    throw new Error(error.message);
  }
  const responseJson = await uploadImage.json();
  return responseJson.secure_url;
}

export default cloudinary;
