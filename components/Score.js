import React, {Component} from 'react';
import { Text, StyleSheet } from 'react-native';

import {vw, vh, vmin, vmax} from './../services/viewport';


export default class Score extends Component {


    render() {
        const { score } = this.props;

        return (
            <Text style={styles.score}  >
                { score }
            </Text>
        );
    }

}

const styles = StyleSheet.create({
    score: {
        position: 'absolute',
        left: 47 * vmin,
        top: 10 * vmax,
        flexDirection: 'row',
        color: 'white',
        fontSize: 20 }
});