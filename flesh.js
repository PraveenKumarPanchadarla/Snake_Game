const con=document.querySelector("#gamecon");
const board=document.querySelector("#board");
const ctx=board.getContext("2d");
const rest=document.querySelector("#reset");
const score=document.querySelector("#score");
const gamewidth=board.width;
const gameheight=board.height;
const snakeColor="green";
const snakeBorder="black";
const boardbackground="white";
const foodColor="red";
const unitsize=25;
let xspeed=unitsize;
let yspeed=0;
let foodx;
let foody;
let run=false;
let gamescore=0;
let snake=[
    {x:unitsize*4, y:0},
    {x:unitsize*3, y:0},
    {x:unitsize*2, y:0},
    {x:unitsize, y:0},
    {x:0, y:0}
];
window.addEventListener("keydown",changedirection);
rest.addEventListener("click",resetgame);
gamestart();

function gamestart(){
    run=true;
    score.textContent=gamescore;
    createfood();
    drawfood();
    nexttick(); 
};
function nexttick(){
    if(run){
        setTimeout(()=>{
            clearboard();
            drawfood();
            movesnake();
            drawsnake();
            checkgameover();
            nexttick();
        },110);
    
    }
    else{
        displaygameover();
    }
};
function clearboard(){
    ctx.fillStyle=boardbackground;
    ctx.fillRect(0,0,gamewidth,gameheight);

};
function createfood(){
    function randomfood(min,max){
        const rand=Math.round((Math.random()*(max-min)+min)/unitsize)*unitsize;
        return rand;

    }
    foodx=randomfood(0,gamewidth-unitsize);
    foody=randomfood(0,gamewidth-unitsize);
};
function drawfood(){
    ctx.fillStyle=foodColor;
    ctx.fillRect(foodx,foody,unitsize,unitsize);
};
function movesnake(){
    const head={x:snake[0].x+ xspeed,
                y:snake[0].y+ yspeed};
    snake.unshift(head);
    // if food is eaten
    if(snake[0].x==foodx && snake[0].y==foody){
        gamescore+=1;
        score.textContent=gamescore;
        createfood();
    }
    else{
        snake.pop();
    }
};
function drawsnake(){
    ctx.fillStyle=snakeColor;
    ctx.strokeStyle=snakeBorder;
    snake.forEach(snakepart=>{
        ctx.fillRect(snakepart.x, snakepart.y, unitsize, unitsize);
        ctx.strokeRect(snakepart.x,snakepart.y,unitsize,unitsize);
    })

};
function changedirection(event){
    const keypressed=event.keyCode;
    console.log(keypressed);
    const LEFT=37;
    const UP=38;
    const RIGHT=39;
    const DOWN=40;

    const goingup=(yspeed== -unitsize);
    const goingdown=(yspeed== unitsize);
    const goingright=(xspeed== unitsize);
    const goingleft=(xspeed== -unitsize);

    switch(true){
        case(keypressed== LEFT && !goingright):
         xspeed=-unitsize;
         yspeed=0;
         break;
        case(keypressed== UP && !goingdown):
         xspeed=0;
         yspeed=-unitsize;
         break;
        case(keypressed== RIGHT && !goingleft):
         xspeed=unitsize;
         yspeed=0;
         break;
        case(keypressed== DOWN && !goingup):
         xspeed=0;
         yspeed=unitsize;
         break;
    }
};
function checkgameover(){
    switch(true){
       case(snake[0].x<0):
       run=false;
       break;
       case(snake[0].x>= gamewidth):
       run=false;
       break;
       case(snake[0].y<0):
       run=false;
       break;
       case(snake[0].y>=gameheight):
       run=false;
       break;
    }

    for(let i=1;i<snake.length;i+=1){
        if(snake[i].x==snake[0].x&&snake[i].y==snake[0].y){
            run=false
        }
    }
};
function displaygameover(){
    ctx.font="50px MV Boli";
    ctx.fillStyle="black";
    ctx.textAlign="center";
    ctx.fillText("GAME OVER.",gamewidth/2,gameheight/2);
    run=false;

};
function resetgame(){
    gamescore=0;
    xspeed=unitsize;
    yspeed=0;
    snake=[
        {x:unitsize*4, y:0},
        {x:unitsize*3, y:0},
        {x:unitsize*2, y:0},
        {x:unitsize, y:0},
        {x:0, y:0}
     ];
     gamestart();
};



