///business logic
//=======================

class Pizza {
  static prices = {"Small": [10,0], "Medium": [15,.50],"Large":[20,1.00] }
  static veggyList =  ["artichoke","brocolli","tomatoes", "pineapples","jalapenos","corn","red peppers", "onions", "olives"];
  static meatList =  ["italian sausage","turkey bacon", "anchovies","pepperoni", "chicken","spicy chicken", "shrimp"]
  constructor(veggies, meats, isExtraCheese, size){
    //inputted properties
    this.veggies = veggies;
    this.meats = meats;
    this.isExtraCheese = (isExtraCheese ? 2.00 : 0);
    this.size = size;
    //calculated properties
    this.basePrice;
    this.sizeExtra;
    [this.basePrice ,this.sizeExtra] = Pizza.prices[this.size];
    this.price = this.addUpToppings();
  }

  addUpToppings(){
   //autoformat the currency with builtin currency object
   var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    });
 
   return formatter.format(((this.veggies.length * (1.00 + this.sizeExtra)) + (this.meats.length * (1.50 + this.sizeExtra)) + this.isExtraCheese) + this.basePrice);
  }
}
//create a list of each pizza order/object
let pizzas = [];
function newPizza(veggies, meats, isExtraCheese, size){
  pizzas.push(new Pizza(veggies,meats,isExtraCheese,size));
}

//============================================================
//============================================================
//============================================================
//UI CODE=====================================================
$(document).ready(function(){
  //show all veggies on page load include checkbox for selection
  Pizza.veggyList.forEach(function(veggie){
    $("#veggies").append("<div class='form-group'><p>" + veggie +"</p><input class='form-control' type='checkbox' value='" + veggie+ "'>");
  });
  //show all meats on page load includce checkbox on selection
  Pizza.meatList.forEach(function(meat){
    $("#meats").append("<div class='form-group'><p>" + meat +"</p><input class='form-control' type='checkbox' value='" + meat+ "'>");
  });

  $("form").submit(function(e){
    e.preventDefault();
    
    //create veggies array from checked box input for pizza object
    let veggies = $("div#veggies input:checked").map(function(item){
      return $(this).val()
    }).toArray();
    //create meats array from checked box input for pizza object
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
    //create a list of each pizza order
    showOrders();
    attachEventListenersToPizzaOrders();
    removeChecks();
  })

  function showOrders(){
    //create a list of each pizza order
    let pizzaOrdersText = "<h1>Your Orders: </h1>";
    pizzaOrdersText += "<ul>"
    pizzas.forEach(function(item,index){
      pizzaOrdersText += "<li id='"+ index + "'> Pizza Order- " + ( + index + 1) + ": " + item.price + "</li>";
    })
    pizzaOrdersText += "</ul>"
    $("div#orders").html(pizzaOrdersText)
  }

  function attachEventListenersToPizzaOrders(){
    //on each pizza order create a blue bordered itemization when clicked on
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
      if(pizza.isExtraCheese === 2){
        extratext += "- with extra cheese!"
      }
      extratext += "<p>Base price for a " + pizza.size.toLowerCase() + " pizza is " + pizza.basePrice+  " dollars.</p>"
      
     
      extratext += '</p>'
      $("#details").html(intro + extratext + veggieText + meatText);
    });
  }

  function removeChecks(){
    $("input:checked").prop("checked", false);
  }

});