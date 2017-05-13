/**
 * Created by Karthick Eswar K R on 18/10/2016.
 */
var express = require('express');
var router = express.Router();
router.get('/oauth/token', function(req, res, next) {
res.send({
"access_token":"ca7bd78f09de7eec2eff968b4012dfaae54b506f272e2e041f344dd205dd7513",
"refresh_token":"4cb17e20d93ed230fa123bfff8f9bc511d77c8c5cf73f34a1ffbc90a651a2892",
"userId":"ba8195f0-0540-11e7-be55-4d571cb9b05b",
"token_type":"Bearer"
})
});
router.get('/products/getstockareas',  function(req, res, next) {
res.send({
"userId":"ba8195f0-0540-11e7-be55-4d571cb9b05b",
"stockarea":[
{
"stockareaId":"5455444444",
"stockareaName":"s1",
"latitude":"12.65",
"longtitude":"45.65"
},
{
"stockareaId":"5455444444",
"stockareaName":"s2",
"latitude":"12.65",
"longtitude":"45.65"
}
]
}
)
});
router.get('/product/getproductinfoforstockarea', function(req, res, next) {
res.send({
"stockareaId":"5455444444",
"userId":"ba8195f0-0540-11e7-be55-4d571cb9b05b",
"stockareaName":"s2",
"latitude":"12.65",
"longtitude":"45.65",
"products":{
"productStockId":" 21454545445",
"productId":{
"productId":"45632185415",
"productName":"cement2",
"specifications":{
"grade":"A",
"purity":"86%"
}
},
"stockDetails":{
"inStock":"65000",
"incomingStock":"1765",
"outgoingStock":"4450"
}
}
}
)
});
router.get('/product/getproductinfobyid', function(req, res, next) {
res.send({
"productId":" 21454545445",
"productName":"cement2",
"productDetails":"100% best  quality",
"specifications":{
"grade":"A",
"purity":"86%"
}
}

)
});

router.get('/products/getproductsofstockarea',function(req,res,next){
  res.send({
"userId":"ba8195f0-0540-11e7-be55-4d571cb9b05b",
"products":
[
{
"productStockId":" 21454545445",
"productId":{
"productId":"45632185415",
"productName":"cement1",
"specifications":{
"grade":"B",
"purity":"98%"
}
},
"stockDetails":{
"inStock":"65000",
"incomingStock":"12651",
"outgoingStock":"24500"
}
},
{
"productStockId":" 21454545445",
productId:{
"productId":"45632185415",
"productName":"cement2",
"specifications":{
"grade":"A",
"purity":"86%"
}
},
"stockDetails":{
"inStock":"65000",
"incomingStock":"1765",
"outgoingStock":"4450"
}
}
]
}

)
});
router.get('/orders/getordersofstockarea', function(req, res, next) {
res.send({
"userId":"ba8195f0-0540-11e7-be55-4d571cb9b05b",
"stockareaId":"45478521452",
"orders":[
{
"orderId":"56248621455456",
"sellId":"562252155",
"orderName":"cementorder",
"productStockId":" 21454545445",
"productId":{
"productId":"45632185415",
"productName":"cement2",
"specifications":{
"grade":"A",
"purity":"86%"
}
},

"destinationStockareaId":{
"stockareaId":"45478521452",
"stockareaName":"s2",
"latitude":"18.45",
"longtitude":"45.35"
},
"quantity":"35",
"cost":"7890"
},
{
"orderId":"9624855456",
"productStockId":" 21454545445",
"productId":{
"productId":"45632185415",
"productName":"cement1",
"specifications":{
"grade":"B",
"purity":"72%"
}
},
"orderName":"steelorder",
"destinationStockareaId":{
"stockareaId":"45478521452",
"stockareaName":"s3",
"latitude":"78.12",
"longtitude":"84.50"
},
"quantity":"350",
"cost":"5900"
}
]
}
);
});
router.get('/stockarea/getstockarea', function(req, res, next) {
res.send({
  "userId":"ba8195f0-0540-11e7-be55-4d571cb9b05b",
"stockareaId":"5154321312",
"stockareaName":"s2",
"latitude":"12.65",
"longtitude":"45.65",
"noOfProducts":25
}
);
});
router.get('/orders/getorderdetails', function(req, res, next) {
res.send({
"userId":"ba8195f0-0540-11e7-be55-4d571cb9b05b",
"stockareaId":"45478521452",
"orders":[
{
"orderId":"9624855456",
"productStockId":" 21454545445",
"productId":{
"productId":"45632185415",
"productName":"cement1",
"specifications":{
"grade":"B",
"purity":"72%"
}
},
"orderName":"steelorder",
"destinationStockareaId":{
"stockareaId":"45478521452",
"stockareaName":"s3",
"latitude":"78.12",
"longtitude":"84.50"
},
"quantity":"350",
"cost":"5900"
}
]
}

);
});
router.get('/products/autocomplete', function(req, res, next) {
res.send(
  {
  "userId":"ba8195f0-0540-11e7-be55-4d571cb9b05b",
"products":[
{
"productId":" 21454545445",
"productName":"cement1"
},
{
"productId":" 561454545445",
"productName":"cement2"
}
]
}
);
});
router.get('/users/getuser', function(req, res, next) {
res.send({
"userId":"5245452145",
"name":"karthick",
"address":"mahal 4th street, madurai",
"landmark":"near temple",
"city":"madurai",
"state":"TamilNadu",
"pincode":"625001",
"email":"karthick@gmail.com",
"phone":"9994673814"
}
);
});
router.get('/users/logout', function(req, res, next) {
res.send(
  {
    "userId":"ba8195f0-0540-11e7-be55-4d571cb9b05b",
"status":"successfully logged out"
}
);
});
router.get('/token/checktoken', function(req, res, next) {
res.send({
  "userId":"ba8195f0-0540-11e7-be55-4d571cb9b05b",
"status":"successfully verified"
});
});
router.get('/productdestination/getdestinationforproductstockarea', function(req, res, next) {
res.send({
  "userId":"ba8195f0-0540-11e7-be55-4d571cb9b05b",
  "latitude":"54.45",
  "longtitude":"45.12"

});
});
module.exports = router;
