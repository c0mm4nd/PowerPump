var ngApp = angular.module('ppApp', ['ngCordova']);
ngApp.controller('messageCtrl', function($scope, $http) {
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

ngApp.controller('messageCtrl2', function($scope, $http) {
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

ngApp.controller('userPanelCtrl', function($scope, $http) {
    if (user == '游客'){
        $scope.isLogin = false ;
    }else{
        $scope.isLogin = true ;
    }
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