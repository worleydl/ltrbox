'use strict';

/**
 * @ngdoc overview
 * @name ltrboxApp
 * @description
 * # ltrboxApp
 *
 * Main module of the application.
 */
angular
  .module('ltrboxApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .state('sets', {
        url: '/sets',
        templateUrl: 'views/sets.html',
        controller: 'FeatureSetCtrl'
      })
      .state('models', {
        url: '/models',
        templateUrl: 'views/models.html',
        controller: 'LtrModelCtrl'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      });
  });
