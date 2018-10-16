




var app = new Vue({

    el: "#app",

    data: {
        message: 'Click the "Start Game" button to begin.',
        currentButton: '',
        sequence: ['blue', 'red', 'red', 'yellow', 'green', 'yellow'],
        playingId: 0
    },

    methods: {

        tap: function (color) {

            var self = this;

            self.currentButton = color;
            setTimeout(function() {
                self.currentButton = '';
            }, 300);
        },

        playSequence: function () {

            var self = this;
            self.message = "Play attention...here we go!";

            var intervalId = setInterval(function () {

                if (self.playingId < self.sequence.length) {
                    self.tap(self.sequence[self.playingId]);
                    self.playingId++;
                }
                else {
                    clearInterval(intervalId);
                    self.playingId = 0;
                    self.message = "Your turn!";
                }

            }, 600);

        }

    }

});
