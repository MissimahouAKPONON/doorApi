
module.exports = (app) => {
    const  verifySignUp  = require("../middlewares/verifySignUp");
    const controller = require("../controllers/auth.controller");
  
    // app.use(function(req, res, next) {
    //     res.header(
    //         "Access-Control-Allow-Headers",
    //         "x-access-token, Origin, Content-Type, Accept"
    //     );
    //     next();
    // });

    app.post(
        "/api/register",
        [
            verifySignUp.checkDuplicateUsernameOrEmail,
            verifySignUp.checkRolesExisted
        ],
        controller.signup
    );

    app.post("/api/login", controller.signin);
    
  }