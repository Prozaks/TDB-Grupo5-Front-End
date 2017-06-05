angular.module('angularSpa')
    .service('actorsService', function($http){
        var urlBase = 'http://localhost:8080/WW3App/kws/listwords';
        this.getActors = function(){
            return $http.get(urlBase);
        };
        this.addActors = function(palabra,array){
            var actor = 
                {
                    "concepto": palabra,
                    "palabras": array
                }
            return $http.post('http://localhost:8080/WW3App/addWord', actor);
        };
        this.deleteWord =function(palabra){
            var borrar =
            {   

                "concepto": palabra
            }
            return $http.post('http://localhost:8080/WW3App/deleteWord', borrar);
        };
    });