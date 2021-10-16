let snakeSpeed = 3;

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


function updateData(){

}


let snakeBlocks = [{x:11, y:11}, {x:11, y:10}, {x:11, y:9}];
const board = document.getElementById('snakeBoard');
function drawFrame(){
    snakeBlocks.forEach(part => {
        let snakeBlock = document.createElement('div');
        snakeBlock.style.gridRowStart = part.y;
        snakeBlock.style.gridColumnStart = part.x;
        snakeBlock.classList.add('snakeObj');
        board.appendChild(snakeBlock);
    })
}