var misDatosTorta = angular.module('angularSpa').controller('rankingController',function($scope,$http){
        $scope.importarRank = function(){
            $http.get('http://localhost:8080/WW3App/rankingJSON/').success(function(datos2){
                $scope.dataRank = datos2;

                
            });
        }
        $scope.importarRank();
    }
);

