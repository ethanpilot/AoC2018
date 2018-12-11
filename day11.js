module.exports = {
    xSize: 300,
    ySize: 300,
    calcPower: function(x, y, serial) {
        const rackId = x+10;
        let powerLevel = rackId*y;
        powerLevel += serial;
        powerLevel = powerLevel*rackId;
        const plString = powerLevel.toString().split('');
        powerLevel = plString[plString.length-3];
        powerLevel = parseInt(powerLevel, 10)-5;
        return powerLevel;
    },
    getCells: function() {
        if (this._cells) {
            return this._cells;
        }
        this._cells = {};
        const serial = 4172;

        for (let x=1; x <= this.xSize; x++) {
            for (let y=1; y <= this.ySize; y++) {
                this._cells[`${x},${y}`] = this.calcPower(x, y, serial);
            }
        }
        return this._cells;
    },
    maxSquare: function(squareSize, cache) {
        const cells = this.getCells();
        const squares = {};

        let maxPower = Number.NEGATIVE_INFINITY;
        let maxCoord;

        for (let x=1; x <= this.xSize-(squareSize-1); x++) {
            for (let y=1; y <= this.ySize-(squareSize-1); y++) {
                let sum = 0;
                if (cache[`${x},${y}`]) {
                    sum+=cache[`${x},${y}`];
                    for (let i=0;i<squareSize-1;i++) {
                        sum+=cells[`${x+i},${y+squareSize-1}`];
                        sum+=cells[`${x+squareSize-1},${y+i}`];
                    }
                    sum+=cells[`${x+squareSize-1},${y+squareSize-1}`];
                } else {
                    for (let i=0; i<squareSize; i++) {
                        for (let j=0; j<squareSize;j++) {
                            sum+=cells[`${x+i},${y+j}`];
                        }
                    }
                }
                squares[`${x},${y}`]=sum;
                if (sum > maxPower) {
                    maxPower = sum;
                    maxCoord = `${x},${y}`;
                }
            }
        }
        return {
            maxCoord: maxCoord,
            maxPower: maxPower,
            cache: squares
        };
    },
    partOne() {
        return this.maxSquare(3, {}).maxCoord;
    },
    partTwo() {
        let overallMax = 0;
        let overallMaxCoord;
        let lastCache = {};
        for (let sqSize=1; sqSize<=300; sqSize++) {
            let thisPower = this.maxSquare(sqSize, lastCache);
            if (thisPower.maxPower > overallMax) {
                overallMax = thisPower.maxPower;
                overallMaxCoord = thisPower.maxCoord+","+sqSize;
            }
            lastCache = thisPower.cache
        }

        return overallMaxCoord;
    }
};
