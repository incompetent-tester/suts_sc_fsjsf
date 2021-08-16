import React, { useEffect } from "react";
import { useState } from "react";
import { FlatList, StyleSheet, Text, View, Image } from "react-native";
import PersistDb, { AppBasketType, AppProductType } from "../core/PersistDb";

const Baskets : React.FC = () => {
    const [baskets , setBaskets] = useState<AppBasketType[]>([])

    useEffect(() => {
        setBaskets(PersistDb.retrieveBaskets())
    },[])

    const renderBasketItem = (input : {item : AppBasketType}) => {
        let products : JSX.Element[] = []

        for(let it of input.item.basket){
            products.push(
                <View key={it.productDetails._id} style={styles.itemProduct}>
                    <View>
                        <Image 
                            style={styles.itemImage}
                            source={{uri: `data:image/png;base64,${it.productDetails.image}`}}/>
                    </View>
                    <View style={{width:'100%'}}>
                        <View style={styles.itemText}>
                            <Text style={{flex : 1}}>Product:</Text>
                            <Text style={{flex : 4}}>{it.productDetails.name}</Text>
                        </View>
                        <View style={styles.itemText}>
                            <Text style={{flex : 1}}>Quantity:</Text>
                            <Text style={{flex : 4}}>{it.quantity}</Text>
                        </View>
                    </View>
                </View>
            )
        }

        return <View style={styles.itemList}>
            <View style={styles.itemUser}>
                <View style={{flex :1}}>
                    <Image 
                        style={styles.itemImage}
                        source={{uri: `data:image/png;base64,${input.item.user.image}`}}/>
                </View>
                <View style={{flex :2, justifyContent:'center'}}>
                    <View style={styles.itemText}>
                        <Text style={{flex : 2}}>Name:</Text>
                        <Text style={{flex : 4}}>{input.item.user.name}</Text>
                    </View>
                    <View style={styles.itemText}>
                        <Text style={{flex : 2}}>Address:</Text>
                        <Text style={{flex : 4}}>{input.item.user.address}</Text>
                    </View>
                </View>
            </View>

            <View>
                <Text style={{fontSize: 24}}>Basket: </Text>
                {products}
            </View>
        </View>
    }
      
    return <>
        <View>
            <FlatList
                data={baskets}
                renderItem={renderBasketItem}
                keyExtractor={item => item._id}
            />
        </View>
    </>
}

export default Baskets

const styles = StyleSheet.create({
    itemList : {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius : 5,
        borderWidth: 1,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10,
        minHeight: 80,
    },
    itemUser:{
        display: 'flex',
        flexDirection:'row'
    },
    itemProduct:{
        display: 'flex',
        flexDirection: 'row'
    },
    itemImage: {
        height:100,
        aspectRatio:1
    },
    itemText : {
        display: "flex",
        flexDirection: 'row'
    }
})