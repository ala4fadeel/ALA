(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController',NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems',FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      found: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };
  return ddo;
}

function FoundItemsDirectiveController() {
  var list = this;

  list.isEmpty = function() {
    var result= false;
    if(list.found != undefined && list.found.length === 0)
    {
      result= true;
    }
    else
    {
      result = false;
    }
    return result;
  }
}

// NarrowItDownController #1
NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;
 menu.searchTerm='';
 menu.status=false;
 menu.categories=[];
 menu.FireIt = function()
 {
  var promise = MenuSearchService.getMatchedMenuItems();
  promise.then(function (response) {
    var result = response.data.menu_items;
    console.log('Result: ' + result.length);
    var foundItems = [];
    for(var i=0;i<result.length; i++){
        if (menu.searchTerm != '') {
            if ((result[i].name.indexOf(menu.searchTerm) != -1) || (result[i].description.indexOf(menu.searchTerm) != -1))
            {
                foundItems.push(result[i]);
            }
        }
      }
        console.log('Found Items: ' + foundItems.length);
        menu.status=true;
    menu.categories = foundItems;
  })
  .catch(function (error) {
    console.log("Something went terribly wrong.");
  });
}//end of fireit function

menu.onRemove = function(index){
  menu.categories.splice(index, 1);
};
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function () {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    });

    return response;
  };


  service.getMenuForCategory = function (shortName) {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
      params: {
        category: shortName
      }
    });

    return response;
  };

  // Remove an item
  service.removeItem = function (itemIndex) {
    var temp = ToBuyitems[itemIndex];
    service.addItem(temp.name,temp.quantity);
    ToBuyitems.splice(itemIndex, 1);
  };

}





})();
