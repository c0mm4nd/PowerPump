$(document).on("pageInit", "#user", function(e, pageId, $page) {


});


	function reg_user(){
		username = $('#reg_username').val();
		password = $('#reg_password').val();
		phone    = $('#reg_phone').val();
	    data = {
	        'username' : username,
	        'password' : password,
	        'phone'    :phone
	    }
	    alert(data);
	    $.post(
	        'http://cmd.ecustcic.com/bg/pp/index.php/user/reg',{
	            'username' : username,
	            'password' : password,
	            'phone'    :phone
	        },function(data){
	            alert(data);
	        }
	    );
	}


	function login_user(){
		phone    = $('#login_phone').val();
		password = $('#login_password').val();
		$.post(
	        'http://cmd.ecustcic.com/bg/pp/index.php/user/login',{
	            'username' : username,
	            'password' : password,
	            'phone'    :phone
	        },function(data){
	            alert(data);
	        }
	    );

	}