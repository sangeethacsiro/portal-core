/**
 * Represents a simple Polyline (series of straight line segments) as implemented by the Gmap API
 */
Ext.define('portal.map.openlayers.primitives.WMSOverlay', {

    extend : 'portal.map.primitives.BaseWMSPrimitive',

    config : {
        wmsLayer : null
    },

    /**
     * Accepts portal.map.primitives.BaseWMSPrimitive constructor args as well as
     *
     * map : Instance of GMap2
     */
    constructor : function(cfg) {
        this.callParent(arguments);
       
        var wmsLayer = null;
        
        var cswRecord = cfg.layer.getCSWRecordsByResourceURL(cfg.wmsUrl)
        //VT: We work on the assumption that 1 CSW Record == 1 wms layer.         
        var wmsOnlineResources = portal.csw.OnlineResource.getFilteredFromArray(cswRecord[0].get('onlineResources'), portal.csw.OnlineResource.WMS);
        var wmsVersion='1.1.1';//VT:Default to 1.1.1 unless specified
        if(wmsOnlineResources.length > 0 && wmsOnlineResources[0].get('version')){
            wmsVersion = wmsOnlineResources[0].get('version');
        }        
                        
        var singleTile = cfg.layer.get('source').get('singleTile');
        var forceWMSGet = cfg.layer.get('source').get('forceWMSGet');
        
        var cswboundingBox= this._getCSWBoundingBox(cswRecord);        

        var options = {
            layers: this.getWmsLayer(),
            version: wmsVersion,
            transparent : true,
            exceptions : 'BLANK',
            displayOutsideMaxExtent : true
        };
                
        var additionalOptions = {
            tileOptions: {},
            isBaseLayer : false,
            projection: cswboundingBox.crs,
            maxExtent: cswboundingBox.bounds,
            tileOrigin: new OpenLayers.LonLat(-20037508.34, -20037508.34),
            displayInLayerSwitcher : false
        };
        
        if (singleTile == true) {
            additionalOptions.singleTile = true;
            additionalOptions.ratio = 1;
        }
        
        if (forceWMSGet == false) {
        	additionalOptions.tileOptions.maxGetUrlLength = 1500;
        }
        
        if(this.getSld_body() && this.getSld_body().length > 0){            
            options.sld_body = this.getSld_body();
            options.styles = this._getStylesFromSLD();
            options.tiled = true;
        } 

        wmsLayer = new OpenLayers.Layer.WMS(
            this.getWmsLayer(),
            this.getWmsUrl(),
            options,
            additionalOptions
        );
        
        wmsLayer.setOpacity(this.getOpacity());
        wmsLayer._portalBasePrimitive = this;

        this.setWmsLayer(wmsLayer);
    },
    
    /*
     * Returns STYLES parameter from the SLD, which is required for ArcGIS WMS.
     * 
     * The design only permits one layer per SLD.
     */
    

    _getStylesFromSLD : function() {
        if (this.getWmsUrl().toUpperCase().indexOf("MAPSERVER/WMSSERVER") < 0) return null;
        var sld = portal.util.xml.SimpleDOM.parseStringToDOM(this.getSld_body());
        // GPT-MS : This would be better as an XPath
        // '/StyledLayerDescriptor/UserStyle/Name" but I couldn't get it to work.
        return sld.getElementsByTagName("UserStyle")[0].getElementsByTagName("Name")[0].textContent;
    },
    
    _getCSWBoundingBox : function(cswrecords){
        var bbox = null;
        var crs = null;
        for(var i=0;i<cswrecords.length;i++){
            var geoEl = cswrecords[i].get('geographicElements')[0]
            if(bbox){
                bbox = bbox.combine(geoEl);
            }else{
                bbox = geoEl;
            }
            crs=geoEl.crs;
        }

        var openlayerBoundObject = {
                bounds : new OpenLayers.Bounds(bbox.westBoundLongitude, bbox.southBoundLatitude, bbox.eastBoundLongitude, bbox.northBoundLatitude),
                crs : crs
        }

        if(crs != 'EPSG:3857'){
            openlayerBoundObject.crs='EPSG:3857';
            openlayerBoundObject.bounds = openlayerBoundObject.bounds.transform(crs,'EPSG:3857');
        }

        return openlayerBoundObject;
    }
});
