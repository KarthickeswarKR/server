'use strict';

/**
 * @Author PalMurugan C
 */

angular.module('vgApp.views.common',[]);


vgApp.controller('dashboardHeaderController',function($scope,dashboardService,$uibModal){

	console.log("I am in dashboardHeaderController...");


$scope.addStockarea=function(id){
  var dialogInst = $uibModal.open({
                templateUrl: '/views/dashboard/addStockarea.html',
                controller: 'addStockareaCtrl',
                size: 'lg',
                resolve: {
                  stockareaid: function () {
                      return '13213223';
                      },
                      productid:function(){
                        return '234234234';
                            }
                          }
                        });
                dialogInst.result.then(function(fmsid) {
                          console.log(materialId);
                          console.log(fmsid);
                            }, function () {
                              console.log('Modal dismissed at: ' + new Date());
                            });
};
        $scope.logout = function(){
         //$state.go("signUp2");
        dashboardService.logout(localStorage.getItem("userId"),localStorage.getItem("access_token")).then(function(result){
localStorage.removeItem("userId");
localStorage.removeItem("access_token");

console.log(result);
        });
    };

	/*
	   getUserDetails <-   informa

	   $scope.userName = data.userName;
	 */
     /*
dashboardService.getStockArea(localStorage.getItem("userId")).then(function (result) {
            if (result.data.stockarea != null) {
            	$scope.stockarea = result.data.stockarea;

            }
        }, function (error) {
            Notification.error('Stockarea Not Available');
            $log.info("Invalid UserName/Password");

        });
var trace1 = {
        x: [1, 2, 3, 4],
        y: [10, 15, 13, 17],
        type: 'scatter'
    };

    var trace2 = {
        x: [1, 2, 3, 4],
        y: [16, 5, 11, 9],
        type: 'scatter'
    };

    var trace3 = {
        x: [1, 2, 3, 4],
        y: [23, 4, 2, 6],
        type: 'scatter'
    };

    var trace4 = {
        x: [1, 2, 3, 4],
        y: [9, 11, 3, 12],
        type: 'scatter'
    };
    $scope.graphPlots = [trace1, trace2, trace3, trace4];
*/

});




vgApp.directive('linePlot', [function () {
    function linkFunc(scope, element, attrs) {
        scope.$watch('graphPlots', function (plots) {
            Plotly.newPlot(element[0], plots,{displayModeBar: false});
        });
    }

    return {
        link: linkFunc
    };
}]);







vgApp.controller('addStockareaCtrl', ['$scope', '$uibModalInstance', 'stockareaid', 'productid', '$state', '$timeout', '$uibModal', '$rootScope', function($scope, $uibModalInstance, stockareaid, productid, $state, $timeout, $uibModal, $rootScope) {


$scope.initMap = function () {
    var map2 = new google.maps.Map(document.getElementById('map2'), {
    zoom: 3,
    center: {lat: 0, lng: -180},
    mapTypeId: 'terrain'
  });
    //google.maps.event.trigger(map2, "resize");
}

    var id = productid;
    $scope.stockareaid = stockareaid;
    $scope.productid = productid;
    console.log(
        "in infooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo"
    );
    $scope.close = function() {
        $uibModalInstance.dismiss('cancel');
    };
		$scope.add=function(){

		}
    $scope.view = function() {
        console.log(id);
        console.log("in material view");

    };



}]);
