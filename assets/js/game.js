const data = {
    Food: [
        {
            en: "apple juice",
            es: "jugo de manzana",
            url: "./assets/data/pics/apple-juice.png"
        },

        {
            en: "apple",
            es: "manzana",
            url: "./assets/data/pics/apple.png"
        },

        {
            en: "banana",
            es: "plátano",
            url: "./assets/data/pics/banana.png"
        },

        {
            en: "bread",
            es: "pan",
            url: "./assets/data/pics/bread.png"
        },

        {
            en: "carrots",
            es: "zanahoria",
            url: "./assets/data/pics/carrots.png"
        },

        {
            en: "cheese",
            es: "queso",
            url: "./assets/data/pics/cheese.jpg"
        },

        {
            en: "chicken",
            es: "pollo",
            url: "./assets/data/pics/chicken.png"
        },

        {
            en: "corn",
            es: "maíz",
            url: "./assets/data/pics/corn.png"
        },

        {
            en: "eggs",
            es: "huevos",
            url: "./assets/data/pics/eggs.png"
        },

        {
            en: "fish",
            es: "pescado",
            url: "./assets/data/pics/fish.png"
        },

        {
            en: "french fries",
            es: "papas fritas",
            url: "./assets/data/pics/fries.gif"
        },

        {
            en: "grapes",
            es: "uvas",
            url: "./assets/data/pics/grapes.png"
        },

        {
            en: "ice cream",
            es: "helado",
            url: "./assets/data/pics/icecream.png"
        },

        {
            en: "lettuce",
            es: "lechuga",
            url: "./assets/data/pics/lettuce.png"
        },

        {
            en: "lobster",
            es: "langosta",
            url: "./assets/data/pics/lobster.png"
        },

        {
            en: "milk",
            es: "leche",
            url: "./assets/data/pics/milk.png"
        },

        {
            en: "orange juice",
            es: "jugo de naranja",
            url: "./assets/data/pics/orange-juice.png"
        },

        {
            en: "orange",
            es: "naranja",
            url: "./assets/data/pics/orange.png"
        },

        {
            en: "potato",
            es: "papas",
            url: "./assets/data/pics/potato.png"
        },

        {
            en: "rice",
            es: "arroz",
            url: "./assets/data/pics/rice.png"
        },

        {
            en: "salad",
            es: "ensalada",
            url: "./assets/data/pics/salad.png"
        },

        {
            en: "soup",
            es: "sopa",
            url: "./assets/data/pics/soup.png"
        },

        {
            en: "tomato",
            es: "tomate",
            url: "./assets/data/pics/tomato.png"
        },

        {
            en: "turkey",
            es: "pavo",
            url: "./assets/data/pics/turkey.png"
        },

        {
            en: "water",
            es: "agua",
            url: "./assets/data/pics/water.png"
        }],

        School_Supplies : [

        ]
}

const game = {

    languages: ['English', 'Español'],
    chosenLanguage: null,
    languageCode: null,
    categories: ['Food', 'School Supplies'],
    chosenCategory: null,
    unshuffled : [],
    shuffled : [],
    orderToCall : [],
    called : null,
    currentIdx : 0,
    selected : [],

    welcome : function(){

        game.languages.forEach(function (language) {
            let langOption = $('<option>').addClass('dropdown-item').text(language).val(language);
            $('#language-select').append(langOption)
        });

        game.categories.forEach(function (category) {
            let catOption = $('<option>').addClass('dropdown-item').text(category.replace("_", " ")).val(category);
            $('#category-select').append(catOption)
        });

        const choiceMsg = "Choose Your Options";
        $('#message').text(choiceMsg);
    },

    start : function(){
        game.unshuffled = data[game.chosenCategory];
        game.shuffle();
        game.buildCard();
        const startBtn = $('<button>').addClass('btn btn-primary').attr('type', 'button').attr('id', 'start-game').text('Start');
        $('#board').append(startBtn);

    },

    shuffle : function(){

        const origLength = game.unshuffled.length;

        for (let i = 0; i < origLength; i++){
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

    getNext : function(){
        return game.orderToCall[game.currentIdx][game.languageCode];
    },

    forvoCall : function(){
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
            success: function (data) {

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
                    </audio> `
                )
            },
            error: function () {
                console.log("error");
            }
        }); //end ajax call
    }, //end forvo fx

    buildCard : function(){
        $('#card').empty();
        $('#board').empty();

        game.languageCode = game.chosenLanguage.substring(0, 2).toLowerCase(); // this works for most languages
            // if(game.chosenLanguage === 'English'){
            //     languageCode = 'en';
            // } else if(game.chosenLanguage === 'Español'){
            //     languageCode = 'es';
            // }

            game.shuffled.forEach(function(item, idx){
            let square = $('<img>').addClass('square').attr('src', item.url).attr('data-value', item[game.languageCode]).attr('data-id', idx + 1);
            $('#card').append(square);
        });
    },

    checkAnswer : function(choice, answer){
        if(choice === answer){
            return true;
        }
        return false;
    },

    gameWon : function(){
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

    winner : function(){
        alert('winner');
        const doOver = game.askToPlayAgain();
        if(doOver){
            game.reset();
        } else {
            alert('you suck');
        }

    },

    loser : function(){
        alert('loser');
        const doOver = game.askToPlayAgain();
        if(doOver){
            game.reset();
        } else {
            alert('you suck');
        }
    },

    askToPlayAgain : function(){
        return confirm('Want to play again?');
    },

    reset : function(){
        $('#message').text(`Choose your options`);
        $('#card').empty();
        $('#start-game').remove();
        $('#input-form').show();
        $('#language-select').empty();
        $('#category-select').empty();
        game.welcome();
    }
    

}

$('#submit-input').on('click', function(event){
    event.preventDefault();
    game.chosenLanguage = $('#language-select').val();
    game.chosenCategory = $('#category-select').val();
    $('#input-form').hide();
    game.start();
});

$(document).on('click', '#start-game', function(){
    game.forvoCall();
    $('#input-form').hide();
});

$(document).on('click', '.square', function(){
    // const classList = $(this).attr('class').split(' ');

    // if(!classList.includes('disabledImg')){
        const guessedWord = $(this).attr('data-value');
        const calledWord = game.called;

        game.selected.push($(this).attr('data-id'));

        // $(this).addClass('disabledImg');

        const result = game.checkAnswer(guessedWord, calledWord);
        if(result){
            $(this).addClass('right');
        } else {
            $(this).addClass('wrong');
        }

        const gameResult = game.gameWon();
        if(gameResult){
            game.winner();
        } else {
            game.currentIdx++;
            game.forvoCall();
        }

    // }
    
});

game.welcome();


