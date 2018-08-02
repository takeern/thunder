
var Tesseract = require('tesseract.js')
var filename = 'patch.jpeg'
 
Tesseract.recognize(filename, {
  lang:'eng',
  psm: 7,
})
  .progress(function  (p) { console.log('progress', p)  })
  .catch(err => console.error(err))
  .then(function (result) {
    console.log(result.text)
    process.exit(0)
  })
