import mongoose from "mongoose";
import config from "./config";

async function connection(){
    const dbUri=config.dbUri

    try {
        await mongoose.connect(dbUri,{
          //  useCreateIndex:true,
          //  useNewUriParser:true,
          //  useUnifieldTopology:true
        });
        console.log("DB Connected");
    } catch (error) {
        console.error("Could not connect to  Db",error);
        process.exit(1);
        
    }


}
export default connection