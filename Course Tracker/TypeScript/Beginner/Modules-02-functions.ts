//! TypeScript Module: Functions

//--------------------------------------------------------------------------------------
// ==============================
//*      INTRODUCTION
// ==============================

/*
When we declare a function in JavaScript, we often expect it to be invoked with arguments of a certain type.
- JavaScript does not share our expectations: its type flexibility often allows functions to be invoked with unexpected argument types. 

*/

//! EXAMPLE 1
//  Even when this doesn’t result in thrown errors, there can be negative consequences:
function printLengthOfText(text) {
  console.log(text.length);
}

printLengthOfText(3); // Prints: undefined

// JavaScript developers have found error-handling solutions to avoid such undesirable effects, but these techniques can be cumbersome:
function printLengthOfText(text) {
  if (typeof text !== "string") {
    throw new Error("Argument is not a string!");
  }

  console.log(text.length);
}

printLengthOfText(3); // Error: Argument is not a string!

//! EXAMPLE 2
function printOperations(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new Error("Both arguments must be numbers!");
  }

  console.log(a + b, a / b);
}

// The function call below should print: 12 1
printOperations(6, 6);

function exclaim(name, count) {
  for (let i = 0; i < count; i += 1) {
    console.log(`${name}!`);
  }
}

// Exclaim 'Muriel!' six times
exclaim("Muriel", 6);

//--------------------------------------------------------------------------------------
// ==============================
//*      PARAMETER TYPE ANNOTATIONS
// ==============================

/*
In TypeScript, function parameters may be given type annotations with the same syntax as variable declarations: a colon next to the name.
*/

//! EXAMPLE 1
// The type annotations ensure that the parameters are of the correct type:

function greet(name: string) {
  console.log(`Hello, ${name}!`);
}

greet("Katz"); // Prints: Hello, Katz

greet(1337); // Error: argument '1337' is not assignable to parameter of type 'string'

//! EXAMPLE 2
// Parameters that we do not provide type annotations for are assumed to be of type any—the same way

function printKeyValue(key: string, value) {
  console.log(`${key}: ${value}`);
}

printKeyValue("Courage", 1337); // Prints: Courage: 1337
printKeyValue("Mood", "scared"); // Prints: Mood: scared
// Here, the parameter value is an any variable: it’s compatible with any type.

//! EXAMPLE 3
function triple(value: number) {
  return value * 3;
}

function greetTripled(greeting: string, value: number) {
  console.log(`${greeting}, ${triple(value)}!`);
}

greetTripled("Hiya", 5);

//--------------------------------------------------------------------------------------
// ==============================
//*      OPTIONAL PARAMETERS
// ==============================

/*
TypeScript normally gives an error if we don’t provide a value for all arguments in a function. This isn’t always desirable; sometimes we’d like to skip providing values.
*/

//! EXAMPLE 1
function greet(name: string) {
  console.log(`Hello, ${name || "Anonymous"}!`);
}

greet("Anders"); // Prints: Hello, Anders!
greet(); // TypeScript Error: Expected 1 arguments, but got 0.

/* 
When the code snippet above is compiled to JavaScript, the greet() function will correctly print 'Hello, Anonymous!'. 
- That’s because when no arguments are passed in, name has the falsy value undefined, which means that name || 'Anonymous' evaluates to 'Anonymous'. 
- Since the final code works as intended, we want to prevent TypeScript from throwing errors:
NOTE: To indicate that a parameter is intentionally optional, we add a ? after its name. 
NOTE: This tells TypeScript that the parameter is allowed to be undefined and doesn’t always have to be provided.

*/
function greet(name?: string) {
  console.log(`Hello, ${name || "Anonymous"}!`);
}

greet(); // Prints: Hello, Anonymous!

//! EXAMPLE 2
function proclaim(status?: string) {
  console.log(`I'm ${status || "not ready..."}`);
}

proclaim();
proclaim("ready?");
proclaim("ready!");

//--------------------------------------------------------------------------------------
// ==============================
//*      DEFAULT PARAMETERS
// ==============================

/*
If a parameter is assigned a default value, TypeScript will infer the variable type to be the same as the default value’s type. 
(This is similar to how TypeScript infers the type of an initialized variable to be the same as the type of its initial value.)
*/

//! EXAMPLE 1
// The following code snippet logs a string to greet a user’s name, and defaults to the name 'Anonymous' if no name is provided.
function greet(name = "Anonymous") {
  console.log(`Hello, ${name}!`);
}
// The function greet() can receive a string or undefined as its name parameter—if any other type is provided as an argument, TypeScript will consider that a type error.
// NOTE: This is a cleaner way of getting the same functionality we had in the previous exercise.
// NOTE: There, we used ? to mark the name parameter as optional. But parameters with default values don’t need a ? after their name, since assigning a default value already implies that they’re optional parameters.

//! EXAMPLE 2
function proclaim(status = "not ready...", repeat = 1) {
  for (let i = 0; i < repeat; i += 1) {
    console.log(`I'm ${status}`);
  }
}

proclaim();
proclaim("ready?");
proclaim("ready!", 3);

//--------------------------------------------------------------------------------------
// ==============================
//*     INTERFERRING RETURN TYPES
// ==============================

/*
TypeScript can also infer the types of values returned by functions.
- It does this by looking at the types of the values after a function’s return statements.

*/

//! EXAMPLE 1
function createGreeting(name: string) {
  return `Hello, ${name}!`;
}

const myGreeting = createGreeting("Aisle Nevertell");
/*
Here’s how TypeScript can infer myGreeting above to be of type string:

- createGreeting()’s return statement is followed by a string variable, so createGreeting() is inferred to return string.
- createGreeting('Aisle Nevertell') therefore must result in a value of type string.
- myGreeting is initialized to createGreeting('Aisle Nevertell'), which is a value with the type string.

*/
//* Cool! Let’s see how this can help us fix bugs:
function ouncesToCups(ounces: number) {
  return `${ounces / 16} cups`;
}

const liquidAmount: number = ouncesToCups(3);
// Type 'string' is not assignable to type 'number'.
//* Here, TypeScript was able to infer that liquidAmount was being assigned a value of type string, despite it being declared as a variable of type number.
//* This correctly results in an error being surfaced.

//! EXAMPLE 2
function getRandomNumber() {
  return Math.random();
}

const myVar = getRandomNumber();

//--------------------------------------------------------------------------------------
// ==============================
//*      EXPLICIT RETURN TYPES
// ==============================

/*
If we’d like to be explicit about what type a function returns, we can add an explicit type annotation after its closing parenthesis.
- Here, we use the same syntax as other type annotations, a colon followed by the type.
- TypeScript will produce an error for any return statement in that function that doesn’t return the right type of value.
*/

//! EXAMPLE 1
function createGreeting(name?: string): string {
  if (name) {
    return `Hello, ${name}!`;
  }

  return undefined;
  // Typescript Error: Type 'undefined' is not assignable to type 'string'.
}

//! EXAMPLE 2
// We can also explicitly state return types for arrow functions. We’ll see the same kinds of error messages for both function types.
const createArrowGreeting = (name?: string): string => {
  if (name) {
    return `Hello, ${name}!`;
  }

  return undefined;
  // Typescript Error: Type 'undefined' is not assignable to type 'string'.
};

//! EXAMPLE 3

import {
  getUserChoice,
  f1,
  f2,
  f3,
  f4,
  f5,
  f6,
  f7,
  f8,
  f9,
  f10,
  f11,
  f12,
} from "./resources";

function returnFruit(): string {
  let num = getUserChoice();
  switch (num) {
    case 1:
      return f1();
    case 2:
      return f2();
    case 3:
      return f3();
    case 4:
      return f4();
    case 5:
      return f5();
    case 6:
      return f6();
    case 7:
      return f7();
    case 8:
      return f8();
    case 9:
      return f9();
    case 10:
      return f10();
    case 11:
      return f11();
    case 12:
      return f12();
  }
  return "durian.jpg";
}

console.log(returnFruit());
//The problematic function is f9()

//--------------------------------------------------------------------------------------
// ==============================
//*     VOID RETURN TYPES
// ==============================

/*
By now, we’ve made a pretty convincing case that type annotationsare very useful and should always be used unless there’s a very good reason not to. 
They make everything neat and aid in understanding our code.
For these reasons, it is often preferred to use type annotations for function, even when those functions don’t return anything.
*/

//! EXAMPLE 1
function logGreeting(name: string) {
  console.log(`Hello, ${name}!`);
}

// The function logGreeting() simply logs a greeting to the console. There is no returned value, so we must treat the return type as void.
//*  A proper type annotation for this function would look like this:

function logGreeting(name: string): void {
  console.log(`Hello, ${name}!`);
}

//! EXAMPLE 2
function makeFruitSalad(fruit1: string, fruit2: string): void {
  let salad = fruit1 + fruit2 + fruit2 + fruit1 + fruit2 + fruit1 + fruit1;
  console.log(salad);
}

makeFruitSalad("banana", "pineapple");

//--------------------------------------------------------------------------------------
// ==============================
//*      DOCUMENTING FUNCTIONS
// ==============================

/*
Documentation comments are especially useful for documenting functions. 
We place a function’s documentation comment in the code directly above the function declaration.
We can use special tags within the comment to highlight certain aspects of the function. 
*/

//! EXAMPLE 1
// TypeScript recognizes JavaScript comment syntax:

// This is a single line comment

/*
This is a 
multiline
comment
*/

//! EXAMPLE 2
// But it’s common in TypeScript to see a third comment style: documentation comments.
// A documentation comment is denoted with the first line /** and a final line */
// It’s common for each line within the comment to start with an asterisk (*):

/**
 * This is a documentation comment
 */

//! EXAMPLE 3
// We can use @param to describe each of the function’s parameters, and we can use @returns to describe what the function returns:

/**
 * Returns the sum of two numbers.
 *
 * @param x - The first input number
 * @param y - The second input number
 * @returns The sum of `x` and `y`
 *
 */
function getSum(x: number, y: number): number {
  return x + y;
}

// NOTE: Many text editors will helpfully display documentation comments, for example, when hovering over a function name.

//Task 1

/**
Prints the provided string parameters in the order:
* first, second, second, first, second, first, first
 *
 * @param fruit1 - The first input string
 * @param fruit2 - The second input string
 * @returns - The sum of 'fruit1' and 'fruit2'
 */

function makeFruitSalad(fruit1: string, fruit2: string): void {
  let salad = fruit1 + fruit2 + fruit2 + fruit1 + fruit2 + fruit1 + fruit1;
  console.log(salad);
}

/**
 * Return - Loops the input value number of times logging a string in the format: I'm [status]
 *
 * @param status - A string input
 * Default value: 'not ready'
 * @param repeat - A number value.
 * Default value: 1
 *@returns No return value
 *
 */

function proclaim(status = "not ready...", repeat = 1) {
  for (let i = 0; i < repeat; i += 1) {
    console.log(`I'm ${status}`);
  }
}

//--------------------------------------------------------------------------------------
// ==============================
//*      COMMON KEY VALUE PAIR
// ==============================

/*
When we put type members in a union, TypeScript will only allow us to use the common methods and properties that all members of the union share. 

*/

//! EXAMPLE 1
const batteryStatus: boolean | number = false;

batteryStatus.toString(); // No TypeScript error
batteryStatus.toFixed(2); // TypeScript error

//NOTE: Since batteryStatus can be a boolean or a number, TypeScript will only allow us to call methods that both number and boolean share. They both share .toString(), so we’re good there. But, since only number has a .toFixed() method, TypeScript will complain if we try to call it.

//! EXAMPLE 2
// This rule also applies to type objects that we define. Take this code:
type Goose = {
  isPettable: boolean;
  hasFeathers: boolean;
  canThwartAPicnic: boolean;
};

type Moose = {
  isPettable: boolean;
  hasHoofs: boolean;
};

const pettingZooAnimal: Goose | Moose = { isPettable: true };

console.log(pettingZooAnimal.isPettable); // No TypeScript error
console.log(pettingZooAnimal.hasHoofs); // TypeScript error
//NOTE: Like before, since .isPettable is on both Goose and Moose types, TypeScript will allow us to call it. But since .hasHoofs is only a property on Moose, we cannot call that method on pettingZooAnimal. Any properties or methods that are not shared by all of the union’s members won’t be allowed and will produce a TypeScript error.

//! EXAMPLE 3
type Like = {
  username: string;
  displayName: string;
};

type Share = {
  username: string;
  displayName: string;
};

function getFriendNameFromEvent(event: Like | Share) {
  return event.displayName || event.username;
}

const newEvent = {
  username: "vkrauss",
  displayName: "Veronica Krauss",
};

const friendName = getFriendNameFromEvent(newEvent);

console.log(`You have an update from ${friendName}.`);

//--------------------------------------------------------------------------------------
// ==============================
//*      UNIONS WITH LITTERAL TYPE
// ==============================

/*
We can use literal types with TypeScript unions. Literal type unions are useful when we want to create distinct states within a program.

*/

//! EXAMPLE 1
// For instance, if we were writing the code that controlled stoplights, we might write a program like this:
type Color = 'green' | 'yellow' | 'red';

function changeLight(color: Color) {
  // ...
}
//NOTE: With the code above, we could ensure that wherever changeLight() is called, that it gets passed only allowed stoplight colors. If we tried to call changeLight('purple'), TypeScript would complain, since that is not a valid stoplight color.
//NOTE: This technique allows us to write funtions that are specific about the states they can handle, which helps us write code that’s less prone to errors.

//! EXAMPLE 2
type Status = "idle" | "downloading" | "complete";

function downloadStatus(status: Status) {
  if (status === "idle") {
    console.log("Downloading");
  }

  if (status === "downloading") {
    console.log("Downloading");
  }

  if (status === "complete") {
    console.log("Your downloading is complete!");
  }
}
downloadStatus("idle");
