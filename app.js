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

        /*var basi=new Array();
         basi=[new OpenLayers.Layer.XYZ("MapQuest OSM",
         ["http://otile1.mqcdn.com/tiles/1.0.0/map/${z}/${x}/${y}.png",
         "http://otile2.mqcdn.com/tiles/1.0.0/map/${z}/${x}/${y}.png",
         "http://otile3.mqcdn.com/tiles/1.0.0/map/${z}/${x}/${y}.png",
         "http://otile4.mqcdn.com/tiles/1.0.0/map/${z}/${x}/${y}.png"],
         new OpenLayers.Layer.XYZ("Imagery",
         ["http://otile1.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.png",
         "http://otile2.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.png",
         "http://otile3.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.png",
         "http://otile4.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.png"]),
         new OpenLayers.Layer.XYZ("OpenStreetMap",
         ["http://a.tile.openstreetmap.org/${z}/${x}/${y}.png",
         "http://b.tile.openstreetmap.org/${z}/${x}/${y}.png",
         "http://c.tile.openstreetmap.org/${z}/${x}/${y}.png",
         "http://d.tile.openstreetmap.org/${z}/${x}/${y}.png"])];*/

        base=new OpenLayers.Layer.XYZ("MapQuest OSM",
            ["http://otile1.mqcdn.com/tiles/1.0.0/map/${z}/${x}/${y}.png",
                "http://otile2.mqcdn.com/tiles/1.0.0/map/${z}/${x}/${y}.png",
                "http://otile3.mqcdn.com/tiles/1.0.0/map/${z}/${x}/${y}.png",
                "http://otile4.mqcdn.com/tiles/1.0.0/map/${z}/${x}/${y}.png"]);

        base1=new OpenLayers.Layer.XYZ("MapQuest OSM",
            ["http://otile1.mqcdn.com/tiles/1.0.0/map/${z}/${x}/${y}.png",
                "http://otile2.mqcdn.com/tiles/1.0.0/map/${z}/${x}/${y}.png",
                "http://otile3.mqcdn.com/tiles/1.0.0/map/${z}/${x}/${y}.png",
                "http://otile4.mqcdn.com/tiles/1.0.0/map/${z}/${x}/${y}.png"]);

        var map = new OpenLayers.Map({projection: 'EPSG:900913'});

        var oggi = new OpenLayers.Layer.WMS(
            "Bollettino Oggi",
            "http://geoavalanche.org:80/geoserver/geonode/wms",
            {layers: 'geonode:bollettino_oggi',
                styles: 'bollettino_oggi_4e521565',
                isBaseLayer: false,
                transparent: true}
        );

        var domani = new OpenLayers.Layer.WMS(
            "Bollettino Domani",
            "http://geoavalanche.org:80/geoserver/geonode/wms",
            {layers: 'geonode:bollettino_domani',
                styles: 'bollettino_domani_75161015',
                isBaseLayer: false,
                transparent: true}
        );


        var map2 = new OpenLayers.Map({projection: 'EPSG:900913'});

        map.addLayers([oggi,base]);
        map2.addLayers([domani,base1]);

        mappanel = Ext.create('GeoExt.panel.Map', {
            title: 'The GeoExt.panel.Map-class-1',
            map: map,
            center: '1560550,5236894',
            zoom: 6,
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

        mappanel2 = Ext.create('GeoExt.panel.Map', {
            title: 'The GeoExt.panel.Map-class-2',
            map: map2,
            center: '1560550,5236894',
            zoom: 6,
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
        })

        /*view = Ext.create('Ext.container.Viewport', {
         layout: 'fit',
         items: [
         mappanel
         ]
         });*/


        Ext.create('Ext.tab.Panel', {
            renderTo: document.body,
            height: '600px',
            items: [ mappanel,mappanel2]
        });

    }
});