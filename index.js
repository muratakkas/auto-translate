
function translatePath(translatorOptions,path, targetlanguage,targetPath) {

    var fileTranslator = require('./file-translator');
 
    // Get File provider to read path and get all the json files recursively
    var fileProvider = require('./file-provider.js');
    const fileInfoArray = fileProvider.getFileInfos(path);
  
    //Iterates all founded files
    fileInfoArray.forEach(fileInfo => { 
        fileTranslator.translateFile(translatorOptions,fileInfo,targetlanguage,targetPath);
    });
  }
 
  module.exports = {
    translatePath: function (ranslatorOptions,path, targetlanguage,targetPath) {
      return translatePath(ranslatorOptions,path, targetlanguage,targetPath);
    } 
  };


  
  
  