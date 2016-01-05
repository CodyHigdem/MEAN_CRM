angular.module('userService', [])
.factory('User', function($http){
	//create the object
	var userFactory = {};
	//get a single user
	userFactory.get('/api/users/' + id);

	//a function to get all the users
	userFactory.all = function(){
		return $http.get('/api/users');
	};

	//create a user
	userFactory.create = function(){
		return $http.post('/api/users/', userData);
	};

	//update a user
	userFactory.update = function(id, userData) {
		return $http.put('/api/users/' + id, userData);
	};

	//delete a user
	userFactory.delete = function(id){
		return $http.delete('/api/users/' + id);
	};

	return userFactory;
});

/*
single user GET /api/users/:user_id get(id)
list users GET /api/users all()
create user POST /api/users create(userData)
update a user PUT /api/users/:user_id update(id, userData)
delete user DELETE /api/users/:user_id delete(id)
*/