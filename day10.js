let input = require('./day10input');
class Point {
	constructor(x, y, xVector, yVector) {
		this.x = x;
		this.y = y;
		this.xVector = xVector;
		this.yVector = yVector;
	}

	update() {
		this.x+=this.xVector;
		this.y+=this.yVector;
	}

	toString() {
		return this.x + "," + this.y;
	}
}

let points = input.map(inp => {
	const x = parseInt(inp.substring(10, 16), 10);
	const y = parseInt(inp.substring(18, 24), 10);
	const xVector = parseInt(inp.substring(36, 38), 10);
	const yVector = parseInt(inp.substring(40, 42), 10);
	return new Point(x, y, xVector, yVector);
});

let secs=0;
while (true) {
	secs++;
	let minY = Number.POSITIVE_INFINITY;
	let maxY = Number.NEGATIVE_INFINITY;
	for (let i=0; i< points.length; i++) {
		const thisPoint = points[i];
		thisPoint.update();
		if (thisPoint.y < minY) {
			minY = thisPoint.y;
		}
		if (thisPoint.y > maxY) {
			maxY = thisPoint.y;
		}
	}
	if (Math.abs(maxY-minY) < 10) {
		break;
	}
}

points.forEach(x => console.log(x.toString()))
console.log(secs);