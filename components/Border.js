import React, {Component} from 'react';
import { View } from 'react-native';
import {vw, vh, vmin, vmax} from './../services/viewport';

export default class Border extends Component {

    render() {
        return (
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                position: 'absolute',
                left: this.props.x,
                top: this.props.y,
            }}>
                <View style={{
                    width: 100,
                    height: 1 * vh,
                    backgroundColor: '#FBD341',
                }}>
                </View>
                <View style={{
                    width: 100,
                    height: 1 * vh,
                    backgroundColor: '#3a7850',
                }}>
                </View>
                <View style={{
                    width: 100,
                    height: 1 * vh,
                    backgroundColor: '#FF363E',
                }}>
                </View>
                <View style={{
                    width: 100,
                    height: 1 * vh,
                    backgroundColor: '#428BC9',
                }}>
                </View>
                <View style={{
                    width: 100,
                    height: 1 * vh,
                    backgroundColor: '#d077ce',
                }}>
                </View>
                <View style={{
                    width: 100,
                    height: 1 * vh,
                    backgroundColor: '#FBD341',
                }}>
                </View>
                <View style={{
                    width: 100,
                    height: 1 * vh,
                    backgroundColor: '#3a7850',
                }}>
                </View>
                <View style={{
                    width: 100,
                    height: 1 * vh,
                    backgroundColor: '#FF363E',
                }}>
                </View>
                <View style={{
                    width: 100,
                    height: 1 * vh,
                    backgroundColor: '#428BC9',
                }}>
                </View>
                <View style={{
                    width: 100,
                    height: 1 * vh,
                    backgroundColor: '#d077ce',
                }}>
                </View>
            </View>
        );
    }
}