const mongoose = require('mongoose')

const Schema = mongoose.Schema

const noteSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        require: true
    },
    title: {
        type: String,
        require: [true, 'title field must not be empty']
    },
    description: {
        type: String,
        require: [true, 'description field must not be empty']
    },
    isArchive: {
        type: Boolean,
        default: false
    },
    isTrash: {
        type: Boolean,
        default: false
    },
    color: {
        type: String,
        default: "white"
    },
},{
    timestamps: true
});

let Notes = mongoose.model('note',noteSchema)

module.exports = Notes


class NotesModel {

    addNoteModel = (obj, callback) => {
        
        
        try {
           
            let userNotes = new Notes({
                "userID": obj.userID,
                "title": obj.title,
                "description": obj.description,
            })
    
            return Notes.create(userNotes, (err, data)=>{
                if(err){
                    console.log(err)
                    return callback(err);
                }else if(data){
                    console.log('Notes added successfully')
                    return callback( null,{ 'message': 'Note added successfully', data });
                }
            })

        } catch (error) {
            
            console.log(error)
            return callback(error)
        }
        
    }

    deleteNoteModel = (deleteNoteData, callback) => {
       
        return Notes.findByIdAndDelete(deleteNoteData.deleteNote_ID, function(err, success){
            if(err){
                console.log(err)
            }else if(success){
                console.log('Note on given id is deleted')
                return callback({ 'message': 'Note on given id is deleted'});
            }else {
                console.log('Error failed to delete the note')
                return callback({ 'message': 'Error failed to delete the note'});
            }
        })
    }

    getAllNotesModel = (obj, callback) => {
     
        Notes.find(obj, (err, success)=>{
            if(err){
                console.log('Failed to get all notes 1')
                callback(err)
            }else if(success){
                callback(success)
            }else {
                console.log('Failed to get all notes 2')
            }
            

        })

    }

    updateNotesModel = (obj, callback) =>{
        
        Notes.findByIdAndUpdate(obj.id, obj, (err, success)=>{
            if(err){
                console.log('Failed to update the note')
                callback(err)
            }else if(success){
                console.log('Note is updated')
                callback(success)
            }else {
                console.log('Failed to update the note')
            }
        })

    }

    moveToTrashModel = (obj, callback) =>{

        console.log('obj id : ',obj.moveToTrashNote_ID)
        Notes.findById(obj.moveToTrashNote_ID, function(err, data){
            if(err){
                console.log('Note on that ID not found')
                callback({ 'message': "Note on that ID not found", 'success': false })
            }else if(data){
                console.log('Note found : ',data)
                console.log('isTrash : ',data.isTrash)
                if(data.isTrash == true || data.isTrash == false){
                    let updatedObj = {
                        isTrash: !data.isTrash
                    }

                    Notes.findByIdAndUpdate(obj.moveToTrashNote_ID, updatedObj, (err, success)=>{
                        if(err){
                            console.log('Error failed to move to the trash')
                            callback({ 'message': "Error failed to move to the trash", 'success': false })
                        }else if(success){
                            console.log('Moved to the trash')
                            callback({ 'message': "Successfull", 'success': true })
                        }
                    })
                }
                
            }
        })
    }


    getAllTrashNotesModel = (obj, callback) => {

        console.log('obj in model : ',obj)
        Notes.find(obj, (err, data)=>{
            if(err){
                console.log(err)
                callback(err)
            }else if(data){
                console.log('All notes in the trash are : ',data)
                callback(data)
            }
        })


    }

}

module.exports = new NotesModel();