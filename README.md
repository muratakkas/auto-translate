# npm-auto-translate

> Translates all the json files with using Yandex Translator in the given path and saves translated files to the target location with the same structure
In order to use you need to have a valid yandex api key

## Install

```
$ npm i npm-auto-translate --save
```


## Usage

```
var autoTranslate = require('npm-auto-translate');
let translatorOptions = {
    name: "yandex",
    key: "YANDEX-KEY",
}
autoTranslate.translatePath(translatorOptions, "/Users/muratakkas/Projects/src/locales/de", "en", "/Users/muratakkas/Desktop/test");
```

 
## License

MIT © [Sindre Sorhus](https://sindresorhus.com)