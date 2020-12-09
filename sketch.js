var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup;
var ground;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var survivalTime = 0;
var monkey_collided;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  monkey_collided = loadAnimation("sprite_0.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(500, 500);
  monkey = createSprite(100, 470, 20, 20);
  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("collided", monkey_collided);
  monkey.velocityX = 1

  monkey.scale = 0.1;
  // monkey.debug=true;

  ground = createSprite(300, 470, 995, 20);
  //ground.velocityX = -6;
 

  FoodGroup = new Group();
  obstacleGroup = new Group();

}


function draw() {
  background("white");

  stroke("white");
  fill("black");
  text("Survival Time:" + survivalTime, monkey.x+100, 100);

  if (gameState === PLAY) {
    survivalTime = Math.ceil(frameCount / frameRate());

    if (keyDown("space") && monkey.y > 425) {
      monkey.velocityY = -9;
    }
   
      ground.x = monkey.x;
    

    spawnBananas();
    spawnObstacles();
    if (monkey.isTouching(obstacleGroup)) {
      obstacleGroup.setVelocityXEach(0);
      FoodGroup.setVelocityXEach(0);

      gameState = END;
    }

    if (monkey.isTouching(FoodGroup)) {
      FoodGroup.destroyEach();
      if (keyDown("space") && monkey.y > 425) {
        monkey.velocityY = 0;

      }
    }
  }

  camera.position.x = monkey.x;
  camera.position.y = height/2;
  


  monkey.velocityY = monkey.velocityY + 0.3;
  monkey.collide(ground);
  if (gameState === END) {
    monkey.changeAnimation("collided", monkey_collided);
    ground.velocityX = 0;

    monkey.velocityX=0

    obstacleGroup.setLifetimeEach(-1);

    FoodGroup.setLifetimeEach(-1);
  }

  console.log(gameState);

  drawSprites();

}

function spawnBananas() {
  if (World.frameCount % 80 === 0) {
    banana = createSprite(monkey.x+200, 300, 20, 20);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -6;
    banana.y = Math.round(random(250, 350));
    banana.lifetime = 100;

    FoodGroup.add(banana);
  }

}

function spawnObstacles() {
  if (World.frameCount % 250 === 0) {
    obstacle = createSprite(monkey.x+300, 430, 10, 10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15;
    obstacle.velocityX = -5;
    //obstacle.x = Math.round(random(100, 400));
    obstacle.lifetime = 100;
    // obstacle.debug=true;

    obstacleGroup.add(obstacle);
  }
}