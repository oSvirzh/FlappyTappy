import React, {Component} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';

import {vw, vh, vmin, vmax} from './services/viewport';

import Player from "./components/Player";
import Border from "./components/Border";
import Wall from "./components/Wall";
import Score from "./components/Score"
import Start from "./components/Start";
import GameOver from "./components/GameOver"

export default class Game extends Component {
    time = new Date();
    myReqAnimationId;
    state = {
        gameOver: false,
    };

    shouldComponentUpdate(nextProps, nextState) {
        if(nextState.gameOver){
            return false;
        }
        return true;
    }

    componentWillUpdate(nextProps, nextState) {

        if (nextProps.gameOver) {
            this.setState({gameOver : true});
            cancelAnimationFrame(this.myReqAnimationId);
        }
    }

    update = () => {
        const timeDiff = new Date() - this.time;
        this.time = new Date();
        this.props.tick(timeDiff);
        this.myReqAnimationId =  requestAnimationFrame(this.update);
    };

    onStartGame = () => {
        this.props.startGame();
        this.time = new Date();
        this.myReqAnimationId = requestAnimationFrame(this.update)
    };

    onRestart = () => {
        this.props.restartGame();
        this.time = new Date();
        this.setState({gameOver : false});
        cancelAnimationFrame(this.myReqAnimationId);
    };

    onBounce = () => {
        this.props.bounce();
    };

    render() {
        const walls = this.props.walls.map((item, i) => {
            return <Wall style={{position: 'absolute'}} key = { i } item = { item } />
        });

        return (
            <TouchableOpacity activeOpacity={1} onPress={ this.onBounce } style={{flex: 1}}>
                <View style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: '#232325' }}>
                    <Player x={ this.props.player.position.x} y={  this.props.player.position.y} />

                    {walls}

                    <Border x={ this.props.borderTop.position.x} y={  this.props.borderTop.position.y} />
                    <Border x={ this.props.borderBottom.position.x} y={  this.props.borderBottom.position.y} />

                    <Score score = { this.props.score } />

                    { !this.props.start  ?  <Start onStart = { this.onStartGame } /> : <Text></Text> }
                    { this.props.gameOver ? <GameOver onRestart = { this.onRestart } /> : <Text></Text> }
                </View>
            </TouchableOpacity>
        );
    }
}