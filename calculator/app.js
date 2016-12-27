(function(){
'use strict';
angular.module('NameCalculator',[])

.controller('NameCalculatorController',function($scope)
{
$scope.name = "" ;
$scope.totalValue = 0 ;


$scope.numericDisplay = function()
{
  var totalNameValue = calculateNumericForString($scope.name);
  $scope.totalValue= totalNameValue;
};

function calculateNumericForString(string)
{
  var totalNameValue = 0;
  for(var i=0;i<string.length;i++)
  {
    totalNameValue+=string.charCodeAt(i);
  }
  return totalNameValue;
};

});





})();
