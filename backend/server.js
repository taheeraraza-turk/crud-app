const express= require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app= express();

app.use(cors(
  {
    origin:[],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }
));
app.use(express.json());

mongoose.connect('mongodb+srv://taheerarazaturk:<db_password>@cluster0.8lsqg2z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{useNewUrlParser: true, useUnifiedTopology: true})

const Item = mongoose.model('Item', {name:String});

app.get('/items',(req,res)=>{
   Item.find().then(data=>res.json(data))
})

app.post('/items',(req,res)=>{
  new Item({name:req.body.name}).save().then(data=>res.json(data))
})

// Update an item by id
app.put('/items/:id', (req, res) => {
  Item.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  )
    .then(data => res.json(data))
    .catch(err => res.status(400).json({ error: err.message }));
});

app.delete('/items/:id' , (req,res)=>{
  Item.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: 'Item deleted successfully' }))
    .catch(err => res.status(400).json({ error: err.message }));
})
app.listen(3000, () => console.log('http://localhost:3000/items'));
