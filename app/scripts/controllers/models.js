'use strict';

/**
 * @ngdoc function
 * @name ltrboxApp.controller:LtrModelCtrl
 * @description
 * # LtrModelCtrl
 * Controller of the ltrboxApp
 */
angular.module('ltrboxApp')
  .controller('LtrModelCtrl', ['$scope', 'LtrModel', function ($scope, LtrModel) {
    $scope.dataReady = false;

    // Get a list of models
    $scope.models = LtrModel.query(function() {
        $scope.dataReady = true;
        console.log($scope.models);
    });
  }]);
