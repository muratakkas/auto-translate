# npm-auto-translate

> Translates all the json files with using Yandex Translator in the given path and saves translated files to the target location with the same structure
In order to use you need to have a valid yandex api key

## Install

```
$ npm i npm-auto-translate --save
```


## Usage

translatePath parameters 

* First parameter is  translator service options
* Second parameters is the root folder path of localization json files
* Trhird parameters is which language you want to translate to
* Last parameter is the path where you  translated files will be saved

```
 
var autoTranslate = require('npm-auto-translate');
let translatorOptions = {
    name: "yandex",
    key: "YANDEX-KEY",
}

autoTranslate.translatePath(translatorOptions, "/Users/muratakkas/Projects/src/locales/de", "en", "/Users/muratakkas/Desktop/test");
```

 
## Notes

If you run this command again for the same folder it will automatically update for the missing keys
If you have some formatting symbols in your files like {{name}}, this package automatically search for {{}} and doesn't send the formattings keys to the translator
This should not be used in production environment some of formatting words location should be different in another language 
If you have lots of hierarchical documents to create localization files for the different language, this package can help for the start point

 
## License

MIT 