/*
function game(){
    var score = Math.random() * 10;
    console.log(score >= 5)
}
game();

(function(){
    var score = Math.random() * 10;
    console.log(score >= 5)
})();
*/

/*
// auto invoked function
(function(goodLuck){
    var score = Math.random() * 10;
    console.log(score >= 5 - goodLuck)
})(5);
*/


// // closures
// function retirement(retirementAge){
//     var a = ' years left until retirement.';
//     return function(yearOfBirth){
//         var age = 2016 - yearOfBirth;
//         console.log((retirementAge - age) + a)
//     }
// }
// var retirementUS = retirement(66);
// retirementUS(1990)
// //retirement(66)(1980)
// var retirementDE = retirement(65);
// retirementDE(1990)
// var retirementIC = retirement(67)
// retirementIC(1990)

// function interviewQuestion(job){
//     return function(name){
//         if(job === 'designer'){
//             console.log(name + ', can you plase explain what UX design is?')
//         }
//         else if(job === 'teacher'){
//             console.log('What subject do you teach ' + name + '?')
//         }
//         else {
//             console.log('Hello ' + name + ', what do you do?')
//         }
//     }
// }
// interviewQuestion('designer')('Niki')
// interviewQuestion('developer')('Michael')

// //Bind, call, apply

// var john = {
//     name: 'John',
//     age: 26,
//     job: 'teacher',
//     presentation: function(style, timeOfDay){
//         if(style === 'formal'){
//             console.log('Good ' + timeOfDay + ', Ladies and gentlemen! I\'m ' + this.name + ', I\'m ' + this.age + ' years old.')
//         }
//         else if (style === 'friendly'){
//             console.log('Hey! What\'s up? I\'m ' + this.name + ', I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old. Have a nice ' + timeOfDay + '.')
//         }
//     }
// }

// var emily = {
//     name: 'Emily',
//     age: 35,
//     job: 'designer'
// }

// john.presentation('formal', 'morning')
// john.presentation.call(emily, 'friendly', 'afternoon')
// john.presentation.apply(emily, ['friendly', 'morning'])

// var johnFriendly = john.presentation.bind(john, 'friendly')
// johnFriendly('morning')
// johnFriendly('night')

// var emilyFormal = john.presentation.bind(emily, 'formal');
// emilyFormal('afternoon')

//Bind Exercise
// function Question(question, answer, answers){
//     this.question = question
//     this.answer = answer
//     this.answers = answers
// }

// var q1 = new Question('What is 2 + 2?', '4', ['2', '4', '22']);
// var q2 = new Question('What is 2 x 2?', '4', ['4', '6', '22']);
// var q3 = new Question('What is 2 / 2?', '1', ['2', '1', '4']);
// var qs = [q1, q2, q3];

// Question.prototype.askQuestion = function(){
//     var options = this.answers.map(answer =>  '\n [ ] ' + answer)
//     return prompt(this.question + options) === this.answer ? 'Correct' : 'Incorrect' ;
// }
// Question.prototype.checkAnswer = function(ans) {
//     if (ans === this.answer) {
//         console.log('Correct answer!');
//     } else {
//         console.log('Wrong answer. Try again :)')
//     }
// }

// var answer = qs[1].askQuestion();
// console.log(answer)

//var answer = prompt(qs[0].question);
// if(answer === qs[0].answer){
//     console.log('correct')
// }
// else {
//     console.log('incorrect')
// }


(function(){
    function Question(question, answers, correct){
    this.question = question
    this.answers = answers
    this.correct = correct
}

Question.prototype.displayQuestion = function(){
    console.log(this.question)
    for(var i=0; i<this.answers.length; i++){
        console.log(i + ': ' +this.answers[i])
    }
}
Question.prototype.checkAnswer = function(ans, callback){
    var sc;

    if (ans === this.correct) {
        console.log('Correct answer!');
        sc = callback(true);
    } else {
        console.log('Wrong answer. Try again :)')
        sc = callback(false);
    }

    this.displayScore(sc);
}
Question.prototype.displayScore = function(score){
    console.log('Your current score is: ' + score);
    console.log('----------------------------------------');
}

var q1 = new Question('What is 2 + 2?', [2, 4, 22], 1);
var q2 = new Question('What is 2 x 2?', [4, 6, 22], 0);
var q3 = new Question('What is 2 / 2?', [2, 1, 4], 1);

function score(){
    var sc = 0;
    return function(correct){
        if(correct){
            sc++;
        }
        return sc;
    }
}
var keepScore = score();

function nextQuestion(){
    var questions = [q1, q2, q3];

    var n = Math.floor(Math.random() * questions.length)
    questions[n].displayQuestion();

    var answer = prompt('Please Select the correct answer.');
    questions[n].checkAnswer(parseInt(answer), keepScore);
    if(answer !== 'exit'){
        nextQuestion()
    }
}
nextQuestion()
})()