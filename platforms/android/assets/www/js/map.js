// Map
var map = new BMap.Map("allmap");
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
var radius = 100000;

$(document).on("pageInit", "#map", function(e, pageId, $page) {
  var myPoint = myPosition.point;
  var mk = new BMap.Marker(myPoint);
  var local = new BMap.LocalSearch(map, {
    renderOptions:{map: map}
  });
  map.addOverlay(mk);
  mk.setAnimation( BMAP_ANIMATION_BOUNCE );
  // 百度地图API功能
  map.centerAndZoom(myPoint,16);
    local.searchNearby("电", myPoint, radius,{customData:{geotableId:140069}});
  
    map.addEventListener("click",function(e){
    $('#allmap').height('50%');
    var p1 = myPoint;
    var p2 = e;
    var driving = new BMap.DrivingRoute(map, {renderOptions:{map: map,  panel: "r-result", autoViewport: true}});
    map.clearOverlays;
    driving.search(p1, p2);

  });
});

  /*清理标注并重新初始化定位*/
  function relocate(){
    $.router.load('#map', true);
    map.clearOverlays();
    geolocation.getCurrentPosition(function(r){
      if(this.getStatus() == BMAP_STATUS_SUCCESS){
        var mk = new BMap.Marker(myPoint);
        map.panTo(myPoint);
        map.addOverlay(mk);
        mk.setAnimation( BMAP_ANIMATION_BOUNCE ); 
        myPosition = r;     
        // alert('您的位置:'+myPoint.lng+','+myPoint.lat);
      }
      else {
        alert('failed'+this.getStatus());
      }
    },{enableHighAccuracy: true})
  }
