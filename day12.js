const transitions  = {
  // '#....': '.',
  '.##.#': '#',
  // '#..##': '.',
  // '....#': '.',
  '###.#': '#',
  '...#.': '#',
  '#...#': '#',
  // '#.###': '.',
  '.#...': '#',
  // '...##': '.',
  // '..###': '.',
  // '####.': '.',
  // '##.##': '.',
  // '..##.': '.',
  '.#.##': '#',
  '#..#.': '#',
  //'.....': '.',
  // '#.#..': '.',
  '##.#.': '#',
  '.####': '#',
  // '#####': '.',
  '#.##.': '#',
  '.#..#': '#',
  // '##...': '.',
  '..#.#': '#',
  '##..#': '#',
  // '.###.': '.',
  '.#.#.': '#',
  '#.#.#': '#',
  // '###..': '.',
  // '.##..': '.',
  // '..#..': '.'
};
const input = ".#..##..#.....######.....#....####.##.#.#...#...##.#...###..####.##.##.####..######......#..##.##.##";
const splitInput = input.split('');
const initLen = splitInput.length;
let state = {};
for (let i=0; i< splitInput.length; i++) {
  if (splitInput[i] == '#') {
    state[i] = true;
  }
}

const getPrettyString = function(state, min, max) {
  let prettyString = '';
  for (let i=min; i<max; i++) {
    if (state[i]) {
      prettyString += '#';
    } else {
      prettyString += '.';
    }
  }
  return prettyString;
}

let prettyStrings = [getPrettyString(state, -2, initLen+2)];

const getNextGen = function(state, transitions, min, max) {
  const newState = {};
  let firstFound = false;
  let lastFound;
  for (let i=min; i<max; i++) {
    let builtString = '';
    for (let j=-2; j<3; j++) {
      if (state[i+j]) {
        builtString+='#';
      } else {   
        builtString+='.';
      }
    }
    if (transitions[builtString]) {
      newState[i] = transitions[builtString] === '#';
      if (firstFound === false) {
        firstFound = i;
      }
      lastFound = i;
    }
  }
  return {
    state: newState,
    min: firstFound-2,
    max: lastFound+2
  };
}

const goalGenerations = 50000000000;

let min = -2;
let max = initLen+2;

let offset = goalGenerations;

for (let i=0; i<goalGenerations; i++) {
  let rez = getNextGen(state, transitions, min, max);

  state = rez.state;
  min = rez.min;
  max = rez.max;

  const newStr = getPrettyString(state, min, max);
  if (prettyStrings.indexOf(newStr) !== -1) {
    offset = i+1;
    break;
  } else {
    prettyStrings.push(newStr);
  }
}

const getScore = function(aState) {
  const calcOffset = goalGenerations - offset;
  let plants = 0;
  for (let key of Object.keys(aState)) {
    if (aState[key]) {
      plants+=parseInt(key)+calcOffset;
    }
  }
  return plants
}
console.log(getScore(state));