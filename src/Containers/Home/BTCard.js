import React,{PureComponent} from 'react'
import {View,StyleSheet,Image,Text,TouchableOpacity} from 'react-native'
import { Actions } from 'react-native-router-flux';
import Locale from '../../locales/index'
import {ActionSheet} from 'antd-mobile-rn'
const px2dp = global.px2dp

export default class BTCard extends PureComponent{
    constructor(props){
        super(props)
    }

    showActionSheet(){
        const BUTTONS = [
            '创建账户',
            '导入账户',
            '取消'
        ]

        ActionSheet.showActionSheetWithOptions(
            {
                options: BUTTONS,
                maskClosable:true,
                cancelButtonIndex: 2,
            },
            (buttonIndex) => {
                switch(buttonIndex){
                    case 0:
                        Actions.push('createAccount')
                        break;
                    case 1:
                        Actions.push('login')
                        break;
                }
            },
        )
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.topStyle}>
                    <TouchableOpacity onPress={()=>{this.showActionSheet()}}><Image style={styles.iconStyle} source={require('../../Public/img/add_card.png')}></Image></TouchableOpacity>
                    <TouchableOpacity onPress={()=>{Actions.push('transaction')}}><Image style={styles.iconStyle} source={require('../../Public/img/transfer.png')}></Image></TouchableOpacity>
                </View>
                <View style={styles.centerStyle}>
                    <Text style={{color:'white'}}>{Locale.t('Home_MyAsset')}</Text>
                    <Text style={styles.textStyle}>≈￥{this.props.totalCount.toFixed(2)}</Text>
                </View>
                <View style={styles.bottomStyle}>
                    <TouchableOpacity onPress={()=>{Actions.push('qrcode',{account:this.props.account})}}>
                        <Image style={styles.iconStyle} source={require('../../Public/img/qrcode.png')}></Image>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#057AFF',
        marginLeft:global.px2dp(20),
        marginRight:global.px2dp(20),
        height:global.px2dp(188),
        borderRadius:px2dp(25)
    },
    iconStyle:{
        width:px2dp(32),
        height:px2dp(27)
    },
    topStyle:{
        marginTop:px2dp(14),
        height:px2dp(27),
        marginLeft:px2dp(16),
        marginRight:px2dp(16),
        flexDirection:'row',
        justifyContent:"space-between"
    },
    centerStyle:{
        flex:1,
        margin:px2dp(8),
        justifyContent:"center",
        alignItems:'center'
    },
    textStyle:{
        fontSize:30,
        color:'white',
        fontWeight:'bold'
    },
    bottomStyle:{
        height:px2dp(42),
        marginBottom:px2dp(22),
        justifyContent:'center',
        alignItems:'center'
    }
})