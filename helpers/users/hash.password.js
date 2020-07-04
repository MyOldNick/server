const bcrypt = require('bcrypt');


//мегахацкирный, сложенйший  код. Три дня писал, когда запускал у меня сгорел мой Pentium 4
module.exports = (pswd) => bcrypt.hash(pswd, 10)