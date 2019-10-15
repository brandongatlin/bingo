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
    categories: ['Food', 'School Supplies'],
    chosenCategory: null,
    unshuffled : [],
    shuffled : [],
    currentIdx : 0,

    welcome : function(){

        // make language select
        const languageSelect = $('<div>').addClass('dropdown test').attr('id', 'language');
        const langBtn = $('<button>').addClass('btn btn-primary dropdown-toggle').attr('type', 'button').attr('id', 'language-dropdown-btn').attr('data-toggle', 'dropdown').text('Choose Language');
        $(languageSelect).append(langBtn);
        const langMenu = $('<div>').addClass('dropdown-menu');
        game.languages.forEach(function (language) {
            let langOption = $('<a>').addClass('dropdown-item').text(language).val(language);
            $(langMenu).append(langOption)
        });
        $(languageSelect).append(langMenu);
        $('#card').append(languageSelect);

        // make category select
        const categorySelect = $('<div>').addClass('dropdown').attr('id', 'category');
        const catBtn = $('<button>').addClass('btn btn-primary dropdown-toggle').attr('type', 'button').attr('id', 'category-dropdown-btn').attr('data-toggle', 'dropdown').text('Choose Category');
        $(categorySelect).append(catBtn);
        const catMenu = $('<div>').addClass('dropdown-menu');
        game.categories.forEach(function (category) {
            let catOption = $('<a>').addClass('dropdown-item').text(category.replace("_", " ")).val(category);
            $(catMenu).append(catOption)
        });
        $(categorySelect).append(catMenu);
        $('#card').append(categorySelect);

        //
        const submitBtn = $('<button>').addClass('btn btn-primary').attr('type', 'button').attr('id', 'submit-options').text('Submit');
        $('#card').append(submitBtn);


        const welcomeMsg = $('<h1>').text('Welcome for Forvo Listening Bingo!');
        $('#board').append(welcomeMsg);
    },

    start : function(){
        game.unshuffled = data[game.chosenCategory];
        game.shuffle();
        game.buildCard();
    },

    shuffle : function(){

        const origLength = game.unshuffled.length;

        for (let i = 0; i < origLength; i++){
            let randIdx = Math.floor(Math.random() * game.unshuffled.length);
            game.shuffled.push(game.unshuffled[randIdx]);
            game.unshuffled.splice(randIdx, 1);
        }
    },

    getNext : function(){
        return game.shuffled[game.currentIdx][game.language];
    },

    forvo : function(){
        const called = game.getNext();
        const lang = game.chosenLanguage;
        const key = 'a1947295bd2a7535393c3c3df3d666b0'
        const url = 'https://apifree.forvo.com/key/' + key + '/format/json/callback/pronounce/action/word-pronunciations/word/' + encodeURI(called) + '/language/' + lang + "/order/rate-desc";
        
        $.ajax({
            url: url,
            type: 'GET',
            headers: { 'Access-Control-Allow-Origin': '*' },
            jsonpCallback: "pronounce",
            dataType: "jsonp",
            type: "jsonp",
            success: function (data) {

                const word = data.items[0].word;
                const country = data.items[0].country;
                const mp3 = data.items[0].pathmp3;
                const ogg = data.items[0].pathogg;
                const username = data.items[0].username;
                const text = `User ${username} is from: ${country}`
                console.log(word, text)

                $("#speaker-text").html(text);

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
        game.shuffled.forEach(function(item){
            let languageCode;
            if(game.chosenLanguage === 'English'){
                languageCode = 'en';
            } else if(game.chosenLanguage === 'Español'){
                languageCode = 'es';
            }

            console.log(languageCode)
            
            let square = $('<img>').addClass('square').attr('src', item.url).attr('data-value', item[languageCode]);
            $('#card').append(square);
        });
    },
    

}

$(document).on('click', '.dropdown-item', function(){
    // set text and value of dropdown so the user can see what they selected
    const value = $(this).text();
    $(this).parent().siblings().text(value);
    $(this).parent().siblings().val(value);
});

$(document).on('click', '#submit-options', function(){
    game.chosenLanguage = $('#language').children().val();
    game.chosenCategory = $('#category').children().val();
    game.start();
});

game.welcome();


// functions needed:
// forvo = takes current word, makes api call, returns the sound file
// buildCard = takes shuffled array and builds the card html, then writes to DOM
// shuffle = shuffle array of pix
// playNext - take forvo res, sorts, picks the best one, then plays it; repeats once after 4 seconds
// getCategory
// getLanguage
// writeText - takes html id and text - writes


