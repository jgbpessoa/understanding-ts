//Explicitly setting the return type
// This type was also inferred by TypeScript
function add(n1: number, n2: number): number {
  return n1 + n2;
}

//The return type of this funtion in TypeScript is void since it doesn't return anything
function printResult(num: number) {
  console.log("Result: " + num);
}

printResult(add(5, 12));

//In JavaScript if we use the return value of a function that doesn't return anything, we get undefined as a value.
// In TypeScript we get undefined if we use the return statement and we don't pass anything
function printResult2(num: number): undefined {
  console.log("Result:" + num);
  return;
}

// let someValue: undefined is also possible
// We can use void with a empty return statement as well

// Here we just specify that the variable will receive a function
let combinedValues: Function;

// Here we especify the parameters and the return type it will receive
let combineValues: (a: number, b: number) => number;

combineValues = add;
// combineValues = printResult; ERROR
// combineValues = 5; ERROR

console.log(combineValues(8, 8));

// Function Types & Callback
function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
  const result = n1 + n2;
  cb(result);
}

addAndHandle(10, 20, (result) => {
  console.log(result);
  // We can return something without an error message. When we set the return type to void we make it really clear that we are not interested in any return value.
});

// So void does not force you to pass in a callback that does not return anything.
// It just tells you that anything you might return will not be used.

// This gives an error because the callback function specified for this function has only one parameter
// addAndHandle(10, 20, (resul, result2) => {
//   console.log(result);
// });

// This is why parameters are enforced and the TypeScript is really strict regarding the number and type of parameters of callback functions and why it doesn’t really care about the return type.
