const QuestionSet=require('../models/ConnToDB');
const mongoose=require('mongoose');
const { type, render } = require('express/lib/response');

//for UI
const getUI=async (req, res) =>{
    try{
     res.render('UIPage')
     
    }catch(err){
        console.log(err);
        res .json({message:err});
    }
}
//UI for teachers
const UiForTeachers=async (req, res) =>{
    try{
    const result =  await QuestionSet.find()
 
    result.forEach(element => {
       console.log( element.correctAnswer)
    });
    console.log(result.correctAnswer);
    res.render('UiForTeachers',{data:result})
    }catch(err){
        console.log(err);
        res .json({message:err});
    }
}

//get all the question


const getQuestion = async (req, res) =>{
 
        try{
            const result =  await QuestionSet.find()
 
            result.forEach(element => {
               console.log( element.correctAnswer)
            });
            console.log(result.correctAnswer);
            res.render('index',{data:result})
        //    res.json(result);
        }catch(err){
            console.log(err);
            res .json({message:err});
        }
  }

//detete a question

const  getdelete=async(req,res)=>{
    try{
        console.log("inside getdelete method")
      let id=req.params.questionId;
      console.log(id)
//   res.redirect("https://www.google.com")
// res.redirect(`/deletequestion/${id}`)
    res.redirect('/deletequestion/'+id)
    //   res.redirect(`/deletequestion/${id}`)
        }catch(err){
            console.log(err);
            res .json({message:err});
        }
}

  // add a new Question

  const addQuestion = async (req, res) =>{
      console.log("before")
 console.log(`req.body is `+req.body);
 console.log("after")
 console.log(req.body)
 if(!req.body){
     res.status(400).send({message : "Content cannot be empty"});
     return ;
 }
    let result = new  QuestionSet ({
        QNo : req.body.QNo,
        Question :req.body.Question,
        Options :req.body.Options,
        correctAnswer : req.body.correctAnswer
    })
    console.log("hii")
    console.log(result);
    try{
       const newQuestion= await result.save()
        res.send(newQuestion);
    }catch(err){
        console.log(err);
        res.status(400).send(err);
    }
}
   
//update a question
const updateQuestion = async (req, res) =>{
    // const id=req.body.params
   console.log("inside updateQuestion")
    console.log(req.body)
    const result = {
        QNo : req.body.QNo,
        Question :req.body.Question,
        Options : req.body.Options,
        correctAnswer : req.body.correctAnswer
    }
    console.log(result);
    try{
       const newQuestion= await QuestionSet.findByIdAndUpdate(
           {_id : req.params.qId},result
       )
    //    res.render(newQuestion)
       
        res.json(newQuestion);
    }catch(err){
        console.log(err);
        res.json({message:err})
    }
}
   
//delete a question
const deleteQuestion = async (req, res) =>{
    // const result = {
    //     QNo : req.body.QNo,
    //     Question :req.body.Question,
    //     Options : req.body.options,
    //     correctAnswer : req.body.correctAnswer
    // }
    // console.log(result);
    console.log("hii")
    console.log( req.params.questionId)
    console.log("inside delete")
    try{
        console.log("inside try begore")
       const newQuestion= await QuestionSet.findByIdAndDelete( req.params.questionId)
        res.json({message : 'Question deleted'});
    console.log("inside try after")
        console.log("data sucessfully deleted")
    }catch(err){
        console.log(err);
        res.json({message:err})
    }
}
   
//validate answers
const validateQuestions = async (req, res) =>{
  const json={}
  let result;
  let count=0;
    try{
         result =  await QuestionSet.find()
    //    console.log(result)
    }catch(err){
        console.log(err);
    }

    // res.send(req.body);

    for (let [key, value] of Object.entries(req.body)) {
        json[`${key}`]=`${value}`
      }
      console.log(json);

     result.forEach(element => {
        if(json.hasOwnProperty(element.QNo)){
            console.log(json[element.QNo])
            if(element.correctAnswer===json[element.QNo])count++;
           }
     });
       console.log("count is ")
       console.log(count);
       res.send(` <b> Thank You . Form Submitted Succesfully . <br> Your scores are ${count} <b> `)
   
}


//update with id to render 
const update = async(req,res)=>{
    
    try{
        let id = req.params.questionId;
        console.log(id);
        const getDataFromDB= await  QuestionSet.findOneAndUpdate({_id : id},{
            $set:{
                QNo : req.body.QNo,
                Question :req.body.Question,
                Options : req.body.Options,
                correctAnswer : req.body.correctAnswer
            }
        }
         );
        console.log(getDataFromDB);
        console.log(typeof(id))
        console.log("Inside try block")
       res.render('update-a-question' , {data:getDataFromDB , qId : id })
       console.log("after render")
    
    }catch(err){
        console.log("Inside catch block")
        console.log(err);
        res.json({message:err})
    }
     }
    

module.exports={getQuestion,addQuestion,updateQuestion,deleteQuestion,validateQuestions,update,getUI,UiForTeachers,getdelete}