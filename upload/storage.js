import fs from 'fs';
import FormData from 'form-data';
import axios from 'axios';

async function storage({ file, type, old_name }) {
  const formData = new FormData();
  formData.append('file', fs.createReadStream(file.path));
  type && formData.append('old_name', old_name);
  let response;

  try {
    type
      ? (response = await axios.put(
          `${process.env.STORAGE_URI}/storages/file`,
          formData
        ))
      : (response = await axios.post(
          `${process.env.STORAGE_URI}/storages/file`,
          formData
        ));
  } catch (error) {
    fs.unlinkSync(file.path);
    throw new Error('Failed to save an image!');
  }
  if (response.status !== 201) {
    console.log(response);
    fs.unlinkSync(file.path);
    throw new Error("Can't save your image");
  }
  fs.unlinkSync(file.path);
  const { data } = response.data;
  return data;
}

export default storage;
