//Global Variables
var scene, obstacle, food;
var monkey, ground;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var obstaclesGroup, foodGroup;
var score;

function preload() {
  monkey1 = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  scene1 = loadImage("jungle.jpg");
  obstacle1 = loadImage("stone.png");
  food1 = loadImage("Banana.png");
  ground1 = loadImage("ground.jpg");
}


function setup() {
  createCanvas(600, 500);

  monkey = createSprite(100, 400, 20, 20);
  monkey.addAnimation("monkey", monkey1);
  monkey.scale = 0.1;

  scene = createSprite(300, 150, 100, 100);
  scene.addAnimation("jungle.jpg", scene1);
  scene.scale = 1.5;
  //scene.velocityX = -2;

  obstacle = createSprite(600, 450, 10, 10);
  obstacle.addAnimation("stone.png", obstacle1);
  obstacle.scale = 0.1;
  obstacle.velocityX = -2;
  obstacle.destroy();

  obstaclesGroup = new Group();
  foodGroup = new Group();

  food = createSprite(600, 100, 10, 10);
  food.addAnimation("Banana.png", food1);
  food.scale = 0.07;
  food.velocityX = -2;
  food.y = random(100, 250);
  food.destroy();

  ground = createSprite(300, 500, 100, 100);
  ground.addAnimation("ground.jpg", ground1);
  ground.scale = 0.2;
  ground.debug = true;
  ground.setCollider("rectangle", 0, 200, 3000, 900);
  ground.visible = false;

  scene.depth = 1;
  ground.depth = 2;
  obstacle.depth = 3;
  food.depth = 4;
  monkey.depth = 5;

  score = 0;
}


function draw() {
  background(255);

  if (gameState === PLAY) {
    if (keyDown("up") && monkey.y > 300) {
      monkey.velocityY = -13;
    }
    
    scene.velocityX = -(2 + score/5);

    if (scene.x < 0) {
      scene.x = scene.width / 2;
    }

    monkey.velocityY = monkey.velocityY + 0.3;

    for (f = 0; f < foodGroup.length; f++) {
      var temp = foodGroup.get(f);
      if (foodGroup.isTouching(monkey)) {
        score = score + 1;
        temp.destroy();
        //monkey.scale = monkey.scale + 0.01;

        switch (score) {
          case 1:
            monkey.scale = 0.11;
            break;
          case 2:
            monkey.scale = 0.12;
            break;
          case 3:
            monkey.scale = 0.13;
            break;
          case 4:
            monkey.scale = 0.14;
            break;
          case 5:
            monkey.scale = 0.15;
            break;
          default:
            break;
        }
      }
    }

    if (obstaclesGroup.isTouching(monkey)) {
      gameState = END;
    }

    eat();
    obstacles();
  } else if (gameState === END) {


    obstaclesGroup.destroyEach();
    monkey.destroy();
    foodGroup.destroyEach();
    scene.velocityX = 0;

    /*switch(score) {
          case 1: monkey.scale = 0.08;
                  gameState = "play";
                break;
          case 2: obstaclesGroup.destroyEach();
                  monkey.destroy();
                  foodGroup.destroyEach();
                  scene.velocityX = 0;
                break;
         default: break;
    }*/
  }

  monkey.collide(ground);

  drawSprites();
  textSize(15);
  text("Score: " + score, 500, 50);
}

function obstacles() {
  if (frameCount % 100 === 0) {
    obstacle = createSprite(600, 450, 10, 10);
    obstacle.addAnimation("stone.png", obstacle1);
    obstacle.scale = 0.1;
    obstacle.velocityX = -2;
    obstacle.depth = 3;
  }
  obstaclesGroup.add(obstacle);
}

function eat() {
  if (frameCount % 100 === 0) {
    food = createSprite(600, 400, 10, 10);
    food.addAnimation("Banana.png", food1);
    food.scale = 0.07;
    food.velocityX = -2;
    food.y = random(100, 450);
    foodGroup.add(food);
  }
}