import React,{PureComponent} from 'react'
import {View,StyleSheet,ImageBackground,TouchableOpacity,Image} from 'react-native'
import {Toast} from 'antd-mobile'
import {Actions} from 'react-native-router-flux'
import BTInputItem from '../../Component/BTInputItem'
import BTButton from '../../Component/BTButton'
import {isUserName} from '../../Common/BTVerify'
import {BTFetch} from '../../Common/BTFetch'
import {getBlockInfo} from '../../Common/BTCommonApi'
import BTCrypto from '../../Crypto/index'
import {registPack} from '../../lib/BTPackManager'
import {messageSign} from '../../lib/BTSignManager'
const Keystore = global.BTCrypto.keystore

export default class BTCreateAccount extends PureComponent{
    constructor(props){
        super(props)

        this.state = {
            username:'',
            password:'',
            repassword:'',
            verificationCode:'',
            verify_data:'',
            verify_id:''
        }
    }

    loginButtonClick(){
        Actions.reset("home")
    }

    componentDidMount(){
        this.getVerifyCode()
    }

    getVerifyCode(){
        let url = '/user/getVerify'
        BTFetch(url,'GET').then(response=>{
            if(response && response.code==1){
                let data = response.data
                this.setState({
                    verify_data:data.verify_data,
                    verify_id:data.verify_id
                })
            }
        }).catch(error=>{

        })
    }

     async createAccount(){
        let username = this.state.username;
        let password = this.state.password;
        let repassword = this.state.repassword
        let verificationCode = this.state.verificationCode
        if(!isUserName(this.state.username)) {
            Toast.fail("用户名输入错误")
            return
        }
        if(this.state.password.length < 8){
            Toast.fail("密码输入不正确")
            return
        }
        if(this.state.password != this.state.repassword){
            Toast.fail("两次输入密码不正确")
            return
        }
        if(this.state.verificationCode==''){
            Toast.fail('请输入验证码')
            return
        }

        let keys = BTCrypto.createPubPrivateKeys()
        let privateKey = keys.privateKey
        let blockHeader = await getBlockInfo()
        let didParam = this.getDid(username,keys)
        let buf = registPack(didParam)

        let newuser = {
            version:1,
            ...blockHeader,
            sender: username,
            contract:"usermng",
            method:"reguser",
            param: buf,
            sig_alg:1
        }
        let signObj = messageSign(newuser,privateKey)
        newuser.param = BTCrypto.buf2hex(buf)
        newuser.signature = signObj.toString('hex')

        let registParams = {
            account:{
                Name:username,
                Pubkey:keys.publicKey.toString('hex')
            },
            user:newuser,
            verify_id:this.state.verify_id,
            verify_value:verificationCode
        }

        let url = '/user/register'
        Toast.loading('正在创建',1000*6)
        setTimeout(()=>{
            BTFetch(url,'POST',registParams).then(response=>{
                console.log({response})
                if(response){
                    if(response.code==1){
                        try{
                            let keystore = Keystore.create({account:username,password,privateKey})
                            Toast.success('注册成功')
                            Actions.push("createAccountSuccess",{keystore})
                        }catch(error){
                            Toast.fail('keystore创建失败')
                        }
                    }else if(response.code==1001){
                        Toast.fail('验证码错误')
                    }else if(response.code==10103){
                        Toast.fail('账号已存在')
                    }else{
                        Toast.fail('注册失败')
                    }
                }
            }).catch(error=>{
                console.log({error})
                Toast.fail('注册失败')
            })
        },1000)
    }

    getDid(accountName,keys){
        let publicKey = keys.publicKey
        let privateKey = keys.privateKey
        let publicKeyStr = publicKey.toString('hex')
        let didid = "did:bot:"+publicKeyStr.slice(0,32)
        let didParam = {
            "Didid": didid, // account公钥截取前32位
            "Didinfo": {
                "@context": "https://bottos.org/did/v1",
                "nameBase58": accountName,  // 当前用户名
                "version": "0.1",
                "botid": didid,  // didid
                "account": [{
                    "nameBase58": accountName,
                    "role": "owner",
                    "expires": new Date().getTime()+30*24*60*60,
                    "publicKey": publicKeyStr
                }],
                "control": [{
                    "type": "OrControl",
                    "controller": [{
                        "botid": didid,
                        "type": "EcdsaVerificationKey2018",
                        "owner": didid,  // 当前用户自己
                        "publicKey": publicKeyStr
                    }]
                }],
                "service": {

                },
                "created": new Date().getTime(),
                "updated": new Date().getTime()
            }
        }

        let hash = BTCrypto.sha256(JSON.stringify(didParam))

        let signature = BTCrypto.sign(hash,privateKey)
        didParam.Didinfo.signature = {
            "type": "EcdsaVerificationKey2018",
            "created": new Date().getTime(),
            "creator": didid,  // 谁签名写谁的
            "signatureValue": signature.toString('hex')
        }
        return didParam
    }

    render(){
        return(
            <ImageBackground source={require('../../Public/img/create_account_bg.png')} style={{width:global.ScreenWidth,height:global.ScreenHeight}}>
                <BTInputItem 
                    placeholder="3~16个小写字母、数字 以字母开头"
                    placeholderTextColor="#ACACAC"
                    title="账户名"
                    maxLength={16}
                    style={{marginTop:67}}
                    clearButtonMode="while-editing"
                    onChangeText={(username)=>{this.setState({username})}}
                />
                <BTInputItem 
                    placeholder="8~16位密码"
                    placeholderTextColor="#ACACAC"
                    title="输入密码"
                    clearButtonMode="while-editing"
                    secureTextEntry={true}
                    onChangeText={(password)=>{this.setState({password})}}
                />
                <BTInputItem 
                    placeholder="8~16位密码"
                    placeholderTextColor="#ACACAC"
                    title="确认密码"
                    clearButtonMode="while-editing"
                    secureTextEntry={true}
                    onChangeText={(repassword)=>{this.setState({repassword})}}
                />
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <BTInputItem 
                        placeholder="请输入验证码"
                        placeholderTextColor="#ACACAC"
                        title="验证码"
                        style={{width:200}}
                        clearButtonMode="while-editing"
                        onChangeText={(verificationCode)=>{this.setState({verificationCode})}}
                    /> 
                    <TouchableOpacity onPress={()=>{this.getVerifyCode()}}>
                        <Image source={{uri:this.state.verify_data}} style={{width:116,height:33,backgroundColor:'#F9F9FB'}}/>
                    </TouchableOpacity>
                </View>

                <BTButton title="下一步" style={styles.buttonStyle} onClick={()=>{this.createAccount()}}/>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container:{flex:1},
    buttonStyle:{marginTop:22,alignSelf:'center',width:333,height:60}
})