import React from 'react';
import './App.css';
import {Routes, Route} from "react-router-dom"
import HomeTable from "./components/HomeTable";
import Login from "./components/Login";
import Register from "./components/Register";
import AddFlat from "./components/AddFlat";
import SingleFlat from "./components/SingleFlat";
import AddUser from "./components/AddUser";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<HomeTable/>}/>
                <Route path="/:id" element={<SingleFlat/>}/>
                <Route path="/log-in" element={<Login/>}/>
                <Route path="/create-account" element={<Register/>}/>
                <Route path="/add-new-flat" element={<AddFlat/>}/>
                <Route path="/add-user/:flatId" element={<AddUser/>}/>
            </Routes>
        </div>
    );
}

export default App;
