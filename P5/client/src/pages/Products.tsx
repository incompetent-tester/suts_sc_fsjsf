import React, { useEffect, useState } from 'react';

import './Products.scss'

interface ProductItem{
    _id : string
    type : "product"
    name : string
    description : string
    image : string
    price : number
}

interface ProductState{
    products : ProductItem[]
}

class Products extends React.Component<{},ProductState> {
    // Init state
    state: ProductState= {
        products : []
    };

    componentDidMount(){
        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': `bearer ${localStorage.getItem('token')}`,
            }
        };

        fetch('http://localhost:3000/api/products', requestOptions)
            .then(response => response.json())
            .then(response => {
                this.setState({
                    products : response.data
                })
            });
    }

    render(){
        let productElements = []

        if(this.state.products.length){
            for(let p of this.state.products){
                productElements.push(
                    <div key={p._id} className="card cardCustom" style={{ width: 300, height: 350, margin: 10, padding: 10}}>
                        <img src={`data:image/png;base64,${p.image}`}
                          className="card-img-top" alt={`${p.name}`} style={{width: 150}}/>
                        <div className="card-body" style={{position:'relative'}}>
                          <h5 className="card-title">{p.name}</h5>
                          <p className="card-text">Price : RM {p.price}</p>
                          <p className="card-text">Description : {p.description}</p>
                        </div>
                    </div>
                )
            }
        }else{
            productElements.push(<p key="empty_id">Empty</p>)
        }


        return <>
            <div className="page">
            <h1>Products page</h1>  
            <div className="productContainer"></div>
                <div className="productContainer">
                    {productElements}
                </div>
            </div>
        </>
    }
}

export default Products

