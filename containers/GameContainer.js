import { connect } from 'react-redux'
import * as actions from  '../actions';

import Game from '../Game'

const mapStateToProps = (state, ownProps) => {
    return {
        player: state.game.player,
        borderTop: state.game.objects[0],
        borderBottom: state.game.objects[1],
        walls: state.game.objects.filter( item => item.name === 'wall'),
        start : state.game.start,
        gameOver : state.game.gameOver,
        score: state.game.score
    }
};

export default connect(mapStateToProps, actions)(Game);