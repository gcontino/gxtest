function AttivaControlloGetInfo(map){
    map.events.register('click', map, function (evt) {
        evtX=evt.xy.x;
        evtY=evt.xy.y;
        var evtLonLat=map.getLonLatFromPixel(evt.xy);
        var point= new OpenLayers.Geometry.Point;
        point.x=evtLonLat.lon;
        point.y=evtLonLat.lat;
        GetInfo(map,evtX,evtY,point);
    });
}

function GetInfo(map,x,y,pointLoc) {
    queryLayer=map.layers[3].params.LAYERS;
    OpenLayers.Request.GET({
					url: "http://geoavalanche.org:80/geoserver/geonode/wms",
					params: {
                        REQUEST: "GetFeatureInfo",
                        EXCEPTIONS: "text/html",
                        BBOX: map.getExtent().toBBOX(),
                        SERVICE: "WMS",
                        INFO_FORMAT: 'application/json',
                        QUERY_LAYERS: [queryLayer],
                        FEATURE_COUNT: 50,
                        Layers: [queryLayer],
						queryVisible: true,
                        WIDTH: map.size.w,
                        HEIGHT: map.size.h,
                        styles: '',
                        srs: "EPSG:900913",
						version: "1.1.1",
						x : parseInt(x),
                        y : parseInt(y)},
					success: function (request) {
                        jsonObj=$.parseJSON(request.responseText);
                        tableText="";
                        $.each(jsonObj.features, function(i){
                            titolo=jsonObj.features[i].id;
                            table_head="<table class='tablepopup'><thead><th colspan='2'>"+titolo+"</th></thead><tbody>";
                            jsonFeatProp=jsonObj.features[i].properties;
                            var table_rows="";
                            var trClass="odd";
                            $.each(jsonFeatProp, function(index, item){
                                if(trClass=="") {trClass="odd"} else {trClass=""};
                                table_rows+="<tr class='"+trClass+"'><td>"+index+"</td><td>"+item+"</td></tr>";
                            });
                            tableText+=table_head+table_rows+"<tbody></table>";
                        })
								createPopup(map,pointLoc,"Info: "+queryLayer,tableText,200);
                    }
        })
}


function createPopup(map,point,head,text,size) {
        popup = new GeoExt.Popup({
        title: head,
        location: point,
        map: map,
        width:size,
        height:330,
        overflowY: 'auto',
        html: text,
        maximizable: true,
        collapsible: true
        });
        popup.show()
    }
