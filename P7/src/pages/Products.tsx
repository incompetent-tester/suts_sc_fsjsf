import React, { useEffect } from "react";
import { useState } from "react";
import { FlatList, StyleSheet, Text, View, Image } from "react-native";
import PersistDb, { AppProductType } from "../core/PersistDb";

const Products : React.FC = () => {
    const [products , setProducts] = useState<AppProductType[]>([])

    useEffect(() => {
        setProducts(PersistDb.retrieveProducts())
    },[])

    const renderProductItem = (input : {item : AppProductType}) => {
        return <View style={styles.itemList}>
            <View style={{flex :1}}>
                <Image 
                    style={styles.itemImage}
                    source={{uri: `data:image/png;base64,${input.item.image}`}}/>
            </View>
            <View style={{flex :2, justifyContent:'center'}}>
                <View style={styles.itemText}>
                    <Text style={{flex : 2}}>Name:</Text>
                    <Text style={{flex : 4}}>{input.item.name}</Text>
                </View>
                <View style={styles.itemText}>
                    <Text style={{flex : 2}}>Address:</Text>
                    <Text style={{flex : 4}}>{input.item.description}</Text>
                </View>
            </View>
        </View>
    }
      
    return <>
        <View>
            <FlatList
                data={products}
                renderItem={renderProductItem}
                keyExtractor={item => item._id}
            />
        </View>
    </>
}

export default Products

const styles = StyleSheet.create({
    itemList : {
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius : 5,
        borderWidth: 1,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10,
        minHeight: 80,
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