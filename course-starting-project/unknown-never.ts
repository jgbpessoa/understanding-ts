let userInput: unknown;
let userName: string;

userInput = 5;
userInput = "Max";

// userName = userInput; ERROR unknown is not assignable to type string

if (typeof userInput === "string") {
  userName = userInput;
}

// Typescript infers void to this function
function generateError(message: string, code: number): never {
  throw { message: message, errorCode: code };
  //while (true) {}
}

generateError("An error occurred!", 500);
// This console.log never prints because generateError crashes the code. Therefore, it never returns anything.
// console.log(generateError("An error occurred!", 500));
