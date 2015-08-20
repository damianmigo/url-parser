var app = angular.module('app', [])

    .controller('UrlParserCtrl', ['$scope', function($scope) {
        $scope.parse = function() {
            var anchorElement = document.createElement('a');
            anchorElement.href = $scope.url;

            $scope.result = {
                components: {
                    hostname: anchorElement.hostname,
                    port: anchorElement.port,
                    protocol: anchorElement.protocol,
                    pathname: anchorElement.pathname
                },
                params: []
            };

            var queryString = anchorElement.search;
            if (queryString !== '') {
                var paramList = queryString.substring(1).split('&');
                angular.forEach(paramList, function(param) {
                    var paramComponents = param.split('=');
                    $scope.result.params.push({key: paramComponents[0], value: paramComponents[1]});
                });
            }
        };
    }])

    .directive('urlParser', function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/parser.html'
        }
    });