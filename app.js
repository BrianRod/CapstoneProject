var app = angular.module('app', ['ngGPlaces','ui.router']);


app.config(function($urlRouterProvider, $stateProvider)
{

	$urlRouterProvider.otherwise('/home');

	$stateProvider
	.state('bars', {
		url: '/home',
		templateUrl: 'bars/bars.html',
		controller: 'barsCtrl'
	});
})