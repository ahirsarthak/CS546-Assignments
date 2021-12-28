function checkIsProperObj(obj, extraCheck) {
  if (obj === undefined || obj === null) throw `Error: object does not exist`;
  if (typeof obj !== "object" || obj === null) throw `Error: is not an object`;
  if (extraCheck) {
    if (empty(obj)) throw "Error: object is empty";
  }
}
function empty(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}

function checkFunc(func) {
  if (func === undefined || func === null)
    throw `Error: function does not exist`;
  if (typeof func !== "function") throw `Error: is not a function`;
}

function computeObjects(objects, func) {
  checkIsProperObj(objects, true);
  checkFunc(func);
  let result = {};
  for (const property in objects) {
    result[property] = func(objects[property]);
  }

  return result;
}

function commonKeys(obj1, obj2) {
  checkIsProperObj(obj1, false);
  checkIsProperObj(obj1, false);

  var result = {};
  for (let key in obj1) {
    if (obj1[key] && obj1[key] === obj2[key]) result[key] = obj1[key];
    else if (typeof obj1[key] === "object" && obj1[key] !== null) {
      result[key] = commonKeys(obj1[key], obj2[key]);
    }
  }
  return result;
}

function flipObject(object) {
  checkIsProperObj(object, true);
  return Object.entries(object).reduce((acc, [key, value]) => {
    acc[value] = key;
    return acc;
  }, {});
}

module.exports = {
  computeObjects,
  commonKeys,
  flipObject,
};
