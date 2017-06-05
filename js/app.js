angular.module('angularSpa', [
    'ngRoute'    ])
    
    .config(function($routeProvider){
    $routeProvider
    .when('/home', {
        templateUrl: 'views/main.html',
    })
    .when('/torta', {
      templateUrl: 'views/torta.html',
      controller: 'tortaController'
    })
    .when('/lineal', {
      templateUrl: 'views/lineal.html',
      controller: 'linealController'
    })
    .when('/seleccion', {
      templateUrl: 'views/seleccion.html',
      controller: 'seleccionController'
    })
    .when('/geolocalizacion', {
      templateUrl: 'views/geolocalizacion.html'
    })
    .when('/ranking', {
      templateUrl: 'views/ranking.html',
      controller: 'rankingController'
    })
    .otherwise({
      redirectTo: '/home'
    });
});