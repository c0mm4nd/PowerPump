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
var radius = 10000000000000000000000;

$(document).on("pageInit", "#map", function(e, pageId, page) {
  var nearmap = new BMap.Map("nearmap");
  nearmap.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
  var myPoint = myPosition.point;
  var mk = new BMap.Marker(myPoint);
  var local = new BMap.LocalSearch(nearmap, {
    renderOptions:{map: nearmap, panel: "r-result"}
  });
  nearmap.addOverlay(mk);
  mk.setAnimation( BMAP_ANIMATION_BOUNCE );
  // 百度地图API功能
  nearmap.centerAndZoom(myPoint,16);

  local.searchNearby("充",myPoint,radius,{customData:{geotableId:140069}});
  
  nearmap.addEventListener("click",function(e){
    $('#nearmap').height('50%');
    var p1 = myPoint;
    var p2 = e;

    // var driving = new BMap.DrivingRoute(nearmap, {renderOptions:{map: nearmap,  panel: "r-result", autoViewport: true}});
    // nearmap.clearOverlays;
    // driving.search(p1, p2);

  });
});

  /*清理标注并重新初始化定位*/
  function relocate(){
    $.router.load('#map', true);
    nearmap.clearOverlays();
    geolocation.getCurrentPosition(function(r){
      if(this.getStatus() == BMAP_STATUS_SUCCESS){
        var mk = new BMap.Marker(myPoint);
        nearmap.panTo(myPoint);
        nearmap.addOverlay(mk);
        mk.setAnimation( BMAP_ANIMATION_BOUNCE ); 
        myPosition = r;     
        // alert('您的位置:'+myPoint.lng+','+myPoint.lat);
      }
      else {
        alert('failed'+this.getStatus());
      }
    },{enableHighAccuracy: true})
  }
