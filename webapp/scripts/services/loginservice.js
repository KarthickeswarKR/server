'use strict';

/**
 *@Author PalMurugan C
 *
 * @Description Login authentication service
 */

vgApp.factory('loginService', function($http) {

	var sdo = {

		// Service for authenticating user	
		authenticateUser : function(userName, password) {

			var promise = $http({
				url : 'https://developserver.herokuapp.com/demo/api/oauth/token',
				method : "GET",				
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	            transformRequest: function(obj) {
	                var str = [];
	                for(var p in obj)
	                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	                return str.join("&");
	            },
	            data : {
					"username" : userName,
					"password" : password,
					"client_id" : "$vgodown1",
					"client_secret": "grnklnio576543hyjvbk",
					"grant_type":"password"
				}

			}).success(function(data) {				
				return data;
				
			}).error(function(data){
				return data;
				
			});

			return promise;
		},
		registerUser : function(data){
			var promise = $http({
				url : 'https://developserver.herokuapp.com/demo/api/users/adduser',
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
		signUpComplete : function(data){
			var promise = $http({
				url : 'https://developserver.herokuapp.com/demo/api/stockarea/addstockarea',
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