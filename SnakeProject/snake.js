let snakeSpeed = 10;

let previousTimeStamp = 0;
function mainLoop(time){
    window.requestAnimationFrame(mainLoop);
    let updateRate = (time - previousTimeStamp) / 1000;
    if (updateRate < 1 / snakeSpeed){
        //pass
    }
    else {
        previousTimeStamp = time;

        updateData()
        drawFrame()
    }
}
window.requestAnimationFrame(mainLoop)

let snakeBlocks = [{x:11, y:11}];
let gridSpecs = 21;
function randomGridLocation(){
    x = Math.floor(Math.random() * gridSpecs) + 1;
    y = Math.floor(Math.random() * gridSpecs) + 1;
    return {x, y};
}
let food = randomGridLocation();

// function foodPosition(){
//     let foodLocation;
//     function checkIfOnSnake(){
//         for (let i = 0; i<snakeBlocks.length; i++){
//             if(snakeBlocks[i].x === food.x && snakeBlocks[i].y === food.y){
//                 return true
//             }
//             else {return false}
//         }
//     }
//     while (foodLocation == null || checkIfOnSnake() == true){
//         foodLocation = randomGridLocation();
//     }
//     return foodLocation;
// }



let snakeRotation = { x: 0, y: 0}
let previousRotation = { x: 0, y: 0}
window.addEventListener('keydown', e => {
    switch (e.key) {
        case "ArrowDown":
            if (previousRotation.y !== 0){
                break
            }
            else{
            snakeRotation = {x:0, y:1}
            break
            }
        case "ArrowUp":
            if (previousRotation.y !== 0){
                break
            }
            else {
            snakeRotation = {x:0, y:-1}
            break
            }
        case "ArrowRight":
            if (previousRotation.x !== 0){
                break
            }
            else{
            snakeRotation = {x:1, y:0}
            break
            }
        case "ArrowLeft":
            if (previousRotation.x !== 0){
                break
            }
            else {
            snakeRotation = {x:-1, y:0}
            break
            }
    }
})



let snakeGrowthRate = 1;
let snakeBodyParts = 0;
function updateData(){
    snakeBlocks[0].x += snakeRotation.x;
    snakeBlocks[0].y += snakeRotation.y;
    previousRotation = snakeRotation;
    
    for (let i = snakeBlocks.length - 2; i >= 0; i--){
        snakeBlocks[i+1] = {...snakeBlocks[i]};
    }

    for (let i = 0; i<snakeBlocks.length; i++){
        if (snakeBlocks[i].x === food.x && snakeBlocks[i].y === food.y){
            snakeBodyParts += snakeGrowthRate;
            food = foodPosition();
        }
    }
    

    for(let i = 0; i<snakeBodyParts; i++){
        snakeBlocks.push({...snakeBlocks[snakeBlocks.length - 1]})
    }
    snakeBodyParts=0;
}

const board = document.getElementById('snakeBoard');
function drawFrame(){
    board.innerHTML = '';
    snakeBlocks.forEach(part => {
        let snakeBlock = document.createElement('div');
        snakeBlock.style.gridRowStart = part.y;
        snakeBlock.style.gridColumnStart = part.x;
        snakeBlock.classList.add('snakeObj');
        board.appendChild(snakeBlock);
    })

    let foodObj = document.createElement('div');
    foodObj.style.gridRowStart = food.y;
    foodObj.style.gridColumnStart = food.x;
    foodObj.classList.add('foodObj');
    board.appendChild(foodObj);
}