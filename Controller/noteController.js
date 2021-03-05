const { response } = require('express')
const noteServices = require('../Services/noteServices')


const addNoteController = (req, res, next) => {
    console.log('we are inside controller addNotes')
    console.log('login user ID : ', req.decoded.id)

    let obj = {
        userID: req.decoded.id,
        title: req.body.title,
        description: req.body.description
    }

  
    let response = {};
    try {
        noteServices.addNoteServices(obj, (err, data) => {
            if (err) {
                response.success = false;
                response.error = err;
                return res.status(400).send(response);
            } else if (data) {
                response.success = true;
                response.result = data;
                return res.status(400).send(response);
            }
        })
    } catch (error) {
        console.log(error)
        response.success = false;
        response.error = error;
        return res.status(400).send(response);
    }

}


const deleteNoteController = (req, res, next) => {
    console.log('we are inside the delete Note Controller')
    
    let obj = {
        deleteNote_ID: req.body.deleteNote_ID
    }

    let response = {};
    noteServices.deleteNoteServices(obj, (err, data) => {
        if (err) {
            response.message = err;
            return res.status(400).send(response);
        } else if (data) {
            response.result = data;
            return res.status(400).send(response);
        }
    })

}

const getAllNotesController = (req, res, next) => {

    let obj = {
        userID: req.decoded.id
    }

    noteServices.getAllNotesServices(obj, (result, err)=>{
        if(result){
            response.success = true;
            response.message = result.message;
            response.data = result.data;
            return res.status(200).send(response)
        }else if(err){
            response.success = false;
            response.message = err.message;
            return res.status(400).send(response)
        }
    })
}

const updateNotesController = (req, res, next) =>{

   let obj = {
        id: req.body.id,
        loginID: req.decoded.id,
        title: req.body.title,
        description: req.body.description
    }

    noteServices.updateNotesServices(obj, (success, err)=>{
            if(success){
                response.success = true;
                response.message = success.message;
                return res.status(200).send(response);
            }else if(err){
                response.success = false;
                response.message = err.message;
                return res.status(400).send(response);
            }
    })
    
   
}

const moveToTrashController = (req, res, next) => {

    

    let obj = {
        moveToTrashNote_ID: req.body.moveToTrashNote_ID
    }

    
    noteServices.moveToTrashServices(obj, (err, data)=>{
        if(data){
            response.success = data.success;
            response.message = data.message;
            return res.status(200).send(response);
        }else if(err){
            response.success = err.success;
            response.message = err.message;
            return res.status(400).send(response);
        }
    })
}

const getAllTrashNotesController = (req, res, next) => {
    

    let obj = {
        isTrash: true
    }

    noteServices.getAllTrashNotesServices(obj, (data, err)=>{
        if(data){
            response.success = data.success;
            response.message = data.message;
            response.data = data.data;
            return res.status(200).send(response);
        }else if(err){
            response.success = err.success;
            response.message = err.message;
            response.data = err.data;
            return res.status(200).send(response);
        }
    })

}

const moveToArchiveController = (req,res) => {
    

    let obj = {
        moveToArchiveNote_ID: req.body.moveToArchiveNote_ID
    }

    noteServices.moveToArchiveServices(obj, (data, err)=>{
        if(data){
            response.success = data.success;
            response.message = data.message;
            return res.status(200).send(response);
        }else if(err){
            response.success = err.success;
            response.message = err.message;
            return res.status(400).send(response);
        }
    })
}


const getAllArchivedNotesController = (req, res, next) => {
    

    let obj = {
        isArchive: true
    }

    noteServices.getAllArchivedNotesServices(obj, (data, err)=>{
        if(data){
            response.success = data.success;
            response.message = data.message;
            response.data = data.data;
            return res.status(200).send(response);
        }else if(err){
            response.success = err.success;
            response.message = err.message;
            response.data = err.data;
            return res.status(200).send(response);
        }
    })

}


module.exports = {
    addNoteController, 
    deleteNoteController, 
    getAllNotesController, 
    updateNotesController,
    moveToTrashController,
    getAllTrashNotesController,
    moveToArchiveController,
    getAllArchivedNotesController
}