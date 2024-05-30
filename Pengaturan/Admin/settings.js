const chalk = require("chalk")
const fs = require("fs")

//______________________[ PERLENGKAPAN ]_______________________//
global.owner = '6285174332583' //Ganti Jadi No Lu
global.ownerku = ['6285174332583']
global.ownerNomor = '6285174332583'
global.botname = 'ARIE PULSA' //Ganti Jadi Nama Bot Lu
global.namabot = 'ARIE PULSA' 
global.ownername = 'ARIE PULSA' 
global.ownerName = 'ARIE PULSA' //Ganti Jadi Nama Lu
global.footer = 'AriePulsa'
global.packname = `BotWa` 
global.struk = `ARIE` 
global.toko = `©PT ARIE DIGITAL PAYMENT`
global.youtube = `@ariepulsa7022`
global.sessionName = `arie`

//______________________[ THUMBNAIL ]_______________________//
global.qris = fs.readFileSync("./image/qris.png") //Sesuaikan Dengan Nama Gambar Qris Di Folder Image

//______________________[ GC MEMBER ]_______________________//
global.gcresmi = 'https://chat.whatsapp.com/LSCxKfjTlEq5E1Cw9oIxh3' //Ganti Dengan Link Groupmu

//______________________[ DATA REKENING ]_______________________//
global.rekening = `

》 *SCAN QRIS HANYA UNTUK DANA SELAIN DANA UANG AKAN DITAHAN 1x24 JAM*

》 Silahkan Transfer Ke Salah Satu Rekening
》 DANA/SHOPEE/GOPAY : 085174332383
》 MANDIRI : 1050014470409
》 BRI : 109201031246504
》 BCA : 8645201597
》 SEABANK : 901836805900
》 JENIUS / BTPN : 90370370861
》 BANK JAGO : 109313643765
》 *ATAS NAMA : AZHARI ROMAHI*

`

//______________________[ INFO UPLEVEL ]_______________________//
global.hargalevel = `Keuntungan UPLEVEL Kamu Akan Mendapatkan Harga Special Dan Yang Pasti Lebih Murah.
Khusus Level Partner Akan Mendapatkan Pelayanan Khsusus Dari Kami.

LIST BIAYA UPLEVEL :
*GOLD : Rp 50.000*
*PLATINUM : Rp 100.000*
*PARTNER : Rp 150.000*
`

global.mess = {
    wait: 'Sedang DiProses',
    succes: 'Sukses',
    admin: 'Layanan Khsusus Admin',
    botAdmin: 'BOT Harus Jadi Admin',
    owner: 'Layanan Khusus Owner',
    group: 'Hanya Bisa Didalam Group',
    private: 'Silahkan Private Chat Dengan BOT',
    bot: 'Fitur Special BOT',
    error: 'Layanan Error',    
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update'${__filename}'`))
	delete require.cache[file]
	require(file)
})