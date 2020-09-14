var trex, trex_running, trex_collided;

var ground, invisibleGround, groundImage;

var cloudImage,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var cloudGroup,obstacleGroup;

var score;
var gamestate,PLAY,END
var gameOver,restart;
var overImg,resetImg;

function preload(){
  trex_running =loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");

  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");

  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  overImg = loadImage("gameOver.png");

  restartImg = loadImage("restart.png");

  gameOver = createSprite(300,100,20,20);
  gameOver.addImage(overImg);
  gameOver.scale = 0.5;
  gameOver.visible = false;
  
  restart = createSprite(300,50,20,20);
  restart.addImage(restartImg);
  restart.scale = 0.5;
  restart.visible = false;
}

function setup() {
  createCanvas(600, 200);
  
  cloudGroup = new Group();
  
  obstacleGroup = new Group();
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  trex.addAnimation("collided",trex_collided);
  
  ground = createSprite(100,180,400,20);
  ground.addImage("ground",groundImage);
  //ground.x = ground.width /2;
  //ground.velocityX = -5;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  score = 0;

  PLAY = 1;
  END = 0;
  gamestate=PLAY;
 
  camera.y = 100;
}

function draw() {
  background(180);

  gameOver.x = trex.x;
  restart.x = trex.x;

  camera.x = trex.x;

  console.log(trex.x)
  
  text("Score:"+score,300,50);   
  
  if(gamestate ===PLAY){

    score = score+Math.round(getFrameRate()/60);

    if(keyDown("right_arrow")) {
      trex.x = trex.x+6;
    }

    if(keyDown("left_arrow")) {
      trex.x = trex.x-6;
    }

    if(keyDown("space")&&trex.y>161.5) {
      trex.velocityY = -15
    }

    invisibleGround.x = trex.x;
    
    trex.velocityY = trex.velocityY + 0.8
    
    /*if (trex.x%878===0){
      ground.x = ground.width/2;
    }*/
    ground.x = trex.x;

    spawnClouds();
    spawnObstacle();

    if(obstacleGroup.isTouching(trex)){
      gamestate=END;
    }
  }
  else if(gamestate===END){
      ground.velocityX = 0;
      obstacleGroup.setVelocityXEach(0);
      cloudGroup.setVelocityXEach(0);

      obstacleGroup.setLifetimeEach(-1);
      cloudGroup.setLifetimeEach(-1); 

      trex.changeAnimation("collided",trex_collided);

      gameOver.visible = true;
      restart.visible = true;
      
      if(mousePressedOver(restart)){
        reset();
      }
    
  }
  
  trex.collide(invisibleGround);
  drawSprites();
}

function spawnClouds(){
  if(frameCount%60===0){
    var cloud = createSprite(600,120,40,10);
    cloud.x = trex.x+200;
    cloud.addImage(cloudImage);
    var rand = random(80,120);
    cloud.y = rand;
    cloud.lifetime = 100; 
    cloud.depth = trex.depth-1;
    cloudGroup.add(cloud);
  }
}

function spawnObstacle(){
  if(frameCount%100===0){
    var obstacle = createSprite(600,165,30,30);
    obstacle.x = trex.x +200;
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1:obstacle.addImage(obstacle1);
        break;
      case 2:obstacle.addImage(obstacle2);
        break;
      case 3:obstacle.addImage(obstacle3);
        break;
      case 4:obstacle.addImage(obstacle4);
        break;
      case 5:obstacle.addImage(obstacle5);
        break;
      case 6:obstacle.addImage(obstacle6);
        break;
        default:break;
    }
     
     obstacle.lifetime = 300;
     obstacle.scale =0.5;

     obstacleGroup.add(obstacle);
  }
}

function reset(){
  gamestate = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  score = 0;

  trex.x = 0;
  
}
