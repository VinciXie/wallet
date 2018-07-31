import React,{PureComponent} from 'react'
import {View,StyleSheet,Text,Image,TouchableOpacity} from 'react-native'
import {Actions} from 'react-native-router-flux'
import Locale from '../../locales/index'
// const Locale = global.Locale
const Storage = global.Storage

const px2dp = global.px2dp
console.log({global})

export default class BTProfile extends PureComponent{
    constructor(props){
        super(props)
        this.state = {
            account:''
        }
    }

     async componentDidMount(){
        let account = await Storage.load({key:'account'})
        this.setState({account:account.account})
    }

    async componentWillReceiveProps(nextProps){
        let account = await Storage.load({key:'account'})
        this.setState({account:account.account})
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={{height:px2dp(225),backgroundColor:'#007AFF'}}>
                    <View style={{marginTop:px2dp(38),height:px2dp(65),flexDirection:'row'}}>
                        {/* <View style={{marginLeft:px2dp(18),width:px2dp(65),height:px2dp(65),borderRadius:px2dp(45),backgroundColor:'red'}}></View> */}
                        <Image style={{marginLeft:px2dp(18),width:px2dp(65),height:px2dp(65),borderRadius:px2dp(45)}} source={require('../../Public/img/1.png')}/>
                        <Text style={{fontSize:24,color:'white',marginLeft:px2dp(24)}}>{this.state.account}</Text>
                    </View>
                    <View style={{marginTop:px2dp(30),flex:1,flexDirection:'row',justifyContent:'center'}}>
                        <View style={{width:px2dp(60),height:px2dp(68),marginRight:px2dp(45)}}><CardItem title={Locale.t('Profile_ManageWallet')} iconPath={require('../../Public/img/manage_card.png')} onPress={()=>{Actions.push('walletList')}}/></View>
                        <View style={{width:px2dp(60),height:px2dp(68),marginLeft:px2dp(45)}}><CardItem title={Locale.t('Profile_TransferHistory')} iconPath={require('../../Public/img/transfer_history.png')} onPress={()=>{Actions.push('transferHistory')}}/></View>
                    </View>
                </View>

                <View style={{padding:px2dp(20)}}>
                    <Text style={{color:'#9A9A9A'}}>{Locale.t('Profile_Other')}</Text>
                    <CellItem title={Locale.t('Profile_ChangeLanguage')} iconPath={require('../../Public/img/language.png')} onPress={()=>{Actions.push('changeLanguage')}}/>
                    {/* <CellItem title={Locale.t('Profile_AboutUS')} iconPath={require('../../Public/img/about_us.png')} onPress={()=>{alert('关于我们')}}/>
                    <CellItem title={Locale.t('Profile_Issue')} iconPath={require('../../Public/img/issue.png')} onPress={()=>{alert('问题反馈')}}/> */}
                </View>
            </View>
        )
    }
}



class CellItem extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <TouchableOpacity style={{flexDirection:'row',marginTop:px2dp(20),alignItems:'center'}} onPress={()=>this.props.onPress()}>
                <Image source={this.props.iconPath} style={{width:px2dp(35),height:px2dp(35),marginRight:px2dp(20)}}/>
                <Text>{this.props.title}</Text>
            </TouchableOpacity>
        )
    }
}

class CardItem extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        console.log({profileProps:this.props})
        return(
            <TouchableOpacity style={{flex:1,alignItems:'center'}} onPress={()=>{this.props.onPress()}}>
                    <Image source={this.props.iconPath} style={{width:px2dp(36),height:px2dp(36)}}/>
                    <Text style={{fontSize:14,color:'#FFFFFF',width:px2dp(60),marginTop:px2dp(12)}}>{this.props.title}</Text>
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    }
})