import React,{PureComponent} from 'react'
import {View,Text,TextInput,Image,TouchableOpacity} from 'react-native'
import BTDivView from '../../Component/BTDivView'
import BTButton from '../../Component/BTButton'

export default class BTWalletDetail extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <View style={{flex:1,backgroundColor:'white',alignItems:'center',padding:20}}>
                <BTWalletCard style={{marginTop:44}}/>
                <Text style={{marginTop:22,marginBottom:10,alignSelf:'flex-start'}}>收款地址</Text>
                <TextInput editable={false} style={{width:350,height:113,backgroundColor:'#EBEBEB',fontSize:14,lineHeight:20}} multiline={true}>lkfkjsakdsjflkdsfjlsdflkfkjsakdsjflkdsfjlsdflkfkjsakdsjflkdsfjlsdflkfkjsakdsjflkdsfjlsdflkfkjsakdsjflkdsfjlsdflkfkjsakdsjflkdsfjlsdflkfkjsakdsjflkdsfjlsdflkfkjsakdsjflkdsfjlsdflkfkjsakdsjflkdsfjlsdflkfkjsakdsjflkdsfjlsdf</TextInput>
                <BTNoteView style={{marginLeft:20,marginRight:20,marginBottom:10}}/>
                <BTDivView/>
                <Text style={{fontSize:14,color:'#007AFF',marginTop:10}}>请将Keystore妥善保管,任何人获得你的keystore内容都有可能操作你的账户资金</Text>
                <BTButton title="复制Keystore至粘贴板" style={{marginTop:20,borderRadius:45,width:333,height:60}} onClick={()=>{alert('已经复制至粘贴板')}}/>
                <TouchableOpacity onPress={()=>{alert('移除账户')}}><Text style={{color:'#007AFF',marginTop:20}}>移除账户</Text></TouchableOpacity>
            </View>
        )
    }
}

class BTNoteView extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <View style={[{flexDirection:'row',alignItems:'center',justifyContent:'center'},this.props.style]}>
                <Image source={require('../../Public/img/suggest.png')} style={{width:35,height:35,margin:20}}/>
                <Text style={{fontSize:14,color:'#007AFF',marginTop:global.px2dp(20)}}>当APP被删后在其他手机上使用钱包时,需导入当前钱包备份私钥，否则可能永久丢失钱包资产，请务必备份好钱包，并妥善保管备份信息。</Text>
            </View>
        )
    }
}

class BTWalletCard extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <View style={this.props.style}>
                <View style={{backgroundColor:'#007AFF',width:349,height:152,borderRadius:15,alignItems:'center'}}>
                    <Text style={{alignSelf:'flex-start',marginLeft:20,marginTop:20,fontSize:24,color:'white'}}>Christ-2008</Text>
                    <Text style={{marginTop:33,color:'white',fontSize:14}}>我的资产</Text>
                    <Text style={{marginTop:10,fontSize:25,color:'white',fontWeight:'bold'}}>≈￥2348273</Text>
                </View>
            </View>
        )
    }
}