//Código referente al controlador del Gráfico de Torta
var misDatosTorta = angular.module('angularSpa').controller('torta2Controller', function($scope, $http) {
  $scope.importarTorta = function() {
    $http.get('http://localhost:8080/WW3App/auxiliarJsonFullCake').success(function(datos2) {
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
      angular.forEach(datos2.info, function(identificador, tweets) {

        //Se agregan los datos a las listas particulares
        ejex.push(datos2.info[i].identificador);
        ejey.push(datos2.info[i].tweets)
        ctdtweets = datos2.info[i].tweets + ctdtweets;

        //Se avanza en el contrador auxiliar
        i = i + 1;
      });

      function obtenerColorRandom() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }

      var a = 0;
      var colores = [];
      for (a = 0; a < 500; a++) {
        colores.push(obtenerColorRandom());
      }

      var paises=[];
      for (i=0;i<10;i++)
      {
        paises[i]=ejex[i];
      }

      var datas=[];
      for (i=0;i<10;i++)
      {
        datas[i]=ejey[i];
      }
        
              var matrix=[];
      for (i=0;i<10;i++)
      {
        matrix[i]=[paises[i],datas[i]];
      }
      $scope.ctdtweets = ctdtweets;
    
        Highcharts.chart('tortaG', {
    chart: {
        type: 'pie',
        options3d: {
            enabled: true,
            alpha: 45,
            beta: 0
        }
    },
    title: {
        text: 'Browser market shares at a specific website, 2014'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            depth: 35,
            dataLabels: {
                enabled: true,
                format: '{point.name}'
            }
        }
    },
    series: [{
        type: 'pie',
        name: 'Browser share',
        data: [
            ['Firefox', 45.0],
            ['IE', 26.8],
            {
                name: 'Chrome',
                y: 12.8,
                sliced: true,
                selected: true
            },
            ['Safari', 8.5],
            ['Opera', 6.2],
            ['Others', 0.7]
        ]
    }]
});
    });

  }
  $scope.importarTorta();
});