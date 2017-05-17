'use strict';

/**
 * @author PalMurugan C
 */

var vgApp = angular.module('vgApp', [
    'ui.router',
    'ui.bootstrap',
    'ui-notification',
    'LocalStorageModule',
    'angular-loading-bar',
    'angularValidator',
    'vgApp.views.login',
    'vgApp.views.dashboard',
    'vgApp.views.common'
]);

vgApp.config(function ($urlRouterProvider, $stateProvider, $httpProvider) {
    console.log('loginController');
    $urlRouterProvider.otherwise('/login');
     

});

vgApp.config(function(NotificationProvider) {
        NotificationProvider.setOptions({
            delay: 2000,
            startTop: 20,
            startRight: 10,
            verticalSpacing: 20,
            horizontalSpacing: 20,
            positionX: 'left',
            positionY: 'top'
        });
    });

vgApp.config(function ($httpProvider, $urlRouterProvider) {

    /**
     *  Need to convert this into purely service based
     *
     */
    $httpProvider.interceptors.push(function ($injector, $location) {

        return {
            request: function (config) {

                if (config.url.indexOf('/') === 0) {

                    // create instance for systemService
                    var systemService = $injector.get("SystemService");

                    if (config.url.indexOf('oauth/token') > -1) {

                        config.url = config.url; //systemService.getCurrentInstance().authServiceName + config.url;

                    } else {

                        var access_token = systemService.getCurrentAccessToken();

                        if (access_token == null) {
                            $location.path('/login')
                        } else {
                           // config.url = systemService.getCurrentInstance().serviceName + config.url;
                            config.url = config.url;
                            config.headers.authorization = "Bearer " + access_token;
                        }
                    }
                }

                return config;
            }
        }

    });
});
