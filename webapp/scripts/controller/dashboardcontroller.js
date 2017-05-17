'use strict';

/**
 * @Author PalMurugan C
 */

angular.module('vgApp.views.dashboard',[]);

vgApp.config(function($stateProvider){

	$stateProvider.state('home',{
		url:"/home",
		templateUrl:'views/dashboard/home.html',
		controller:'homeController'
	});
});

vgApp.controller('homeController',function($scope,dashboardService,$uibModal){

	console.log("I am in Home...");

//autocomplete start 


  $scope.autocomplete=function(){
  console.log("in autocomplete");
  $("#autocompletesearch").autocomplete({
      source: function (request, response) {
        console.log("insource");
          $.ajax({
              dataType: "json",
              data: {
                  term: request.term,
              },
              type: 'Get',
              contentType: 'application/json; charset=utf-8',
              xhrFields: {
                  withCredentials: false
              },
              crossDomain: true,
              cache: true,
              url: 'https://developserver.herokuapp.com/demo/api/products/autocomplete',
              success: function (data) {

                  var array = $.map(data.products, function (item) {
                    console.log(item);
                      return {
                          label: item.productName,
                          value: item.productName
                      }
                  });

                  //call the filter here
                  response($.ui.autocomplete.filter(array, request.term));
              },
              error: function (data) {

              }
          });
      },
      minLength: 1,
      open: function () {
        console.log("open");

      },
      close: function () {

      },
      focus: function (event, ui) {

      },
      select: function (event, ui) {

      }
  });
};


//autocomplete end



$scope.viewbuy=function(id){
  var dialogInst = $uibModal.open({
                templateUrl: '/views/dashboard/materialview.html',
                controller: 'AdminPagematerialviewctrl',
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
}
//InvoiceViewCtrl
$scope.viewInvoice=function(orderId){
  console.log('inside view invoice');
  var dialogInst = $uibModal.open({
                templateUrl: '/views/dashboard/invoiceview.html',
                controller: 'InvoiceViewCtrl',
                size: 'lg',
                resolve: {
                  stockareaid: function () {
                      return '13213223';
                      },
                      orderid:function(){
                        return orderId;
                            }
                          }
                        });
                dialogInst.result.then(function(fmsid) {
                          console.log(materialId);
                          console.log(fmsid);
                            }, function () {
                              console.log('Modal dismissed at: ' + new Date());
                            });
}




//InvoiceViewCtrl END
    $scope.addProductsToStockarea = function(){
         //$state.go("signUp2");
         $scope.stockareaId = '234234324';
        dashboardService.addProductsToStcokarea($scope.stockareaId,$scope.selection).then(function(result){

console.log(result);
        });
    };



        $scope.deleteStockarea = function(){
         //$state.go("signUp2");
         $scope.stockareaId = '234234324';
        dashboardService.deleteStockarea($scope.stockareaId).then(function(result){

console.log(result);
        });
    };

            $scope.deleteProduct = function(){
         //$state.go("signUp2");
         $scope.stockareaId = '234234324';
         $scope.productId = '234234324';

        dashboardService.deleteProduct($scope.stockareaId, $scope.productId).then(function(result){

console.log(result);
        });
    };


            $scope.renameStockarea = function(){

        dashboardService.renameStockarea($scope.renameStockareaValue,$scope.stockareaId).then(function(result){

console.log(result);
        });
    };




//Check Box Selection

  $scope.products = ['213', '3423345', '54645645', '432424'];

  // Selected fruits
  $scope.selection = [];

  // Toggle selection for a given fruit by name
  $scope.toggleSelection = function toggleSelection(productName) {
    var idx = $scope.selection.indexOf(productName);

    // Is currently selected
    if (idx > -1) {
      $scope.selection.splice(idx, 1);
    }

    // Is newly selected
    else {
      $scope.selection.push(productName);
    }
  };









	/*
	   getUserDetails <-   informa

	   $scope.userName = data.userName;
	 */
dashboardService.getStockArea(localStorage.getItem("userId")).then(function (result) {
            if (result.data.stockarea != null) {
            	$scope.stockarea = result.data.stockarea;

            }
        }, function (error) {
            Notification.error('Stockarea Not Available');
            $log.info("Invalid UserName/Password");

        });
dashboardService.getStockAreaProducts(localStorage.getItem("userId"),$scope.stockareaId).then(function (result) {
            if (result.data != null) {
              $scope.products = result.data.products;
             console.log( $scope.products);

            }
        }, function (error) {
            Notification.error('Stockarea Not Available');
            $log.info("Invalid UserName/Password");

        });

dashboardService.getOrderHistory($scope.stockareaId).then(function (result) {
            if (result.data != null) {
              $scope.orderHistories = result.data.orders;
             console.log(result.data);

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







vgApp.controller('AdminPagematerialviewctrl', function($scope,dashboardService, $uibModalInstance, stockareaid, productid, $state, $timeout, $uibModal, $rootScope) {
    var id = productid;
    $scope.stockareaid = stockareaid;
    $scope.productid = productid;
    console.log(
        "in infooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo"
    );
    $scope.close = function() {
        $uibModalInstance.dismiss('cancel');
    };
    $scope.view = function() {
        console.log(id);
        console.log("in material view");

    };
    
        $scope.addOrder = function(){
         console.log("inside add order");
         $scope.stockareaId = '234234324';
$scope.orderProductId = '234234234';
$scope.orderProductStockId = '234234234';
$scope.orderSellId = '34534534534';
$scope.orderStockareaId = 'sdafdsafsdaf';
$scope.orderOrderName = 'Cements';
$scope.orderDestinationStockareaId = '34239423';
$scope.orderQuantity = '234MT';
$scope.orderCost = '123';
$scope.orderSource = 'Madurai';
$scope.orderDestination = 'Chennai';
$scope.orderMaterial = 'Cements';
$scope.orderBrand = 'India Cements';
$scope.orderVariant = 'OPS43';
$scope.orderPackage = '25KG';
$scope.orderPaymentTerms = 'Cash on Delivery';


var data={
"productId":$scope.orderProductId,
"productStockId":$scope.orderProductStockId,
"sellId":$scope.orderSellId,
"stockareaId":$scope.orderStockareaId,
"orderName":$scope.orderOrderName,
"destinationStockareaId":$scope.orderDestinationStockareaId,
"quantity":$scope.orderQuantity,
"cost":$scope.orderCost,
"source": $scope.orderSource,
"destination": $scope.orderDestination,
"material": $scope.orderMaterial,
"brand": $scope.orderBrand,
"variant": $scope.orderVariant,
"package": $scope.orderPackage,
"paymentterms": $scope.orderPaymentTerms
};
console.log(dashboardService);
        dashboardService.addOrder(data).then(function(result){

console.log(result);
$uibModalInstance.dismiss('cancel');
        }, function (error) {
            Notification.error('Stockarea Not Available');
            $log.info("Invalid UserName/Password");

        });
    };

   
});


vgApp.controller('InvoiceViewCtrl', function($scope,dashboardService, $uibModalInstance, stockareaid, orderid, $timeout, $uibModal) {

    console.log(
        "in invoice"
    );
    $scope.close = function() {
        $uibModalInstance.dismiss('cancel');
    };
dashboardService.getOrderInvoice(stockareaid,orderid).then(function(result){
console.log(result);
        }); 

   
});