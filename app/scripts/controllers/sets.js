'use strict';

/**
 * @ngdoc function
 * @name ltrboxApp.controller:FeatureSetCtrl
 * @description
 * # FeatureSetCtrl
 * Controller of the ltrboxApp
 */
angular.module('ltrboxApp')
  .controller('FeatureSetCtrl', ['$scope', '$state', '$timeout', 'FeatureSet', function ($scope, $state, $timeout, FeatureSet) {
    $scope.dataReady = false;

    // Get a list of features
    $scope.sets = FeatureSet.query(function() {
        $scope.dataReady = true;
    });

    $scope.form = {
      featureQuery: '',
      setName: ''
    };

    $scope.createSet = function() {
        FeatureSet.create({id: $scope.form.setName, query: $scope.form.featureQuery}, null, function() {
          // TODO: There's some slight latency before the set becomes available? The timeout ensures it pops up.
          $timeout(function(){
            $state.go('sets');
          }, 250);
        });
    };

    $scope.deleteSet = function(set) {
      FeatureSet.delete({id: set._source.name}, function() {
        var index = $scope.sets.indexOf(set);
        $scope.sets.splice(index, 1);
      });
    }

  }]);
