import React, { useState, useEffect } from 'react';
import Header from '../components/Header';

const EmployeeList = () => {

  const [employees, setEmployees] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedData = localStorage.getItem('employees');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        console.log(parsedData)
     
          
          setEmployees(parsedData);
        
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Error parsing employee data:', error);
    }
  }, []);

  return (
    <div>
        <Header/>
      <h2>Employee List</h2> 
        {isLoading ? (
        <p>Loading employee data...</p>
      ) : employees.length === 0 ? (
        <p>No employee data available.</p>
      ) : (
        <table>
          <thead>
            <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Start Date</th>
            <th>Department</th>
            <th>Date of Birth</th>
            <th>Street</th>
            <th>City</th>
            <th>State</th>
            <th>Zip Code</th>
            </tr>
          </thead>
          <tbody>
          {employees.map((employee, index) => (
            <tr key={index}>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.startDate}</td>
              <td>{employee.department}</td>
              <td>{employee.dateOfBirth}</td>
              <td>{employee.street}</td>
              <td>{employee.city}</td>
              <td>{employee.state}</td>
              <td>{employee.zipCode}</td>
            </tr>
          ))}
        </tbody>
      </table>
       )}
    </div>
  );
};

export default EmployeeList;