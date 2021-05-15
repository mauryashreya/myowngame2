var sadmonkey1,happymonkey1, database;
var foodS,foodStock;
var addFood ,feed , feed2;
var foodObj,lastfeed1,lastfeed2,bg;
var sadmonkey2 , monkey1, monkey2;
//create feed and lastFed variable here


function preload(){
  sadmonkey1=loadImage("sadmonkey.png");
  happymonkey1=loadImage("hapymonkey.png");
  bg=loadImage("bg.jpg");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);
  
  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  monkey1=createSprite(850,200,150,150);
  monkey1.addImage(sadmonkey1);
  monkey1.scale=0.25;

  monkey2=createSprite(700,300,150,150);
  monkey2.addImage(sadmonkey1);
  monkey2.scale=0.25;

  
   feed=createButton("Feed the monkey 1 ");
   feed.position(600,95)
   feed.mousePressed(feedmonkey);

   feed2=createButton("Feed the monkey 2 ");
   feed2.position(400,95)
   feed2.mousePressed(feedmonkey2);
   
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(bg);
  foodObj.display();
 
  feedTime=database.ref("Feedtime");
  feedTime.on("value",function(data){
    lastfeed1=data.val();
   
  })
  feedTime=database.ref("Feedtime2");
  feedTime.on("value",function(data){
    lastfeed2=data.val();
   
  })
 
  //write code to display text lastFed time here
  fill("blue")
  textSize(20)
   if(lastfeed1>12){

     text("last feed : "+lastfeed1%12+"pm",400,60)
   }
   else if (lastfeed1===0){
     text("last feed : 12am",400,60)
   }
   else{
     text("last feed : "+lastfeed1+"am",400,60)
   }
   if(lastfeed2>12){

    text("last feed : "+lastfeed2%12+"pm",200,60)
  }
  else if (lastfeed2===0){
    text("last feed : 12am",200,60)
  }
  else{
    text("last feed : "+lastfeed2+"am",200,60)
  }
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedmonkey(){
  monkey1.addImage(happymonkey1);
  foodS--;
  database.ref('/').update({
    Food:foodS,
    Feedtime: hour()
  })
  console.log(hour());
}
  //write code here to update food stock and last fed time
  function feedmonkey2(){
    monkey2.addImage(happymonkey1);
    foodS--;
    database.ref('/').update({
      Food:foodS,
      Feedtime2:hour()
    })
  }


//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
