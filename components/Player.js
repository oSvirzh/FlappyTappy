import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {vw, vh, vmin, vmax} from './../services/viewport';

export default class Player extends Component {

    render() {

        return (
            <View>
                <View style={[styles.player, {
                    left: this.props.x,
                    top: this.props.y,
                }]}>
                </View>
                {/*{patricleElements}*/}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    player: {
        position: 'absolute',
        backgroundColor: '#FF363E',
        width: 30,
        height: 30,
        borderRadius: 100
    }
});