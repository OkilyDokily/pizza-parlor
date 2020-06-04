class Pizza {
  constructor(veggies, meats, isExtraCheese){
  this.veggies = veggies;
  this.meats = meats;
  this.isExtraCheese = isExtraCheese;
  this.size = "";
  }
  addUpToppings(){
   let sizeExtra;
   if (this.size === "small"){
     sizeExtra = 0;
   }
   else if (this.size === "medium"){
     sizeExtra = .50;
   }
   else {
     sizeExtra = 1.00
   }

   let extraCheese = 0;
   if (this.isExtraCheese){
     extraCheese = 2.00
   }

   return veggies.length * (1.00 + sizeExtra) + meats.length * (1.50 + sizeExtra) + (extraCheese + sizeExtra);
  }
}

$(document).ready(function(){

});

let veggies =  
["pineapples",
"jalapenos",
"corn",
"red peppers", 
"onions", 
"olives"]


let meats =  
["italiansausage",
"turkeybacon",
"anchovies",
"pepperioni",
"chicken",
"spicychicken"]

