var express = require("express");
var router = express.Router();
var connection = require("../config");

router.get("/getDashboardData", function (req, res) {
  const queryString = `SELECT count(*) as count FROM user where role_id != 1`;
  connection.query(queryString, function (err, totalCount) {
    const fetchCustomer = `SELECT count(*) as count FROM user where role_id = 3`;
    connection.query(fetchCustomer, function (err, customerCount) {
      const fetchOwner = `SELECT count(*) as count FROM user where role_id = 2`;
      connection.query(fetchCustomer, function (err, ownerCount) {
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
              totalCount,
              customerCount,
              ownerCount,
            },
          });
        }
      });
    });
  });
});

router.get("/getDashboardDetails", function (req, res) {
  const queryString = `SELECT count(*) as count FROM customer_station_mapping`;
  connection.query(queryString, function (err, totalCutomerPaidCount) {
    const fetchTotalAmount = `SELECT SUM(amount_paid) AS count FROM customer_station_mapping;`;
    connection.query(fetchTotalAmount, function (err, totalPaidAmount) {
      const fetchOnboardedStation = `SELECT count(*) as count FROM owner_station_mapping;`;
      connection.query(
        fetchOnboardedStation,
        function (err, onboardedStationCount) {
          const fetchFeedbackCount = `SELECT count(*) as count FROM feedback;`;
          connection.query(fetchFeedbackCount, function (err, feedbackCount) {
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
                  totalCutomerPaidCount,
                  totalPaidAmount,
                  onboardedStationCount,
                  feedbackCount,
                },
              });
            }
          });
        }
      );
    });
  });
});

router.get("/getCustomers", function (req, res) {
  const queryString = `SELECT * FROM user where role_id = 3`;
  connection.query(queryString, function (err, result) {
    if (err) {
      res.send({
        status: 500,
        msg: `Error While Fetching State-${err.message}`,
      });
    } else {
      res.send({
        status: 200,
        msg: "Customer Fetched Successfully",
        data: result,
      });
    }
  });
});

router.get("/getStationOwners", function (req, res) {
  const queryString = `SELECT * FROM user where role_id = 2`;
  connection.query(queryString, function (err, result) {
    if (err) {
      res.send({
        status: 500,
        msg: `Error While Fetching State-${err.message}`,
      });
    } else {
      res.send({
        status: 200,
        msg: "Customer Fetched Successfully",
        data: result,
      });
    }
  });
});

router.post("/updateUser", function (req, res) {
  const queryString = `UPDATE user SET is_deleted = ? where id = ?`;
  const isdelete = req.body.isdelete;
  const id = req.body.id;
  connection.query(queryString, [isdelete, id], function (err, result) {
    if (err) {
      res.send({
        status: 500,
        msg: `Error While Updating User-${err.message}`,
      });
    } else {
      res.send({
        status: 200,
        msg: "User Updated Successfully",
        data: result,
      });
    }
  });
});

router.get("/getFeedbacks", function (req, res) {
  const queryString = `SELECT user.id, user.first_name, user.last_name, feedback.feedback, user.email, user.phone, role_master.role
  FROM feedback 
  INNER JOIN user ON feedback.user_id = user.id 
  INNER JOIN role_master ON user.role_id = role_master.id`;
  connection.query(queryString, function (err, result) {
    if (err) {
      res.send({
        status: 500,
        msg: `Error While Fetching Feedbacks-${err.message}`,
      });
    } else {
      res.send({
        status: 200,
        msg: "Feedback Fetched Successfully",
        data: result,
      });
    }
  });
});

module.exports = router;
