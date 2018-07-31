import React,{PureComponent} from 'react'
import {View,StyleSheet,FlatList,Text,TouchableOpacity,Image,ImageBackground,Modal} from 'react-native'
import { Actions } from 'react-native-router-flux';
import Locale from '../../locales/index'
// const Locale = global.Locale
const px2dp = global.px2dp

const COIN_TYPES =  [
    {name:'BTO'},
    {name:'DTO'}
]

export default class BTCoinType extends PureComponent{
    constructor(props){
        super(props)

        this.state = {
            coinType:[
                {name:'BTO'},
                {name:'DTO'}
            ],
            selected:0
        }
    }

    listHeader(){
        return(
            <View>
                <View style={{height:px2dp(44),justifyContent:'space-between',flexDirection:'row',alignItems:'center'}}>
                    <TouchableOpacity style={styles.backImageStyle} onPress={()=>{this.props.onPress(COIN_TYPES[this.state.selected].name)}}>
                        <Image source={require('../../Public/img/back_arr_black.png')} style={{width:px2dp(23),height:px2dp(10)}}/>
                    </TouchableOpacity>
                    <Text style={{fontSize:18}}>{Locale.t('Transfer_CoinType')}</Text>
                    {/* <TouchableOpacity onPress={()=>{this.props.onPress(COIN_TYPES[this.state.selected].name)}}>
                        <Text style={{marginRight:20}}>确定</Text>
                    </TouchableOpacity> */}
                    <View></View>
                </View>
                <View style={{backgroundColor:'#CFCFCF',height:0.5}}></View>
            </View>
        )
    }

    listItem(item,index){
        let selectStyle = index== this.state.selected ? {width:px2dp(20),height:px2dp(14)} : {width:0,height:0}

        return(
            <TouchableOpacity onPress={()=>this.setState({selected:index})}>
                <View style={styles.listItemStyle}>
                    <Text style={{fontSize:20}}>{item.name}</Text>
                    <Image source={require('../../Public/img/select_success.png')} style={selectStyle}/>
                </View>
            </TouchableOpacity>
        )
    }

    render(){
        return(
            <TouchableOpacity onPress={()=>{this.props.onPress(COIN_TYPES[this.state.selected].name)}} style={{flex:1}}>
                <ImageBackground source={require('../../Public/img/alpha_bg.png')} style={styles.container}>
                    <View style={{height:px2dp(445),backgroundColor:'white'}}>
                        <FlatList
                            data={COIN_TYPES}
                            renderItem={({item,index})=>this.listItem(item,index)}
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
    backImageStyle:{width:px2dp(44),height:px2dp(44),justifyContent:'center',alignItems:'center',marginLeft:px2dp(10)},
    listItemStyle:{borderBottomColor:"#CFCFCF",borderBottomWidth:0.5,alignItems:'center',justifyContent:'space-between',height:px2dp(50),flexDirection:'row',paddingLeft:px2dp(20),paddingRight:px2dp(20)}
})