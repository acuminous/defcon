module.exports = quotes()

function quotes() {

    return {
        startup: startup,
        shutdown: shutdown
    };

    function startup() {
        return quote([
            'Greetings, Professor Falken.',
            'How about a nice game of chess?',
            'Shall we play a game?',
            'Which side do you want?'
        ]);
    }

    function shutdown() {
        return quote([
            'A strange game. The only winning move is not to play.'
        ])
    }

    function quote(quotes) {
        return quotes[Math.floor((Math.random() * quotes.length))];
    }
}