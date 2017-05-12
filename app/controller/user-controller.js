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
"stockarea":[
{
"stockareaId":"5455444444",
"stockareaName":"s1",
"lat":"12.65",
"lng":"45.65",
"userId":"61154145",
"products":
[
{
"productId":"321455421"
},
{
"productId":"32145455421",
}
]
},
{
"stockareaId":"5455444444",
"stockareaName":"s2",
"lat":"12.65",
"lng":"45.65",
"userId":"61154145",
"products":
[
{
"productId":"321455421"
},
{
"productId":"32145455421",
}
]
}
]
})
}
);
router.get('/product/productdetails', function(req, res, next) {
res.send({
"productId":" 21454545445",
"productName":"cement2",
"price":"78",
"minquantity":"100",
"unit":"kg",
"stockDetails":{
"inStock":"65000",
"incomingStock":"1765",
"outgoingStock":"4450",
"unit":"kg"
}
}
)
});
router.get('/products/getproducts',function(req,res,next){
  res.send({
"stockarea":[
  {
  "products":
  [
  {
  "productId":"321455145421",
  "productName":"ce1",
  "price":"450",
  "minquantity":"100",
  "unit":"kg",
  "stockDetails":{
  "inStock":"65000",
  "incomingStock":"12651",
  "outgoingStock":"24500",
  "unit":"kg"
  }
  },
  {
  "productId":"32145455421",
  "productName":"cement2",
  "price":"78",
  "minquantity":"100",
  "unit":"kg",
  "stockDetails":{
  "inStock":"65000",
  "incomingStock":"1765",
  "outgoingStock":"4450",
  "unit":"kg"
  }
  }
  ]
  }
]
}  
)
});
router.get('/orders/getallorders', function(req, res, next) {
res.send({
"orders":[
{
"orderId":"56248621455456",
"productId":"562252155",
"stockareaId":"45478521452",
"orderName":"cementorder",
"address":"Madurai,Tamilnadu",
"quantity":"35",
"unit":"kg",
"cost":"7890"
},
{
"orderId":"9624855456",
"productId":"462252155",
"stockareaId":"15478521452",
"orderName":"steelorder",
"address":"chennai,Tamilnadu",
"quantity":"350",
"unit":"kg",
"cost":"5900"
}
]
}
);
});
router.get('/stockarea/getstockarea', function(req, res, next) {
res.send({
"stockareaId":"5154321312",
"stockareaName":"s2",
"lat":"12.65",
"lng":"45.65",
"userId":"61154145",
"products":
[
{
"productId":"321455421"
},
{
"productId":"32145455421",
}
]
}
);
});
router.get('/orders/getorderdetails', function(req, res, next) {
res.send({
"orderId":"235625214",
"productId":"462252155",
"stockareaId":"15478521452",
"orderName":"steelorder",
"address":"chennai,Tamilnadu",
"quantity":"350",
"unit":"kg",
"cost":"5900"
}
);
});
router.get('/products/autocomplete', function(req, res, next) {
res.send({
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
"status":"successfully logged out"
}
);
});
router.get('/token/checktoken', function(req, res, next) {
res.send({
"status":"successfully verified"
});
});
module.exports = router;
