// A First Class Decorator

function Logger(constructor: Function) {
  console.log("Logging...");
  console.log(constructor);
}

@Logger
class Person {
  name = "Jose";

  constructor() {
    console.log("Creating person object...");
  }
}

const pers = new Person();

console.log(pers);

// Working with Decorator Factories

function LoggerFactory(logString: string) {
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

@LoggerFactory("LOGGING - PERSON")
class Person2 {
  name = "Jose";

  constructor() {
    console.log("Creating person object...");
  }
}

const pers2 = new Person();

console.log(pers2);

// Build More Useful Decorators

// Case where we don't need the constructor function
function WithTemplate(template: string, hookId: string) {
  return function (_: Function) {
    const hookEl = document.getElementById(hookId);
    if (hookEl) {
      hookEl.innerHTML = template;
    }
  };
}

@WithTemplate("<h1>My Person Object</h1>", "app")
class Person3 {
  name = "Jose";

  constructor() {
    console.log("Creating person object...");
  }
}

// Case where we use the constructor function
function WithTemplate2(template: string, hookId: string) {
  return function (constructor: any) {
    const hookEl = document.getElementById(hookId);
    const p = new constructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector("h1")!.textContent = p.name;
    }
  };
}

@WithTemplate2("<h1>My Person Object</h1>", "app")
class Person4 {
  name = "Jose";

  constructor() {
    console.log("Creating person object...");
  }
}

// Adding Multiple Decorators

function Logger2(logString: string) {
  console.log("Logger2 - Decorator factories run top to bottom");
  return function (constructor: Function) {
    console.log("Decorator of Logger2 - Decorators run bottom up");
    console.log(logString);
    console.log(constructor);
  };
}

function WithTemplate3(template: string, hookId: string) {
  console.log("WithTemplate3 - Decorator factories run top to bottom");
  return function (constructor: any) {
    console.log("Decorator of WithTemplate3 - Decorators run bottom up");
    const hookEl = document.getElementById(hookId);
    const p = new constructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector("h1")!.textContent = p.name;
    }
  };
}

@Logger2("LOGGING - PERSON")
@WithTemplate3("<h1>My Person Object</h1>", "app")
class Person5 {
  name = "Jose";

  constructor() {
    console.log("Creating person object...");
  }
}

// Diving into Property Decorators
// target: for instance properties → it will refer to the prototype of the object that was created
// target: for static properties → it will refer to the constructor function instead

// Property Decorator
function Log(target: any, propertyName: string | Symbol) {
  console.log("Property Decorator");
  console.log(target, propertyName);
}

// Accessor Decorator
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log("Accessor Decorator");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

// Method Decorator
function Log3(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log("Method Decorator");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

// Parameter Decorator
// name refers to the name of the method not the name of the parameter
function Log4(target: any, name: string, position: number) {
  console.log("Parameter Decorator");
  console.log(target);
  console.log(name);
  console.log(position);
}

class Product {
  @Log
  title: string;
  @Log
  static id: 1;
  private _price: number;

  @Log2
  set price(val: number) {
    if (val > 0) {
      this.price = val;
    } else {
      throw new Error("Invalid Price - should be positive!");
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}

// Returning (and Changing) a Class in a Class Decorator

function WithTemplate4(template: string, hookId: string) {
  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) {
    return class extends originalConstructor {
      constructor(..._: any[]) {
        // Execute the old logic
        super();
        // But also adds a new logic
        const hookEl = document.getElementById(hookId);
        // const p = new originalConstructor(); We don't need to call the original constructor anymore, we use the this keyword to access the instance of the original class
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector("h1")!.textContent = this.name;
        }
      }
    };
  };
}

@WithTemplate4("<h1>My Person Object</h1>", "app")
class Person6 {
  name = "Jose";

  constructor() {
    console.log("Creating person object...");
  }
}

const personInstance = new Person6();

console.log(personInstance);

// Example: Creating an Autobind Decorator

function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      // this will refer to whatever is responsible for triggering the getter method and that's the trick. The getter method will be triggered by the concrete object to which it belongs. So this will always refer to the object on which we defined the getter method. The this keyword will not be overridden by addEventListener.
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

class Printer {
  message = "This works!";

  @Autobind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();

const button = document.querySelector("button")!;
button.addEventListener("click", p.showMessage);
// returns undefined since we need to bind this keyword, that's why we use the decorator autobind

// Validation With Decorators

interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[];
  };
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [
      ...(registeredValidators[target.constructor.name]?.[propName] ?? []),
      "required",
    ],
  };
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [
      ...(registeredValidators[target.constructor.name]?.[propName] ?? []),
      "positive",
    ],
  };
}

function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if (!objValidatorConfig) {
    return true;
  }
  let isValid = true;
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case "required":
          isValid = isValid && !!obj[prop];
          break;
        case "positive":
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}

class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector("form")!;

courseForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const titleEl = document.getElementById("title") as HTMLInputElement;
  const priceEl = document.getElementById("price") as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  const createdCourse = new Course(title, price);

  if (!validate(createdCourse)) {
    alert("Invalid input, please try again!");
    return;
  }
  console.log(createdCourse);
});
