import mongoose from "mongoose";

//import { IUser } from './user.module';

export interface Ilocation extends mongoose.Document {
    searchName:string;
    fullName:string;
    city:string;
    countryCode:string;
   
}

export const LocatinSchema = new mongoose.Schema({
    
 
    searchName:{type:String,required:true},
    fullName:{type:String,required:true},
    city:{type:String,required:true},
    countryCode:{type:String,required:true},
  
},
    { timestamps: true }

)

const Location =mongoose.model<Ilocation>("Location",LocatinSchema)

export default Location;