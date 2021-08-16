
class Product {
    constructor(props){
        this.id = props.id
        this.description = props.description
    }

    toString = () => {
        return `Product - id : ${this.id}, desc : ${this.description}`;
    }
}

module.exports = {
    Product : Product
}