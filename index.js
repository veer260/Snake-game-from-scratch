const grid = document.querySelector(".grid");
const scoreSpan = document.querySelector("#score");
const startButton = document.querySelector("#start");
let squares = [];
let currentSnake = [2, 1, 0];
let width = 10;
let direction = 1;
let appleIdx = 0;
let score = 0;
let timeInterval = 5000;
let timer = 0;



function createGrid() {
    for ( let i = 0; i < 100; i++) {
        let square = document.createElement('div');
        grid.appendChild(square);
        squares.push(square);
    }
}
createGrid();

currentSnake.forEach(index => squares[index].classList.add('snake'));
generateApples();


function startGame() {
    clearInterval(timer);
    squares[currentSnake[0]].classList.remove('snake-head');
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    squares[appleIdx].classList.remove('apple');
    score = 0;
    currentSnake =[2, 1, 0];
    currentSnake.forEach(index => squares[index].classList.add('snake'));
    timeInterval = 1000;
    generateApples();
    direction = 1;
    

    timer = setInterval(move, timeInterval);
}




function generateApples() {
    do {
        appleIdx = Math.floor(Math.random()*100);
    }while(squares[appleIdx].classList.contains('snake'));
    squares[appleIdx].classList.add('apple');
}



function move() {
    squares[currentSnake[0]].classList.remove('snake-head');
    
    
    if (
        (currentSnake[0] % width == 0 && direction == -1) ||
        (currentSnake[0] % width == 9 && direction == 1) ||
        (currentSnake[0] < width && direction == -width) ||
        ((currentSnake[0] > 90 && currentSnake[0] < 100) && direction == width) ||
        (squares[currentSnake[0] + direction].classList.contains('snake'))
    ){
        return clearInterval(timer);
    }
    // console.log('good');
    const poppedIndex = currentSnake.pop();
    squares[poppedIndex].classList.remove('snake');

    currentSnake.unshift(currentSnake[0] + direction);
    squares[currentSnake[0]].classList.add('snake');
    squares[currentSnake[0]].classList.add('snake-head');

    if( squares[currentSnake[0]].classList.contains('apple')) {
        squares[currentSnake[0]].classList.remove('apple'); //apple eaten
        squares[poppedIndex].classList.add('snake'); 
        currentSnake.push(poppedIndex); //made snake bigger
        generateApples();// created new apple for snake to eat
        score++;
        scoreSpan.textContent = score;

        clearInterval(timer);
        timeInterval  = timeInterval*0.9;
        
        timer = setInterval(move, timeInterval);
    }
    // squares[currentSnake[0]].classList.remove('snake-head');
}



document.addEventListener('keyup', function(e) {
    if(e.key == 'ArrowDown') {
        direction = +width;
    }else if(e.key == 'ArrowUp') {
        direction = -width;
    }else if (e.key == 'ArrowLeft') {
        direction = -1;
    }else {
        direction = 1;
    }
})

startButton.addEventListener('click', startGame);