'use strict';

/**
 * @ngdoc function
 * @name ltrboxApp.controller:LtrModelCtrl
 * @description
 * # LtrModelCtrl
 * Controller of the ltrboxApp
 */
angular.module('ltrboxApp')
  .controller('LtrModelCtrl', ['$scope', '$state', '$stateParams', '$timeout', 'LtrModel', 'FeatureSet', 'Tmdb', function ($scope, $state, $stateParams, $timeout, LtrModel, FeatureSet, Tmdb) {
    if($state.current.name == 'create-model' && !$stateParams.featureSet) {
      $state.go('sets');
    }

    $scope.dataReady = false;
    $scope.featureSet = $stateParams.featureSet;

    $scope.form = {
      query: '',
      selectedModel: ''
    };

    // Get a list of models
    $scope.models = LtrModel.query(function() {
        $scope.dataReady = true;
        $scope.modelNames = [];
        angular.forEach($scope.models, function(model) {
          $scope.modelNames.push(model._source.name);
        });
    });


    $scope.search = function() {
      var regSearch = {
          _source: ['original_title'],
          query: {
            match: {
              _all: $scope.form.query
            }
          }
      };

      var ltrSearch = {
        _source: ['original_title'],
        query: {
          match: {
            _all: $scope.form.query
          }
        },
        rescore: {
         query: {
            rescore_query: {
              sltr: {
                 model: $scope.form.selectedModel,
                 params: {
                     query_string: $scope.form.query
                 }
             }
            }
         }
       }
     };

      $scope.results = Tmdb.search({}, regSearch, function() {
        // No-op
      });

      $scope.ltrResults = Tmdb.search({}, ltrSearch, function() {
        console.log($scope.ltrResults);
        // No-op
      });
    };

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
