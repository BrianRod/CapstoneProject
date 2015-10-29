	app.controller('barsCtrl', function($scope, $window, myService)
	{


		(function getLocation()
		{
			$window.navigator.geolocation.getCurrentPosition(function(position)
			{
				var lat = position.coords.latitude;
				var lng = position.coords.longitude; 

				$scope.$apply(function()
				{
					$scope.userLat = lat;
					$scope.userLng = lng;
				});

				$scope.getTimeEstimate();

				

				if(navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i))
				{
					
				}
				else
				{
					$scope.bars.forEach(function(el)
					{
						$scope.getPriceEstimate(el);
					});
				}	
			})
			
		})();

		$scope.checkUserLocale = function()
		{
			if($scope.userLat == undefined && $scope.userLng == undefined)
			{
				return false;
			}
			else
			{
				return true;
			}
		}

		$scope.getTimeEstimate = function()
		{

			myService.getTimeEstimate($scope.userLat, $scope.userLng).then(function(data)
			{
				var time = Math.ceil(data.data.times[0].estimate / 60.0);
				$scope.estimateTime =  "IN " + time + " MIN";
			})
		}

		$scope.getPriceEstimate = function(bar)
		{
			var lat = bar.lat;
			var lng = bar.lng;
			
			myService.getPriceEstimate($scope.userLat, $scope.userLng, lat, lng).then(function(data)
			{
				bar.priceEstimate = data.data.prices[0].estimate;
				console.log(bar.priceEstimate)
			})
			
		}

		$scope.getDeepLink = function(bar)
		{
			var uberMobile = "uber://?client_id="+ "OMsiT3426aaEFUI19ehcYybr0ZepxyB6" + "&action=setPickup&pickup[latitude]=" + $scope.userLat + "&pickup[longitude]=" + $scope.userLng + "&dropoff[latitude]=" + bar.lat + "&dropoff[longitude]=" + bar.lng + ""

			var uberURL = "https://m.uber.com/sign-up?";

			uberURL += "client_id=" + "OMsiT3426aaEFUI19ehcYybr0ZepxyB6";
			uberURL += "&" + "pickup_latitude=" + $scope.userLat;
			uberURL += "&" + "pickup_longitude=" + $scope.userLng;
			uberURL += "&" + "dropoff_latitude=" + bar.lat;
			uberURL += "&" + "dropoff_longitude=" + bar.lng;
			uberURL += "&" + "dropoff_nickname=" + bar.name;

			 if( (navigator.platform.indexOf("iPhone") != -1))
			 {
			 	window.open(uberMobile)
			 }		
			else
			{
				window.location.href = uberURL;
			}
		}

		$scope.bars = [
		{name: 'Tavernacle Social Club', lat: 40.7631062, lng: -111.8850482, rating: 4.2, img:'TavernacleHomePage02.jpg'},
		{name: 'Bar-X', lat: 40.765114, lng: -111.886180, rating: 3.8, img:'BarX.jpeg'},
		{name: 'Twilite Lounge', lat: 40.765380, lng: -111.880911, rating: 3.4, img:'twilitelounge.jpeg'},
		{name: 'Gracie\'s', lat: 40.762194, lng: -111.894566, rating: 3.4, img:'gracies.jpeg'},
		{name: 'Squatters', lat: 40.762630, lng:  -111.895661, rating: 4 + ".0", img:'squatters.jpeg'},
		{name: 'The Green Pig', lat: 40.7609658, lng: -111.8898247, rating: 3.6, img:'TheGreenPig.jpeg'},
		{name: 'Cheers To You', lat: 40.762339, lng: -111.890573, rating: 3.8, img:'Cheerstoyou.jpeg'},
		{name: 'X-Wife\'s Place', lat: 40.759006, lng: -111.870731, rating: 4 +".0", img:'xwifes.jpeg'},
		{name: 'Dick N\' Dixie\'s', lat: 40.763062, lng: -111.877108, rating: 3.2, img:'dickndixes.jpeg'},
		{name: 'Keys On Main', lat: 40.7637683, lng: -111.8938946, rating: 4.3, img:'Keysonmain.jpeg'},
		{name: 'Lumpys Downtown', lat: 40.763664, lng: -111.895559, rating: 3.2, img:'lumpys.jpeg'},
		{name: 'Twist', lat: 40.761315, lng: -111.892317, rating: 4.1, img:'Twist.jpeg'},
		{name: 'Beer Hive Pub', lat: 40.7663943, lng: -111.8936864, rating: 4.4, img:'beerhivepub.jpeg'},
		{name: 'Beer Bar', lat: 40.7652037, lng: -111.888349, rating: 3.5, img:'beerbar.jpg'},
		{name: 'Sky', lat: 40.76382, lng: -111.8979446, rating: 4.5, img:'Sky.jpg'},
		{name: 'Bourbon House', lat: 40.7652799, lng: -111.891873, rating: 3.5, img:'Bourbonhouse.jpg'},
		{name: 'Bodega', lat: 40.7618613, lng: -111.8929542, rating: 3.2, img:'bodega.jpg'},
		{name: 'Lucky 13', lat: 40.7413425, lng: -111.8973589, rating: 4.1, img:'Lucky13.jpeg'},
		{name: 'Urban Lounge', lat: 40.763706, lng: -111.876354, rating: 3.9, img:'urbanlounge.jpeg'}]

	});