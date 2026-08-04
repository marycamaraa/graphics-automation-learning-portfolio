//! TypeScript Module: Union Types

//--------------------------------------------------------------------------------------
// ==============================
//*      INTRODUCTION
// ==============================

/*
TypeScript lets us type variables, variables are expected to follow the same rules and guidelines that they do with JavaScript.
 with different levels of type specificity. If we want to enforce that a variable is a string, we can type it as a string. 
 This type is very specific since TypeScript will only allow the variable to have a string value.
*/

//! EXAMPLE 1
let ID: any;

console.log(`The ID is ${ID}.`);

//NOTE: The problem with the any type is that any value might not work with our program. To solve this problem, TypeScript allows us to be flexible with how specific our types are by combining different types. When we combine types, it is called a union.

//--------------------------------------------------------------------------------------
// ==============================
//*      DEFINING UNION TYPES
// ==============================

/*
Unions allow us to define multiple allowed type members by separating each type member with a vertical line character |

*/

//! EXAMPLE 1
// With a union, we can re-type the program from the previous exercise like this:
let ID: string | number;

// number
ID = 1;

// or string
ID = "001";

console.log(`The ID is ${ID}.`);

//NOTE: In this example, string | number is a union that allows ID to be a string or a number. It’s more flexible than a single primitive type, but much more specific than the any type.

//! EXAMPLE 2
// Unions can be written anywhere a type value is defined, including function parameters:
function getMarginLeft(margin: string | number) {
  return { marginLeft: margin };
}
//NOTE: Using unions to type function parameters is especially convenient because functions often need to handle multiple types of input.

//! EXAMPLE 3
function printNumsAndStrings(statement: string | number) {
  console.log(`ℹ️ LOG:: ${statement}`);
}

printNumsAndStrings("hello!");
printNumsAndStrings(12);

//--------------------------------------------------------------------------------------
// ==============================
//*      TYPE NARROWING
// ==============================

/*
Typing with Unions gives us more flexibility with type specificity, but there’s also more to consider
*/

//! EXAMPLE 1
// For instance, look over this union:
function getMarginLeft(margin: string | number) {
  // ...
}
//NOTE: Since margin can be a string or a number, we may want to perform different logic in the getMarginLeft() function’s body that does one thing for strings and another for numbers. To do this, we could implement a type guard.
// A type guard is a conditional that checks if a variable is a certain type, like this:
function getMarginLeft(margin: string | number) {
  // margin may be a string or number here

  if (typeof margin === "string") {
    // margin must be a string here
  }
}

//NOTE: In the example above, TypeScript is able to read the type guard and infer that the margin variable inside the type guard must be a string. Since TypeScript knows margin is a string, it will allow us to use string methods on margin, like this:
if (typeof margin === "string") {
  return margin.toLowerCase();
}
/*
If we tried to call margin.toLowerCase() outside of the string type guard, TypeScript would complain that the .toLowerCase() method does not exist on number types. This error would occur because margin is typed as a string | number union.
- This concept is called type narrowing. Type narrowing is when TypeScript can figure out what type a variable can be at a given point in our code.
- In our examples, TypeScript has narrowed the type inside the type guard to only be a string. 
- Type narrowing allows us to use unions, then perform type-specific logic without TypeScript getting in the way.
*/

//! EXAMPLE 2
function formatValue(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toLowerCase());
  }
  if (typeof value === "number") {
    console.log(value.toFixed(2));
  }
}

formatValue("Hiya");
formatValue(42);

//--------------------------------------------------------------------------------------
// ==============================
//*      INEERED UNION RETURN TYPES
// ==============================

/*
ypeScript is that it’s able to infer types in many cases so that we don’t have to manually write them. A great example is a function’s return type. TypeScript will look at the contents of a function and infer which types the function can return. If there are multiple possible return types, TypeScript will infer the return type as a union.
*/

//! EXAMPLE 1
//For instance, take this example, where we call a function named getBookFromServer(), which might fail:
function getBook() {
  try {
    return getBookFromServer();
  } catch (error) {
    return `Something went wrong: ${error}`;
  }
}

//! EXAMPLE 2
type User = {
  id: number;
  username: string;
};

function createUser() {
  const randomChance = Math.random() >= 0.5;

  if (randomChance) {
    return { id: 1, username: "nikko" };
  } else {
    return "Could not create a user.";
  }
}
const userData: User | string = createUser();


//! EXAMPLE 3
//--------------------------------------------------------------------------------------
// ==============================
//*       UNION AND ARRAYS
// ==============================

/*
Unions are even more powerful when used in combination with arrays
*/
//! EXAMPLE 1
// To create a union that supports multiple types for an array’s values, wrap the union in parentheses (string | number), then use array notation [].
const dateNumber = new Date().getTime(); // returns a number
const dateString = new Date().toString(); // returns a string

const timesList: (string | number)[] = [dateNumber, dateString];
//NOTE: One last thing: the parentheses are vitally important to type arrays correctly. If we left out the parentheses and wrote string | number[], that type would allow strings or arrays of only numbers.

//! EXAMPLE 2
function formatListings(listings: (number | string)[]) {
  return listings.map((listing) => {
    if (typeof listing === 'string') {
      return listing.toUpperCase();
    }

    if (typeof listing === 'number') {
      return `$${listing.toLocaleString()}`;
    }
  });
}

const result = formatListings([
  '123 Main St',
  226800,
  '580 Broadway Apt 4a',
  337900,
]);

console.log(result);

