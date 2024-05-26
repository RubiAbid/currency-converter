#!/usr/bin/env node
import inquirer from "inquirer";
let todos = [];
let condition = true;
while (condition) {
    // Prompt the user to enter a task and whether they want to add more tasks
    let addTask = await inquirer.prompt([
        {
            name: "todo",
            type: "input",
            message: "What you want to add in your todo list?", // Prompt for task input
        },
        {
            name: "addMore",
            type: "confirm",
            message: "Do you want to add more in your list?", // Prompt for adding more tasks
            default: false, // Default value set to false, indicating initially not to add more
        },
    ]);
    // Check if the user entered an empty answer
    if (addTask.todo.trim() === "") {
        console.log("Please enter a non-empty task.");
        continue; // Skip adding the empty task to the list
    }
    // Push the entered task to the todos array
    todos.push(addTask.todo);
    // Update the condition based on the user's choice to add more tasks
    condition = addTask.addMore;
    // print the current list of tasks
    console.log("Current todo list:");
    todos.forEach((item, index) => console.log(`${index}: ${item}`)); // Print each item with its index
}
// If the user chose not to add more tasks, print the final list
if (!condition) {
    console.log("This is your final list:");
    todos.forEach((item, index) => console.log(`${index}: ${item}`)); // Print each item with its index
    // Ask the user if they want to delete an item
    let deleteConfirmation = await inquirer.prompt({
        name: "delete",
        type: "confirm",
        message: "Do you want to delete an item from the list?",
    });
    if (deleteConfirmation.delete) {
        // Prompt the user to delete an item by specifying its index
        let deleteItem = await inquirer.prompt({
            name: "index",
            type: "input",
            message: "Enter the index of the item you want to delete:",
        });
        let index = deleteItem.index.trim(); // Remove any leading or trailing whitespace
        // Check if the index is valid
        if (index !== "" && index >= 0 && index < todos.length && Number.isInteger(Number(index))) {
            index = Number(index); // Convert the index to a number if it's valid
            // Remove the item at the specified index
            todos.splice(index, 1);
            // Print the updated list
            console.log("Updated todo list:");
            todos.forEach((item, index) => console.log(`${index}: ${item}`)); // Print each item with its index
        }
        else {
            console.log("Invalid index. Item deletion aborted.");
        }
    }
    else {
        console.log("No items deleted. Final list remains unchanged.");
    }
}
