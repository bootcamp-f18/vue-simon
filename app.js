Vue.component('timer', {

    template: `<div id="status">
                    <span v-html="message"></span>{{ remaining }}
                </div>`,

    data() {
        return {
            message: 'Click the <strong>Start Game</strong> button to begin!',
            remaining: '',
            intervalId: null,
            maxSecondsToWait: 10
        }
    },

    created() {

        let self = this;

        self.$on('stateChange', function(event) {

            switch (event) {

                case 'capturing':
                    self.startTimer();
                    break;

                case 'playing':
                    self.stopTimer('Watch closely!');
                    break;

                default:
                    console.log("Timer: state changed to [" + event + "]");

            }

        });

    },

    methods: {

        startTimer: function () {
            if (this.intervalId === null) {
                this.remaining = this.maxSecondsToWait;
                this.message = '';
                this.intervalId = setInterval(this.tick, 1000);
            }
        },

        stopTimer: function (text) {
            clearInterval(this.intervalId);
            this.message = text;
            this.remaining = '';
            this.intervalId = null;
        },

        tick: function () {
            console.log("Tick!");
            this.remaining--;
            if (this.remaining === 0) {
                this.stopTimer('Time expired! Click <strong>Start Game</strong> to begin a new game!');
                // this.$emit('expired');
            }
        }

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
            self.$emit('stateChange', 'playing');

            let intervalId = setInterval(function () {

                if (self.playingId < self.sequence.length) {
                    self.tap(self.sequence[self.playingId]);
                    self.playingId++;
                }
                else {
                    clearInterval(intervalId);
                    self.playingId = 0;
                    self.$emit('stateChange', 'capturing');
                }

            }, 600);

        }

    }

});
