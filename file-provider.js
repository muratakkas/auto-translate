var fs = require('fs');
 
function readFileAndAddToFileResult(path, fileName, fileInfoArray,absolutePath) {
    const filePath = path + '/' + fileName;
    var data = fs.readFileSync(filePath);
    fileInfoArray.push({ path: path,absolutePath : absolutePath, fileName: fileName, content: data.toString() });
}
function loopGetDirectories(path, fileInfoArray,absolutePath) {
    return fs.readdirSync(path).filter(function (file) {
        const childPath = path + '/' + file; 
        if (fs.statSync(childPath).isDirectory()) return loopGetDirectories(childPath, fileInfoArray,absolutePath + '/' + file);
        else readFileAndAddToFileResult(path, file, fileInfoArray,absolutePath);
    });
}

function getFileInfos(path) {
    const fileInfos = [];
    console.log("Folder reading :" + path);
    var absolutePath="";
    loopGetDirectories(path, fileInfos,absolutePath);
    return fileInfos;
}

module.exports = {
    getFileInfos: function (path) {
        return getFileInfos(path);
    }
};




