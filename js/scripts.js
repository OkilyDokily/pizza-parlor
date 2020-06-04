class Pizza {
  constructor(veggies, meats, isExtraCheese, size){
  this.veggies = veggies;
  this.meats = meats;
  this.isExtraCheese = isExtraCheese;
  this.size = "";
  }
  addVeggie(veggie){
    this.veggies.push(veggie);
  }
  addMeat(meat){
    this.meats.push(meat);
  }

  changeSize(newSize){
    this.size = newSize;
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
     extraCheese = 2.00 + sizeExtra
   }

   return (veggies.length * (1.00 + sizeExtra)) + (meats.length * (1.50 + sizeExtra)) + extraCheese;
  }
}



let pizzas = [];
function newPizza(veggies, meats, isExtraCheese, size){
  pizza.push(new Pizza(veggies,meats,isExtraCheese,size));
}

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
//============================================================
//============================================================
//============================================================
//UI CODE=====================================================
$(document).ready(function(){

});