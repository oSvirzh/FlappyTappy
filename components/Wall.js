import React, {Component} from 'react';
import { View } from 'react-native';
import {vw, vh, vmin, vmax} from './../services/viewport';

export default class Border extends Component {

    render() {
        const { color, position: {x, y}, dimension: {width, height} } = this.props.item;

        return (
            <View style={{
                position: 'absolute',
                left: x,
                top: y,
                width: width,
                height: height,
                backgroundColor: color,
            }}>
            </View>
        );
    }
}