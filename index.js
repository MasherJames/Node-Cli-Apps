const mongoose = require("mongoose");
const chalk = require("chalk");
const dotenv = require("dotenv");
const Todo = require("./models/todo");

dotenv.config();
const DATABASE_URL = process.env.DATABASE_URL;

const db = mongoose.connect(DATABASE_URL, { useNewUrlParser: true });

mongoose.connection
  .once("open", () => {
    // console.log("Database connected successfully");
  })
  .on("error", error => {
    console.log(error);
  });

const addTodo = todo => {
  Todo.create(todo)
    .then(todo => {
      console.info(chalk.blue("New todo created"));
      mongoose.connection.close();
    })
    .catch(err => console.info(err));
};

const findTodo = name => {
  const textToSearch = new RegExp(name, "i");
  Todo.find({ $or: [{ title: textToSearch }, { content: textToSearch }] }).then(
    todo => {
      console.info(todo);
      console.info(`${todo.length} matches`);
      mongoose.connection.close();
    }
  );
};

const updateTodo = (_id, todo) => {
  Todo.updateOne({ _id }, todo, { new: true })
    .then(todo => {
      console.info("Todo updated successfully");
      console.info(todo);
      mongoose.connection.close();
    })
    .catch(err => console.info(err));
};

const deleteTodo = _id => {
  Todo.deleteOne({ _id }).then(todo => {
    console.info("Todo deleted");
    mongoose.connection.close();
  });
};

const getAllTodos = () => {
  Todo.find()
    .then(todos => {
      console.info(todos);
      console.info(`${todos.length} todos`);
      mongoose.connection.close();
    })
    .catch(err => console.info(err));
};

const completeTodo = _id => {
  Todo.find({ _id })
    .then(todo => {
      if (!todo) {
        return "Todo does not exist";
      }
      if (!todo.complete) {
        todo.complete = true;
        Todo.updateOne({ _id }, todo)
          .then(todo => {
            console.info("Todo completed successfully");
            console.info(todo);
            mongoose.connection.close();
          })
          .catch(err => console.info(err));
      }
    })
    .catch(err => console.info(err));
};

module.exports = {
  addTodo,
  findTodo,
  updateTodo,
  deleteTodo,
  getAllTodos,
  completeTodo
};
