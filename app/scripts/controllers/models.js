'use strict';

/**
 * @ngdoc function
 * @name ltrboxApp.controller:LtrModelCtrl
 * @description
 * # LtrModelCtrl
 * Controller of the ltrboxApp
 */
angular.module('ltrboxApp')
  .controller('LtrModelCtrl', ['$scope', '$state', '$stateParams', '$timeout', 'LtrModel', 'FeatureSet', function ($scope, $state, $stateParams, $timeout, LtrModel, FeatureSet) {
    if($state.current.name == 'create-model' && !$stateParams.featureSet) {
      $state.go('sets');
    }

    $scope.dataReady = false;
    $scope.featureSet = $stateParams.featureSet;

    // Get a list of models
    $scope.models = LtrModel.query(function() {
        $scope.dataReady = true;
        console.log($scope.models);
    });

    $scope.createModel = function() {
      var modelData = {
        name: $scope.form.modelName,
        model : {
          type: $scope.form.modelType,
          definition: JSON.parse($scope.form.modelBody)
        }
      };

      FeatureSet.createModel({id: $scope.featureSet.name}, modelData, function(){
        $timeout(function(){
          $state.go('models');
        }, 250);
      });
    };

    $scope.deleteModel = function(model) {
      LtrModel.delete({id: model._source.name}, function() {
        var index = $scope.models.indexOf(model);
        $scope.models.splice(index, 1);
      });
    }
  }]);
