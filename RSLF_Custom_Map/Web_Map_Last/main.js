
//get data from api

//define coordantes for specific region for maxmize that
var home = [44799066.94386436, 2830825.178368735]
var north = [44660125.23317723, 3395767.4171060473]
var east = [45588150.99889885, 2758732.78131409]
var south = [44887963.41618041, 2090251.8967889855]
var middle = [45272250.37199247, 2829076.525923495]
var taif = [44574341.971998945, 2420469.9977860455]

var madina = [44467646.82448896, 2849611.219118105]
var west = [44438860.48207029, 2462460.7098147757]
var northwest = [44144291.895757556, 3291614.559400292]

let selectedMapPos;

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

const customStyle = function (feature) {
  //get all polygon  for style them
  let geometryType = feature.getGeometry().getType();
  //console.log(feature.getKeys());
  //assign below to variable for setting the value into the style
  //console.log(feature.get('icome'));
  //console.log(geometryType);
  //let incomeProperty = feature.get('Region');

  //get feature ID and represent that on the map
  // Text Styles
  featureID = '';
  if (feature.get('Region') !== undefined) {
    regionID = feature.get('Region');
  }
  //featureID = feature.get('Region');    
  //let featureIDString = toString(featureID);
  let textStyles = new ol.style.Style({
    text: new ol.style.Text({
      text: featureID,
      offsetY: 15,
      font: "20px Calibri,sans-serif",
      scale: 1.5,
      fill: new ol.style.Fill({
        color: [18, 18, 18, 1]
      })
    })
  })

  //in case geometryType = Point do the style
  if (geometryType === 'Point') {
    feature.setStyle([pointStyle], textStyles);
  }
  //in case geometryType = LineString do the style
  if (geometryType === 'LineString') {
    feature.setStyle([lineStyle], textStyles);
  }
  //in case geometryType = Polygon do the style
  // if (geometryType === 'Polygon') {

  //   //feature.setStyle([purpleStyle], textStyles);

  //   if (incomeProperty === 'Blue' && incomeProperty !== undefined) {
  //     feature.setStyle([blueStyle], textStyles);
  //   }
  //   if (incomeProperty === 'Purple' && incomeProperty !== undefined) {
  //     feature.setStyle([purpleStyle], textStyles);
  //   }
  // }
}

//Region Style
const regionStyle = function (feature) {
  regionID = '';
  region = '';
  if (feature.get('ID') !== undefined) {
    regionID = feature.get('ID');
  }
  if (feature.get('Region') !== undefined) {
    region = feature.get('Region');
  }

  //let cityIDString = regionID.toString();
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
        radius: 11
      }),
      text: new ol.style.Text({
        text: region,
        scale: 1.5,
        offsetY: 15,
        font: "15px Calibri,sans-serif",
        fill: new ol.style.Fill({
          color: [18, 18, 18, 1]
        })
      })
    })

  ]
  return styles
}


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

// إضافة مربع الإحداثيات
const coordinateElement = document.getElementById('coordinates');
map.on('pointermove', function (event) {
  const coordinate = ol.proj.toLonLat(event.coordinate);
  coordinateElement.innerHTML = `الإحداثيات: ${coordinate[0].toFixed(4)}, ${coordinate[1].toFixed(4)}`;
});

//start page
getHome();

const anchorNavElements = document.querySelectorAll('.column-navigation > a');

for (let anchorNavElement of anchorNavElements) {
  anchorNavElement.addEventListener('click', function (e) {
    getHome();
    let clickedAnchorElement = e.currentTarget;
    let clickedAnchorElementID = clickedAnchorElement.id;
    // Home Navigation Case
    // if (clickedAnchorElementID === 'المملكة العربية السعودية') {
    //   //val = home
    //   //getHome();
    // }
    if (clickedAnchorElementID === 'المنطقة الشمالية') {
      clearAllLayers()
      selectedRegion(clickedAnchorElementID);
      myview.animate({
        center: north,
        duration: 2000,
        zoom: 7
      })
    }

    if (clickedAnchorElementID === 'المنطقة الشرقية') {
      clearAllLayers()
      selectedRegion(clickedAnchorElementID);
      myview.animate({
        center: east,
        duration: 2000,
        zoom: 7
      })
    }

    if (clickedAnchorElementID === 'المنطقة الجنوبية') {
      clearAllLayers()
      //selectedRegion(clickedAnchorElementID);
      myview.animate({
        center: south,
        duration: 2000,
        zoom: 7
      })

      geojsonSource = new ol.source.Vector({
        url: './data/south.geojson',
        format: new ol.format.GeoJSON()
      })
      var eastLayer = new ol.layer.Vector({
        source: geojsonSource,
        style: regionStyle
      })
      selectedMapPos = geojsonSource;
      map.addLayer(eastLayer)
    }

    if (clickedAnchorElementID === 'المنطقة الوسطى') {
      clearAllLayers()
      //selectedRegion(clickedAnchorElementID);
      myview.animate({
        center: middle,
        duration: 2000,
        zoom: 7
      })

      geojsonSource = new ol.source.Vector({
        url: './data/middle.geojson',
        format: new ol.format.GeoJSON()
      })
      var eastLayer = new ol.layer.Vector({
        source: geojsonSource,
        style: regionStyle
      })
      selectedMapPos = geojsonSource;
      map.addLayer(eastLayer)
    }

    if (clickedAnchorElementID === 'منطقة الطائف') {
      clearAllLayers()
      //selectedRegion(clickedAnchorElementID);
      myview.animate({
        center: taif,
        duration: 2000,
        zoom: 11
      })
      geojsonSource = new ol.source.Vector({
        url: './data/taif.geojson',
        format: new ol.format.GeoJSON()
      })
      var eastLayer = new ol.layer.Vector({
        source: geojsonSource,
        style: regionStyle
      })
      selectedMapPos = geojsonSource;
      map.addLayer(eastLayer)
    }

    if (clickedAnchorElementID === 'المدينة المنورة') {
      clearAllLayers()
      //selectedRegion(clickedAnchorElementID);
      myview.animate({
        center: madina,
        duration: 2000,
        zoom: 9
      })
      geojsonSource = new ol.source.Vector({
        url: './data/madina.geojson',
        format: new ol.format.GeoJSON()
      })
      var eastLayer = new ol.layer.Vector({
        source: geojsonSource,
        style: regionStyle
      })
      selectedMapPos = geojsonSource;
      map.addLayer(eastLayer)
    }

    if (clickedAnchorElementID === 'المنطقة الغربية') {
      clearAllLayers()
      //selectedRegion(clickedAnchorElementID);
      myview.animate({
        center: west,
        duration: 2000,
        zoom: 9
      })
      geojsonSource = new ol.source.Vector({
        url: './data/west.geojson',
        format: new ol.format.GeoJSON()
      })
      var eastLayer = new ol.layer.Vector({
        source: geojsonSource,
        style: regionStyle
      })
      selectedMapPos = geojsonSource;
      map.addLayer(eastLayer)
    }

    if (clickedAnchorElementID === 'المنطقة الشمالية الغربية') {
      clearAllLayers()
      //selectedRegion(clickedAnchorElementID);
      myview.animate({
        center: northwest,
        duration: 2000,
        zoom: 7
      })
      geojsonSource = new ol.source.Vector({
        url: './data/northwest.geojson',
        format: new ol.format.GeoJSON()
      })
      var eastLayer = new ol.layer.Vector({
        source: geojsonSource,
        style: regionStyle
      })
      selectedMapPos = geojsonSource;
      map.addLayer(eastLayer)
    }

  })
}


function selectedRegion(clickedRegion, Region) {
  if (clickedRegion === 'المنطقة الشمالية') {
    geojsonSource = new ol.source.Vector({
      url: './data/north.geojson',
      format: new ol.format.GeoJSON()
    })
    var northLayer = new ol.layer.Vector({
      source: geojsonSource,
      style: regionStyle
    })

    map.addLayer(northLayer)
    selectedMapPos = geojsonSource;
    //add images icons
    const iconStyle = new ol.style.Style({
      image: new ol.style.Icon({
        src: 'soldier.png', // مسار الصورة
        scale: 0.3, // حجم الصورة
      }),
    });

    const iconStyleTank = new ol.style.Style({
      image: new ol.style.Icon({
        src: 'tank.png', // مسار الصورة
        scale: 0.3, // حجم الصورة
      }),
    });

    var pointGeometry = new ol.geom.Point(ol.proj.fromLonLat([39.5, 30.7]));
    var pointGeometry2 = new ol.geom.Point(ol.proj.fromLonLat([40.0, 31.0]));

    var pointGeometryTank1 = new ol.geom.Point(ol.proj.fromLonLat([39.8, 30.4]));
    var pointGeometryTank2 = new ol.geom.Point(ol.proj.fromLonLat([40.2, 31.2]));
    var pointGeometryTank3 = new ol.geom.Point(ol.proj.fromLonLat([41.0, 30.4]));

    const marker = new ol.Feature({
      geometry: pointGeometry, // موقع الرمز
    });
    marker.setStyle(iconStyle);
    northLayer.getSource().addFeature(marker);

    const marker2 = new ol.Feature({
      geometry: pointGeometry2, // موقع الرمز
    });
    marker2.setStyle(iconStyle);
    northLayer.getSource().addFeature(marker2);

    const markerTank1 = new ol.Feature({
      geometry: pointGeometryTank1, // موقع الرمز
    });
    markerTank1.setStyle(iconStyleTank);
    northLayer.getSource().addFeature(markerTank1);

    const markerTank2 = new ol.Feature({
      geometry: pointGeometryTank2, // موقع الرمز
    });
    markerTank2.setStyle(iconStyleTank);
    northLayer.getSource().addFeature(markerTank2);

    const markerTank3 = new ol.Feature({
      geometry: pointGeometryTank3, // موقع الرمز
    });
    markerTank3.setStyle(iconStyleTank);
    northLayer.getSource().addFeature(markerTank3);
  }

  if (clickedRegion === 'المنطقة الشرقية') {
    geojsonSource = new ol.source.Vector({
      url: './data/east.geojson',
      format: new ol.format.GeoJSON()
    })
    var eastLayer = new ol.layer.Vector({
      source: geojsonSource,
      style: regionStyle
    })
    selectedMapPos = geojsonSource;
    map.addLayer(eastLayer)
  }
}

function getHome() {
  clearAllLayers()
  geojsonSource = new ol.source.Vector({
    url: './data/home.geojson',
    format: new ol.format.GeoJSON()
  })
  var ksaLayer = new ol.layer.Vector({
    source: geojsonSource,
    style: customStyle
  })
  map.addLayer(ksaLayer);
  selectedMapPos = geojsonSource;
  myview.animate({
    center: home,
    duration: 2000,
    zoom: 5.9
  })

  const iconStyle = new ol.style.Style({
    image: new ol.style.Icon({
      src: 'soldier.png', // مسار الصورة
      scale: 0.3, // حجم الصورة
    }),
  });

  //var transformedCoordinate = ol.proj.transform([40.0, 24.0], 'EPSG:4326', 'EPSG:3857');
  //console.log("Transformed Coordinate:", transformedCoordinate);
  var pointGeometry = new ol.geom.Point(ol.proj.fromLonLat([40.0, 24.0]));
  var pointGeometry2 = new ol.geom.Point(ol.proj.fromLonLat([45.0, 25.0]));

  const marker = new ol.Feature({
    geometry: pointGeometry, // موقع الرمز
  });
  marker.setStyle(iconStyle);
  ksaLayer.getSource().addFeature(marker);

  const marker2 = new ol.Feature({
    geometry: pointGeometry2, // موقع الرمز
  });
  marker2.setStyle(iconStyle);
  ksaLayer.getSource().addFeature(marker2);
}

// Variable to hold the draw interaction
let draw;
// Function to add the draw interaction
const addDrawInteraction = (type) => {
  if (draw) {
    map.removeInteraction(draw); // Remove existing draw interaction
  }
  geojsonSource = selectedMapPos;
  draw = new ol.interaction.Draw({
    source: geojsonSource, // Use the same source as ksaLayer
    type: type, // Polygon, LineString, or Point
  });
  map.addInteraction(draw);
};
// Add buttons for drawing
document.getElementById('draw-polygon').addEventListener('click', () => {
  addDrawInteraction('Polygon');
});
document.getElementById('draw-line').addEventListener('click', () => {
  addDrawInteraction('LineString');
});
document.getElementById('draw-point').addEventListener('click', () => {
  addDrawInteraction('Point');
});

// Clear drawings when the "Clear" button is clicked
document.getElementById('clear').addEventListener('click', () => {
  geojsonSource.clear();
  selectedMapPos.clear();
  getHome(); // Clear the source used by ksaLayer
  location.reload();
});

// Remove the default select interaction to prevent accidental deletions
map.getInteractions().forEach(interaction => {
  if (interaction instanceof ol.interaction.Select) {
    map.removeInteraction(interaction);
  }
});



function clearAllLayers() {
  if (map.getLayers().getLength() > 1) {
    map.getLayers().pop();
  }
}

// Vector Feature Popup Information
const overlayContainerElement = document.querySelector('.overlay-container')
const overlayLayer = new ol.Overlay({
  element: overlayContainerElement
})
map.addOverlay(overlayLayer);
const overlayFeatureName = document.getElementById('feature-name');
const overlayFeatureAdditionInfo = document.getElementById('feature-description');
map.on('click', function (e) {
  overlayLayer.setPosition(undefined);
  map.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
    let clickedCoordinate = e.coordinate;
    let clickedFeatureName = feature.get('Region');
    let clickedFeatureAdditionInfo = feature.get('Rate');
    if (clickedFeatureName && clickedFeatureAdditionInfo != undefined) {
      overlayLayer.setPosition(clickedCoordinate);
      overlayFeatureName.innerHTML = clickedFeatureName;
      overlayFeatureAdditionInfo.innerHTML = clickedFeatureAdditionInfo + '%';
    }
  })
})

// Vector Feature Popup Information
const overlayContainerElement2 = document.querySelector('.overlay-container2')
const overlayLayer2 = new ol.Overlay({
  element: overlayContainerElement2
})
map.addOverlay(overlayLayer2);
const overlayFeatureName2 = document.getElementById('tank-name');
const overlayFeatureAdditionInfo2 = document.getElementById('tank-description');
map.on('click', function (e) {
  debugger
  overlayLayer2.setPosition(undefined);
  map.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
    let clickedCoordinate = e.coordinate;
    let clickedFeatureName = feature.get('Region');
    let clickedFeatureAdditionInfo = feature.get('Rate');
    //if (clickedFeatureName && clickedFeatureAdditionInfo != undefined) {
    overlayLayer2.setPosition(clickedCoordinate);
    overlayFeatureName2.innerHTML = 'test';
    overlayFeatureAdditionInfo2.innerHTML = 'test';
    //}
  })
})

// إضافة أدوات الرسم
const drawSource = new ol.source.Vector();
// const drawLayer = new ol.layer.Vector({
//   source: drawSource,
//   style: new ol.style.Style({
//     fill: new ol.style.Fill({
//       color: 'rgba(255, 0, 0, 0.2)', // لون التظليل
//     }),
//     stroke: new ol.style.Stroke({
//       color: 'red', // لون الحدود
//       width: 2,
//     }),
//   }),
// });
// map.addLayer(drawLayer);

// const draw = new ol.interaction.Draw({
//   source: drawSource,
//   type: 'Polygon', // نوع الرسم (مضلع)
// });
// map.addInteraction(draw);

// إنشاء تفاعل الرسم
// تعطيل تفاعل النقر الافتراضي
// const selectInteraction = new ol.interaction.Select({
//   condition: ol.events.condition.click,
// });
// // إزالة تفاعل النقر من الخريطة
// map.removeInteraction(selectInteraction);


// // const drawLayer = new ol.layer.Vector({
// //   source: new ol.source.Vector(),
// //   style: new ol.style.Style({
// //     fill: new ol.style.Fill({
// //       color: 'rgba(255, 0, 0, 0.2)',
// //     }),
// //     stroke: new ol.style.Stroke({
// //       color: 'red',
// //       width: 2,
// //     }),
// //   }),
// // });
// // // إضافة الطبقة إلى الخريطة
// // map.addLayer(drawLayer);

// // // تفاعل الرسم
// // const draw = new ol.interaction.Draw({
// //   source: drawLayer.getSource(),
// //   type: 'Polygon', // نوع الشكل المراد رسمه
// // });

// // // إضافة التفاعل إلى الخريطة
// // map.addInteraction(draw);
// // const draw = new ol.interaction.Draw({
// //   source: selectedMapPos.getSource(),
// //   type: 'Polygon', // نوع الشكل المراد رسمه
// // });

// // // إضافة التفاعل إلى الخريطة
// // map.addInteraction(draw);

// // // إمكانية تغيير لون التظليل
// // draw.on('drawend', (event) => {
// //   const feature = event.feature;
// //   feature.setStyle(
// //     new ol.style.Style({
// //       fill: new ol.style.Fill({
// //         color: 'rgba(255, 0, 0, 0.2)', // لون التظليل
// //       }),
// //       stroke: new ol.style.Stroke({
// //         color: 'red',
// //         width: 2,
// //       }),
// //     })
// //   );
// // });
// إضافة أزرار التحكم
// document.getElementById('draw-polygon').addEventListener('click', () => {
//   draw.set('type', 'Polygon');
// });

// document.getElementById('draw-line').addEventListener('click', () => {
//   draw.set('type', 'LineString');
// });

// document.getElementById('draw-point').addEventListener('click', () => {
//   draw.set('type', 'Point');
// });

// document.getElementById('clear').addEventListener('click', () => {
//   selectedMapPos.getSource().clear();
// });
// const colorPicker = document.getElementById('color-picker');

// // draw.on('drawend', (event) => {
// //   const feature = event.feature;
// //   const color = colorPicker.value;
// //   feature.setStyle(
// //     new ol.style.Style({
// //       fill: new ol.style.Fill({
// //         color: `${color}33`, // إضافة شفافية للون
// //       }),
// //       stroke: new ol.style.Stroke({
// //         color: color,
// //         width: 2,
// //       }),
// //     })
// //   );
// // });
// // إضافة مربع الإحداثيات
// const coordinateElement = document.getElementById('coordinates');
// map.on('pointermove', function (event) {
//   const coordinate = ol.proj.toLonLat(event.coordinate);
//   coordinateElement.innerHTML = `الإحداثيات: ${coordinate[0].toFixed(4)}, ${coordinate[1].toFixed(4)}`;
// });

// // إضافة أدوات الرسم
// const drawSource = new ol.source.Vector();
// const drawLayer = new ol.layer.Vector({
//   source: drawSource,
//   style: new ol.style.Style({
//     fill: new ol.style.Fill({
//       color: 'rgba(255, 0, 0, 0.2)', // لون التظليل
//     }),
//     stroke: new ol.style.Stroke({
//       color: 'red', // لون الحدود
//       width: 2,
//     }),
//   }),
// });
// map.addLayer(drawLayer);

// const draw = new ol.interaction.Draw({
//   source: drawSource,
//   type: 'Polygon', // نوع الرسم (مضلع)
// });
// map.addInteraction(draw);





map.on('click', function (e) {
  console.log(e.coordinate);
})




// map.on('click', function (e) {
//   //console.log(e.coordinate);

//   // const lonLat = toLonLat(e.coordinate);
//   // const transformedCoord = fromLonLat(lonLat);
//   // const lonLat = transform(coordinate, e.coordinate);
//   const lonLat = ol.proj.transform(e.coordinate, 'EPSG:3857', 'EPSG:4326');
//   console.log('Longitude:', lonLat[0], 'Latitude:', lonLat[1]);

//   //console.log('Longitude/Latitude (EPSG:4326):', lonLat);
//   // console.log('Transformed Coordinate (fromLonLat):', transformedCoord);
// })
