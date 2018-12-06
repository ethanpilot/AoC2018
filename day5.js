const input = require('./day5input');
module.exports = {
    reactPolymer: function(inp) {
        for (let i = inp.length-2; i >= 0; i--) {
            const letOne = inp.charAt(i);
            const letTwo = inp.charAt(i+1);
            let lowerUpper = letOne.toUpperCase() == letTwo && letOne == letTwo.toLowerCase();
            let upperLower = letOne.toLowerCase() == letTwo && letOne == letTwo.toUpperCase();
            if (lowerUpper || upperLower) {
                if (i >= inp.length -2) {
                    inp = inp.substring(0, i)
                } else {
                    inp = inp.substring(0, i) + inp.substring(i+2);
                }
            }
        }
        return inp;
    },
    genAlphabet: function() {
        const aCode = 0xFFEF0041;
        let letters = [];
        for (let i=0; i< 26; i++) {
            letters.push(String.fromCharCode(aCode+i));
        }
        return letters;
    },
    partOne: function() {
        const inputCopy = input;
        const initRes = this.reactPolymer(inputCopy);
        return initRes.length;

    },
    purgeLetter: function(inp, letter) {
        let res = inp
        const lowerCase = letter.toLowerCase();
        const upperCase = letter.toUpperCase();
        res = res.replace(new RegExp(lowerCase, 'g'), '');
        res = res.replace(new RegExp(upperCase, 'g'), '');
        return res;
    },
    partTwo: function() {
        let minLength = input.length;
        let letters = this.genAlphabet();
        for (let i = 0; i < 26; i++) {
            let letter = letters[i]
            let thisInp = input;
            thisInp = this.purgeLetter(thisInp, letter);
            thisInp = this.reactPolymer(thisInp);
            if (thisInp.length < minLength) {
                minLength = thisInp.length;
            }
        }
        return minLength;
    }
}