const input = require('./day6Input')
module.exports = {
    coords: {},
    taxiDistance: function(x1, y1, x2, y2) {
        // TODO store results
        return Math.abs(x1-x2) + Math.abs(y1-y2);
    },
    _initialized: false,
    maxX: 0,
    maxY: 0,
    init: function() {
        if (this._initialized) return;
        input.forEach((coord, index) => {
            const x = coord[0];
            const y = coord[1]
            this.coords[index] = {
                x: x,
                y: y,
                infinite: false,
                size: 0
            };
            if (x > this.maxX) {
                this.maxX = x;
            }
            if (y > this.maxY) {
                this.maxY = y;
            }
        })
        this._initialized = true;
    },
    partOne: function() {
        this.init();
        for (let x = 0; x <= this.maxX; x++) {
            for (let y = 0; y <= this.maxY; y++) {
                let closestCoord;
                let minDistance = Infinity;
                let tie = false;
                for (let i=0; i<Object.keys(this.coords).length; i++) {
                    const thisCoord = coords[i]
                    let dist = this.taxiDistance(x, y, thisCoord.x, thisCoord.y);
                    if (dist < minDistance) {
                        minDistance = dist;
                        closestCoord = i;
                        tie = false
                    } else if (dist === minDistance) {
                        tie = true
                    }
                }
                if (!tie) {
                    this.coords[closestCoord].size++;
                    if (x === 0 || y === 0 || x === maxX || y === maxY) {
                        this.coords[closestCoord].infinite = true;
                    }
                }
            }
        }
        let maxSize = 0;
        Object.keys(this.coords).forEach(key => {
            const thisCoord = this.coords[key];
            if (!thisCoord.infinite && thisCoord.size > maxSize) {
                maxSize = thisCoord.size;
            }
        });
        return maxSize;
    },
    partTwo: function() {
        this.init();
        let areaSize = 0;
        for (let x = 0; x <= this.maxX; x++) {
            for (let y = 0; y <= this.maxY; y++) {
                let totalDistance = 0;
                for (let i=0; i<Object.keys(this.coords).length; i++) {
                    const thisCoord = this.coords[i]
                    let dist = this.taxiDistance(x, y, thisCoord.x, thisCoord.y);
                    totalDistance+=dist;
                    if (totalDistance >= 10000) {
                        break;
                    }
                }
                if (totalDistance < 10000) {
                    areaSize++;
                }
            }
        }
        return areaSize;
    }
}
