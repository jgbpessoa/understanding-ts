// let and const

const userName = "Jose";

let age = 28;
age = 29;

function add(a: number, b: number) {
  let result;
  result = a + b;
  return result;
}

// var doesn't follow block scope rules -> only function and global
// this code works even though is not considered a good practice
// if (age > 21) {
//   var isOld = true;
// }

// console.log(isOld);

// const/let follow block scope rules -> helps us write cleaner code
// this code gives us an error in the console
// if (age > 21) {
//   let isOld = true;
// }

// console.log(isOld);

// Arrow function

const addArrow = (a: number, b: number) => a + b;

const printOutput: (a: number | string) => void = (output) =>
  console.log(output);

const button = document.querySelector("button");

if (button) {
  button.addEventListener("click", (event) => console.log(event));
}

printOutput(addArrow(5, 2));

// Default function parameters
// Default arguments have to be last in the list → default arguments are not skipped when you call a function

const addArrowDefault2 = (a: number, b: number = 2) => a + b;

printOutput(addArrowDefault2(5));

// The Spread Operator (...)

const hobbies = ["Sports", "Cooking"];

const activeHobbies = ["Cooking"];

// activeHobbies.push(hobbies[0], hobbies[1]);
activeHobbies.push(...hobbies);

const person = {
  name: "Max",
  age: 30,
};

// Not creating a new object -> we are actually copying the pointer at this person object in memory into this copied person constant
// const copiedPerson = person;

// With the spread operator we can actually create a new object in memory
const copiedPerson = { ...person };
