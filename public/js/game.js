const game = {

    languages: ['English', 'Español'],
    categories : ['Food', 'Supplies'],
    welcome: function(){
        document.getElementById('message').textContent = "Welcome";
        game.showInputs();
    },

    showInputs = function(){

    }
}    
    
    
    
    
//     const welcome = () => {

//         game.languages.forEach(function(language) {
//             let langOption = $('<option>').addClass('dropdown-item').text(language).val(language);
//             $('#language-select').append(langOption)
//         });

//         game.categories.forEach(function(category) {
//             let catOption = $('<option>').addClass('dropdown-item').text(category.replace("_", " ")).val(category);
//             $('#category-select').append(catOption)
//         });

//         const choiceMsg = "Choose Your Options";
//         $('#message').text(choiceMsg);
//     }

// $('#submit-input').on('click', function(event) {
//     event.preventDefault();
//     const chosenLanguage = $('#language-select').val();
//     const chosenCategory = $('#category-select').val();
//     $('#input-form').hide();
//     start();
// });

// $(document).on('click', '#start-game', function() {
//     game.forvoCall();
//     $('#input-form').hide();
//     $(this).text('Re-Play');
// });

// $(document).on('click', '.tile', function() {
//     $('.square').removeClass('tile').addClass('disabled');

//     window.setTimeout(() => {
//         $('.square').addClass('tile').removeClass('disabled');
//     }, 2000);

//     const guessedWord = $(this).attr('data-value');
//     const calledWord = game.called;
//     const result = game.checkAnswer(guessedWord, calledWord);

//     if (result) {
//         $(this).addClass('right');
//         game.selected.push($(this).attr('data-id'));
//     } else {
//         const clicked = $(this);
//         const realAnswer = `img[data-value='${game.called}']`;
//         $(realAnswer).addClass('wrong').attr('disabled', true);
//         $(clicked).addClass('error');
//         window.setTimeout(function() {
//             $(clicked).removeClass('error');
//         }, 1000);
//     }

//     const gameResult = game.gameWon();
//     if (gameResult) {
//         game.winner();
//     } else {
//         game.currentIdx++;
//         game.forvoCall();
//     }
//     game.gameRunning = false;

// });

game.welcome();