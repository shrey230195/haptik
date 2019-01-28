// Write a function that given a list of strings and an input string will return True 
// if you can create the input string from the list of strings 
// and will return False if you cannot create the string from the list.
// Example:Function:
//    ​can_create(list_of_strings, input_string)
//    List_of_strings = [‘back’, ‘end’, ‘front’, ‘tree’]
//    Input_string = ‘backend’ ---> Function returns True
//    Input_string = ‘frontyard’ ---> function returns False
//    Input_string = ‘frontend’ ---> function returns True


'use strict';

const readline = require('readline');
process.stdin.setEncoding('utf-8');

const rl = readline.createInterface({input: process.stdin, output: process.stdout});
rl.prompt();

var phase = 'get size of array';
var sizeOfArray = undefined;
var listOfStrings = [];
var numberOfStringsEntered = 0;
var numberOfInputStringsEntered = 0;
var sizeOfInputStrings;
var inputStrings = [];

console.log('//-------------- Haptik Question 3 --------------//');
console.log('Example:Function:');
console.log('\t','can_create(list_of_strings, input_string)')
console.log('\t\t','List_of_strings = [‘back’, ‘end’, ‘front’, ‘tree’]')
console.log('\t\t','Input_string = ‘backend’ ---> Function returns True')
console.log('\t\t','Input_string = ‘frontyard’ ---> function returns False')
console.log('\t\t','Input_string = ‘frontend’ ---> function returns True')
console.log('Enter the Size of List of Strings e.g 4::');

rl.on('line', function (data) {      
  switch (phase) {
    case 'get size of array':
      sizeOfArray = data; 
      phase = 'get list of strings'   
      console.log('Enter string #',numberOfStringsEntered +1);
      break;
    case 'get list of strings':
      listOfStrings.push(data);
      numberOfStringsEntered+=1;
      if(numberOfStringsEntered != sizeOfArray) {
        console.log('Enter string #',numberOfStringsEntered +1);
      }else{
        console.log('Enter the number of strings you would like to test e.g 3');        
        phase = 'get np of input strings';
      }
      break;
    case 'get np of input strings':
      sizeOfInputStrings = data;
      phase = 'get input strings';
      console.log('Enter Input string #',numberOfInputStringsEntered +1);
      break;
    case 'get input strings':
      inputStrings.push(data);
      numberOfInputStringsEntered+=1;
      if(numberOfInputStringsEntered != sizeOfInputStrings) {
        console.log('Enter Input string #',numberOfInputStringsEntered +1);
      }else{        
        rl.close()
      }
      break;    
  }
});

rl.on('close', function () {
    console.log('\n','listOfStrings --- ',listOfStrings);    
    console.log('inputStrings --- ',inputStrings);
    console.log('\n','<-------------- Answer -------------->');
    inputStrings.map(string => {
      console.log(string,'...')
      if (!canCreate(listOfStrings, string, '')) {
        console.log('---> False','\n');
      }      
    })
})

function canCreate (listOfStrings, inputString, answer) {
  // console.log(inputString + '  ' + answer);
  var strLen = inputString.length;
  if (strLen === 0) {
    console.log(answer,'---> True','\n');
    return true;
  } else {
    var prefix = '';
    for (var i = 0; i < strLen; i++) {
      // add one char at a time
      prefix += inputString.charAt(i);
      // check if prefix exists in dictionary      
      if (listOfStrings.indexOf(prefix) > -1) {
        //add prefix to the answer and make a recursive call
        answer += prefix + ' ';
        var suffix = inputString.slice(i + 1);
        if (canCreate(listOfStrings, suffix, answer)) {
          return true;
        }
      }       
    }
  }
}