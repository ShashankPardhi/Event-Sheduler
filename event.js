const mongoose = require ('mongoose');
const express = require ('express');
const bodyParser = require ('body-parser')


const eventSchema = new mongoose.Schema({
    title: String,
    description: String,
    location: String,
    startTime: Date,
    endTime: Date
})

module.exports = mongoose.model('Event', eventSchema);

const app = express();
app.use(bodyParser.json());

//POST
app.post('v1/events', async(req,res)=>{
    const event = new Event({
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        startTime: req.body.startTime,
        endTime: req.body.endTime
    });
    await event.save();
    res.status(201).json(event);
})

//GET
app.get('v1/events/:id', async (req,res)=>{
    const event = await Event.findById(req.params.id);
    if (!event){
        res.status(404).json({error: 'There is no event with that id'});
        return;
    }
    res.status(200).json(event);
})

//DELETE

app.delete('v1/event/:id', async (req, res)=>{
    const event = await Event.findByIdAndDelete(req.params.id);
    res.status(204).send();
})

//PUT

app.put('v1/events/:id', async (req, res)=>{
    const event = await Event.findByIdAndUpdate(req.params.id,{
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        startTime: req.body.startTime,
        endTime: req.body.endTime
    }, {new: true})
    if (!event){
        res.status(404).json({error: "There is no event with that id"})
        return;
    }
    res.status((200).json(event))
})

mongoose.connect('mongodb://localhost:27017/eventScheduler', {useNewUrlParser: true})
.then(()=>{
    app.listen(3000,()=>{
        console.log("Server is running on port 3000")
    })
})
.catch((err)=>{
    console.error("Error unable to connect to database", err)
})