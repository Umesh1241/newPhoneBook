const express= require('express');
const mongoose = require('mongoose');
const cors=require('cors');
const path=require('path')

const app=express();

app.use(express.json());

app.use(cors());

const PORT = process.env.PORT || 8080;

const schemaData=mongoose.Schema({
    name:String,
    mobile:String
})

const UserModel=mongoose.model("user", schemaData)

app.get('/', async (req, res)=>{
    const data=await UserModel.find({})
     res.json({success:true, data:data})
})

app.get('*', (req, res)=>{
    app.use(express.static(path.resolve(__dirname, "client", "build")));
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
})
app.post('/create', async (req, res)=>{
    const data= new UserModel(req.body)
    await data.save();
    res.send({success:true, data:data})
    // res.json({data:data})
})

app.put('/update', async (req, res)=>{
    const {_id, ...rest}=req.body
    const data=await UserModel.updateOne({_id: _id}, rest)
    res.send({success:true, data:data})
})

app.delete('/delete/:id', async (req, res)=>{
  const id=req.params.id;
  const data=await UserModel.deleteOne({_id: id})
  res.send({success:true, data:data})
})



mongoose.connect('mongodb://localhost:27017')
.then(()=>{
console.log('DB connected...')
app.listen(PORT, ()=>console.log('server running....'))
})
.catch((err)=>console.log(err.message));
