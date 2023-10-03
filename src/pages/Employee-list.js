import React from 'react';
import { useTable, useSortBy } from 'react-table';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import '../styles/employeeSlice.scss';

function EmployeeDataTable() {
  // Retrieve the employees data from Redux store
  const employees = useSelector((state) => state.employees);

  // Define columns for the data table
  const columns = [
    {
      Header: 'First Name',
      accessor: 'firstName',
    },
    {
      Header: 'Last Name',
      accessor: 'lastName',
    },
    {
      Header: 'Date of Birth',
      accessor: 'dateOfBirth',
    },
    {
      Header: 'Start Date',
      accessor: 'startDate',
    },
    {
      Header: 'Street',
      accessor: 'street',
    },
    {
      Header: 'City',
      accessor: 'city',
    },
    {
      Header: 'State',
      accessor: 'state',
    },
    {
      Header: 'Zip Code',
      accessor: 'zipCode',
    },
    {
      Header: 'Department',
      accessor: 'department',
    },
  ];

  // Create a data table instance
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data: employees,
    },
    useSortBy // Use the useSortBy hook
  );

  return (
    <>
      <Header />
      <div className="data-table">
        <table {...getTableProps()} className="table">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className={
                      column.isSorted ? (column.isSortedDesc ? 'sorted-desc' : 'sorted-asc') : ''
                    }
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default EmployeeDataTable;