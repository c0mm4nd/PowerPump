var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.checkConnection()
        $.init();
    },
    checkConnection: function() {
        var networkState = navigator.connection.type;

        /*var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.CELL]     = 'Cell generic connection';
        states[Connection.NONE]     = 'No network connection';*/

        // alert('Connection type: ' + states[networkState]);
        
        if (networkState == Connection.NONE) {
            alert('无网络连接');
            navigator.app.exitApp();
        };
    }
};

app.initialize();
// Index 
$(document).on("pageInit", "#index", function(e, pageId, $page) {

  $.init();
  var mySwiper = new Swiper('.swiper-container', {
     speed: 100,
     autoplay: 5000,
     pagination : '.swiper-pagination'
  });

});