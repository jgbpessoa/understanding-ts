// Explicitly setting types
// const person: {
//   name: string;
//   age: number;
// } = {
//   name: "Jose",
//   age: 28,
// };

// const person: {
//   name: string;
//   age: number;
//   hobbies: string[];
//   role: [number, string];
// } = {
//   name: "Jose",
//   age: 28,
//   hobbies: ["Sports", "Cooking"],
//   role: [2, "author"],
// };

// const ADMIN = 0;
// const READ_ONLY = 1;
// const AUTHOR = 2;

enum Role {
  ADMIN,
  READ_ONLY,
  AUTHOR,
}

// We can also assign our values if we need too
// enum Role { ADMIN = 5, READ_ONLY = "READ", AUTHOR = "100"}

const person = {
  name: "Jose",
  age: 28,
  hobbies: ["Sports", "Cooking"],
  role: Role.ADMIN,
};

if (person.role === Role.ADMIN) {
  console.log("is admin");
}

// any type is a fallback when we don't know which data type will be stored in a variable
// In this case we need to rely on runtime checks like in Vanilla JS so avoid this data type

// avoid this let shoppingCart: any;
// at least try to be more specific about it let shoppingCart: any[];

// These are both allowed when Typescript infers the types even though they don't follow the structure we want
// person.role.push("admin");
// person.role[1] = 10;

// When we add the tupple type [number, string] person.role[1] = 10; gives an error. The push method is still allowed though. So we have to be careful!
// person.role = [1, "reader", 'brazil']; this will also display an error

let favoriteActivities: string[];

favoriteActivities = ["Sports"];

console.log(person.name);

for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase());
  // hobby.map(); TypeScript notifies the ERROR! since hobby is type string not array
}

// Nested object explicit typing
// const product: {
//   id: string;
//   price: number;
//   tags: string[];
//   details: {
//     title: string;
//     description: string;
//   };
// } = {
//   id: "abc1",
//   price: 12.99,
//   tags: ["great-offer", "hot-and-new"],
//   details: {
//     title: "Red Carpet",
//     description: "A great carpet - almost brand-new!",
//   },
// };

// Types inferred by TS
const product = {
  id: "abc1",
  price: 12.99,
  tags: ["great-offer", "hot-and-new"],
  details: {
    title: "Red Carpet",
    description: "A great carpet - almost brand-new!",
  },
};
