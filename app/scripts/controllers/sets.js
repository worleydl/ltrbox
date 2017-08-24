'use strict';

/**
 * @ngdoc function
 * @name ltrboxApp.controller:FeatureSetCtrl
 * @description
 * # FeatureSetCtrl
 * Controller of the ltrboxApp
 */
angular.module('ltrboxApp')
  .controller('FeatureSetCtrl', ['$scope', 'FeatureSet', function ($scope, FeatureSet) {
    $scope.dataReady = false;

    // Get a list of features
    $scope.sets = FeatureSet.query(function() {
        $scope.dataReady = true;
        console.log($scope.sets);
    });
  }]);
