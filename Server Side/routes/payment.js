const { json } = require("body-parser");
var express = require("express");
var router = express.Router();
var connection = require("../config/index");
const Razorpay = require("razorpay");

const razorpayInstance = new Razorpay({
  key_id: "rzp_test_W4byT86osE33RE",
  key_secret: "a3EJlsUVRvay6EdXVSQMTPPU",
});


/* RazorPay Payment */
router.post("/createOrder", function (req, res, next) {
  const { customerId, mapId, amount, currency } = req.body;
  console.log("%%%%%%%%%%");
  console.log(req.body);
  razorpayInstance.orders.create({ amount, currency }, (err, order) => {
    console.log("-----");
    console.log(order);
    if (!err) {
      const queryString = `INSERT INTO customer_station_mapping
      ( user_id, owner_station_mapping_id, razorpay_order_id, amount_paid, currency) 
      VALUES (?,?,?,?,?)`;
      connection.query(
        queryString,
        [customerId, mapId, order.id, amount, currency],
        function (err, result) {
          if (err) {
            res.send({
              status: 500,
              msg: err,
            });
          } else {
            res.send({ status: 200, data: order });
          }
        }
      );
    } else res.send(err);
  });
});

router.post("/callback/:customerId", (req, res) => {
  console.log("%%%%%%%%%%%%%%%%%%%55");
  console.log(req.body);
  console.log(req.params.customerId);
  const queryString = `UPDATE customer_station_mapping SET
  razorpay_payment_id = ?, razorpay_signature = ? 
  WHERE user_id = ? and razorpay_order_id = ?`;

  connection.query(
    queryString,
    [
      req.body.razorpay_payment_id,
      req.body.razorpay_signature,
      req.params.customerId,
      req.body.razorpay_order_id,
    ],
    function (err, result) {
      if (err) {
        res.redirect("http://localhost:3000/payment-failue");
      } else {
        res.redirect("http://localhost:3000/payment-success");
      }
    }
  );
});

module.exports = router;
