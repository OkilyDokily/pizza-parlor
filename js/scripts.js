class Pizza {
  constructor(veggies, meats, isExtraCheese, size){
  this.veggies = veggies;
  this.meats = meats;
  this.isExtraCheese = isExtraCheese;
  this.size = size;
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
  pizzas.push(new Pizza(veggies,meats,isExtraCheese,size));
}

let veggies =  
["pineapples",
"jalapenos",
"corn",
"red peppers", 
"onions", 
"olives"]


let meats =  
["italian sausage",
"turkeybacon",
"anchovies",
"pepperioni",
"chicken",
"spicy chicken"]
//============================================================
//============================================================
//============================================================
//UI CODE=====================================================
$(document).ready(function(){
  veggies.forEach(function(veggie){
    $("#veggies").append("<div><p>" + veggie +"</p><input type='checkbox' value='" + veggie+ "'>");
  });
  meats.forEach(function(meat){
    $("#meats").append("<div><p>" + meat +"</p><input type='checkbox' value='" + meat+ "'>");
  });

  $("form").submit(function(e){
    e.preventDefault();
    let veggies = $("div#veggies input:checked").map(function(item){
      return $(this).val()
    }).toArray();
    let meats  = $("div#meats input:checked").map(function(item){
      return $(this).val()
    }).toArray();
    let extraCheese = false;
    if ($("#cheese input:checked").val() === "yes"){
      extraCheese = true;
    }
    let size = $("option:selected").val();
    
    newPizza(veggies,meats,extraCheese, size);
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    $("div#results").text(formatter.format(pizzas[0].addUpToppings()));
  })
 
});