//Código referente al controlador del Gráfico Lineal
var misDatosTorta = angular.module('angularSpa').controller('linealController', function($scope, $http) {
  $scope.importarLineal = function() {
    $http.get('http://localhost:8080/WW3App/auxiliarJsonFullLinear').success(function(datoLineal) {
      $scope.dataLineal = datoLineal;

      var lineal = document.getElementById("myLineChart");
      var gLineal = lineal.getContext('2d');

      Chart.defaults.global.defaultFontColor = 'black';
      Chart.defaults.global.defaultFontSize = 16;
      var a = 0;
      var x = 0;
      var y = 0;
      var i = 0;
      var fechasLineal = [];
      var conceptos = [];
      var numFechas = datoLineal.cantidadFechas;
      var numConceptos = datoLineal.info.length;
      var auxiliar = [];
      var menciones = [];

      for (i = 0; i < datoLineal.cantidadFechas; i++) {
        fechasLineal.push(datoLineal.info[0].puntos[i].identificador);
      }

      for (x = 0; x < numConceptos; x++) {
        for (y = 0; y < numFechas; y++) {
          auxiliar[y] = datoLineal.info[x].puntos[y].tweets;
        }
        menciones[x] = auxiliar;
        auxiliar = [];
      }

      for (a = 0; a < numConceptos; a++) {
        conceptos[a] = datoLineal.info[a].concepto;
      }

      function obtenerColorRandom() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }

      function crearDataSet() {
        var dataSetP = [];
        var largoConceptos = conceptos.length;
        for (var i = 0; i < largoConceptos; i++) {
          dataSetP[i] = {
            label: conceptos[i],
            data: menciones[i],

            fill: false,
            borderColor: obtenerColorRandom(),
            fontColor: "#E0E0E0",
          };
        }
        return dataSetP;
      }

      var dataLineal = {
        labels: fechasLineal.sort(),
        datasets: crearDataSet()
      }

      var options = {
        responsive: true,
        title: {
          display: true,
          text: 'Cantidad de Menciones vs Fecha',
          fontColor: "#E0E0E0",
          fontFamily: "times",
          fontSize: 18,
          fontStyle: "italic",

        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              fontColor: "#E0E0E0  ",
              fontFamily: "times",
              fontSize: 18,
              fontStyle: "italic",
            },

            scaleLabel: {
              display: true,
              labelString: 'Cantidad de Menciones',
              fontColor: "#E0E0E0  ",
              fontFamily: "times",
              fontSize: 18,
              fontStyle: "italic",
            }
          }],
          xAxes: [{
            ticks: {
              beginAtZero: true,
              fontColor: "#E0E0E0  ",
              fontFamily: "times",
              fontSize: 18,
              fontStyle: "italic",
            },

            scaleLabel: {
              display: true,
              labelString: 'Tiempo',
              fontColor: "#E0E0E0  ",
              fontFamily: "times",
              fontSize: 18,
              fontStyle: "italic",
            }
          }]
        }
      };
      Chart.defaults.global.defaultFontColor = "#E0E0E0";
      Chart.defaults.global.defaultFontSize = 18;
      Chart.defaults.global.defaultFontFamily = "times";
      var myLineChart = new Chart(gLineal, {
        type: 'line',
        data: dataLineal,
        options: options
      });
    });
  }
  $scope.importarLineal();
});

misDatosTorta.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);