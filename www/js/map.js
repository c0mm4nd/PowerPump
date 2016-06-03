// Map

var geolocation = new BMap.Geolocation();
var myPosition,myPoint;
geolocation.getCurrentPosition(function(r){
  if(this.getStatus() == BMAP_STATUS_SUCCESS){
    myPosition = r;
  }
  else {
    alert('failed'+this.getStatus());
  }
},{enableHighAccuracy: true});

var point = new BMap.Point(121.508592,30.839823); // 创建点坐标

var nearmap = new BMap.Map("nearmap"); // 创建地图实例
var map_options = {
  renderOptions: {
    map: nearmap
  }
};

nearmap.centerAndZoom(point, 12); // 初始化地图，设置中心点坐标和地图级别
nearmap.enableScrollWheelZoom();

//  circlecomplete
nearmap.clearOverlays();
var radius = 2000000;
var center = point; 
  var localSearch = new BMap.LocalSearch(nearmap, map_options);




$(document).on("pageInit", "#map", function(e, pageId, page) {
  // var nearmap = new BMap.Map("nearmap");
  // nearnearmap.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
  // var mk = new BMap.Marker(myPoint);
  // var local = new BMap.LocalSearch(nearmap, {
  //   renderOptions:{map: nearmap, panel: "r-result"}
  // });
  // nearnearmap.addOverlay(mk);
  // mk.setAnimation( BMap_ANIMATION_BOUNCE );
  // // 百度地图API功能
  // nearnearmap.centerAndZoom(myPoint,16);

  // local.searchNearby("电",myPoint,radius,{customData:{geotableId:140069}});
  console.log(localSearch);
  console.log('map init');
  var myPoint = myPosition.point;
  console.log(myPoint);
  console.log(myPosition);
  localSearch.searchNearby('*', center, radius, {
  	customData: {
  		geotableId: 140069
  	}
  });
  
  nearmap.addEventListener("click",function(e){
    $('#nearmap').height('50%');
    var p1 = myPoint;
    var p2 = e;
 	// 百度地图API功能

    var driving = new BMap.DrivingRoute(nearmap, {renderOptions:{map: nearmap,  panel: "r-result", autoViewport: true}});
    nearmap.clearOverlays;
    driving.search(p1, p2);

    });
});

  /*清理标注并重新初始化定位*/
  function relocate(){
    $.router.load('#map', true);
    nearnearmap.clearOverlays();
    geolocation.getCurrentPosition(function(r){
      if(this.getStatus() == BMap_STATUS_SUCCESS){
        var mk = new BMap.Marker(myPoint);
        nearnearmap.panTo(myPoint);
        nearnearmap.addOverlay(mk);
        mk.setAnimation( BMap_ANIMATION_BOUNCE ); 
        myPosition = r;     
        // alert('您的位置:'+myPoint.lng+','+myPoint.lat);
      }
      else {
        alert('failed'+this.getStatus());
      }
    },{enableHighAccuracy: true})
  }
