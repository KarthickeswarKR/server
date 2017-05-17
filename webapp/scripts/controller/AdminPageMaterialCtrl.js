angular.module('vgAdminApp')
.controller('AdminPageMaterialCtrl', [
    '$scope','materialviewservice','$modal',
    function($scope,materialviewservice,$modal) {
        console.log('AdminPageMaterialCtrl Loaded.');
        $scope.init=function(){
materialviewservice.material().then(function(response){
materialviewservice.nooflisting().then(function(data){
for(i=0;i<response.data.length;i++){
  for(j=0;j<data.data.length;j++){
response.data[i].nooflisting=0;
    if(response.data[i]._id==data.data[j]._id){
      response.data[i].nooflisting=data.data[j].nooflisting;
    }
  }
}

  $scope.data=response.data;
})
},function(err){
  console.log(err);
});
}
$scope.logout = function(){
var userId = localStorageService.get("userId");
loginservice.logout(userId).then(function(result) {
localStorage.clear();
$timeout(()=>{$state.go('login')},0);

},function(data){
$scope.mailstatus=data.data.message;
})
};
$scope.material=function(id){
  console.log(id);
  console.log("in material");
  materialviewservice.getmaterial(id).then(function(response){
    materialviewservice.materiallisting(id).then(function(data){
  $scope.name = response.data.name;
  $scope.filters=response.data.filters;
$scope.Nooflisting=data.data.list;
console.log("in response");
console.log(response);
console.log($scope.filters);
  },function(err){
    console.log(err);
  });
  },function(err){
    console.log(err);
  });
};
$scope.view=function(id){
  var dialogInst = $modal.open({
                templateUrl: url1+'/views/material/materialview.html',
                controller: 'AdminPagematerialviewctrl',
                size: 'lg',
                resolve: {
                  stockareaid:'2342423',
                  productid:'42324234'
                        });
                dialogInst.result.then(function(fmsid) {
                          console.log(materialId);
                          console.log(fmsid);
                            }, function () {
                              console.log('Modal dismissed at: ' + new Date());
                            });
}
$scope.edit=function(id){
  var dialogInst = $modal.open({
    templateUrl: url1+'/views/material/materialedit.html',
    controller: 'AdminPagematerialviewctrl',
    size: 'lg',
                resolve: {
                  selectedUsr: function () {
                      return {};
                      },
                      data:function(){
                        return id;
                            }
                          }
                        });
                dialogInst.result.then(function(fmsid) {
$scope.init();
                            }, function () {
                              console.log('Modal dismissed at: ' + new Date());
                            });
                    };
                    $scope.delete=function(id){
                        materialviewservice.delete(id).then(function(response){
                          materialviewservice.deletebymaterial(id).then(function(response){

                $scope.init();
                          });
                        });
                    }
        }
]);
