const data = {
    food: [
        {
            en: "apple juice",
            es: "jugo de manzana",
            url: "pics/apple-juice.png"
        },

        {
            en: "apple",
            es: "manzana",
            url: "pics/apple.png"
        },

        {
            en: "banana",
            es: "plátano",
            url: "pics/banana.png"
        },

        {
            en: "bread",
            es: "pan",
            url: "pics/bread.png"
        },

        {
            en: "carrots",
            es: "zanahoria",
            url: "pics/carrots.png"
        },

        {
            en: "cheese",
            es: "queso",
            url: "pics/cheese.jpg"
        },

        {
            en: "chicken",
            es: "pollo",
            url: "pics/chicken.png"
        },

        {
            en: "corn",
            es: "maíz",
            url: "pics/corn.png"
        },

        {
            en: "eggs",
            es: "huevos",
            url: "pics/eggs.png"
        },

        {
            en: "fish",
            es: "pescado",
            url: "pics/fish.png"
        },

        {
            en: "french fries",
            es: "papas fritas",
            url: "pics/fries.gif"
        },

        {
            en: "grapes",
            es: "uvas",
            url: "pics/grapes.png"
        },

        {
            en: "ice cream",
            es: "helado",
            url: "pics/icecream.png"
        },

        {
            en: "lettuce",
            es: "lechuga",
            url: "pics/lettuce.png"
        },

        {
            en: "lobster",
            es: "langosta",
            url: "pics/lobster.png"
        },

        {
            en: "milk",
            es: "leche",
            url: "pics/milk.png"
        },

        {
            en: "orange juice",
            es: "jugo de naranja",
            url: "pics/orange-juice.png"
        },

        {
            en: "orange",
            es: "naranja",
            url: "pics/orange.png"
        },

        {
            en: "potato",
            es: "papas",
            url: "pics/potato.png"
        },

        {
            en: "rice",
            es: "arroz",
            url: "pics/rice.png"
        },

        {
            en: "salad",
            es: "ensalada",
            url: "pics/salad.png"
        },

        {
            en: "soup",
            es: "sopa",
            url: "pics/soup.png"
        },

        {
            en: "tomato",
            es: "tomate",
            url: "pics/tomato.png"
        },

        {
            en: "turkey",
            es: "pavo",
            url: "pics/turkey.png"
        },

        {
            en: "water",
            es: "agua",
            url: "pics/water.png"
        }],
}

const game = {

    language: 'es',
    category: null,
    unshuffled : [],
    shuffled : [],
    currentIdx : 0,

    start : function(){
        game.unshuffled = data.food;
        game.shuffle();
    },

    shuffle : function(){

        const origLength = game.unshuffled.length;

        for (let i = 0; i < origLength; i++){
            let randIdx = Math.floor(Math.random() * game.unshuffled.length);
            game.shuffled.push(game.unshuffled[randIdx]);
            game.unshuffled.splice(randIdx, 1);
        }
        console.log(game.shuffled);
    },

    getNext : function(){
        return game.shuffled[game.currentIdx][game.language];
    },

    forvo : function(){
        const called = game.getNext();
        const lang = game.language;
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
                console.log(data)

                const name = data.items[0].word;
                const country = data.items[0].country;
                const mp3 = data.items[0].pathmp3;
                const ogg = data.items[0].pathogg;
                const username = data.items[0].username;
                const text = `User ${username} is from: ${country}`
                console.log(text)

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
    } //end aJax fx

    

}

game.start();
game.forvo()

// functions needed:
// forvo = takes current word, makes api call, returns the sound file
// buildCard = takes shuffled array and builds the card html, then writes to DOM
// shuffle = shuffle array of pix
// playNext - take forvo res, sorts, picks the best one, then plays it; repeats once after 4 seconds
// getCategory
// getLanguage
// writeText - takes html id and text - writes


