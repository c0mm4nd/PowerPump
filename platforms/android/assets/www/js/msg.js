var app = angular.module('ppApp', []);

app.controller('messageCtrl', function($scope, $http) {
    $http.jsonp("http://cmd.ecustcic.com/bg/index.php/msg/get?callback=JSON_CALLBACK")
        .success(
            function(data, status, header, config){
                $scope.msgData = data;
                console.log(data);
            }
        )
        .error(
            function(data){
                alert("error");
            }
        );
});

app.controller('messageCtrl2', function($scope, $http) {
    $http.jsonp("http://cmd.ecustcic.com/bg/index.php/msg/get?callback=JSON_CALLBACK")
        .success(
            function(data, status, header, config){
                $scope.msgData2 = data;
                console.log(data);
            }
        )
        .error(
            function(data){
                alert("error");
            }
        );
});


function addMsg(){
	title = $('#msg_add_title').val();
	content = $('#msg_add_content').val();

	data = {
		'username' : user,
		'title'    : title,
		'content'  : content 
	}
	$.ajax({
	  url: 'http://cmd.ecustcic.com/bg/index.php/msg/add',
	  type: 'get',
	  dataType: 'jsonp',
	  jsonp:'callback',
	  data: data,
	  success:function(data){
	    alert(data.status);
	  },
	});
	$.closeModal('.popup-edit');
}