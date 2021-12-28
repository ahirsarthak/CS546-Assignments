

const questionOne = function questionOne(arr) {
    let obj = {};
    let eqn = [];
    if (arr === undefined )
    {
        return obj;
    }
else {
      for (let i = 0; i < arr.length; i++) {
               eqn[i] = arr[i] * arr[i] - 7;
               eqn[i] = Math.abs(eqn[i]);
               //console.log(eqn[i])
               let keyValue = eqn[i];
              PrimeNumber = isPrime(keyValue);
              obj[eqn[i]] = PrimeNumber;
          //console.log(obj[eqn[i]]);
      }}
      return obj;
  
  function isPrime(n) {
        if (n <= 1) return false;
      
        for (let i = 2; i < n; i++){ 
        if (n % i == 0) 
        return false;
        }
        return true;
      }

  }
//console.log(questionOne())  ;
  // returns and outputs: {}      

const questionTwo = function questionTwo(arr) { 

        var arrNewValue = [];

            for(i=0; i < arr.length; i++){
            if(arrNewValue.indexOf(arr[i]) === -1) {
                arrNewValue.push(arr[i]);
            }
        }
        return arrNewValue;
    
}

const questionThree = function questionThree(arr){
map = {};

var x=""  


var normalizedWords = arr.map( function( arr ){
 return arr.split('').sort().join('');
});
normalizedWords.forEach( function ( normalizedWord, index){
 map[normalizedWord] = map[normalizedWord] || [];
 map[normalizedWord].push( arr[index] );
});
Object.keys( map ).forEach( function( normalizedWord , index  ){
  var combinations = map[normalizedWord];
  if( combinations.length > 1 ){
    x="{" + x +combinations[index] + " : " + "["+ combinations.join(', ') +"]" + "}"
    

 }
 
 if(x.length == 0){

   return x = {}

}

});
return x;
}
//console.log(questionThree([])); 


const questionFour = function questionFour(num1, num2, num3) {
    
        let factorial1 = 1;
        let factorial2 = 1;
        let factorial3 = 1;
        
        OrigSum = num1 + num2 + num3 
        let OrigAvg = OrigSum / 3
    
        //console.log(OrigAvg)
        if (num1 == 0 || num1 == 1) {
            num1 = num1;
        }
        else {
            for (i = 1; i <= num1; i++) {
                factorial1 = factorial1 * i;
            }
            num1 = factorial1;
           // console.log(num1)
        }
        if (num2 == 0 || num2 == 1) {
            num2 = num2;
        }
        else {
            for (i = 1; i <= num2; i++) {
                factorial2 = factorial2 * i;
            }
            num2 = factorial2;
           // console.log(num2)
    
        }
        if (num3 == 0 || num3 == 1) {
            num3 = num3;
        }
        else {
            for (i = 1; i <= num3; i++) {
                factorial3 = factorial3 * i;
            }
            num3 = factorial3;
            //console.log(num3)
    
        }
        FactorialSum = num1 + num2 + num3;
        //console.log(FactorialSum)
    
      //  result = sum / 3;
        //console.log(result)
        result = FactorialSum/OrigAvg
    
        return Math.floor(result);
    
}
//console.log(questionFour(2, 5, 6)); 


module.exports = {
    firstName: "Sarthak", 
    lastName: "Ahir", 
    studentId: "10479028",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};