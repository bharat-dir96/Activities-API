import { useState } from 'react';
import './css/Sidebar.css'
import Card from './Card'

function Sidebar({oncheckboxchange}){

    function handleCheckbox(value, isChecked) {
        if(isChecked){
            console.log(value);
            oncheckboxchange(value);
        }
        else
        {
            oncheckboxchange("");
        }
    }

    return(
        <div>
            <div class="sidebar">
                <div class="filter-section">
                    <h4>Filters By Package Type</h4>
                    <label><input type="checkbox" /> Air Package</label>
                    <label><input type="checkbox" /> Land Package</label>
                    <label><input type="checkbox" /> River Cruise Package</label>
                    <label><input type="checkbox" /> Rail Tour Package</label>
                </div>

                <div class="filter-section">
                    <h4>Category</h4>
                    <label><input type="checkbox" /> Rail Tour Package</label>
                    <label><input type="checkbox" /> Holiday Package</label>
                    <label><input type="checkbox" /> International Package</label>
                    <label><input type="checkbox" /> Domestic Air Package</label>
                    <label><input type="checkbox" /> Bharat Gaurav Ka</label>
                    <label><input type="checkbox" /> Bharat Gaurav</label>
                    <label><input type="checkbox" /> Deluxe Train</label>
                    <label><input type="checkbox" /> Wellness</label>
                    <label><input type="checkbox" /> Coach Tour</label>
                    <label><input type="checkbox" /> River Cruise</label>
                </div>

                <div class="filter-section">
                    <h4>Origin</h4>
                    <label><input type="checkbox" value="Amritsar" onChange={(e) => handleCheckbox(e.target.value, e.target.checked)}/> Amritsar</label>
                    <label><input type="checkbox" value="Agartala" onChange={(e) => handleCheckbox(e.target.value, e.target.checked)}/> Agartala</label>
                    <label><input type="checkbox" value="Ahmedabad" onChange={(e) => handleCheckbox(e.target.value, e.target.checked)}/> Ahmedabad</label>
                    <label><input type="checkbox" value="Ajmer" onChange={(e) => handleCheckbox(e.target.value, e.target.checked)}/> Ajmer</label>
                    <label><input type="checkbox" value="Bangalore" onChange={(e) => handleCheckbox(e.target.value, e.target.checked)}/> Bangalore</label>
                    <label><input type="checkbox" value="Bhopal" onChange={(e) => handleCheckbox(e.target.value, e.target.checked)}/> Bhopal</label>
                    <label><input type="checkbox" value="Bhubaneshwar" onChange={(e) => handleCheckbox(e.target.value, e.target.checked)}/> Bhubaneshwar</label>
                    <label><input type="checkbox" value="Chandigrah" onChange={(e) => handleCheckbox(e.target.value, e.target.checked)}/> Chandigrah</label>
                    <label><input type="checkbox" value="Chennai" onChange={(e) => handleCheckbox(e.target.value, e.target.checked)}/> Chennai</label>
                    <label><input type="checkbox" value="Dadar" onChange={(e) => handleCheckbox(e.target.value, e.target.checked)}/> Dadar</label>
                    <label><input type="checkbox" value="Delhi" onChange={(e) => handleCheckbox(e.target.value, e.target.checked)}/> Delhi</label>
                    <label><input type="checkbox" value="Dehradun" onChange={(e) => handleCheckbox(e.target.value, e.target.checked)}/> Dehradun</label>
                    <label><input type="checkbox" value="Dhanbad" onChange={(e) => handleCheckbox(e.target.value, e.target.checked)}/> Dhanbad</label>
                    <label><input type="checkbox" value="Ghaziabad" onChange={(e) => handleCheckbox(e.target.value, e.target.checked)}/> Ghaziabad</label>
                    <label><input type="checkbox" value="Gurgaon" onChange={(e) => handleCheckbox(e.target.value, e.target.checked)}/> Gurgaon</label>
                    <label><input type="checkbox" value="Hyderabad" onChange={(e) => handleCheckbox(e.target.value, e.target.checked)}/> Hyderabad</label>
                    <label><input type="checkbox" value="Jaipur" onChange={(e) => handleCheckbox(e.target.value, e.target.checked)}/> Jaipur</label>
                    <label><input type="checkbox" value="Karnataka" onChange={(e) => handleCheckbox(e.target.value, e.target.checked)}/> Karnataka</label>
                </div>
            </div>

        </div>
    )
}

export default Sidebar