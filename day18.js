// open -> wooded 3 or more adjacent wood
// wood -> lumber 3 or more lumber
// lumber -> open no lumber OR no forest
class Square {
    constructor(state, n, ne, e, se, s, sw, w, nw) {
        this.state = state;
        this.n = n;
        this.ne = ne;
        this.e = e;
        this.se = se;
        this.s = s;
        this.sw = sw;
        this.w = w;
        this.nw = nw;
    }
}

const stateMap = {
    '.': 'O',
    '|': 'W',
    '#': 'L'
};

const input = require('./day18input');
const splitInput = input.map(line => line.split(''));
const width = input[0].length;
const height = input.length;

let squares = {};
let pastStates = [];
// Build arr
let fullStr = '';
for (let x=0; x<width; x++) {
    for (let y=0; y<height; y++) {
        let thisState = stateMap[splitInput[y][x]];
        fullStr += thisState;
        let newSquare = new Square(thisState);
        newSquare.n = `${x},${y-1}`;
        newSquare.s = `${x},${y+1}`;
        newSquare.e = `${x+1},${y}`;
        newSquare.w = `${x-1},${y}`;
        newSquare.nw = `${x-1},${y-1}`;
        newSquare.ne = `${x+1},${y-1}`;
        newSquare.sw = `${x-1},${y+1}`;
        newSquare.se = `${x+1},${y+1}`;
        squares[`${x},${y}`] = newSquare;
    }
}
pastStates.push(fullStr);

const computeNext = function(lastState) {
    let metaSum = {
        'O': 0,
        'W': 0,
        'L': 0
    };
    let newState = {};
    let builtStr = '';
    //for (let square of Object.keys(lastState)) {
    for (let x=0; x< width; x++) {
        for (let y=0; y< height; y++) {
            let oldSquare = lastState[`${x},${y}`];
            const thisState = oldSquare.state;
            let thisSquare = new Square(thisState);
            const sums = {
                'O': 0,
                'W': 0,
                'L': 0
            }
            for (let key of Object.keys(oldSquare)) {
                if (key != 'state') {
                    thisSquare[key] = oldSquare[key];
                    const neighbor = lastState[thisSquare[key]];
                    if (neighbor) {
                        sums[neighbor.state]++;
                    }
                }
            }
            if (thisState == 'O' && sums.W >= 3) {
                thisSquare.state = 'W';
            } else if (thisState == 'W' && sums.L >= 3) {
                thisSquare.state = 'L';
            } else if (thisState == 'L' && (sums.W == 0 || sums.L == 0)) {
                thisSquare.state = 'O';
            }
            builtStr += thisSquare.state;
            metaSum[thisSquare.state]++;
            newState[`${x},${y}`] = thisSquare;
        }
    }
    return {
        sum: metaSum,
        state: newState,
        builtStr: builtStr
    };
}

let finalSum = {
    state: squares
};
let sumAtIter = {};
let finalI;
let initialI;
for (let i=0; i< 1000000000; i++) {
    finalSum = computeNext(finalSum.state);
    sumAtIter[i] = finalSum.sum;
    if (pastStates.indexOf(finalSum.builtStr) > -1) {
        finalI = i;
        // the 0th index is before we start
        initialI = pastStates.indexOf(finalSum.builtStr)-1;
        break;
    }
    pastStates.push(finalSum.builtStr);
}
const diff = finalI - initialI;
// its really out of 1 billion minus 1 since we are 0 indexing the minutes
const offset = (1000000000-1-initialI)%(diff)+initialI;

let finalIter = sumAtIter[offset];
console.log(finalIter.W*finalIter.L);