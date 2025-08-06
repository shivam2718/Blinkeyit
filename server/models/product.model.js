import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name : {
    type : String,
    default : ""  // <-- ensure it's saved properly
},
    image : {
        type : Array,
        default : []
    },
    category : [
        {
            type : mongoose.Schema.ObjectId,
            ref : 'category'
        }
    ],
    subCategory : [
        {
            type : mongoose.Schema.ObjectId,
            ref : 'subCategory'
        }
    ],
    unit : {
        type : String,
        default : ""
    },
    stock : {
        type : Number,
        default : null
    },
    price : {
        type : Number,
        default : null
    },
    discount : {
        type : Number,
        default : null
    },
    description : {
        type : String,
        default : ""
    },
    more_details : {
        type : Object,
        default : {}
    },
    publish : {
        type : Boolean,
        default : true
    }
},{
    timestamps : true
})

//create a text index
// Create a text index with weights
productSchema.index(
  {
    name: "text",
    description: "text"
  },
  {
    weights: {
      name: 10,
      description: 5
    },
    name: "TextIndex"
  }
);


const ProductModel = mongoose.model('product',productSchema)

export default ProductModel