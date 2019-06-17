import React, { Component } from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {vw, vh, vmin, vmax} from './../services/viewport';


export default class GameOver extends Component{

    pressMe = () => {
        this.props.onRestart();
    };

    render(){
        return(
            <View style={{
                position : 'absolute',
                left: 0,
                top: 0,
                width: '100%',
                height: '100%' ,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#1b1b21be' }}  >
                <Text style={{color: '#FBD341'}}>
                    Game over!
                </Text>
                <TouchableOpacity
                    activeOpacity={1} onPress={ this.pressMe }
                    style={{borderRadius: 8, overflow: 'hidden'}}>
                    <Text style={{ fontSize: 25, color: 'white', backgroundColor: '#FBD341',  paddingHorizontal: 20,
                        paddingVertical: 10}}>
                        Play again!
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

}