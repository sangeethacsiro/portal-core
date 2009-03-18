/** 
* @fileoverview This file declares the Class NVCLMarker.
* An array of objects of NVCLMarker will be maintained in StationGroup of nvcl type. 
*/

/**
* @class
* This class defines information to be stored for a nvcl marker.
*
* @constructor
* @param {DomXmlNode} pBoreholeNode The XML node for the borehole station.
* @param {String} psIcon The icon used to represent this marker.
* @return A new {@link NVCLMarker}
*/

function NVCLMarker (boreholeId, marker, description) {
  // Create the Borehole object from the XML node
  //this.moBorehole = new Borehole(pBoreholeNode);

    this.moMarker = marker;
    this.boreholeId = boreholeId;
  this.msSummaryHtml = description;
  this.msMosaicHtml = "";
  this.msPlotScalarsHtml = "";
  this.msPlotsHtml = "";

  // Create the various arrays for the borehole
  this.maMosaicTrays = new Array();
  this.maScalars = new Array();
  this.maScalarNames = new Array();
  this.maScalarNotes = new Array();
  this.maScalarSelected = new Array();
  this.mnStartDepth = 0;
  this.mnEndDepth = 0;
  this.mnSamplingInterval = 1;
  this.msPlotImageSrc = "";
		
  // Create a GMarker object for each station using the location information for the same.
  /*var longitude = this.moBorehole.moLocation.msLongitude;
  var latitude = this.moBorehole.moLocation.msLatitude;
  var oPoint = new GPoint(parseFloat(longitude), parseFloat(latitude));
  var oMarkerIcon = new GIcon(goBaseIcon, psIcon);
  var oMarker = new GMarker(oPoint, oMarkerIcon);
  this.moMarker = oMarker;

  // Add a listener for a click event on this marker
  GEvent.addListener(oMarker, "click", this.getMarkerClickedFn());*/
}

/**
* The borehole object which conforms to the gsml:borehole schema.
* @type Borehole
*/
//NVCLMarker.prototype.moBorehole = null;
NVCLMarker.prototype.boreholeId = null;

/**
* The html to be displayed on the Summary tab. 
* @type String
*/
NVCLMarker.prototype.msSummaryHtml = null;

/**
* The html to be displayed on the Mosaic tab.
* @type String
*/
NVCLMarker.prototype.msMosaicHtml = null;

/**
* The html to be displayed on the Plot Scalars tab.
* It contains the list of available and selected scalars to be plotted.
* @type String
*/
NVCLMarker.prototype.msPlotScalarsHtml = null;

/**
* The html to be displayed on the Plots tab.
* This contains the plots that are created from scalars.
* @type String
*/
NVCLMarker.prototype.msPlotsHtml = null;

/**
* Associative array 
* for storing the tray ids associated with an NVCL station's mosaic image.<br> 
* Array index - TrayIds
* @type Array
*/
NVCLMarker.prototype.maMosaicTrays = null;

/**
* Array for storing the scalars ids associated with an NVCL station.
* @type Array
*/
NVCLMarker.prototype.maScalars = null;

/**
* Associative array 
* for storing the scalar names associated with an NVCL station.<br> 
* Array index - ScalarIds
* @type Array
*/
NVCLMarker.prototype.maScalarNames = null;

/**
* Associative array 
* for storing an explanation of the scalar names associated with an NVCL station.<br> 
* Array index - ScalarIds
* @type Array
*/
NVCLMarker.prototype.maScalarNotes = null;

/**
* Associative array 
* of the selected scalars for this nvcl station.<br> 
* Array index - ScalarIds
* @type Array
*/
NVCLMarker.prototype.maScalarSelected = null;

/** 
* Start depth for plotting scalars for this NVCL borehole.
* @type Number
*/
NVCLMarker.prototype.mnStartDepth = null;

/** 
* End depth for plotting scalars for this NVCL borehole.
* @type Number
*/
NVCLMarker.prototype.mnEndDepth = null;

/** 
* Sampling interval for plotting scalars for this NVCL borehole.
* @type Number
*/
NVCLMarker.prototype.mnSamplingInterval = null;

/**
* The source for the image of the plotted scalars for this NVCL borehole.
* @type String
*/
NVCLMarker.prototype.msPlotImageSrc = null;

/**
* The GMarker for the displaying the station as a marker on the map.
* @type GMarker
*/
NVCLMarker.prototype.moMarker = null;

/**
* The html id for the div of available scalars list.
* @type String
*/
NVCLMarker.prototype.msAvailableListId = "available_scalars";

/**
* The html id for the div of selected scalars list.
* @type String
*/
NVCLMarker.prototype.msSelectedListId = "selected_scalars";

/**
* The html id for the add scalars button.
* @type String
*/
NVCLMarker.prototype.msAddBtnId = "scalars_add_button";

/**
* The html id for the remove scalars button.
* @type String
*/
NVCLMarker.prototype.msRemoveBtnId = "scalars_remove_button";

/**
* The html id for the plot scalars button.
* @type String
*/
NVCLMarker.prototype.msPlotBtnId = "scalars_plot_button";

/**
* The assignment of function implementations for NVCLMarker
*/ 
NVCLMarker.prototype.getMarkerClickedFn = NVCLMarker_getMarkerClickedFn;

NVCLMarker.prototype.markerClicked = NVCLMarker_markerClicked;

NVCLMarker.prototype.displayInfoWindow = NVCLMarker_displayInfoWindow;

NVCLMarker.prototype.updateInfoWindow = NVCLMarker_updateInfoWindow;

NVCLMarker.prototype.createSummaryTabHtml = NVCLMarker_createSummaryTabHtml;

NVCLMarker.prototype.createMosaicTabHtml = NVCLMarker_createMosaicTabHtml;

NVCLMarker.prototype.createPlotScalarsTabHtml = NVCLMarker_createPlotScalarsTabHtml;

NVCLMarker.prototype.createPlotsTabHtml = NVCLMarker_createPlotsTabHtml;

NVCLMarker.prototype.moveScalarsInLists = NVCLMarker_moveScalarsInLists;

NVCLMarker.prototype.getMoveScalarsInLists = NVCLMarker_getMoveScalarsInLists;

NVCLMarker.prototype.plotSelectedScalars = NVCLMarker_plotSelectedScalars;

NVCLMarker.prototype.getPlotSelectedScalars = NVCLMarker_getPlotSelectedScalars;


/**
* This function returns the function
* which should be called when the oMarker for this station is clicked.
* @returns Function to be called when a station marker is clicked - {@link #markerClicked}
*/
function NVCLMarker_getMarkerClickedFn() {
  var nvclMarker = this;
  return function() {
    nvclMarker.markerClicked();
  }
}

/**
* The function called when a marker is clicked.<br>
* This creates the html popup marker displaying station information.<br>  
* It calls the nvcl web service -
* <a href="http://nvcl.csiro.au/scalars.asmx/get">http://nvcl.csiro.au/scalars.asmx/get</a>
*/ 
function NVCLMarker_markerClicked()
{
  var oNVCLMarker = this;
  //var oBorehole = this.moBorehole;
  
  // msId is of the format nvcl_core.4
  // We need to strip the nvcl_core: part to get the actual coreid
  // accepted by all nvcl web services
  var sCoreId = this.boreholeId.substring(10);//oBorehole.msId.substring(10);
	
  // Web service to get the scalars belonging to a given borehole
  //var scalars_proxy = top.location.protocol + "//" + top.location.host + "/geodesyworkflow/nvcl/scalars";
  var scalars_proxy = ProxyURL + "http://150.229.98.207/scalars.asmx/get";

  scalars_proxy += "?coreid=" + sCoreId;
  
  var downloadProxy ="/downloadProxy?rest=true&url=";
  var vocabs_proxy = downloadProxy + "http://apacsrv2.arrc.csiro.au/vocab-service/query?repository=nvcl-scalars%26label=";
  
  if (this.maScalars.length == 0) {
	GDownloadUrl(scalars_proxy, function(pData, pResponseCode) {    
      if(pResponseCode == 200) {
        // Call the parse function to read the XML data from the file.
        var xmlDoc = GXml.parse(pData);
        if (g_IsIE)
          xmlDoc.setProperty("SelectionLanguage", "XPath");

        var rootNode = xmlDoc.documentElement;
        if (!rootNode) {
          return;
        } 	
        	
        var aScalars = rootNode.getElementsByTagName("Scalars");
        	
   		var scalar_index = 0;
    	for(var i=0; i < aScalars.length; i++) {
    	  var nvclStation = aScalars[i];
            
          // Extract Name and ID for all Scalars
          var sScalarId = GXml.value(nvclStation.selectSingleNode("*[local-name() = 'Scalar_ID']"));
          var sScalarName = GXml.value(nvclStation.selectSingleNode("*[local-name() = 'Name']"));
    			
          if (sScalarId != "" && sScalarName != "") {
            oNVCLMarker.maScalars[scalar_index] = sScalarId;
            oNVCLMarker.maScalarNames[sScalarId] = sScalarName;
            oNVCLMarker.maScalarSelected[sScalarId] = false;
            scalar_index++;	
          }	
        }
        oNVCLMarker.createSummaryTabHtml();
        oNVCLMarker.createMosaicTabHtml();
      }
    });
    
    // get vocab
    for(var i=0; i < oNVCLMarker.maScalars.length; i++) {
      
      // TODO why doesn't that work? copied that line from below, oNVCLMarker.maScalars is correct in debugger!
      var scalarId = oNVCLMarker.maScalars[i];

      var vocabs_query = vocabs_proxy + oNVCLMarker.maScalarNames[oNVCLMarker.maScalars[i]];
      GDownloadUrl(vocabs_query, function(pData, pResponseCode) {
        if(pResponseCode == 200) {
          var vocabXmlDoc = GXml.parse(pData);
          var vocabRootNode = vocabXmlDoc.documentElement;
          if (!vocabRootNode) {
            return;
          }
          if (g_IsIE)
            vocabRootNode.setProperty("SelectionLanguage", "XPath");
          
          var aConcepts = vocabRootNode.getElementsByTagName("skos:Concept");
          
          // TODO also doesn't seem to work. why?
          if (aConcepts.length == 0) {
            return;
          }
          var sScopeNote = GXml.value(aConcepts[0].selectSingleNode("*[local-name() = 'scopeNote']"));

          oNVCLMarker.maScalarNotes[oNVCLMarker.maScalars[i]] = sScopeNote;
        }
      });
    }
    // end get vocab

  } else {
    oNVCLMarker.createSummaryTabHtml();
    oNVCLMarker.createMosaicTabHtml();
  }
}


/**
* Function to create the html to be displayed in the <b>Summary</b> tab
* of the information window of the marker.<br> 
* It stores the html string in the member {@link #msSummaryHtml}
*/
function NVCLMarker_createSummaryTabHtml() {

  /*var oBorehole = this.moBorehole;
  var sLatitude = oBorehole.moLocation.msLatitude;
  var sLongitude = oBorehole.moLocation.msLongitude;

  // The arrays to be used here are the ones that were populated in oBorehole object.
  var sBoreholeName = oBorehole.msName;
  var sProjectName = oBorehole.msProject;
  var sDateOfDrilling = oBorehole.msDateOfDrilling;
  var sDriller = oBorehole.msDriller;
  var sDrillingMethod = oBorehole.msDrillingMethod;
  var sInclinationType = oBorehole.msInclinationType;
  var sNominalDiameter = oBorehole.msNominalDiameter;
  var sOperator = oBorehole.msOperator;
  var sCoreCustodian = oBorehole.msCoreCustodian;
  var sStartPoint = oBorehole.msStartPoint;
  var sCoredInterval = oBorehole.msCoredInterval;

  var summaryHtml = "";
	
  // Create the html to be displayed in the "Main" tab of the popup window.
  // We create this html once and store it in the msSummaryHtml array.
  if (!this.msSummaryHtml) {
    // Outermost div
    summaryHtml += '<div style="overflow:auto; font-size:12px; line-height:12px; width: 400px">';
   	summaryHtml += '<table style="height:400px; width:100%">';
    
    // First row of the table is the actual summary data
    summaryHtml += '<tr height="90%"><td>';
    
    // Table to display the summary data
    summaryHtml += '<table cellspacing="0" border="0" width="100%" style="position:absolute; left:0px; top:10px">';
    summaryHtml += '<tr><td bgcolor="#4682B4">';				
    summaryHtml += '<table cellspacing="1" cellpadding="2" border="0" width="100%">';
    summaryHtml += '<tr><td bgcolor="#e9f1f1" width="30%" height="20px" nowrap><font color="black" size="1">Borehole Name</font></td>';
    summaryHtml += '<td bgcolor="#e9f1f1" width="70%" height="20px"><font color="black" size="1">&nbsp;' + sBoreholeName + '</font></td></tr>';
    summaryHtml += '<tr><td bgcolor="#e9f1f1" width="30%" height="20px" nowrap><font color="black" size="1">Lat Lng (deg)</font></td>';
    summaryHtml += '<td bgcolor="#e9f1f1" width="70%" height="20px"><font color="black" size="1">&nbsp;' + sLatitude + ', ' + sLongitude + '</font></td></tr>';
    
    summaryHtml += '<tr><td bgcolor="#e9f1f1" width="30%" height="20px" nowrap><font color="black" size="1">Project</font></td>';
    summaryHtml += '<td bgcolor="#e9f1f1" width="70%" height="20px"><font color="black" size="1">&nbsp;' + sProjectName +'</font></td></tr>';
    summaryHtml += '<tr><td bgcolor="#e9f1f1" width="30%" height="20px" nowrap><font color="black" size="1">Core Custodian</font></td>';
    summaryHtml += '<td bgcolor="#e9f1f1" width="70%" height="20px"><font color="black" size="1">&nbsp;' + sCoreCustodian + '</font></td></tr>';
    summaryHtml += '<tr><td bgcolor="#e9f1f1" width="30%" height="20px" nowrap><font color="black" size="1">Operator</font></td>';
    summaryHtml += '<td bgcolor="#e9f1f1" width="70%" height="20px"><font color="black" size="1">&nbsp;' + sOperator + '</font></td></tr>';
    summaryHtml += '<tr><td bgcolor="#e9f1f1" width="30%" height="20px" nowrap><font color="black" size="1">Date of Drilling</font></td>';
    summaryHtml += '<td bgcolor="#e9f1f1" width="70%" height="20px"><font color="black" size="1">&nbsp;' + sDateOfDrilling + '</font></td></tr>';
    summaryHtml += '<tr><td bgcolor="#e9f1f1" width="30%" height="20px" nowrap><font color="black" size="1">Driller</font></td>';
    summaryHtml += '<td bgcolor="#e9f1f1" width="70%" height="20px"><font color="black" size="1">&nbsp;' + sDriller + '</font></td></tr>';
    summaryHtml += '<tr><td bgcolor="#e9f1f1" width="30%" height="20px" nowrap><font color="black" size="1">Drilling Method</font></td>';
    summaryHtml += '<td bgcolor="#e9f1f1" width="70%" height="20px"><font color="black" size="1">&nbsp;' + sDrillingMethod + '</font></td></tr>';
    summaryHtml += '<tr><td bgcolor="#e9f1f1" width="30%" height="20px" nowrap><font color="black" size="1">Inclination Type</font></td>';
    summaryHtml += '<td bgcolor="#e9f1f1" width="70%" height="20px"><font color="black" size="1">&nbsp;' + sInclinationType + '</font></td></tr>';
    summaryHtml += '<tr><td bgcolor="#e9f1f1" width="30%" height="20px" nowrap><font color="black" size="1">Nominal Diameter</font></td>';
    summaryHtml += '<td bgcolor="#e9f1f1" width="70%" height="20px"><font color="black" size="1">&nbsp;' + sNominalDiameter + '</font></td></tr>';
    summaryHtml += '<tr><td bgcolor="#e9f1f1" width="30%" height="20px" nowrap><font color="black" size="1">Start Point</font></td>';
    summaryHtml += '<td bgcolor="#e9f1f1" width="70%" height="20px"><font color="black" size="1">&nbsp;' + sStartPoint + '</font></td></tr>';
    
    summaryHtml += '</table></td></tr></table>'; // End of summary data table 
    summaryHtml += '</td></tr>';
    
    // Second row is for the ZoomIn nd ZoomOut links
    summaryHtml += '<tr><td>';
    summaryHtml += '<div style="font-size:12px; line-height:12px;">';
    summaryHtml += '<a href="javascript:Map_zoomInAtPoint('+sLatitude+','+sLongitude+');"><font color="blue">Zoom In</font></a>&nbsp;|&nbsp;';
    summaryHtml += '<a color="blue" href="javascript:Map_zoomOutAtPoint('+sLatitude+','+sLongitude+');"><font color="blue">Zoom Out</font></a>';
    summaryHtml += '</div>';
    summaryHtml += '</td></tr>'; // End of second row
    summaryHtml += '</table></div>'; // End of outermost div 
	                      
    this.msSummaryHtml = summaryHtml;
  }*/
}

/**
* Function to create the html to be displayed in the <b>Mosaic</b> tab
* of the information window of the marker.<br> 
* It stores the html string in the member {@link #msMosaicHtml}.<br>
* It calls the nvcl web service - <a href="http://nvcl.csiro.au/scalars.asmx/trayids">http://nvcl.csiro.au/scalars.asmx/trayids</a> and 
* <a href="http://nvcl.csiro.au/Display_Tray_Thumb.aspx">http://nvcl.csiro.au/Display_Tray_Thumb.aspx</a> 
*/
function NVCLMarker_createMosaicTabHtml() {

  var oNVCLMarker = this;
  //var oBorehole = this.moBorehole;
  var mosaicHtml = "";
	
  // msId is of the format nvcl_core.4
  // We need to strip the nvcl_core: part to get the actual coreid
  // accepted by all nvcl web services
  var sCoreId = this.boreholeId.substring(10);//oBorehole.msId.substring(10);
  
  // Check if the mosaic image has already been downloaded.
  if (!this.msMosaicHtml) {
    //var sMosaicUrl = top.location.protocol + "//" + top.location.host + "/geodesyworkflow/nvcl/mosaic/trays?";
    var sMosaicUrl = ProxyURL + "http://150.229.98.207/scalars.asmx/trayids?";
    sMosaicUrl += "coreid=" + sCoreId;
		
    GDownloadUrl(sMosaicUrl, function(pData, pResponseCode) {    
      if(pResponseCode == 200) {
        var xmlDoc = GXml.parse(pData);
        if (g_IsIE)
          xmlDoc.setProperty("SelectionLanguage", "XPath");

        var rootNode = xmlDoc.documentElement;
        if (!rootNode) {
          return;
        }
				
        aTrays = rootNode.getElementsByTagName("trayids");
        var nTrayIndex = 0;

        // Extract all tray ids from the XML document.
        for(var i=0; i < aTrays.length; i++) {
          var trayNode = aTrays[i];
          sTrayId = GXml.value(trayNode.selectSingleNode("*[local-name() = 'Tray_ID']"));
    					
          if (sTrayId != "") {
            oNVCLMarker.maMosaicTrays[nTrayIndex] = sTrayId;
            nTrayIndex++;	
          }
        }
    	
        if (nTrayIndex != 0) {
          // Link to open the moscaic image in a new window
          //var newMosaicHtmlUrl = top.location.protocol + "//" + top.location.host + "/GoogleMap/html/mosaic_image.html?coreid=" + sCoreId;
            var newMosaicHtmlUrl = "html/mosaic_image.html?coreid=" + sCoreId;
          mosaicHtml += '<div id="div_new_mosaic_window" style="height:20px; width:100%; text-align:center">'
          mosaicHtml += '<a id="a_new_mosaic_window" target="_blank" href="'+newMosaicHtmlUrl+'"> Open in a new window </a><br/>';
          mosaicHtml += '</div>';
            
          // The actual mosaic image
          // Each mosaic is 200px wide and we need to fit three of them in each row.
          mosaicHtml += '<div style="height:400px; width:650px; overflow:auto; text-align:left">';
          var columnCounter = 0;
            
          // Each tray image has a thumbnail and an enlarged version.
          // This is common part of the web service for each tray.
          //var trayImageThmbUrlCmn = top.location.protocol + "//" + top.location.host + "/geodesyworkflow/nvcl/tray/thumb?coreid=" + sCoreId;
            var trayImageThmbUrlCmn = ProxyURL+"http://150.229.98.207/Display_Tray_Thumb.aspx?coreid=" + sCoreId;
            var trayImageThmbUrl = "";
          //var trayImageUrlCmn = top.location.protocol + "//" + top.location.host + "/geodesyworkflow/nvcl/tray/image?coreid=" + sCoreId;
            var trayImageUrlCmn = ProxyURL+"http://150.229.98.207/Display_Tray_Full.aspx?coreid=" + sCoreId;
            var trayImageUrl = "";
                      						
          for(var i=0; i<oNVCLMarker.maMosaicTrays.length; i++) {
            // Check if we should break line.
            // We are displaying 3 trays per row.
            if (!(i%3)) {
              mosaicHtml += '<br/>';
            }
              
            // Create the complete request for the tray image by appending the tray id      						
            trayImageUrl = trayImageUrlCmn + '&trayid=' + oNVCLMarker.maMosaicTrays[i];
            trayImageThmbUrl = trayImageThmbUrlCmn + '&trayid=' + oNVCLMarker.maMosaicTrays[i];
              
            // The href is so that clicking on any tray opens an enlarged version of it in a new tab.
            mosaicHtml += '<a target="_blank" href="' + trayImageUrl + '">';
            mosaicHtml += '<img src="'+ trayImageThmbUrl +'" style="border-width:0px;width:200px;" />';
            mosaicHtml += '</a>';
              
            // Download the image.
            GDownloadUrl (trayImageThmbUrl, function(pData, pResponseCode){});
          }
          mosaicHtml += '</div>';
        } else {
          // No mosaic image for this borehole
          mosaicHtml += '<div style="height:20px; overflow:auto; color: red">';
          mosaicHtml += "No mosaic image for this borehole";
          mosaicHtml += '</div>';
        }
        oNVCLMarker.msMosaicHtml = mosaicHtml;
      } else {
        // Incase of an error while downloading the image,
        // set the mosaic tab to display an error message
        mosaicHtml += '<div style="color:red">Cannot retreive mosaic image for this borehole.';
        mosaicHtml += '<br/>Please try again later.</div>';
        oNVCLMarker.msMosaicHtml = mosaicHtml;
      }
      oNVCLMarker.displayInfoWindow();
    });
  } else {
    // If the mosaic image has already been downloaded,
    // continue to open the marker.
    oNVCLMarker.displayInfoWindow();
  }
}

/**
* Function to create the html to be displayed in the <b>Plot Scalars</b> tab
* of the information window of the marker.<br>
* @returns The html for the <b>Plot Scalars</b> tab.
*/
function NVCLMarker_createPlotScalarsTabHtml() { 
	
  var oNVCLMarker = this;
  //var oBorehole = this.moBorehole;
  var plotScalarHtml = "";
									
  if (oNVCLMarker.maScalars.length == 0) {
    // No scalars for this borehole
    plotScalarHtml += '<div style="color:red">No scalars for this borehole</div>';
  } else {
    var nListSize = 20;

    // If the number of scalars is less than nListSize
    if (oNVCLMarker.maScalars.length < nListSize) {
      nListSize = oNVCLMarker.maScalars.length;
    }
		
    // Add the Available Scalars List Box
    plotScalarHtml += '<table width="100%" style="font-size:11px">';
    plotScalarHtml += '<tr><td width="45%" align="center" bgcolor="#E0EEEE" colspan="2">';
    plotScalarHtml += '<div style="font-size:12px; height:20px; background-color:#3e91da; color:#ffffff; text-align:left">&nbsp;&nbsp;Available Scalars</div>';
    plotScalarHtml += '<div id="div_available_scalars">'; 
    plotScalarHtml += '<select name="avaiable_scalars" id="'+oNVCLMarker.msAvailableListId+'" style="width:100%" multiple="true" size="'+nListSize+'">';
    
    for (var i=0; i<oNVCLMarker.maScalars.length; i++) {
      var scalarId = oNVCLMarker.maScalars[i];
      if (oNVCLMarker.maScalarSelected[scalarId] == false) {
        plotScalarHtml += '<option value="'+scalarId;
        plotScalarHtml += '" title="'+oNVCLMarker.maScalarNotes[scalarId]+'">';
        plotScalarHtml += oNVCLMarker.maScalarNames[scalarId];
      }
    }
    plotScalarHtml += '</select>';
    plotScalarHtml += '</div></td>';
		
    // Add the "Add" and "Remove" buttons
    plotScalarHtml += '<td width="10%" align="center">';
    plotScalarHtml += '<div id="div_add_remove_btns">';
    plotScalarHtml += '<button id="'+oNVCLMarker.msAddBtnId+'" style="width:70px" > Add </button><br/><br/>';
    plotScalarHtml += '<button id="'+oNVCLMarker.msRemoveBtnId+'" style="width:70px"> Remove </button>';
    plotScalarHtml += '</div></td>';
	
    // Add the selected Scalars list box
    plotScalarHtml += '<td width="45%" align="center" bgcolor="#E0EEEE"  colspan="2">';
    plotScalarHtml += '<div style="font-size:12px; height:20px; background-color:#3e91da; color:#ffffff; text-align:left">&nbsp;&nbsp;Selected Scalars</div>';
    plotScalarHtml += '<div id="div_selected_scalars">'; 
    plotScalarHtml += '<select name="selected_scalars" id="'+oNVCLMarker.msSelectedListId+'" style="width:100%" multiple="true" size="'+nListSize+'">';
    
    for (var i=0; i<oNVCLMarker.maScalars.length; i++) {
      var scalarId = oNVCLMarker.maScalars[i];
      if (oNVCLMarker.maScalarSelected[scalarId] == true) {
        plotScalarHtml += '<option value="'+scalarId+'">'
        plotScalarHtml += oNVCLMarker.maScalarNames[scalarId];
      }
    }
    plotScalarHtml += '</select>';
    plotScalarHtml += '</div></td></tr>';
			
    // Start depth		
    plotScalarHtml += '<tr><td align="left" width="22%"><br/>';
    plotScalarHtml += '<form><table cellpadding="1" cellspacing="0" border="0" style="width:100%">';
    plotScalarHtml += '<tr>';
    plotScalarHtml += '<td rowspan="2" width="60%" style="color:#000000" align="right">Start Depth(m)</td>';
    plotScalarHtml += '<td rowspan="2" width="20%"><input id="start_depth" type="text" name="start_depth" value="'+oNVCLMarker.mnStartDepth+'" style="width:80%;height:14px;text-align:right" /></td>';
    plotScalarHtml += '<td width="20%"><input class="spinner_button" type=button value=" + " onclick="this.form.start_depth.value++;"></td>';
    plotScalarHtml += '</tr>';
    plotScalarHtml += '<tr>';
    plotScalarHtml += '<td width="20%"><input class="spinner_button" type=button value=" - " onclick="this.form.start_depth.value--;" ></td>';
    plotScalarHtml += '</tr></table></form>';
    plotScalarHtml += '</td>';
		
    // End depth
    plotScalarHtml += '<td align="left" width="22%"><br/>';
    plotScalarHtml += '<form><table cellpadding="1" cellspacing="0" border="0" style="width:100%">';
    plotScalarHtml += '<tr>';
    plotScalarHtml += '<td rowspan="2" width="55" style="color:#000000" align="right">End Depth(m)</td>';
    plotScalarHtml += '<td rowspan="2" width="25"><input id="end_depth" type="text" name="end_depth" value="'+oNVCLMarker.mnEndDepth+'" style="width:80%;height:14px;text-align:right" /></td>';
    plotScalarHtml += '<td width="20%"><input class="spinner_button" type=button value=" + " onclick="this.form.end_depth.value++;"></td>';
    plotScalarHtml += '</tr><tr>';
    plotScalarHtml += '<td width="20%"><input class="spinner_button" type=button value=" - " onclick="this.form.end_depth.value--;"></td>';
    plotScalarHtml += '</tr></table></form>';
    plotScalarHtml += '</td>';

    // Empty column for alignment
    plotScalarHtml += '<td align="left"><br/>';
    plotScalarHtml += '</td>';
		
    // Sampling interval
    plotScalarHtml += '<td align="left" width="22%"><br/>';
    plotScalarHtml += '<form><table cellpadding="1" cellspacing="0" border="0" style="width:100%">';
    plotScalarHtml += '<tr>';
    plotScalarHtml += '<td rowspan="2" width="55" style="color:#000000" align="right">Interval(m) &nbsp;</td>';
    plotScalarHtml += '<td rowspan="2" width="25"><input id="sample_int" type="text" name="sample_int" value="'+oNVCLMarker.mnSamplingInterval+'" style="width:80%;height:14px;text-align:right" /></td>';
    plotScalarHtml += '<td width="20%"><input class="spinner_button" type=button value=" + " onclick="this.form.sample_int.value++;"></td>';
    plotScalarHtml += '</tr><tr>';
    plotScalarHtml += '<td width="20%"><input class="spinner_button" type=button value=" - " onclick="this.form.sample_int.value--;"></td>';		
    plotScalarHtml += '</tr></table></form>';
    plotScalarHtml += '</td>';
		
    // Empty column for alignment
    plotScalarHtml += '<td align="left">';
    plotScalarHtml += '</td></tr>';

    // Plot button
    plotScalarHtml += '<tr>';
    plotScalarHtml += '<td colspan=2 align="center" style="color:#000000" valign="top">';
    plotScalarHtml += '(Please use 0 and 0 for the entire depth)';
    plotScalarHtml += '</td>';
    plotScalarHtml += '<td colspan=3 align="right">';
    plotScalarHtml += '<div id="div_plot_btn" style="vertical-align:middle"><br/>';
    plotScalarHtml += '<button id="'+oNVCLMarker.msPlotBtnId+'" style="width:80px"> Plot </button><br/>';
    plotScalarHtml += '</div></td></tr>';

    // Messages row
    plotScalarHtml += '<tr>';
    plotScalarHtml += '<td colspan=5 align="center" valign="top">';
    plotScalarHtml += '<div id="div_messages" style="color:blue; font-weight:bold">';
    plotScalarHtml += 'Please add scalars to the "Select Scalars" table and then click on "Plot"';
    plotScalarHtml += '</div></td></tr>';
		
    plotScalarHtml += '</table>';
  }
  return plotScalarHtml;	
}

/**
* Function to open a <b>InfoWindowTabsHtml</b> for the marker clicked.<br>
* This function assumes that all the data to be downloaded for the borehole,
* like  mosaic images, list of scalars, has been downloaded.
*/
function NVCLMarker_displayInfoWindow() {
  
  var oNVCLMarker = this;
  //var oBorehole = this.moBorehole;
  var oMarker = this.moMarker;
		
  /**
   * The popup for a marker contains 4 tabs -
   * Summary - contains the basic information about the borehole like id, name etc
   * Mosaic - has the mosaic images for the borehole
   * Plot Scalars - allows users to choose from the list of scalars available for the borehole
   * and plot them.
   * Plots - The resultant plots from the tab 3 operation.
   */
  var label1 = "Summary";
  var label2 = "Mosaic";
  var label3 = "Plot Scalars";
  var label4 = "Plots";
	
  // Get the summary tab html
  //var summaryHtml = this.msSummaryHtml;
	
  // Get the mosaic images for the borehole
  var mosaicHtml = this.msMosaicHtml;

  //oMarker.openInfoWindowTabsHtml([new GInfoWindowTab(label1, summaryHtml),
//									new GInfoWindowTab(label2, mosaicHtml)]);

    oMarker.openInfoWindowTabsHtml([new GInfoWindowTab(label2, mosaicHtml)]);
	
  // Create the Plot Scalars tab html
  var plotScalarsHtml = this.createPlotScalarsTabHtml();

  if (this.maScalars.length == 0) {	
    // If the borehole does not have any scalars, no need to make the 4th tab
    // Open the popup window for the marker with the tabs Summary, Mosaic and Plot Scalars
    oMarker.openInfoWindowTabsHtml([new GInfoWindowTab(label1, this.msSummaryHtml),
                                    new GInfoWindowTab(label2, mosaicHtml),
                                    new GInfoWindowTab(label3, plotScalarsHtml)]);
  } else {
    // Create the 3rd tab only if there are any scalars for this borehole 
    var plotsHtml = this.createPlotsTabHtml();
    
    // Open the popup window for the marker with the tabs Summary, Plot Scalars and Plots
    oMarker.openInfoWindowTabsHtml([new GInfoWindowTab(label1, this.msSummaryHtml),
                                    new GInfoWindowTab(label2, mosaicHtml),
                                    new GInfoWindowTab(label3, plotScalarsHtml),
                                    new GInfoWindowTab(label4, plotsHtml)]);
                                    
    setTimeout( function(){oNVCLMarker.updateInfoWindow()}, 500);
  }
}

/**
* Function to update the onclick events for the 
* <b>Add</b>, <b>Remove</b> and <b>Plot</b> buttons
* on the <b>Plot Scalars</b> tab of the information window.<br>
* This function is called after a delay of 500ms to give map
* some time to render the window. 
*/
function NVCLMarker_updateInfoWindow() {
  
  // Set onclick functions for all the buttons.
  // The buttons should rendered on the map before we can
  // update the functions associated with the events.
  var addBtn = document.getElementById(this.msAddBtnId);
  if(addBtn) {
    addBtn.onclick = this.getMoveScalarsInLists(this.msAvailableListId, this.msSelectedListId, true);
  }
  var removeBtn = document.getElementById(this.msRemoveBtnId);
  if(removeBtn) {
    removeBtn.onclick = this.getMoveScalarsInLists(this.msSelectedListId, this.msAvailableListId, false);
  }	
  var plotBtn = document.getElementById(this.msPlotBtnId);
  if(plotBtn) {
    plotBtn.onclick = this.getPlotSelectedScalars();
  }		
 
}

/**
* Function to create the html to be displayed in the <b>Plots</b> tab
* of the information window of the marker.<br>
* @returns The html to be displayed in the <b>Plots</b> tab.
*/
function NVCLMarker_createPlotsTabHtml() {

  var oNVCLMarker = this;
  //var oBorehole = this.moBorehole;
  var plotsHtml = "";
	
  if (this.msPlotImageSrc == "") {
    plotsHtml += '<div id="div_new_window" style="height:20px; width:100%; text-align:center">'
    plotsHtml += '<a id="a_new_window" href="' + gsNoSclarasPlottedImg + '" style="display: none"> Open in a new window </a><br/>';
    plotsHtml += '</div>';
		
    // Initially we display a blank image
    // It is important that the blank text be displayed as an image and not as text.
    // Because, the GInfoWindow cannot be resized at runtime, 
    // once a plot is actually download, it will simple overflow the popup window.
    // So we kind of set the initial size of the window to a large one with this dummy image.
    plotsHtml += '<div id="div_plotted_scalars" style="height:400px; width:100%; overflow: auto; text-align:center">';
    plotsHtml += '<img id="plot_image" src="' + gsNoSclarasPlottedImg + '">';
    plotsHtml += '</div>';
		
  } else {
    plotsHtml += '<div id="div_new_window" style="height:20px; width:100%; text-align:center">'		
    plotsHtml += '<a id="a_new_window" href="' + this.msPlotImageSrc + '" target="_blank"> Open in a new window </a><br/>';
    plotsHtml += '</div>';
    plotsHtml += '<div id="div_plotted_scalars" style="height:400px; width:100%; overflow: auto; text-align:center">';
    plotsHtml += '<img id="plot_image" src="' + this.msPlotImageSrc + '">';
    plotsHtml += '</div>';
  }
  return plotsHtml;		
}

/**
* This function returns the actual function to be called 
* with the <b>Add</b> and <b>Remove</b> buttons in the <b>Plot Scalars</b> tab.<br>
* @param {String} pFromListBox The html id for the source list.
* @param {String} pToListBox The html id for the target list.
* @param {Boolean} pIsSelecting Flag indicating whether the scalars are being added to the Selected Scalars list.
* @returns Function to move scalars within the scalars lists - {@link #moveScalarsInLists} 
*/
function NVCLMarker_getMoveScalarsInLists(pFromListBox, pToListBox, pIsSelecting) {
  var nvclMarker = this;
  var bIsSelecting = pIsSelecting;
  var sFromListBox = pFromListBox;
  var sToListBox = pToListBox;
  return function() {
    nvclMarker.moveScalarsInLists(sFromListBox, sToListBox, bIsSelecting);
  }
}

/**
* This function moves the selected items from one list to the other.<br>
* It is not a generic function 
* because it also updates the list of selected scalars for the borehole.<br>
* This array {@link #maScalarSelected} is used to recreate the user selection,
* the next time the user visits the same borehole.
* @param {String} pFromListBox The html id for the source list.
* @param {String} pToListBox The html id for the target list.
* @param {Boolean} pIsSelecting Flag indicating whether the scalars are being added to the Selected Scalars list.
*/
function NVCLMarker_moveScalarsInLists(pFromListBox, pToListBox, pIsSelecting) {

  var oFromList = document.getElementById(pFromListBox);
  var oToList = document.getElementById(pToListBox); 
	
  if ((oFromList != null) && (oToList != null)) {
    // No items in the list 
    if(oFromList.length < 1)
      return;	
  		
    // When no Item is selected the index will be -1
    if(oFromList.options.selectedIndex == -1)
      return;

    while ( oFromList.options.selectedIndex >= 0 ) {
      // Create a new instance of ListItem 
      var oListItem = new Option();  
      
      oListItem.text = oFromList.options[oFromList.options.selectedIndex].text; 
      oListItem.value = oFromList.options[oFromList.options.selectedIndex].value;
   			
      //Append the item in Target Listbox 
      oToList.options[oToList.length] = oListItem;
   			
      //Remove the item from Source Listbox 
      oFromList.remove(oFromList.options.selectedIndex);  
   			
      this.maScalarSelected[oListItem.value] = pIsSelecting;
    }	

    // Sort the target list
    // Prepare variables
    var arrLookup = new Array();  // To quickly find the index of the text
    var arrToList = new Array();  // To use JavaScripts builtin sort
    var newToList = oToList.cloneNode(false);   // Only clone the parent
   			
    // Prepare the sorting arrays
    for( var i = 0; i < oToList.length; i++)  {
      arrLookup[oToList.options.item(i).value] = i;
      arrToList[i] = oToList.options.item(i).value;
    }
    arrToList.sort(); // <-- Where the action really occurs

    // Decrement to keep the index from being affected
    for( var i = arrToList.length - 1; i >= 0; i-- ) {
      // Use insertBefore instead of appendChild because of decrementing.
      newToList.insertBefore(oToList.options.item(arrLookup[arrToList[i]]).cloneNode(true), newToList.options.item(0));
    }

    // Swap the unsorted node with the sorted one.
    oToList.parentNode.replaceChild(newToList,oToList);
  } 
}

/**
* This function returns the actual function to be called 
* with the <b>Plot</b> button in the <b>Plot Scalars</b> tab.
* @returns Function to plot the selected scalars for a station - {@link #plotSelectedScalars}  
*/
function NVCLMarker_getPlotSelectedScalars() {
  var nvclMarker = this;

  return function () {
    nvclMarker.plotSelectedScalars();
  }
}
/**
* Function to plot the scalars selected by the user.<br>
* It calls the nvcl web service -
* <a href="http://nvcl.csiro.au/plotscalar.aspx">http://nvcl.csiro.au/plotscalar.aspx</a>
*/
function NVCLMarker_plotSelectedScalars() {

  var oNVCLMarker = this;
  //var oBorehole = this.moBorehole;
  var mosaicHtml = "";
	
  // msId is of the format nvcl_core.4
  // We need to strip the nvcl_core: part to get the actual coreid
  // accepted by all nvcl web services
  var sCoreId = this.boreholeId.substring(10);//oBorehole.msId.substring(10);
	
  var oSelectedListBox = document.getElementById(this.msSelectedListId);
  var oMessagesDiv = document.getElementById("div_messages");
	
  if (oSelectedListBox != null) {
    // Extract all items from the selected scalars list box
    var sSelectedScalars = "";
    var nScalarCount = 0;
    for(var i=0; i<oSelectedListBox.options.length; i++) {
      nScalarCount++;
      if (sSelectedScalars.length != 0) {
        sSelectedScalars += ",";
      }
      sSelectedScalars += oSelectedListBox.options[i].value;
    }	
    
    if (sSelectedScalars.length != 0) {
      var width = 1200;
      var imgWidth = 400*nScalarCount + "px";
      if (nScalarCount > 3) {
        width += (nScalarCount-3)*400;
      }

      // Build the web service to be called
      var sParamsList = "";
      //var sScalarsPlotUrl = top.location.protocol + "//" + top.location.host + "/geodesyworkflow/nvcl/plot/scalars?";
      var sScalarsPlotUrl = ProxyURL + "http://150.229.98.207/plotscalar.aspx?";
      sScalarsPlotUrl += "coreid=" + sCoreId;
      sScalarsPlotUrl += "&scalarids=" + sSelectedScalars;
      sScalarsPlotUrl += "&width="+width;
  			
      // Create params list for the "open in new window functionality"
      sParamsList += "coreid=" + sCoreId;
      sParamsList += "&scalarids=" + sSelectedScalars;
      sParamsList += "&width="+width;
  			
      var startDepth = document.getElementById("start_depth");
      var endDepth = document.getElementById("end_depth");
			
      // Append start depth and end depth
      // 0,0 are special values when the user wants the plot for the entire depth 
      if (startDepth != null && endDepth != null) {
        if (startDepth.value !=0 && endDepth.value != 0) {
          this.mnStartDepth = startDepth.value;
          this.mnEndDepth = endDepth.value;
          sScalarsPlotUrl += "&start=" + startDepth.value;
          sScalarsPlotUrl += "&end=" + endDepth.value;
          sParamsList += "&start=" + startDepth.value;
          sParamsList += "&end=" + endDepth.value;					
        }
      }
			
      // Append the sampling interval
      var samplingInterval = document.getElementById("sample_int");
      if (samplingInterval) {
        this.mnSamplingInterval = samplingInterval.value;
        sScalarsPlotUrl += "&samplinginterval=" + samplingInterval.value;
        sParamsList += "&samplinginterval=" + samplingInterval.value;
      }
						
      var plotImage = document.getElementById("plot_image");
      if (plotImage != null) {
        plotImage.style.width = "";
        plotImage.src = gsLoadingNvclPlotsImg;
      }
  			
      // Set the message that user should check results on the Plot tab
      if (oMessagesDiv != null) {
        oMessagesDiv.style.color = "blue";
        oMessagesDiv.innerHTML = "Plots loading...";
      }
			
      GDownloadUrl(sScalarsPlotUrl, function(pData, pResponseCode) {    
        if(pResponseCode == 200) {
          // Display the image
          if (plotImage != null) {
            plotImage.src = sScalarsPlotUrl;
            plotImage.style.width = imgWidth;
          }
          // Save the image src in the global array msPlotImageSrc
          // This is used later to redisplay the image
          oNVCLMarker.msPlotImageSrc = sScalarsPlotUrl;

          // Once the image is downloaded, 
          // activate the link "Open in a new window"
          var plotImageHref = document.getElementById("a_new_window");      				
          if (plotImageHref != null) {
            gPlottedImageSrc = sScalarsPlotUrl;
            plotImageHref.href = "../html/plotted_images.html?" + sParamsList;
            plotImageHref.target = "_blank";
            plotImageHref.style.display = "";
          }
      				
          // Set the message that the images have loaded and the user can check results
          if (oMessagesDiv != null) {
            oMessagesDiv.style.color = "blue";
            oMessagesDiv.innerHTML = '<div style="color:red; font-size:12px"> Plots loaded. </div>';
            oMessagesDiv.innerHTML += 'Please select the "Plots" tab to check results.';
          }
        } else {
          // Set the message that user should check results on the Plot tab
          if (oMessagesDiv != null) {
            oMessagesDiv.style.color = "red";
            oMessagesDiv.innerHTML = "Error in loading plots. Please try later.";
          }
        }
      });
    } else if (oMessagesDiv != null) {
      // No scalars in the "Selected Scalars" list box
      oMessagesDiv.style.color = "red";
      oMessagesDiv.innerHTML = "Please add scalars to the \"Select Scalars\" table and then click on \"Plot\"";
    }
  } 	
}

