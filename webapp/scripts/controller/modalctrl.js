'use strict';
vgApp.controller('AdminPagematerialviewctrl', ['$scope', '$modalInstance', 'selectedUsr', 'data', '$state', '$timeout', '$modal', '$rootScope', 'materialviewservice', function($scope, $modalInstance, selectedUsr, data, $state, $timeout, $modal, $rootScope, materialviewservice) {
    var id = data;
    $scope.selectedUsr = selectedUsr;
    console.log(
        "in infooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo"
    );
    $scope.close = function() {
        $modalInstance.dismiss('cancel');
    };
    $scope.view = function() {
        console.log(id);
        console.log("in material view");
        materialviewservice.getmaterial(id).then(function(response) {
            $scope.selectedUsr.name = response.data.name;
            $scope.selectedUsr.casno = response.data.CasNo;
            $scope.selectedUsr.unit = response.data.unit;
            $scope.selectedUsr.othernames = response.data.otherName;
            $scope.selectedUsr.filters = response.data.filters;
            console.log(response.data.name);
            console.log("in response");
            console.log(response);
            console.log($scope.selectedUsr.filters);
        }, function(err) {
            console.log(err);
        });
    };
    $scope.edit = function() {
        materialviewservice.getmaterial(id).then(function(response) {
            var filter = [];
            var temp = {};
            $scope.selectedUsr.name = response.data.name;
            $scope.selectedUsr.othernames = response.data.otherName;
            $scope.selectedUsr.casno = response.data.CasNo;
            $scope.selectedUsr.unit = response.data.unit;
            var filters = response.data.filters;
            Object.keys(filters).forEach(function(key) {

                var data = filters[key];
                console.log(data);
                console.log("data length"+data.length);
                for (i = 0; i < data.length; i++) {
                    //console.log("value" + data[i]);
                    temp.name = key;
                    temp.value = data[i].name;
                    //console.log("name" + data[i].name);
                    filter.push(temp);
                    temp={};
                    //console.log(filter);
                }
            })
            //console.log(filter);
            $scope.selectedUsr.filters = filter;
            //console.log("in response");

        }, function(err) {
            console.log(err);
        });

    }
    $scope.addmore=function(){
      console.log("in addmore");
      $scope.selectedUsr.filters.push(
        {
          "name":"",
          "value":""
        }
      );
      console.log($scope.filters);
    };
$scope.remove=function(key,value){
var j;
  for(i=0;i<$scope.selectedUsr.filters.length;i++){
    if($scope.selectedUsr.filters[i].name==key && $scope.selectedUsr.filters[i].value==value){
      j=i;
    }
  }
$scope.selectedUsr.filters.splice(j,1);
};
    $scope.submit = function() {
        console.log($scope);
        console.log($scope.selectedUsr.filters);

        var filters=$scope.selectedUsr.filters;
        var keys=[];
        var key=[];
        var filter={};
for(i=0;i<filters.length;i++){
  if(keys.indexOf(filters[i].name) === -1) {
    keys.push(filters[i].name);
  }
}
console.log(keys);
for(j=0;j<keys.length;j++){
console.log(keys[j]);
console.log("in key");
var temp= [];
//filter.push({keys[j]:[]})
console.log(filter);
for(i=0;i<filters.length;i++){
console.log("in filters");
if(filters[i].name==keys[j]){
  console.log("in if");
  temp.push({
        "name":filters[i].value
  });
  console.log("temp");
  console.log(temp);
}
}
console.log(temp);
var k=keys[j];
filter[keys[j]]=temp;
}
console.log("filter");
console.log(filter);
        materialviewservice.editmaterial(id, $scope.selectedUsr.name, $scope.selectedUsr.othernames,filter,$scope.selectedUsr.casno,$scope.selectedUsr.unit).then(function(response) {
            console.log("in view");
            console.log(response.data);
            $scope.name = response.data.name;
            $scope.othernames = response.data.otherName;
            $scope.filters = response.data.filters;
            $modalInstance.close();
        })
    }
}]);

