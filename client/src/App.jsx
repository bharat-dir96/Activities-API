import { useState } from 'react';
import './App.css'
import Navbar from './Navbar.jsx'
import Card from './Card.jsx'
import Sidebar from './Sidebar.jsx'

function App() {

    const [checkedValue, setCheckedValue] = useState("");

    return (
        <>
        <Navbar />
        <div className="main-container">
            <Sidebar oncheckboxchange={setCheckedValue}/>
            <Card checkedValue={checkedValue}/>
        </div>
        </>
    )
}

export default App
