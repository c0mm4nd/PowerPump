var msgData;


// $(document).on("pageInit", "#message", function(e, pageId, $page) {
// 	data = {};
// 	$.ajax({
// 	  url: 'http://cmd.ecustcic.com/bg/index.php/msg/get',
// 	  type: 'get',
// 	  dataType: 'jsonp',
// 	  jsonp:'callback',
// 	  data: data,
// 	  success:function(data){
// 	  	msgData = data;
// 	  	console.log(msgData);
// 	  	var app = angular.module('messageApp', []);
// 	  	app.controller('messageCtrl', function($scope, $http) {
// 	  	    $scope.msgData = msgData ;
// 	  	});
// 	  },
// 	});
// });

var app = angular.module('messageApp', []);
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



function addMsg(){
	username = 'test';
	title = $('#msg_add_title').val();
	content = $('#msg_add_content').val();

	data = {
		'username' : username,
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