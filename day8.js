let input = require('./day8input');
module.exports = {
	nextChildId: 0,
	children: {},
	metaDataSum: 0,
	getSplitInput: function() {
		if (!this._splitInput) {
			this._splitInput = input.split(" ").map(ind => parseInt(ind));
		}
		return this._splitInput;
	},
	buildTree: function() {
		this.buildNode(null, 0);
	},
	buildNode: function(parentId, curIndex) {
		const splitInput = this.getSplitInput();
		const childNodeCount = splitInput[curIndex];
		const metaDataCount = splitInput[curIndex+1];
		const thisChildId = this.nextChildId;
		if (parentId != null) {
			this.children[parentId].children.push(thisChildId);
		}
		this.nextChildId++;
		this.children[thisChildId] = {
			parent: parentId,
			childNodeCount: childNodeCount,
			metaDataCount: metaDataCount,
			metaData: [],
			children: []

		};
		const thisChild = this.children[thisChildId];
		let updatedIndex = curIndex+2;
		for (let j = 0; j < childNodeCount; j++) {
			updatedIndex = this.buildNode(thisChildId, updatedIndex);
		}
		for (let j = updatedIndex; j<updatedIndex+metaDataCount; j++) {
			thisChild.metaData.push(splitInput[j]);
			this.metaDataSum+=splitInput[j];
		}
		return updatedIndex+metaDataCount;
	},
	partOne: function() {
		if (Object.keys(this.children).length === 0) {
			this.buildTree();
		}
		return this.metaDataSum;
	},
	getNodeSum: function(nodeId) {
		const thisNode = this.children[nodeId];
		if (thisNode.children.length === 0) {
			return thisNode.metaData.reduce((a, b) => a+b, 0);
		} else {
			let sum = 0;
			for (let x=0; x<thisNode.metaData.length; x++) {
				const md = thisNode.metaData[x]-1;
				if (md < thisNode.children.length) {
					sum+=this.getNodeSum(thisNode.children[md]);
				}
			}
			return sum;
		}
	},
	partTwo: function() {
		if (Object.keys(this.children).length === 0) {
			this.buildTree();
		}
		return this.getNodeSum(0);
	}

}
