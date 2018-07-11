import React,{PureComponent} from 'react'
import BTNavLeftButton from './Component/BTNavLeftButton'
import {Router,Scene,Modal} from 'react-native-router-flux'
import BTTabBar from './BTTabBar'
import BTInitView from './Containers/Login/BTInitView'
import BTCreateAccount from './Containers/Login/BTCreateAccount'
import BTCreateSuccess from './Containers/Login/BTCreateSuccess'
import BTBackUpKeystore from './Containers/Login/BTBackUpKeystore'
import BTLogin from './Containers/Login/BTLogin'
import BTQRCode from './Component/BTQRCode'
import BTTransaction from './Containers/Transaction/BTTransaction'
import BTQRScaner from './Component/QRScan/BTQRScaner'
import BTCoinType from './Containers/Transaction/BTCoinType'
import BTTransferRecode from './Containers/Profile/subviews/BTTransferRecode'
import BTTransferDetail from './Containers/Profile/subviews/BTTransferDetail'
import BTChangeLanguage from './Containers/Profile/subviews/BTChangeLanguage'
import BTWalletDetail from './Containers/Wallets/BTWalletDetail'
import BTWalletList from './Containers/Wallets/BTWalletList'

export default class BTRouter extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <Router>
                <Scene key="root">
                    <Scene key="initView" hideNavBar={true} component={BTInitView}/>
                    <Scene key="createAccount" component={BTCreateAccount}  navTransparent={true} renderLeftButton={<BTNavLeftButton backArr='white'/>}/>
                    <Scene key="createAccountSuccess" component={BTCreateSuccess}  navTransparent={true} renderLeftButton={<BTNavLeftButton backArr='white'/>}/>
                    <Scene key="BTBackUpKeystore" naviga component={BTBackUpKeystore}  navTransparent={true} renderLeftButton={<BTNavLeftButton backArr='white'/>}/>
                    <Scene key="home" component={BTTabBar} hideNavBar={true}/>
                    <Scene key="login" component={BTLogin} back={false}  navTransparent={true} renderLeftButton={<BTNavLeftButton/>}/>
                    <Scene key="qrcode" component={BTQRCode} back={false}  navTransparent={true} renderLeftButton={<BTNavLeftButton/>}/>
                    <Scene key="transaction" component={BTTransaction} hideNavBar={true}/>
                    <Scene key="qrscaner" component={BTQRScaner} back={false}  navTransparent={true} renderLeftButton={<BTNavLeftButton/>}/>
                    <Scene key="coinType" component={BTCoinType} hideNavBar={true}></Scene>
                    <Scene key="transferRecode" component={BTTransferRecode} back={false}  navTransparent={true} renderLeftButton={<BTNavLeftButton/>}/>
                    <Scene key="transferDetail" component={BTTransferDetail} back={false}  navTransparent={true} renderLeftButton={<BTNavLeftButton/>}/>
                    <Scene key="changeLanguage" component={BTChangeLanguage} back={false}  navTransparent={true} renderLeftButton={<BTNavLeftButton/>}/>
                    <Scene key="walletDetail" component={BTWalletDetail} back={false}  navTransparent={true} renderLeftButton={<BTNavLeftButton/>}/>
                    <Scene key="walletList" component={BTWalletList} back={false}  navTransparent={true} renderLeftButton={<BTNavLeftButton/>}/>
                </Scene>
            </Router>
        )
    }
}





