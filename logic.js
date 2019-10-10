// Creating map object
var myMap = L.map("map", {
  center: [35.91, -79.07],
  zoom: 11
});

// Adding tile layer to the map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);


// Flask URL
var url = '/coords';

// Grab the data with d3
d3.json(url, function(response) {
  
  // Create a new marker cluster group
  var markers = L.markerClusterGroup();

  // Loop through data
  for (var i = 0; i < response.length; i++) {
  
    // Add a new marker to the cluster group and bind a pop-up
    markers.addLayer(L.marker([response[i][0], response[i][1]])
        
      // Code for message popup
      // .bindPopup(`<strong>Injury Type:</strong> ${list_response[i].properties.bike_injur}<br>
      // <strong>Light Conditions: </strong>${list_response[i].properties.light_cond}`));
      // }
    )
  }

  // Add our marker cluster layer to the map
  myMap.addLayer(markers);

});
