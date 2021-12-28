
const lab1 = require("./lab1");
console.log(lab1.questionOne());
// returns and outputs: {}

console.log(lab1.questionOne([])); 
// returns and outputs: {}


console.log(lab1.questionOne([5, 3, 10])); 
//returns and outputs: { '2': true, '18': false, '93': false }

console.log(lab1.questionOne([2])); 
// returns and outputs: {'3': true} 

console.log(lab1.questionOne([6, 10, 15])); 
//returns and outputs: { '29': true, '93': false, '218': false }

console.log(lab1.questionOne([1,2,3])); 
//returns and outputs: { '2': true, '3': true, '6': false }

console.log(lab1.questionTwo([1, 1, 1, 1, 1, 1])); 
//returns and outputs: [1]

console.log(lab1.questionTwo([1, '1', 1, '1', 2])); 
// returns and outputs: [1, '1', 2] 

console.log(lab1.questionTwo([3, 'a', 'b', 3, '1'])); 
// returns and outputs: [3, 'a', 'b', '1']

console.log(lab1.questionTwo([1,'d', 2, 7, 'd', 3, '1', 3, 3])); 
// returns and outputs: [ 1, 'd', 2, 7, 3, '1' ]

console.log(lab1.questionTwo([])); 
//returns and outputs: []

console.log(lab1.questionThree(["foo", "bar", "test", "Patrick", "Hill"]));
// returns and outputs: {}
console.log(lab1.questionThree(["cat", "act", "foo", "bar"]));
// should return and output: {cat : [cat, act]}
console.log(lab1.questionThree(["race", "care", "foo"]));
// should return and output: {race : [race, care]}
console.log(lab1.questionThree([ "546", "CS", "Web"]));
// returns and outputs: {}
console.log(lab1.questionThree([])); 
// returns and outputs: {}


console.log(lab1.questionFour(1, 3, 2)); 
//returns and outputs: 4

console.log(lab1.questionFour(2, 5, 6)); 
//returns and outputs: 194 


console.log(lab1.questionFour(3, 6, 9)); 
//returns and outputs: 60601 

console.log(lab1.questionFour(4, 1, 7)); 
//returns and outputs: 1266 


console.log(lab1.questionFour(2, 7, 8)); 
//returns and outputs: 8005 
