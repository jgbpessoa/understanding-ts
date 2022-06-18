// Interface - it allows us to define the structure of an object. We can use it as a type to type check for objects that must have this structure

interface Named {
  readonly name?: string;
  outputName?: string;
}

interface Greetable extends Named {
  greet(phrase: string): void;
}

// You can inherit from multiple interfaces separating them with commas
class Person implements Greetable {
  name?: string;
  age: number = 30;

  constructor(n?: string) {
    if (n) {
      this.name = n;
    }
  }

  greet(phrase: string) {
    if (this.name) {
      console.log(phrase + " " + this.name);
    } else {
      console.log("Hi!");
    }
  }
}

// This doesn't give an error because the class Person implements the interface Greetable
let user1: Greetable;
let user2: Greetable;

user1 = new Person("Max");
user2 = new Person();

// We can't change this property since it is readonly
// user1.name = "Jose";

user1.greet("Hi there - I am");
console.log(user1);

user2.greet("Hi there - I am");
console.log(user2);

// We can also add optional parameters by adding a default value

// Interfaces as Function Types

// type AddFn = (a: number, b: number) => number; (more common, shorter notation)
interface AddFn {
  (a: number, b: number): number;
}

let add: AddFn;

add = (n1: number, n2: number) => {
  return n1 + n2;
};

// Using a custom type is probably more common

// Compiling Interfaces to JavaScript -> There is no translation for interfaces → JavaScript doesn’t know about this feature
// It’s a pure TypeScript feature only available during development and compilation
// We can use it to improve our code → it’s a pure development feature helping us to write better and clearly structured code following clear rules
// They are used during compilation to check your code then they’re ignored
