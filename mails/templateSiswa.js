function templateMailSiswa(status) {
  switch (status) {
    case 0:
      return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
      crossorigin="anonymous"
    />
    <title>SafeSpeak - Diterima Email</title>
  </head>
  <style>
    @media (max-width: 576px) { 
        .illustration {
            width: 300px;
        }
    }
  </style>
  <body style="background-color: #fff8e3">
    <div
      style="box-shadow: 0px 2px rgba(0, 0, 0, 0.1); background-color: white;"
    >
      <img
        src="https://res.cloudinary.com/dcgp7jyh2/image/upload/v1717680602/SafeSpeak-LogoWord_lolmgp.png"
        alt="SafeSpeak Logo"
        style="width: 150px"
        class="m-2"
      />
    </div>
    <div class="card m-4 p-3">
        <div class="card-body d-flex flex-column align-items-center">
          <img
            src="https://res.cloudinary.com/dcgp7jyh2/image/upload/v1717680603/Group_182_uu61tu.png"
            alt="Check Icon"
            style="width: 100px"
          />
          <h1 class="text-primary m-3">Diterima</h1>
          <p class="fs-5 text-center">
            Laporan kamu sudah masuk ke dalam sistem.</br> Kamu bisa cek di halaman
            <strong>Daftar Laporan</strong> pada situs <a href="https://safespeak.my.id" class="fw-bold text-primary">safespeak.my.id</a>
          </p>
          <img class="illustration" src="https://res.cloudinary.com/dcgp7jyh2/image/upload/v1717680602/Beranda-Dosen-1_wswaje.png" alt="Illustration of a teacher helping a student">
        </div>
      </div>
    </div>
  </body>
</html>
`;
    case 1:
      return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
      crossorigin="anonymous"
    />
    <title>SafeSpeak - Ditindaklanjuti Email</title>
  </head>
  <style>
    @media (max-width: 576px) { 
        .illustration {
            width: 300px;
        }
    }
  </style>
  <body style="background-color: #fff8e3">
    <div
      style="box-shadow: 0px 2px rgba(0, 0, 0, 0.1); background-color: white;"
    >
      <img
        src="https://res.cloudinary.com/dcgp7jyh2/image/upload/v1717680602/SafeSpeak-LogoWord_lolmgp.png"
        alt="SafeSpeak Logo"
        style="width: 150px"
        class="m-2"
      />
    </div>
    <div class="card m-4 p-3">
        <div class="card-body d-flex flex-column align-items-center">
          <img
            src="https://res.cloudinary.com/dcgp7jyh2/image/upload/v1717680603/Group_183_etgf70.png"
            alt="Read Icon"
            style="width: 100px"
          />
          <h1 class="text-primary m-3">Ditindaklanjuti</h1>
          <p class="fs-5 text-center">
            Dosen sudah mereviu laporan dan akan mengontak anda via email/ nomor telepon untuk penindaklanjutan. </br>
            <strong>Silahkan email ke <a href="mailto:safespeak@gmail.com" class="fw-bold text-primary">safespeak@gmail.com</a> jika tidak kunjung dikontak.</strong>
          </p>
          <img class="illustration" src="https://res.cloudinary.com/dcgp7jyh2/image/upload/v1717680602/Beranda-Dosen-1_wswaje.png" alt="Illustration of a teacher helping a student">
        </div>
      </div>
    </div>
  </body>
</html>
`;
    case 2:
      return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
      crossorigin="anonymous"
    />
    <title>SafeSpeak - Selesai Email</title>
  </head>
  <style>
    @media (max-width: 576px) { 
        .illustration {
            width: 300px;
        }
    }
  </style>
  <body style="background-color: #fff8e3">
    <div
      style="box-shadow: 0px 2px rgba(0, 0, 0, 0.1); background-color: white;"
    >
      <img
        src="https://res.cloudinary.com/dcgp7jyh2/image/upload/v1717680602/SafeSpeak-LogoWord_lolmgp.png"
        alt="SafeSpeak Logo"
        style="width: 150px"
        class="m-2"
      />
    </div>
    <div class="card m-4 p-3">
        <div class="card-body d-flex flex-column align-items-center">
          <img
            src="https://res.cloudinary.com/dcgp7jyh2/image/upload/v1717680602/Group_185_mhsi4g.png"
            alt="Thumbs Up Icon"
            style="width: 100px"
          />
          <h1 class="m-3" style="color: #198754;">Selesai</h1>
          <p class="fs-5 text-center">
            Laporan sudah ditindaklanjuti dan ditandakan selesai.</br>
            <strong>Jika anda merasa ini adalah kesalahan</strong>, silahkan email ke <a href="mailto:safespeak@gmail.com" class="fw-bold text-primary">safespeak@gmail.com</a>.
          </p>
          <img class="illustration" src="https://res.cloudinary.com/dcgp7jyh2/image/upload/v1717680602/Beranda-Dosen-1_wswaje.png" alt="Illustration of a teacher helping a student">
        </div>
      </div>
    </div>
  </body>
</html>
`;
    case 3:
      return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
      crossorigin="anonymous"
    />
    <title>SafeSpeak - Ditolak Email</title>
  </head>
  <style>
    @media (max-width: 576px) { 
        .illustration {
            width: 300px;
        }
    }
  </style>
  <body style="background-color: #fff8e3">
    <div
      style="box-shadow: 0px 2px rgba(0, 0, 0, 0.1); background-color: white;"
    >
      <img
        src="https://res.cloudinary.com/dcgp7jyh2/image/upload/v1717680602/SafeSpeak-LogoWord_lolmgp.png"
        alt="SafeSpeak Logo"
        style="width: 150px"
        class="m-2"
      />
    </div>
    <div class="card m-4 p-3">
        <div class="card-body d-flex flex-column align-items-center">
          <img
            src="https://res.cloudinary.com/dcgp7jyh2/image/upload/v1717680602/Group_186_ncqktn.png"
            alt="Thumbs Down Icon"
            style="width: 100px"
          />
          <h1 class="m-3 text-danger">Ditolak</h1>
          <p class="fs-5 text-center">
            Laporan ditolak. Kamu bisa melihat alasan penolakan di halaman detail laporan pada pada situs <a href="https://safespeak.my.id" class="fw-bold text-primary">safespeak.my.id</a></br>
            <strong>Jika anda merasa ini adalah kesalahan</strong>, silahkan email ke <a href="mailto:safespeak@gmail.com" class="fw-bold text-primary">safespeak@gmail.com</a>.
          </p>
          <img class="illustration" src="https://res.cloudinary.com/dcgp7jyh2/image/upload/v1717680602/Beranda-Dosen-1_wswaje.png" alt="Illustration of a teacher helping a student">
        </div>
      </div>
    </div>
  </body>
</html>
`;
  }
}

export default templateMailSiswa;
