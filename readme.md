
# SafeSpeak

Website Portal Laporan & Informasi Mahasiswa seputar Kekerasan Seksual dan Bullying bagian Front End.


## Installation

Clone project from github

```bash
  git clone https://github.com/fidojahfal/SafeSpeak_BE.git
  cd SafeSpeak_BE
```
Install SafeSpeak_BE with npm

```bash
  npm install
```    
Make new environment file from .env.example

```bash
  cp .env.example .env
```
Fill the new environment copied from example

```bash
  MONGO_URI= //Use your own link to mongodb database
  SECRET_JWT= //Fill with your own secret
  BCRYPT_SALT= //Use number to fill this salt
  GMAIL_USER= //Fill with your own gmail_user
  GMAIL_PASS= //Fill with your own gmail_pass
  STORAGE_URI= //Use your storage service you trust
```
Run project SafeSpeak_BE with npm run

```bash
  npm run dev
```
or

```bash
  npm run start
```
