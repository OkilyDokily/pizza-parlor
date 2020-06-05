///business logic
//=======================

class Pizza {
  constructor(veggies, meats, isExtraCheese, size){
  this.veggies = veggies;
  this.meats = meats;
  this.isExtraCheese = isExtraCheese;
  this.size = size;
  
  this.price = "";
  this.basePrice = 0;
  this.addUpToppings();
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

   if (this.size === "Small"){
     sizeExtra = 0;
     this.basePrice = 10;
   }
   else if (this.size === "Medium"){
     sizeExtra = .50;
     this.basePrice = 15;
   }
   else {
     sizeExtra = 1.00
     this.basePrice = 20;
   }

   let extraCheese = 0;
   if (this.isExtraCheese){
     extraCheese = 2.00 + sizeExtra;
   }
   var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    });
 
   this.price = formatter.format(((this.veggies.length * (1.00 + sizeExtra)) + (this.meats.length * (1.50 + sizeExtra)) + extraCheese) + this.basePrice);
  }
}



let pizzas = [];
function newPizza(veggies, meats, isExtraCheese, size){
  pizzas.push(new Pizza(veggies,meats,isExtraCheese,size));
}

let veggies =  
[
"artichoke",
"brocolli",
"tomatoes",
"pineapples",
"jalapenos",
"corn",
"red peppers", 
"onions", 
"olives"]


let meats =  
["italian sausage",
"turkey bacon",
"anchovies",
"pepperoni",
"chicken",
"spicy chicken",
"shrimp"]
//============================================================
//============================================================
//============================================================
//UI CODE=====================================================
$(document).ready(function(){
  veggies.forEach(function(veggie){
    $("#veggies").append("<div class='form-group'><p>" + veggie +"</p><input class='form-control' type='checkbox' value='" + veggie+ "'>");
  });
  meats.forEach(function(meat){
    $("#meats").append("<div class='form-group'><p>" + meat +"</p><input class='form-control' type='checkbox' value='" + meat+ "'>");
  });

  $("form").submit(function(e){
    e.preventDefault();
    //create veggies array from input for pizza object
    let veggies = $("div#veggies input:checked").map(function(item){
      return $(this).val()
    }).toArray();
    //create meats array from input for pizza object
    let meats  = $("div#meats input:checked").map(function(item){
      return $(this).val()
    }).toArray();

    let extraCheese = false;
    if ($("#cheese input:checked").val() === "yes"){
      extraCheese = true;
    }
    let size = $("option:selected").val();
    //create the Pizza Object;
    newPizza(veggies,meats,extraCheese, size);
    
    showOrders();
    attachEventListeners();
    
  })

  function showOrders(){
    let pizzaOrdersText = "<h1>Your Orders: </h1>";
    pizzaOrdersText += "<ul>"
    pizzas.forEach(function(item,index){
      pizzaOrdersText += "<li id='"+ index + "'> Pizza Order- " + ( + index + 1) + ": " + item.price + "</li>";
    })
    pizzaOrdersText += "</ul>"
    $("div#orders").html(pizzaOrdersText)
  }

  function attachEventListeners(){
    $("div#orders ul").on("click","li",function(item){
      //show border only when you click on a detail
      $("#details").css('visibility', 'visible');

      let id = parseInt($(this).attr("id"));
      
      let pizza = pizzas[id];
      let intro = "<h1>Pizza Order: " + (id + 1) +  "</h1>"
      //create veggie ul text
      let veggieText = '<h3>Your veggies:</h3><ul>';
      pizza.veggies.forEach(function(item){
        veggieText += "<li>" + item  + "</li>";
      })
      veggieText += '</ul>'

      //create meat ul text
      let meatText = '<h3>Your meats:</h3><ul>';
      pizza.meats.forEach(function(item){
        meatText += "<li>" + item  + "</li>";
      })
      meatText +='</ul>'

      //create other info text - extra cheese base price pizza size etc.
      let extratext = '<p>'+ pizza.size + " pizza.";
      if(pizza.isExtraCheese === true){
        extratext += "- with extra cheese!"
      }
      extratext += "<p>Base price for a " + pizza.size.toLowerCase() + " pizza is " + pizza.basePrice+  " dollars.</p>"
      
     
      extratext += '</p>'
      $("#details").html(intro + extratext + veggieText + meatText);
    });
  }

});