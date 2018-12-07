const input = require('./day7input');
module.exports = {
    steps: {},
    genAlphabet: function() {
        const aCode = 0xFFEF0041;
        let letters = {};
        for (let i=0; i< 26; i++) {
            letters[String.fromCharCode(aCode+i)] = i+1;
        }
        return letters;
    },
    getSteps: function() {
        if (Object.keys(this.steps) > 0) return this.steps;
        input.forEach(step => {
            const splitStep = step.split(" ");
            const parent = splitStep[1];
            const child = splitStep[7];
            if (!this.steps[parent]) {
                this.steps[parent] = {
                    children: [child],
                    parents: []
                };
            } else {
                this.steps[parent].children.push(child);
            }
            if (!this.steps[child]) {
                this.steps[child] = {
                    children: [],
                    parents: [parent]
                };
            } else {
                this.steps[child].parents.push(parent);
            }
        });
        return this.steps;
    },
    partOne: function() {
        const steps = this.getSteps();
        let availableSteps = [];
        let completedSteps = [];
        for (let key of Object.keys(steps)) {
            if (steps[key].parents.length === 0) {
                availableSteps.push(key);
            }
        }
        availableSteps.sort();
        while (availableSteps.length > 0) {
            for (let i=0; i < availableSteps.length; i++) {
                const thisStep = steps[availableSteps[i]];
                let canExecute = true;
                thisStep.parents.forEach(parent => {
                    if (completedSteps.indexOf(parent) === -1) {
                        canExecute = false;
                    }
                })
                if (canExecute) {
                    completedSteps.push(availableSteps[i]);
                    availableSteps.splice(i, 1);
                    thisStep.children.forEach(child => {
                        if (availableSteps.indexOf(child) === -1 && completedSteps.indexOf(child) === -1) {
                            availableSteps.push(child);
                        }
                    })
                    break;
                }
            }
            availableSteps.sort();
        }
        return completedSteps.join('');
    },
    partTwo: function() {
        let timeElapsed = 0;
        const alphaMap = this.genAlphabet();
        const steps = this.getSteps();
        let completedSteps = [];
        let availableSteps = [];
        let workableSteps = [];
        let workers = Array(5).fill(0).map(() => {
            return {
                working: false,
                timeRemaining: 0
            };
        });
        for (let key of Object.keys(steps)) {
            if (steps[key].parents.length === 0) {
                availableSteps.push(key);
            }
        }
        while (completedSteps.length < 26) {
            // Progress worker work
            workers.forEach(worker => {
                if (worker.working) {
                    worker.timeRemaining--;
                    if (worker.timeRemaining === 0) {
                        completedSteps.push(worker.working);
                        // Push newly avialable items
                        steps[worker.working].children.forEach(child => {
                            if (availableSteps.indexOf(child) === -1 && completedSteps.indexOf(child) === -1) {
                                availableSteps.push(child);
                            }
                        })
                        worker.working = false;
                    }
                }
            })
            // Re-generate workable steps
            workableSteps = [];
            for (let i=0; i < availableSteps.length; i++) {
                const thisStep = steps[availableSteps[i]];
                let canExecute = true;
                thisStep.parents.forEach(parent => {
                    if (completedSteps.indexOf(parent) === -1) {
                        canExecute = false;
                    }
                })
                if (canExecute) {
                    workableSteps.push(availableSteps[i])
                }
            }
            workableSteps.sort();
            // Assign new worker work
            workers.forEach(worker => {
                if (!worker.working && workableSteps.length > 0) {
                    const stepToWork = workableSteps[0];
                    worker.working = stepToWork;
                    worker.timeRemaining = alphaMap[stepToWork]+60;
                    workableSteps.splice(0, 1);
                    availableSteps.splice(availableSteps.indexOf(stepToWork), 1);
                }
            })
            timeElapsed++;
        }
        return timeElapsed-1;
    }
}
