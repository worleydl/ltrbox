'use strict';

/**
 * @ngdoc function
 * @name ltrboxApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ltrboxApp
 */
angular.module('ltrboxApp')
  .controller('MainCtrl', ['$scope', '$state', '$stateParams', '$timeout', 'Feature', function ($scope, $state, $stateParams, $timeout, Feature) {
    $scope.activeFeature = $stateParams.activeFeature;
    $scope.featuresReady = false;

    $scope.refreshFeatures = function() {
      $scope.features = Feature.query(function() {
          $scope.featuresReady = true;
      });
    }
    $scope.refreshFeatures();

    $scope.resetFields = function() {
      $scope.form = {
        featureBody: '',
        featureLanguage: '',
        featureName: '',
      };
    }

    if($stateParams.activeFeature) {
      var feature = $stateParams.activeFeature._source.feature;

      $scope.form = {
        featureBody: JSON.stringify(feature.template),
        featureLanguage: feature.template_language,
        featureName: feature.name
      };
    } else {
      $scope.resetFields();
    }

    $scope.deleteFeature = function(feature) {
      Feature.delete({id: feature._source.feature.name}, function() {
        // Splicing instead of refreshing because of delay in the ES API
        var index = $scope.features.indexOf(feature);
        $scope.features.splice(index, 1);
      });
    };

    $scope.saveFeature = function() {
      var featureData = {
        name: $scope.form.featureName,
        params: ['query_string'],
        template_language: $scope.form.featureLanguage,
        template: JSON.parse($scope.form.featureBody)
      };

      Feature.save({id: $scope.form.featureName}, featureData);

      // TODO: There's some slight latency before the feature becomes available? The timeout ensures it pops up.
      $timeout(function(){
        $state.go('features');
      }, 250);
    };
  }]);
