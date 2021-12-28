const arrayUtils = require("./arrayUtils");
const stringUtils = require("./stringUtils");
const objUtils = require("./objUtils");

// Average array test

try {
  // Should Pass
  const avgOne = console.log(arrayUtils.average([[1], [2], [3]])); // Returns: 2

  console.log("Average passed successfully");
} catch (e) {
  console.log(e);
  console.error("Average failed test case");
}

try {
  const avgTwo = console.log(
    arrayUtils.average([
      [1, 3],
      ["hi", 4, 5],
    ])
  );

  console.log("Average failed test case");
} catch (e) {
  console.log(e);
  console.error("Average failed successfully");
}
console.log(
  "-----------------------------------------------------------------"
);
// Mode array test

try {
  // Should Pass
  const modeOne = console.log(arrayUtils.modeSquared([1, 2, 3, 3, 4])); // Returns: 9

  console.log("Mode passed successfully");
} catch (e) {
  console.log(e);
  console.error("Mode failed test case");
}

try {
  const modeTwo = console.log(
    arrayUtils.modeSquared(["guitar", 1, 3, "apple"])
  ); // THrows

  console.log("Mode failed test case");
} catch (e) {
  console.log(e);
  console.error("Mode failed successfully");
}
console.log(
  "-----------------------------------------------------------------"
);

// Median array test

try {
  // Should Pass
  const medianOne = console.log(arrayUtils.medianElement([5, 6, 7])); // Returns: { '6': 1 }

  console.log("Median passed successfully");
} catch (e) {
  console.log(e);
  console.error("Median failed test case");
}

try {
  const medianTwo = console.log(arrayUtils.medianElement([1, 2, "nope"])); // THrows

  console.log("Median failed test case");
} catch (e) {
  console.log(e);
  console.error("Median failed successfully");
}
console.log(
  "-----------------------------------------------------------------"
);

// Merge array test

try {
  // Should Pass

  const mergeOne = console.log(
    arrayUtils.merge([1, 2, 3, "g"], ["d", "a", "s"])
  );

  console.log("Merge passed successfully");
} catch (e) {
  console.log(e);
  console.error("Merge string failed test case");
}
try {
  // Should Pass

  const mergeTwo = console.log(arrayUtils.merge([], ["ab", "ts"]));

  console.log("Merge failed test case");
} catch (e) {
  console.log(e);
  console.error("Merge failed successfully");
}
console.log(
  "-----------------------------------------------------------------"
);

// SortString array test

try {
  // Should Pass

  var s = "123 FOO BAR!";

  const sortOne = console.log(stringUtils.sortString(s)); // Returns: ABFOOR!123

  console.log("String passed successfully");
} catch (e) {
  console.log(e);
  console.error("String failed test case");
}

try {
  // Should Pass
  const sortOne = console.log(stringUtils.sortString(["Hello", "World"]));

  console.log("String failed test case");
} catch (e) {
  console.log(e);
  console.error("String failed successfully");
}
console.log(
  "-----------------------------------------------------------------"
);

// replaceChar array test
try {
  // Should Pass

  const charOne = console.log(stringUtils.replaceChar("Daddy", 2)); // Returns: Daday

  console.log("replaceChar passed successfully");
} catch (e) {
  console.log(e);
  console.error("replaceChar failed test case");
}

try {
  const charTwo = console.log(stringUtils.replaceChar("foobar", 0)); // Returns: Error: in input values

  console.log("replaceChar failed test case");
} catch (e) {
  console.log(e);
  console.error("replaceChar failed successfully");
}
console.log(
  "-----------------------------------------------------------------"
);

// mashup array test

try {
  // Should Pass

  const mashOne = console.log(stringUtils.mashUp("hello", "world", "#")); // Returns: hweolrllod

  console.log("mashup passed successfully");
} catch (e) {
  console.log(e);
  console.error("mashup failed test case");
}

try {
  const mashTwo = console.log(stringUtils.mashUp("Patrick", "")); // Returns: Error:

  console.log("mashUp failed test case");
} catch (e) {
  console.log(e);
  console.error("mashUp failed successfully");
}
console.log(
  "-----------------------------------------------------------------"
);

// Compute objects array test

try {
  // Should Pass
  const first1 = { x: 2, y: 3 };
  const second1 = { a: 70, x: 4, z: 5 };
  const third1 = { x: 0, y: 9, q: 10 };
  const computeOne = console.log(
    objUtils.computeObjects([first1, second1], (x) => x * 2)
  );

  console.log("computeObjects passed successfully");
} catch (e) {
  console.log(e);
  console.error("computeObjects failed test case");
}

try {
  const first1 = { x: 2, y: 3 };
  const second1 = { a: 70, x: 4, z: 5 };
  const third1 = { x: 0, y: 9, q: 10 };
  const computeTwo = console.log(objUtils.computeObjects([first1, second1], 2));

  console.log("computeObjects failed test case");
} catch (e) {
  console.log(e);
  console.error("computeObjects failed successfully");
}
console.log(
  "-----------------------------------------------------------------"
);

// Commonkeys array test

try {
  // Should Pass

  const first = { a: 2, b: 4 };
  const second = { a: 5, b: 4 };
  const third = { a: 2, b: { x: 7 } };
  const fourth = { a: 3, b: { x: 7, y: 10 } };

  const keyOne = console.log(objUtils.commonKeys(first, second));

  console.log("commonKeys passed successfully");
} catch (e) {
  console.log(e);
  console.error("commonKeys failed test case");
}

try {
  const keyTwo = console.log(objUtils.commonKeys("Patrick", ""));

  console.log("commonKeys failed test case");
} catch (e) {
  console.log(e);
  console.error("commonKeys failed successfully");
}
console.log(
  "-----------------------------------------------------------------"
);

// fLipObject array test

try {
  // Should Pass

  const flipOne = console.log(objUtils.flipObject({ a: 3, b: 7, c: 5 }));

  console.log("flipObject passed successfully");
} catch (e) {
  console.log(e);
  console.error("flipObject failed test case");
}

try {
  const flipTwo = console.log(objUtils.commonKeys());

  console.log("flipObject failed test case");
} catch (e) {
  console.log(e);
  console.error("flipObject failed successfully");
}
