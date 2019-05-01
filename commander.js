#!/usr/bin/env node

const program = require("commander");
const chalk = require("chalk");
const { prompt } = require("inquirer");

const {
  addTodo,
  getAllTodos,
  findTodo,
  updateTodo,
  deleteTodo,
  completeTodo
} = require("./index");

const questions = [
  { type: "input", name: "title", message: chalk.green("Enter todo title: ") },
  {
    type: "input",
    name: "content",
    message: chalk.green("Enter todo content: ")
  }
];

program.version("0.0.1").description("Todo management system");
program
  .command("add")
  .alias("a")
  .description("Add a new todo")
  .action(() => {
    prompt(questions).then(ans => addTodo(ans));
  });

program
  .command("find <name>")
  .alias("f")
  .description("Find a todo")
  .action(name => findTodo(name));

program
  .command("list")
  .alias("l")
  .description("Get all todos")
  .action(() => getAllTodos());

program
  .command("update <_id>")
  .alias("u")
  .description("Update a todo")
  .action(_id => {
    prompt(questions).then(ans => updateTodo(_id, ans));
  });

program
  .command("delete <_id>")
  .alias("d")
  .description("Delete todo")
  .action(_id => deleteTodo(_id));

program
  .command("complete <_id>")
  .alias("c")
  .description("Mark todo completed")
  .action(_id => completeTodo(_id));
program.parse(process.argv);
