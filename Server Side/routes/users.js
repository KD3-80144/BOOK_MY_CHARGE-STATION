var express = require("express");
var router = express.Router();
var connection = require("../config");

router.get("/getState", function (req, res) {
  const queryString = `SELECT * FROM state_master where is_deleted = 0`;
  connection.query(queryString, function (err, result) {
    if (err) {
      res.send({
        status: 500,
        msg: `Error While Fetching State-${err.message}`,
      });
    } else {
      res.send({
        status: 200,
        msg: "State Fetched Successfully",
        data: result,
      });
    }
  });
});

router.get("/getRole", function (req, res) {
  const queryString = `SELECT * FROM role_master where is_deleted = 0 and role != 'Admin'`;
  connection.query(queryString, function (err, result) {
    if (err) {
      res.send({
        status: 500,
        msg: `Error While Fetching Roles-${err.message}`,
      });
    } else {
      res.send({
        status: 200,
        msg: "Roles Fetched Successfully",
        data: result,
      });
    }
  });
});

router.post("/getCity", function (req, res) {
  const state = req.body.state;
  const queryString = `SELECT * FROM city_master where state_id = ?`;

  connection.query(queryString, [state], function (err, result) {
    if (err) {
      res.send({
        status: 500,
        msg: `Error While Logging User-${err.message}`,
      });
    } else {
      res.send({
        status: 200,
        msg: "User Logged in Successfully",
        data: result,
      });
    }
  });
});

router.post("/register", function (req, res) {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const phone = req.body.phone;
  const role = req.body.role;
  const address = req.body.address;
  const pincode = req.body.pincode;
  const city = req.body.city;
  const state = req.body.state;
  const queryString = `INSERT INTO user (first_name, last_name, email, password, phone, role_id, 
    address, pincode, city_id, state_id) 
  VALUES 
  (?,?,?,?,?,?,?,?,?,?)`;

  connection.query(
    queryString,
    [
      firstName,
      lastName,
      email,
      password,
      phone,
      role,
      address,
      pincode,
      city,
      state,
    ],
    function (err, result) {
      if (err) {
        res.send({
          status: 500,
          msg: `Error While Creating User-${err.message}`,
        });
      } else {
        res.send({
          status: 200,
          msg: "User Created Successfully",
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

router.post("/login", function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const queryString = `SELECT * FROM user where email = ? and password = ?`;
  connection.query(queryString, [email, password], function (err, result) {
    if (err) {
      res.send({
        status: 500,
        msg: `Error While Logging User-${err.message}`,
      });
    } else {
      res.send({
        status: 200,
        data: result,
      });
    }
  });
});

router.post("/forgotPassword", function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const confirmpassword = req.body.confirmpassword;
  if (password === confirmpassword) {
    const queryString = `UPDATE user SET password = ? where email = ? `;
    connection.query(queryString, [password, email], function (err, result) {
      if (err) {
        res.send({
          status: 500,
          msg: `Error While updating password-${err.message}`,
        });
      } else {
        res.send({
          status: 200,
          msg: "Password Updated Successfully",
          data: [
            {
              id: result.affectedRows,
            },
          ],
        });
      }
    });
  } else {
    res.send({
      status: 500,
      msg: `New password and Confirm Password are not matching`,
    });
  }
});

router.post("/getUserProflieData", function (req, res) {
  const user_id = req.body.user_id;
  const queryString = `SELECT * FROM book_my_charge_station.user WHERE id = ?`;
  connection.query(queryString, [user_id], function (err, result) {
    if (err) {
      res.send({
        status: 500,
        msg: `Error While fetching user profile-${err.message}`,
      });
    } else {
      res.send({
        status: 200,
        msg: "User Profile Fetched Successfully",
        data: result,
      });
    }
  });
});

router.post("/updateProfile", function (req, res) {
  const id = req.body.id;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const password = req.body.password;
  const phone = req.body.phone;
  const address = req.body.address;
  const pincode = req.body.pincode;
  const city = req.body.city;
  const state = req.body.state;
  const queryString = `UPDATE user SET 
  first_name = ? 
  ,last_name = ?  
  , password = ? 
  , phone = ? 
  , address = ?  
  , pincode = ? 
  , city_id = ? 
  , state_id = ? 
  WHERE id = ?`;

  connection.query(
    queryString,
    [firstName, lastName, password, phone, address, pincode, city, state, id],
    function (err, result) {
      if (err) {
        res.send({
          status: 500,
          msg: `Error While Updating Profile -${err.message}`,
        });
      } else {
        res.send({
          status: 200,
          msg: "User Profile Updated Successfully",
          data: [
            {
              id: result.affectedRows,
            },
          ],
        });
      }
    }
  );
});

module.exports = router;
