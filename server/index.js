require('dotenv').config({ path: '/Users/thewarpig/Visual Studio Code/fullstack-todo/.env'});
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')


const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());

const mongoURL = process.env.MONGODB_URI

mongoose.connect(mongoURL)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));


const todoSchema = new mongoose.Schema({
  todo: String,
  isComplete: Boolean
});

const Todo = mongoose.model('Todo', todoSchema);


app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.get('/api/v1/getTodos', async (req, res) => {
  const todos = await Todo.find();
  let newTodos = todos.map(todo => (
    {
      "id": todo.id,
      "todo": todo.todo,
      "isComplete": todo.isComplete
    }))
  res.status(200).json(newTodos)
})

app.post('/api/v1/newTodo', async (req, res) => {
  const todo = new Todo({
    todo: req.body.todo,
    isComplete: false
  });
  await todo.save();
  res.status(201).json({status: 200, msg: "success"});
});

app.post('/api/v1/deleteTodo/:id', async (req, res) => {
  console.log(req.params.id)
  const mongoRes = await Todo.findOneAndDelete({_id: req.params.id})
  console.log("Deleted todo id: ", mongoRes._id.toString())
  res.status(201).json({status: 200, msg: "success"});
});

app.post('/api/v1/toggleTodo/:id', async (req, res) => {
  console.log(req.params.id)
  const mongoRes = await Todo.findByIdAndUpdate(req.params.id,
  [{ $set: { isComplete: { $not: '$isComplete' } } }]
  )
  console.log("Toggled todo id: ", mongoRes._id.toString())
  res.status(201).json({status: 200, msg: "success"});
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});