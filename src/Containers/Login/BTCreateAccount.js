import React,{PureComponent} from 'react'
import {View,StyleSheet,ImageBackground,TouchableOpacity,Image} from 'react-native'
import {Toast} from 'antd-mobile-rn'
import {Actions} from 'react-native-router-flux'
import BTInputItem from '../../Component/BTInputItem'
import BTButton from '../../Component/BTButton'
import {isUserName} from '../../Common/BTVerify'
import {BTFetch} from '../../Common/BTFetch'
import {getBlockInfo} from '../../Common/BTCommonApi'
import {registPack} from '../../lib/BTPackManager'
import {messageSign} from '../../lib/BTSignManager'
import Locale from '../../locales/index'
// const Locale = global.Locale
var Buffer = require('buffer/').Buffer
const BTCrypto = global.BTCrypto
const Keystore = global.BTCrypto.keystore

console.log({BTCrypto})

const px2dp = global.px2dp

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

    createAccount(){
        let username = this.state.username;
        let password = this.state.password;
        let repassword = this.state.repassword
        let verificationCode = this.state.verificationCode

        if(!isUserName(this.state.username)) {
            Toast.fail(Locale.t('Message_UserNameWrong'))
            return
        }
        if(this.state.password.length < 8){
            Toast.fail(Locale.t('Message_PasswordWrong'))
            return
        }
        if(this.state.password != this.state.repassword){
            Toast.fail(Locale.t('Message_PasswordTwiceNotSame'))
            return
        }
        if(this.state.verificationCode==''){
            Toast.fail(Locale.t('Message_PlaceInputVerifyCode'))
            return
        }

        BTCrypto.createKeys(async(error,result)=>{
            if(error){
                Toast.fail(Locale.t('Message_KeystoreCreateFailed'))
                return
            }
            let Keystrings = JSON.parse(result)
            let privateKey = Buffer.from(Keystrings.privateKey,'hex')
            let publicKey = Buffer.from(Keystrings.publicKey,'hex')
            let keys = {privateKey,publicKey}
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
            Toast.loading(Locale.t('Message_OnCreating'),1000*6)
            setTimeout(()=>{
                BTFetch(url,'POST',registParams).then(response=>{
                    if(response){
                        if(response.code==1){
                            console.log({privateKey})
                            BTCrypto.createKeystoreWithPrivateKey(privateKey.toString('hex'),password,(error,result)=>{
                                if(error){
                                    Toast.fail(Locale.t('Message_KeystoreCreateFailed'))
                                }else{
                                    let keystore = JSON.parse(result)
                                    keystore.account = username
                                    delete keystore.address
                                    Toast.success(Locale.t('Message_RegistSuccess'))
                                    Actions.push("createAccountSuccess",{keystore})
                                }
                            })
                        }else if(response.code==1001){
                            Toast.fail(Locale.t('Message_VerifyCodeFailed'))
                        }else if(response.code==10103){
                            Toast.fail(Locale.t('Message_AccountAlreadyExist'))
                        }else{
                            Toast.fail(Locale.t('Message_RegistFailed'))
                        }
                    }
                }).catch(error=>{
                    console.log({error})
                    Toast.fail(Locale.t('Message_RegistFailed'))
                })
            },1000)
        })
    }

    //  async createAccount1(){
    //     let username = this.state.username;
    //     let password = this.state.password;
    //     let repassword = this.state.repassword
    //     let verificationCode = this.state.verificationCode
    //     if(!isUserName(this.state.username)) {
    //         Toast.fail(Locale.t('Message_UserNameWrong'))
    //         return
    //     }
    //     if(this.state.password.length < 8){
    //         Toast.fail(Locale.t('Message_PasswordWrong'))
    //         return
    //     }
    //     if(this.state.password != this.state.repassword){
    //         Toast.fail(Locale.t('Message_PasswordTwiceNotSame'))
    //         return
    //     }
    //     if(this.state.verificationCode==''){
    //         Toast.fail(Locale.t('Message_PlaceInputVerifyCode'))
    //         return
    //     }

    //     let keys = BTCrypto.createKeys()
    //     let privateKey = keys.privateKey
    //     let blockHeader = await getBlockInfo()
    //     let didParam = this.getDid(username,keys)
    //     let buf = registPack(didParam)

    //     let newuser = {
    //         version:1,
    //         ...blockHeader,
    //         sender: username,
    //         contract:"usermng",
    //         method:"reguser",
    //         param: buf,
    //         sig_alg:1
    //     }
    //     let signObj = messageSign(newuser,privateKey)
    //     newuser.param = BTCrypto.buf2hex(buf)
    //     newuser.signature = signObj.toString('hex')

    //     let registParams = {
    //         account:{
    //             Name:username,
    //             Pubkey:keys.publicKey.toString('hex')
    //         },
    //         user:newuser,
    //         verify_id:this.state.verify_id,
    //         verify_value:verificationCode
    //     }

    //     let url = '/user/register'
    //     Toast.loading(Locale.t('Message_OnCreating'),1000*6)
    //     setTimeout(()=>{
    //         BTFetch(url,'POST',registParams).then(response=>{
    //             console.log({response})
    //             if(response){
    //                 if(response.code==1){
    //                     try{
    //                         let keystore = Keystore.create({account:username,password,privateKey})
    //                         Toast.success(Locale.t('Message_RegistSuccess'))
    //                         Actions.push("createAccountSuccess",{keystore})
    //                     }catch(error){
    //                         Toast.fail(Locale.t('Message_KeystoreCreateFailed'))
    //                         alert(error)
    //                     }
    //                 }else if(response.code==1001){
    //                     Toast.fail(Locale.t('Message_VerifyCodeFailed'))
    //                 }else if(response.code==10103){
    //                     Toast.fail(Locale.t('Message_AccountAlreadyExist'))
    //                 }else{
    //                     Toast.fail(Locale.t('Message_RegistFailed'))
    //                 }
    //             }
    //         }).catch(error=>{
    //             console.log({error})
    //             Toast.fail(Locale.t('Message_RegistFailed'))
    //         })
    //     },1000)
    // }

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
                    placeholder={Locale.t('Regist_UserNamePlaceholder')}
                    placeholderTextColor="#ACACAC"
                    title={Locale.t('Regist_UserName')}
                    maxLength={16}
                    style={{marginTop:px2dp(67)}}
                    clearButtonMode="while-editing"
                    onChangeText={(username)=>{this.setState({username})}}
                />
                <BTInputItem 
                    placeholder={Locale.t('Regist_PasswordPlaceholder')}
                    placeholderTextColor="#ACACAC"
                    title={Locale.t('Regist_Password')}
                    clearButtonMode="while-editing"
                    secureTextEntry={true}
                    onChangeText={(password)=>{this.setState({password})}}
                />
                <BTInputItem 
                    placeholder={Locale.t('Regist_Password')}
                    placeholderTextColor="#ACACAC"
                    title={Locale.t('Regist_SurePassword')}
                    clearButtonMode="while-editing"
                    secureTextEntry={true}
                    onChangeText={(repassword)=>{this.setState({repassword})}}
                />
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <BTInputItem 
                        placeholder={Locale.t('Regist_VerifyCodePlaceholder')}
                        placeholderTextColor="#ACACAC"
                        title={Locale.t('Regist_VerifyCode')}
                        style={{width:px2dp(200)}}
                        clearButtonMode="while-editing"
                        onChangeText={(verificationCode)=>{this.setState({verificationCode})}}
                    /> 
                    <TouchableOpacity onPress={()=>{this.getVerifyCode()}}>
                        <Image source={{uri:this.state.verify_data}} style={{width:px2dp(116),height:px2dp(33),backgroundColor:'#F9F9FB'}}/>
                    </TouchableOpacity>
                </View>

                <BTButton title={Locale.t('Other_Next')} style={styles.buttonStyle} onClick={()=>{this.createAccount()}}/>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container:{flex:1},
    buttonStyle:{marginTop:px2dp(22),alignSelf:'center',width:px2dp(333),height:px2dp(60)}
})