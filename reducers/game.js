import { TICK, BOUNCE, START_GAME, START_AGAIN, BORDER_TOP_POSITION, BORDER_BOTTOM_POSITION } from '../constants';
import {vw, vh, vmin, vmax} from './../services/viewport';

const colors = ['#FBD341', '#3a7850', '#FF363E', '#428BC9', '#d077ce'];

function bounce(player){
    const bounceUpdatedVelocity = { x : player.velocity.x , y : -0.08 * vh };

    return {...player, velocity : bounceUpdatedVelocity};
}

function getUpdatedVelocity(object, timeLapsed, gravity){
    let updateVelocity = object.velocity.y + timeLapsed * gravity;

    return {  x :  object.velocity.x, y : updateVelocity }
}

function getUpdatedY(object, timeLapsed , gravity){
    const distanceCovered = object.velocity.y * timeLapsed + 0.1 * gravity * timeLapsed * timeLapsed;
    return {  x : object.position.x , y : object.position.y + distanceCovered  }
}

function updatePlayerPosition(player, dt =  1000/60, gravity) {
    const newPosition =  getUpdatedY(player, dt, gravity);
    const updatedVelocity = getUpdatedVelocity(player, dt, gravity);

    return {...player, position : newPosition, velocity : updatedVelocity};
}

function update(gameObjects, player){
    let score = 0;
    let arr = gameObjects.reduce((acc, item) => {
        if(item.name == 'ground'){
            const newPosition = getUpdateGroundPosition(item);
            const updaterItems = Object.assign({} ,item , { position : newPosition} );

            return [...acc, updaterItems];
        } else if(item.name == 'wall'){
            let newWalls = [];

            if (checkCollision(player, item) && item.color == player.color) {
                const generatedWalls = generateWall(3 + Math.floor(Math.random() * 2), player.color);
                score += 1;

                return [...acc, ...generatedWalls];
            } else {
                return [...acc, getUpdateWallPosition(item), ...newWalls];
            }
        }
        else {
            return acc.concat([item]);
        }
    }, []);

    return { objects: arr.filter(item => item !== undefined), score};
}

function getUpdateGroundPosition(obj) {
    const distanceCovered = obj.velocity.x;

    if(obj.position.x > -130 * vw)  {
        return { x : obj.position.x + distanceCovered, y : obj.position.y }
    }
    else{
        return { x : 0 , y : obj.position.y }
    }
}

function getUpdateWallPosition(wall) {
    const distanceCovered = wall.velocity.x;

    if(wall.position.x > -130)  {
        const position = { x : wall.position.x + distanceCovered, y : wall.position.y };

        return { ...wall, position }
    }
}

function checkCollision(player, wall) {
    const circle = {
        x: player.position.x,
        y: player.position.y,
        r: player.radius};
    const rect = {
        x: wall.position.x,
        y: wall.position.y,
        w: wall.dimension.width,
        h: wall.dimension.height};

    let distX = Math.abs(circle.x + circle.r - rect.x-rect.w/2);
    let distY = Math.abs(circle.y + circle.r - rect.y-rect.h/2);

    if (distX > (rect.w/2 + circle.r)) { return false; }
    if (distY > (rect.h/2 + circle.r)) { return false; }

    if (distX <= (rect.w/2)) { return true; }
    if (distY <= (rect.h/2)) { return true; }

    let dx=distX-rect.w/2;
    let dy=distY-rect.h/2;

    return (dx*dx+dy*dy<=(circle.r*circle.r));
}

function createWallBlock(color, x, y, width, height, vX = -0.8, vY = 0) {
    return {
        name: 'wall',
        color,
        position: {
            x: x * vw,
            y: y * vh
        },
        velocity: {
            x: vX * vw,
            y: vY * vh
        },
        dimension: {
            width: width * vw,
            height: height * vh
        },
        static: true,
    }
}

function shuffle(arr){
    let j, temp;
    for(let i = arr.length - 1; i > 0; i--){
        j = Math.floor(Math.random()*(i + 1));
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
    }

    return arr;
}

function generateWall(count, color) {
    let walls = [];
    let randomColors = [];
    randomColors.push(color);

    for (let i = 1; i < count; i++) {
        let entry;

        do {
            entry = colors[Math.floor(Math.random() * colors.length)];
        } while(randomColors.indexOf(entry) > -1);

        randomColors.push(entry);
    }

    randomColors = shuffle(randomColors);

    for(let i = 0; i < count; i++) {
        walls.push(createWallBlock(randomColors[i], 150, BORDER_TOP_POSITION + i * (70 / count), 3, (70 / count)));
    }

    return walls;
}


function checkGameOver(objects, player) {
    const checks = objects
        .filter( item => item.name === 'wall')
        .map(item => {
            if (item.color !== player.color) {
               return checkCollision(player, item);
            }
        });

    console.log(checks);

    return checkCollision(player, objects[0]) || checkCollision(player, objects[1]) || checks.includes(true)
}

const initialState = {
    game: {
        gravity: 0.0002 * vh,
        player: {
            name: 'player',
            color: '#FF363E',
            position: {
                x: 30 * vw,
                y: 55 * vh
            },
            velocity: {
                x: 0,
                y: 0
            },
            radius: 15,
            particles: [],
        },
        objects: [
            {
                name: 'ground',
                position: {
                    x: 0,
                    y: BORDER_TOP_POSITION * vh
                },
                velocity: {
                    x: -1 * vw,
                    y: 0
                },
                dimension: {
                    width: 10000,
                    height: 1 * vh
                },
            },
            {
                name: 'ground',
                position: {
                    x: 0,
                    y: BORDER_BOTTOM_POSITION * vh
                },
                velocity: {
                    x: -1 * vw,
                    y: 0
                },
                dimension: {
                    width: 10000,
                    height: 1 * vh
                },
            }
        ],
        start : false,
        gameOver: false,
        score: 0
    }
};

const game = (state = initialState.game, action  ) => {
    switch (action.type){
        case TICK:
            const updatedState = update(state.objects, state.player);

            return {
                ...state,
                player: updatePlayerPosition(state.player, action.dt, state.gravity),
                objects: updatedState.objects,
                gameOver: checkGameOver(state.objects, state.player),
                score : state.score + updatedState.score,
            };
        case BOUNCE:
            return { ...state, player : bounce(state.player) };
        case START_AGAIN:
            return initialState.game;
        case START_GAME:
            return Object.assign( {} ,
                    state,
                    { start : true, objects: [ ...state.objects, ...generateWall(3 + Math.floor(Math.random() * 4), state.player.color)]}
                );
        default :
            return state
    }
};

export default game;