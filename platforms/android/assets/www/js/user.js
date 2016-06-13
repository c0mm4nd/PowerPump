$(document).on("pageInit", "#reg", function(e, pageId, $page) {


});

$(document).on("pageInit", "#login", function(e, pageId, $page) {


});

	function reg_user(){
		username = $('#reg_username').val();
		password = $('#reg_password').val();
		phone    = $('#reg_phone').val();
	    data = {
	        'username' : username,
	        'password' : password,
	        'phone'    : phone
	    }
	    // alert(data);
	    $.ajax({
	      url: 'http://cmd.ecustcic.com/bg/index.php/user/reg',
	      type: 'get',
	      dataType: 'jsonp',
	      jsonp:'callback',
	      data: data,
	      success:function(data){
	        alert(data.status);
	        $.router.back();
	        window.location.href("#login");
	      },
	    });
	}


	function login_user(){
		phone    = $('#login_phone').val();
		password = $('#login_password').val();
		data = {
			'password' : password,
			'phone'    : phone
		}
		$.ajax({
		  url: 'http://cmd.ecustcic.com/bg/index.php/user/login',
		  type: 'get',
		  dataType: 'jsonp',
		  jsonp:'callback',
		  data: data,
		  success:function(data){
		    alert(data.status);
		    $.router.back();
		    user = data.username;
		    $(".afterLogin").show();
		    $(".beforeLogin").hide();
		  },
		});
	}