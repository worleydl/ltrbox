'use strict';

/**
 * @ngdoc function
 * @name ltrboxApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ltrboxApp
 */
angular.module('ltrboxApp')
  .controller('MainCtrl', ['$scope', 'Feature', function ($scope, Feature) {
    $scope.featuresReady = false;

    // Get a list of features
    $scope.features = Feature.query(function() {
        $scope.featuresReady = true;
        console.log($scope.features);
    });
  }]);
