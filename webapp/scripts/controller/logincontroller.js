'use strict';

angular.module('vgApp.views.login',[]);

vgApp.config(function($stateProvider){

	$stateProvider.state('login',{
		url:'/login',
		templateUrl : 'views/login/login.html',
		controller : 'loginController'
	}).state('forgotPassword',{
        url:'/forgotPassword',
        templateUrl : 'views/login/forgot-password.html',
        controller : 'forgotPasswordController'
	}).state('resetPassword',{
        url:'/resetPassword',
        templateUrl : 'views/login/reset-password.html',
        controller : 'resetPasswordController'
    }).state('onVerifyAction',{
        url:'/onVerifyAction/{token}',
        templateUrl : 'views/login/login.html',
        controller : 'onVerifyActionController'
    }).state('signUp',{
        url:'/signUp',
        templateUrl : 'views/login/signUp.html',
        controller : 'signupController'
    }).state('signUp2',{
        url:'/signUp2',
        templateUrl : 'views/login/signUp2.html',
        controller : 'signupController2'
    });
});

/**
 * Login Controller
 * Here we are going to handle user authentication and all
 */
vgApp.controller('loginController',function($scope,$state,$log,loginService,Notification,localStorageService){
    /*
     * Function for authenticating user
     */
    $scope.fnAuthenticateUser = function() {
        // Calling authentication Service here with userName and Password
        loginService.authenticateUser($scope.username, $scope.password).then(function (result) {
            if (result.data.access_token != null) {

                if (localStorageService.isSupported) {
                    localStorageService.set("accessToken", result.data.access_token);
                    localStorageService.set("userId", result.data.userId);

                    $log.info("User Authenticated Successfully");
                    $state.go("home");
                } else {
                    Notification.error('System Error');
                }

            }
        }, function (error) {
            Notification.error('Invalid Username/Password');
            $log.info("Invalid UserName/Password");

        });
    }
});



vgApp.controller('signupController',function($scope,$rootScope,$state,$log,loginService,Notification,localStorageService){
    console.log('loginController');
    // Register user function calling here!
    $scope.fnRegisterUser = function(){
        $scope.data = {
            firstName : $scope.firstName,
            lastName : $scope.lastName,
            email : $scope.email,
            password : $scope.userPassword
        };
         //$state.go("signUp2");
        loginService.registerUser($scope.data).then(function(result){
            loginService.authenticateUser($scope.email, $scope.userPassword).then(function(result){
                
                console.log('signUp2....');
                //$state.go("signUp2");
                    if(localStorageService.isSupported){
                        localStorageService.set("accessToken", result.data.access_token);
                        localStorageService.set("userId", result.data.userId);

                        $log.info("User Authenticated Successfully");
                        $state.go("signUp2");
                    }else {
                         //$state.go("signUp2");
                        Notification.error('System Error');
                    }
                
            });
        });
    };
});


vgApp.controller('signupController2',function($scope,$rootScope,$state,$log,loginService,Notification,localStorageService){
    console.log('signupController2');
    // Register user function calling here!
    $scope.fnsignUpComplete = function(){
        $scope.data = {
            stockareaName   : $scope.stockareaName,
            latitude        : $scope.latitude,
            longtitude      : $scope.longtitude,
            address         : $scope.address,
            phone           : $scope.phone
        };

        loginService.signUpComplete($scope.data).then(function(result){
if (result.data.status=='success') {

    console.log(result.data);
    $state.go("home");
}
            

        });
    };
});


vgApp.controller('forgotPasswordController',function($scope,loginService,Notification){

	// Sending change password URL
	$scope.fnSendChangePasswordURL = function(){

        $scope.data = {
            username : $scope.email
        };

       loginService.forgotPassword($scope.data).then(function(result){

           if(result.data == "error"){
               Notification.error(result.data.data);
           }else {
               Notification.success("Please check your mail to reset password..");
           }
       });
	};
});

vgApp.controller('onVerifyActionController',function($scope,$rootScope,loginService,$stateParams,$state,Notification){

    loginService.verifyToken($stateParams.token).then(function(result){

        if(result.data.status == "error"){
            Notification.error("Invalid Token");
        }else {
           $rootScope.userEmail = result.data.data.username;
           $state.go("resetPassword");
        }
    });
});

vgApp.controller('resetPasswordController',function($scope,$rootScope,$state,loginService,Notification){

    if($rootScope.userEmail === null || $rootScope.userEmail == undefined){
        $state.go("login");
    }

    $scope.updatePassword = function () {
        $scope.data = {
            userEmail : $rootScope.userEmail,
            password : $scope.confirmPassword
        };

        loginService.updatePassword($scope.data).then(function(result){
            //Notification.success("Password has been changed.");
            $state.go("login");
        });
    }
});
