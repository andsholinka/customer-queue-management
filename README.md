## Built with

* [ExpressJs](https://expressjs.com/) - The web framework used
* [MongoDB](https://www.mongodb.com/1) - Database
* [Mongoose](https://mongoosejs.com/) - Elegant mongodb object modeling for node.js

Have implemented pagination to make it more effective and efficient

## Getting Started
```
clone this repository
npm install
setup the .env
run start.dev
```
## API DOC
* [LINK](https://documenter.getpostman.com/view/13775058/TzeRrAnu) - Postman

## Konversi dari Postman ke Swagger
1. Pada Collection Postman yang mau di konversi pilih titik tiga lalu pilih Export
2. Buat akun di website [APIMATIC](https://www.apimatic.io/)
3. Pada halaman dashboar APIMATIC pilih Transform API
4. Choose file hasil dari Export langkah pertama
5. Pada kolom Export Format pilih OpenAPI/Swagger v2.0(YAML) lalu convert
6. Klik Proceed maka akan terdownload file yang sudah di convert
7. Masukan file tadi ke folder backend
8. Install package yamljs
9. Pada file index.js tambahkan baris koding seperti dibawah ini
```
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./(nama_file).yaml');

var options = {
  customCss: '.swagger-ui .topbar { display: none }',
}

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
```
10. Lakukan perubahan pada file .yaml tadi sesuai kebutuhan, seperti: title, host, basePasth, dll.
11. Untuk mengeceknya buka browser kesayangan anda lalu ketikkan localhost:PORT/api-docs
12. Jika ada yang ingin ditanyakan feel free to ask me [Andrey](https://t.me/andsholinka)