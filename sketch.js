var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running,monkeycollide
var banana ,bananaImage, obstacle, obstacleImage,backgroundImage
var foodGroup, obstacleGroup,gameoverImage,restartImage
var gameover,restart
var score = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkeycollide = loadImage("sprite_0.png")
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  backgroundImage = loadImage("background for monkey game.jfif")
  gameoverImage = loadImage("game over for monkey game.jfif");
  restartImage = loadImage("reset button for monkey game.png");
}



function setup() {
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10); 
  ground.x = ground.width/2;
  
  gameover = createSprite(200,200);
  gameover.addImage(gameoverImage);
  
  restart = createSprite(200,240);
  restart.addImage(restartImage);
  
  gameover.scale = 0.2;
  restart.scale = 0.2;

  gameover.visible = false;
  restart.visible = false;

  foodGroup = createGroup();
  obstacleGroup = createGroup();
}


function draw() {
  background(backgroundImage);
  
  text("Score: "+ score, 50,50);
  
  if (gameState===PLAY){
    ground.velocityX = -(10 + 3*score/2);
  
  
  if(monkey.isTouching(foodGroup)){
    foodGroup.destroyEach();
    score = score + 1;
  }
  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  monkey.collide(ground); 

  if(keyDown("space")&& monkey.y >= 200) {
        monkey.velocityY = -12;
  }
 
  monkey.velocityY = monkey.velocityY + 0.8;
    
    if(obstacleGroup.isTouching(monkey)){
        gameState = END;
    }
  
  
  }
 else if (gameState === END) {
    gameover.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    monkey.velocityY = 0;
   
 
    obstacleGroup.destroyEach();
    foodGroup.destroyEach();
   
    if(mousePressedOver(restart)) {
      reset();
    }
 }

  
  spawnBanana();
  spawnObstacles();
  
  
  drawSprites();
}

function spawnBanana(){
  if (frameCount % 100 === 0){
    banana = createSprite(380);
    banana.y = Math.round(random(140,220));
    banana.addImage(bananaImage);
    banana.scale = 0.1;

    banana.velocityX = -3;
    banana.lifetime = 390;
    foodGroup.add(banana);
  }
  
}
function spawnObstacles(){
  if (frameCount % 80 === 0){
    obstacle = createSprite(380,325);
    obstacle.addImage(obstaceImage);
    obstacle.scale = 0.1;

    obstacle.velocityX = -3;
    obstacle.velocityX = -(6 + score/10);
    obstacle.lifetime = 390;
    obstacleGroup.add(obstacle)
   }
  }
function reset(){
  gameState = PLAY;
  gameover.visible = false;
  restart.visible = false;
  
  obstacleGroup.destroyEach();
  foodGroup.destroyEach();
}
  
  
  
 