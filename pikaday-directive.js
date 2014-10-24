angular.module('pikaday', [])

    .constant('PikadayConfig', {})

    .directive('pikaday', ['PikadayConfig', function(PikadayConfig) {
        PikadayConfig = PikadayConfig || {};

        return {
            scope: {
                date: '=pikaday'
            },
            link: function ($scope, elem, attrs) {
                var options = {
                    field: elem[0]
                };

                angular.extend(options, PikadayConfig, attrs.pikadayConfig ? $scope.$parent.$eval(attrs.pikadayConfig) : {});

                var onSelect = options.onSelect;

                if (options.setDefaultDate) {
                    $scope.date = options.setDefaultDate;
                }

                options.onSelect = function(date) {
                    $scope.date = date;
                    $scope.$apply($scope.date);

                    if (angular.isFunction(onSelect)) {
                        onSelect(date);
                    }
                };

                var picker = new Pikaday(options);

                $scope.$on('$destroy', function() {
                    picker.destroy();
                });
            }
        };
    }]);