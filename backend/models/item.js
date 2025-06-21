const mongoose  = require("mongoose");
const schema = mongoose.Schema;

const Schema = new schema({
    itemName:{
       type: String,
       required:true,
    },
    
    itemType:{
        type:String,
        required:true,
    },

    Item_Description:{
        type:String,
        required:true,
    },
    cover_Image:{
        type:String,
        required:true,
    },
    additionalImages: {
        type: [String], // This will store an array of image URLs
        required: true,
      }
    
})



const Item = mongoose.model("Item",Schema);

module.exports = Item;