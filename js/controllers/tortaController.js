var misDatosTorta = angular.module('angularSpa').controller('tortaController',function($scope,$http){
        $scope.importarTorta = function(){
            $http.get('http://localhost:8080/WW3App/auxiliarJsonFullCake').success(function(datos2){
                $scope.dataTorta = datos2;

                var torta = document.getElementById("myPieChart");
                
                //Aquí comencé a modificar
                //Creo arreglos auxiliares para guardar la data
                ejex = [];
                ejey = [];
                
                //Creo una variable auxiliar 0
                var i = 0;
                var ctdtweets = 0;
                
                //Ciclo for each. Para cada objeto de datos2.info, iterando sobre identificador y tweets
                angular.forEach(datos2.info, function(identificador, tweets){
                    
                    //Se agregan los datos a las listas particulares
                    ejex.push(datos2.info[i].identificador);
                    ejey.push(datos2.info[i].tweets)
                    ctdtweets = datos2.info[i].tweets + ctdtweets;
                    
                    //Se avanza en el contrador auxiliar
                    i = i +1;
                });
                
                function obtenerColorRandom() 
                {
                    var letters = '0123456789ABCDEF';
                    var color = '#';
                    for (var i = 0; i < 6; i++ ) 
                    {
                        color += letters[Math.floor(Math.random() * 16)];
                    }
                return color;
                }    
                
                var a=0;
                var colores=[];
                for (a=0;a<500;a++)
                    {
                        colores.push(obtenerColorRandom());
                    }
                
                $scope.ctdtweets = ctdtweets;
                
                var dataTorta = {
                    labels:
                    //Aquí aplique la lista de eje x que son las labels
                        ejex,
                        datasets: 
                        [
                            {
                                //Aquí aplique la lista de eje y que son los tweets
                                data: ejey,
                                backgroundColor: colores,
                                
                                hoverBackgroundColor: colores,
                            }
                        ]
                };
                
                var optionsTorta = 
                {
                    animation: 
                    {
                        animateScale: true
                    }
                };
                    
                // Chart declaration:
                var myPieChart = new Chart(torta, 
                {
                    type: 'pie',
                    data: dataTorta,
                    options: optionsTorta
                });
            });
        }
        $scope.importarTorta();
    }
);

