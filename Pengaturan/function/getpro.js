const fs = require('fs')
const axios = require('axios')

function getProduk(ariekey, persen) {
 

  var config = {
    method: "POST", // Set the HTTP method to POST
    url: "https://ariepulsa.com/api/pulsa-botwa", // Set the target URL
    data: new URLSearchParams(Object.entries({
      api_key: ariekey,
      action: 'layanan',
      })),
  };

  axios(config)
    .then(function (response) {
      let datanya = JSON.stringify(response.data.data);

      // Simpan data ke file
      fs.writeFileSync("./Pengaturan/database/dataariepulsa.json", datanya);
      let dataup = JSON.parse(fs.readFileSync("./Pengaturan/database/dataariepulsa.json"));

      let persentase = persen;
      dataup.forEach((i) => (i.price += i.price * (persentase / 100) + 100));
      let updatedData = JSON.stringify(dataup);
      fs.writeFileSync("./Pengaturan/database/dataariepulsa.json", updatedData);
    })

    .catch((error) => {
      console.log(false);
    });
}

module.exports = { getProduk }