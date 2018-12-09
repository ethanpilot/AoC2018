class Marble {
  constructor(val, cw, ccw) {
    this.val = val;
    this.cw = cw;
    this.ccw = ccw;
  }
}

module.exports = {
	placeMarble: function(newMarble, curMarble) {
		const oneCw = curMarble.cw;
		const twoCw = oneCw.cw;
		oneCw.cw = newMarble;
		newMarble.ccw = oneCw;
		twoCw.ccw = newMarble;
		newMarble.cw = twoCw;
	},
	twentyThree: function(curMarble) {
		let thisMarble = curMarble;
		for (let i = 0; i < 7; i++) {
			thisMarble = thisMarble.ccw;
		}
		const ccw = thisMarble.ccw;
		const cw = thisMarble.cw;
		ccw.cw = cw;
		cw.ccw = ccw;
		return thisMarble;
	},
	buildMarbles: function(lastMarble, numPlayers) {
		let nextMarble = 1;
		this.curMarble = new Marble(0, undefined, undefined);
		let players = Array(numPlayers).fill(0);
		this.curMarble.cw = this.curMarble;
		this.curMarble.ccw = this.curMarble;

		while(nextMarble <= lastMarble) {
			if (nextMarble % 23 == 0) {
				const thisPlayer = (nextMarble-1)%numPlayers;
				const removedMarble = this.twentyThree(this.curMarble);
				players[thisPlayer]+=nextMarble;
				players[thisPlayer]+=removedMarble.val;
				this.curMarble = removedMarble.cw;
			} else {
				const newMarble = new Marble(nextMarble);
				this.placeMarble(newMarble, this.curMarble);
				this.curMarble = newMarble;
			}
			nextMarble++;
		}
		return players;
	},
	getHighScore: function(lastMarble, numPlayers) {
		return Math.max(...this.buildMarbles(lastMarble, numPlayers));
	},
	printMarbles: function() {
		let seenMarbles = [];
		let thisMarble = this.curMarble;
		while (thisMarble.val !== 0) {
			thisMarble = thisMarble.ccw;
		}
		while(true) {
			if (seenMarbles.indexOf(thisMarble.val) === -1) {
				seenMarbles.push(thisMarble.val);
				thisMarble = thisMarble.cw;
			} else {
				break;
			}
		}
		console.log(seenMarbles.join(' '));
	}
}
