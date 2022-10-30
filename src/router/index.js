var express = require('express');
var router = express.Router();
 const questionController= require('../controllers/questionController');
 
 //UI
 router.get('/' , questionController.getUI);
 router.get('/forTeachers' , questionController.UiForTeachers);



 router.get('/addQuestion',(req,res)=>res.render('add-a-question'))
 //for updating question
 router.get('/UpdateQuestion/:questionId',questionController.update)
 router.get('/deleteQuestion/:questionId',questionController.getdelete)
 

// GET Questions
router.get('/getQuestions',questionController. getQuestion);
// ADD Question
router.post('/add-question',questionController.addQuestion );

  // UPDATE Question
router.put('/updatequestion/:qId',questionController.updateQuestion);

  // DELETE Question
router.delete('/deletequestion/:questionId', questionController.deleteQuestion);
  
//validate question
router.post('/validate-Questions',questionController.validateQuestions);
module.exports = router;
