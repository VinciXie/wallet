import {Dimensions} from 'react-native'
const {width, height,scale} = Dimensions.get('window');

export default (px)=>{
    return px
    // let dp = 0;
    // px *= 2
    // if(width>1024 || height > 1024){
    //     dp = px / scale * 1.33
    // }else {
    //     dp = px / scale
    // }
    // return dp;
}
