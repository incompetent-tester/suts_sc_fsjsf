import Realm, { BSON, User } from "realm";
import Config from "./Config";

/* -------------------------------------------------------------------------- */
/*                                   Schema                                   */
/* -------------------------------------------------------------------------- */
export interface AppUserType {
    _id: string
    type : string
    name : string
    address : string
    image : string
    username : string
}

const UserSchema = {
    name: "User",
    properties: {
        _id: "string",
        type : "string",
        name : "string?",
        address : "string?",
        image : "string?",
        username : "string?"
    },
    primaryKey: "_id",
};

export interface AppProductType{
    _id : string
    type : string
    name : string
    image : string
    price : number
    description: string
}

const ProductSchema = {
    name: "Product",
    properties: {
      _id: "string",
      type : "string?",
      name : "string?",
      image : "string?",
      price : "double?",
      description: "string?"
    },
    primaryKey: "_id",
};


export interface AppBasketType{
    _id : string,
    user : AppUserType,
    basket : {
        productDetails : {
            _id : string,
            type: string,
            name: string,
            description: string,
            image: string
        },
        quantity : number,
    }[]
}

const BasketProductDetailsSchema = {
    name: "ProductDetails",
    properties: {
      _id: "string",
      type : "string?",
      name : "string?",
      image : "string?",
      price : "double?",
      description: "string?"
    },
};

const BasketProductSchema = {
    name: "BasketProduct",
    embedded: true,
    properties: {
        productDetails : "ProductDetails?",
        quantity : "int?",
        pid: "string?"
    },
}

const BasketSchema = {
    name : "Basket",
    properties : {
        _id : "string",
        user : "User",
        basket : 'BasketProduct[]'
    },
    primary : "_id"
};

/* -------------------------------------------------------------------------- */
/*                                   Methods                                  */
/* -------------------------------------------------------------------------- */
var _realm : Realm | undefined = undefined

const init = async () => {
    _realm = await Realm.open({
        path: "local_realm",
        schema: [UserSchema, ProductSchema, BasketSchema, BasketProductSchema, BasketProductDetailsSchema]
    });
}

const retrieveData = async () => {
    let token = await Config.getApiKey()
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': `bearer ${token}`,
        }
    };

    // Fetch User
    fetch(`http://10.0.2.2:3000/api/users`, requestOptions)
        .then(response => response.json())
        .then(response => {
            _realm?.write(() => {
                _realm?.delete(_realm?.objects("User"))

                for(let d of response.data){    
                    _realm?.create("User",d, Realm.UpdateMode.All);
                }
            })
        });

    // Fetch Product
    fetch(`http://10.0.2.2:3000/api/products`, requestOptions)
        .then(response => response.json())
        .then(response => {
            _realm?.write(() => {
                _realm?.delete(_realm?.objects("Product"))

                for(let d of response.data){
                    _realm?.create("Product",d, Realm.UpdateMode.All);
                }
            })
        });

    // Fetch Basket
    fetch(`http://10.0.2.2:3000/api/baskets`, requestOptions)
        .then(response => response.json())
        .then(response => {
            _realm?.write(() => {
                _realm?.delete(_realm?.objects("Basket"))

                for(let d of response.data){
                    _realm?.create("Basket",d, Realm.UpdateMode.All);
                }
            })
        });
}

const retrieveUsers = () : AppUserType[] => {
    return _realm?.objects("User") as unknown as AppUserType[]
}

const insertUser = ( user : AppUserType) => {
    _realm?.write(() => {
        _realm?.create("User", user, Realm.UpdateMode.All);
    })
}

const deleteUser = ( user : AppUserType) => {
    _realm?.write(() => {
        let usr = _realm?.objects("User").filtered(`_id == "${user._id}"`,)
        _realm?.delete(usr)
    })
}

/** https://docs.mongodb.com/realm/sdk/node/advanced/query-engine/ 
 * https://docs.mongodb.com/realm-legacy/docs/javascript/latest/api/tutorial-query-language.html
 * */
const retrieveUsersByName = (name : string) => {
    return _realm?.objects("User").filtered("name CONTAINS[c] $0", name) as unknown as AppUserType[]
}

const retrieveProducts = () : AppProductType[] => {
    return _realm?.objects("Product") as unknown as AppProductType[]
}

const retrieveBaskets = () => {
    return _realm?.objects("Basket") as unknown as AppBasketType[]
}

const PersistDb = {
    init : init,
    retrieveData: retrieveData,
    retrieveUsers: retrieveUsers,
    retrieveUsersByName: retrieveUsersByName,
    retrieveProducts: retrieveProducts,
    retrieveBaskets: retrieveBaskets,
    insertUser: insertUser,
    deleteUser: deleteUser
}

export default PersistDb