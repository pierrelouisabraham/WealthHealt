import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { states } from '../model/state'

const EmployeeForm = () => {
    const [employeeData, setEmployeeData] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        startDate: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        department: 'Sales',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData({ ...employeeData, [name]: value });
    };

    const handleDateChange = (date, field) => {
        setEmployeeData({ ...employeeData, [field]: date });
    };

    const handleSave = () => {
        localStorage.setItem('employeeData', JSON.stringify(employeeData));
    };

    return (
        <div className='all-form'>
            <form id="create-employee">
                <label htmlFor="first-name">First Name</label>
                <input
                    type="text"
                    id="first-name"
                    name="firstName"
                    value={employeeData.firstName}
                    onChange={handleChange}
                />

                <label htmlFor="last-name">Last Name</label>
                <input
                    type="text"
                    id="last-name"
                    name="lastName"
                    value={employeeData.lastName}
                    onChange={handleChange}
                />

                <label htmlFor="date-of-birth">Date of Birth</label>
                <DatePicker
                    id="date-of-birth"
                    name="dateOfBirth"
                    selected={employeeData.dateOfBirth}
                    onChange={(date) => handleDateChange(date, 'dateOfBirth')}
                    dateFormat="MM/dd/yyyy"
                />

                <label htmlFor="start-date">Start Date</label>
                <DatePicker
                    id="start-date"
                    name="startDate"
                    selected={employeeData.startDate}
                    onChange={(date) => handleDateChange(date, 'startDate')}
                    dateFormat="MM/dd/yyyy"
                />

                <fieldset className="address">
                    <legend>Address</legend>

                    <label htmlFor="street">Street</label>
                    <input
                        id="street"
                        type="text"
                        name="street"
                        value={employeeData.street}
                        onChange={handleChange}
                    />

                    <label htmlFor="city">City</label>
                    <input
                        id="city"
                        type="text"
                        name="city"
                        value={employeeData.city}
                        onChange={handleChange}
                    />

                    <label htmlFor="state">State</label>
                    <select
                        name="state"
                        id="state"
                        value={employeeData.state}
                        onChange={handleChange}
                    >
                   <option value="">Select a state</option>
                    {states.map((state) => (
                        <option key={state.abbreviation} value={state.abbreviation}>
                            {state.name}
                        </option>
                    ))}
                        
                    </select>

                    <label htmlFor="zip-code">Zip Code</label>
                    <input
                        id="zip-code"
                        type="number"
                        name="zipCode"
                        value={employeeData.zipCode}
                        onChange={handleChange}
                    />
                </fieldset>

                <label htmlFor="department">Department</label>
                <select
                    name="department"
                    id="department"
                    value={employeeData.department}
                    onChange={handleChange}
                >
                    <option>Sales</option>
                    <option>Marketing</option>
                    <option>Engineering</option>
                    <option>Human Resources</option>
                    <option>Legal</option>
                </select>
            </form>

            <button onClick={handleSave} className='button-save'>Save</button>
        </div>
    );
};

export default EmployeeForm;
