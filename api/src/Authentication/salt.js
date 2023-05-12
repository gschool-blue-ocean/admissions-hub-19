const { scryptSync, randomBytes } = require('crypto');

function signup(email, password) {
  const salt = randomBytes(16).toString('hex');
  const hashedPassword = scryptSync(password, salt, 64).toString('hex'); //now u have a hashedpassword with salt
//store salt with password by prepending it, do this by adding salt seperated by semicolon
  const user = { email, password: `${salt}:${hashedPassword}` }




}

function login(email, password) {
  const user = user.find(v => v.email === email);

  const [salt, key] = user.password.split(':');
  const hashedBuffer = scryptSync(password, salt, 64);

  //Preventing a timing attack
  const keyBuffer = Buffer.from(key, 'hex');
  const match = timingSafeEqual(hashedBuffer, keyBuffer);

}