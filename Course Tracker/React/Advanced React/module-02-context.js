//! Advanced React Module: Context

//--------------------------------------------------------------------------------------
// ==============================
//*      INTRODUCTION TO CONTEXT
// ==============================

/*
Suppose you’re tasked with sending a message from the 15th floor of a building to the 1st floor. Instead of sending it directly, you have to pass it through a person on every single floor. Seems inefficient, right? This is similar to what happens in some React applications.
- You might be building a React application where data is stored in a high-level GrandParent component. Then, you need to pass that data through a Parent component and eventually to a Child component to display it.

This is a common and quite powerful pattern in React applications called “prop drilling”. 
- In prop drilling, a piece of data is cascaded through multiple components in the hierarchy, just like our building analogy. 
- The prop is “drilled” from a high-level component down through middle-level components down to a low-level component.
- When pros only have to be drilled through 1-2 components, prop drilling can be manageable and preferable for small applications.

. However, with more layers, it introduces challenges such as:
- It bloats your code and makes it harder to understand or reuse the middle components.
- It causes middle components to re-render for changes to drilled props even if they don’t use those props themselves.

In this module, we’ll take a look at React’s Context API, a common approach to get around unnecessary prop drilling.
- Context is a feature of React that allows us to create a piece of centralized state that any component within an area of your application can subscribe to.

By the end of the module, you’ll learn:

- How a React context provides shared state to React components
- Creating a context to provide a value to descendant React components
- Consuming that value in descendant React components
- Updating the context value in descendant React components
- Structuring nested providers for the same type of context
*/

//--------------------------------------------------------------------------------------
// ==============================
//*      CREATING AND CONSUMING CONTEXT
// ==============================

/*
It’s time to explore how we can efficiently share data across our application and eliminate prop drilling using the context API
Through a Provider and Consumer pattern, the Context API provides a mechanism to share data across components without complications.
The provider is a React component that makes data available to its descendant components. When one of those descendants accesses the shared data, it becomes a consumer.

*/

//! EXAMPLE 1
/*
To use the React Context API, we start by creating a React context object, a named object created by the React.createContext() function.
*/
const MyContext = React.createContext();

/*
Context objects include a .Provider property that is a React component. It takes in a value prop to be stored in the context.
*/
<MyContext.Provider value="Hello world!">
  <ChildComponent />
</MyContext.Provider>;

/*
That value — in this case, the string "Hello world!" — is available to all its descendent components. 
- Descendent components — in this case, ChildComponent — can then retrieve the context’s value with React’s useContext() hook.

The useContext() hook accepts the context object as an argument and returns the current value of the context. Rejoice — prop drilling that value is no longer needed!
Note: If a component attempts to use a context that isn’t provided by one of its ancestors, useContext() will return null. 
Note: In some older React applications, you might instead see SomeContext.Consumer used to subscribe to a Context. That alternative is generally considered bad practice and avoided for being overly verbose and difficult to work with.

*/
import { useContext } from "react";
import { MyContext } from "./MyContext.js";

const ChildComponent = () => {
  const value = useContext(MyContext);
  return <p>{value}</p>;
};
// Renders <p>Hello, world!</p>

/*

*/

// Task
// This task is to create a simple React application that demonstrates the use of the Context API. The application will consist of a parent component that provides a theme context (light or dark) and a child component that consumes this context to display the current theme.

// 1. Create a ThemeContext using React.createContext().
// 2. Create a ThemeProvider component that uses the ThemeContext.Provider to provide a theme value (either "light" or "dark") to its children.
// 3. Create a ThemeConsumer component that uses the useContext() hook to consume the theme value from the ThemeContext and displays it in a paragraph element.
// 4. In the App component, wrap the ThemeConsumer component with the ThemeProvider component to ensure that it has access to the theme context.
APP.JS;
// This is the main entry point of your React application. It sets up the ThemeContext provider and renders the ContactsSection component, which will consume the context value to display the theme.
import React from "react";
import ReactDOM from "react-dom/client";
import { ContactsSection } from "./ContactsSection";
import { ThemeContext } from "./ThemeContext";

const family = [
  {
    name: "Finn the Human",
  },
  {
    name: "Jake the Dog",
  },
];

const friends = [
  {
    name: "Marceline",
  },
  {
    name: "Princess Bubblegum",
  },
];

function App() {
  return (
    <ThemeContext.Provider value="light">
      <div>
        <h1>Contacts</h1>
        <ContactsSection contacts={family} name="Family" />
        <ContactsSection contacts={friends} name="Friends" />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;

CONTACTITEMS.JS;
// This component consumes the theme context to display the current theme for each contact. It uses the useContext() hook to access the theme value provided by the ThemeContext.Provider in the App component.
import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export const ContactItem = ({ name }) => {
  const theme = useContext(ThemeContext);
  return (
    <div className={`theme-${theme}`}>
      {name} {theme === "dark" ? "🌑" : "☀"}
    </div>
  );
};

CONTACTLIST.JS;
// This component receives a list of contacts as props and renders a list of ContactItem components. Each ContactItem will consume the theme context to display the current theme for each contact.
import React from "react";
import { ContactItem } from "./ContactItem";

export const ContactsList = ({ contacts }) => {
  return contacts.map((contact) => (
    <ContactItem {...contact} key={contact.name} />
  ));
};

CONTACTSECTIONS.JS;
// This component receives a list of contacts and a name as props and renders a section for each group of contacts. It uses the ContactsList component to render the list of contacts, which will consume the theme context to display the current theme for each contact.
import React from "react";
import { ContactsList } from "./ContactsList";

export const ContactsSection = ({ contacts, name }) => {
  return (
    <div>
      <h2>{name}</h2>
      <ContactsList contacts={contacts} />
    </div>
  );
};

THEMECONTEXT.JS;
// This file creates and exports the ThemeContext using React.createContext(). This context will be used to provide the theme value to the components that need it.
// Put your code here!
import React from "react";
export const ThemeContext = React.createContext();

//--------------------------------------------------------------------------------------
// ==============================
//*      MULTIPLE PROVIDER
// ==============================

/*
What if our application requires the same context in multiple areas, each with a distinct value? Think of varying themes across different application sections.
- A .Provider component may be reused with the same context multiple times in an application with different values.
- This is useful if the context is rendered by a component that is used multiple times throughout the application. 
- Each instance of the component might want to give a different value to the context.
*/

//! EXAMPLE 1
// For example, a component might render two .Provider components that each receive a different value:
const GreetingContext = React.createContext();

const ChildComponent = () => {
  const greeting = useContext(GreetingContext);
  return <h2>{greeting}</h2>;
};

const MyComponent = () => {
  return (
    <>
      <GreetingContext.Provider value="bonjour le monde!">
        <ChildComponent />
      </GreetingContext.Provider>
      <GreetingContext.Provider value="hallo welt!">
        <ChildComponent />
      </GreetingContext.Provider>
    </>
  );
};

// Task 1
// To practice this concept, let’s refactor our application. We’ll configure the ThemeContext so that each time its .Provider component is used for different contact sections, it’s given a distinct value prop.
import React from "react";
import ReactDOM from "react-dom/client";
import { ContactsSection } from "./ContactsSection";
import { ThemeContext } from "./ThemeContext";

const family = [
  {
    name: "Finn the Human",
  },
  {
    name: "Jake the Dog",
  },
];

const friends = [
  {
    name: "Marceline",
  },
  {
    name: "Princess Bubblegum",
  },
];

function App() {
  return (
      <div>
        <h1>Contacts</h1>

        <ThemeContext.Provider value="dark">
          <ContactsSection contacts={family} name="Family" />
        </ThemeContext.Provider>
        <ThemeContext.Provider value="light">
          <ContactsSection contacts={friends} name="Friends" />
        </ThemeContext.Provider>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;



//--------------------------------------------------------------------------------------
// ==============================
//*      PROVIDER WRAPPERS
// ==============================

/*
Now we’re going to show the common coding patterns many React developers use with Contexts and their .Provider components.
- To start, it’s common for React applications to create a “wrapper” component around a .Provider component.
- The wrapper component can provide a value of its choosing, often one of its propsor a string literal, to the .Provider component.
*/

//! EXAMPLE 1
/* 
For example, here’s a ThemedMessage component that returns the ThemeContext.Provider component wrapped around any children components it receives. 
ThemedMessage also assigns a value using a theme prop:
*/
const ThemeContext = React.createContext();

const ThemedMessage = ({ children, theme }) => {
  return (
    <ThemeContext.Provider value={theme}>
      This content is in {theme} mode!
      {children}
    </ThemeContext.Provider>
  );
};

// Wrapper components like ThemedMessage can then be used in place of a .Provider component to wrap children:
// Renders:
// This content is in dark mode! Hooray!
const MyComponent = () => {
  return (
    <ThemedMessage theme="dark">
      Hooray!
    </ThemedMessage>
  )
};

// Task 
/*
In this exercise, you’ll prepare the application for more changes later on by setting up a dedicated wrapper component for the ThemeContext context
- We’ll refactor ThemeContext so that later it can provide more than just the theme string to its consumers.

*/

THEMECONTEXT.JS
import React from "react";

export const ThemeContext = React.createContext();

// Put your code here! ✨
export const ThemeArea = ({children, initialTheme}) = {
  return(
    <ThemeContext.Provider
    value={initialTheme}>
        {children}
  </ThemeContext.Provider>
  );


}

APP.JS
import React from "react";
import ReactDOM from "react-dom/client";
import { ContactsSection } from "./ContactsSection";
import { ThemeContext, ThemeArea } from "./ThemeContext";

const family = [
  {
    name: "Finn the Human",
  },
  {
    name: "Jake the Dog",
  },
];

const friends = [
  {
    name: "Marceline",
  },
  {
    name: "Princess Bubblegum",
  },
];

function App() {
  return (
    <div>
      <h1>Contacts</h1>
      <ThemeArea initialTheme="light">
        <ContactsSection contacts={family} name="Family" />
      </ThemeArea>
      <ThemeArea initialTheme="dark">
        <ContactsSection contacts={friends} name="Friends" />
      </ThemeArea>
    </div>
  );
}

export default App;


//--------------------------------------------------------------------------------------
// ==============================
//*      UPDATING CONTEXT
// ==============================

/*
Many React applications use prop drilling to pass down two values: a piece of state and the state updater function to update that state. Child components may then use the state updater function to change the state of their ancestors. 
*/

//! EXAMPLE 1
/*
In this example, Counter can use the setCount() function to update the count value of CounterApp.

React Contexts can also be used to provide state and state updater functions. 
- One common pattern is to have the context provide an object containing both of those values. 
- Child components that consume the context can then use both (or either of) the state and the state updater function.

*/
const CounterApp = () => {
  const [count, setCount] = useState(0);

  return (
    <Counter count={count} setCount={setCount} />
  );
};



//! EXAMPLE 2
/* 
In this example, CounterArea provides the count value and the setCount() function to its descendants using context.
 The Counter component extracts both values from the provided context.

*/
const CounterContext = React.createContext();

const CounterArea = ({ children }) => {
  const [count, setCount] = useState(0);

  return (
    <CounterContext.Provider value={{ count, setCount }}>
      {children}
    </CounterContext.Provider>
  );
};

const Counter = () => {
  const { count, setCount } = useContext(CounterContext);

  return (
    <button onClick={() => setCount(count => count+1)}>
      {count}
    </button>
  );
};

const CounterApp = () => {
  return (
    <CounterArea>
      <Counter />
    </CounterArea>
  )
} 


// Task 

APP.JS 
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ContactsSection } from "./ContactsSection";
import { ThemeArea } from "./ThemeContext";

const family = [
  {
    name: "Finn the Human"
  },
  {
    name: "Jake the Dog"
  }
];

const friends = [
  {
    name: "Marceline"
  },
  {
    name: "Princess Bubblegum"
  }
];

function App() {
  return (
    <div>
      <h1>Contacts</h1>
      <ThemeArea initialTheme="light">
        <ContactsSection contacts={family} name="Family" />
      </ThemeArea>
      <ThemeArea initialTheme="dark">
        <ContactsSection contacts={friends} name="Friends" />
      </ThemeArea>
    </div>
  );
}

export default App

CONTACTITEMS.JS
import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export const ContactItem = ({ name }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`theme-${theme}`}>
      {name} {theme === "dark" ? "🌑" : "☀"}
    </div>
  );
};


CONTACTS.JS
import React from "react";
import { ContactItem } from "./ContactItem";

export const ContactsList = ({ contacts }) => {
  return contacts.map((contact) => (
    <ContactItem {...contact} key={contact.name} />
  ));
};


CONTACTSECTIONS.JS
import React from "react";
import { ContactsList } from "./ContactsList";
import { ThemeSwitcher } from './ThemeSwitcher.js';


export const ContactsSection = ({ contacts, name }) => {
  return (
    <div>
      <h2>{name}</h2>
      <ThemeSwitcher />
      <ContactsList contacts={contacts} />
    </div>
  );
};


THEMECONTEXT.JS
import React, { useState } from "react";

export const ThemeContext = React.createContext();

export const ThemeArea = ({ children, initialTheme }) => {
  // Put your code here! ✨
  const [theme, setTheme] = useState(initialTheme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

THEMESWITCHER.JS
import { ThemeContext }  from './ThemeContext';
import React, { useContext } from 'react'

export const ThemeSwitcher = () => {
  const {setTheme, theme } = useContext(ThemeContext)
  return (
    <button onClick={() => setTheme(theme==='dark'?'light':'dark')}>
    Theme is currently: {theme}
    </button>
  )
}


//--------------------------------------------------------------------------------------
// ==============================
//*      NESTED PROVIDERS 
// ==============================

/*
A Context Provider may be a child in the application tree underneath an earlier Context Provider. Components subscribing to a Context’s Provider will receive the value for the .Provider component closest to them in the application tree. This pattern is sometimes referred to as nesting.
*/

//! EXAMPLE 1
// Here’s an brief example of a GreeterContext used to set up different greetings for child components:
/*
<GreeterContext.Provider value="Salut!">
  <ChildComponent />
</GreeterContext.Provider>
<GreeterContext.Provider value="Hallo!">
  <ChildComponent />
</GreeterContext.Provider>

*/


//! EXAMPLE 2
/* 


In this example, we have two components that are used within the GreeterContext.Provider: HighLevelComponent and LowLevelComponent. 
- Each component will use the value of the nearest GreeterContext.Provider. 
- In this case, HighLevelComponent will have the value "Salut!" when using GreeterContext while the LowLevelComponent will have the value "Hallo!".
*/

/*
<GreeterContext.Provider value="Salut!">
  <HighLevelComponent> {// GreeterContext's value is "Salut!" here}

    <GreeterContext.Provider value="Hallo!">  
      <LowLevelComponent /> {// GreeterContext's value is "Hallo!" here}
    </GreeterContext.Provider>

  </RootComponent>
</GreeterContext.Provider>

*/


// Task 
/*
We’re going to use Context nesting to set up nested theming in our contacts management app:

- One root context around the entire application will set up a root theme for the entire application.
- A nested context in each section of contacts will override the root theme for their section’s contact items.
*/

INDEX.JS 
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {ThemeArea} from './ThemeContext';

ReactDOM.createRoot(
  document.getElementById('app')
).render( 
  
<ThemeArea initialTheme='light'>
 <App /> 
 </ThemeArea>);


APP.JS
import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import { ContactsSection } from "./ContactsSection";
import { ThemeArea, ThemeContext } from "./ThemeContext";
import { ThemeSwitcher } from "./ThemeSwitcher"

const { theme } = useContext(ThemeContext);
const family = [
  {
    name: "Finn the Human",
  },
  {
    name: "Jake the Dog",
  },
];

const friends = [
  {
    name: "Marceline",
  },
  {
    name: "Princess Bubblegum",
  },
];

function App() {
  return (
    <div className={`theme-${theme}`}>
      <h1>Contacts</h1>
      <ThemeSwitcher /> 
      <ThemeArea initialTheme="light">
        <ContactsSection contacts={family} name="Family" />
      </ThemeArea>
      <ThemeArea initialTheme="dark">
        <ContactsSection contacts={friends} name="Friends" />
      </ThemeArea>
    </div>
  );
}

export default App;



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
