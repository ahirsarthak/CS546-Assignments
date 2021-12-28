function stringCheck(str, length) {
  if (str === undefined || str === null) throw `Error: string does not exist`;
  if (typeof str !== "string") throw `Error: argument is not an string`;
  if (str.length <= length) throw `Error: string is not of length`;
  if (!str.replace(/\s/g, "").length) throw `Error: string is just white space`;
}

function sortString(string) {
  stringCheck(string, 0);
  var string = string.trim();

  var numbers = [];

  var uppercase = [];

  var lowercase = [];

  var chars = [];

  var spaces = [];

  for (let i = 0; i < string.length; i++) {
    const e = string[i];

    if (Number(e)) {
      numbers.push(e);
    } else if (e === " ") {
      spaces.push(e);
    } else if (e >= "a" && e <= "z") {
      lowercase.push(e);
    } else if (e >= "A" && e <= "Z") {
      uppercase.push(e);
    } else {
      chars.push(e);
    }
  }
  sorted =
    uppercase.sort().join("") +
    lowercase.sort().join("") +
    chars.sort().join("") +
    numbers.sort().join("") +
    spaces.join("");

  // return the sorted string
  return sorted;
}

function findIndexOfOccurences(string, char) {
  var pos = 0;
  var indexes = [];
  var i = -1;
  while (pos != -1) {
    pos = string.indexOf(char, i + 1);
    if (pos > 0) {
      indexes.push(pos);
    }
    i = pos;
  }
  return indexes;
}

function replaceCharByIndex(string, replacement, idx) {
  let pre_replacement = string.substr(0, idx);
  let post_replacement = string.substr(idx + 1);

  let result = pre_replacement + replacement + post_replacement;
  return result;
}

function replaceChar(string, idx) {
  stringCheck(string, 0);

  if (
    string !== undefined &&
    string.trim().length > 0 &&
    idx < string.trim().length - 2 &&
    typeof string === "string" &&
    typeof idx === "number" &&
    idx > 0
  ) {
    string = string.trim();

    var flag = 0;
    var result = string;
    var char = string[idx],
      before_char = string[idx - 1],
      after_char = string[idx + 1];
    var occurences = findIndexOfOccurences(string, char).filter(
      (n) => ![idx].includes(n)
    );

    for (var i = 0; i < occurences.length; i++) {
      if (flag == 0) {
        result = replaceCharByIndex(result, before_char, occurences[i]);
        flag = 1;
      } else {
        result = replaceCharByIndex(result, before_char, occurences[i]);
        flag = 0;
      }
    }
    return result;
  } else {
    throw "Error: Invalid input values";
  }
}

function mashUp(string1, string2, char) {
  stringCheck(string1, 1);
  stringCheck(string2, 1);
  if (string1.length > string2.length)
    string2 = string2.padEnd(string1.length, char);
  if (string2.length > string1.length)
    string1 = string1.padEnd(string2.length, char);
  var a = string1.split("").filter(Boolean);
  var b = string2.split("");
  var mergedString = "";
  for (var i = 0; i < a.length || i < b.length; i++) {
    if (i < a.length) mergedString += a[i];
    if (i < b.length) mergedString += b[i];
  }
  return mergedString;
}

module.exports = {
  sortString,
  replaceChar,
  mashUp,
};
