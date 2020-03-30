// var express = require('express');
// var router = express.Router();
//
//



// module.exports = router;


module.exports = (app) => {
  const  authJwt  = require("../middlewares/authJwt");
  const controller = require("../controllers/user.controller");


  // app.use(function(req, res, next) {
  //   res.header('Access-Control-Allow-Origin', '*');
  //
  //   // authorized headers for preflight requests
  //   // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
  //   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  //   next();
  //
  //   app.options('*', (req, res) => {
  //     // allowed XHR methods
  //     res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
  //     res.send();
  //   });
  //   next();
  // });

  // router.get("/api/test/all", controller.allAccess);

  app.get(
      "/api/user/doorlist",
      // [authJwt.verifyToken],
      controller.getAllScenario
  );
  app.post(
      "/api/admin/door",
      // [authJwt.verifyToken, authJwt.isAdmin],
      controller.createScenario
  );

  // router.get(
  //     "/api/test/mod",
  //     [authJwt.verifyToken, authJwt.isModerator],
  //     controller.moderatorBoard
  // );

  app.get(
      "/api/admin",
      [authJwt.verifyToken, authJwt.isAdmin],
      controller.adminBoard
  );


}