window.onload = init;

function init(){
  //get data from api


  //Custom style
  //styling of vector features
 const fillStyle = new ol.style.Fill({
  color: [245, 49, 5, 1]
})
const strokeStyle = new ol.style.Stroke({
  color: [30, 30, 31, 0],
  width: 1.2,
  lineCap: 'square',
  lineJoin: 'bevel',
  lineDash: [3, 3]
}) 
// Icon Marker Style
const iconMarkerStyle = new ol.style.Icon({
  src: './data/staticImages/marker.png',
  size: [100, 100],
  offset: [0, 0],
  opacity: 1,
  scale: 0.35,
  //color: [10, 98, 240, 1]
})
  //Point style
  //Marker Style
  const pointStyle = new ol.style.Style({
    fill: fillStyle,
    stroke: strokeStyle,
    image: iconMarkerStyle
    
  //Point Style
    // image: new ol.style.Circle({
    //   fill: new ol.style.Fill({
    //     color: [93, 215, 35, 1]
    //   }),
    //   radius: 7,
    //   stroke: new ol.style.Stroke({
    //     color: [93, 215, 35, 1],
    //     width: 2
    //   })
    // })
  })
  
  //Line Style
const lineStyle = new ol.style.Style({
  stroke: new ol.style.Stroke({
    color: [6, 96, 88, 1],
    width: 4
  })
})
//Polygon Style
//Blue Polygon
const blueStyle = new ol.style.Style({
  fill: new ol.style.Fill({
    color: [56, 41, 194, 1]
  })
})
//Purole Polygon
const purpleStyle = new ol.style.Style({
  fill: new ol.style.Fill({
    color: [164, 63, 204, 1]
  })
})
  const customStyle = function(feature){
    //get all polygon  for style them
  let geometryType = feature.getGeometry().getType();
  //console.log(feature.getKeys());
  //assign below to variable for setting the value into the style
  //console.log(feature.get('icome'));
  //console.log(geometryType);
  let incomeProperty = feature.get('Region');
  
  //get feature ID and represent that on the map
  // Text Styles
  let featureID = feature.get('ID');
  let featureIDString = toString(featureID);
  let textStyles = new ol.style.Style({
    text: new ol.style.Text({
      text: featureIDString,
      scale: 1.5,
      fill: new ol.style.Fill({
        color: [18, 18, 18, 1]
      })
    })
  })     
  
  //in case geometryType = Point do the style
  if(geometryType === 'Point'){
    feature.setStyle([pointStyle], textStyles);
  }
  //in case geometryType = LineString do the style
  if(geometryType === 'LineString'){
  feature.setStyle([lineStyle], textStyles);
  }
  //in case geometryType = Polygon do the style
  if(geometryType === 'Polygon'){
    
    //feature.setStyle([purpleStyle], textStyles);
    
    if(incomeProperty === 'Blue' && incomeProperty !== undefined){
      feature.setStyle([blueStyle], textStyles);
    }
    if(incomeProperty === 'Purple' && incomeProperty !== undefined){
      feature.setStyle([purpleStyle], textStyles);
    }
  }
  }


  const austrCenterCoordinate = [44799066.94386436, 2830825.178368735]
  const map = new ol.Map({
    view: new ol.View({
      center: austrCenterCoordinate,
      zoom: 5.9,
      //extent: [43455382.33032067, 888610.9852411519, 46546814.059215784, 4926887.889588469],   
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
            color: [215, 67, 35, 1],
            width: 4
          }),
          radius: 12
        }),
        text: new ol.style.Text({
          text: cityIDString,
          scale: 1.5,
          fill: new ol.style.Fill({
            color: [18, 18, 18, 1]
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
      url: './data/TestLast.geojson'
    }),
    style: customStyle//aussieCitiesStyle
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
      if(feature.get('ID') !== undefined)
      {
        feature.setStyle(aussieCitiesStyle);
      }
      
    })    
    
    // Home Element : Change content in the menu to HOME
    if(clickedAnchorElement.id === 'المملكة العربية السعودية'){ 
      
      window.location.reload();
      //mapView.animate({center: austrCenterCoordinate}, {zoom: 5})
      // RegionElement.innerHTML  = 'Welcome to Australian Capital Cities Tour Map';
      //cityImageElement.setAttribute('src', './data/City_images/Australian_Flag.jpg');
    } 
    // Change view, and content in the menu based on the feature
    else {
      if(feature.get('ID') !== undefined)
      {
        feature.setStyle(styleForSelect)
      }
      
      let featureCoordinates = feature.get('geometry').getCoordinates();
      mapView.animate({center: featureCoordinates}, {zoom: 10})
      let featureName = feature.get('Region');
      //let featureImage = feature.get('Cityimage');
      // if(feature.get('Region') !== undefined)
      // {
      //   RegionElement.innerHTML = 'Name of the city: ' + featureName
      // }
      
      //cityImageElement.setAttribute('src', './data/City_images/' + featureImage + '.jpg');
    }   
  }

  // Navigation Button Logic
  const anchorNavElements = document.querySelectorAll('.column-navigation > a');
  for(let anchorNavElement of anchorNavElements){
    anchorNavElement.addEventListener('click', function(e){
      let clickedAnchorElement = e.currentTarget;
      let clickedAnchorElementID = clickedAnchorElement.id;
      debugger;
      let aussieCitiesFeatures = austCitiesLayer.getSource().getFeatures();
      aussieCitiesFeatures.forEach(function(feature){
        let featureRegion = feature.get('Region');
        if(clickedAnchorElementID === featureRegion){
          mainLogic(feature, clickedAnchorElement);
        }
      })

      // Home Navigation Case
      if(clickedAnchorElementID === 'المملكة العربية السعودية'){
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
// Vector Feature Popup Information
const overlayContainerElement = document.querySelector('.overlay-container')
const overlayLayer = new ol.Overlay({
  element: overlayContainerElement
})
map.addOverlay(overlayLayer);
  const overlayFeatureName = document.getElementById('feature-name');
const overlayFeatureAdditionInfo = document.getElementById('feature-description');
  map.on('click', function(e){
    overlayLayer.setPosition(undefined);
    map.forEachFeatureAtPixel(e.pixel, function(feature, layer){
      let clickedCoordinate = e.coordinate;
      let clickedFeatureName = feature.get('Region');
      let clickedFeatureAdditionInfo = feature.get('Rate');
      if(clickedFeatureName && clickedFeatureAdditionInfo != undefined){
        overlayLayer.setPosition(clickedCoordinate);
        overlayFeatureName.innerHTML = clickedFeatureName;
        overlayFeatureAdditionInfo.innerHTML = clickedFeatureAdditionInfo + '%';
      }
    })
  })

    map.on('click', function(e){
    console.log(e.coordinate);
})
}