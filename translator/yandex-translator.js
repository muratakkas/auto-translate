var yandexTranslateFactory = require('yandex-translate');
module.exports = {
    translate:  function translate(translatorOptions, text, language, translateKey, orjFormatValues) {

       var yandexTranslate = yandexTranslateFactory(translatorOptions.key);

        return new Promise((resolve, reject) => {
           // TODO Add language enums to support multiple service providers with same language enums 
            yandexTranslate.translate(
                text,
                { to: language },
                function (err, res) {

                    //Result :{"res":{"code":200,"lang":"de-en","text":["Employed"]},"err":null}

                    resolve({
                        res: res["text"][0],
                        err: err,
                        orjFormatValues : orjFormatValues,
                        translateKey : translateKey
                    }); 
                },
            ); 
          })  
    }
  };
