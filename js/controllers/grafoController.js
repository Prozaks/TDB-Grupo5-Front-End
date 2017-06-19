var app = angular.module('app', ['ngVis']);

app.controller('grafoController', ['$scope', '$http', 'VisDataSet',

  function($scope, $http, VisDataSet) {

    $scope.onSelect = function(items) {
      // debugger;
      alert('select');
    };

    $scope.onClick = function(props) {
      //debugger;
      alert('Click');
    };

    $scope.onDoubleClick = function(props) {
      // debugger;
      alert('DoubleClick');
    };

    $scope.rightClick = function(props) {
      alert('Right click!');
      props.event.preventDefault();
    };
    
    $scope.options = {
      autoResize: true,
      height: '800',
      width: '100%'
    };
    var nodes = [];
    var relations = [];
    var DIR = "../../assets/images/banderitas"
        $http({
            url: 'http://localhost:7474/db/data/transaction/commit',
            method: "POST",
            data:{"statements" : [ {
    "statement" : "MATCH p=()-->() RETURN p"
            }]},
            headers: {'Authorization': 'Basic ' + btoa("neo4j" + ':' + "441441"),
                'Accept': 'application/json',
'Content-type': 'application/json; charset=utf-8','Access-Control-Allow-Origin': '*'}
                })
                .then(function(response){
            //cada elemento es un nodo
            //console.log(response.data.results[0])
            var largo = response.data.results[0].data.length;
            var DIR = "/assets/images/banderitas/"
            //console.log(response.data.results[0].data[0].row[0][2]);
            //Se saca paralelamente todo por la estructura del JSON de Neo4J
            //La estructura del nodo:
            //id nodo, numTweets, abreviatura y nombre del pais
            //notar que el id nodo es el id de la base de datos de grafos
            //Para cada relacion...
            angular.forEach(response.data.results[0].data, function(valor){
                //Creamos los nodos
                var numTweetsOrigen = valor.row[0][0].tweetsOriginados + "";
                var nodoOrigen = {id: valor.meta[0][0].id, 
                    shape: 'circularImage',
                    image: DIR +  valor.row[0][0].abreviatura + ".png",
                    label: valor.row[0][0].pais + "\n Tweets Generados : "+ numTweetsOrigen};
                console.log(valor.row[0][0].abreviatura);
                var numTweetsDestino = valor.row[0][2].tweetsOriginados + "";
                var nodoDestino = {id: valor.meta[0][2].id, 
                    shape: 'circularImage',
                    image: DIR +  valor.row[0][2].abreviatura + ".png",
                    label: valor.row[0][2].pais + "\n Tweets Generados : "+ numTweetsDestino};
                
                //Luego se chequea que los nodos no existen en el arreglo. Si no existen, se agregan
                var insertarOrigen = 1;
                var insertarDestino = 1;
                angular.forEach(nodes, function(checkNode){
                    //Si está se cambia
                    if(checkNode.id === nodoOrigen.id){
                        insertarOrigen = 0;
                    }
                    if(checkNode.id === nodoDestino.id){
                        insertarDestino = 0;
                    }
                })    
                if (insertarOrigen === 1){ 
                    nodes.push(nodoOrigen);
                }
                if (insertarDestino === 1){
                    nodes.push(nodoDestino);
                }
                var relationship = {from: valor.meta[0][0].id, to: valor.meta[0][2].id};
                relations.push(relationship);                       
        })
        $scope.data = {
            nodes: nodes,
            edges: relations
        };
        

    })
  }]);