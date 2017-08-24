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
    $urlRouterProvider.otherwise('/features');
    $stateProvider
      .state('features', {
        url: '/features',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
      })
      .state('edit-feature', {
        url: '/features/edit',
        templateUrl: 'views/feature-edit.html',
        controller: 'MainCtrl',
        params: {
          activeFeature: null
        }
      })
      .state('sets', {
        url: '/sets',
        templateUrl: 'views/sets.html',
        controller: 'FeatureSetCtrl'
      })
      .state('create-set', {
        url: '/sets/create',
        templateUrl: 'views/create-set.html',
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
