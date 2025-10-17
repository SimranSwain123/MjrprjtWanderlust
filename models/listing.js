const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review =require("./review.js")
const listingSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
        // type:String,
       
        // set:(v)=>v === "" ? "https://img.freepik.com/premium-photo/coconut-tree-beach-sunset_865967-33281.jpg":v,

        url:String,
        filename: String,
    },
    price:Number,
    location:String,
    country:String,
    reviews: [
        {
            type:Schema.Types.ObjectId,
            ref:"Review",
        },
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
//   category:{
//     type:String,
//     enum:["mountains","arctic","farms","desserts"]
//   }

});


listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
         await Review.deleteMany({_id : {$in: listing.reviews}})
        }
   
});
const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;
