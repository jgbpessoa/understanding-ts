// Generic Type
// A type which is connected to another type where we wanna know which other type that is so TypeScript can give us better support

// Both syntaxes are the same thing
const names: Array<string> = [];
const names2: string[] = [];

const promise: Promise<string> = new Promise((resolve) => {
  setTimeout(() => {
    resolve("This is done asynchronously!");
  }, 2000);
});

promise.then((data) => {
  console.log(data);
});

console.log("This is done synchronously");

// In the end, Generic types help you get additional type information if you have a more complex class or function that does something with the data that is coming in a way where it doesn’t really care about the data being of one particular type but where you want to store the type information of the incoming data to get better TypeScript support whenever your work with your generic type

// Creating a Generic Function
function merge(objA: object, objB: object) {
  return Object.assign(objA, objB);
}

console.log(merge({ name: "Jose" }, { age: 29 }));
const mergedObj = merge({ name: "Jose" }, { age: 29 });

// TypeScript does not know if the object has the property name or age so it shoows an error
// console.log(mergedObj.name);
// console.log(mergedObj.age);

// We can do a type casting but that is really cumbersome
// const mergedObj = merge({ name: "Jose" }, { age: 29 }) as {name: string, age: number};

// So here generics can help us

function mergeGeneric<T, U>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mergedObjGeneric = mergeGeneric({ name: "Jose" }, { age: 29 });
console.log(mergedObjGeneric.name);
console.log(mergedObjGeneric.age);

// Now we are able to access the name and age properties
// if we hover over the function we will see function mergeGeneric<T, U>(objA: T, objB: U): T & U
// This means that TypeScript infers that this function returns the intersection between T and U
// Then TypeScript automatically knows that U represents an object with a string property (name) and T an object with a number property (age)
// TypeScript is able to do it now because before we only had the type object which is a highly unspecific type and the intersection between two unknown objects is an unknown object so TypeScript is not able to infer that we have the name and age properties
// We don't know exactly what types U and T will be but TypeScript knows that they will be different and then it is able to infer them

// In this example we didn't have to set the new types because TypeScript is able to infer them
// That's the power of this feature, we just need to tell TypeScript we have different generic types and it will infer them
// These types will be set dinamically when we call the function
const mergedObjGeneric2 = mergeGeneric(
  { name: "Jose", hobbies: ["singing", "dancing"] },
  { age: 29 }
);
console.log(mergedObjGeneric2.hobbies);

// We can also set the types for T and U when we call the function like this mergeGeneric<{name:string, hobbies: string[]}, {age:number}> but that would be reduntant since TypeScript is able to infer it

// Working with Constraints

// This fails silently because we are not able to add 29 to the object and TypeScript does not show an error
const mergedObjGeneric3 = mergeGeneric(
  { name: "Jose", hobbies: ["singing"] },
  29
);
console.log(mergedObjGeneric3);

// We use the extends keyword to add type constraints to our generic types to avoid silent errors and strange behavior in our code

function mergeGenericConst<T extends object, U extends object>(
  objA: T,
  objB: U
) {
  return Object.assign(objA, objB);
}

// Now TypeScript will show an error if we try to pass anything that is not an object to this function
const mergedObjGeneric4 = mergeGenericConst(
  { name: "Jose", hobbies: ["singing"] },
  { age: 29 }
);
console.log(mergedObjGeneric4);

// Another Generic Function
// Generic functions allow us to be more flexible and only care about the property that is important for our code

interface Lenghty {
  length: number;
}

function countAndDescribe<T extends Lenghty>(element: T): [T, string] {
  let descriptionText = "Got no value.";
  if (element.length === 1) {
    descriptionText = "Got 1 element.";
  } else if (element.length > 1) {
    descriptionText = "Got " + element.length + " elements.";
  }
  return [element, descriptionText];
}

console.log(countAndDescribe(["singing", "dancing"]));
console.log(countAndDescribe("How are you?"));
// This one shows an error since numbers don't have a length property
// console.log(countAndDescribe(10));

// The "keyof" Constraint

function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return "Value: " + obj[key];
}

console.log(extractAndConvert({ name: "Jose" }, "name"));

// Here we are informing TypeScript that the first parameter should be any kind of object and the second parameter should be any kind of key in that object

// Generic Classes

class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    //In case it can't find the index, it returns -1 and we don't want to remove a wrong item
    if (this.data.indexOf(item) === -1) {
      return;
    }

    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("Jose");
textStorage.addItem("Max");
textStorage.addItem("Manu");
textStorage.removeItem("Manu");
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();

numberStorage.addItem(5);
numberStorage.addItem(2);
numberStorage.addItem(3);
console.log(numberStorage.getItems());

// This does not work because objects are a reference type so when we try to remove the object, this one has a new reference value
// For this to work we need to store the object in a variable
// const objStorage = new DataStorage<object>();
// objStorage.addItem({name: "Jose"});
// objStorage.addItem({name: "Manu"});
// objStorage.removeItem({name: "Jose"});
// console.log(objStorage.getItems());

// Generic Utility Types

interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  // Partial tells TypeScript that this is an object that in the end will be a CourseGoal -> buy initially Partial changes CourseGoal to a type where all these properties are optional
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;
  // Later we need to type cast it because we know the in this point of time we will have added all the data and it is not a Partial anymore
  return courseGoal as CourseGoal;
}

// This tells TypeScript that this is an array of strings and it is read only so if we try to add or remove items TypeScript will show an error
// We can also use it on objects
const names3: Readonly<string[]> = ["Jose", "Anna"];
// ERRORS
// names3.push("Sandra");
// names3.pop();

// Generic Types vs Union Types

// Generic Types → if you want to lock in a certain type, use the same type throughout the entire function/class instance
// Union Types → if you want to have a function which you can call with one of the specified types every time you call it → flexible to have a different type with every method call
