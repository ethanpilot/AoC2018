const input = require('./day4input');
module.exports = {
  getSplitInput: function() {
    if (!this._splitInput) {
      this._splitInput = input.map(e => {
        return {
          month: parseInt(e.substring(6, 8)),
          day: parseInt(e.substring(9, 11)),
          hour: parseInt(e.substring(12, 14)),
          minute: parseInt(e.substring(15, 17)),
          actionString: e.substring(19),
          splitActionString: e.substring(19).split(' ')
        }
      });
      this._splitInput.sort(this.compareFunc);
    }
    return this._splitInput;
  },
  compareFunc: function(a, b) {
    if (a.month - b.month != 0) {
      return a.month - b.month;
    }
    if (a.day - b.day != 0) {
      return a.day - b.day;
    }
    if (a.hour - b.hour != 0) {
      return a.hour - b.hour;
    }
    if (a.minute - b.minute != 0) {
      return a.minute - b.minute;
    }
    return 0;
  },
  getGuards: function() {
    if (!this._guards) {
      this._guards = {};
      const splitInput = this.getSplitInput();

      for (let i=0, currentGuard='', sleepTime=0; i<splitInput.length; i++) {
        const thisLine = splitInput[i];
        if (thisLine.splitActionString[0] == 'Guard') {
          currentGuard = splitInput[i].splitActionString[1];
          if (!this._guards[currentGuard]) {
            this._guards[currentGuard] = {
              sleepMinutes: new Array(60).fill(0),
              totalSleep: 0
            };
          }
        } else if (thisLine.splitActionString[0] == 'falls') {
          sleepTime = thisLine.minute;
        } else if (thisLine.splitActionString[0] == 'wakes') {
          for (let j=sleepTime; j<thisLine.minute; j++) {
            this._guards[currentGuard].sleepMinutes[j]++;
            this._guards[currentGuard].totalSleep++;
          }
        }
      }
    }
    return this._guards;
  },
  partOne: function() {
    let guards = this.getGuards();
    let maxSleep = 0;
    let maxGuard;
    let maxMinute;
    let maxSleepCount = 0;
    for (let guard of Object.keys(guards)) {
      if (guards[guard].totalSleep > maxSleep) {
        maxGuard = guard;
        maxSleep = guards[guard].totalSleep;
        for (let j=0; j<60; j++) {
          let thisMinute = guards[guard].sleepMinutes[j];
          if (thisMinute > maxSleepCount) {
            maxSleepCount = thisMinute;
            maxMinute = j;
          }
        }
      }
    }
    return maxGuard * maxMinute;
  },

  partTwo: function() {
    let guards = this.getGuards();
    let maxGuard;
    let maxMinute;
    let maxSleepCount = 0;
    for (let guard of Object.keys(guards)) {
      for (let j=0; j<60; j++) {
        let thisMinute = guards[guard].sleepMinutes[j];
        if (thisMinute > maxSleepCount) {
          maxGuard = guard;
          maxSleepCount = thisMinute;
          maxMinute = j;
        }
      }
    }
    return maxGuard * maxMinute;
  }
}