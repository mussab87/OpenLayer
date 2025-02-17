window.onload = init;

function init(){
  const austrCenterCoordinate = [46546814.059215784, 4926887.889588469]
  const map = new ol.Map({
    view: new ol.View({
      center: austrCenterCoordinate,
      zoom: 1,
      extent: [43455382.33032067, 888610.9852411519, 46546814.059215784, 4926887.889588469],   
    }),
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    target: 'openlayers-map'
  })

  // Australian Cities GeoJSON
  const aussieCitiesStyle = function(feature){
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
            width:0.3
          })
        })
      })
    ]
    return styles
  }

  const styleForSelect = function(feature){
    let cityID = feature.get('ID');
    let cityIDString = cityID.toString();
    const styles = [
      new ol.style.Style({
        image: new ol.style.Circle({
          fill: new ol.style.Fill({
            color: [247, 26, 10, 0.5]
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
            color: [87, 9, 9, 1]
          }),
          stroke: new ol.style.Stroke({
            color: [87, 9, 9, 1],
            width:0.5
          })
        })
      })
    ]
    return styles
  }

  const austCitiesLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
      format: new ol.format.GeoJSON(),
      url: './data/mapLine.geojson'
    }),
    style: aussieCitiesStyle
  })
  map.addLayer(austCitiesLayer);

  // Map Features Click Logic
  const navElements = document.querySelector('.column-navigation');
  const RegionElement = document.getElementById('Region');
  //const cityImageElement = document.getElementById('cityimage');
  const mapView = map.getView();

  map.on('singleclick', function(evt){
    map.forEachFeatureAtPixel(evt.pixel, function(feature, layer){
      let featureName = feature.get('Region');
      let navElement = navElements.children.namedItem(featureName);      
      mainLogic(feature, navElement)
    })
  })

  function mainLogic(feature, clickedAnchorElement){
    // Re-assign active class to the clicked element
    let currentActiveStyledElement = document.querySelector('.active');
    currentActiveStyledElement.className = currentActiveStyledElement.className.replace('active', '');
    clickedAnchorElement.className = 'active';

    // Default style for all features
    let aussieCitiesFeatures = austCitiesLayer.getSource().getFeatures();
    aussieCitiesFeatures.forEach(function(feature){
      feature.setStyle(aussieCitiesStyle);
    })    

    // Home Element : Change content in the menu to HOME
    if(clickedAnchorElement.id === 'Home'){ 
      mapView.animate({center: austrCenterCoordinate}, {zoom: 4})
      RegionElement.innerHTML  = 'Welcome to Australian Capital Cities Tour Map';
      //cityImageElement.setAttribute('src', './data/City_images/Australian_Flag.jpg');
    } 
    // Change view, and content in the menu based on the feature
    else {
      feature.setStyle(styleForSelect)
      let featureCoordinates = feature.get('geometry').getCoordinates();
      mapView.animate({center: featureCoordinates}, {zoom: 5})
      let featureName = feature.get('Region');
      let featureImage = feature.get('Cityimage');
      RegionElement.innerHTML = 'Name of the city: ' + featureName
      //cityImageElement.setAttribute('src', './data/City_images/' + featureImage + '.jpg');
    }   
  }

  // Navigation Button Logic
  const anchorNavElements = document.querySelectorAll('.column-navigation > a');
  for(let anchorNavElement of anchorNavElements){
    anchorNavElement.addEventListener('click', function(e){
      let clickedAnchorElement = e.currentTarget;
      let clickedAnchorElementID = clickedAnchorElement.id;
      let aussieCitiesFeatures = austCitiesLayer.getSource().getFeatures();
      aussieCitiesFeatures.forEach(function(feature){
        let featureRegion = feature.get('Region');
        if(clickedAnchorElementID === featureRegion){
          mainLogic(feature, clickedAnchorElement);
        }
      })

      // Home Navigation Case
      if(clickedAnchorElementID === 'Home'){
        mainLogic(undefined, clickedAnchorElement)
      }
    })
  }

  // Features Hover Logic
  const popoverTextElement = document.getElementById('popover-text');
  const popoverTextLayer = new ol.Overlay({
    element: popoverTextElement,
    positioning: 'bottom-center',
    stopEvent: false
  })
  map.addOverlay(popoverTextLayer);

  map.on('pointermove', function(evt){
    let isFeatureAtPixel = map.hasFeatureAtPixel(evt.pixel);
    if(isFeatureAtPixel){
      let featureAtPixel = map.getFeaturesAtPixel(evt.pixel);
      let featureName = featureAtPixel[0].get('Region');
      popoverTextLayer.setPosition(evt.coordinate);
      popoverTextElement.innerHTML = featureName;
      map.getViewport().style.cursor = 'pointer';
    } else {
      popoverTextLayer.setPosition(undefined)
      map.getViewport().style.cursor = '';
    }
  })

}