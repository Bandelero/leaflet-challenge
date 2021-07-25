// Create a map object
var myMap = L.map("map", {
    center: [15.5994, -28.6731],
    zoom: 3
  });
  
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);



fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson')
  .then(
    response => {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }
      
      // Examine the text in the response
      response.json().then(function(data) {
        console.log(data)


        for (var i = 0; i < data.features.length; i++) {

            var color = ""
            var magnitude = data.features[i].properties.mag

            if (magnitude <1 ) {
                color = "#ccff33"
            }
            else if (magnitude < 2) {
                color = "#ffff33"
            }
            else if (magnitude < 3) {
                color = "#ffcc33"
            }
            else if (magnitude < 4) {
                color = "#ff9933"
            }
            else if (magnitude < 5) {
                color = "#ff6633"
            }
            else {
                color = "#ff3333"
            }
            console.log(data.features[i].geometry.coordinates)

            L.circleMarker([data.features[i].geometry.coordinates[1],data.features[i].geometry.coordinates[0]], {
                fillOpacity: 0.75,
                color: color,
                fillColor: color,
                // Setting our circle's radius equal to the output of our markerSize function
                // This will make our marker's size proportionate to its population
                radius: (magnitude)*2.5
            }).bindPopup("<h1>" + data.features[i].properties.place + "</h1> <hr> <h3>Magnitude: " + magnitude + "</h3>").addTo(myMap);
            }


      });
    })
  .catch(err => console.log('Fetch Error :-S', err));






