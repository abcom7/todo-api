var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

var { signUp, signIn } = require('../controllers/userController');

router.post('/signup', signUp)
router.post('/signin', signIn)
router.post('/:id', function() {})
router.post('/', function() {})

module.exports = router;

/* GET single user. */

//  router.get("/profile", authService.verifyUser, function (req, res, next) {
//   let userId = req.user.id;
//   models.users.findByPk(userId).then((user) => {
//    if (user) {
//     let { password, createdAt, updatedAt, ...rest } = user.dataValues;
//     res.send(rest);
//    } else {
//     res.status(401);
//     res.send("Must be logged in");
//    }
//   });
//  });

/* POST user logout. */
  router.post("/logout", function (req, res, next) {
   res.cookie("jwt", "", { expires: new Date(0) });
   res.send("Logged out");
  });
module.exports = router;
