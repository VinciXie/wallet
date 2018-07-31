import React,{PureComponent} from 'react'
import {View,Image,TextInput,StyleSheet} from 'react-native'



export default class BTSearchBar extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <View style={styles.container}>
                <Image source={require('../Public/img/search.png')} style={styles.iconStyle}/>
                <TextInput placeholder="搜索" style={styles.textStyle}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{flex:1,backgroundColor:'rgba(142,142,147,0.10)',borderRadius:45,alignItems:'center',flexDirection:'row'},
    iconStyle:{width:14,height:14,marginLeft:20,marginRight:10},
    textStyle:{color:'#8E8E93',fontSize:17,flex:1,paddingRight:20}
})