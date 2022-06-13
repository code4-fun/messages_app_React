import React from 'react'
import {BrowserRouter} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import AppRouter from "./components/AppRouter";

function App() {
  return (
      <BrowserRouter>
        <Navbar />
        <div className='app'>
          <AppRouter />
        </div>
      </BrowserRouter>
  )
}

export default App
