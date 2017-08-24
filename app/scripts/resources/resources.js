'use strict';

angular.module('ltrboxApp')
// Feature Resource
  .factory('Feature', function ($resource) {
    return $resource('http://192.168.1.25:9200/_ltr/_feature/:id', null, {
      query: {
        method: 'GET',
        isArray: true,
        transformResponse: function(data) {
          var j_obj = angular.fromJson(data);
          return j_obj.hits.hits;
        }
      }
    });
  })
// FeatureSet resource
  .factory('FeatureSet', function($resource) {
    return $resource('http://192.168.1.25:9200/_ltr/_featureset/:id', null, {
      query: {
        method: 'GET',
        isArray: true,
        transformResponse: function(data) {
          var j_obj = angular.fromJson(data);
          return j_obj.hits.hits;
        }
      }
    });
  });