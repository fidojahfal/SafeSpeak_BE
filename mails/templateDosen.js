function templateMailDosen(name = `Anonymous`) {
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
    @media (max-width: 992px) { 
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
          <h1 class="text-primary m-3 text-center">Terdapat laporan baru.</h1>
          <p class="fs-5 text-center">
            Laporan ini dibuat oleh ${name}</br> Laporan bisa dicek di halaman
            <strong>Daftar Laporan</strong> pada situs <a href="https://safespeak.my.id/reports" class="fw-bold text-primary">safespeak.my.id</a>
          </p>
          <img class="illustration" src="https://res.cloudinary.com/dcgp7jyh2/image/upload/v1717693945/Gambar_at_Dosen_dzrbww.png" alt="Illustration of a teacher helping a student">
        </div>
      </div>
    </div>
  </body>
</html>
`;
}

export default templateMailDosen;
