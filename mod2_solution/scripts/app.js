(function () {
'use strict';

angular.module('ShoppingListCheckOffApp', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

// toBuy items #1 - controller
ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var list1 = this;

  // get Buy items method
  list1.getBuyItems = ShoppingListCheckOffService.getItemsFromList1();

  //  remove  item method
  list1.removeItem = function(itemIndex)
  {
    ShoppingListCheckOffService.removeItem(itemIndex);
  }
}


// Bought items #2 - controller
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var list2 = this;

  //get bought items method
  list2.getBoughtItems = ShoppingListCheckOffService.getItemsFromList2();
}


// This  service is injected in both controller
function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var ToBuyitems = [{ name: "cookies", quantity: 10 },{ name: "Water bottles", quantity:5 },
                    { name: "Mango Juice", quantity: 2 },{ name: "French fries", quantity: 3 },
                    { name: "Breads", quantity: 6 }];

  var Boughtitems = [];

//add item to bought items
  service.addItem = function(itemName, quantity){
    var item = {
      name: itemName,
      quantity: quantity
    };
    Boughtitems.push(item);
  };

  // return toBuy items list
  service.getItemsFromList1 = function () {
    return ToBuyitems;
  };

 // return bought items list
  service.getItemsFromList2 = function () {
    return Boughtitems;
  };

 // Remove an item from toBuy list
  service.removeItem = function (itemIndex) {
    var temp = ToBuyitems[itemIndex];
    service.addItem(temp.name,temp.quantity);
    ToBuyitems.splice(itemIndex, 1);
  };

}

})();
