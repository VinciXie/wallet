import React,{PureComponent} from 'react'
import {TabBar} from 'antd-mobile-rn'
import BTAsset from './Containers/Asset/BTAsset'
import BTHome from './Containers/Home/BTHome'
import BTProfile from './Containers/Profile/BTProfile'
import Locale from './locales/index'
const TabBarItem = TabBar.Item;

export default class BTTabbar extends PureComponent{
    constructor(props){
        super(props)

        this.state = {
            selected:'home'
        }
    }

    selectTab(selectedTab){
        this.setState({selected:selectedTab})
    }

    componentWillReceiveProps(nextProps){
        console.log({componentWillReceiveProps:nextProps})
        if(nextProps.refresh){
            this.forceUpdate()
        }
    }

    render(){

        console.log({props:this.props})
        return(
            <TabBar>
                <TabBarItem title={Locale.t('Other_Home')} icon={require('./Public/img/asset.png')} key="tbhome" selected={this.state.selected =='home'} onPress={()=>{this.selectTab('home')}}><BTHome selected={this.state.selected =='home'}/></TabBarItem>
                {/* <TabBarItem title="资产" icon={require('./Public/img/asset.png')} selectedIcon={require('./Public/img/asset_highlight.png')} key="asset" selected={this.state.selected =='asset'} onPress={()=>{this.selectTab('asset')}}><BTAsset/></TabBarItem> */}
                <TabBarItem title={Locale.t('Other_Profile')} icon={require('./Public/img/profile.png')} key="profile" selected={this.state.selected =='profile'} onPress={()=>{this.selectTab('profile')}}><BTProfile selected={this.state.selected =='profile'}/></TabBarItem>
            </TabBar>
        )
    }
}