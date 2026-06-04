// ==============================
//*  Custom Hook Project: Theme Toggle
// ==============================
/*
In this project, you will be implementing a light/dark theme feature in a Todo list React application. Offering both dark and light modes in your application can improve user experience and accessibility, particularly in low-light conditions, or reduce eye strain. 
This is most often implemented with a toggle button on the application, allowing users to manually toggle between their preferred modes.
// ==============================   
*/

import React from "react";
import Header from "./Header/Header.js(Default)";
import Todos from "./Todos/Todos";

function App() {
  return (
    <main>
      <Header />
      <Todos />
    </main>
  );
}

export default App;
