// إنشاء خريطة
const map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM(), // استخدام OpenStreetMap كخلفية
        }),
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([36.0, 34.0]), // مركز الخريطة (خط الطول والعرض)
        zoom: 7, // مستوى التكبير
    }),
});

// إضافة مربع الإحداثيات
const coordinateElement = document.getElementById('coordinates');
map.on('pointermove', function (event) {
    const coordinate = ol.proj.toLonLat(event.coordinate);
    coordinateElement.innerHTML = `الإحداثيات: ${coordinate[0].toFixed(4)}, ${coordinate[1].toFixed(4)}`;
});

// إضافة أدوات الرسم
const drawSource = new ol.source.Vector();
const drawLayer = new ol.layer.Vector({
    source: drawSource,
    style: new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255, 0, 0, 0.2)', // لون التظليل
        }),
        stroke: new ol.style.Stroke({
            color: 'red', // لون الحدود
            width: 2,
        }),
    }),
});
map.addLayer(drawLayer);

const draw = new ol.interaction.Draw({
    source: drawSource,
    type: 'Polygon', // نوع الرسم (مضلع)
});
map.addInteraction(draw);

// إضافة الرموز العسكرية
const militaryLayer = new ol.layer.Vector({
    source: new ol.source.Vector(),
});
map.addLayer(militaryLayer);

const iconStyle = new ol.style.Style({
    image: new ol.style.Icon({
        src: 'tank2.png', // مسار الصورة
        scale: 0.1, // حجم الصورة
    }),
});

const marker = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.fromLonLat([36.0, 34.0])), // موقع الرمز
});
marker.setStyle(iconStyle);
militaryLayer.getSource().addFeature(marker);

// إضافة رمز عسكري آخر
const soldierMarker = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.fromLonLat([36.5, 34.5])),
});
soldierMarker.setStyle(new ol.style.Style({
    image: new ol.style.Icon({
        src: 'soldier.png',
        scale: 0.3,
    }),
}));
militaryLayer.getSource().addFeature(soldierMarker);

// map.on('click', function (e) {
//     //console.log(e.coordinate);
//     debugger
//     const lonLat = toLonLat(e.coordinate);
//     const transformedCoord = fromLonLat(lonLat);

//     console.log('Clicked Coordinate (EPSG:3857):', e.coordinate);
//     console.log('Longitude/Latitude (EPSG:4326):', lonLat);
//     console.log('Transformed Coordinate (fromLonLat):', transformedCoord);
// })