angular.module('angularSpa')
    .controller('MainCtrl', function($scope, actorsService){         
        $scope.tareas = [];
        
        $scope.actors =[];

        $scope.lista=[];

    //Modelo que permite agregar tareas
        $scope.agregarTarea = function () {
    //Verificamos que el campo input no este vacio.
            if ($scope.nuevaTarea != null)
     // agregamos el elemento a nuestro array
            $scope.tareas.push($scope.nuevaTarea);
     // Limpiamos el input
            $scope.nuevaTarea = null;
        };

        $scope.mostrar = function(){
            return $scope.tareas;
        };

        function Refresh() 
        {
            window.parent.location = window.parent.location.href;
        };

        $scope.create= function(palabra){
            actorsService.addActors(palabra,$scope.tareas)
            .success(function(data){
                $scope.actors = data;
            })
            .error(function(error){
                $scope.status = 'Error al consultar por actores';
            });
            getActors();

        }

        $scope.delete= function(palabra){
            actorsService.deleteWord(palabra)
            .success(function(data){
                $scope.actors = data;
            })
            .error(function(error){
                $scope.status = 'Error al consultar por actores';
            });
            getActors();

        }

        function getActors(){
            actorsService.getActors()
            .success(function(data){
                $scope.lista = data;
            })
            .error(function(error){
                $scope.status = 'Error al consultar por actores';
            });
        }
        getActors();
    });
