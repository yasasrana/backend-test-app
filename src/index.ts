import express,{Request,Response} from 'express';
import config from './config';
import connection from './connection';
import Location from './module/location.module';
import cors from 'cors';
import path from 'path';

const app = express();
const port =config.port

app.use(express.json());
app.use(cors());

app.get('/index',function(req,res){ 
res.sendFile(path.join(__dirname+'/indexi.html'));
});

app.get('/',(req,res)=>{
    res.send("Hello Jasitha Pawan");
})

        app.post('/location/',(req:Request,res:Response)=>{

        var book = new Location(req.body);
        
        book.save((err: any) => {
        if (err) {
            res.send(err);
        } else {
            res.send(book);
        }
        });

        })



app.get("/searchone",async(req:Request,res:Response)=>{
    try {
        let result:any; 
        result= await Location.aggregate([
            {
                $search:{
                    index:"autocomplete",
                    autocomplete:{
                        query:req.query.city,
                        path:"city",
                        fuzzy:{
                            maxEdits:1
                        },
                        tokenOrder:"sequential"
                    },

                },
            },
           {$project:{
            searchName:1,
            _id:1,
            city:1,
            country:1,
            countryCode:1,
            fullname:1,
            score:{$meta:"searchScore"},
           },
          },
          {
            $limit:10,
          },

        ])

        return res.send(result)
        
    } catch (error) {
        console.log(error)
        res.send([])
        
    }
})

app.get("/searchtwo",async(req,res)=>{
    try {
        let result:any = await Location.aggregate([
            {
                $search:{
                    index:"autocomplete",
                    autocomplete:{
                        query:req.query.city,
                        path:"searchName",
                        fuzzy:{
                            maxEdits:1
                        },
                        tokenOrder:"sequential"
                    },

                },
            },
           {$project:{
            searchName:1,
            _id:1,
            city:1,
            country:1,
            countryCode:1,
            fullname:1,
            score:{$meta:"searchScore"},
           },
          },
          {
            $limit:10,
          },

        ])
  
        return res.send(result)


      
        
    } catch (error) {
        console.log(error)
        res.send([])
        
    }
})


app.get("/searchthree",async(req,res)=>{
    try {
        let result:any = await Location.aggregate([
            {
                $search: {
                    index: "default",
                    compound: {
                      must: [
                        {
                          text: {
                            query: req.query.city,
                            path: "city",
                            fuzzy: {
                              maxEdits: 1,
                            },
                          },
                        },
                      ],
                    },
                  },
                },
                {
                  $limit: 10,
                },
                {
                  $project: {
                    searchName: 1,
                    _id: 1,
                    city: 1,
                    country: 1,
                    adminCode: 1,
                    countryCode: 1,
                    fullName: 1,
                    score: { $meta: "searchScore" },
                  },
                },

        ])
  
        return res.send(result)


      
        
    } catch (error) {
        console.log(error)
        res.send([])
        
    }
})


// app.listen(5000,()=>console.log("Server Running in Port:5000"))

app.listen(port,async()=>{
    console.log(`Server Runing at ${port}`);

    await connection();

    });