import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import {vw, vh, vmin, vmax} from './../services/viewport';


export default class Start extends Component {


    pressMe = () => {
        this.props.onStart();
    };

    render() {
        return (
            <View style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#1b1b21be'
            }}>
                <TouchableOpacity
                    activeOpacity={1} onPress={ this.pressMe }
                style={{borderRadius: 8, overflow: 'hidden'}}>
                    <Text style={{ fontSize: 25, color: 'white', backgroundColor: '#FBD341',  paddingHorizontal: 20,
                        paddingVertical: 10}}>
                        Start!
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

}