import React,{PureComponent} from 'react'
import {TabBar} from 'antd-mobile'
import BTAsset from './Containers/Asset/BTAsset'
import BTHome from './Containers/Home/BTHome'
import BTProfile from './Containers/Profile/BTProfile'
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

    render(){
        return(
            <TabBar>
                <TabBarItem title="首页" icon={require('./Public/img/file.png')} selectedIcon={require('./Public/img/file_highlight.png')} key="tbhome" selected={this.state.selected =='home'} onPress={()=>{this.selectTab('home')}}><BTHome selected={this.state.selected =='home'}/></TabBarItem>
                {/* <TabBarItem title="资产" icon={require('./Public/img/asset.png')} selectedIcon={require('./Public/img/asset_highlight.png')} key="asset" selected={this.state.selected =='asset'} onPress={()=>{this.selectTab('asset')}}><BTAsset/></TabBarItem> */}
                <TabBarItem title="我的" icon={require('./Public/img/profile.png')} selectedIcon={require('./Public/img/profile_highlight.png')} key="profile" selected={this.state.selected =='profile'} onPress={()=>{this.selectTab('profile')}}><BTProfile selected={this.state.selected =='profile'}/></TabBarItem>
            </TabBar>
        )
    }
}