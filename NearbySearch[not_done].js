var map;
var infowindow;

function initMap() {
  var userLocale = {lat: $scope.userLat, lng: $scope.userLng};

  map = new google.maps.Map(document.getElementById('map'), {
    center: userLocale,
    zoom: 15
  });

  infowindow = new google.maps.InfoWindow();

  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: userLocale,
    radius: 3500,
    types: ['night_club']
  }, callback);
}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

// this.nearbyPlaces = function(position)
// {
//  return $http.jsonp('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+ position +'&radius=1500&types=night_club&key=AIzaSyB9NBZ_Dj-WgTDqCbtMsVDUgh_N8LYt2QE&callback=JSON_CALLBACK');
// }

// this.placeDetails = function(id)
// {
//  return $http.jsonp('https://maps.googleapis.com/maps/api/place/details/json?placeid='+ id +'&key=YOUR_API_KEY&callback=JSON_CALLBACK');
// }


//  $scope.getNearbyPlaces = function()
//  {
//    myService.nearbyPlaces($scope.position).then(function(data)
//    {
//      console.log(data);
//    })
//  }