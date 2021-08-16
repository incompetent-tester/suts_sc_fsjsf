import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Home : React.FC = () => {
    return <View style={styles.container}>
         <Text style={styles.header}>This is the home page</Text>  
         <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin condimentum urna quis ligula elementum congue. Aliquam vitae sagittis massa. Suspendisse consequat leo sapien, quis elementum ligula imperdiet non. Aenean fringilla commodo quam sed luctus. Phasellus egestas tortor in enim dignissim, nec tempor enim consequat. Aliquam ut dui porttitor, accumsan massa ut, rutrum nisi. Sed ultrices justo in nisl facilisis scelerisque. Curabitur semper feugiat eros euismod facilisis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Curabitur nec dictum odio, a eleifend orci. Donec blandit vehicula odio, vel mollis ligula varius a. Proin laoreet velit leo, id ullamcorper metus malesuada ac.

            In pulvinar ac neque vitae ultricies. Integer vitae sapien neque. Suspendisse a pulvinar ligula. Sed lobortis ut nibh sed auctor. Praesent mattis hendrerit neque, in rhoncus nunc. Phasellus sodales augue enim, quis luctus tellus suscipit vitae. Pellentesque quis efficitur enim, fermentum ultrices dui. Pellentesque elementum urna id gravida porttitor. Etiam malesuada, magna sed fringilla molestie, libero lectus consequat arcu, ut interdum est est sed odio. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vivamus accumsan metus mauris, et vulputate arcu ultricies ut. Nullam vitae massa efficitur, pellentesque orci et, dictum ante. Vestibulum sagittis turpis felis, a imperdiet mauris ornare rutrum. Morbi euismod, augue ac tempus interdum, tellus metus pretium lectus, vel laoreet sapien ante interdum elit.
         </Text>
    </View>
}

export default Home

const styles = StyleSheet.create({
    container:{
        padding:15,
    },
    header:{
        fontSize:24
    }
})