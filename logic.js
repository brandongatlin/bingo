const game = {
    gameRunning: true,
    languages: ['English', 'Español'],
    chosenLanguage: null,
    languageCode: null,
    categories: ['Food', 'Supplies'],
    chosenCategory: null,
    data: [],
    unshuffled: [],
    shuffled: [],
    orderToCall: [],
    called: null,
    currentIdx: 0,
    selected: [],



    start: function() {
        game.unshuffled = game.data;
        game.shuffle();
        game.buildCard();
        const startBtn = $('<button>').addClass('btn btn-primary').attr('type', 'button').attr('id', 'start-game').text('Start');
        $('#board').append(startBtn);
    },

    shuffle: function() {

        const origLength = game.unshuffled.length;

        for (let i = 0; i < origLength; i++) {
            let randIdx = Math.floor(Math.random() * game.unshuffled.length);
            game.shuffled.push(game.unshuffled[randIdx]);
            game.unshuffled.splice(randIdx, 1);
        }

        const temp = game.shuffled.slice();

        for (let i = 0; i < origLength; i++) {
            let randIdx = Math.floor(Math.random() * temp.length);
            game.orderToCall.push(temp[randIdx]);
            temp.splice(randIdx, 1);
        }
    },

    getNext: function() {
        return game.orderToCall[game.currentIdx][game.languageCode];
    },

    forvoCall: function() {
        game.called = game.getNext();
        console.log('called', game.called);
        const lang = game.languageCode;
        const key = 'a1947295bd2a7535393c3c3df3d666b0'
        const url = 'https://apifree.forvo.com/key/' + key + '/format/json/callback/pronounce/action/word-pronunciations/word/' + encodeURI(game.called) + '/language/' + lang + "/order/rate-desc";

        $.ajax({
            url: url,
            type: 'GET',
            headers: { 'Access-Control-Allow-Origin': '*' },
            jsonpCallback: "pronounce",
            dataType: "jsonp",
            type: "jsonp",
            success: function(data) {

                const country = data.items[0].country;
                const mp3 = data.items[0].pathmp3;
                const ogg = data.items[0].pathogg;
                const username = data.items[0].username;
                const text = `User <span id='user-name'>${username}</span> is from: ${country}`

                $("#message").html(text);

                $("#audio").html(`
                    <audio autoplay>
                        <source src="${ogg}" type="audio/ogg">
                        <source src="${mp3}" type="audio/mpeg">
                        Your browser does not support the audio element.
                    </audio> `)
            },
            error: function() {
                console.log("error");
            }
        }); //end ajax call

    }, //end forvo fx

    buildCard: function() {
        $('#card').empty();
        $('#board').empty();

        game.languageCode = game.chosenLanguage.substring(0, 2).toLowerCase(); // this works for most languages
        // if(game.chosenLanguage === 'English'){
        //     languageCode = 'en';
        // } else if(game.chosenLanguage === 'Español'){
        //     languageCode = 'es';
        // }

        game.shuffled.forEach(function(item, idx) {
            let square = $('<img>').addClass('square tile').attr('src', item.url).attr('data-value', item[game.languageCode]).attr('data-id', idx + 1);
            $('#card').append(square);
        });
    },

    checkAnswer: function(choice, answer) {
        console.log(choice, answer)
        if (choice === answer) {
            return true;
        }
        return false;
    },

    gameWon: function() {
        const winners = [
            ['1', '2', '3', '4', '5'],
            ['6', '7', '8', '9', '10'],
            ['11', '12', '13', '14', '15'],
            ['16', '17', '18', '19', '20'],
            ['21', '22', '23', '24', '25'],
            ['1', '6', '11', '16', '21'],
            ['2', '7', '12', '17', '22'],
            ['3', '8', '13', '18', '23'],
            ['4', '9', '14', '19', '24'],
            ['5', '10', '15', '20', '25'],
            ['1', '7', '13', '19', '25'],
            ['5', '9', '13', '17', '21']
        ];

        const possibleWinners = winners.length;

        // Compare winners array to selected array for matches
        for (let i = 0; i < possibleWinners; i++) {
            var cellExists = 0;

            for (let j = 0; j < 5; j++) {
                if ($.inArray(winners[i][j], game.selected) > -1) {
                    cellExists++;
                }
            }

            // If all 5 winner cells exist in selected array alert success message
            if (cellExists === 5) {
                return true;
            }
        }
    },

    winner: function() {
        alert('winner');
        const doOver = game.askToPlayAgain();
        if (doOver) {
            game.reset();
        } else {
            alert('you suck');
        }

    },

    loser: function() {
        alert('loser');
        const doOver = game.askToPlayAgain();
        if (doOver) {
            game.reset();
        } else {
            alert('you suck');
        }
    },

    askToPlayAgain: function() {
        return confirm('Want to play again?');
    },

    reset: function() {
        $('#message').text(`Choose your options`);
        $('#card').empty();
        $('#start-game').remove();
        $('#input-form').show();
        $('#language-select').empty();
        $('#category-select').empty();
        game.welcome();
    }


}