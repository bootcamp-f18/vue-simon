Vue.component('timer', {

    template: `<div id="status">
                    <span v-html="message"></span>{{ remaining }}
                </div>`,

    data() {
        return {
            message: 'Click the <strong>Start Game</strong> button to begin!',
            remaining: ''
        }
    },

    created() {

        let self = this;

        self.$parent.$on('stateChange', function(event) {

            switch (event) {

                case 'capturing':
                    // do stuff
                    // break;

                case 'playing':
                    // do stuff
                    // break;

                default:
                    console.log("Timer: state changed to [" + event + "]");

            }

        });

    }

});

var app = new Vue({

    el: "#app",

    data: {
        currentButton: '',
        sequence: ['blue', 'red', 'red', 'yellow', 'green', 'yellow'],
        playingId: 0
    },

    methods: {

        tap: function (color) {

            let self = this;

            self.currentButton = color;
            setTimeout(function() {
                self.currentButton = '';
            }, 300);
        },

        playSequence: function () {

            let self = this;
            // self.message = "Play attention...here we go!";
            self.$emit('stateChange', 'playing');

            let intervalId = setInterval(function () {

                if (self.playingId < self.sequence.length) {
                    self.tap(self.sequence[self.playingId]);
                    self.playingId++;
                }
                else {
                    clearInterval(intervalId);
                    self.playingId = 0;
                    // self.message = "Your turn!";
                    self.$emit('stateChange', 'capturing');
                }

            }, 600);

        }

    }

});
