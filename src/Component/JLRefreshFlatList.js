import React,{PureComponent} from 'react'
import {View,StyleSheet,Text,FlatList,ActivityIndicator,TouchableOpacity} from 'react-native'

export const RefreshState = {
    Init:0,
    Normal:1,
    onHeaderRefreshing:2,
    onFooterLoadingMore:3,
    NoMoreData:4,
    EmptyData:5
}

export default class JLRefreshFlatList extends PureComponent{
    constructor(props){
        super(props)
    }

    static defaultProps = {
        data:[],
        refreshState:RefreshState.Init,
        onEndReachedThreshold:0.01,
        renderItem:()=>{},
        onHeaderRefreshing:()=>{},
        onFooterLoadingMore:()=>{},
        ListFooterComponent:()=>{},
        NoteText:{
            normal:'点击加载更多数据',
            loadingMoreText:'正在加载更多',
            noMoreData:"已加载全部数据",
            emptyData:'暂无数据'
        }
    }

    beginRefresh(){
        if(this.shouldRefreshing()){
            this.props.onHeaderRefreshing && this.props.onHeaderRefreshing()
        }
    }

    beginLoadingMore(){
        if(this.shouldRefreshing() && (this.props.refreshState != RefreshState.NoMoreData)){
            this.props.onFooterLoadingMore && this.props.onFooterLoadingMore()
        }
    }

    shouldRefreshing(){
        return !(this.props.refreshState===RefreshState.onHeaderRefreshing || this.props.refreshState===RefreshState.onFooterLoadingMore || this.props.refreshState===RefreshState.Init)
    }

    footerRefresh(){
        let NoteText = this.props.NoteText
        let loadingMoreText = '点击加载更多数据'
        let refreshState = this.props.refreshState
        switch(refreshState){
            case RefreshState.Init:
                loadingMoreText  = NoteText.normal;
                break;
            case RefreshState.Normal:
                loadingMoreText = NoteText.normal;
                break;
            case RefreshState.onFooterLoadingMore:
                loadingMoreText = NoteText.loadingMoreText;
                break;
            case RefreshState.NoMoreData:
                loadingMoreText = NoteText.noMoreData;
                break;
            case RefreshState.EmptyData:
                loadingMoreText = NoteText.emptyData;
                break;
            default:
                loadingMoreText = NoteText.normal
                break;
        }

        return(
            <View>
                {this.props.ListFooterComponent()}
                <TouchableOpacity onPress={()=>{this.props.onFooterLoadingMore()}}>
                    <View style={[styles.footerRefreshStyle,this.props.footerRefreshStyle]}>
                        <ActivityIndicator animating={this.props.refreshState===RefreshState.onFooterLoadingMore}/>
                        <Text style={{paddingLeft:20}}>{loadingMoreText}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    render(){
        return(
            <FlatList
                {...this.props}
                style={[styles.container,this.props.style]}
                data={this.props.data}
                refreshing={this.props.refreshState === RefreshState.onHeaderRefreshing}
                onRefresh={()=>{this.beginRefresh()}}
                ListFooterComponent={this.footerRefresh()}
                onEndReachedThreshold={this.props.onEndReachedThreshold}
                onEndReached={()=>{this.beginLoadingMore()}}
            />
        )
    }
}

const styles = StyleSheet.create({
    container:{flex:1},
    footerRefreshStyle:{height:49,marginTop:10,flexDirection:'row',justifyContent:'center',alignItems:'center'}
})