import React, { useEffect, useState } from 'react';

import './Baskets.scss';

interface BasketsItem{
    _id : string
    name : string
    user : {
        name : string
        image : string
    },
    basket : {
        productDetails: {
            image : string
            name : string
        }
        quantity : number
    }[]
}

const Baskets : React.FC = () => {
    let [baskets, setBaskets] = useState<BasketsItem[]>([])

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': `bearer ${localStorage.getItem('token')}`,
            }
        };

        fetch('http://localhost:3000/api/baskets', requestOptions)
            .then(response => response.json())
            .then(response => {
                setBaskets(response.data)
            });
    }, [])

    let basketElements = []

    if(baskets.length){
        for(let b of baskets){
            let p = []
            for(let it of b.basket){
                p.push(
                    <div className="basketContainerProduct">
                        <div style={{flex:3}}>
                            <img src={`data:image/png;base64,${it.productDetails.image}`} 
                                className="card-img-top" 
                                alt={it.productDetails.name}
                                style={{width: 'auto',height: 80}}/>
                        </div>
                        <div style={{flex:5}}>
                            <p>Product : { it.productDetails.name }</p>
                            <p>Quantity : { it.quantity }  </p>
                        </div>
                    </div>
                )
            }

            basketElements.push(
                <div key={b._id} className="card cardCustom" style={{width: 400,  margin : 10, padding:10}}>
                    <img src={`data:image/png;base64,${b.user.image}`} className="card-img-top" alt={b.name}
                        style={{width: 150}}/>
                    <div className="card-body" style={{position: 'relative'}}>
                        <h5 className="card-title">
                            { b.user.name }
                        </h5>

                        <h6>Product Basket</h6>
                        { p }
                    </div>
                </div>
            )
        }
    }else{
        basketElements.push(<p key="empty_id">Empty</p>)
    }


    return <>
        <div className="page">
            <h1>Baskets page</h1>
            <div className="basketContainer">
                { basketElements }
            </div>
        </div>
    </>
}

export default Baskets