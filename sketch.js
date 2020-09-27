//Create variables here
var dog, happyDog;
var foodS, foodStock, database;
var feedPet, addFood;
var fedTime, lastFed;
var foodObj;




function preload(){
//load images here
dog = loadImage("images/dogImg.png");
dog2 = loadImage("images/dogImg1.png")
  
}

function setup() {

database=firebase.database();

createCanvas(1000,400);

dog = createSprite(250,300,150,150);
dog.addImage(dog);
dog.scale=0.15

foodObj = new Food ();

foodStock=database.ref('Food');
foodStock.on("value", readStock);


feed = createButton("Feed the Dog")
button1.position (700,95);
feed.mousePressed(feedDog);

addFood = createButton("Add food for the dog")
button2.position(800,95);
addFood.mousePressed(addFoods);




  
}


function draw() {  
background(46,139,87);
foodObj.display();

fedTime =database.ref('FeedTime');
fedTime.on("value", function(data){
lastFed=data.val();
});

//name of the pet
text("Take Care of Marnie.", 190,200);
textSize(15);

text("Food Left :" +foodS,170,200);
textsize(13);

var lastFed;
fill (255,255,254);
textSize(15);
if(lastFed>=12){
text("Last Feed :" + lastFed%2 + "PM", 350,30);

}else if (lastFed==0){
text("Last Feed: 12 AM", 350,30);

}else if (lastFed==0){
text("Last Feed: " + lastFed + "AM", 350,30);
};

  drawSprites();
 
}
function readStock(data){
foodS=data.val();
foodObj.updateFoodStock(foodS);
  }





function feedDog(){
dog.addImage(dog1);

foodObj.updateFoodStock(foodObj.getFoodStock()-1);
database.ref('/').update({
Food:foodObj.getFoodStock(),
FeedTime:hour()

})
}


function addFoods(){
foodS++;
database.ref('/'),update({
Food:foodS
})
}



