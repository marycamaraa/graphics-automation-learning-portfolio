//! React Module: Custom Hooks 

//--------------------------------------------------------------------------------------
// ==============================
//*      INTRODUCTION TO ADVANCED HOOKS
// ==============================

/*
 Custom hooks are functions that encapsulate logic using other React hooks. They behave just like hooks built into React, but they allow us to combine and reuse them to reduce logic complexity and repetition.
*/

//! EXAMPLE 1
// This useEffect() will run whenever the counter state value changes. Press “Run” to see how the effect changes our counter.
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

function App() {
  const [counter, setCounter] = useState(0);
  const limit = 1000;
  useEffect(() => {
    let timerId;

    if (counter < limit) {
      timerId = setTimeout(() => {
        setCounter((prevCounter) => prevCounter + 1);
      });
    }

    return () => clearTimeout(timerId);
  }, [counter, limit]);

  return <div>Rapid count: {counter}</div>;
}

export default App;


//--------------------------------------------------------------------------------------
// ==============================
//*      REVVIEWING THE EFFECT HOOK
// ==============================

/*
The useEffect() hook allows developers to perform an action after rendering. 
These actions are typically side effects of the component rendering and are often reactions to state changes. 
A common example of one of these “side effects” is fetching data after the component renders.

useEffect() accepts two arguments:
- A callback function that is executed after the component renders
- An array of dependency values that dictates when the callback should rerun

*/

//! EXAMPLE 1
// If we want to fetch data only once when the component first mounts, we can pass an empty array as the second argument to useEffect(). 
// This tells React that the effect does not depend on any values from props or state, so it only needs to run once.
useEffect(() => {
  fetchData('someapi.com/key/123');
}, []); // <-- An empty dependency array


//! EXAMPLE 2
// If we want to fetch data whenever a specific state value changes, we can include that value in the dependency array.
const [searchQuery, setSearchQuery] = useState('');

useEffect(() => {
  fetchData(`someapi.com/search?q=${searchQuery}`);
}, [searchQuery]); // ← A single dependency 


// Task 
// Create a counter that changes the background color of the page to a gradient when the count is a prime number
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

function App() {
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    if (isPrime(counter)) {
      document.body.style.backgroundImage =
        "linear-gradient(to right, coral, teal)";
    } else {
      document.body.style.backgroundImage = "";
    }
  }, [counter]);

  return (
    <div>
      <h2>Count: {counter}</h2>
      <button onClick={() => setCounter(counter + 1)}>Click Me!</button>
    </div>
  );
}

export default App;

const isPrime = (num) => {
  const squareRoot = Math.sqrt(num);
  for (let i = 2; i <= squareRoot; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return num > 1;
};


//--------------------------------------------------------------------------------------
// ==============================
//*      REVIEWING THE RULES OF HOOKS
// ==============================

/*
These rules apply to React’s built-in hooks, like useState() and useEffect(), as well as any custom hooks that we create.

The rules:
Rule #1: Only call hooks from React function components. Hooks are not supported in class components or in regular JavaScript functions. 
This ensures that hook behavior is predictable and consistent. By following this rule, we can easily separate our hook-based logic from the rest of our application’s logic.

Rule #2: Only call hooks at the top level of your function components. 
- Do not call them within other functions, conditionals, or loop blocks. This one has to do with making sure that our hooks are called every time, and in the same order, each time a component re-renders.
- As users interact with the application, triggering re-renders, React runs its functions, including all hook calls. So, how can React keep track of the useState() or useEffect() calls that are made between renders?
- React tracks the hooks’ data and callbacks by their sequence in the component. If we run our hooks only during some re-renders and not others, this order will get jumbled, causing unexpected results.
*/

//! EXAMPLE 1
// For example, if we were to put a useEffect() call inside an if statement:
const [searchQuery, setSearchQuery] = useState('');

if (!searchQuery) {
  useEffect(() => {
    fetchData(`someapi.com/search?q=${searchQuery}`);
  }, [searchQuery]);
}
//* The component would call useState() every time but would only sometimes call useEffect(). If we were to use this hook in our application, we might run into the following error:

/*
Uncaught Error: Rendered fewer hooks than expected. This may be caused by an accidental early return statement.

*/

// Instead, we can accomplish the same goal while consistently calling our hook every time:

const [searchQuery, setSearchQuery] = useState('');
useEffect(() => {
  if (!searchQuery) {
    fetchData(`someapi.com/search?q=${searchQuery}`);
  }
}, [searchQuery]);

//? By following this rule, we can ensure that our hooks are called in the same order and on every render.
// NOTE: Be careful not to confuse executing a hook on every render with executing the callback passed to it on every render. useEffect() callbacks may not be called on every render depending on the dependency array values. However, the useEffect() hook itself must be called on every render.

// Task 1
// In App.js, fix the hook to make sure that we are not breaking any rules
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

function App() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (counter === 10) {
      document.body.style.backgroundImage =
        "linear-gradient(to right, coral, teal)";
    }
  }, [counter]);

  return (
    <div>
      <h2>Count: {counter}</h2>
      <button onClick={() => setCounter(counter + 1)}>Click Me!</button>
    </div>
  );
}

export default App;


//--------------------------------------------------------------------------------------
// ==============================
//*      CUSTOM HOOKS 
// ==============================

/*
Custom hooks are JavaScript functions that allow us to encapsulate stateful logic and reuse it. 
- For example, we may create custom hooks for commonly used effects such as form handling, animations, timers, etc.

There are two things to keep in mind:
- As a convention, custom hooks should have names that start with use.
- They should also follow the rules of hooks.
NOTE: Other than that, they don’t need to have a specific design — the developer gets to decide what arguments it takes and if it should return anything.

Custom hooks present several advantages when used properly in an application:
- They allow us to abstract our code, hide complex logic, as well as share stateful logic between multiple components
- When using a custom hook in multiple components, each instance operates in isolation, maintaining its own independent state and side effects. This means that any data from one component won’t “bleed over” into another
- By creating a separate file from which we export the custom hook, we can import it into any part of our application
NOTE: With proper implementation, custom hooks inherently make our code more reusable, readable, and faster to develop.
*/

//! EXAMPLE 1
// Consider this custom hook example, useToggle():
// useToggle.js
export const useToggle = (initialState = false) => {
  // Use the `initialState` argument to initialize the state
  const [state, setState] = useState(initialState);

  // Perform an animation each time the state changes
  useEffect(() => {
    performToggleAnimation(state);
  }, [state])

  // Create an easy-to-use toggle function
  const toggle = () => { setState(state => !state) }

  // Return the state value and the toggle function
  return [state, toggle]
}

/* 
In this example, we create a custom hook called useToggle() that:
- uses useState() to manage a toggle state value
- uses useEffect() to run a toggling animation each time the state changes 
- creates a toggle() function to interact with the setState() function 
*/

//! EXAMPLE 2
// We can imagine this toggling feature being used in many places in our application. Instead of copy-pasting all of this logic each time we want to use it, we can just import and use useToggle()!
import { useToggle } from './useToggle';
const DarkMode = () => {
  // Get the state and toggle function from useToggle()
  // We'll use an initial value of true
  const [state, toggle] = useToggle(true);
  return (
    <button onClick={toggle}> 
      {state ? 'On' : 'Off'}
    </button>
  )
}
/* 
In this example, we create a DarkMode component using the useToggle() custom hook. 
- useToggle() returns the toggle’s state value and a toggle() function for switching the toggle. 
- Now, DarkMode can use these values, and the underlying logic that supports them, without having to write out all of the code again!
*/

// Task 1
// For this exercise, we’ll take a look at another example of a custom hook. In the next exercise, we’ll practice implementing one of our own.

/* USECOUNTER.JS
- First, in useCounter.js, review how the custom hook is written, as well as exported. Putting our custom hooks in separate files under a hooks folder is the standard approach for consolidation and file structure organization.
*/
import { useState, useEffect } from "react";

export const useCounter = (start = 0) => {
  // set the state
  const [counter, setCounter] = useState(start);

  // use the effect whenever counter changes
  useEffect(() => {
    if (isPrime(counter)) {
      document.body.style.backgroundImage =
        "linear-gradient(to right, coral, teal)";
    } else {
      document.body.style.backgroundImage = "";
    }
  }, [counter]);

  // create an easy-to-use increment function
  const increment = () => {
    setCounter(counter + 1);
  };

  // return the counter value and the incrementer
  return [counter, increment];
};

// Helper function for the custom hook
const isPrime = (num) => {
  const squareRoot = Math.sqrt(num);
  for (let i = 2; i <= squareRoot; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return num > 1;
};


/* APP.JS 
- In App.js, look at how we are importing the hook into our application.
*/
import React from "react";
import ReactDOM from "react-dom/client";
import { useCounter } from "./hooks/useCounter.js";

function App() {
  const [currentCount, increment] = useCounter();

  return (
    <div>
      <h2>Count: {currentCount}</h2>
      <button onClick={increment}>Click Me!</button>
    </div>
  );
}

export default App;

/* OLDAPP.JS 
- Finally, in OldApp.js, look at how the component needed to be written with all of the hook logic embedded inside. 
- Not only does it unnecessarily complicate the Counter component, but it also means that we can’t use that counting logic anywhere else in our application.
*/
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

function App() {
  // set the state
  const [counter, setCounter] = useState(0);

  // use the effect whenever counter changes
  useEffect(() => {
    if (isPrime(counter)) {
      document.body.style.backgroundImage =
        "linear-gradient(to right, coral, teal)";
    } else {
      document.body.style.backgroundImage = "";
    }
  }, [counter]);

  // create an easy-to-use increment function
  const increment = () => {
    setCounter(counter + 1);
  };

  return (
    <div>
      <h2>Count: {counter}</h2>
      <button onClick={increment}>Click Me!</button>
    </div>
  );
}

export default App;


//--------------------------------------------------------------------------------------
// ==============================
//*      CREATE YOUR OWN CUSTOM HOOK 
// ==============================

/*
Now it’s time to create our own custom hook! We’ll do so by creating a hook that uses the web browser’s Geolocation API. 
The Geolocation API allows us to get a user’s coordinates, enabling us to provide a custom experience to users based on their location. 
Let’s see how this API works before we use it.

- The API is readily available by using the window.navigator.geolocation object (you can omit the window part). The API provides specific functions to either get the current position of a device (.getCurrentPosition()) or to continuously watch a device’s position (.watchPosition()).
- When using either of these functions, passing a success callback function is required. This callback will be executed on successful execution of the Geolocation API and will be passed a position object containing the .coords property — the coordinates of the user’s device.

*/

navigator.geolocation.getCurrentPosition((pos) => {
  console.log(‘Current Location’, pos.coords) // ← logs the current position of the device
})

//* Optionally, an error callback function can be passed as the second argument that will be executed if the API call fails.

function success() {
  console.log(‘Current Location’, pos.coords); // ← logs the current position of the device
};
function fail(error) {
  console.log('Uh oh something went wrong', error); // ← executes if the API failed
}
navigator.geolocation.watchPosition(success, fail);


// Task 1
/* 
In the /components folder there are two component files to look at: HemisphereDisplay.js and LongitudeLatitudeDisplay.js. 
In each, you will find there is a variable currentLocation that each component expects to be the current coordinate position of the user. Currently, the value is hard-coded to null 

To make our application work properly, we will create a custom hook that will:
- manage location state with useState()
- use an effect to fetch the current location of the device with useEffect()
- Return the location to the user of the hook 
NOTE: Ensure your browser has location permissions enabled to test your code.
*/

USEGEOLOCATION.JS 
// Create your custom hook here!
import { useState, useEffect } from "react";
export const useGeolocation = () => {
  const [currentLocation, setCurrentLocation] = useState({});

  useEffect(() => {
    const onSuccess = (e) => {
      setCurrentLocation({
        latitude: e.coords.latitude.toFixed(3),
        longitude: e.coords.longitude.toFixed(3),
      });
    };
    navigator.geolocation.getCurrentPosition(onSuccess);
  }, []);

  return currentLocation;
};

HEMISPHEREDISPLAY.JS
import { useGeolocation } from "../hooks/useGeolocation.js";
import React, { useState, useEffect } from "react";

export function HemisphereDisplay() {
  const currentLocation = useGeolocation(); // REPLACE ME!

  if (!currentLocation) {
    return <p>{"Sorry, location is currently unavailable"}</p>;
  }

  // currentLocation should have a .latitude property
  if (currentLocation.latitude === 0) {
    return <p>You are at the equator!</p>;
  }

  const hemisphere = currentLocation.latitude > 0 ? "northern" : "southern";
  return <p>You are in the {hemisphere} hemisphere.</p>;
}

LONGITUDELATITUDEDISPLAY.JS
import { useGeolocation } from "../hooks/useGeolocation";
import React, { useState, useEffect } from "react";

export function LongitudeLatitudeDisplay() {
  const currentLocation = useGeolocation(); // REPLACE ME!

  if (!currentLocation) {
    return <p>{"Sorry, location is currently unavailable"}</p>;
  }

  // currentLocation should have a .latitude and .longitude property
  const { latitude, longitude } = currentLocation;

  return (
    <section>
      <p>
        {latitude}° {latitude > 0 ? "N" : "S"}
      </p>
      <hr />
      <p>
        {longitude}° {longitude > 0 ? "E" : "W"}
      </p>
    </section>
  );
}


//--------------------------------------------------------------------------------------
// ==============================
//*      SECTION
// ==============================

/*

*/

//! EXAMPLE 1

//! EXAMPLE 2

//! EXAMPLE 3

//--------------------------------------------------------------------------------------
// ==============================
//*      SECTION
// ==============================

/*

*/

//! EXAMPLE 1

//! EXAMPLE 2

//! EXAMPLE 3

//--------------------------------------------------------------------------------------
// ==============================
//*      SECTION
// ==============================

/*

*/

//! EXAMPLE 1

//! EXAMPLE 2

//! EXAMPLE 3

//--------------------------------------------------------------------------------------
// ==============================
//*      SECTION
// ==============================

/*

*/

//! EXAMPLE 1

//! EXAMPLE 2

//! EXAMPLE 3

//--------------------------------------------------------------------------------------
// ==============================
//*      SECTION
// ==============================

/*

*/

//! EXAMPLE 1

//! EXAMPLE 2

//! EXAMPLE 3