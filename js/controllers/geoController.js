//Código referente al controlador del Ránking de Países

var misDatosTorta = angular.module('angularSpa').controller('rankingController', function($scope, $http) {
  $scope.importarRank = function() {
    $http.get('http://localhost:8080/WW3App/rankingJSON/').success(function(datos2) {
      $scope.dataRank = datos2;
    });

    $http.get('coordenates.json').success(function(datos3) {
      $scope.dataCites = datos3;
    });





      //Importing: esri & DOJO libraries
    require([
    "esri/views/MapView",
    "esri/Map",
    "esri/layers/FeatureLayer",
    "esri/layers/support/Field",
    "esri/geometry/Point",
    "esri/renderers/SimpleRenderer",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/widgets/Legend",
    "esri/request",
    "dojo/_base/array",
    "dojo/dom",
    "dojo/on",
    "dojo/domReady!"
  ], function(MapView, Map, FeatureLayer, Field, Point,
    SimpleRenderer, SimpleMarkerSymbol, Legend, esriRequest,
    arrayUtils, dom, on
  ) {

    var lyr, legend;

    /**************************************************
     * Define the specification for each field to create
     * in the layer
     **************************************************/
    var fields = [{
      name: "TweetId",
      alias: "TweetId",
      type: "oid"
    }, {
      name: "country",
      alias: "country",
      type: "string"
    }, {
      name: "hits",
      alias: "# of Tweets",
      type: "double"
    }];

    // Set up popup template for the layer
    var pTemplate = {
      title: "{country}",
      content: [{
        type: "fields",
        fieldInfos: [{
          fieldName: "country",
          label: "Country",
          visible: true
        }, {
          fieldName: "hits",
          label: "# of Tweets",
          visible: true
        }]
      }],
    };

    /**************************************************
     * Create the map and view
     **************************************************/

    var map = new Map({
      basemap: "dark-gray"
    });

    // Create MapView
    var view = new MapView({
      container: "viewDiv",
      map: map,
      center: [-72.492, -33.771],
      zoom: 5,
      // customize ui padding for legend placement, the one that says World War 3
      ui: {
        padding: {
          bottom: 15,
          right: 0
        }
      }
    });

    /**************************************************
     * Define the renderer for symbolizing earthquakes
     **************************************************/
    //This renderer specifies the scales in the map
    var quakesRenderer = new SimpleRenderer({
      symbol: new SimpleMarkerSymbol({
        style: "circle",
        size: 20,
        color: [211, 255, 0, 0],
        outline: {
          width: 1,
          color: "#FF0055",
          style: "solid"
        }
      }),
      visualVariables: [{
        type: "size",
        field: "hits",
        valueUnit: "unknown",
        minDataValue: 10,
        maxDataValue: 1000,
        minSize: {
          type: "size",
          expression: "view.scale",
          stops: [{
            value: 1128,
            size: 12
          }, {
            value: 36111,
            size: 12
          }, {
            value: 9244649,
            size: 6
          }, {
            value: 73957191,
            size: 4
          }, {
            value: 591657528,
            size: 2
          }]
        },
        maxSize: {
          type: "size",
          expression: "view.scale",
          stops: [{
            value: 1128,
            size: 80
          }, {
            value: 36111,
            size: 60
          }, {
            value: 9244649,
            size: 50
          }, {
            value: 73957191,
            size: 50
          }, {
            value: 591657528,
            size: 25
          }]
        }
      }]
    });
    //Invoking the functions
    view.then(function() {
      getData()
        .then(createGraphics)
        .then(createLayer)
        .then(createLegend)
        .otherwise(errback);
    });

    var i=0;
    var aux = [];
    for (i=0;i<60;i++)
    {
      aux[i]=
      {
        "type": "Feature",
        "properties": {
          "tweetId": 1,
          "country": datos3[i].countryName,
          "hits": datos2[i].puntaje
        },
        "geometry": {
          "type": "Point",
          "coordinates": [-70.5980822, -33.4557658]
        }
      }
    }

    var json = {
  "type": "FeatureCollection",
  "metadata": {
    "title": "Tweets about third world war"
  },
  "features": [{
      "type": "Feature",
      "properties": {
        "tweetId": 1,
        "country": "Chile",
        "hits": 56
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-70.5980822, -33.4557658]
      }
    }
  ]
}
    //JSON Object is invoked here
    function getData() {
      //URL with JSON Object
      var url = "ejemplo.json"; //"http://localhost:8080/GrafosSigma/JSONPrueba.json";

      return esriRequest(url, {
        responseType: "json"
      });
    }
    /**************************************************
     * Create graphics with returned geojson data
     **************************************************/

    function createGraphics(response) {
      var geoJson = response.data;

      // Create an array of Graphics from each GeoJSON feature
      return arrayUtils.map(geoJson.features, function(feature, i) {
        return {
          attributes: {
            tweetId: i,
            country: feature.properties.country,
            hits: feature.properties.hits
          },
          geometry: new Point({
            x: feature.geometry.coordinates[0],
            y: feature.geometry.coordinates[1]
          })

        };
      });
    }

    /**************************************************
     * Create a FeatureLayer with the array of graphics
     **************************************************/

    function createLayer(graphics) {

      lyr = new FeatureLayer({
        source: graphics, // autocast as an array of esri/Graphic
        fields: fields, // This is required when creating a layer from Graphics
        objectIdField: "ObjectId", // This must be defined when creating a layer from Graphics
        renderer: quakesRenderer, // set the visualization on the layer
        spatialReference: {
          wkid: 4326
        },
        geometryType: "point", // Must be set when creating a layer from Graphics
        popupTemplate: pTemplate
      });

      map.add(lyr);
      return lyr;
    }

    /******************************************************************
     * Add layer to layerInfos in the legend
     ******************************************************************/

    function createLegend(layer) {
      if (legend) {
        legend.layerInfos = [{
          layer: layer,
          title: "By: Bc Team"
        }];
      } else {
        legend = new Legend({
          view: view,
          layerInfos: [{
            layer: layer,
            title: "By: Bc Team"
          }]
        }, "infoDiv");
      }
    }
    //In case of errors, this function will be invoked
    function errback(error) {
      console.error("Creating legend failed. ", error);
    }
  });












  }



  $scope.importarRank();
});



