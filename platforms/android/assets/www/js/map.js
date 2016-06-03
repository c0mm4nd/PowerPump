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
var options = {
  renderOptions: {
    map: nearmap
  }
};
var localSearch = new BMap.LocalSearch(nearmap, options);
nearmap.centerAndZoom(point, 12); // 初始化地图，设置中心点坐标和地图级别
nearmap.enableScrollWheelZoom();

//  circlecomplete
nearmap.clearOverlays();    
var radius = 2000;
var center = point; 




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
  var myPoint = myPosition.point;
  localSearch.searchNearby('*', myPoint, radius, {
    customData: {
      geotableId: 140069
    }
  });
  // nearnearmap.addEventListener("click",function(e){
  //   $('#nearmap').height('50%');
  //   var p1 = myPoint;
  //   var p2 = e;
  // 百度地图API功能

      // var driving = new BMap.DrivingRoute(nearmap, {renderOptions:{map: nearmap,  panel: "r-result", autoViewport: true}});
      // nearnearmap.clearOverlays;
      // driving.search(p1, p2);

    // });
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
