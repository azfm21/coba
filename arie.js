require('./Pengaturan/Admin/settings')
const { default: arieConnect, downloadContentFromMessage, makeWASocket, prepareWAMessageMedia, makeWALegacySocket, BufferJSON, Browsers, initInMemoryStore, extractMessageContent, makeInMemoryStore, proto, delay, DisconnectReason, useMultiFileAuthState, fetchLatestBaileysVersion, jidDecode, areJidsSameUser, PHONENUMBER_MCC, WA_DEFAULT_EPHEMERAL, relayMessage, getContentType, generateWAMessage, generateWAMessageContent, generateForwardMessageContent, generateWAMessageFromContent } = require("@whiskeysockets/baileys")
const axios = require('axios')
const FileType = require('file-type')
const fetch = require('node-fetch')
const crypto = require('crypto')
const fs = require('fs')
const { sizeFormatter} = require("human-readable")
const format = sizeFormatter()
const os = require('os');
const { exec } = require("child_process");
const speed = require('performance-now');
const util = require('util')
const chalk = require('chalk')
const short = require('short-uuid');
const moment = require('moment-timezone');
const md5 = require('md5');
const FormData = require("form-data");
const { clockString, tanggal, getTime, isUrl, sleep, runtime, fetchJson, getBuffer, jsonformat } = require('./lib/myfunc')
const { getProduk } = require('./Pengaturan/function/getpro')
const { getHarga } = require('./Pengaturan/function/getHarga')
const { color, bgcolor } = require('./Pengaturan/function/color')
const { fee_cus, fee_owner, batas_time, servpaydis, merchpaydis, keypaydis, prpartner, prplatinum, prgold, prmember, ariekey, nomorKu } = require("./Pengaturan/function/apikey")
const banned = JSON.parse(fs.readFileSync("./Pengaturan/database/block.json"))

global.tanggalserver = `${moment.tz('Asia/Jakarta').format('DD/MM/YY')}`;
global.waktuserver = `${moment.tz('Asia/Jakarta').format('HH:mm:ss')}`; 

let http = require('http')
            http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, function(resp) {
            resp.on('data', function(ip) {
                (global.ipserver = ip);
            })
          })

global.db = JSON.parse(fs.readFileSync('./Pengaturan/database/database.json'))
if (global.db) global.db = {
sticker: {},
database: {}, 
game: {},
others: {},
settings: {},
users: {},
chats: {},
...(global.db || {})
}

//=================================================

  //=================================================

//━━━━━━━━━━━━━━━[ PREFIX ]━━━━━━━━━━━━━━━━━//

module.exports = arie = async (arie, m, chatUpdate, store) => {
try {
  const gakbisaowner = `${owner}@s.whatsapp.net`
  const body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype === 'messageContextInfo') ? (m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
  const budy = (typeof m.text == 'string' ? m.text : '')
  const prefix = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/gi) : "#";
  const chath = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype === 'messageContextInfo') ? (m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
        const command = body.replace(prefix, "").trim().split(/ +/).shift().toLowerCase();
        const args = body.trim().split(/ +/).slice(1);
        const { type, quotedMsg, mentioned, now, fromMe } = m
        const isCmd = body.startsWith(prefix)
        const from = m.key.remoteJid
        
        const pushname = m.pushName || "No Name"
        const botNumber = await arie.decodeJid(arie.user.id)
         
         const groupMetadata = m.isGroup ? await arie.groupMetadata(m.chat).catch(e => {}) : ''
        const groupName = m.isGroup ? groupMetadata.subject : ''
         const participants = m.isGroup ? await groupMetadata.participants : ''
        const groupAdmins = m.isGroup ? await participants.filter(v => v.admin !== null).map(v => v.id) : ''
        const groupOwner = m.isGroup ? groupMetadata.owner : ''
        const groupMembers = m.isGroup ? groupMetadata.participants : ''
    	const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
        const isGroupAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
    	const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
      const isBan = banned.includes(m.sender)
         
        const itsMe = m.sender == botNumber ? true : false
        const text = q = args.join(" ")
        const quoted = m.quoted ? m.quoted : m
        const mime = (quoted.msg || quoted).mimetype || ''
        const jam = moment.tz('asia/jakarta').format('HH:mm:ss')
        const tanggal = moment().tz("Asia/Jakarta").format("ll")
		const dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
		const ucapanWaktu = "Selamat "+dt.charAt(0).toUpperCase() + dt.slice(1)
		
		const isMedia = /image|video|sticker|audio/.test(mime)
        const isImage = (type == 'imageMessage')
		const isVideo = (type == 'videoMessage')
		const isAudio = (type == 'audioMessage')
		const isSticker = (type == 'stickerMessage')
		
		const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
        const isQuotedLocation = type === 'extendedTextMessage' && content.includes('locationMessage')
        const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
        const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
        const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
        const isQuotedContact = type === 'extendedTextMessage' && content.includes('contactMessage')
        const isQuotedDocument = type === 'extendedTextMessage' && content.includes('documentMessage')    
            
        const sender = m.isGroup ? (m.key.participant ? m.key.participant : m.participant) : m.key.remoteJid
        const isOwner = [`${owner}@s.whatsapp.net`] == sender ? true : ["6285174332583@s.whatsapp.net"].includes(sender) ? true : false
        const senderNumber = sender.split('@')[0]   
        const arg = budy.trim().substring(budy.indexOf(" ") + 1);
        const arg1 = arg.trim().substring(arg.indexOf(" ") + 1);
        const mentionUser = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]      
try {

  const isNumber = x => typeof x === 'number' && !isNaN(x)
  const user = global.db.users[m.sender]
  if (typeof user !== 'object') global.db.users[m.sender] = {}
  const chats = global.db.chats[m.chat]
  if (typeof chats !== 'object') global.db.chats[m.chat] = {}
  if (user) {
  if (!isNumber(user.afkTime)) user.afkTime = -1
  if (!('afkReason' in user)) user.afkReason = ''
  } else global.db.users[m.sender] = {
  afkTime: -1,
  afkReason: '',
  }

ppnyaimg = await arie.sendMessage(m.sender, 'image')
} catch (err) {
ppnyaimg = 'https://telegra.ph/file/558480616af8c2f9efa9f.jpg'
}
//ppnyaimg = await reSize(ppnyaimg, 300, 300)

// Public & Self
if (!arie.public) {
  if (!m.key.fromMe && !isOwner) return
  }


const reply = (teks) => {arie.sendMessage(from, { text: teks }, { quoted: m })}
for (let jid of mentionUser) {
  let user = global.db.users[jid]
  if (!user) continue
  let afkTime = user.afkTime
  if (!afkTime || afkTime < 0) continue
  let reason = user.afkReason || ''
  m.reply(`Jangan tag dia bang, orangnya lagi AFK\n
  ${reason ? 'Alasan : ' + reason : 'Alasan : Nothing.'}
  Selama ${clockString(new Date - afkTime)}
  `.trim())
  }
    
  var mdu = ['red','green','yellow','blue','magenta','cyan','white']
  var halalu = mdu[Math.floor(Math.random() * mdu.length)]
  var mdo = ['red','green','yellow','blue','magenta','cyan','white']
  var halalo = mdo[Math.floor(Math.random() * mdo.length)]
  var mdi = ['red','green','yellow','blue','magenta','cyan','white']
  var halali = mdi[Math.floor(Math.random() * mdi.length)]
  var mda = ['red','green','yellow','blue','magenta','cyan','white']
  var halala = mda[Math.floor(Math.random() * mda.length)]
  var mde = ['red','green','yellow','blue','magenta','cyan','white']
  var halale = mde[Math.floor(Math.random() * mde.length)]
  
  if (m.message) {
        arie.readMessages([m.key]);
        console.log(
          chalk.black(chalk.bgWhite("[ CMD ]")),
          chalk.black(chalk.bgGreen(new Date())),
          chalk.black(chalk.bgBlue(budy || m.mtype)) + "\n" + chalk.magenta("=> From"),
          chalk.green(pushname),
          chalk.yellow(m.sender) + "\n" + chalk.blueBright("=> In"),
          chalk.green(m.isGroup ? pushname : "Chat Pribadi", m.chat)
        );
      }
  
  //if (isCmd) {
  //console.log(chalk.yellow.bgCyan.bold(' AR-BOTz '), color(`[ PESAN MASUK ]`, `${halalu}`), color(`FROM`, `${halalo}`), color(`${pushname}`, `${halali}`), color(`Text :`, `${halala}`), color(`${body}`, `${halale}`))
  // }
    
    
async function sendarieMessage(chatId, message, options = {}){
    let generate = await generateWAMessage(chatId, message, options)
    let type2 = getContentType(generate.message)
    if ('contextInfo' in options) generate.message[type2].contextInfo = options?.contextInfo
    if ('contextInfo' in message) generate.message[type2].contextInfo = message?.contextInfo
    return await arie.relayMessage(chatId, generate.message, { messageId: generate.key.id })
}

//let rn = ['recording','composing']
//let jd = rn[Math.floor(Math.random() * rn.length)];

if (command) {
//arie.sendPresenceUpdate(jd, from)
arie.readMessages([m.key])
}
function formatmoney(n, opt = {}) {
  if (!opt.current) opt.current = "IDR"
  return n.toLocaleString("id", { style: "currency", currency: opt.current })
}

function acakindong(min, max = null) {
  if (max !== null) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
  } else {
  return Math.floor(Math.random() * min) + 1
  }
}


const sendContact = (jid, numbers, name, quoted, mn) => {
let number = numbers.replace(/[^0-9]/g, '')
const vcard = 'BEGIN:VCARD\n' 
+ 'VERSION:3.0\n' 
+ 'FN:' + name + '\n'
+ 'ORG:;\n'
+ 'TEL;type=CELL;type=VOICE;waid=' + number + ':+' + number + '\n'
+ 'END:VCARD'
return arie.sendMessage(from, { contacts: { displayName: name, contacts: [{ vcard }] }, mentions : mn ? mn : []},{ quoted: quoted })
}

function pickrandoms() {
  var symbols = '0123456789';
  var symbolLength = symbols.length;
  var randomString = 'P';
  for (var i = 0; i < 2; i++) {
    randomString += symbols.charAt(Math.floor(Math.random() * symbolLength));
  }
  randomString += '';
  for (var j = 0; j < 4; j++) {
    randomString += symbols.charAt(Math.floor(Math.random() * symbolLength));
  }
  return randomString;
}

let koderefe =pickrandoms(3);

function pickrandomref() {
  var symbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var symbolLength = symbols.length;
  var currentDate = new Date();
  
  // Generate a random 3-letter symbol
  var randomSymbol = '';
  for (var i = 0; i < 3; i++) {
    randomSymbol += symbols.charAt(Math.floor(Math.random() * symbolLength));
  }

  var randomString = 'ARIE' +
    currentDate.getFullYear() +
    ('0' + (currentDate.getMonth() + 1)).slice(-2) +
    ('0' + currentDate.getDate()).slice(-2) + randomSymbol;

  return randomString;
}
    
let koderef = pickrandomref()

function generateRandomString(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  const randomBytes = crypto.randomBytes(length);

  for (let i = 0; i < length; i++) {
    const byte = randomBytes[i] % chars.length;
    result += chars.charAt(byte);
  }

  return result.toLowerCase();
}

    const mentions = (teks, memberr, id) => {
(id == null || id == undefined || id == false) ? arie.sendMessage(from, {text: teks.trim(), jpegThumbnail: global.ariemenu}, text, { sendEphemeral: true, contextInfo: { mentions: memberr } }) : arie.sendMessage(from, {text: teks.trim(), jpegThumbnail: global.ariemenu}, text, { sendEphemeral: true, quoted: m, contextInfo: { mentions: memberr } })
}
    
const randomString = generateRandomString(5);


function boolToString(value) {
  return value ? 'iyah' : 'tidak';
}



const formatp = sizeFormatter({
  std: 'JEDEC', //'SI' = default | 'IEC' | 'JEDEC'
  decimalPlaces: 2,
  keepTrailingZeroes: false,
  render: (literal, symbol) => `${literal} ${symbol}B`,
})

const isUrl = (url) => {
  return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
}

const jsonformat = (string) => {
  return JSON.stringify(string, null, 2)
}

//=================================================
async function loading () {
  var arbotz = [
  "⌛10%",
  "⏳20%",
  "⏳30%",
  "⏳40%",
  "⌛50%",
  "⏳60%",
  "⏳70%",
  "⏳80%",
  "⏳90%",
  "⌛100%",
  "Loading Selesai."
  ]
let { key } = await arie.sendMessage(from, {text: 'ʟᴏᴀᴅɪɴɢ...'})//Pengalih isu

for (let i = 0; i < arbotz.length; i++) {
/*await delay(10)*/
await arie.sendMessage(from, {text: arbotz[i], edit: key });//PESAN LEPAS
}
}
//=================================================
    
// Berfungsi Untuk Hit Api & Mengirim Data Headers
const fetchJson = async (url, options) => {
  try {
      options ? options : {}
      const res = await axios({
          method: 'GET',
          url: url,
          headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
          },
          ...options
      })
      return res.data
  } catch (err) {
      return err
  }
}


const repPy = {
	key: {
		remoteJid: '0@s.whatsapp.net',
		fromMe: false,
		id: 'AR-BOTz',
		participant: '0@s.whatsapp.net'
	},
	message: {
		requestPaymentMessage: {
			currencyCodeIso4217: "USD",
			amount1000: 999999999,
			requestFrom: '0@s.whatsapp.net',
			noteMessage: {
				extendedTextMessage: {
					text: 'Arie Pulsa'
				}
			},
			expiryTimestamp: 999999999,
			amount: {
				value: 91929291929,
				offset: 1000,
				currencyCode: "USD"
			}
		}
	}
}
      
let r = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'))
let sos = JSON.parse(fs.readFileSync('./Pengaturan/database/sosmedariepulsa.json'))
let ubt = JSON.parse(fs.readFileSync('./Pengaturan/database/user.json'))

const daftar = () => {
m.reply(`*Hai Kak👋*\nKamu belum terdaftar di database.\nSilahkan ketik _*#daftar*_ untuk menggunakan command ini.`)
}
let user = JSON.parse(fs.readFileSync('./Pengaturan/database/user.json'))
const cek = (satu, dua) => { 
let x1 = false
Object.keys(user).forEach((i) => {
if (user[i].id == dua){x1 = i}})
if (x1 !== false) {
if (satu == "id"){ return user[x1].id }
if (satu == "product_name"){ return user[x1].product_name }
if (satu == "tanggal_trx"){ return user[x1].tanggal_trx }    
if (satu == "saldo"){ return user[x1].saldo }
if (satu == "level"){ return user[x1].level }
if (satu == "upharga"){ return user[x1].upharga }
 
if (satu == "price"){ return user[x1].price }
if (satu == "tanggal_deposit"){ return user[x1].tanggal_deposit }    
if (satu == "deposit"){ return user[x1].deposit }
if (satu == "reff_deposit"){ return user[x1].reff_deposit }
if (satu == "link_sc"){ return user[x1].link_sc }
 
if (satu == "desc"){ return user[x1].desc }
if (satu == "status"){ return user[x1].status }    
if (satu == "buyer_sku_code"){ return user[x1].buyer_sku_code }
if (satu == "pw_script"){ return user[x1].pw_script }    
if (satu == "tujuan"){ return user[x1].tujuan }
if (satu == "reff"){ return user[x1].reff }
if (satu == "fee_owner"){ return user[x1].fee_owner }
}
if (x1 == false) { return null } 
}
let sett = (satu, dua, tiga) => { 
Object.keys(user).forEach((i) => {
if (user[i].id == dua){
if (satu == "+saldo")
{ user[i].saldo += tiga
fs.writeFileSync('./Pengaturan/database/user.json', JSON.stringify(user))}
if (satu == "-saldo"){
user[i].saldo -= tiga
fs.writeFileSync('./Pengaturan/database/user.json', JSON.stringify(user))}
if (satu == "price"){ user[i].price = tiga
fs.writeFileSync('./Pengaturan/database/user.json', JSON.stringify(user))}
if (satu == "level"){ user[i].level = tiga
fs.writeFileSync('./Pengaturan/database/user.json', JSON.stringify(user))}
if (satu == "upharga"){ user[i].upharga = tiga
fs.writeFileSync('./Pengaturan/database/user.json', JSON.stringify(user))}
if (satu == "tanggal_trx"){ user[i].tanggal_trx = tiga
fs.writeFileSync('./Pengaturan/database/user.json', JSON.stringify(user))}    
if (satu == "tanggal_deposit"){ user[i].tanggal_deposit = tiga
fs.writeFileSync('./Pengaturan/database/user.json', JSON.stringify(user))} 
 if (satu == "status"){ user[i].status = tiga
fs.writeFileSync('./Pengaturan/database/user.json', JSON.stringify(user))}
if (satu == "product_name"){ user[i].product_name = tiga
fs.writeFileSync('./Pengaturan/database/user.json', JSON.stringify(user))}
if (satu == "reff"){ user[i].reff = tiga
fs.writeFileSync('./Pengaturan/database/user.json', JSON.stringify(user))}
if (satu == "link_sc"){ user[i].link_sc = tiga
fs.writeFileSync('./Pengaturan/database/user.json', JSON.stringify(user))}
if (satu == "deposit"){ user[i].deposit = tiga
fs.writeFileSync('./Pengaturan/database/user.json', JSON.stringify(user))}
if (satu == "reff_deposit"){ user[i].reff_deposit = tiga
fs.writeFileSync('./Pengaturan/database/user.json', JSON.stringify(user))}

if (satu == "status_deposit"){ user[i].status_deposit = tiga
fs.writeFileSync('./Pengaturan/database/user.json', JSON.stringify(user))}
if (satu == "status_deposit_otomatis"){ user[i].status_deposit_otomatis = tiga
fs.writeFileSync('./Pengaturan/database/user.json', JSON.stringify(user))}
    
if (satu == "buyer_sku_code"){ user[i].buyer_sku_code = tiga
fs.writeFileSync('./Pengaturan/database/user.json', JSON.stringify(user))}
 if (satu == "pw_script"){ user[i].pw_script = tiga
fs.writeFileSync('./Pengaturan/database/user.json', JSON.stringify(user))}  
if (satu == "tujuan"){ user[i].tujuan = tiga
fs.writeFileSync('./Pengaturan/database/user.json', JSON.stringify(user))}
if (satu == "desc"){ user[i].desc = tiga
fs.writeFileSync('./Pengaturan/database/user.json', JSON.stringify(user))}
if (satu == "fee_owner"){ user[i].fee_owner = tiga
fs.writeFileSync('./Pengaturan/database/user.json', JSON.stringify(user))}
}})
}
if(cek("id", m.sender) == null){
user.push({id: m.sender, level: "member", upharga: 5, product_name: "", tujuan: "", price: 0, saldo: 0, reff: "", buyer_sku_code: "", tanggal_trx: "", status: true, status_deposit: true, status_deposit_otomatis: true, desc: "", deposit: "", reff_deposit: true, tanggal_deposit: "", link_sc: "", pw_script: "", fee_owner: 0})
fs.writeFileSync('./Pengaturan/database/user.json', JSON.stringify(user))
let te = `*PENDAFTARAN SUKSES*
*Nama :* ${m.pushName}
*Level :* ${cek("level", m.sender)}
*Saldo :* ${cek("saldo", m.sender)}
*Waktu :* ${jam} / ${tanggal}

Ketik : *menu* untuk menampilkan menu`
arie.sendMessage(m.chat, {text: `${te}`},{quoted: m})
}

let d = JSON.parse(fs.readFileSync('./Pengaturan/database/admin.json'))
function simpan(path, buff) {
    fs.writeFileSync(path, buff)
    return path
}

// GET STATUS
const get_status = async (id) => {
  const namaproduk = `${cek("product_name", m.sender)}`
  const kode_produk = `${cek("buyer_sku_code", m.sender)}`
  const tujuann = `${cek("tujuan", m.sender)}`
  const harga = `${cek("price", m.sender)}`
  let ref_no = `${sender.split('@')[0]}`
  let user_no = `${tujuann}`
  
  var config = {
    method: 'POST',  // Set the HTTP method to POST
    url: 'https://ariepulsa.com/api/pulsa-botwa',  // Set the target URL
    data: new URLSearchParams(Object.entries({
      api_key: ariekey,
      action: 'status',
      id: id,
      })),
  };
  const parsedHarga = parseFloat(harga);
    axios(config)
    .then(async res => {
  let status = res.data.status;  
  console.log(status)        
  while (status !== 'Success') {
  await sleep(1000); 
  const response = await axios(config);
                      
        if (response.data.data.status == "Success") { 
            m.reply(`           ${toko}\n       𝚂𝚝𝚛𝚞𝚔 𝙳𝚒𝚐𝚒𝚝𝚊𝚕 ( Sukses )\n══════════════════════\n𝘐𝘋 𝘜𝘴𝘦𝘳 :    ${sender.replace("@s.whatsapp.net", "")}\n𝘕𝘰 𝘗𝘦𝘮𝘣𝘢𝘺𝘢𝘳𝘢𝘯 :      ${randomString}\n𝘐𝘋 𝘛𝘳𝘢𝘯𝘴𝘢𝘬𝘴𝘪 :  ${response.data.data.id}\n────────\n\nNama Produk  : ${namaproduk}\nKode Produk : ${kode_produk}\n𝘔𝘦𝘵𝘰𝘥𝘦 𝘗𝘦𝘮𝘣𝘢𝘺𝘢𝘳𝘢𝘯 : Saldo\nTujuan : ${tujuann}\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\nHarga : ${formatmoney(parsedHarga)}\n\n  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓\nSN :   ${response.data.data.catatan}`);
            
            const productDetails = r.find(i => i.product_name === namaproduk);

            if (productDetails) {
              const productInfo = `
          Nama: ${productDetails.product_name}\nHarga: ${formatmoney(productDetails.price)}
          `;
          }

      const filePath = './Pengaturan/database/trxuser.json';
      const hargaModal = productDetails ? productDetails.price : null;
      const parsedModal = parseFloat(hargaModal);
        
          if (!isNaN(parsedModal)) {
            const medanTime = moment.tz('Asia/Jakarta');
            const newTransaction = {
                buyer: m.sender,
                status: response.data.data.status,
                no_pembayaran: koderefe,
                ref_id: response.data.data.id,
                jam: medanTime.format('HH:mm:ss'),
                waktu: medanTime.format('DD/MM/YY'),
                produk: namaproduk,
                harga: parsedHarga,
                harga_modal: parsedModal,
                tujuan: user_no,
                invoice: response.data.data.catatan
            };
        
            try {
                const fileData = fs.readFileSync(filePath, 'utf8');
                let allUserData = [];
        
                if (fileData && fileData.trim() !== '') {
                    allUserData = JSON.parse(fileData);
                    if (!Array.isArray(allUserData)) {
                        allUserData = [];
                    }
                }
        
                allUserData.push(newTransaction);
                fs.writeFileSync(filePath, JSON.stringify(allUserData, null, 2), 'utf8');          
            } catch (error) {
                console.error('Error processing the transaction:', error);
                reply("Gagal, Terjadi Kesalahan Saat Memproses Transaksi. Silakan Coba Lagi.");
            }
        } else {
            reply("Gagal, Modal Harga Tidak Ditemukan Untuk Produk Yang Ditentukan.");
        }
            
            break;
                  }          
        if (response.data.data.status == "Error") {
            sett("+saldo", ref_no+"@s.whatsapp.net", i.price)
            m.reply(`           ${toko}\n       𝚂𝚝𝚛𝚞𝚔 𝙳𝚒𝚐𝚒𝚝𝚊𝚕 ( Gagal )\n══════════════════════\n𝘐𝘋 𝘜𝘴𝘦𝘳 :    ${sender.replace("@s.whatsapp.net", "")}\n𝘕𝘰 𝘗𝘦𝘮𝘣𝘢𝘺𝘢𝘳𝘢𝘯 :      ${randomString}\n𝘐𝘋 𝘛𝘳𝘢𝘯𝘴𝘢𝘬𝘴𝘪 :  ${response.data.data.id}\n────────\n\nNama Produk  : ${namaproduk}\nKode Produk : ${kode_produk}\n𝘔𝘦𝘵𝘰𝘥𝘦 𝘗𝘦𝘮𝘣𝘢𝘺𝘢𝘳𝘢𝘯 : Saldo\nTujuan : ${tujuann}\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\nHarga : ${formatmoney(parsedHarga)}\n\n  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓\n   _*Transaksi Gagal, Silahkan Coba Nanti*_`);
            break;                   
            }

sett("product_name", m.sender, "")
sett("price", m.sender, 0)
sett("tujuan", m.sender, "")  
sett("desc", m.sender, "")  
sett("reff", m.sender, "") 
sett("buyer_sku_code", m.sender, "")  
sett("status", m.sender, true)
        }
    })
             
  }

// GET STATUS PAYMENT GATEWAY PAYDISINI
const get_status_paydisini = async (koddep) => {
  const saldomas = `${cek("deposit", m.sender)}`
  const feeown = `${cek("reff_deposit", m.sender)}`
  
  let ref_no = `${sender.split('@')[0]}`
  let third = 'StatusTransaction';
    let hash = crypto.createHash('md5')
        .update(keypaydis + koddep + third)
        .digest('hex');
  
  var config = {
    method: 'POST',  // Set the HTTP method to POST
    url: 'https://paydisini.co.id/api/',  // Set the target URL
    data: new URLSearchParams(Object.entries({
      key: keypaydis,
      request: 'status',
      unique_code: koddep,
      signature: hash,
      })),
  };

    axios(config)
    .then(async res => {
  let status = res.data.data.status;  
  m.reply('Menunggu Pembayaran...!!\nHarap Lakukan Pembayaran\nKetik :\n*canceldepo* Untuk Membatalkan Deposit Otomatis\n*cekdeposit* Jika Deposit Belum Masuk Selama 5 Menit')        
  while (status !== 'Success') {
  await sleep(1000); 
  const response = await axios(config);
                      
        if (response.data.data.status == "Success") {
            sett("+saldo", m.sender, parseInt(saldomas))
            m.reply(`*Hai Kak👋*\n\nSaldo berhasil masuk ke akun kamu sejumlah : *Rp ${saldomas}*\n\nSisa saldo kamu saat ini : *Rp ${cek("saldo", m.sender)}*`);
            sett("status_deposit_otomatis", m.sender, true)
            sett("deposit", m.sender, "")
            sett("fee_owner", m.sender, 0)
            sett("reff_deposit", m.sender, "")  
            sett("tanggal_deposit", m.sender, "")  
            break;
                  }          
        if (response.data.data.status == "Canceled ") {
            m.reply(`Sangat Disayangkan Sekali. Pembayaran Kamu Dibatalkan Oleh Sistem`);
            sett("status_deposit_otomatis", m.sender, true)
            sett("deposit", m.sender, "")
            sett("fee_owner", m.sender, 0)
            sett("reff_deposit", m.sender, "")  
            sett("tanggal_deposit", m.sender, "")  
            break;                   
            }
        }
    })
             
  }
    
const nebal = (angka) => {
return Math.floor(angka)
}

function toRupiah(angka) {
  var angkaStr = angka.toString();
  var angkaTanpaKoma = angkaStr.split('.')[0];
  var angkaRev = angkaTanpaKoma.toString().split('').reverse().join('');
  var rupiah = '';
  for (var i = 0; i < angkaRev.length; i++) {
    if (i % 3 == 0) rupiah += angkaRev.substr(i, 3) + '.';
  }
  return '' + rupiah.split('', rupiah.length - 1).reverse().join('');
}

function updateLevelAndPrice(userId, newLevel) {
  // Load user data from user.json
  let userData = fs.readFileSync('./Pengaturan/database/user.json');
  let users = JSON.parse(userData);

  // Find the user by id and update level and price
  let user = users.find(user => user.id === userId + '@s.whatsapp.net');
  if (user) {
    user.level = newLevel;
    switch (newLevel) {
      case 'member':
        user.upharga = prmember;
        break;
      case 'gold':
        user.upharga = prgold;
        break;
      case 'platinum':
        user.upharga = prplatinum;
        break;
      case 'partner':
        user.upharga = prpartner;
        break;
      default:
        m.reply('Tidak Ada Level Tersedia.\nLevel Tersedia : *member, gold, platinum, partner*');
        return;
    }

    // Save updated user data back to user.json
    fs.writeFileSync('./Pengaturan/database/user.json', JSON.stringify(users, null, 2));

    m.reply(`User ${userId} Level Terlah DiPerbarui Menjadi ${newLevel} Dengan Upharga ${user.upharga}%.`);
  } else {
    m.reply(`User Dengan ID ${userId} Tidak Terdaftar.`);
  }
}

const admModalPath = './Pengaturan/database/admin.json';

//FITUR CASE BY ARIE
switch (command) {

  case 'setlevel': {
    if (!isOwner) return reply (mess.owner)
    // Split command into userId and newLevel
    let [userId, newLevel] = text.split('|');
    if (!userId) return reply(`Input ID / No Hp Menggunakan 628\nContoh : setlevel 6285174332583|gold`);
    if (!newLevel || !['member', 'gold', 'platinum', 'partner'].includes(newLevel.toLowerCase())) return reply(`Input Levelnya (Huruf Kecil): *member, gold, platinum, partner*\nContoh : setlevel 6285174332583|gold`);
  
    // Update user level and price
    updateLevelAndPrice(userId, newLevel.toLowerCase());
    break;
  }

case 'owner':{
   
var owner_Nya = global.owner
sendContact(from, owner_Nya, global.ownername, m)
reply('Chat aja kak, ga usah malu')
}
break  

case 'topup':{
  if(cek("status", m.sender) == false) return reply(`Ada pesanan yang belum selesai,silahkan selesaikan transaksi sebelumnya. atau tekan *.cancel* untuk membatalkan.`)
  let sal = `*「 *Format Salah ‼️* 
  
  *Contoh TopUp*
  _Contoh Free Fire_ 
  ${prefix}topup [kode]|[tujuan]
  *=> #topup FF5|123456789*
  *-----------------*
  *Contoh Mobile Legends*
  ${prefix}topup [kode]|[tujuan]+ zone
  *=> topup ML5|123456789+zone =*
  *=> topup ML5|12345678912345*
  *-----------------*
  *TopUp Lainnya*
  ${prefix}topup [kode]|[tujuan]
  *=> #topup DANA|0882XXXXXX*
  
  ⚠️ Masukan Nomor Tujuan Yang Benar Agak Tidak Kesalahan Saat trx berlanjut @AriePulsa
  `
  if(!text) return reply(sal)
  let refferensi = koderef
  let produk = text.split("|")[0]
  let tujuan = text.split("|")[1]
  let uphar = `${cek("upharga", m.sender)}`
  
  for(let i of r){
  if(i.buyer_sku_code == produk){ 
    let totalHarga = i.price + i.price * (uphar / 100) + 100;
    if (totalHarga > cek("saldo", m.sender)) {
      return reply(`Gagal, Tidak Dapat Memproses Pesanan Karena Saldo Tidak Mencukupi\nSilahkan Lakukan Deposit Dahulu\n\nKetik : *deposit*`);
    }
  let har = totalHarga;
  let nama_produkk = i.product_name
  let product_buyer = i.buyer_product_status
  let product_seller = i.seller_product_status
  let descc = i.desc
  sett("price", m.sender, har)
  sett("product_name", m.sender, nama_produkk)
  sett("status", m.sender, false)
  sett("tujuan", m.sender, tujuan)
  sett("buyer_sku_code", m.sender, produk)
  sett("desc", m.sender, descc)
  sett("reff", m.sender, refferensi)
  }
  }
  let an = `*📑 RINCIAN TRANSAKSI*
  
  *Nama :* ${cek("product_name", m.sender)}
  *Harga :* Rp. ${cek("price", m.sender)}
  *Tujuan :* ${cek("tujuan", m.sender)}
  *ReffID :* ${cek("reff", m.sender)}
  *Deskripsi :* ${cek("desc",m.sender)}
  
  Ketik *${prefix}konfirmasi* untuk Melanjutkan Transaksi
  Ketik *${prefix}cancel* untuk Membatalkan pesanan`
  if(cek("product_name", m.sender) == "") return reply(`Maaf kak,produk *${produk}* tidak ditemukan\nSilahkan liat kode produk di *${prefix}listharga*`)
  m.reply(an)
  }
  break

//Konfirmasi Topup
case 'konfirmasi': {   
  if(cek("status", m.sender) == true) return reply(`Tidak ada pesanan sebelumnya silahkan melakukan pembelian produk kembali.`)  
     
  let kode_buyer = `${cek("buyer_sku_code", m.sender)}`    
  let uphar = `${cek("upharga", m.sender)}`
  for(let i of r){     
    if(i.buyer_sku_code == kode_buyer){ 
    let totalHarga = i.price + i.price * (uphar / 100) + 100;
      if (totalHarga > cek("saldo", m.sender)) {
        return reply(`Gagal, Tidak Dapat Memproses Pesanan Karena Saldo Tidak Mencukupi`);
      }
  let tujuan = `${cek("tujuan", m.sender)}` 
  let harga = `${cek("price", m.sender)}` 
  sett("-saldo", m.sender, harga)
  let referdf = `${cek("reff", m.sender)}` 
  let ref_no = `${sender.split('@')[0]}`
  let namaproduk = `${cek("product_name", m.sender)}`
  let nomor = `${tujuan}`
  let harga_produk = `${harga}`
  let kode_produk= `${kode_buyer}`
  const parsedHarga = parseFloat(harga);

  const apiURL = "https://ariepulsa.com/api/pulsa-botwa";                      
  const formData = new FormData();
  formData.append("api_key", ariekey);
  formData.append("action", "pemesanan");
  formData.append("layanan", kode_produk);
  formData.append("target", tujuan);
  formData.append("oid", referdf);
    
    fetch(apiURL, {
      method: "POST",
      body: formData,
    })


  .then(async (response) => {
    const responseData = await response.json();
const id = responseData.data.id;
const target = responseData.data.target;
const layanan = responseData.data.layanan;
const harga = responseData.data.harga;
const error = responseData.data.pesan;

        if (responseData.status == true) {
     reply(`*「 𝗧𝗿𝗮𝗻𝘀𝗮𝗸𝘀𝗶 𝗣𝗲𝗻𝗱𝗶𝗻𝗴 」*`) 
     sett("reff", m.sender, id)
     get_status(id)
      } 
      if (responseData.status == false) {
        sett("+saldo", ref_no+"@s.whatsapp.net", i.price)
        m.reply(`           ${toko}\n       𝚂𝚝𝚛𝚞𝚔 𝙳𝚒𝚐𝚒𝚝𝚊𝚕 ( Gagal )\n══════════════════════\n𝘐𝘋 𝘜𝘴𝘦𝘳 :    ${sender.replace("@s.whatsapp.net", "")}\n𝘕𝘰 𝘗𝘦𝘮𝘣𝘢𝘺𝘢𝘳𝘢𝘯 :      ${randomString}\n𝘐𝘋 𝘛𝘳𝘢𝘯𝘴𝘢𝘬𝘴𝘪 :  ${referdf}\n────────\n\nNama Produk  : ${namaproduk}\nKode Produk : ${kode_produk}\n𝘔𝘦𝘵𝘰𝘥𝘦 𝘗𝘦𝘮𝘣𝘢𝘺𝘢𝘳𝘢𝘯 : Saldo\nTujuan : ${tujuan}\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\nHarga : ${formatmoney(parsedHarga)}\n\n  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓\n   _*Transaksi Gagal, Silahkan Coba Nanti*_`);
      sett("product_name", m.sender, "")
      sett("price", m.sender, 0)
      sett("tujuan", m.sender, "")  
      sett("desc", m.sender, "")  
      sett("reff", m.sender, "") 
      sett("buyer_sku_code", m.sender, "")  
      sett("status", m.sender, true)                    
    } 
  })
}
}
}  
break

case 'bukti':{
if (!quoted) return reply(`Kirim/Reply Gambar Dengan Caption *${prefix + command}*`)
if (/image/.test(mime)) {
let media = await quoted.download()
m.reply(`Bukti berhasil terkirim ke owner,silahkan menunggu konfirmasi`)
let idny = m.sender.split("@")[0]
let buktii = `「 *DEPOSIT USER* 」
⭔ID:  ${cek("reff_deposit" ,m.sender)}
⭔Nomer: @${cek("id" ,m.sender)}
⭔Payment: Qris Alpayment
⭔Tanggal: ${cek("tanggal_deposit" ,m.sender)}
⭔Jumlah Deposit: ${formatmoney(cek("deposit" ,m.sender))}
⭔Pajak: Rp0
⭔Total Bayar: ${formatmoney(cek("deposit" ,m.sender))}

Ada yang deposit nih kak, coba dicek saldonya, jika sudah masuk konfirmasi dengan 

#addsaldo ${sender.split('@')[0]}|${cek("deposit" ,m.sender)}
`
arie.sendMessage(global.owner+'@s.whatsapp.net', {image: media, caption: buktii},{quoted: null})
}
else {
reply(`Kirim/Reply Gambar Dengan Caption *${prefix + command}*`)
}
}
break

//CEK NAMA E-WALLET ARIEPULSA
case 'cekewallet': {
   
let noreq = text.split('.')[0]
let iddd = text.split('.')[1]
if (!noreq && !iddd) return reply(`✧༝┉˚*❋ FORMAT SALAH ❋*˚┉༝✧

*Cara Cek Nama E-Wallet*
${prefix}cekewallet kodewallet.nomortujuan
=> .cekewallet dana.085174332383

*KODE E-WALLET*
=> DANA : dana
=> OVO : ovo
=> GOPAY CUSTOMER : gopay
=> GOPAY DRIVER : gopaydriver
=> SHOPEEPAY : shopeepay
=> ISAKU : isaku
=> LINKAJA : linkaja


⚠️ Masukan Kode Dan Nomor Tujuan Yang Benar
`) 
   let axios = require('axios')
    axios('https://ariepulsa.com/api/get-nickname-ewallet',{
method: 'POST',
data: new URLSearchParams(Object.entries({
api_key: ariekey,
action: 'get-nickname-ewallet',
layanan: noreq,
target: iddd,
}))}).then((res) => {
if (res.data.status == false) {
        m.reply(`${res.data.data.pesan}`)
      }
if (res.data.status == true) {
            m.reply(`*----CEK NAMA E-WALLET ----*\n\n*Rekening :* ${res.data.data.nomor}\n*Nama :* ${res.data.data.nama}\n\n${toko}`)
          }
        })
      }
  break

 //CEK NAMA REKENING ALL BANK ARIEPULSA
case 'cekrekening': {
   
let noreq = text.split('.')[0]
let iddd = text.split('.')[1]
if (!noreq && !iddd) return reply(`✧༝┉˚*❋ FORMAT SALAH ❋*˚┉༝✧

*Cara Cek Nama Rekening*
${prefix}cekrekening kodebank.nomorrekening
=> .cekrekening bca.1234567890

*KODE BANK*
=> BANK BCA : bca
=> BANK BRI : bri
=> BANK MANDIRI : mandiri
=> BANK BNI : bni

⚠️ Masukan Kode Dan Nomor Tujuan Yang Benar
`) 
   let axios = require('axios')
    axios('https://ariepulsa.com/api/get-nickname-bank',{
method: 'POST',
data: new URLSearchParams(Object.entries({
api_key: ariekey,
action: 'get-nickname-bank',
layanan: noreq,
target: iddd,
}))}).then((res) => {
if (res.data.status == false) {
        m.reply(`${res.data.data.pesan}`)
      }
if (res.data.status == true) {
            m.reply(`*----CEK NAMA REKENING ----*\n\n*Rekening :* ${res.data.data.nomor}\n*Nama :* ${res.data.data.nama}\n\n${toko}`)
          }
        })
      }
  break

//CEK NICKMANE GAME
case 'ceknickml':{
   
  let mlidnick = q.split("|")[0]
  let mlzonenick = q.split("|")[1]
   if (!mlidnick) return reply(`ID Game Nya Mana?\n.ceknickml 12345678|1234`)
  if (!mlzonenick) return reply(`ID Server Nya Mana?\n.ceknickml 12345678|1234`)
   let nickid = `${mlidnick}`
   let nickzone = `${mlzonenick}`
    let axios = require('axios')
    axios('https://ariepulsa.com/api/get-nickname-game',{
method: 'POST',
data: new URLSearchParams(Object.entries({
api_key: ariekey,
action: 'get-nickname-game',
layanan: 'mobile-legends',
target: nickid,
no_meter: nickzone,
}))}).then((res) => {
if (res.data.status == false) {
        m.reply(`${res.data.data.pesan}`)
      }
if (res.data.status == true) {
            m.reply(`*── 「 YOUR NICKNAME 」 ──*\n\n› Game : Mobile Lengeds\n› ID Game : ${mlidnick}\n› Server : (${mlzonenick})\n› NickName : ${res.data.data.nickname}\n\n${toko}`)
          }
        })
      }
  break
  case 'ceknickvalorant':{
     
    let valonick = q.split(" ")[0]
    if (!valonick) return reply(`ID Game Nya Mana?\n.ceknickvalorant 1234567890`)
     let nickvalo = `${valonick}`
      let axios = require('axios')
    axios('https://ariepulsa.com/api/get-nickname-game',{
method: 'POST',
data: new URLSearchParams(Object.entries({
api_key: ariekey,
action: 'get-nickname-game',
layanan: 'valorant',
target: nickvalo,
}))}).then((res) => {
if (res.data.status == false) {
          m.reply(`${res.data.data.pesan}`)
        }
if (res.data.status == true) {
              m.reply(`*── 「 YOUR NICKNAME 」 ──*\n\n› Game : Valorant\n› ID Game : ${valonick}\n› NickName : ${res.data.data.nickname}\n\n${toko}`)
            }
          })
        }
    break
case 'ceknickgenshin':{
   
  let mlidnick = q.split("|")[0]
  let mlzonenick = q.split("|")[1]
   if (!mlidnick) return reply(`ID Game Nya Mana?\n.ceknickgenshin 12345678|os_asia
   
   Kode Server :
   => ASIA : os_asia
   => AMERIKA : os_usa
   => EUROPA : os_euro
   => TW/HK/MO : os_cht
   
   `)
  if (!mlzonenick) return reply(`Kode Server Nya Mana?\n.ceknickgenshin 12345678|os_asia
   
   Kode Server :
   => ASIA : os_asia
   => AMERIKA : os_usa
   => EUROPA : os_euro
   => TW/HK/MO : os_cht
   
   `)
   let nickid = `${mlidnick}`
   let nickzone = `${mlzonenick}`
    let axios = require('axios')
    axios('https://ariepulsa.com/api/get-nickname-game',{
method: 'POST',
data: new URLSearchParams(Object.entries({
api_key: ariekey,
action: 'get-nickname-game',
layanan: 'genshin-impact',
target: nickid,
no_meter: nickzone,
}))}).then((res) => {
if (res.data.status == false) {
        m.reply(`${res.data.data.pesan}`)
      }
if (res.data.status == true) {
            m.reply(`*── 「 YOUR NICKNAME 」 ──*\n\n› Game : Genshin Impact\n› ID Game : ${mlidnick}\n› Server : ${mlzonenick}\n› NickName : ${res.data.data.nickname}\n\n${toko}`)
          }
        })
      }
  break
case 'ceknickff':{
   
    let ffnick = q.split(" ")[0]
    if (!ffnick) return reply(`ID Game Nya Mana?\n.ceknickff 1234567890`)
     let nick1 = `${ffnick}`
      let axios = require('axios')
    axios('https://ariepulsa.com/api/get-nickname-game',{
method: 'POST',
data: new URLSearchParams(Object.entries({
api_key: ariekey,
action: 'get-nickname-game',
layanan: 'free-fire',
target: nick1,
}))}).then((res) => {
if (res.data.status == false) {
          m.reply(`${res.data.data.pesan}`)
        }
if (res.data.status == true) {
              m.reply(`*── 「 YOUR NICKNAME 」 ──*\n\n› Game : FreeFire\n› ID Game : ${ffnick}\n› NickName : ${res.data.data.nickname}\n\n${toko}`)
            }
          })
        }
    break
    case 'ceknickhiggs':{
       
        let higgsnick = q.split(" ")[0]
        if (!higgsnick) return reply(`ID Game Nya Mana?\n.ceknickhiggs 1234567890`)
         let nickhiggs = `${higgsnick}`
          let axios = require('axios')
    axios('https://ariepulsa.com/api/get-nickname-game',{
method: 'POST',
data: new URLSearchParams(Object.entries({
api_key: ariekey,
action: 'get-nickname-game',
  layanan: 'higgs-domino',
  target: nickhiggs,
  }))}).then((res) => {
    if (res.data.status == false) {
              m.reply(`${res.data.data.pesan}`)
            }
    if (res.data.status == true) {
                  m.reply(`*── 「 YOUR NICKNAME 」 ──*\n\n› Game : Higgs Domino\n› ID Game : ${ffnick}\n› NickName : ${res.data.data.nickname}\n\n${toko}`)
                }
              })
            }
        break

//CEK ID PLN
case 'cekidpln': {
   
  let no = q.split(" ")[0]
  let yogin = `${no}`     
  if (!no) return reply(`Nomor Nya mana?\n.cekidpln 1234567890`)
  const config = {
    method: 'POST',  // Set the HTTP method to POST
    url: 'https://api.digiflazz.com/v1/transaction',  // Set the target URL
    data: {
     "commands": "pln-subscribe",
      "customer_no": yogin,
  }
  };
  
  axios(config)
    .then(function (response) {
      if (response.data.data){
      m.reply(`*Nama Pelangan :* ${response.data.data.name}\n*Daya :* ${response.data.data.segment_power}\n*Id Pelanggan :* ${response.data.data.subscriber_id}`) 
    } else {
    m.reply(`Server Sedang Sibuk`)
  }
    })
  }
  break

//DEPOSIT REKENING
case 'manual': {
  let reff_deposi = require("crypto").randomBytes(5).toString("hex").toUpperCase();
  if(cek("status_deposit", m.sender) == false) return reply(`Ada deposit yang belum terselesaikan silahkan selesaikan deposit sebelumnya atau batalkan dengan ketik #canceldepo.`)
  if(cek("status_deposit_otomatis", m.sender) == false) return reply(`Ada deposit yang belum terselesaikan silahkan selesaikan deposit sebelumnya atau batalkan dengan ketik #canceldepo.`)
  let jumlah_nya = text.split("|")[0];
  if (!jumlah_nya || parseInt(jumlah_nya) < 1000) return reply(`Format Salah atau Jumlah Deposit Kurang dari Rp 1000\n\nContoh : manual 1000`);
  let data_depo = new Date().toLocaleDateString("ID", { timeZone: "Asia/Jakarta" });
  sett("deposit", m.sender, jumlah_nya);
  sett("reff_deposit", m.sender, reff_deposi);
  sett("status_deposit", m.sender, false);
  sett("tanggal_deposit", m.sender, data_depo + jam);
  let txt = `「 𝙆𝙊𝙉𝙁𝙄𝙍𝙈𝘼𝙎𝙄-𝘿𝙀𝙋𝙊𝙎𝙄𝙏 」

》 ID :  ${cek("reff_deposit", m.sender)}
》 Nomer :  ${cek("id", m.sender)}
${rekening}
》 Jumlah Deposit : ${formatmoney(cek("deposit", m.sender))}
》 Pajak Admin : Rp0
》 Total Pembayaran : ${formatmoney(cek("deposit", m.sender))}

*Silahkan Transfer Atau Scan Qris Di Atas Sesuai Nominal. Jika Sudah Transfer Harap Kirim Gambarnya Dengan Reply/Caption #bukti*`;
  arie.sendMessage(from, { image: qris, caption: txt });
}
break;


 case 'otomatis': {
  if(cek("status_deposit_otomatis", m.sender) == false) return reply(`Ada deposit yang belum terselesaikan silahkan selesaikan deposit sebelumnya atau batalkan dengan ketik #canceldepo.`)
  if(cek("status_deposit", m.sender) == false) return reply(`Ada deposit yang belum terselesaikan silahkan selesaikan deposit sebelumnya atau batalkan dengan ketik #canceldepo.`)
  let reff_deposi = koderef
  let feenya = fee_owner
  let jumlah_nya = text.split("|")[0]
  if (!jumlah_nya || parseInt(jumlah_nya) < 1000) return reply(`Format Salah atau Jumlah Deposit Kurang dari Rp 1000\n\nContoh : manual 1000`);
  let depositnya = parseInt(jumlah_nya) + feenya
  let data_depo = new Date().toLocaleDateString("ID", { timeZone: "Asia/Jakarta"})
  sett("deposit", m.sender, jumlah_nya)
  sett("reff_deposit", m.sender, reff_deposi)
  sett("fee_owner", m.sender, feenya)
  sett("status_deposit_otomatis", m.sender, false)
  sett("tanggal_deposit", m.sender, data_depo + jam) 

  //let batas_time = '1800'; //Batas waktu pembayaran (detik) minimal 1800 30 menit dan maximal 10800 3 jam
    let third = 'NewTransaction';
    let hash = crypto.createHash('md5')
        .update(keypaydis + reff_deposi + servpaydis + depositnya + batas_time + third)
        .digest('hex');

    let nomdep = `${cek("deposit", m.sender)}`
    let nomfee = `${cek("fee_owner", m.sender)}`

    var config = {
        method: 'POST',  // Set the HTTP method to POST
        url: 'https://paydisini.co.id/api/',  // Set the target URL
        data: new URLSearchParams(Object.entries({
            key: keypaydis,
            request: 'new',
            merchant_id: merchpaydis,
            unique_code: reff_deposi,
            service: servpaydis,
            amount: depositnya,
            note: 'Deposit Bot Whatsapp',
            valid_time: batas_time,
            ewallet_phone: '',
            customer_email: '',
            type_fee: fee_cus,
            payment_guide: '',
            callback_count: '',
            return_url: '',
            signature: hash,
        })),
    };

    axios(config)
        .then(function (response) {
          const idddep = response.data.data.pay_id;
          const koddep = response.data.data.unique_code;
          const serdep = response.data.data.service_name;
          const baldep = response.data.data.balance;
          const fee = response.data.data.fee;
          const qrispaydisini = { url: response.data.data.qrcode_url};
            if (response.data.success == true) {
              let txt = `*「 DEPOSIT QRIS OTOMATIS 」*\n\n› ID TRX : ${response.data.data.pay_id}\n› Kode Unik  : ${response.data.data.unique_code}\n› NAMA LAYANAN : ${response.data.data.service_name}\n› NOMINAL : Rp ${nomdep}\n› FEE ADMIN : Rp ${nomfee}\n› FEE SERVER : Rp ${response.data.data.fee}\n› TOTAL : Rp ${response.data.data.amount}\n› STATUS : ${response.data.data.status}\n› EXPIRED  : ${response.data.data.expired}\n`
              arie.sendMessage(from, {image:qrispaydisini, caption:txt})
              sett("reff_deposit", m.sender, koddep)
              sett("reff", m.sender, idddep)
                sett("tanggal_trx", m.sender, data_depo)
                sett("status_deposit_otonatis", m.sender, false)
                get_status_paydisini(koddep)
              } 
            if (response.data.success == false) {
                m.reply(`*「 DEPOSIT QRIS OTOMATIS 」*\n\n› STATUS PAYSDISINI : *GAGAL*\n› PESAN : *${response.data.msg}*\n`)
                sett("reff_deposit", m.sender, "")
                sett("reff", m.sender, "")
                sett("deposit", m.sender, "")
                sett("tanggal_trx", m.sender, "")
                sett("status_deposit_otomatis", m.sender, true)
            }
        })
}
break

case 'cekdeposit':
    {
      if(cek("status_deposit_otomatis", m.sender) == true) return reply(`Ini Perintah Khusus Untuk Deposit Otomatis\nTidak ada deposit otomatis sebelumnya silahkan melakukan deposit Dahulu.\n\nKetik : *otomatis 1000*`)
      let kodedep = `${cek("reff_deposit", m.sender)}`;
      let saldomas = `${cek("deposit", m.sender)}`
      let ref_no = `${sender.split('@')[0]}`
      
    let third = 'StatusTransaction';
    let hash = crypto.createHash('md5')
        .update(keypaydis + kodedep + third)
        .digest('hex');
  
  var config = {
    method: 'POST',  // Set the HTTP method to POST
    url: 'https://paydisini.co.id/api/',  // Set the target URL
    data: new URLSearchParams(Object.entries({
      key: keypaydis,
      request: 'status',
      unique_code: kodedep,
      signature: hash,
      })),
  };

  axios(config)
  .then(async res => {
    let status = res.data.data.status;
      if (status == "Pending") {
          m.reply(`Deposit Status Pending, Silahkan Scan Qris Pembayaran`);
        }
      if (status == "Success") { 
          sett("+saldo", m.sender, parseInt(saldomas))
          m.reply(`*Hai Kak👋*\n\nSaldo berhasil masuk ke akun kamu sejumlah : *Rp ${saldomas}*\n\nSisa saldo kamu saat ini : *Rp ${cek("saldo", m.sender)}*`);
          sett("status_deposit", m.sender, true)
          sett("status_deposit_otomatis", m.sender, true)
          sett("deposit", m.sender, "")
          sett("fee_owner", m.sender, 0)
          sett("reff_deposit", m.sender, "")  
          sett("tanggal_deposit", m.sender, "")  
                }          
      if (status == "Canceled ") {
          m.reply(`Sangat Disayangkan Sekali. Pembayaran Kamu Dibatalkan Oleh Sistem`);
          sett("status_deposit", m.sender, true)
          sett("status_deposit_otomatis", m.sender, true)
          sett("deposit", m.sender, "")
          sett("fee_owner", m.sender, 0)
          sett("reff_deposit", m.sender, "")  
          sett("tanggal_deposit", m.sender, "")  
      }
  })
      
    }
    break;

case "canceldepo":
      {
          if (cek("status_deposit", m.sender) == false && cek("status_deposit_otomatis", m.sender) == true) {
              m.reply(`🗯️ _SUKSES MEMBATALKAN DEPOSIT MANUAL_`);
              sett("status_deposit", m.sender, true);
          } else if (cek("status_deposit", m.sender) == true && cek("status_deposit_otomatis", m.sender) == false) {
              m.reply(`🗯️ _SUKSES MEMBATALKAN DEPOSIT OTOMATIS_`);
              sett("status_deposit_otomatis", m.sender, true);
          } else {
              return reply(`Tidak ada deposit sebelumnya silahkan melakukan deposit dahulu.`);
          }
      
          sett("deposit", m.sender, "")
          sett("fee_owner", m.sender, 0)
          sett("reff_deposit", m.sender, "")  
          sett("tanggal_deposit", m.sender, "")  
      
          break;
      }

case 'addsaldo':{
if(!isOwner) return reply(mess.owner)
if(!text) return reply(`*Contoh :*\n${prefix}addsaldo 62xx|10000`)
let saldo = text.split("|")[1] * 1
let id = text.split("|")[0]
if(!saldo) throw `Masukan aldonya!!`
let cekk = `*${cek("reff_deposit", id+"@s.whatsapp.net")}`
if(cek("status_deposit", id+"@s.whatsapp.net") == true) return reply(`Tidak ada deposit sebelumnya pada ${id}.`)
if(cek("reff_deposit", id+"@s.whatsapp.net") == true) return reply(`Pengguna ${id} Tidak terdaftar di database`)
sett("+saldo", id+"@s.whatsapp.net", parseInt(saldo))
reply(`Sukses menambah saldo pada akun\n*ID :* ${id}\n*Tag :* @${id}\nJumlah saldo sekarang : *Rp ${cek("saldo", id+"@s.whatsapp.net")}*`)
setTimeout(function(){
arie.sendMessage(id+"@s.whatsapp.net", {text:`*Hai Kak👋*\n\nSaldo berhasil masuk ke akun kamu sejumlah : *${formatmoney(saldo)}*\n\nSisa saldo kamu saat ini : *Rp ${cek("saldo", id+"@s.whatsapp.net")}*`}) 
}, 5000)
sett("deposit", id+"@s.whatsapp.net", "")
sett("reff_deposit", id+"@s.whatsapp.net", "")
sett("status_deposit", id+"@s.whatsapp.net", true)      
sett("tanggal_deposit", id+"@s.whatsapp.net", "")
}
break

case 'menu': {
   
if (cek("id", m.sender) == null) return daftar()
let tam = `${ucapanWaktu} ${pushname !== undefined ? pushname : 'Kak'}

  •°INFO MENU ${namabot}°•

✦ *CARA TRANSAKSI* ✦
: ̗̀➛ topup [kode]|[tujuan]

✦ Menu Topup ✦
: ̗̀➛ topuppulsa
: ̗̀➛ topupgame
: ̗̀➛ topupemoney
: ̗̀➛ topuptokenpln
: ̗̀➛ voucherdigital

✦ Menu Member ✦
: ̗̀➛ ceksaldo
: ̗̀➛ deposit
: ̗̀➛ deposit
: ̗̀➛ request
: ̗̀➛ gcmember

✦ Menu Riwayat ✦
: ̗̀➛ toplayanan
: ̗̀➛ topuser
: ̗̀➛ cekriwayat
: ̗̀➛ riwayat

✦ Menu Bantuan ✦
: ̗̀➛ cekidpln
: ̗̀➛ cekewallet
: ̗̀➛ cekrekening
: ̗̀➛ ceknickml
: ̗̀➛ ceknickff
: ̗̀➛ ceknickhiggs
: ̗̀➛ ceknickvalorant
: ̗̀➛ ceknickgenshin

_${toko}_
`   
reply(tam)
					} 
				break	

case 'ceksaldo': case 'saldo':     
let myde = `❢◥ ▬▬▬ 𝗗𝗘𝗧𝗔𝗜𝗟 𝗔𝗞𝗨𝗡 ▬▬▬ ◤❢
          
*○*  Saldo :*  ${formatmoney(cek("saldo", m.sender))}
*○*  Name : ${pushname}
*○*  Id : ${sender.replace("@s.whatsapp.net", "")}
*○*  Level : ${cek("level", m.sender)}

Cek Riwayat Transaksi Anda Dengan Cara Ketik *.𝗰𝗲𝗸𝗿𝗶𝘄𝗮𝘆𝗮𝘁*

Cek Riwayat Transaksi Anda Dengan Spesifik Ketik *.𝗿𝗶𝘄𝗮𝘆𝗮𝘁*

𝘐𝘯𝘨𝘪𝘯 𝘥𝘦𝘱𝘰𝘴𝘪𝘵 𝘴𝘪𝘭𝘢𝘩𝘬𝘢𝘯 𝘬𝘦𝘵𝘪𝘬 𝘤𝘰𝘮𝘮𝘢𝘯𝘥 #𝘥𝘦𝘱𝘰𝘴𝘪𝘵`
reply(myde)
break

case "gcmember":
        let tammember = `「 *LINK GC RESMI* 」\n\n${gcresmi}`;
        reply(tammember);
        break;

case "uplevel":
        let tamlevel = `「 *UPLEVEL* 」\n\n${hargalevel}`;
        reply(tamlevel);
        break;

case "deposit":
let tamdepo = `「 *METHODE DEPOSIT* 」

: ̗̀➛ *manual*
_*Ketik : manual 1000*_
- _Offline Pukul 22.00 - 06.00 WIB_
- _Tidak Ada Biaya Admin_
- _Transfer Di Jam Offline Akan DiProses Ketika Online_

: ̗̀➛ *otomatis*
_*Ketik : otomatis 1000*_
- _Otomatis 24 jam_
- _Ada Biaya Admin_
- _Saldo Langsung Masuk_
`;
reply(tamdepo);
break;

case 'topuppulsa': {  
if (cek("id", m.sender) == null) return daftar()
let tam = `◥ TOPUP ${namabot} ◤
     
╔══《 *LIST PULSA ALL* 》
┃ *○* ${prefix}telkomsel
┃ *○* ${prefix}indosat
┃ *○* ${prefix}smartfren
┃ *○* ${prefix}axis
┃ *○* ${prefix}xl
┃ *○* ${prefix}tri
┃ *○* ${prefix}byu
╚════

_${toko}_
`
reply(tam)
					} 
				break

//=============================== CASE TOPUP PULSA =======================
case 'telkomsel': {  
if (cek("id", m.sender) == null) return daftar()
let tam = `◥ TOPUP ${namabot} ◤
     
╔══《 *LIST TELKOMSEL* 》
┃ *○* ${prefix}pulsatelkomsel
┃ *○* ${prefix}pulsatelkomseltf
┃ *○* ${prefix}datatelkomsel
┃ *○* ${prefix}vouchertelkomsel
┃ *○* ${prefix}tlpsmstelkomsel
┃ *○* ${prefix}telkomselmasaaktif
╚════

_${toko}_
`
reply(tam)
					} 
				break

case 'indosat': {  
if (cek("id", m.sender) == null) return daftar()
let tam = `◥ TOPUP ${namabot} ◤
     
╔══《 *LIST INDOSAT* 》
┃ *○* ${prefix}pulsaindosat
┃ *○* ${prefix}pulsaindosattf
┃ *○* ${prefix}dataindosat
┃ *○* ${prefix}voucherindosat
┃ *○* ${prefix}tlpsmsindosat
┃ *○* ${prefix}indosatmasaaktif
╚════

_${toko}_
`
reply(tam)
					} 
				break

case 'axis': {  
if (cek("id", m.sender) == null) return daftar()
let tam = `◥ TOPUP ${namabot} ◤
     
╔══《 *LIST AXIS* 》
┃ *○* ${prefix}pulsaaxis
┃ *○* ${prefix}pulsaaxistf
┃ *○* ${prefix}dataaxis
┃ *○* ${prefix}voucheraxis
┃ *○* ${prefix}tlpsmsaxis
┃ *○* ${prefix}axismasaaktif
╚════

_${toko}_
`
reply(tam)
					} 
				break

case 'xl': {  
if (cek("id", m.sender) == null) return daftar()
let tam = `◥ TOPUP ${namabot} ◤
     
╔══《 *LIST XL* 》
┃ *○* ${prefix}pulsaxl
┃ *○* ${prefix}pulsaxltf
┃ *○* ${prefix}dataxl
┃ *○* ${prefix}voucherxl
┃ *○* ${prefix}tlpsmsxl
┃ *○* ${prefix}xlmasaaktif
╚════

_${toko}_
`
reply(tam)
					} 
				break

case 'tri': {  
if (cek("id", m.sender) == null) return daftar()
let tam = `◥ TOPUP ${namabot} ◤
     
╔══《 *LIST TRI* 》
┃ *○* ${prefix}pulsatri
┃ *○* ${prefix}pulsatritf
┃ *○* ${prefix}datatri
┃ *○* ${prefix}vouchertri
┃ *○* ${prefix}tlpsmstri
┃ *○* ${prefix}trimasaaktif
╚════

_${toko}_
`
reply(tam)
					} 
				break

case 'smartfren': {  
if (cek("id", m.sender) == null) return daftar()
let tam = `◥ TOPUP ${namabot} ◤
     
╔══《 *LIST SMARTFREN* 》
┃ *○* ${prefix}pulsasmartfren
┃ *○* ${prefix}pulsasmartfrentf
┃ *○* ${prefix}datasmartfren
┃ *○* ${prefix}vouchersmartfren
┃ *○* ${prefix}tlpsmssmartfren
┃ *○* ${prefix}smartfrenmasaaktif
╚════

_${toko}_
`
reply(tam)
					} 
				break

case 'byu': {  
if (cek("id", m.sender) == null) return daftar()
let tam = `◥ TOPUP ${namabot} ◤
     
╔══《 *LIST BYU* 》
┃ *○* ${prefix}pulsabyu
┃ *○* ${prefix}pulsabyutf
┃ *○* ${prefix}databyu
┃ *○* ${prefix}voucherbyu
┃ *○* ${prefix}tlpsmsbyu
┃ *○* ${prefix}byumasaaktif
╚════

_${toko}_
`
reply(tam)
					} 
				break

//========================================== CASE TOPUP GAME =====================
case 'topupgame': { 
  if (cek("id", m.sender) == null) return daftar()
  let tam = `◥ TOPUP ${namabot} ◤
  
  ╔══《 *LIST TOPUP GAME* 》
  ┃ *○* ${prefix}freefire
  ┃ *○* ${prefix}membershipff
  ┃ *○* ${prefix}mobilelegends
  ┃ *○* ${prefix}membershipml
  ┃ *○* ${prefix}pointblank
  ┃ *○* ${prefix}pubgmobile
  ┃ *○* ${prefix}callofdutymobile
  ┃ *○* ${prefix}lordsmobile
  ┃ *○* ${prefix}speeddrifters
  ┃ *○* ${prefix}hago
  ┃ *○* ${prefix}valorant
  ┃ *○* ${prefix}sausageman
  ┃ *○* ${prefix}lostsaga
  ┃ *○* ${prefix}genshinimpact
  ┃ *○* ${prefix}8ballpool
  ┃ *○* ${prefix}leagueoflegendwildrift
  ┃ *○* ${prefix}amongus
  ┃ *○* ${prefix}clashofclans
  ┃ *○* ${prefix}supersus
  ┃ *○* ${prefix}stumbleguys
  ┃ *○* ${prefix}honkaiimpact3
  ┃ *○* ${prefix}ragnarokorigin
  ┃ *○* ${prefix}lita
  ┃ *○* ${prefix}honkaistarrail
  ┃ *○* ${prefix}likee
  ┃ *○* ${prefix}clashroyale
  ┃ *○* ${prefix}sealmsea
  ┃ *○* ${prefix}topeleven
  ┃ *○* ${prefix}undawn
  ┃ *○* ${prefix}metalslugawakening
  ┃ *○* ${prefix}bloodstrike
  ╚════
  
  ╔══《 CEK NICKNAME 》
  ┃ *○* ${prefix}ceknickml
  ┃ *○* ${prefix}ceknickff
  ┃ *○* ${prefix}ceknickhiggs
  ┃ *○* ${prefix}ceknicvalorant
  ╚════
  
  _${toko}
  `
    reply(tam)
            } 
          break

//========================================== CASE VOUCHER DIGITAL =====================
case 'voucherdigital': { 
  if (cek("id", m.sender) == null) return daftar()
  let tam = `◥ TOPUP ${namabot} ◤
  
  ╔══《 *LIST VOUCHER* 》
  ┃ *○* ${prefix}voucherrazergold
  ┃ *○* ${prefix}voucherwifiid
  ┃ *○* ${prefix}voucherpointblank
  ┃ *○* ${prefix}voucherunipin
  ┃ *○* ${prefix}vouchernintendoeshop
  ┃ *○* ${prefix}voucherxbox
  ╚════
 
  _${toko}
  `
    reply(tam)
            } 
          break

//========================================== CASE VOUCHER DIGITAL =====================
case 'topupemoney': { 
  if (cek("id", m.sender) == null) return daftar()
  let tam = `◥ TOPUP ${namabot} ◤
  
  ╔══《 *LIST E-Money* 》
  ┃ *○* ${prefix}gopaycus
  ┃ *○* ${prefix}gopaydriv
  ┃ *○* ${prefix}mandirietoll
  ┃ *○* ${prefix}ovo
  ┃ *○* ${prefix}grabcus
  ┃ *○* ${prefix}grabdriv
  ┃ *○* ${prefix}dana
  ┃ *○* ${prefix}tixid
  ┃ *○* ${prefix}linkaja
  ┃ *○* ${prefix}tapcashbni
  ┃ *○* ${prefix}shopeepay
  ┃ *○* ${prefix}brizzi
  ┃ *○* ${prefix}mitrashopee
  ┃ *○* ${prefix}isaku
  ┃ *○* ${prefix}maximcus
  ┃ *○* ${prefix}maximdriv
  ┃ *○* ${prefix}sakuku
  ╚════

  ╔══《 *CEK NICKNAME* 》
  ┃ *○* ${prefix}cekewallet
  ┃ *○* ${prefix}cekrekening
  ╚════
 
  _${toko}
  `
    reply(tam)
            } 
          break

//========================================== CASE VOUCHER DIGITAL =====================
case 'topuptokenpln': { 
  if (cek("id", m.sender) == null) return daftar()
  let tam = `◥ TOPUP ${namabot} ◤
  
  ╔══《 *LIST TOKEN PLN* 》
  ┃ *○* ${prefix}tokenpln
  ╚════

  ╔══《 *CEK NICKNAME* 》
  ┃ *○* ${prefix}cekidpln
  ╚════
 
  _${toko}
  `
    reply(tam)
            } 
          break			
				
          case 'saldoarie': {
   
            if (m.isGroup) return m.reply('Fitur Khusus Private Chat')
            if (!isOwner) return m.reply("Fitur khusus owner!")
            const crypto = require("crypto")
            const axios = require("axios")
            
              var config = {
                method: 'POST',  // Set the HTTP method to POST
                url: 'https://ariepulsa.com/api/profile',  // Set the target URL
                data: new URLSearchParams(Object.entries({
                  api_key: ariekey,
                  action: 'profile',
                  })),
              };
            
            axios(config)
              .then(function (response) {
                if (response.data.status == true) {
                m.reply(`*「 AKUN ARIE PULSA 」*\n\n› STATUS ARIE PULSA : *TERHUBUNG*\n› USER SERVER  : *${formatmoney(response.data.data.username)}*\n› SALDO SERVER : *Rp. ${response.data.data.sisa_saldo}*\n› POIN SERVER  : *${response.data.data.poin}*\n`)
            
              } if (response.data.status == false) {
              m.reply(`*「 AKUN ARIE PULSA 」*\n\n› STATUS ARIE PULSA : *TERPUTUS*\n› PESAN : *${response.data.data.pesan}*\n`)
            }
              })
            }
            break

case 'saldopay': {
  if (!isOwner) return m.reply("Fitur khusus owner!")
   let third = 'Profile';
   let hash = crypto.createHash('md5')
   .update(keypaydis + third)
   .digest('hex');
  
    var config = {
      method: 'POST',  // Set the HTTP method to POST
      url: 'https://paydisini.co.id/api/',  // Set the target URL
      data: new URLSearchParams(Object.entries({
        key: keypaydis,
        request: 'profile',
        signature: hash,
        })),
    };
  
  axios(config)
    .then(function (response) {
      if (response.data.success == true) {
      m.reply(`*「 AKUN PAYDISINI 」*\n\n› STATUS PAYDISINI : *TERHUBUNG*\n› USER SERVER  : *${response.data.data.full_name}*\n› SALDO ANDA : *Rp ${response.data.data.saldo}*\n› SALDO DITAHAN  : *Rp ${response.data.data.saldo_tertahan}*\n`)
  
    } if (response.data.success == false) {
    m.reply(`*「 AKUN PAYDISINI 」*\n\n› STATUS PAYSDISINI : *TERPUTUS*\n› PESAN : *${response.data.msg}*\n`)
  }
    })
  }
  break

case 'adminmenu':
   
if (!isOwner) return m.reply("Fitur khusus owner!")		
let tam =`
╭──❍
├ › saldoarie
├ › uparie
├ › upmodal
├ › rekap
├ › riwayat
├ › topuser
├ › toplayanan
├ › reset
├ › getip
├ › addsaldo
├ › minsaldo
├ › tambahsaldo
├ › block 628xx
├ › unblock 628xx
├ › listblock
├ › tambah
├ › kurang
├ › kali
├ › bagi
╰──❍
  `
reply(tam)
break

				case 'topupgame': {
           
				if (cek("id", m.sender) == null) return reply(`belum terdaftar di database silahkan ketik #daftar`) 
let tam = `◥ ▬▬▬ TOPUP ${toko} ▬▬▬ ◤❢

     
╔══《 𝗧𝗢𝗣𝗨𝗣 𝗚𝗔𝗠𝗘 》
┃ *○* ${prefix}freefire
┃ *○* ${prefix}Genshin
┃ *○* ${prefix}mobilelegends
┃ *○* ${prefix}Pubg
┃ *○* ${prefix}bossdomino
┃ *○* ${prefix}ponitblank
┃ *○* ${prefix}sausageman
┃ *○* ${prefix}valorant
┃ *○* ${prefix}cod
╚════

╔══《 CEK NICKNAME 》
┃ *○* ${prefix}ceknickml
┃ *○* ${prefix}ceknickff
┃ *○* ${prefix}ceknickhiggs
┃ *○* ${prefix}ceknicvalorant
╚════

_${toko}
`
	reply(tam)
					} 
				break				


        
case 'cancel':{
   
if(cek("status", m.sender) == true) return reply(`Maaf,tidak ada orderan yang sedang kaka proses.`)
sett("status", m.sender, true)
sett("product_name", m.sender, "")
sett("price", m.sender, 0)
sett("tujuan", m.sender, "")  
sett("desc", m.sender, "")  
sett("reff", m.sender, "") 
sett("buyer_sku_code", m.sender, "")  

function pickrandom() {
  var symbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var symbolLength = symbols.length;
  var randomString = '';
  for (var i = 0; i < 6; i++) {
    randomString += symbols.charAt(Math.floor(Math.random() * symbolLength));
  }
  randomString += '';
  for (var j = 0; j < 4; j++) {
    randomString += symbols.charAt(Math.floor(Math.random() * symbolLength));
  }
  return randomString;
}
let kode = pickrandom()
let echa = `🗯️ SUKSES MEMBATALKAN PESANAN DENGAN ID TRANSAKSI :
_${kode}_`
m.reply(echa)
}
break     

 //GET LAYANAN ARIE PULSA
 case "getarie": {
  if (!isOwner) return reply(`khusus owner`);

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
      if (response.data.status === false) {
        reply(`pesan: ${response.data.data.pesan}`);
        return;
      }

      let data = JSON.stringify(response.data.data);

      // Simpan data ke file
      fs.writeFileSync("./Pengaturan/database/dataariepulsa.json", data);
      reply(`Berhasil Get Layanan`);
    })
    .catch((error) => {
      console.log("Gagal", error);
      reply(`GAGAL Get Layanan`);
    });
  break;
}

case "sosmedarie": {
  if (!isOwner) return reply(`khusus owner`);

  var config = {
    method: "POST", // Set the HTTP method to POST
    url: "https://ariepulsa.com/api/sosial-media", // Set the target URL
    data: new URLSearchParams(Object.entries({
      api_key: ariekey,
      action: 'layanan',
    })),
  };

  axios(config)
    .then(function (response) {
      if (response.data.status === false) {
        reply(`pesan: ${response.data.data.pesan}`);
        return;
      }

      let data = JSON.stringify(response.data.data);

      // Simpan data ke file
      fs.writeFileSync("./Pengaturan/database/sosmedariepulsa.json", data);
      reply(`Berhasil Get Layanan`);
    })
    .catch((error) => {
      console.log("Gagal", error);
      reply(`GAGAL Get Layanan`);
    });
  break;
}

case 'getip':{
   
if(!isOwner) return m.reply(mess.owner)
let anu = await fetch(`https://api.myip.com`)
let res = await anu.json()
let Fardan = `*📮INFO SERVER*

*IP :* ${res.ip}
*Country :* ${res.country}

*_jangan menyebarkan ip diatas ke sembarang orang!!_*`
m.reply(Fardan)
}
break

//====================================== CASE PULSA ================
case 'pulsatelkomsel':{
  let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
  let listProduct10 = "「 *LIST PULSA TELKOMSEL* 」\n";
  data10.forEach(function(product) {
    if (product.category === "Pulsa") {
    if (product.brand === "TELKOMSEL")
    if (product.type === "Umum")
  if (product.seller_product_status === "Normal") {
     listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
  
  reply(`${listProduct10}`)
  }
  break
  
  case 'pulsatelkomseltf':{
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST TRANSFER TELKOMSEL* 」\n";
    data10.forEach(function(product) {
      if (product.category === "Pulsa") {
      if (product.brand === "TELKOMSEL")
      if (product.type === "Pulsa Transfer")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
  case 'pulsaindosat':{
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST PULSA INDOSAT* 」\n";
    data10.forEach(function(product) {
      if (product.category === "Pulsa") {
      if (product.brand === "INDOSAT")
      if (product.type === "Umum")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
    case 'pulsaindosattf':{
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST TRANSFER INDOSAT* 」\n";
    data10.forEach(function(product) {
      if (product.category === "Pulsa") {
      if (product.brand === "INDOSAT")
      if (product.type === "Pulsa Transfer")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
  
    case 'pulsaxl':{
      let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
      let listProduct10 = "「 *LIST PULSA XL* 」\n";
      data10.forEach(function(product) {
        if (product.category === "Pulsa") {
        if (product.brand === "XL")
        if (product.type === "Umum")
      if (product.seller_product_status === "Normal") {
         listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
          } else {
          listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
        }
        }
      });
      
      reply(`${listProduct10}`)
      }
      break
  
    case 'pulsaxltf':{
      let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
      let listProduct10 = "「 *LIST TRANSFER XL* 」\n";
      data10.forEach(function(product) {
        if (product.category === "Pulsa") {
        if (product.brand === "XL")
        if (product.type === "Pulsa Transfer")
      if (product.seller_product_status === "Normal") {
         listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
          } else {
          listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
        }
        }
      });
      
      reply(`${listProduct10}`)
      }
      break
  
    case 'pulsaaxis':{
        let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
        let listProduct10 = "「 *LIST PULSA AXIS* 」\n";
        data10.forEach(function(product) {
          if (product.category === "Pulsa") {
          if (product.brand === "AXIS")
          if (product.type === "Umum")
        if (product.seller_product_status === "Normal") {
           listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
            } else {
            listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
          }
          }
        });
        
        reply(`${listProduct10}`)
        }
        break
  
    case 'pulsaaxistf':{
        let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
        let listProduct10 = "「 *LIST TRANSFER AXIS* 」\n";
        data10.forEach(function(product) {
          if (product.category === "Pulsa") {
          if (product.brand === "AXIS")
          if (product.type === "Pulsa Transfer")
        if (product.seller_product_status === "Normal") {
           listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
            } else {
            listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
          }
          }
        });
        
        reply(`${listProduct10}`)
        }
        break
  
        case 'pulsasmartfren':{
          let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
          let listProduct10 = "「 *LIST PULSA SMARTFREN* 」\n";
          data10.forEach(function(product) {
            if (product.category === "Pulsa") {
            if (product.brand === "SMARTFREN")
            if (product.type === "Umum")
          if (product.seller_product_status === "Normal") {
             listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
              } else {
              listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
            }
            }
          });
          
          reply(`${listProduct10}`)
          }
          break
  
        case 'pulsasmartfrentf':{
          let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
          let listProduct10 = "「 *LIST TRANSFER SMARTFREN* 」\n";
          data10.forEach(function(product) {
            if (product.category === "Pulsa") {
            if (product.brand === "SMARTFREN")
            if (product.type === "Pulsa Transfer")
          if (product.seller_product_status === "Normal") {
             listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
              } else {
              listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
            }
            }
          });
          
          reply(`${listProduct10}`)
          }
          break
  
          case 'pulsabyu':{
            let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
            let listProduct10 = "「 *LIST PULSA BYU* 」\n";
            data10.forEach(function(product) {
              if (product.category === "Pulsa") {
              if (product.brand === "by.U")
              if (product.type === "Umum")
            if (product.seller_product_status === "Normal") {
               listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
                } else {
                listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
              }
              }
            });
            
            reply(`${listProduct10}`)
            }
            break
  
          case 'pulsabyutf':{
            let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
            let listProduct10 = "「 *LIST TRANSFER BYU* 」\n";
            data10.forEach(function(product) {
              if (product.category === "Pulsa") {
              if (product.brand === "by.U")
              if (product.type === "Pulsa Transfer")
            if (product.seller_product_status === "Normal") {
               listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
                } else {
                listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
              }
              }
            });
            
            reply(`${listProduct10}`)
            }
            break
  
            case 'pulsatri':{
              let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
              let listProduct10 = "「 *LIST PULSA TRI* 」\n";
              data10.forEach(function(product) {
                if (product.category === "Pulsa") {
                if (product.brand === "TRI")
                if (product.type === "Umum")
              if (product.seller_product_status === "Normal") {
                 listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
                  } else {
                  listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
                }
                }
              });
              
              reply(`${listProduct10}`)
              }
              break
  
            case 'pulsatritf':{
              let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
              let listProduct10 = "「 *LIST TRANSFER TRI* 」\n";
              data10.forEach(function(product) {
                if (product.category === "Pulsa") {
                if (product.brand === "TRI")
                if (product.type === "Pulsa Transfer")
              if (product.seller_product_status === "Normal") {
                 listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
                  } else {
                  listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
                }
                }
              });
              
              reply(`${listProduct10}`)
              }
              break
  //==============================CASE PAKET=======================================================
  case 'datatelkomsel':{
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST DATA TELKOMSEL* 」\n";
    data10.forEach(function(product) {
      if (product.category === "Data") {
      if (product.brand === "TELKOMSEL")
      // if (product.type === "Umum")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
  case 'dataxl':{
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST DATA XL* 」\n";
    data10.forEach(function(product) {
      if (product.category === "Data") {
      if (product.brand === "XL")
      // if (product.type === "Umum")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
  case 'dataindosat':{
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST DATA INDOSAT* 」\n";
    data10.forEach(function(product) {
      if (product.category === "Data") {
      if (product.brand === "INDOSAT")
      // if (product.type === "Umum")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
  case 'dataaxis':{
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST DATA AXIS* 」\n";
    data10.forEach(function(product) {
      if (product.category === "Data") {
      if (product.brand === "AXIS")
      // if (product.type === "Umum")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
    case 'datasmartfren':{
      let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
      let listProduct10 = "「 *LIST DATA SMARTFREN* 」\n";
      data10.forEach(function(product) {
        if (product.category === "Data") {
        if (product.brand === "SMARTFREN")
        // if (product.type === "Umum")
      if (product.seller_product_status === "Normal") {
         listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
          } else {
          listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
        }
        }
      });
      
      reply(`${listProduct10}`)
      }
      break
  
    case 'databyu':{
      let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
      let listProduct10 = "「 *LIST DATA BYU* 」\n";
      data10.forEach(function(product) {
        if (product.category === "Data") {
        if (product.brand === "by.U")
        // if (product.type === "Umum")
      if (product.seller_product_status === "Normal") {
         listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
          } else {
          listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
        }
        }
      });
      
      reply(`${listProduct10}`)
      }
      break
  
  //=============================================== CASE GAME ================================
  case 'garena':{
  let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
  let listProduct10 = "「 *LIST GARENA* 」\n";
  data10.forEach(function(product) {
    if (product.category === "Games") {
    if (product.brand === "GARENA")
    if (product.type === "Umum")
  if (product.seller_product_status === "Normal") {
     listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
  
  reply(`${listProduct10}`)
  }
  break
  
  case 'diamondml': case 'ml': case 'dmml': case 'diamondmobilelegends': case 'dmmobilelegends': case 'mobilelegends': case 'mobilelegend':{
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST DIAMOND MOBILE LEGENDS* 」\n";
    data10.forEach(function(product) {
      if (product.category === "Games") {
      if (product.brand === "MOBILE LEGENDS")
      if (product.type === "Umum")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
  case 'membershipml': case 'memberml': case 'membershipmobilelegends': {
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST MEMBERSHIP MOBILE LEGENDS* 」\n";
    data10.forEach(function(product) {
      if (product.category === "Games") {
      if (product.brand === "MOBILE LEGENDS")
      if (product.type === "Membership")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
    case 'diamondff': case 'dmff': case 'diamondfreefire': case 'dmfreefire': case 'freefire': case 'ff':{
          let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
          data10.sort((a, b) => a.price - b.price);
          data10.sort((a, b) => a.price - b.price);
          let listProduct10 = "「 *LIST DIAMOND FREEFIRE* 」\n";
          data10.forEach(function(product) {
              if (product.category === "Games" && product.brand === "FREE FIRE" && product.type === "Umum") {
                  if (product.seller_product_status === "Normal") {
                      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
                  } else {
                      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
                  }
              }
          });
      
          reply(`${listProduct10}`);
      }
      break;
  
  case 'membershipff': case 'memberff': case 'membershipfreefire': {
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST MEMBERSHIP FREEFIRE* 」\n";
    data10.forEach(function(product) {
      if (product.category === "Games") {
      if (product.brand === "FREE FIRE")
      if (product.type === "Membership")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
  case 'pointblank': case 'cashpb': case 'cashpointblank': {
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST CASH POINT BLANK* 」\n";
    data10.forEach(function(product) {
      if (product.category === "Games") {
      if (product.brand === "POINT BLANK")
      if (product.type === "Umum")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
  case 'aov': case 'arenaofvalor': {
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST ARENA OF VALOR* 」\n";
    data10.forEach(function(product) {
      if (product.category === "Games") {
      if (product.brand === "ARENA OF VALOR")
      if (product.type === "Umum")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
    case 'pubgm': case 'pubgmobile': {
      let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
      let listProduct10 = "「 *LIST PUBG MOBILE* 」\n";
      data10.forEach(function(product) {
        if (product.category === "Games") {
        if (product.brand === "PUBG MOBILE")
        if (product.type === "Umum")
      if (product.seller_product_status === "Normal") {
         listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
          } else {
          listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
        }
        }
      });
      
      reply(`${listProduct10}`)
      }
      break
  
  case 'codm': case 'callofdutymobile': {
    let datacodm = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
    let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
    datacodm.sort((a, b) => a.price - b.price);
    let listProductCodm = "「 *LIST CALL OF DUTY MOBILE* 」\n";
    datacodm.forEach(function(product) {
      if (product.category === "Games") {
      if (product.brand === "Call Of Duty MOBILE")
      if (product.type === "Umum")
    if (product.seller_product_status === "Normal") {
      listProductCodm += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
        } else {
          listProductCodm += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      }
      }
    });
    
    reply(`${listProductCodm}`)
    }
    break
  
  case 'lm': case 'lordmobile': case 'lordsmobile': {
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
    let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
    data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST LORDS MOBILE* 」\n";
    data10.forEach(function(product) {
      if (product.category === "Games") {
      if (product.brand === "LORDS MOBILE")
      if (product.type === "Umum")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
    case 'sd': case 'speeddrifter': case 'speeddrifters': {
      let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
      let listProduct10 = "「 *LIST SPEED DRIFTERS* 」\n";
      data10.forEach(function(product) {
        if (product.category === "Games") {
        if (product.brand === "Speed Drifters")
        if (product.type === "Umum")
      if (product.seller_product_status === "Normal") {
         listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
          } else {
          listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
        }
        }
      });
      
      reply(`${listProduct10}`)
      }
      break
  
  case 'hago': {
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST HAGO* 」\n";
    data10.forEach(function(product) {
      if (product.category === "Games") {
      if (product.brand === "HAGO")
      if (product.type === "Umum")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
  case 'valorant': {
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST VALORANT* 」\n";
    data10.forEach(function(product) {
      if (product.category === "Games") {
      if (product.brand === "VALORANT")
      if (product.type === "Umum")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
  case 'sausage': case 'sausageman':{
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST SAUSAGE MAN* 」\n";
    data10.forEach(function(product) {
      if (product.category === "Games") {
      if (product.brand === "Sausage Man")
      if (product.type === "Umum")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
  case 'ls': case 'lostsaga':{
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST LOST SAGA* 」\n";
    data10.forEach(function(product) {
      if (product.category === "Games") {
      if (product.brand === "LOST SAGA")
      if (product.type === "Umum")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
  case 'genshin': case 'genshinimpact':{
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST GENSHIN IMPACT* 」\n";
    data10.forEach(function(product) {
      if (product.category === "Games") {
      if (product.brand === "Genshin Impact")
      if (product.type === "Umum")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
  case '8ballpool': {
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST 8 BALL POOL* 」\n";
    data10.forEach(function(product) {
      if (product.category === "Games") {
      if (product.brand === "8 Ball Pool")
      if (product.type === "Umum")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
  case 'lolwr': case 'wildrift': case 'lolwr': case 'leagueoflegendwildrift':{
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST LEAGUE OF LEGENS WILD RIFT* 」\n";
    data10.forEach(function(product) {
      if (product.category === "Games") {
      if (product.brand === "League Of Legends Wild Rift")
      if (product.type === "Umum")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
  case 'amongus': case 'among': case 'au': {
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST AMONG US* 」\n";
    data10.forEach(function(product) {
      if (product.category === "Games") {
      if (product.brand === "Among Us")
      if (product.type === "Umum")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
    case 'coc': case 'clashofclan': case 'clashofclans': {
      let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
      let listProduct10 = "「 *LIST CLASH OF CLANS* 」\n";
      data10.forEach(function(product) {
        if (product.category === "Games") {
        if (product.brand === "Clash Of Clans")
        if (product.type === "Umum")
      if (product.seller_product_status === "Normal") {
         listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
          } else {
          listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
        }
        }
      });
      
      reply(`${listProduct10}`)
      }
      break
  
  case 'supersus': {
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST SUPER SUS* 」\n";
    data10.forEach(function(product) {
      if (product.category === "Games") {
      if (product.brand === "Super Sus")
      if (product.type === "Umum")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
  case 'stumble':  case 'stumbleguys':{
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST STUMBLE GUYS* 」\n";
    data10.forEach(function(product) {
      if (product.category === "Games") {
      if (product.brand === "Stumble Guys")
      if (product.type === "Umum")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
  case 'honkaiimpact3':  case 'honkaiimpact':{
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST HONKAI IMPACT 3* 」\n";
    data10.forEach(function(product) {
      if (product.category === "Games") {
      if (product.brand === "Honkai Impact 3")
      if (product.type === "Umum")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
  case 'ragnarok':  case 'ragnarokorigin':{
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST RAGNAROK ORIGIN* 」\n";
    data10.forEach(function(product) {
      if (product.category === "Games") {
      if (product.brand === "Ragnarok Origin")
      if (product.type === "Umum")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
  case 'lita': {
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST LITA* 」\n";
    data10.forEach(function(product) {
      if (product.category === "Games") {
      if (product.brand === "Lita")
      if (product.type === "Umum")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
  case 'honkaistarrail': {
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST HONKAI STAR RAIL* 」\n";
    data10.forEach(function(product) {
      if (product.category === "Games") {
      if (product.brand === "Honkai Star Rail")
      if (product.type === "Umum")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
  case 'likee': {
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST LIKEE* 」\n";
    data10.forEach(function(product) {
      if (product.category === "Games") {
      if (product.brand === "Likee")
      if (product.type === "Umum")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
  case 'clashroyal':  case 'clashroyale':{
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST CLASH ROYALE* 」\n";
    data10.forEach(function(product) {
      if (product.category === "Games") {
      if (product.brand === "Clash Royale")
      if (product.type === "Umum")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
  case 'sealmsea': {
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST SEAL M SEA* 」\n";
    data10.forEach(function(product) {
      if (product.category === "Games") {
      if (product.brand === "Seal M Sea")
      if (product.type === "Umum")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
  case 'topeleven': {
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST TOP ELEVEN* 」\n";
    data10.forEach(function(product) {
      if (product.category === "Games") {
      if (product.brand === "Top Eleven")
      if (product.type === "Umum")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
  case 'undawn': {
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST UNDAWN* 」\n";
    data10.forEach(function(product) {
      if (product.category === "Games") {
      if (product.brand === "Undawn")
      if (product.type === "Umum")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
  case 'metalslugawakening': {
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST METAL SLUG AWAKENING* 」\n";
    data10.forEach(function(product) {
      if (product.category === "Games") {
      if (product.brand === "Metal Slug Awakening")
      if (product.type === "Umum")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
  case 'bloodstrike': {
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST BLOOD STRIKE* 」\n";
    data10.forEach(function(product) {
      if (product.category === "Games") {
      if (product.brand === "Blood Strike")
      if (product.type === "Umum")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
  //=============================================== CASE VOUCHER  ================================
  case 'vouchertelkomsel': {
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST VOUCHER TELKOMSEL* 」\n";
    data10.forEach(function(product) {
      if (product.category === "Voucher") {
      if (product.brand === "TELKOMSEL")
      // if (product.type === "Umum")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
  case 'voucherindosat': {
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST VOUCHER INDOSAT* 」\n";
    data10.forEach(function(product) {
      if (product.category === "Voucher") {
      if (product.brand === "INDOSAT")
      // if (product.type === "Umum")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
  case 'voucheraxis': {
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST VOUCHER AXIS* 」\n";
    data10.forEach(function(product) {
      if (product.category === "Voucher") {
      if (product.brand === "AXIS")
      // if (product.type === "Umum")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
  case 'voucherxl': {
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST VOUCHER XL* 」\n";
    data10.forEach(function(product) {
      if (product.category === "Voucher") {
      if (product.brand === "XL")
      // if (product.type === "Umum")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
  case 'vouchertri': {
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST VOUCHER TRI* 」\n";
    data10.forEach(function(product) {
      if (product.category === "Voucher") {
      if (product.brand === "TRI")
      // if (product.type === "Umum")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
  case 'vouchersmartfren': {
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST VOUCHER SMARTFREN* 」\n";
    data10.forEach(function(product) {
      if (product.category === "Voucher") {
      if (product.brand === "SMARTFREN")
      // if (product.type === "Umum")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
  case 'vouchergarena': {
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST VOUCHER GARENA* 」\n";
    data10.forEach(function(product) {
      if (product.category === "Voucher") {
      if (product.brand === "GARENA")
      // if (product.type === "Umum")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
  case 'vouchergpindo': {
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST VOUCHER GOOGLE PLAY ID* 」\n";
    data10.forEach(function(product) {
      if (product.category === "Voucher") {
      if (product.brand === "GOOGLE PLAY INDONESIA")
      // if (product.type === "Umum")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
  case 'vouchermegaxus': {
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST VOUCHER MEGAXUS* 」\n";
    data10.forEach(function(product) {
      if (product.category === "Voucher") {
      if (product.brand === "MEGAXUS")
      // if (product.type === "Umum")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
  case 'voucherrazergold': {
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST VOUCHER RAZER GOLD* 」\n";
    data10.forEach(function(product) {
      if (product.category === "Voucher") {
      if (product.brand === "Razer Gold")
      // if (product.type === "Umum")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
  case 'voucherwifiid': {
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST VOUCHER WIFI ID* 」\n";
    data10.forEach(function(product) {
      if (product.category === "Voucher") {
      if (product.brand === "WIFI ID")
      // if (product.type === "Umum")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
  case 'voucherpb': case 'voucherpointblank':{
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST VOUCHER POINT BLANK* 」\n";
    data10.forEach(function(product) {
      if (product.category === "Voucher") {
      if (product.brand === "POINT BLANK")
      // if (product.type === "Umum")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
  case 'voucherunipin': {
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST VOUCHER UNIPIN* 」\n";
    data10.forEach(function(product) {
      if (product.category === "Voucher") {
      if (product.brand === "Unipin Voucher")
      // if (product.type === "Umum")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
  case 'vouchernintendoeshop': {
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST VOUCHER NINTENDO E-SHOP* 」\n";
    data10.forEach(function(product) {
      if (product.category === "Voucher") {
      if (product.brand === "Nintendo eShop")
      // if (product.type === "Umum")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
  case 'voucherxbox': {
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST VOUCHER XBOX* 」\n";
    data10.forEach(function(product) {
      if (product.category === "Voucher") {
      if (product.brand === "XBOX")
      // if (product.type === "Umum")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
  //=============================================== CASE E-MONEY ================================
  case 'gopaycus': {
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST GOPAY CUSTOMER* 」\n";
    data10.forEach(function(product) {
      if (product.category === "E-Money") {
      if (product.brand === "GO PAY")
      if (product.type === "Customer")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
  case 'gopaydriv': {
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST GOPAY DRIVER* 」\n";
    data10.forEach(function(product) {
      if (product.category === "E-Money") {
      if (product.brand === "GO PAY")
      if (product.type === "Driver")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
  case 'mandirietoll': {
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST MANDIRI E-TOLL* 」\n";
    data10.forEach(function(product) {
      if (product.category === "E-Money") {
      if (product.brand === "MANDIRI E-TOLL")
      if (product.type === "Umum")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
  case 'ovo': {
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST OVO* 」\n";
    data10.forEach(function(product) {
      if (product.category === "E-Money") {
      if (product.brand === "OVO")
      if (product.type === "Admin 1000")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
  case 'grabcus': {
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST GRAB CUSTOMER* 」\n";
    data10.forEach(function(product) {
      if (product.category === "E-Money") {
      if (product.brand === "GRAB")
      if (product.type === "Umum")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
    case 'grabdriv': {
      let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
      let listProduct10 = "「 *LIST GRAB DRIVER* 」\n";
      data10.forEach(function(product) {
        if (product.category === "E-Money") {
        if (product.brand === "GRAB")
        if (product.type === "Driver")
      if (product.seller_product_status === "Normal") {
         listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
          } else {
          listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
        }
        }
      });
      
      reply(`${listProduct10}`)
      }
      break
  
  case 'dana': {
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST DANA* 」\n";
    data10.forEach(function(product) {
      if (product.category === "E-Money") {
      if (product.brand === "DANA")
      if (product.type === "Umum")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
  case 'tixid': {
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST TIX ID* 」\n";
    data10.forEach(function(product) {
      if (product.category === "E-Money") {
      if (product.brand === "TIX ID")
      if (product.type === "Umum")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
  case 'linkaja': {
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST LINK AJA* 」\n";
    data10.forEach(function(product) {
      if (product.category === "E-Money") {
      if (product.brand === "LinkAja")
      if (product.type === "Umum")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
  case 'tapcashbni': {
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST TAPCASH BNI* 」\n";
    data10.forEach(function(product) {
      if (product.category === "E-Money") {
      if (product.brand === "TAPCASH BNI")
      if (product.type === "Umum")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
  case 'shopeepay': {
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST SHOPEE PAY* 」\n";
    data10.forEach(function(product) {
      if (product.category === "E-Money") {
      if (product.brand === "SHOPEE PAY")
      if (product.type === "Umum")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
  case 'brizzi': {
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST BRIZZI* 」\n";
    data10.forEach(function(product) {
      if (product.category === "E-Money") {
      if (product.brand === "BRI BRIZZI")
      if (product.type === "Umum")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
  case 'mitrashopee': {
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST MITRA SHOPEE* 」\n";
    data10.forEach(function(product) {
      if (product.category === "E-Money") {
      if (product.brand === "Mitra Shopee")
      if (product.type === "Umum")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
  case 'isaku': {
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST ISAKU* 」\n";
    data10.forEach(function(product) {
      if (product.category === "E-Money") {
      if (product.brand === "i.saku")
      if (product.type === "Umum")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
  case 'maximcus': {
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST MAXIM CUSTOMER* 」\n";
    data10.forEach(function(product) {
      if (product.category === "E-Money") {
      if (product.brand === "MAXIM")
      if (product.type === "Customer")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
  case 'maximdriv': {
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST MAXIM DRIVER* 」\n";
    data10.forEach(function(product) {
      if (product.category === "E-Money") {
      if (product.brand === "MAXIM")
      if (product.type === "Driver")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
  case 'sakuku': {
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST SAKUKU* 」\n";
    data10.forEach(function(product) {
      if (product.category === "E-Money") {
      if (product.brand === "Sakuku")
      if (product.type === "Umum")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  //=============================================== TOKEN PLN ================================
  case 'tokenpln': {
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST TOKEN PLN* 」\n";
    data10.forEach(function(product) {
      if (product.category === "PLN") {
      if (product.brand === "PLN")
      if (product.type === "Umum")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
  //=============================================== PAKET NELP & SMS================================
  case 'tlpsmstelkomsel': {
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST TELP & SMS TELKOMSEL* 」\n";
    data10.forEach(function(product) {
      if (product.category === "Paket SMS & Telpon") {
      if (product.brand === "TELKOMSEL")
      // if (product.type === "Umum")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
  case 'tlpsmsindosat': {
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST TELP & SMS INDOSAT* 」\n";
    data10.forEach(function(product) {
      if (product.category === "Paket SMS & Telpon") {
      if (product.brand === "INDOSAT")
      // if (product.type === "Umum")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
  case 'tlpsmsaxis': {
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST TELP & SMS AXIS* 」\n";
    data10.forEach(function(product) {
      if (product.category === "Paket SMS & Telpon") {
      if (product.brand === "AXIS")
      // if (product.type === "Umum")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
  case 'tlpsmsxl': {
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST TELP & SMS XL* 」\n";
    data10.forEach(function(product) {
      if (product.category === "Paket SMS & Telpon") {
      if (product.brand === "XL")
      // if (product.type === "Umum")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
  case 'tlpsmstri': {
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST TELP & SMS TRI* 」\n";
    data10.forEach(function(product) {
      if (product.category === "Paket SMS & Telpon") {
      if (product.brand === "TRI")
      // if (product.type === "Umum")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
  //=============================================== CASE MASA AKTIF ================================
  
  case 'telkomselmasaaktif': {
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST MASA AKTIF TELKOMSEL* 」\n";
    data10.forEach(function(product) {
      if (product.category === "Masa Aktif") {
      if (product.brand === "TELKOMSEL")
      // if (product.type === "Umum")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
  case 'indosatmasaaktif': {
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST MASA AKTIF INDOSAT* 」\n";
    data10.forEach(function(product) {
      if (product.category === "Masa Aktif") {
      if (product.brand === "INDOSAT")
      // if (product.type === "Umum")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
  case 'axismasaaktif': {
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST MASA AKTIF AXIS* 」\n";
    data10.forEach(function(product) {
      if (product.category === "Masa Aktif") {
      if (product.brand === "AXIS")
      // if (product.type === "Umum")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
  case 'trimasaaktif': {
    let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/dataariepulsa.json'));
let uphar = `${cek("upharga", m.sender)}`
let lev = `${cek("level", m.sender)}`
          data10.sort((a, b) => a.price - b.price);
    let listProduct10 = "「 *LIST MASA AKTIF TRI* 」\n";
    data10.forEach(function(product) {
      if (product.category === "Masa Aktif") {
      if (product.brand === "TRI")
      // if (product.type === "Umum")
    if (product.seller_product_status === "Normal") {
       listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : 🟢\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
      } else {
      listProduct10 += `=> ${product.product_name}\n=> Level: ${lev}\n=> Harga: ${formatmoney(product.price + product.price * (uphar / 100) + 100)}\n=> *Kode : ${product.buyer_sku_code.replace("", "")}*\n=> Status : ⛔\n=> Category : ${product.category}\n=> Ketik : topup ${product.buyer_sku_code.replace("", "")}|Tujuan\n\n`;
    }
    }
  });
    
    reply(`${listProduct10}`)
    }
    break
  
  //=============================================== CASE LAINNYA ================================
  
  case 'req': case 'request':{
  if (!text) return reply(`Jika Ada Produk Yang Ingin Ditambahkan
  
  Silahkan ketik :
  .Request NamaProduk
  
  Contoh :
  .Request Min Tolong Tambahin Game Freefire`)
    reply(`Sip, Saran Anda Telah Kami Terima`)
  arie.sendMessage(nomorKu, {text: `Saran: ${text}
  Sender: wa.me/${sender.split("@")[0]}`                                           
  })
  }
  break;

  case 'reset': {
    if (!isOwner) return reply (mess.owner)
    const filePath = './Pengaturan/database/dataariepulsa.json';
    const filePath2 = './Pengaturan/database/admin.json';

    try {
        // Write an empty array to the file
        fs.writeFileSync(filePath, '[]', 'utf8');
        fs.writeFileSync(filePath2, '[]', 'utf8');
        reply("Sip, Berhasil Menghapus");

    } catch (error) {
        console.error('Error resetting data:', error);
        reply('An error occurred while resetting data.');
    }

    break;
}

case 'minsaldo':{
  if(!isOwner) return reply(mess.owner)
  if(!text) return reply(`*Contoh :*\n${prefix}addsaldo 62xx|10000`)
  let saldo = text.split("|")[1] * 1
  let id = text.split("|")[0]
  if(!saldo) throw `Masukan Saldonya!!`
  sett("-saldo", id+"@s.whatsapp.net", saldo)
  m.reply(`Sukses mengurangkan saldo pada akun\n*ID :* ${id}\n*Tag :* @${id}\nJumlah saldo sekarang : *${cek("saldo", id+"@s.whatsapp.net")}*`)
  setTimeout(function(){
  arie.sendMessage(id+"@s.whatsapp.net", {text:`*Hai Kak👋*\n\nSaldo telah dikurangkan ke akun kamu sejumlah : *${formatmoney(saldo)}*\n\nSisa saldo kamu saat ini : *Rp ${cek("saldo", id+"@s.whatsapp.net")}*`}) 
  }, 5000)
  sett("deposit", m.sender, "")
  sett("reff_deposit", m.sender, "")
  sett("status", id+"@s.whatsapp.net", true)
  sett("status_deposit", id+"@s.whatsapp.net", true) 
  sett("tanggal_deposit", m.sender, "")
  }
  break

  case 'tambahsaldo':{
    if(!isOwner) return reply(mess.owner)
    if(!text) return reply(`*Contoh :*\n${prefix}tambahsaldo 62xx|10000`)
    let saldo = text.split("|")[1] * 1
    let id = text.split("|")[0]
    if(!saldo) throw `Masukan Saldonya!!`
    sett("+saldo", id+"@s.whatsapp.net", parseInt(saldo))
    m.reply(`Sukses menambahkan saldo pada akun\n*ID :* ${id}\n*Tag :* @${id}\nJumlah saldo sekarang : *${cek("saldo", id+"@s.whatsapp.net")}*`)
    setTimeout(function(){
    arie.sendMessage(id+"@s.whatsapp.net", {text:`*Hai Kak👋*\n\nSaldo telah ditambahkan ke akun kamu sejumlah : *${formatmoney(saldo)}*\n\nSisa saldo kamu saat ini : *Rp ${cek("saldo", id+"@s.whatsapp.net")}*`}) 
    }, 5000)
    sett("deposit", id+"@s.whatsapp.net", "")
    sett("reff_deposit", id+"@s.whatsapp.net", "")
    sett("status", id+"@s.whatsapp.net", true)
    sett("status_deposit", id+"@s.whatsapp.net", true)
    sett("tanggal_deposit", id+"@s.whatsapp.net", "")
    }
    break

  //================================================================================
case 'tambah':
  if (!q) return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1+2`)
  var num_one = q.split('+')[0]
  var num_two = q.split('+')[1]
  if (!num_one) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1+2`)
  if (!num_two) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1+2`)
  var nilai_one = Number(num_one)
  var nilai_two = Number(num_two)
  reply(`${nilai_one + nilai_two}`)
  break
  
  case 'kurang':
  if (!q) return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1-2`)
  var num_one = q.split('-')[0]
  var num_two = q.split('-')[1]
  if (!num_one) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1-2`)
  if (!num_two) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1-2`)
  var nilai_one = Number(num_one)
  var nilai_two = Number(num_two)
  reply(`${nilai_one - nilai_two}`)
  break
  
  case 'kali':
  if (!q) return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1*2`)
  var num_one = q.split('*')[0]
  var num_two = q.split('*')[1]
  if (!num_one) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1*2`)
  if (!num_two) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1*2`)
  var nilai_one = Number(num_one)
  var nilai_two = Number(num_two)
  reply(`${nilai_one * nilai_two}`)
  break
  
  case 'bagi':
  if (!q) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${command} 1:2`)
  var num_one = q.split(':')[0]
  var num_two = q.split(':')[1]
  if (!num_one) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1:2`)
  if (!num_two) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1:2`)
  var nilai_one = Number(num_one)
  var nilai_two = Number(num_two)
  reply(`${nilai_one / nilai_two}`)
  break

  //=================================================//
case 'block': {
  if (!isOwner) throw mess.owner;

  let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net';
  
  // Send a pre-block message
  await arie.sendMessage(users, {text: `Kamu Akan Diblacklist/Blokir, Untuk Informasi Lebih Lanjut Silahkan Hubungi Admin wa.me/${owner}`});

  // Introduce a 2-second delay
  setTimeout(async () => {
      // Update block status
      await arie.updateBlockStatus(users, 'block').then(() => {
          // Write to block.json
          const blockedUsers = JSON.parse(fs.readFileSync('./Pengaturan/database/block.json', 'utf8')) || [];
          if (!blockedUsers.includes(users)) {
              blockedUsers.push(users);
              fs.writeFileSync('./Pengaturan/database/block.json', JSON.stringify(blockedUsers, null, 2), 'utf8');
          }
          m.reply('Sip, Berhasil Memblokir Pengguna');
      }).catch((err) => m.reply(jsonformat(err)));
  }, 5000); // 2000 milliseconds (2 seconds)
}
break;

case 'unblock': {
  if (!isOwner) throw mess.owner;

  let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net';

  // Update block status
  await arie.updateBlockStatus(users, 'unblock').then(async () => {
      // Send a message after unblocking
      await arie.sendMessage(users, {text: 'Blacklist Telah Dibuka, Harap Tidak Melanggar Peraturan Kembali:)'});
      
      // Remove user from block.json
      const blockedUsers = JSON.parse(fs.readFileSync('./Pengaturan/database/block.json', 'utf8')) || [];
      const index = blockedUsers.indexOf(users);
      if (index !== -1) {
          blockedUsers.splice(index, 1);
          fs.writeFileSync('./Pengaturan/database/block.json', JSON.stringify(blockedUsers, null, 2), 'utf8');
      }

      m.reply('Sip, Berhasil Membuka Blokir Pengguna');
  }).catch((err) => m.reply(jsonformat(err)));
}
break;

case 'listblock': {
  if (!isOwner) throw mess.owner;

  try {
      // Read the blocked users from block.json
      const blockedUsers = JSON.parse(fs.readFileSync('./Pengaturan/database/block.json', 'utf8')) || [];

      // Add a user to the end of the blockedUsers array
      

      // Create an array of formatted user entries with index and user without '@s.whatsapp.net' suffix
      const formattedList = blockedUsers.map((user, index) => `${index + 1}. ${user.replace(/@s.whatsapp.net$/, '')}`).join('\n');

      // Send the formatted list as a reply, including the total number of blocked users
      m.reply(`Jumlah yang di block: ${blockedUsers.length}\n\nBlocked Users:\n${formattedList}`);
  } catch (error) {
      m.reply(`Error reading block.json: ${error.message}`);
  }
}
break;
//===================================== CASE SOSMED ========================================
case 'soundcloudplays': case 'soundcloud': case 'scplays': case 'sc': {
  let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/sosmedariepulsa.json'));
  let uphar = parseFloat(cek("upharga", m.sender)) / 100; // Ambil nilai uphar dan bagi dengan 100
  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => a.harga - b.harga);
  let listProduct10 = "「 *LIST SOUND CLOUD PLAYS* 」\n";
  data10.forEach(function(product) {
      if (product.kategori === "SoundCloud") {
          let harga = parseFloat(product.harga);
          let hargaFinal = (harga + harga * uphar + 100).toFixed(0); // Gunakan nilai uphar langsung
          listProduct10 += `=> ${product.layanan}\n=> Level: ${lev}\n=> Harga: ${hargaFinal}\n=> *Kode : ${product.sid.replace("", "")}*\n=> Min : ${product.min}\n=> Max : ${product.max}\n=> Catatan : ${product.catatan}\n=> Status : 🟢\n=> Category : ${product.kategori}\n=> Ketik : sosmed ${product.sid.replace("", "")}|Link/Username\n\n`;
      }
  });

  reply(`${listProduct10}`);
}
break;

case 'telegrampostview': case 'telegramview': case 'tpv': case 'tv': {
  let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/sosmedariepulsa.json'));
  let uphar = parseFloat(cek("upharga", m.sender)) / 100; // Ambil nilai uphar dan bagi dengan 100
  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => a.harga - b.harga);
  let listProduct10 = "「 *LIST TELEGRAM POST VIEWS* 」\n";
  data10.forEach(function(product) {
      if (product.kategori === "Telegram Post View") {
          let harga = parseFloat(product.harga);
          let hargaFinal = (harga + harga * uphar + 100).toFixed(0); // Gunakan nilai uphar langsung
          listProduct10 += `=> ${product.layanan}\n=> Level: ${lev}\n=> Harga: ${hargaFinal}\n=> *Kode : ${product.sid.replace("", "")}*\n=> Min : ${product.min}\n=> Max : ${product.max}\n=> Catatan : ${product.catatan}\n=> Status : 🟢\n=> Category : ${product.kategori}\n=> Ketik : sosmed ${product.sid.replace("", "")}|Link/Username\n\n`;
      }
  });

  reply(`${listProduct10}`);
}
break;

case 'instagramstoryview': case 'instagramview': case 'isv': case 'iv': {
  let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/sosmedariepulsa.json'));
  let uphar = parseFloat(cek("upharga", m.sender)) / 100; // Ambil nilai uphar dan bagi dengan 100
  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => a.harga - b.harga);
  let listProduct10 = "「 *LIST INSTAGRAM STORY VIEWS* 」\n";
  data10.forEach(function(product) {
      if (product.kategori === "Instagram Story Views") {
          let harga = parseFloat(product.harga);
          let hargaFinal = (harga + harga * uphar + 100).toFixed(0); // Gunakan nilai uphar langsung
          listProduct10 += `=> ${product.layanan}\n=> Level: ${lev}\n=> Harga: ${hargaFinal}\n=> *Kode : ${product.sid.replace("", "")}*\n=> Min : ${product.min}\n=> Max : ${product.max}\n=> Catatan : ${product.catatan}\n=> Status : 🟢\n=> Category : ${product.kategori}\n=> Ketik : sosmed ${product.sid.replace("", "")}|Link/Username\n\n`;
      }
  });

  reply(`${listProduct10}`);
}
break;

case 'instagramlivevideo': case 'instagramlive': case 'ilv': case 'il': {
  let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/sosmedariepulsa.json'));
  let uphar = parseFloat(cek("upharga", m.sender)) / 100; // Ambil nilai uphar dan bagi dengan 100
  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => a.harga - b.harga);
  let listProduct10 = "「 *LIST INSTAGRAM LIVE VIDEO LIKES* 」\n";
  data10.forEach(function(product) {
      if (product.kategori === "Instagram Live Video") {
          let harga = parseFloat(product.harga);
          let hargaFinal = (harga + harga * uphar + 100).toFixed(0); // Gunakan nilai uphar langsung
          listProduct10 += `=> ${product.layanan}\n=> Level: ${lev}\n=> Harga: ${hargaFinal}\n=> *Kode : ${product.sid.replace("", "")}*\n=> Min : ${product.min}\n=> Max : ${product.max}\n=> Catatan : ${product.catatan}\n=> Status : 🟢\n=> Category : ${product.kategori}\n=> Ketik : sosmed ${product.sid.replace("", "")}|Link/Username\n\n`;
      }
  });

  reply(`${listProduct10}`);
}
break;

case 'instagramimpressions': case 'instagramimpression': case 'ii': case 'imp': {
  let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/sosmedariepulsa.json'));
  let uphar = parseFloat(cek("upharga", m.sender)) / 100; // Ambil nilai uphar dan bagi dengan 100
  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => a.harga - b.harga);
  let listProduct10 = "「 *LIST INSTAGRAM IMPRESSIONS* 」\n";
  data10.forEach(function(product) {
      if (product.kategori === "Instagram Story / Impressions / Saves / Profile Vi") {
          let harga = parseFloat(product.harga);
          let hargaFinal = (harga + harga * uphar + 100).toFixed(0); // Gunakan nilai uphar langsung
          listProduct10 += `=> ${product.layanan}\n=> Level: ${lev}\n=> Harga: ${hargaFinal}\n=> *Kode : ${product.sid.replace("", "")}*\n=> Min : ${product.min}\n=> Max : ${product.max}\n=> Catatan : ${product.catatan}\n=> Status : 🟢\n=> Category : ${product.kategori}\n=> Ketik : sosmed ${product.sid.replace("", "")}|Link/Username\n\n`;
      }
  });

  reply(`${listProduct10}`);
}
break;

case 'twitterviews': case 'twitterimpressions': case 'twv': case 'twi': {
  let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/sosmedariepulsa.json'));
  let uphar = parseFloat(cek("upharga", m.sender)) / 100; // Ambil nilai uphar dan bagi dengan 100
  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => a.harga - b.harga);
  let listProduct10 = "「 *LIST TWITTER VIEWS & IMPRESSIONS* 」\n";
  data10.forEach(function(product) {
      if (product.kategori === "Twitter Views & Impressions") {
          let harga = parseFloat(product.harga);
          let hargaFinal = (harga + harga * uphar + 100).toFixed(0); // Gunakan nilai uphar langsung
          listProduct10 += `=> ${product.layanan}\n=> Level: ${lev}\n=> Harga: ${hargaFinal}\n=> *Kode : ${product.sid.replace("", "")}*\n=> Min : ${product.min}\n=> Max : ${product.max}\n=> Catatan : ${product.catatan}\n=> Status : 🟢\n=> Category : ${product.kategori}\n=> Ketik : sosmed ${product.sid.replace("", "")}|Link/Username\n\n`;
      }
  });

  reply(`${listProduct10}`);
}
break;

case 'websitetraffic': case 'webtraffic': case 'wt': {
  let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/sosmedariepulsa.json'));
  let uphar = parseFloat(cek("upharga", m.sender)) / 100; // Ambil nilai uphar dan bagi dengan 100
  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => a.harga - b.harga);
  let listProduct10 = "「 *LIST WEBSITE TRAFFIC* 」\n";
  data10.forEach(function(product) {
      if (product.kategori === "Website Traffic") {
          let harga = parseFloat(product.harga);
          let hargaFinal = (harga + harga * uphar + 100).toFixed(0); // Gunakan nilai uphar langsung
          listProduct10 += `=> ${product.layanan}\n=> Level: ${lev}\n=> Harga: ${hargaFinal}\n=> *Kode : ${product.sid.replace("", "")}*\n=> Min : ${product.min}\n=> Max : ${product.max}\n=> Catatan : ${product.catatan}\n=> Status : 🟢\n=> Category : ${product.kategori}\n=> Ketik : sosmed ${product.sid.replace("", "")}|Link/Username\n\n`;
      }
  });

  reply(`${listProduct10}`);
}
break;

case 'tiktokview': case 'tiktok': case 'ttview': {
  let data10 = JSON.parse(fs.readFileSync('./Pengaturan/database/sosmedariepulsa.json'));
  let uphar = parseFloat(cek("upharga", m.sender)) / 100; // Ambil nilai uphar dan bagi dengan 100
  let lev = `${cek("level", m.sender)}`;
  data10.sort((a, b) => a.harga - b.harga);
  let listProduct10 = "「 *LIST TIKTOK VIEW* 」\n";
  data10.forEach(function(product) {
      if (product.kategori === "TikTok View") {
          let harga = parseFloat(product.harga);
          let hargaFinal = (harga + harga * uphar + 100).toFixed(0); // Gunakan nilai uphar langsung
          listProduct10 += `=> ${product.layanan}\n=> Level: ${lev}\n=> Harga: ${hargaFinal}\n=> *Kode : ${product.sid.replace("", "")}*\n=> Min : ${product.min}\n=> Max : ${product.max}\n=> Catatan : ${product.catatan}\n=> Status : 🟢\n=> Category : ${product.kategori}\n=> Ketik : sosmed ${product.sid.replace("", "")}|Link/Username\n\n`;
      }
  });

  reply(`${listProduct10}`);
}
break;





//==================================CASE REKAPAN==============================================
case "toplayanan": {
  const filePath = './Pengaturan/database/trxuser.json';

  try {
      const fileData = fs.readFileSync(filePath, 'utf8');
      const allTransactions = JSON.parse(fileData);

      if (Array.isArray(allTransactions) && allTransactions.length > 0) {
          const productDetails = allTransactions.reduce((acc, transaction) => {
              const productName = transaction.produk;

              if (!acc[productName]) {
                  acc[productName] = {
                      count: 0,
                      totalHarga: 0
                  };
              }

              acc[productName].count += 1;
              acc[productName].totalHarga += transaction.harga; // Assuming the property name is 'Harga'

              return acc;
          }, {});

          const sortedProducts = Object.keys(productDetails).sort((a, b) => productDetails[b].count - productDetails[a].count);
          const topProducts = sortedProducts.slice(0, 10);

          const topProductsList = topProducts.map((product, index) => `𝗣𝗲𝗿𝗶𝗻𝗴𝗸𝗮𝘁 ${index + 1}\n𝗡𝗮𝗺𝗮 𝗣𝗿𝗼𝗱𝘂𝗸 : ${product}\n𝗝𝘂𝗺𝗹𝗮𝗵 𝗣𝗲𝗺𝗯𝗲𝗹𝗶𝗮𝗻 : ${productDetails[product].count}\n𝗧𝗼𝘁𝗮𝗹 𝗧𝗿𝗮𝗻𝘀𝗮𝗸𝘀𝗶 : ${formatmoney(productDetails[product].totalHarga)}\n`).join('\n');
          
          // Calculate total price across all products
          const totalPrice = Object.values(productDetails).reduce((total, product) => total + product.totalHarga, 0);

          reply(`𝗧𝗼𝗽 𝟭𝟬 𝗣𝗿𝗼𝗱𝘂𝗸 𝗕𝗲𝗿𝗱𝗮𝘀𝗮𝗿𝗸𝗮𝗻 𝗝𝘂𝗺𝗹𝗮𝗵 𝗣𝗲𝗺𝗯𝗲𝗹𝗶𝗮𝗻\n\n${topProductsList}`);
      } else {
          reply("Gagal, No transaction data found.");
      }
  } catch (error) {
      console.error('Error reading/parsing the JSON file:', error);
      reply("Gagal, Terjadi kesalahan saat memproses perintah.");
  }
  break;
}
case 'topuser': {
  const filePath = './Pengaturan/database/trxuser.json';

  try {
      // Read the JSON file
      const fileData = fs.readFileSync(filePath, 'utf8');
      const allUserData = JSON.parse(fileData);

      if (allUserData.length === 0) {
          return reply("Gagal, Tidak Ditemukan Data Transaksi");
      }

      // Create a map to store buyer information
      const buyerMap = new Map();

      // Initialize variables for overall totalHarga, totalHargaModal, totalProfit, totalTransactions
      let overallTotalHarga = 0;
      let overallTotalHargaModal = 0;
      let overallTotalProfit = 0;
      let overallTotalTransactions = 0;

      // Get the current month and year
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1; // January is 0
      const tauniyeu = currentDate.getFullYear();
      const currentYear = currentDate.getFullYear() % 100; // Extract last two digits of the year

      // Iterate through all transaction history to calculate totalHarga, totalHargaModal, totalProfit, and collect details
      allUserData.forEach(data => {
          // Extract the buyer without @s.whatsapp.net
          const buyerWithoutSuffix = data.buyer.split('@')[0];

          // Extract the transaction date
          const waktuComponents = data.waktu.split('/');
          const transactionDay = parseInt(waktuComponents[0], 10);
          const transactionMonth = parseInt(waktuComponents[1], 10);
          const transactionYear = parseInt(waktuComponents[2], 10);

          // Check if the transaction is in the current month and year
          if (transactionMonth === currentMonth && transactionYear === currentYear) {
              // Update overall totals
              overallTotalHarga += parseFloat(data.harga);
              overallTotalTransactions += 1;

              // Calculate totalHargaModal as the sum of harga_modal for each transaction
              const hargaModal = parseFloat(data.harga_modal);
              overallTotalHargaModal += isNaN(hargaModal) ? 0 : hargaModal;

              // Calculate profit for each transaction
              const profit = parseFloat(data.harga) - (isNaN(hargaModal) ? 0 : hargaModal);
              overallTotalProfit += profit;

              // Check if buyer is already in the map
              if (buyerMap.has(buyerWithoutSuffix)) {
                  // Update existing buyer's total transactions, total harga, total harga modal, and total profit
                  const buyerInfo = buyerMap.get(buyerWithoutSuffix);
                  buyerInfo.totalTransactions += 1;
                  buyerInfo.totalHarga += parseFloat(data.harga);
                  buyerInfo.totalHargaModal += isNaN(hargaModal) ? 0 : hargaModal;
                  buyerInfo.totalProfit += profit;
              } else {
                  // Add new buyer to the map
                  buyerMap.set(buyerWithoutSuffix, {
                      totalTransactions: 1,
                      totalHarga: parseFloat(data.harga),
                      totalHargaModal: isNaN(hargaModal) ? 0 : hargaModal,
                      totalProfit: profit,
                  });
              }
          }
      });

      // Sort the buyer list by totalProfit in descending order
      const sortedBuyerList = Array.from(buyerMap).sort((a, b) => b[1].totalTransactions - a[1].totalTransactions);
      // Format the overall totalHarga, totalHargaModal, totalProfit, and totalTransactions as currencies
      const formattedOverallTotalHarga = new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR'
      }).format(overallTotalHarga);
      const formattedOverallTotalHargaModal = new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR'
      }).format(overallTotalHargaModal);
      const formattedOverallTotalProfit = new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR'
      }).format(overallTotalProfit);

    const monthNames = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];
const formattedCurrentMonth = monthNames[currentMonth - 1]; // Adjust month index
const formattedCurrentYear = currentYear;
const formattedtauniyeu = tauniyeu;
      const buyerList = sortedBuyerList.map(([buyer, info], index) => {
          const formattedTotalHarga = new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR'
          }).format(info.totalHarga);

          return `𝗣𝗲𝗿𝗶𝗻𝗴𝗸𝗮𝘁 ${index + 1}\n𝗨𝘀𝗲𝗿 : ${buyer}\n𝗝𝘂𝗺𝗹𝗮𝗵 𝗢𝗿𝗱𝗲𝗿𝘀 : ${info.totalTransactions}\n𝗧𝗼𝘁𝗮𝗹 𝗕𝗲𝗹𝗮𝗻𝗷𝗮 : ${formattedTotalHarga}\n`;
      });

     const replyMessage = `𝗧𝗼𝗽 𝟭𝟬 𝗨𝘀𝗲𝗿 𝗕𝗲𝗿𝗱𝗮𝘀𝗮𝗿𝗸𝗮𝗻 𝗝𝘂𝗺𝗹𝗮𝗵 𝗢𝗿𝗱𝗲𝗿𝘀 𝗨𝗻𝘁𝘂𝗸 𝗕𝘂𝗹𝗮𝗻 ${formattedCurrentMonth} 𝗧𝗮𝗵𝘂𝗻 ${formattedtauniyeu}\n\n${buyerList.join('\n')}`;
      

      reply(replyMessage);
  } catch (error) {
      console.error('Error reading the transaction history file:', error);
      reply("Gagal, Tidak Dapat Memuat Data");
  }
  break;
}
case 'persen': {
  const args = text.split(" ");

  // Check if the command has both amount and percentage
  if (args.length !== 2) {
      return reply('Invalid format. Please use: persen <amount> <percentage>');
  }

  const amount = parseFloat(args[0]);
  const percentage = parseFloat(args[1].replace('%', ''));

  // Check if both amount and percentage are valid numbers
  if (isNaN(amount) || isNaN(percentage)) {
      return reply('Gagal, Jumlah atau persentase tidak valid. Harap berikan nomor yang valid.');
  }

  // Function to format number with commas
  const formatNumber = (num) => {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Calculate the result
  const result = (amount * percentage) / 100;

  // Format amount and result with commas
  const formattedAmount = formatNumber(amount);
  const formattedResult = formatNumber(result);

  reply(`${formattedAmount} - ${percentage}% = ${formattedResult}`);
  break;
}
case 'cekriwayat': {
  const filePath = './Pengaturan/database/trxuser.json';
  try {
      // Read the JSON file
      const fileData = fs.readFileSync(filePath, 'utf8');
      const allUserData = JSON.parse(fileData);

      // Filter the data for the specific m.sender
      const userData = allUserData.filter(data => data.buyer === m.sender);

      if (userData.length === 0) {
          return reply("Gagal, Kamu Belum Memiliki Riwayat Transaksi.");
      }

      // Initialize variables for total harga and total transactions
      let totalHarga = 0;
      let totalTransactions = userData.length;

      // Iterate through the user's transaction history to calculate totalHarga
      userData.forEach(data => {
          totalHarga += parseFloat(data.harga);
});

      // Iterate through the user's transaction history to create historyText
      const historyText = userData.map((data, index) => {
          // Format the Harga as a number with currency symbol
          const formattedHarga = new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR'
          }).format(data.harga);

          return `🛒 𝗢𝗿𝗱𝗲𝗿𝘀 𝗞𝗲 ${index + 1} : 
› 𝗡𝗮𝗺𝗮 𝗣𝗿𝗼𝗱𝘂𝗸 : ${data.produk}
› 𝗧𝗿𝘅𝗶𝗱 : ${data.ref_id}
› 𝗧𝘂𝗷𝘂𝗮𝗻 : ${data.tujuan}
› 𝗛𝗮𝗿𝗴𝗮 : ${formattedHarga}
› 𝗪𝗮𝗸𝘁𝘂 : ${data.jam} | ${data.waktu}
› 𝗦𝗻/𝗞𝗲𝘁 : ${data.invoice}\n`;
      });

      // Format the total Harga as a currency
      const formattedTotalHarga = new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR'
      }).format(totalHarga);

      // Include the total Harga and total transactions in the reply
      const replyMessage = ` 𝗥𝗜𝗪𝗔𝗬𝗔𝗧 𝗢𝗥𝗗𝗘𝗥𝗦 

𝗧𝗼𝘁𝗮𝗹 𝗢𝗿𝗱𝗲𝗿𝘀 : ${totalTransactions}
𝗝𝘂𝗺𝗹𝗮𝗵 𝗢𝗿𝗱𝗲𝗿𝘀 : ${formattedTotalHarga}

${historyText.join('\n')}`;

      reply(replyMessage);
  } catch (error) {
      console.error('Error reading the transaction history file:', error);
      reply("Gagal, Ada Masalah Ketika Membaca data, silahkan hubungi Admin");
  }
  break;
}
case 'riwayat': {
  const filePath = './Pengaturan/database/trxuser.json';
  let tanggalFrom = text.split(" ")[0];
  let tanggalTo = text.split(" ")[1];

  // Check if both date inputs are provided
  if (!tanggalFrom || !tanggalTo) {
      return reply(`Gagal, Masukan Tanggal Awal & Akhir.\nContoh: ${prefix}riwayat 10/11/23 11/11/23`);
  }

  try {
      // Read the JSON file
      const fileData = fs.readFileSync(filePath, 'utf8');
      const allUserData = JSON.parse(fileData);

      // Filter the data for the specific m.sender and within the date range
      const userData = allUserData.filter(data =>
          data.buyer === m.sender &&
          isWithinDateRange(data.waktu, tanggalFrom, tanggalTo)
      );

      if (userData.length === 0) {
          return reply(`Gagal, Tidak Ada Transaksi Yang Tercatat Pada Tanggal : ${tanggalFrom} - ${tanggalTo}`);
      }

      // Initialize variables for total harga and total transactions
      let totalHarga = 0;
      let totalTransactions = userData.length;

      // Iterate through the user's transaction history to calculate totalHarga
      userData.forEach(data => {
          totalHarga += parseFloat(data.harga);
      });

      // Iterate through the user's transaction history to create historyText
      const historyText = userData.map((data, index) => {
          // Format the Harga as a number with currency symbol
          const formattedHarga = new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR'
          }).format(data.harga);

          return `🛒 𝗢𝗿𝗱𝗲𝗿𝘀 𝗞𝗲 ${index + 1} : 
› 𝗡𝗮𝗺𝗮 𝗣𝗿𝗼𝗱𝘂𝗸 : ${data.produk}
› 𝗧𝗿𝘅𝗶𝗱 : ${data.ref_id}
› 𝗧𝘂𝗷𝘂𝗮𝗻 : ${data.tujuan}
› 𝗛𝗮𝗿𝗴𝗮 : ${formattedHarga}
› 𝗪𝗮𝗸𝘁𝘂 : ${data.jam} | ${data.waktu}
› 𝗦𝗻/𝗞𝗲𝘁 : ${data.invoice}\n`;
      });

      // Format the total Harga as a currency
      const formattedTotalHarga = new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR'
      }).format(totalHarga);

      // Include the total Harga and total transactions in the reply
      const replyMessage = ` 𝗥𝗜𝗪𝗔𝗬𝗔𝗧 𝗢𝗥𝗗𝗘𝗥𝗦 

𝗧𝗼𝘁𝗮𝗹 𝗢𝗿𝗱𝗲𝗿𝘀 : ${totalTransactions}
𝗝𝘂𝗺𝗹𝗮𝗵 𝗢𝗿𝗱𝗲𝗿𝘀 : ${formattedTotalHarga}

${historyText.join('\n')}`;

      reply(replyMessage);
  } catch (error) {
      console.error('Error reading the transaction history file:', error);
       reply("Gagal, Ada Masalah Ketika Membaca data, silahkan hubungi Admin");
  }
  break;
}
case 'rekap': {
  if (!isOwner) return reply(mess.owner);

  const filePath = './Pengaturan/database/trxuser.json';

  try {
      // Read the JSON file
      const fileData = fs.readFileSync(filePath, 'utf8');
      const allUserData = JSON.parse(fileData);

      if (allUserData.length === 0) {
          return reply("Gagal, Tidak Ditemukan Data Transaksi");
      }

      // Create a map to store buyer information
      const buyerMap = new Map();

      // Initialize variables for overall totalHarga, totalHargaModal, totalProfit, totalTransactions
      let overallTotalHarga = 0;
      let overallTotalHargaModal = 0;
      let overallTotalProfit = 0;
      let overallTotalTransactions = 0;

      // Iterate through all transaction history to calculate totalHarga, totalHargaModal, totalProfit, and collect details
      allUserData.forEach(data => {
          // Extract the buyer without @s.whatsapp.net
          const buyerWithoutSuffix = data.buyer.split('@')[0];

          // Update overall totals
          overallTotalHarga += parseFloat(data.harga);
          overallTotalTransactions += 1;

          // Calculate totalHargaModal as the sum of harga_modal for each transaction
          const hargaModal = parseFloat(data.harga_modal);
          overallTotalHargaModal += isNaN(hargaModal) ? 0 : hargaModal;

          // Calculate profit for each transaction
          const profit = parseFloat(data.harga) - (isNaN(hargaModal) ? 0 : hargaModal);
          overallTotalProfit += profit;

          // Check if buyer is already in the map
          if (buyerMap.has(buyerWithoutSuffix)) {
              // Update existing buyer's total transactions, total harga, total harga modal, and total profit
              const buyerInfo = buyerMap.get(buyerWithoutSuffix);
              buyerInfo.totalTransactions += 1;
              buyerInfo.totalHarga += parseFloat(data.harga);
              buyerInfo.totalHargaModal += isNaN(hargaModal) ? 0 : hargaModal;
              buyerInfo.totalProfit += profit;
          } else {
              // Add new buyer to the map
              buyerMap.set(buyerWithoutSuffix, {
                  totalTransactions: 1,
                  totalHarga: parseFloat(data.harga),
                  totalHargaModal: isNaN(hargaModal) ? 0 : hargaModal,
                  totalProfit: profit,
              });
          }
      });

      // Sort the buyer list by totalProfit in descending order
      const sortedBuyerList = Array.from(buyerMap).sort((a, b) => b[1].totalProfit - a[1].totalProfit);

      // Format the overall totalHarga, totalHargaModal, totalProfit, and totalTransactions as currencies
      const formattedOverallTotalHarga = new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR'
      }).format(overallTotalHarga);
      const formattedOverallTotalHargaModal = new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR'
      }).format(overallTotalHargaModal);
      const formattedOverallTotalProfit = new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR'
      }).format(overallTotalProfit);

      // Create a list of buyers and their information including totalHargaModal and totalProfit
      const buyerList = sortedBuyerList.map(([buyer, info]) => {
          const formattedTotalHarga = new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR'
          }).format(info.totalHarga);
          const formattedTotalHargaModal = new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR'
          }).format(info.totalHargaModal);
          const formattedTotalProfit = new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR'
          }).format(info.totalProfit);

          return `𝗨𝘀𝗲𝗿 : wa.me/${buyer}\n𝗧𝗼𝘁𝗮𝗹 𝗢𝗿𝗱𝗲𝗿𝘀 : ${info.totalTransactions}\n𝗢𝗺𝘀𝗲𝘁 : ${formattedTotalHarga}\n𝗠𝗼𝗱𝗮𝗹 : ${formattedTotalHargaModal}\n𝗣𝗿𝗼𝗳𝗶𝘁 : ${formattedTotalProfit}\n`;
      });

      // Include the overall totals, totalHargaModal, totalProfit, and sorted buyer list in the reply
      const replyMessage = ` 🛒 𝗥𝗘𝗞𝗔𝗣 𝗢𝗥𝗗𝗘𝗥𝗦\n\n\`\`\`𝗧𝗼𝘁𝗮𝗹 𝗢𝗿𝗱𝗲𝗿𝘀 : ${overallTotalTransactions}\n𝗢𝗺𝘀𝗲𝘁 : ${formattedOverallTotalHarga}\n𝗠𝗼𝗱𝗮𝗹 : ${formattedOverallTotalHargaModal}\n𝗣𝗿𝗼𝗳𝗶𝘁 : ${formattedOverallTotalProfit} \n====================\`\`\`\n\n${buyerList.join('\n')}`;

      reply(replyMessage);
  } catch (error) {
      console.error('Error reading the transaction history file:', error);
      reply("Gagal, Tidak dapat membaca data");
  }
  }
  break;

function isWithinDateRange(dateString, dateFrom, dateTo) {
  const date = moment(dateString, 'DD/MM/YY', true);
  return date.isBetween(moment(dateFrom, 'DD/MM/YY'), moment(dateTo, 'DD/MM/YY'), null, '[]');
}


  //=============================================== BATAS CASE ================================


default:
if (budy.startsWith('<')) {
if (!isOwner) return
try {
return reply(JSON.stringify(eval(`${args.join(' ')}`),null,'\t'))
} catch (e) {
reply(e)
}
}

if (budy.startsWith('vv')) {
if (!isOwner) return
try {
let evaled = await eval(budy.slice(2))
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
await reply(evaled)
} catch (err) {
reply(String(err))
}
}

if (budy.startsWith('uu')){
if (!isOwner) return
qur = budy.slice(2)
exec(qur, (err, stdout) => {
if (err) return reply(`${err}`)
if (stdout) {
reply(stdout)
}
})
}

if (isCmd && budy.toLowerCase() != undefined) {
if (m.chat.endsWith('broadcast')) return
if (m.isBaileys) return
let msgs = global.db.database
if (!(budy.toLowerCase() in msgs)) return
arie.copyNForward(m.chat, msgs[budy.toLowerCase()], true)
}
}

} catch (err) {
console.log(util.format(err))
let e = String(err)
arie.sendMessage("6285174332583@s.whatsapp.net", { text: "assalamualaikum Owner Ada Fitur Yang Eror Nih " + util.format(e), 
contextInfo:{
forwardingScore: 5, 
isForwarded: true
}})
}
}