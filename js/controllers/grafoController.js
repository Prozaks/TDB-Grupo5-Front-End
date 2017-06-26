var app = angular.module('angularSpa');

app.controller('grafoController', ['$scope', '$http', 'VisDataSet',

  function($scope, $http, VisDataSet) {

    $scope.onSelect = function(items) {
      // debugger;
      alert('select');
    };

    $scope.showPopup = function(props) {
      // debugger;
      alert('PopUp');
    };

    $scope.hidePopup = function(props) {
      // debugger;
      alert('hideePopUp');
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
            headers: {'Authorization': 'Basic ' + btoa("neo4j" + ':' + "root"),
                'Accept': 'application/json',
'Content-type': 'application/json; charset=utf-8','Access-Control-Allow-Origin': '*'}
                })
                .then(function(response){
                    //console.log(response.data.results[0].data[0].row[0][0]);
                    //console.log(response.data.results[0].data[0].row[0][1]);
                    //console.log(response.data.results[0].data[0].row[0][2]);
                    //console.log(response.data.results[0].data[0].meta[0][0]);
                    //console.log(response.data.results[0].data[0].meta[0][1]);
                    //console.log(response.data.results[0].data[0].meta[0][2]);
            //cada elemento es un nodo
            
            var DIR = "/assets/images/banderitas/";
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
                    font: '12px verdana white',
                    color: 'white', 
                    value: numTweetsOrigen,
                    shape: 'circularImage',
                    image: DIR +  valor.row[0][0].abreviatura + ".png",
                    label: valor.row[0][0].pais + "\n Tweets Generados : "+ numTweetsOrigen,
                    title: 'HOLA'};
                
                var numTweetsDestino = valor.row[0][2].tweetsOriginados + "";
                
                var nodoDestino = {id: valor.meta[0][2].id,
                    font: '12px verdana white',  
                    value: numTweetsDestino,
                    color: 'white',
                    shape: 'circularImage',
                    image: DIR +  valor.row[0][2].abreviatura + ".png",
                    label: valor.row[0][2].pais + "\n Tweets Generados : "+ numTweetsDestino,
                    title: 'HOLA'};

                //Luego se chequea que los nodos no existen en el arreglo. Si no existen, se agregan
                var insertar = 1;
                angular.forEach(nodes, function(checkNode){
                    //Si está se cambia
                    if(checkNode.id === nodoOrigen.id){
                        insertar = 0;
                    }
                    
                })
                if (insertar === 1){ 
                    console.log(nodoOrigen);
                    nodes.push(nodoOrigen);
                }   
                insertar = 1;
                angular.forEach(nodes, function(checkNode){
                    //Si está se cambia
                    if(checkNode.id === nodoDestino.id){
                        insertar = 0;
                    }
                    
                })
                if (insertar === 1){ 
                    console.log(nodoDestino);
                    nodes.push(nodoDestino);
                }   
                
                var relationship = {from: valor.meta[0][0].id, to: valor.meta[0][2].id, arrows: 'to', color: 'white'};
                relations.push(relationship);                       
        })
        $scope.data = {
            nodes: nodes,
            edges: relations
        };
        

    })
  }]);