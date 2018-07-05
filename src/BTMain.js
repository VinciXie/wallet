import React,{PureComponent} from 'react'
import BTGlobal from './Common/BTGlobal'
import BTRouter from './BTRouter'


export default class BTMain extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <BTRouter/>
        )
    }
}