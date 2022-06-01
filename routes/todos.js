var express = require('express');
var router = express.Router();
var {store} = require('../controllers/todoController');
var { isAuthenticated } = require('../middlewares/isAuthenticated');




router.post('/add', isAuthenticated, store);

/* GET todos listing. */

router.get('/' , function(req,res){
    models.todos.findAll({
      attributes:['id','name','completed']
    }).then(todosFound => {
     res.setHeader('Content-Type', 'application/json');
     res.send(JSON.stringify(todosFound));
   });
 });

 /* GET todos BY ID. */

 router.get("/:id", function (req, res, next) {
    let id = parseInt(req.params.id);
    
    models.todos.findByPk(id).then((todo) => {
      if (todo) {
        res.status(200).send(todo);
      } else {
        res.send("Todo not found");
      }
    });
  });
 

/* UPDATE todos. */

router.put("/:id", function (req, res, next) {
    let id = parseInt(req.params.id);
    models.todos
      .update(req.body, { where: { id: id } })
      .then(result => res.redirect('/todos/' + id))
      .catch(err => {
        res.status(400);
        res.send("There was a problem updating todo.  Please check todo information.");
      });
  });

  /* DELETE todos. */

  router.delete("/:id", function (req, res, next) {
    let id = parseInt(req.params.id);
    models.todos
      .destroy({
        where: { id: id }
      })
      .then(result => res.redirect('/todos'))
      .catch(err => {
        res.status(400);
        res.send("There was a problem deleting todo.  Please make sure you are specifying the correct id.");
      });
  });

module.exports = router;