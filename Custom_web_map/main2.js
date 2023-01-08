
//define coordantes for specific region for maxmize that
var home = [4755883.895489522, 2500755.4709520126]
var riyadh = [5197542.057365047, 2833304.7959564873]

var myview = new ol.View({
    center: home,
    zoom: 5.6,
    //extent: [43455382.33032067, 888610.9852411519, 46546814.059215784, 4926887.889588469]
})

var osm = new ol.layer.Tile({
    source: new ol.source.OSM()
})

layerArray = [osm]

var map = new ol.Map({
    target: 'openlayers-map',
    view: myview,
    layers: layerArray
})

// Style Function
const styleFunction = function (feature) {
    //console.log(feature);
    let cityID = feature.get('ID');
    let cityIDString = cityID.toString();
    const styles = [
        new ol.style.Style({
            image: new ol.style.Circle({
                fill: new ol.style.Fill({
                    color: [77, 219, 105, 0.6]
                }),
                stroke: new ol.style.Stroke({
                    color: [6, 125, 34, 1],
                    width: 2
                }),
                radius: 12
            }),
            text: new ol.style.Text({
                text: cityIDString,
                scale: 1.5,
                fill: new ol.style.Fill({
                    color: [232, 26, 26, 1]
                }),
                stroke: new ol.style.Stroke({
                    color: [232, 26, 26, 1],
                    width: 0.3
                })
            })
        })
    ]
    return styles
}


////button click
const navElements = document.querySelector('.column-navigation');
function getCenter(value) {
    val = '';
    if (value === 'home') {
        val = home
        location.reload();
    }

    if (value === 'riyadh') {
        val = riyadh
        selectedRegion(value);
    }

    myview.animate({
        center: val,
        duration: 2000,
        zoom: 9
    })

     // Re-assign active class to the clicked element
     
     let navElement = navElements.children.namedItem(value);
     let currentActiveStyledElement = document.querySelector('.active');
     currentActiveStyledElement.className = currentActiveStyledElement.className.replace('active', '');
     navElement.className = 'active';
}

function selectedRegion(Region) {
    if (Region === 'riyadh') {

        geojsonSource = new ol.source.Vector({
            url: './data/map.geojson',
            format: new ol.format.GeoJSON()
        })
        
        var RiyadhLayer = new ol.layer.Vector({
            source: geojsonSource,
            style: styleFunction
        })
        map.addLayer(RiyadhLayer)
    }
}

map.on('click', function (e) {
    console.log(e.coordinate);
})
