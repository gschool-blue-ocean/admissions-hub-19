const { createHash } = require('crypto');

//Crewate a hash string
//defined a fct called hash that takes a string as an inout 
//returns a hash string as a output
function hash(input) {
  return createHash('sha256').update(input).digest('hex');

}

//create 2 hashed passwords

let password = (userinput);
const hash1 = hash(password);
console.log(hash1)

password = 'hells-bells';
const hash2 = hash(password);
const match = hash1 === hash2;

console.log(match ? 'good password' : 'password doesnt match');