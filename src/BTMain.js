import React,{PureComponent} from 'react'
import BTGlobal from './Common/BTGlobal'
import BTRouter from './BTRouter'
import {BTFetch} from './Common/BTFetch'
import {Provider} from 'react-redux'
import store from './Redux/Store'
import Storage from './DB/Storage'


export default class BTMain extends PureComponent{
    constructor(props){
        super(props)
    }

    // async componentDidMount(){
    //     try{
    //         let storeLocale = await Storage.load({key:'locale'})
    //         if(storeLocale){
    //             global.Locale.locale = storeLocale
    //         }
    //     }catch(error){

    //     }
    // }

    render(){
        return(
            <Provider store={store}>
                <BTRouter/>
            </Provider>
        )
    }
}