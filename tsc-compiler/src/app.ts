console.log("Lets learn about the configuration of the TypeScript Compiler");

// tsc --init to create a TypeScript project
// tsc --watch or tsc -w to compile all ts files in the project folder

// We can add "exclude" and "include" keys in the tsconfig file to manage which files we want to compile

// The "target" key tells TypeScript for which target JavaScript version you want to compile the code.

// The "lib" is an option that allows you to specify which default objects and features TypeScript knows like working with the DOM, for example
// Default lib for "es6" target is "lib" : ["dom", "es6", "dom.iterable", "scripthost"]

// “allowJs” key → js files will be compiled by TypeScript
// “checkJs” key → js files won’t be compiled but TypeScript will still check the syntax in there and report potential errors

// Source Map helps us with debugging and development
// Setting “sourceMap” to true will generate .map files that basically act like as a bridge, which is understood by modern browsers and developer tools to connect the JavaScript files to the input files
// With these files generated, we can see the input files (.ts) in the sources tab
// We can even place breakpoints in the TypeScript files to take the debugging process to the next level because we can work directly in our input files

// outDir → tell the TypeScript compiler where the created files should be stored. Ex: ./dist
// rootDir → Tell the TypeScript compiler where your .ts files are. It also makes sure that project structure you set up there is kept in a dist folder
// outDir → where output files should be generated
// rootDir → where input files live

// “noEmitOnError”: true → problematic .ts files will stop compilation to JavaScript. If any file fails to compile, no files will be generated.

// “strict”: true → it enables all strict type checking options. This sets all the individual options to true
// “noImplicitAny”: true → It ensures that we have to be clear about our parameters and the values we are working in our code
// “strictNullChecks”: false → TypeScript stops showing errors for possible null value operations
// We can use an if check or a exclamation mark to work around this error if strictNullChecks is set to true
// “strictBindCallApply”: true → it basically checks on which function you are calling bind, call or apply and it checks if what you’re setting up here makes sense.
// “noImplicitThis”: true → TypeScript basically tries to warn you if you use the this keyword in a place where it’s not clear what it refers to.
// “alwaysStrict”: true → generated files will always use strict mode

// noUnusedLocals and noUnusedParameters → Errors if you have any unused variable or parameter in your code. Unused global variables are allowed
// noImplicitReturns → Error if we have a function that sometimes return something and sometimes not
