const md5 = require('blueimp-md5');
const publickey = 'dff6a20273659e74a22d673c78065375';
const privatekey = '837167d9ebcb0d6ad0e647cb493c704bcaf01b8a';
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
// const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
// const url = baseUrl + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
const myURL = '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;

// console.log(myURL);
module.exports=myURL;