const fs = require('fs')
const crypto = require('crypto')
const axios = require('axios')

function getHarga(ariekey, persen) {

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
      let data = JSON.stringify(response.data.data);

      // Simpan data ke file
      fs.writeFileSync("./Pengaturan/database/dataariepulsa.json", data);
      let dataup = JSON.parse(fs.readFileSync("./Pengaturan/database/dataariepulsa.json"));

      let persentase = persen;
      dataup.forEach((i) => (i.price));
      let updatedData = JSON.stringify(dataup);
      fs.writeFileSync("./Pengaturan/database/dataariepulsa.json", updatedData);
    })

    .catch((error) => {
      console.log("Error");
    });
}

module.exports = { getHarga }