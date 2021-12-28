function checkProperArray(array, extraChecks) {
  if (array === undefined || array === null)
    throw `Error: array does not exist`;
  if (!Array.isArray(array)) throw `Error: argument is not an array`;

  if (extraChecks) {
    if (array.length === 0) throw `Error: array is empty`;
    for (let i = 0; i < array.length; i++) {
      // if (typeof array[i] !== "number")
      //   throw `Error: Array consists of NaN - Not a Number`;
    }
  }
}

function average(array) {
  checkProperArray(array, true);

  sum = 0;
  count = 0;

  // iterate each element of an array
  for (i = 0; i < array.length; ++i) {
    if (array[i].length == 0) {
      throw "element inside of array is empty";
    }
    for (i2 = 0; i2 < array[i].length; ++i2) {
      if (!Number.isInteger(array[i][i2])) {
        throw "Array Element is not an integer";
      }
      sum += array[i][i2];
      ++count;
    }
  }

  return Math.round(sum / count);
}

function modeSquared(array) {
  checkProperArray(array, true);
  for (let i = 0; i < array.length; i++) {
    if (typeof array[i] !== "number")
      throw `Error: Array consists of NaN - Not a Number`;
  }
  {
    var modes = [],
      count = [],
      i,
      num,
      index = 0;

    for (i = 0; i < array.length; i++) {
      num = array[i];
      count[num] = (count[num] || 0) + 1;
      if (count[num] > index) {
        index = count[num];
      }
    }

    for (i in count)
      if (count.hasOwnProperty(i)) {
        if (count[i] === index) {
          modes.push(Number(i));
          modes = modes * modes;
        }
      }

    return modes;
  }
}

function medianElement(array) {
  checkProperArray(array, true);
  for (let i = 0; i < array.length; i++) {
    if (typeof array[i] !== "number")
      throw `Error: Array consists of NaN - Not a Number`;
  }

  const array1 = array.sort();
  //find the length of the array
  const n = array.length;
  //check if n is even or not
  if (n % 2 == 0) {
    const low_num = Math.round(n / 2) - 1;
    const high_num = Math.round((n + 2) / 2) - 1;
    const med = (array1[low_num] + array1[high_num]) / 2;
    const median_e = med.toString();
    const median = {};
    median[median_e] = high_num;
    return median;
    //this will be executed if n is off
  } else {
    const odd_num = Math.round((n + 1) / 2) - 1;
    const medi = array1[odd_num];
    const median_s = medi.toString();
    const median_o = {};
    median_o[median_s] = odd_num;
    return median_o;
  }
}

function merge(arrayOne, arrayTwo) {
  checkProperArray(arrayOne, true);
  checkProperArray(arrayTwo, true);
  arr = arrayOne.concat(arrayTwo);
  var numbers = [];
  var alphabet = [];
  for (var i = 0; i < arr.length; i++) {
    //checking if alphabet or a number
    if (isNaN(arr[i])) alphabet.push(arr[i]);
    else numbers.push(arr[i]);
  }
  //sorting alphabet and number in ascending order
  numbers.sort();
  alphabet.sort();
  arr = alphabet.concat(numbers);
  return arr;
}

module.exports = {
  average,
  modeSquared,
  medianElement,
  merge,
};
