app.service('myService', function($http)
{

	this.getTimeEstimate = function (latitude,longitude) 
	{
			return $http.get("https://api.uber.com/v1/estimates/time?server_token=xWRA64qX_ql6EFsHUMh5uGJn8lOFCXMiKPKZEi_7&start_latitude=" + latitude + "&start_longitude=" + longitude + "");
	}

	this.getPriceEstimate = function(latitude, longitude, endLat, endLng)
	{
			return $http.get("https://api.uber.com/v1/estimates/price?server_token=xWRA64qX_ql6EFsHUMh5uGJn8lOFCXMiKPKZEi_7&start_latitude="+ latitude + "&start_longitude=" + longitude + "&end_latitude=" + endLat + "&end_longitude=" + endLng + "");
	}

})