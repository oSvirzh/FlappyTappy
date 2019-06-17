import React, {Component} from 'react'
import { Provider } from 'react-redux';

import {vw, vh, vmin, vmax} from './services/viewport';

import GameContainer from './containers/GameContainer';

import configureStore from './store/configureStore';

import {BORDER_BOTTOM_POSITION, BORDER_TOP_POSITION} from './constants';

let store = configureStore();

class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <GameContainer  />
            </Provider>
        )
    }
};

export default App;


