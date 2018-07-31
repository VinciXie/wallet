export const SHOW_COIN_TYPE = 'SHOW_COIN_TYPE'

export function showCoinType(isShow){
    return {
        type:SHOW_COIN_TYPE,
        isShow
    }
}