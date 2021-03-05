const { callbackPromise } = require('nodemailer/lib/shared');
const { collection } = require('../Model/noteModel');
const noteModel = require('../Model/noteModel')

class NotesServices {

    addNoteServices = (obj, callback) => {

       
        try {
            noteModel.addNoteModel(obj, (err, data)=>{
                if(err){
                    return callback(err);
                }else if(data) {
                    return callback(null,data);
                }
            })
        } catch (error) {
            return callback(error)
        }
       

    }

    deleteNoteServices = (obj, callback) => {
        
        noteModel.deleteNoteModel(obj, (err, data)=>{
            if(err){
                return callback(err)
            }else if(data){
                return callback(null,data);
            }
        })

    }

    getAllNotesServices = (obj, callback) => {
        
         noteModel.getAllNotesModel(obj, (data, err)=>{
            if(data){
                callback({ 'message': "Notes found", data: data })
            }else if(err){
                callback({ 'message': "Error failed to get all notes", err: err })
            }
        })
    }

    updateNotesServices = (obj, callback) => {
        
        noteModel.updateNotesModel(obj, (data, err)=>{
            if(data){
                callback({'message': "Note is updated"})
            }else if(err){
                callback({'message': "Error failed to update the note"})
            }
        })
    }

    moveToTrashServices = (obj, callback) => {
        

        noteModel.moveToTrashModel(obj, (err, data)=>{
            if(err){
               return callback(err);
            }else if(data){
                return callback(null,data)
            }
        })
    }

    getAllTrashNotesServices =(obj, callback) => {
        
       noteModel.getAllTrashNotesModel(obj, (data, err)=>{
            if(data){
               return callback({ 'messaage': "We got all the trash notes", 'success': true, data: data })
            }else if(err){
                return callback({ 'message': "Error failed to get all trash files", 'success': false, err: err })
            }
       })

    }

    moveToArchiveServices = (obj, callback) => {

        noteModel.moveToArchiveModel(obj, (err, data)=>{
            if(err){
                return callback(err)
            }else if(data){
                return callback(null,data)
            }
        })
    }


    getAllArchivedNotesServices =(obj, callback) => {
        
        noteModel.getAllArchivedNotesModel(obj, (data, err)=>{
             if(data){
                return callback({ 'messaage': "We got all the trash notes", 'success': true, data: data })
             }else if(err){
                 return callback({ 'message': "Error failed to get all trash files", 'success': false, err: err })
             }
        })
 
     }
}

module.exports = new NotesServices();