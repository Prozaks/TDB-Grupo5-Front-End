var app = angular.module("angularSpa");

    app.directive("globe", function() {
        return {
            restrict   : 'E',
            scope      : {
                data: '=?'
            },
            template: 
            '<div class="globe-wrapper">' +
                '<div class="globe"></div>' +
                '<div class="content-box-yellow" style="color:#0000FF">El mapa refleja las menciones realizadas en cada país. A medida que el color del país se vuelve rojo, mayor cantidad de menciones se han realizado allí</div>'+
                '<div class="info content-box-yellow" style="color:#0000FF" width="500" height="210"> Seleccione un país para visualizar su información</div>' +
            '</div>',
            link: link
        };
        
        function link(scope, element, attrs, http) {
            var width = 500, height = width, 
                projection, path,
                svg, features, graticule,
                mapJson = '/countries.json',
                stateSet, countries, countrySet, zoom;
            
            projection = d3.geo.orthographic()
                .translate([width / 2, height / 2])
                .scale(250)
                .clipAngle(90)
                .precision(0.1)
                .rotate([0, -30]);
            
            path = d3.geo.path()
                .projection(projection);
            
            svg = d3.select(element[0]).select('.globe')
                .append('svg')
                .attr('width', width)
                .attr('height', height)
                .attr('viewBox', '0, 0, ' + width + ', ' + height);
           
            features = svg.append('g');
            
            features.append('path')
                .datum({type: 'Sphere'})
                .attr('class', 'background')
                .attr('d', path);
            
            graticule = d3.geo.graticule();

            features.append('path')
              .datum(graticule)
              .attr('class', 'graticule')
              .attr('d', path);
            
            zoom = d3.geo.zoom()
              .projection(projection)
              .scaleExtent([projection.scale() * 0.7, projection.scale() * 8])
              .on('zoom.redraw', function(){
                d3.event.sourceEvent.preventDefault();
                svg.selectAll('path').attr('d',path);
              });
            
            d3.json(mapJson, function(error, world) {
                states = topojson.feature(world, world.objects.states).features;
                countries = topojson.feature(world, world.objects.countries).features;
                
                stateSet = drawFeatureSet('state', states);
                countrySet = drawFeatureSet('country', countries);
                
                d3.selectAll('path').call(zoom);
            });

            
            function drawFeatureSet(className, featureSet) {

var result;
function jsonConcat(o1, o2) {
     for (var key in o2) {
      o1[key] = o2[key];
     }
     return o1;
    }
$.ajax({
    url: 'http://localhost:8080/WW3App/mapaCalor',
    dataType: 'json',
    async: false,
    success: function(data) {
        result = data;
    }
});
//console.log(result);
//console.log(result);

    var united = 0;
    for(var j in result){
        var sub_key = j;
        var sub_val = result[j];
        if (sub_key=="United States")
        {
            united=sub_val;
        }
    }

    var unitedStates= {
        "3514": united, "3515":united, "3516":united, "3517":united,
      "3518": united, "3519": united, "3520": united, "3521": united, "3522": united, 
      "3523": united, "3524": united, "3525": united, "3526": united, "3527": united, 
      "3528": united, "3529": united, "3530": united, "3531": united, "3532": united, 
      "3533": united, "3534": united, "3535": united, "3536": united, "3537": united, 
      "3538": united, "3539": united, "3540": united, "3541": united, "3542": united, 
      "3543": united, "3544": united, "3545": united, "3546": united, "3547": united, 
      "3548": united, "3549": united, "3550": united, "3551": united, "3552": united, 
      "3553": united, "3554": united, "3555": united, "3556": united, "3557": united, 
      "3558": united, "3559": united, "3560": united, "3561": united, "3562": united, 
      "3563": united
    }

    

    var output = {};
    output = jsonConcat(output, result);
    output = jsonConcat(output, unitedStates);


scope.data=output;
                    var set  = features.selectAll('.' + className)
                    .data(featureSet)
                    .enter()
                    .append('g')
                    .attr('class', className)
                    .attr('data-name', function(d) {
                        return d.properties.name;
                    })
                    .attr('data-id', function(d) {
                        return d.id;
                    });
                    
                    set.append('path')
                    .attr('class', 'land')
                    .attr('d', path);
                    
                    set.append('path')
                    .attr('class', 'overlay')
                    .attr('d', path)
                    .attr('style', function(d) {
                        if (scope.data[d.id]) {
                            return 'fill-opacity: ' + (scope.data[d.id]/25);
                        }
                    })
                    .on('click', function(d) {
                        var val = (scope.data[d.id]) ? scope.data[d.id] : 0;
                        d3.select(element[0]).select('.info').html(d.properties.name + ': ' + val);
                        
                        rotateToFocusOn(d);
                    }); 

                
                return set;
            }
            
            function rotateToFocusOn(x) {
                var coords = d3.geo.centroid(x);
                coords[0] = -coords[0];
                coords[1] = -coords[1];
                
                d3.transition()
                .duration(1250)
                .tween('rotate', function() {
                    var r = d3.interpolate(projection.rotate(), coords);
                    return function(t) {
                        projection.rotate(r(t));
                        svg.selectAll('path').attr('d', path);
                    };
                })
                .transition();
            }
        }
    });

    app.controller("mapController",function($scope, $log, $http) {


    });
    app.run();
