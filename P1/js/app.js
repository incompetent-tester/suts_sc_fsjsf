const p = require('./product');

var p1 = new p.Product({ id1: 1 , description : "Product 1 descriptions"}) // Bug Typo

console.log(p1.toString())
