let input = require('./day3input');
let coordinates = {};
input.forEach(claim => {
    //#1 @ 55,885: 22x10
    const atSplit = claim.split(" @ ");
    const baseString = atSplit[1];
    const commaSplit = baseString.split(',');
    const xOffset = parseInt(commaSplit[0]);
    const colonSplit = commaSplit[1].split(':');
    const yOffset = parseInt(colonSplit[0]);
    const timesSplit = colonSplit[1].substr(1).split('x');
    const width = parseInt(timesSplit[0]);
    const height = parseInt(timesSplit[1]);
    
    for (let x=1; x<=width; x++) {
        for (let y=1; y<=height; y++) {
            const xPos = xOffset+x;
            const yPos = yOffset+y;
            const builtCoord = xPos+","+yPos;
            if (!coordinates[builtCoord]) {
                coordinates[builtCoord] = 1;
            } else {
                coordinates[builtCoord]++;
            }
        }
    }
})
let count = 0;
for (let key of Object.keys(coordinates)) {
    if (coordinates[key]>1) {
        count++;
    }
}

console.log("count: " + count)

input.forEach(claim => {
    //#1 @ 55,885: 22x10
    const atSplit = claim.split(" @ ");
    const thisId = atSplit[0];
    const baseString = atSplit[1];
    const commaSplit = baseString.split(',');
    const xOffset = parseInt(commaSplit[0]);
    const colonSplit = commaSplit[1].split(':');
    const yOffset = parseInt(colonSplit[0]);
    const timesSplit = colonSplit[1].substr(1).split('x');
    const width = parseInt(timesSplit[0]);
    const height = parseInt(timesSplit[1]);
    
    let overlap = false;

    for (let x=1; x<=width; x++) {
        for (let y=1; y<=height; y++) {
            const xPos = xOffset+x;
            const yPos = yOffset+y;
            const builtCoord = xPos+","+yPos;
            if (coordinates[builtCoord] > 1) {
                overlap = true;
            }
        }
    }

    if (!overlap) {
        console.log(thisId);
    }
})