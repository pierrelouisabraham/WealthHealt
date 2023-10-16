import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { states } from '../model/state'
import SuccessModal from './SuccessModal';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { addEmployee }   from '../model/employeeSlice';
import { testData } from '../model/fillEmployee';

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
  
      useDispatch()
      var [employees, setEmployees] = useState([]);

      const [isModalOpen, setIsModalOpen] = useState(false);
      employees = useSelector((state) => state.employees);

    const dispatch = useDispatch();


    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData({ ...employeeData, [name]: value });
    };

    const handleDateChange = (date, field) => {
        
        
        setEmployeeData({ ...employeeData, [field]: date   });
    };

    const handleSave = () => {
// Create a new employee object with the current employee data
const newEmployee = { ...employeeData };

// Convert date fields to strings
if(!newEmployee.dateOfBirth || !newEmployee.startDate){
    newEmployee.dateOfBirth = '';
    newEmployee.startDate = '';
} else {
    newEmployee.dateOfBirth = newEmployee.dateOfBirth.toLocaleDateString();
    newEmployee.startDate = newEmployee.startDate.toLocaleDateString();
    
}

// Add the new employee to the list of employees
const updatedEmployees = [...employees, newEmployee];

for(let i= 0; i < testData.length; i++) {
    console.log(testData[i])
    dispatch(addEmployee(testData[i]))
  }
// Save the updated list of employees to local storage
dispatch(addEmployee(newEmployee));

// Open the modal
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
                    required
                />

                <label htmlFor="last-name">Last Name</label>
                <input
                    type="text"
                    id="last-name"
                    name="lastName"
                    value={employeeData.lastName}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="date-of-birth">Date of Birth</label>
                <DatePicker
                    id="date-of-birth"
                    name="dateOfBirth"
                    selected={employeeData.dateOfBirth}
                    onChange={(date) => handleDateChange(date, 'dateOfBirth')}
                    dateFormat="MM/dd/yyyy"
                    required
                />

                <label htmlFor="start-date">Start Date</label>
                <DatePicker
                    id="start-date"
                    name="startDate"
                    selected={employeeData.startDate}
                    onChange={(date) => handleDateChange(date, 'startDate')}
                    dateFormat="MM/dd/yyyy"
                    required
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
                        required
                    />

                    <label htmlFor="city">City</label>
                    <input
                        id="city"
                        type="text"
                        name="city"
                        value={employeeData.city}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="state">State</label>
                    <select
                        name="state"
                        id="state"
                        value={employeeData.state}
                        onChange={handleChange}
                        required
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
                required>
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
