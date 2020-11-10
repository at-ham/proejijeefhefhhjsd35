//Create variables here
var dog, happyDog, database, foodS, foodStock;
var dogI,foodI, sdsafs;
var fedTime,lastFed=0,feed,addFood,foodObj;
function preload(){
dogI = loadImage("images/dogImg.png")
sdsafs = loadImage("images/dogImg1.png")




}

function setup() {
  createCanvas(500, 500);
  background(46, 139, 87);
  database=firebase.database()
dog = createSprite(250,250,20,20);
dog.addImage(dogI)
foodStock=database.ref('food')
foodStock.on("value",readStock)
dog.scale=0.2
foodObj=new food();
feed=createButton("feed the dog");
feed.position(700,95);
feed.mousePressed(feedDog);
addFood=createButton("more food");
addFood.position(800,95);
addFood.mousePressed(addFoods);


}


function draw() {  
  background(46, 139, 87);
  drawSprites();
  foodObj.display();

  //add styles here\
fedTime=database.ref('feedTime');
fedTime.on("value",function(data){
  lastFed=data.val();
});
fill (255);
textSize(15);
if (lastFed>=12){
  
  text("last feed:"+lastFed%12+"pm",350,30);
  
}
else if (lastFed===0){
  text("last feed:12AM",350,30) 
  
}
else{
  text("last feed:"+lastFed+"pm",350,30);
}




}
function addFoods(){
foodS++;
database.ref('/').update({
  food:foodS
});

}

function feedDog(){
dog.addImage(sdsafs);
foodObj.updateFoodStock(foodObj.getFoodStock()-1);
database.ref('/').update({
  food:foodObj.getFoodStock(),

  feedTime:hour()
});

}



function readStock(data){
foodS=data.val();
foodObj.updateFoodStock(foodS)
}

function writeStock(x){
if(x<=0){
  x=0
}else{
  x=x-1;
}


database.ref('/').update({
  food:x
})
}


