Ext.require([
    'Ext.container.Viewport',
    'Ext.state.Manager',
    'Ext.state.CookieProvider',
    'Ext.window.MessageBox',
    'Ext.tab.Panel',
	'GeoExt.panel.Map'
]);

Ext.application({
    name: 'HelloGeoExt2',
    launch: function() {


        var map = new OpenLayers.Map({});
        var map2 = new OpenLayers.Map({});
        
        var ln = new OpenLayers.Layer.WMS(
            "Lazio Net",
            "http://www1.ispesl.it/geoserver/ows?",
            {layers: 'inailgis:v_lazionetwork'}
        );
		
		var meteo = new OpenLayers.Layer.WMS(
            "Meteo",
            "http://www1.ispesl.it/geoserver/ows?",
            {layers: 'inailgis:v_meteostations'}
        );
        
        map.addLayers([ln]);
		map2.addLayers([meteo]);
        
        mappanel = Ext.create('GeoExt.panel.Map', {
            title: 'The GeoExt.panel.Map-class',
            map: map,
            center: '12,41',
            zoom: 3,
            stateful: true,
            stateId: 'mappanel',
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
            title: 'The GeoExt.panel.Map-class',
            map: map2,
            center: '12.5,41.8',
            zoom: 3,
            stateful: true,
            stateId: 'mappanel2',

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
			items: [{
				title: '1',
				items: mappanel
					}, {
				title: '2',
				items: mappanel2
				}
			]
		});
		
    }
});