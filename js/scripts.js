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
   let basePrice;
   if (this.size === "small"){
     sizeExtra = 0;
     basePrice = 10;
   }
   else if (this.size === "medium"){
     sizeExtra = .50;
     basePrice = 15;
   }
   else {
     sizeExtra = 1.00
     basePrice = 20;
   }

   let extraCheese = 0;
   if (this.isExtraCheese){
     extraCheese = 2.00 + sizeExtra
  
   }

   return (((this.veggies.length * (1.00 + sizeExtra)) + (this.meats.length * (1.50 + sizeExtra)) + extraCheese) + basePrice);
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
    //create veggies array from input
    let veggies = $("div#veggies input:checked").map(function(item){
      return $(this).val()
    }).toArray();
    //create meats array from input
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
   
    $("li").remove();
    
    let pizzaOrdersText = ""
    pizzas.forEach(function(item,index){
      pizzaOrdersText += "<li id='"+ index + "'> Pizza Order: " + ( + index + 1) + "</li>";
    })
    $("div#orders ul").html(pizzaOrdersText)

    $("div#orders ul").on("click","li",function(item){
      let id = parseInt($(this).attr("id"));
      
      let pizza = pizzas[id];
      
      let veggieText = '';
      pizza.veggies.forEach(function(item){
        veggieText += "<li>" + item  + "</li>";
      })
      $("#veggiedetails").html(veggieText);
      let meatText = '';
      pizza.meats.forEach(function(item){
        meatText += "<li>" + item  + "</li>";
      })
      $("#meatdetails").html(meatText);
    });
  })
 
});