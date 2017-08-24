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
      /*save: {
        method: 'POST',
        isArray: false,
        transformRequest: function(data) {
          console.log(data);
        }
      }*/
    });
  })
// FeatureSet resource
  .factory('FeatureSet', function($resource) {
    return $resource('http://192.168.1.25:9200/_ltr/_featureset/:id', null, {
      create: {
        method: 'POST',
        isArray: false,
        url: 'http://192.168.1.25:9200/_ltr/_featureset/:id/_addfeatures/:query'
      },
      createModel: {
        method: 'POST',
        isArray: false,
        url: 'http://192.168.1.25:9200/_ltr/_featureset/:id/_createmodel'
      },
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
// LtrModel resource
  .factory('LtrModel', function($resource) {
    return $resource('http://192.168.1.25:9200/_ltr/_model/:id', null, {
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
