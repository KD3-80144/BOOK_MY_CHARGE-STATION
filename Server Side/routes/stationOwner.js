var express = require("express");
var router = express.Router();
var connection = require("../config");

router.post("/getDashboardData", function (req, res) {
  const queryString = `SELECT count(*) as count FROM owner_station_mapping where owner_id = ?`;
  connection.query(
    queryString,
    [req.body.user_id],
    function (err, onboardedStationCount) {
      const fetchPaidCustomerCount = `SELECT count(*) as count FROM customer_station_mapping
      INNER JOIN  owner_station_mapping ON customer_station_mapping.owner_station_mapping_id = owner_station_mapping.id
      WHERE owner_station_mapping.owner_id = ?`;
      connection.query(
        fetchPaidCustomerCount,
        [req.body.user_id],
        function (err, customerCount) {
          const totalReceivedAmount = `SELECT sum(amount_paid) as count FROM customer_station_mapping
          INNER JOIN  owner_station_mapping ON customer_station_mapping.owner_station_mapping_id = owner_station_mapping.id
          WHERE owner_station_mapping.owner_id = ?`;
          connection.query(
            totalReceivedAmount,
            [req.body.user_id],
            function (err, receivedAmount) {
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
                    onboardedStationCount,
                    customerCount,
                    receivedAmount,
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

router.post("/addChargeStation", function (req, res) {
  const stationName = req.body.station_name;
  const ownerId = req.body.owner_id;
  const address = req.body.address;
  const pincode = req.body.pincode;
  const city = req.body.city;
  const state = req.body.state;
  const date = req.body.date;
  const time = req.body.time;
  const cost = req.body.cost_per_unit;
  const type = req.body.type;

  const queryString = `INSERT INTO owner_station_mapping 
  (owner_id, station_name, address, state_id, city_id, pincode, date_slot, time_slot, cost_per_unit, vehicle_type_id ) 
  VALUES 
  (?,?,?,?,?,?,?,?,?,?)`;

  connection.query(
    queryString,
    [
      ownerId,
      stationName,
      address,
      state,
      city,
      pincode,
      date,
      time,
      cost,
      type,
    ],
    function (err, result) {
      if (err) {
        res.send({
          status: 500,
          msg: `Error While Adding Station List-${err.message}`,
        });
      } else {
        res.send({
          status: 200,
          msg: " Station Added Successfully",
          data: [
            {
              id: result.insertId,
            },
          ],
        });
      }
    }
  );
});

router.post("/getCustomerRequests", function (req, res) {
  const customerId = req.body.owner_id;

  const queryString = `SELECT customer_station_mapping.razorpay_payment_id, 
  customer_station_mapping.amount_paid,
  owner_station_mapping.station_name,
  vehicle_type.type,
  user.first_name, user.last_name,user.email, user.phone,
  owner_station_mapping.date_slot, owner_station_mapping.time_slot,
  owner_station_mapping.address, owner_station_mapping.pincode
  FROM customer_station_mapping 
  INNER JOIN owner_station_mapping 
  ON customer_station_mapping.owner_station_mapping_id = owner_station_mapping.id
  INNER JOIN user ON  customer_station_mapping.user_id = user.id
  INNER JOIN vehicle_type ON owner_station_mapping.vehicle_type_id = vehicle_type.id
  WHERE owner_station_mapping.owner_id = ?`;

  connection.query(queryString, [customerId], function (err, result) {
    if (err) {
      res.send({
        status: 500,
        msg: `Error While Fetching Customer List-${err.message}`,
      });
    } else {
      res.send({
        status: 200,
        msg: "Requested Customer List Successfully",
        data: result,
      });
    }
  });
});

router.get("/getVehicleType", function (req, res) {
  const customerId = req.body.owner_id;

  const queryString = `SELECT * FROM vehicle_type`;

  connection.query(queryString, function (err, result) {
    if (err) {
      res.send({
        status: 500,
        msg: `Error While Fetching Vehicle Type-${err.message}`,
      });
    } else {
      res.send({
        status: 200,
        msg: "Fetched Vehicle Type Successfully",
        data: result,
      });
    }
  });
});

router.post("/addFeedback", function (req, res) {
  const userId = req.body.user_id;
  const feedback = req.body.feedback;
  const queryString = `INSERT INTO feedback 
  (user_id, feedback) 
  VALUES 
  (?,?)`;
  connection.query(queryString, [userId, feedback], function (err, result) {
    if (err) {
      res.send({
        status: 500,
        msg: `Error While Adding Feedback-${err.message}`,
      });
    } else {
      res.send({
        status: 200,
        msg: " Feedback Added Successfully",
        data: [
          {
            id: result.insertId,
          },
        ],
      });
    }
  });
});

module.exports = router;
