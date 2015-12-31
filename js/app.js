//name our angular app
angular.module('firstApp', [])

.controller('mainController', function(){
	//bind this to view model
	var vm = this;

	//define variable and objects on this
	// this lets them be available to our view
	// define a basic variable
	vm.message = 'Hey there! come and take a look!';
	//define a list of items- hard coded
	vm.computers = [
		{
			name: 'Mackbook', color: 'Silver', nerdness: 7
		},
		{
			name: 'Yoga 2 Pro', color: 'Gray', nerdness: 6
		},
		{
			name: 'Chromebook', color: 'Black', nerdness: 5
		}
	];
});