import {BTFetch} from './BTFetch'

export const getBlockInfo = async()=>{
    let blockHeader = await BTFetch('/user/GetBlockHeader','GET')
    if(!(blockHeader && blockHeader.code==1)){
        window.message.error('block header get faild');
        return
    }
    let params = {}
    let data = blockHeader.data
    params.cursor_label = data.cursor_label
    params.cursor_num = data.head_block_num
    params.lifetime = data.head_block_time + 300
    return params
}