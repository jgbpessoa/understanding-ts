// Intersection Types

type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: "Jose",
  privileges: ["create-server"],
  startDate: new Date(),
};

console.log(e1);

// We can obtain the same result using interface inheritance since we are working with objects

interface AdminInt {
  name: string;
  privileges: string[];
}

interface EmployeeInt {
  name: string;
  startDate: Date;
}

interface ElevatedEmployeeInt extends AdminInt, EmployeeInt {}

const e2: ElevatedEmployeeInt = {
  name: "Jose",
  privileges: ["create-server"],
  startDate: new Date(),
};

console.log(e2);

// Intersection types can be used in any types while interfaces only work with objects

type Combinable = string | number;
type Numeric = number | boolean;

// Universal type is number
type Universal = Combinable & Numeric;

// The intersection operator can be used with any types and then simply builds the intersection of these types
// In the case of a union type, that is basically the types they have in common
// In the case of object types, it’s simply the combination of these object properties

// More on Type Guards

function add(a: Combinable, b: Combinable) {
  // Type guard -> it allows us to utilize the flexibility union types give us and still ensure that our code runs correctly at runtime
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log("Name: " + emp.name);
  // This needs a type guard because TypeScript does not know if the object we are going to pass in this fuction has the privileges property
  if ("privileges" in emp) {
    console.log("Privileges: " + emp.privileges);
  }
  // Same for startDate
  if ("startDate" in emp) {
    console.log("Start Date: " + emp.startDate);
  }
}

printEmployeeInformation(e1);

// When working with classes, you can also use another type of type guard -> instanceof

class Car {
  drive() {
    console.log("Driving...");
  }
}

class Truck {
  drive() {
    console.log("Driving a truck...");
  }

  loadingCargo(amount: number) {
    console.log("Loading cargo ... " + amount);
  }
}

type Vehicule = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicule(vehicule: Vehicule) {
  vehicule.drive();
  // if("loadingTruck" in vehicule) {} would work too!
  if (vehicule instanceof Truck) {
    vehicule.loadingCargo(1000);
  }
}

useVehicule(v1);
useVehicule(v2);

// Type Guards need to be created with methods that JavaScript understands since they need to work during runtime

// Type guard is a term that describes the approach of checking if a certain property or method exists before you try to use it, or if you can do with the type before you try to use it

// For objects it can be done with instanceof or in
// For other types, we can use typeof
// With type guards we have all the flexibility that union types give without facing errors since we write code according to which type we get during runtime

// Discriminated Unions
// We have one common property in every object that makes up our union, which describes that object so that we can use this property, that describes this object in our check to have 100% type safety and understand which properties are available for such an object and which properties are not

interface Bird {
  type: "bird";
  flyingSpeed: number;
}

interface Horse {
  type: "horse";
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed;
      break;
    case "horse":
      speed = animal.runningSpeed;
      break;
  }
  console.log("Moving at speed: " + speed);
}

moveAnimal({ type: "bird", flyingSpeed: 10 });

// Instead of checking for the existence of a given property or instead of using instance of, we use use a property we know that exists to check which type of object we’re working with

// Type Casting
// It helps you tell TypeScript that some valeu is of a specific type where TypeScript is not able to detect it on its own but you as a developer know that it will be the case
// It has two different syntaxes, pick one and be consistent
// The second one is better when we are working with React since the first one looks like JSX

// const userInputElement = <HTMLInputElement>document.getElementById("user-input")!;
const userInputElement = document.getElementById(
  "user-input"
)! as HTMLInputElement;

userInputElement.value = "Hi there!";

// The exclamation mark (!) allows us to tell TypeScript that the expression in front of it will never yield null
// This is required when we select something from the DOM that might return null
// When we type cast we also tell TypeScript that the expression won't return null. So the ! above is optional

// Alternative to using the exclamation mark
// If you don't want to use it, you can use an if check

if (userInputElement) {
  (userInputElement as HTMLInputElement).value = "Hi there!";
}

// Index Properties

interface ErrorContainer {
  [prop: string]: string;
}

// With that I'm simply saying that whatever object I'm constructing based on this error container interface later must have properties which are strings
// I don't know the exact property name, I also don't know the property count. I just know that every property which is added to this object, which is based on the error container, must have a property name which can be interpreted as a string and the value for that property also must be a string
// We can add predefined properties but they need to adhere to the type defined in the index property -> in this case we can only add string properties that hold strings -> restriction

const errorBag: ErrorContainer = {
  email: "Not a valid email!",
  username: "Must start with a capital character",
  // Numbers can be treated as strings for property names but the opposite is not possible
  1: "Error 01",
};

// Function Overloads
// A feature that allows us to define multiple function signatures which means we can have multiple possible ways of calling a function with different parameters and return types

// We inform TypeScript the possible ways to call the function and the return type
function addOverload(a: number, b: number): number;
function addOverload(a: string, b: string): string;
function addOverload(a: number, b: string): string;
function addOverload(a: string, b: number): string;
function addOverload(a: Combinable, b: Combinable) {
  // Type guard -> it allows us to utilize the flexibility union types give us and still ensure that our code runs correctly at runtime
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

const result = addOverload("Jose ", "Pessoa");
// This string method won't work because TypeScript sees result as type Combinable so it is not sure it is a string to let us use string methods
// When we add the function overloads we inform TypeScript that it will return a string and the error is gone
result.split(" ");

// Optional Chaining
// A feature to use when we don’t know for sure if an object holds a certain property

const fetchedUserData = {
  id: "u1",
  name: "Jose",
  // job: { title: "CEO", description: "My own company", }
};

// This tells TypeScript if the thing in front of the question markis undefined, it will not access the thing that's after. Therefore it will not throw a runtime error
// console.log(fetchedUserData?.job?.title);

// Another way of doing this is checking if fetchedUserData exists than look for job (older syntax)
// if (fetchedUserData && fetchedUserData.job && fetchedUserData.job.title) { console.log(fetchedUserData.job.title) }

// Nullish Coalescing
// A feature that helps us deal with nullish data

const userInput = "";

// In this case DEFAULT will be stored since an empty string is a falsy value
const storedData = userInput || "DEFAULT";

// If we want to keep the empty string (or 0, for example) and just avoid null and undefined we can use the Nullish Coalescing Operator (??)
const storedData2 = userInput ?? "DEFAULT";

console.log(storedData);
// DEFAULT
console.log(storedData2);
// empty string
