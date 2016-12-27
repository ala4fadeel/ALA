(function(){
  'use strict';
angular.module('LunchCheckApp',[])
.controller('LunchCheckController',['$scope',LunchCheckController]);
 LunchCheckController.$inject = ['$scope'];
 function LunchCheckController($scope) {
   $scope.lunchMenu="";
   $scope.message="";
   $scope.inputMessage =false;
   $scope.emptyMessage1 =false;

  $scope.result = function () {
    //remove white spaces
var input = $scope.lunchMenu.replace(/\s/g,'');
var count = Splitter(input);
 if(input==="" )
{
  $scope.message = "Please enter data first" ;
  $scope.emptyMessage1 =true;
}
else  if(count<=3)
  {
    $scope.message="Enjoy!";
    $scope.inputMessage =true;
  }
  else if(count>3)
   {
     $scope.message="Too much!";
     $scope.inputMessage =true;
   }
 }

}
})();

// split the string & remove empty spaces
 function Splitter(input) {
 var arrayOfStrings =removeEmptyElem(input.split(','));
 return arrayOfStrings.length;
};

//Helper method to remove empty elements
function removeEmptyElem(ary) {
    for (var i = ary.length - 1; i >= 0; i--) {
        if (ary[i] ==='') {
            ary.splice(i, 1);
        }
    }
    return ary;
}
