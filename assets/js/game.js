const data = {
    food: [
        {
            name: "apple juice",
            nombre: "jugo de manzana",
            url: "pics/apple-juice.png"
        },

        {
            name: "apple",
            nombre: "manzana",
            url: "pics/apple.png"
        },

        {
            name: "banana",
            nombre: "plátano",
            url: "pics/banana.png"
        },

        {
            name: "bread",
            nombre: "pan",
            url: "pics/bread.png"
        },

        {
            name: "carrots",
            nombre: "zanahoria",
            url: "pics/carrots.png"
        },

        {
            name: "cheese",
            nombre: "queso",
            url: "pics/cheese.jpg"
        },

        {
            name: "chicken",
            nombre: "pollo",
            url: "pics/chicken.png"
        },

        {
            name: "corn",
            nombre: "maíz",
            url: "pics/corn.png"
        },

        {
            name: "eggs",
            nombre: "huevos",
            url: "pics/eggs.png"
        },

        {
            name: "fish",
            nombre: "pescado",
            url: "pics/fish.png"
        },

        {
            name: "french fries",
            nombre: "papas fritas",
            url: "pics/fries.gif"
        },

        {
            name: "grapes",
            nombre: "uvas",
            url: "pics/grapes.png"
        },

        {
            name: "ice cream",
            nombre: "helado",
            url: "pics/icecream.png"
        },

        {
            name: "lettuce",
            nombre: "lechuga",
            url: "pics/lettuce.png"
        },

        {
            name: "lobster",
            nombre: "langosta",
            url: "pics/lobster.png"
        },

        {
            name: "milk",
            nombre: "leche",
            url: "pics/milk.png"
        },

        {
            name: "orange juice",
            nombre: "jugo de naranja",
            url: "pics/orange-juice.png"
        },

        {
            name: "orange",
            nombre: "naranja",
            url: "pics/orange.png"
        },

        {
            name: "potato",
            nombre: "papas",
            url: "pics/potato.png"
        },

        {
            name: "rice",
            nombre: "arroz",
            url: "pics/rice.png"
        },

        {
            name: "salad",
            nombre: "ensalada",
            url: "pics/salad.png"
        },

        {
            name: "soup",
            nombre: "sopa",
            url: "pics/soup.png"
        },

        {
            name: "tomato",
            nombre: "tomate",
            url: "pics/tomato.png"
        },

        {
            name: "turkey",
            nombre: "pavo",
            url: "pics/turkey.png"
        },

        {
            name: "water",
            nombre: "agua",
            url: "pics/water.png"
        }],
}

const game = {

    unshuffled : [],
    shuffled : [],

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

}

game.start();

// functions needed:
// forvo = takes current word, makes api call, returns the sound file
// buildCard = takes shuffled array and builds the card html, then writes to DOM
// shuffle = shuffle array of pix
// playNext - take forvo res, sorts, picks the best one, then plays it; repeats once after 4 seconds
// getCategory
// getLanguage
// writeText - takes html id and text - writes


