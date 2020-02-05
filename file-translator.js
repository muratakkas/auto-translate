var formatParser = require('./format-parser.js');
var fs = require('fs');


function mergeFileContents(sourceFileObject, translatedFileObject) {
  //Iterate all json object properties
  for (var translateKey in translatedFileObject) {
    if (!sourceFileObject.hasOwnProperty(translateKey))
      sourceFileObject[translateKey] = translatedFileObject[translateKey];
  }

  return sourceFileObject;
}
function translateFile(translatorOptions,fileInfo, targetlanguage, targetPath) {

  // TODO Add another translator providers 
  var translateProvider = undefined;
  
  if(translatorOptions.name === "yandex")
  translateProvider = require('./translator/yandex-translator');
  else{
    console.error("Unsupported translator type");
    return;
  }

  if (fileInfo && fileInfo.content) {
    try {
      //Parse json file content to a json object
      const contentObject = JSON.parse(fileInfo.content);
      var translatePromises = [];

      //Iterate all json object properties
      for (var translateKey in contentObject) {
        if (!contentObject.hasOwnProperty(translateKey)) continue;
        if (contentObject[translateKey]) {
          var orjFormatValues = {};
          //In order to not translate formattting words , replace them with temp keys 
          formatParser.parseFormattingWords(contentObject, translateKey, orjFormatValues);

          //Create a translate promises and push to promises array
          translatePromises.push(translateProvider.translate(translatorOptions,contentObject[translateKey], targetlanguage, translateKey, { ...orjFormatValues }));
        };
      }

      //Make sure all the promises have been completed for this file 
      Promise.all(translatePromises).then(function (values) {
        values.forEach(result => {
          if (result && !result.err)
            contentObject[result.translateKey] = result.res;
          //Replace with the orj formatting keys with temp keyse
          formatParser.loadFormattingWords(contentObject, result.translateKey, result.orjFormatValues);
        });

        const newFilePath = targetPath + "/" + fileInfo.absolutePath;
        const newFileFullPath = newFilePath + '/' + fileInfo.fileName;

        //Check if folder doesnt exist then create
        if (!fs.existsSync(newFilePath)) fs.mkdirSync(newFilePath);

        //Check if file doesnt exist create from translated content
        if (!fs.existsSync(newFileFullPath))
          fs.writeFileSync(newFileFullPath, JSON.stringify(contentObject,null,2));
        else {
          //If file exist compare file content and modify file for the missing translates
          const oldFileContent = fs.readFileSync(newFileFullPath);
          const sourceFileObject = JSON.parse(oldFileContent);
          mergeFileContents(sourceFileObject, contentObject);
          fs.writeFileSync(newFileFullPath, JSON.stringify(sourceFileObject,null,2));
        }

      });

    } catch (error) {
      console.log("File content couldnt be parsed:" + fileInfo.fileName + " error:" + error);
    }

  }
}

module.exports = {
  translateFile: function (translatorOptions,fileInfo, targetlanguage, targetPath) {
    return translateFile(translatorOptions,fileInfo, targetlanguage, targetPath);
  }
};
