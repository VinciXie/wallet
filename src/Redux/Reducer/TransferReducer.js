import {SHOW_COIN_TYPE} from '../Action/TransferAction'

const initialState = {
    isShow:false
}

const TransferReducer = (state = initialState,Action)=>{
    switch(Action.type){
        case SHOW_COIN_TYPE:
            return {
                ...state
            }
        default:
            return state
    }
}

export default TransferReducer