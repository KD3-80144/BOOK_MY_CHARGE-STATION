var express = require("express");
var router = express.Router();
var connection = require("../config");

router.post("/getDashboardData", function (req, res) {
  const queryString = `SELECT count(*) as count FROM book_my_charge_station.customer_station_mapping where user_id = ?`;
  connection.query(
    queryString,
    [req.body.user_id],
    function (err, totalBookedCount) {
      const fetchAmountPaid = `SELECT sum(amount_paid) as count FROM book_my_charge_station.customer_station_mapping where user_id = ?`;
      connection.query(
        fetchAmountPaid,
        [req.body.user_id],
        function (err, amountpaid) {
          const fetchFeedbackCount = `SELECT count(*) as count FROM book_my_charge_station.feedback  where user_id = ?`;
          connection.query(
            fetchFeedbackCount,
            [req.body.user_id],
            function (err, feedbackCount) {
              if (err) {
                res.send({
                  status: 500,
                  msg: `Error While Fetching Dashboard Data-${err.message}`,
                });
              } else {
                res.send({
                  status: 200,
                  msg: "Dashboard Data Fetched Successfully",
                  data: {
                    totalBookedCount,
                    amountpaid,
                    feedbackCount,
                  },
                });
              }
            }
          );
        }
      );
    }
  );
});

router.post("/getStationList", function (req, res) {
  const state = req.body.state;
  const city = req.body.city;
  const type = req.body.type;
  const queryString = `SELECT owner_station_mapping.id  as id, user.first_name as owner_name,
   owner_station_mapping.station_name, vehicle_type.type,
  owner_station_mapping.address, owner_station_mapping.time_slot as time, 
  owner_station_mapping.date_slot as date,owner_station_mapping.cost_per_unit, 
  state_master.state, city_master.name as city , owner_station_mapping.pincode
  FROM owner_station_mapping 
  INNER JOIN user ON owner_station_mapping.owner_id = user.id
  INNER JOIN city_master ON owner_station_mapping.state_id = city_master.id
  INNER JOIN state_master ON owner_station_mapping.state_id = state_master.id
  INNER JOIN vehicle_type ON owner_station_mapping.vehicle_type_id = vehicle_type.id
  WHERE owner_station_mapping.state_id = ?  and owner_station_mapping.city_id = ? 
  and owner_station_mapping.vehicle_type_id = ?`;

  const a = connection.query(
    queryString,
    [state, city, type],
    function (err, result) {
      if (err) {
        res.send({
          status: 500,
          msg: `Error While Fetching Station List-${err.message}`,
        });
      } else {
        res.send({
          status: 200,
          msg: " Station List Fetched Successfully",
          data: result,
        });
      }
    }
  );

  console.log("***************88");
  console.log(a.sql);
});

router.post("/getCustomerHistory", function (req, res) {
  const customerId = req.body.customerId;
  const queryString = `SELECT customer_station_mapping.id as id, 
  customer_station_mapping.razorpay_payment_id as razorpay_payment_id,
  customer_station_mapping.created_date as created_date,
  customer_station_mapping.amount_paid as amount_paid,
  owner_station_mapping.station_name,
  owner_station_mapping.time_slot,
  owner_station_mapping.date_slot,
  owner_station_mapping.address
  FROM customer_station_mapping 
  INNER JOIN owner_station_mapping ON
  customer_station_mapping.owner_station_mapping_id = owner_station_mapping.id
  where customer_station_mapping.user_id= ?`;

  connection.query(queryString, [customerId], function (err, result) {
    if (err) {
      res.send({
        status: 500,
        msg: `Error While Fetching Customer History-${err.message}`,
      });
    } else {
      res.send({
        status: 200,
        msg: "Customer History Fetched Successfully",
        data: result,
      });
    }
  });
});

module.exports = router;
