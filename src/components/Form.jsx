import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { states } from '../model/state'
import SuccessModal from './SuccessModal';
import Modal from 'react-modal';

const EmployeeForm = () => {
    const appElement = document.getElementById('root'); // Assurez-vous que l'id correspond à votre élément de l'application

// Définissez l'élément de l'application pour react-modal
Modal.setAppElement(appElement);
    const [employeeData, setEmployeeData] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: null,
        startDate: null,
        street: '',
        city: '',
        state: '',
        zipCode: '',
        department: 'Sales',
      });
    
      const [employees, setEmployees] = useState([]);

      const [isModalOpen, setIsModalOpen] = useState(false);

      useEffect(() => {
        // Retrieve employee data from local storage on component mount
        const storedData = localStorage.getItem('employees');
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setEmployees(parsedData);
        }
      }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData({ ...employeeData, [name]: value });
    };

    const handleDateChange = (date, field) => {
        setEmployeeData({ ...employeeData, [field]: date });
    };

    const handleSave = () => {
        // Create a new employee object with the current employee data
        const newEmployee = { ...employeeData };
    
        // Add the new employee to the list of employees
        const updatedEmployees = [...employees, newEmployee];
        setEmployees(updatedEmployees);
    
        // Save the updated list of employees to local storage
        localStorage.setItem('employees', JSON.stringify(updatedEmployees));

        // OpenModal
        setIsModalOpen(true);
    
        // Optionally, clear the form fields
        setEmployeeData({
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
            <SuccessModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} />
        </div>
        
    );
};

export default EmployeeForm;
