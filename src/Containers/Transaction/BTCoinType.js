import React,{PureComponent} from 'react'
import {View,StyleSheet,FlatList,Text,TouchableOpacity,Image,ImageBackground,Modal} from 'react-native'
import { Actions } from 'react-native-router-flux';

export default class BTCoinType extends PureComponent{
    constructor(props){
        super(props)

        this.state = {
            data:[
                {name:'BTO'},
                {name:'BTO'},
                {name:'BTO'},
            ]
        }
    }

    listHeader(){
        return(
            <View>
                <View style={{height:44,justifyContent:'space-between',flexDirection:'row',alignItems:'center'}}>
                    <TouchableOpacity style={styles.backImageStyle} onPress={()=>{this.props.onPress()}}>
                        <Image source={require('../../Public/img/back_arr_black.png')} style={{width:23,height:10}}/>
                    </TouchableOpacity>
                    <Text style={{fontSize:18}}>选择币种</Text>
                    <View></View>
                </View>
                <View style={{backgroundColor:'#CFCFCF',height:0.5}}></View>
            </View>
        )
    }

    listItem(item){
        return(
            <View style={styles.listItemStyle}>
                <Text style={{fontSize:20}}>{item.name}</Text>
                <Image source={require('../../Public/img/select_success.png')} style={{width:20,height:14}}/>
            </View>
        )
    }

    render(){
        return(
            <TouchableOpacity onPress={()=>{this.props.onPress()}} style={{flex:1}}>
                <ImageBackground source={require('../../Public/img/alpha_bg.png')} style={styles.container}>
                    <View style={{height:445,backgroundColor:'white'}}>
                        <FlatList
                            data={this.state.data}
                            renderItem={({item})=>this.listItem(item)}
                            ListHeaderComponent={this.listHeader()}
                        />
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container:{flex:1,justifyContent:'flex-end'},
    backImageStyle:{width:44,height:44,justifyContent:'center',alignItems:'center',marginLeft:10},
    listItemStyle:{borderBottomColor:"#CFCFCF",borderBottomWidth:0.5,alignItems:'center',justifyContent:'space-between',height:50,flexDirection:'row',paddingLeft:20,paddingRight:20}
})