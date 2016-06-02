// planmap
var planmap = new BMap.Map("planmap"); // 创建地图实例
var options = {
  renderOptions: {
    map: planmap
  }
};
var point = new BMap.Point(121.508592,30.839823);
var localSearch = new BMap.LocalSearch(planmap, options);
planmap.centerAndZoom(point, 12); // 初始化地图，设置中心点坐标和地图级别
planmap.enableScrollWheelZoom();

//  circlecomplete
planmap.clearOverlays();    
var radius = 2000;
var center = point; 

var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
    {"input" : "searchPlan"
    ,"location" : planmap
  });



$(document).on("pageInit", "#plan", function(e, pageId, $page) {
  var myPoint = myPosition.point;
  // $('#planmap').height('50%');
  planmap.centerAndZoom(myPoint,16);
  var marker = new BMap.Marker(myPoint);  // 创建标注
  planmap.addOverlay(marker);               // 将标注添加到地图中
  marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画

});


var goal;
$('#searchPlan').bind('keypress',function(event){
 
  if(event.keyCode == "13"){
    
    input = $('#searchPlan').val();
    console.log(input);
    var myGeo = new BMap.Geocoder();
    myGeo.getPoint(input, function(gpoint){
        if (gpoint) {
          window.goalPoint = gpoint.lng + ',' + gpoint.lat;
          console.log(goalPoint);
          planmap.centerAndZoom(gpoint, 16);
          planmap.addOverlay(new BMap.Marker(gpoint));
        }else{
          alert("您选择地址没有解析到结果!");
        }
        goal = goalPoint;
      });

    var res;
    var data = {
      'myPosition' : myPosition.point.lng + ',' + myPosition.point.lat ,
      'goal'    : goalPoint
    };
    console.log(window.goalPoint);
    console.log(goal);

    $.ajax({
      url: 'http://cmd.ecustcic.com/bg/index.php/map/plan',
      type: 'get',
      dataType: 'jsonp',
      jsonp:'callback',
      data: data,
      success:function(data){
        // alert(data.status);
        res = data;
        console.log('res=' + res);
      },
    });

    distance = res.distance;
    waypoint = res.waypoint;

    // 百度地图API功能
    var driving = new BMap.DrivingRoute(planmap, {renderOptions:{map: planmap,  panel: "r-result", autoViewport: true}});
    planmap.clearOverlays;
    driving.search(myPoint, goalPoint,{waypoints:[waypoint]});
  }
});


  /*清理标注并重新初始化定位*/
function relocate(){
  $.router.load('#plan', true);
  planmap.clearOverlays();
  geolocation.getCurrentPosition(function(r){
    if(this.getStatus() == BMAP_STATUS_SUCCESS){
      var mk = new BMap.Marker(myPoint);
      planmap.panTo(myPoint);
      planmap.addOverlay(mk);
      mk.setAnimation( BMAP_ANIMATION_BOUNCE ); 
      myPosition = r;     
      // alert('您的位置:'+myPoint.lng+','+myPoint.lat);
    }
    else {
      alert('failed'+this.getStatus());
    }
  },{enableHighAccuracy: true})
}
