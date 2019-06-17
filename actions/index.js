import * as types from '../constants'


export function tick(dt){
    return { type : types.TICK , dt}
}


export function bounce(){
    return { type : types.BOUNCE }
}


export function startGame() {
    return {  type : types.START_GAME }
}

export function restartGame(){
    return { type : types.START_AGAIN  }
}

export function	runGroundAlways(){
    return { type : types.RUNGROUNDALWAYS }
}
