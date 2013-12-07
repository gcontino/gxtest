Ext.require([
    'Ext.container.Viewport',
    'Ext.state.Manager',
    'Ext.state.CookieProvider',
    'Ext.window.MessageBox',
    'Ext.tab.Panel',
    'GeoExt.panel.Map'
]);

Ext.application({
    name: 'GeoExt Test',
    launch: function() {

    //definisco le basi OpenStreetMap Tiled
    basi1=[new OpenLayers.Layer.XYZ("MapQuest OSM",
         ["http://otile1.mqcdn.com/tiles/1.0.0/map/${z}/${x}/${y}.png",
         "http://otile2.mqcdn.com/tiles/1.0.0/map/${z}/${x}/${y}.png",
         "http://otile3.mqcdn.com/tiles/1.0.0/map/${z}/${x}/${y}.png",
         "http://otile4.mqcdn.com/tiles/1.0.0/map/${z}/${x}/${y}.png"]),
         new OpenLayers.Layer.XYZ("Imagery",
         ["http://otile1.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.png",
         "http://otile2.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.png",
         "http://otile3.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.png",
         "http://otile4.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.png"]),
         new OpenLayers.Layer.XYZ("OpenStreetMap",
         ["http://a.tile.openstreetmap.org/${z}/${x}/${y}.png",
         "http://b.tile.openstreetmap.org/${z}/${x}/${y}.png",
         "http://c.tile.openstreetmap.org/${z}/${x}/${y}.png",
         "http://d.tile.openstreetmap.org/${z}/${x}/${y}.png"])];
    basi2=[basi1[0].clone(),basi1[1].clone(),basi1[2].clone()];
    basi3=[basi1[0].clone(),basi1[1].clone(),basi1[2].clone()];

    var oggi = new OpenLayers.Layer.WMS(
        "Bollettino Oggi",
        "http://geoavalanche.org:80/geoserver/geonode/wms",
        {layers: 'geonode:bollettino_oggi',
        styles: 'bollettino_oggi_4e521565',
        transparent: true});

    var domani = new OpenLayers.Layer.WMS(
        "Bollettino Domani",
        "http://geoavalanche.org:80/geoserver/geonode/wms",
        {layers: 'geonode:bollettino_domani',
        styles: 'bollettino_domani_75161015',
        transparent: true});

    var dopodomani = new OpenLayers.Layer.WMS(
        "Bollettino Dopodomani",
        "http://geoavalanche.org:80/geoserver/geonode/wms",
        {layers: 'geonode:bollettino_dopodomani',
        styles: 'bollettino_dopodomani_5f6cb4f2',
        transparent: true});

    var map1 = new OpenLayers.Map({projection: 'EPSG:900913',layers: basi1});
    var map2 = new OpenLayers.Map({projection: 'EPSG:900913',layers: basi2});
    var map3 = new OpenLayers.Map({projection: 'EPSG:900913',layers: basi3});

    map1.addControl(new OpenLayers.Control.LayerSwitcher());
    map2.addControl(new OpenLayers.Control.LayerSwitcher());
    map3.addControl(new OpenLayers.Control.LayerSwitcher());

    map1.addLayer(oggi);
    map2.addLayer(domani);
    map3.addLayer(dopodomani);

    var mappanel1 = Ext.create('GeoExt.panel.Map', {
        title: 'Previsioni Oggi',
        map: map1,
        center: '1560550,5236894',
        zoom: 5,
        dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                text: 'Current center of the map',
                handler: function(){
                    var c = GeoExt.panel.Map.guess().map.getCenter();
                    Ext.Msg.alert(this.getText(), c.toString());
                }
            }]
        }]
    });

    var mappanel2 = Ext.create('GeoExt.panel.Map', {
        title: 'Previsioni Domani',
        map: map2,
        center: '1560550,5236894',
        zoom: 5,
        dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                text: 'Current center of the map',
                handler: function(){
                    var c = GeoExt.panel.Map.guess().map.getCenter();
                    Ext.Msg.alert(this.getText(), c.toString());
                }
            }]
        }]
    });

    var mappanel3 = Ext.create('GeoExt.panel.Map', {
        title: 'Previsioni Domani',
        map: map3,
        center: '1560550,5236894',
        zoom: 5,
        dockedItems: [
            {
                xtype: 'toolbar',
                dock: 'top',
                items: [
                    {
                        text: 'Current center of the map',
                        handler: function () {
                            var c = GeoExt.panel.Map.guess().map.getCenter();
                            Ext.Msg.alert(this.getText(), c.toString());
                        }
                    }
                ]
            }
        ]
    });

    Ext.create('Ext.tab.Panel', {
        renderTo: document.body,
        height: '600px',
        items: [ mappanel1,mappanel2,mappanel3]
    });

    }
});