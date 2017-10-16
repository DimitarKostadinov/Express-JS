const mongoose=require('mongoose')
const ObjectId=mongoose.Schema.Types.ObjectId

let tag = new mongoose.Schema({
    tagName:{type:String,required:true},
    images:[{type:ObjectId,ref:'Image'}]
})

tag.pre('save',function(next){
this.tagName=this.tagName.toLowerCase();
next()
})

module.exports=mongoose.model('Tag',tag);