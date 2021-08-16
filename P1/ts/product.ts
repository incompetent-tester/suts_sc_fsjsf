export default class Product {
    public id: number
    public description: string

    constructor(props : {id: number, description: string}){
        this.id = props.id
        this.description = props.description
    }

    public toString = () : string => {
        return `Product - id : ${this.id}, desc : ${this.description}`;
    }
}
