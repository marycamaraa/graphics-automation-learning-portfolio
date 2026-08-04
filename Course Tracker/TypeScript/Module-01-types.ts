//! TypeScript Module: Types

//--------------------------------------------------------------------------------------
// ==============================
//*      FROM JAVASCRIPT TO TYPESCRIPT
// ==============================

/*
- TypeScript is a programming language that adds types to JavaScript. It allows us to write JavaScript with a set of tools called a type system that can spot potential bugs in, clarify the structure of, and help refactor our code.
- In addition, TypeScript added newer JavaScript language features, such as arrow function and classes years before they were added to JavaScript officially.

*/

//--------------------------------------------------------------------------------------
// ==============================
//?      WHAT IS TYPESCRIPT?
// ==============================

/*
How to use typescript:
- First, we write TypeScript code in files with the extension .ts.
- Next, we run our code through the TypeScript transpiler. The transpiler will check that the code adheres to TypeScript’s standards, and it will display errors when it does not.
- If the TypeScript code can be converted into working JavaScript, the transpiler will output a JavaScript version of the file (.js).

NOTE: TypeScript code is a superset of JavaScript code—it has all the features of traditional JavaScript but adds some new features.
*/

//! EXAMPLE 1
// Given this TypeScript code as input:
let firstName = "Anders";

// The TypeScript transpiler would output this JavaScript code:
let firstName1 = "Anders";

//NOTE: That’s right, they’re the same! TypeScript code generally looks roughly the same as the equivalent JavaScript.

//! EXAMPLE 2
//NOTE: The TypeScript transcompiler can be used on the command line by running the tsc command:
// tsc
//NOTE: This will create an equivalent .js file in the same directory as well as surface any errors found by the TypeScript transcompiler.

//! EXAMPLE 3
// You’ve now created an index.js file (you can confirm this by running the ls command in your terminal).
// Run the resultant JavaScript file with the node command:
// node index.js

//--------------------------------------------------------------------------------------
// ==============================
//*      TYPE INFERENNCES
// ==============================

/*
JavaScript allows us to assign any value to any variable. That makes it very flexible to use, which can be good for getting started quickly in coding.
- One of the first things we’ll discover with TypeScript is that when we declare a variable with an initial value, the variable can never be reassigned a value of a different data type.
- This is an example of type inference: everywhere in our program, TypeScript expects the data type of the variable to match the type of the value initially assigned to it at declaration.

TypeScript recognizes JavaScript’s built-in “primitive” data types:
- boolean
- number
- null
- string
- undefined

*/

//! EXAMPLE 1
// If we try to reassign a variable to a value of a different type, TypeScript will surface an error.
let order = "first";

order = 1;
// Running the TypeScript code above will result in the following error being surfaced in the terminal: Type 'number' is not assignable to type 'string'.
// TypeScript’s type system is telling us that order is expected to be the primitive type string, but we’re trying to assign it a value of type number. That’s not allowed
// We can fix this complaint by changing the new value to be the expected string type:
let order = "first";

order = "1";

//! EXAMPLE 2
let aged = true;
let realAge = 0;

if (aged) {
  realAge = 4;
}

let dogAge = realAge * 7;

console.log(`${dogAge} years`);

//--------------------------------------------------------------------------------------
// ==============================
//*      TYPE SHAPES
// ==============================

/*
Because TypeScript knows what types our objects are, it also knows what shapes our objects adhere to. An object’s shape describes, among other things, what properties and methods it does or doesn’t contain.
- The built-in types in JavaScript each have known properties and methods that always exist. All strings, for example, are known to have a .length property and .toLowerCase() method.



*/

//! EXAMPLE 1

"OH".length; // 2
"MY".toLowerCase(); // "my"

// TypeScript’s tsc command will let you know if your code tries to access properties and methods that don’t exist:
"MY".toLowercase();
// Property 'toLowercase' does not exist on type '"MY"'.
// Did you mean 'toLowerCase'?

//NOTE: Through this knowledge of type shapes, TypeScript helps us quickly locate bugs in our code.

//! EXAMPLE 2
//* INDEX.TS
let firstName = "muriel!";

console.log(firstName.toUpperCase());

console.log(firstName.length);

//* INDEX.JS
let firstName = "muriel!";
console.log(firstName.toUpperCase());
console.log(firstName.length);

//--------------------------------------------------------------------------------------
// ==============================
//*      ANY
// ==============================

/*
There are some places where TypeScript will not try to infer what type something is—generally when a variable is declared without being assigned an initial value.
In situations where it isn’t able to infer a type, TypeScript will consider a variable to be of type any.
Variables of type any can be assigned to any value and TypeScript won’t give an error if they’re reassigned to a different type later on.
*/

//! EXAMPLE 1
let onOrOff;

onOrOff = 1;
onOrOff = false;

//--------------------------------------------------------------------------------------
// ==============================
//*      VARIABLE TYPE ANNOTATIONS 
// ==============================

/*
In some situations, we’d like to declare a variable without an initial value while still ensuring that it will only ever be assigned values of a certain type. 
If left as any, TypeScript won’t be able to protect us from accidentally assigning a variable to an incorrect type that could break our code.
We can tell TypeScript what type something is or will be by using a type annotation((also known as type declarations) ).
*/

//! EXAMPLE 1
// We provide a type annotation by appending a variable with a colon (:) and the type (e.g., number, string, or any).
let mustBeAString : string;
mustBeAString = 'Catdog';

mustBeAString = 1337;
// Error: Type 'number' is not assignable to type 'string'



//--------------------------------------------------------------------------------------
// ==============================
//*      THE tsconfig.json FILE
// Let’s explore what the tsconfig.json file is for.
// ==============================

/*
TypeScript features are extremely useful: for one, it allows us to add types to regular JavaScript code.
It also checks for syntax errors even before run time. It even provides tooltips that show you why some code might throw an error. 
Sometimes, you don’t want all the default rules that TypeScript is trying to enforce — and that’s fine.
That’s one reason why providing a tsconfig.json file is useful. Additionally, you get perks like telling the TypeScript compiler what files to run on and more! So, let’s explore what this file looks like and how it helps.

//* Sample tsconfig.json and Breakdown
The tsconfig.json file is always placed in the root of your project and you can customize what rules you want the TypeScript compiler to enforce.

*/

//! EXAMPLE 1
// - tsconfig.json file we provide in every single exercise and project in our Learn TypeScript course:
{
  "compilerOptions": {
    "target": "es2017",
    "module": "commonjs",
    "strictNullChecks": true
  },
  "include": ["**/*.ts"]
}

/*
In the JSON, there are several properties:

"compilerOptions", which is a nested object that contains the rules for the TypeScript compiler to enforce.
"target", the value "es2017" means the project will be using the 2017 version of EcmaScript standards for JavaScript.
"module", this project will be using "commonjs" syntax to import and export modules.
"strictNullChecks", variables can only have null or undefined values if they are explicitly assigned those values.
"include" that determines what files the compiler applies the rules to. In this case the include above means the compiler should check every single file that has a .ts extension.


//* Usage 
- Another neat addition is that by including a tsconfig.json file, you can now use the command tsc without any arguments in your terminal! 
-  The compiler will automatically recognize from your tsconfig.json file, what specific files to run on.
- You can still provide specific files like tsc fileName.ts if that’s the only file you want the compiler to check.

//* Wrap up
- Check out TypeScript’s compiler option documentation for even more information.
*/
