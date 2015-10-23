//start ArcGIS code 
var map;
require([
	"esri/map", "esri/layers/FeatureLayer", "esri/InfoTemplate",
	"esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol",
	"esri/renderers/UniqueValueRenderer", "esri/Color",
	"dojo/domReady!"],
	function(Map, FeatureLayer, InfoTemplate, SimpleLineSymbol, SimpleFillSymbol, UniqueValueRenderer, Color) {
		map = new Map("map", {
			basemap: "gray",
			center: [-100, 45],
			zoom: 4,
			slider: true
		});
	map.on("load", addFeatureLayer);

	function addFeatureLayer() {
		//set the symbol to be an outline of the shape filled with a color
		var defaultSymbol = new SimpleFillSymbol().setStyle(SimpleFillSymbol.STYLE_NULL);
		defaultSymbol.outline.setStyle(SimpleLineSymbol.STYLE_NULL);

		//create renderer
		var renderer = new UniqueValueRenderer(defaultSymbol, "STATE_NAME");
		var canadaRenderer = new UniqueValueRenderer(defaultSymbol, "NAME");

		//add symbol for each possible value
		var usa_val_names = ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho",
							"Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi",
							"Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota",
							"Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont",
							"Virginia","Washington","West Virginia","Wisconsin","Wyoming"],
			can_val_names = ["British Columbia","Yukon","Northwest Territories","Alberta","Saskatchewan","Nunavut","Manitoba","Ontario","Quebec","Newfoundland and Labrador","New Brunswick","Nova Scotia"];
		//assign colors for usa shapes
		for( i = 0; i < usa_val_names.length; i++ ){
			var val_name = usa_val_names[i];
			renderer.addValue(val_name, new SimpleFillSymbol().setColor(new Color([0, 255, 0, 0.5])));
		}
		//assign colors for canada shapes
		for( i = 0; i < can_val_names.length; i++ ){
			var val_name = can_val_names[i];
			canadaRenderer.addValue(val_name, new SimpleFillSymbol().setColor(new Color([0, 255, 0, 0.5])));
		}
		
		var featureLayer = new FeatureLayer("http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Specialty/ESRI_StateCityHighway_USA/MapServer/1");
		var canadaFeatureLayer = new FeatureLayer("https://nowcoast.noaa.gov/arcgis/rest/services/nowcoast/mapoverlays_political/MapServer/4");
		//print names to the browser console when we click on the region
		canadaFeatureLayer.on('click', function(e){
			window.location.href = 'http://localhost:3000/?stateSearch='+e.graphic.attributes.NAME;
			console.log(e.graphic.attributes.NAME);
		});
		featureLayer.on('click', function(e){
			window.location.href = 'http://localhost:3000/?stateSearch='+e.graphic.attributes.STATE_NAME;
			console.log(e.graphic.attributes.STATE_NAME);
		});
		
		//add renderers of the shapes to the map object
		featureLayer.setRenderer(renderer);
		canadaFeatureLayer.setRenderer(canadaRenderer);
		map.addLayers([canadaFeatureLayer,featureLayer]);
	}
});