const fs = require('fs');
let fromFile = './../english.txt';
let toFile = './../dictionary.json';

const data = fs.readFileSync(fromFile, {encoding: 'utf8', flag: 'r'});
const oldDictionary = JSON.parse(fs.readFileSync(toFile, {encoding: 'utf8', flag: 'r'}));

const currentDictionaryCopy = parseFromTxtToJson(data);
const mergedDictionary = mergeDictionaries(oldDictionary, currentDictionaryCopy);

fs.writeFileSync(toFile, JSON.stringify(mergedDictionary));


function parseFromTxtToJson(data) {
  const wordsPairs = data.split('\n').map(e => e.split('-').map(e => e.trim()));

  return wordsPairs.reduce((acc, cur) => {
    acc.push({rus: cur[1], eng: cur[0], isLearnedRating: 0, description: ''});
    return acc;
  }, []);
}

function mergeDictionaries(oldDictionary, newDictionary) {
  newDictionary.forEach((newWord) => {
    if (!oldDictionary.find(oldWord => newWord.eng === oldWord.end)) {
      oldDictionary.push(newWord);
    }
  })

  return oldDictionary;
}
