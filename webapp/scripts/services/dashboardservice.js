'use strict';

/**
 *@Author Rajasekar
 *
 * @Description Dashboard service
 */


vgApp.factory('dashboardService', function($http) {

	var sdo = {

		// Service for getting stockarea	
		getStockArea : function(userId) {

			var promise = $http({
				url : 'https://developserver.herokuapp.com/demo/api/products/getstockareas',
				method : "GET",				
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	            transformRequest: function(obj) {
	                var str = [];
	                for(var p in obj)
	                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	                return str.join("&");
	            },
	            data : {
					"userId":userId
				}

			}).success(function(data) {				
				return data;
				
			}).error(function(data){
				return data;
				
			});

			return promise;
		},

		getStockAreaProducts : function(userId,stockareaId) {

			var promise = $http({
				url : 'https://developserver.herokuapp.com/demo/api/products/getproductsofstockarea',
				method : "GET",				
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	            transformRequest: function(obj) {
	                var str = [];
	                for(var p in obj)
	                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	                return str.join("&");
	            },
	            data : {
					"userId":userId,
					"stockareaId":stockareaId
				}

			}).success(function(data) {				
				return data;
				
			}).error(function(data){
				return data;
				
			});

			return promise;
		},
		getOrderHistory : function(stockareaId) {

			var promise = $http({
				url : 'https://developserver.herokuapp.com/demo/api/orders/getordersofstockarea',
				method : "GET",				
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	            transformRequest: function(obj) {
	                var str = [];
	                for(var p in obj)
	                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	                return str.join("&");
	            },
	            data : {
					"stockareaId":stockareaId
				}

			}).success(function(data) {				
				return data;
				
			}).error(function(data){
				return data;
				
			});

			return promise;
		},
		addProductsToStcokarea : function(stockareaId,products) {
			console.log(stockareaId,products);
var data1 = {
					"stockareaId":stockareaId,
					"products":products
				};
				console.log(data1);
			var promise = $http({
				url : 'https://developserver.herokuapp.com/demo/api/stockarea/updateproducts',
				method : "POST",				
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	            transformRequest: function(obj) {
	                var str = [];
	                for(var p in obj)
	                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	                return str.join("&");
	            },
	            data : {
					"stockareaId":stockareaId,
					"products":products
				}

			}).success(function(data) {				
				return data;
				
			}).error(function(data){
				return data;
				
			});

			return promise;
		},
		addOrder : function(data) {
			console.log('inside dashboardService');
			
				console.log(data);
			var promise = $http({
				url : 'https://developserver.herokuapp.com/demo/api/order/addorder',
				method : "POST",				
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	            transformRequest: function(obj) {
	                var str = [];
	                for(var p in obj)
	                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	                return str.join("&");
	            },
	            data : data

			}).success(function(data) {				
				return data;
				
			}).error(function(data){
				return data;
				
			});

			return promise;
		},
		registerUser : function(data){
			var promise = $http({
				url : '/api/users/addUser',
				method : "POST",
				headers: {'Content-Type': 'application/json'},
				data : data
			}).success(function(data) {
				return data;

			}).error(function(data){
				return data;

			});
			return promise;
		},
        forgotPassword : function(data){
            var promise = $http({
                url : '/api/users/resetPassword',
                method : "POST",
                headers: {'Content-Type': 'application/json'},
                data : data
            }).success(function(data) {
                return data;

            }).error(function(data){
                return data;

            });
            return promise;
        },
		verifyToken : function(token) {
			var promise = $http({
				url : '/api/users/onVerifyAction',
				method : "GET",
				headers: {'Content-Type': 'application/json'},
				params : {"token":token}
			}).success(function(data) {
				return data;

			}).error(function(data){
				return data;

			});
			return promise;
		},
		deleteStockarea : function(stockareaId) {
			var promise = $http({
				url : 'https://developserver.herokuapp.com/demo/api/stockarea/delete',
				method : "POST",
				headers: {'Content-Type': 'application/json'},
				data   : {
					"stockareaId": stockareaId
				}
			}).success(function(data) {
				return data;

			}).error(function(data){
				return data;

			});
			return promise;
		},
		getOrderInvoice : function(stockareaId,orderid) {
			var promise = $http({
				url : 'https://developserver.herokuapp.com/demo/api/orders/getorderdetails',
				method : "get",
				headers: {'Content-Type': 'application/json'},
				data   : {
					"stockareaId": stockareaId,
					"orderId": orderid
				}
			}).success(function(data) {
				return data;

			}).error(function(data){
				return data;

			});
			return promise;
		},

		logout : function(userId,access_token) {
			var promise = $http({
				url : 'https://developserver.herokuapp.com/demo/api/users/logout',
				method : "get",
				headers: {'Content-Type': 'application/json'},
				data   : {
					"userId": userId,
					"access_token": access_token
				}
			}).success(function(data) {
				return data;

			}).error(function(data){
				return data;

			});
			return promise;
		},


		deleteProduct : function(stockareaId,productId) {
			var promise = $http({
				url : ':https://developserver.herokuapp.com/demo/api/product/delete',
				method : "post",
				headers: {'Content-Type': 'application/json'},
				data   : {
					"stockareaId": stockareaId,
					"productId"	 : productId
				}
			}).success(function(data) {
				return data;

			}).error(function(data){
				return data;

			});
			return promise;
		},
		renameStockarea : function(renameStockareaValue,stockareaId) {
			console.log(renameStockareaValue);

			var promise = $http({
				url : 'https://developserver.herokuapp.com/demo/api/stockarea/rename',
				method : "post",
				headers: {'Content-Type': 'application/json'},
				data   : {
					"stockareaId"		 : stockareaId,
					"renameStockarea"	 : renameStockareaValue
				}
			}).success(function(data) {
				return data;

			}).error(function(data){
				return data;

			});
			return promise;
		},
		updatePassword : function(data) {
			var promise = $http({
				url : '/api/users/updatePassword',
				method : "POST",
				headers: {'Content-Type': 'application/json'},
				data : data
			}).success(function(data) {
				return data;

			}).error(function(data){
				return data;

			});
			return promise;
		}
	};
	return sdo;
});