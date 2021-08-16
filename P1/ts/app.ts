import Product from './product'

var p1 = new Product({ id1: 1 , description : "Product 1 descriptions"})  // Bug Typo
console.log(p1.toString())
