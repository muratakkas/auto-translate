function parseFormattingWords(contentObject, translateKey, orjFormatValues) {
  const paramsPattern = /[^{\}]+(?=})/g;
  var matches = contentObject[translateKey].match(paramsPattern);

  if (matches != null) {
    for (let index = 0; index < matches.length; index++) {
      var formatValue = matches[index];
      var tempKey = '$' + index;
      // TODO Get these symbols from parameters
      var replaceWord = "{{" + formatValue + "}}";
      orjFormatValues[tempKey] = replaceWord;
      contentObject[translateKey] = contentObject[translateKey].replace(replaceWord, tempKey);
    }
  }
}

function loadFormattingWords(contentObject, translateKey, orjFormatValues) { 
  for (var formatTempKey in orjFormatValues) {
    if (!orjFormatValues.hasOwnProperty(formatTempKey)) continue;

    var formatValue = orjFormatValues[formatTempKey];
    if (formatValue)
      contentObject[translateKey] = contentObject[translateKey].replace(formatTempKey, formatValue);
  } 
}

module.exports = {
  parseFormattingWords: function (contentObject, translateKey, orjFormatValues) {
    return parseFormattingWords(contentObject, translateKey, orjFormatValues);
  },
  loadFormattingWords: function (contentObject, translateKey, orjFormatValues) {
    return loadFormattingWords(contentObject, translateKey, orjFormatValues);
  }
};