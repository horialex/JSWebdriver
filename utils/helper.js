module.exports = {
    
    getRandomInt : (max) => {
        /**
         * function that returns a random integer number not greater than the number given
         * @param {int} max
         * @returns {int} random number
         */
        return Math.floor(Math.random() * Math.floor(max))
    },

    getIntFromInterval : (min, max) => {
        /**
         * function that returns a random integer number not smaller then the given min and not greater than the given max
         * @param {int} min, max
         * @returns {int} random number
         */
        let r;
        if (min < max) {
            r = Math.floor(Math.random() * (max - min + 1)) + min
        }
        return r;
    },

    getRandomChar : (max) => {
        var text = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        for (var i = 0; i < max; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
    
        return text;
    },
    
}