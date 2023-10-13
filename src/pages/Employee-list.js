import { useSelector } from 'react-redux';
import Header from '../components/Header';
import '../styles/employeeSlice.scss';
import { SearchOutlined } from '@ant-design/icons';
import React, { useRef, useState,useEffect } from 'react';
import { Button, Input, Space, Table } from 'antd';
import qs from 'qs';

function EmployeeDataTable() {
  // Retrieve the employees data from Redux store
  const employees = useSelector((state) => state.employees);

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    
  });

  // Define columns for the data table
  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
      ...getColumnSearchProps('firstName'),
      sorter: (a, b) => a.firstName > b.firstName, 
      
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
      sorter: (a, b) => a.lastName.localeCompare(b.lastName),
      ...getColumnSearchProps('lastName'),
    },
    {
      title: 'Date of Birth',
      dataIndex: 'dateOfBirth',
      key: 'dateOfBirth',
      sorter: (a, b) => new Date(a.dateOfBirth) - new Date(b.dateOfBirth),
      ...getColumnSearchProps('dateOfBirth'),
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      sorter: (a, b) => new Date(a.startDate) - new Date(b.startDate),
      ...getColumnSearchProps('startDate'),

    },
    {
      title: 'Street',
      dataIndex: 'street',
      key: 'street',
      sorter: (a, b) => a.street.localeCompare(b.street),
      ...getColumnSearchProps('street'),

    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
      sorter: (a, b) => a.city.localeCompare(b.city),
      ...getColumnSearchProps('city'),

    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
      sorter: (a, b) => a.state.localeCompare(b.state),
      ...getColumnSearchProps('state'),

    },
    {
      title: 'Zip Code',
      dataIndex: 'zipCode',
      key: 'zipCode',
      sorter: (a, b) => a.zipCode.localeCompare(b.zipCode),
      ...getColumnSearchProps('zipCode'),

    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
      sorter: (a, b) => a.department.localeCompare(b.department),
      ...getColumnSearchProps('department'),

    },
  ];

  const testData = [
    {
      key: '1',
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '1985-05-10',
      startDate: '2010-03-15',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      department: 'human ressources',
    },
    {
      key: '2',
      firstName: 'Jane',
      lastName: 'Smith',
      dateOfBirth: '1990-12-20',
      startDate: '2012-08-05',
      street: '456 Elm St',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90001',
      department: 'Marketing',
    },
    {
      key: '3',
      firstName: 'Robert',
      lastName: 'Johnson',
      dateOfBirth: '1978-08-03',
      startDate: '2005-11-30',
      street: '789 Oak St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      department: 'sales',
    },
    {
      key: '3',
      firstName: 'Robert',
      lastName: 'Johnson',
      dateOfBirth: '1978-08-03',
      startDate: '2005-11-30',
      street: '789 Oak St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      department: 'sales',
    },
    {
      key: '3',
      firstName: 'Robert',
      lastName: 'Johnson',
      dateOfBirth: '1978-08-03',
      startDate: '2005-11-30',
      street: '789 Oak St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      department: 'sales',
    },
    {
      key: '3',
      firstName: 'Robert',
      lastName: 'Johnson',
      dateOfBirth: '1978-08-03',
      startDate: '2005-11-30',
      street: '789 Oak St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      department: 'sales',
    },
    {
      key: '3',
      firstName: 'Robert',
      lastName: 'teo',
      dateOfBirth: '1978-08-03',
      startDate: '2005-11-30',
      street: '789 Oak St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      department: 'sales',
    },
    {
      key: '3',
      firstName: 'Robert',
      lastName: 'felip',
      dateOfBirth: '1978-08-03',
      startDate: '2005-11-30',
      street: '789 Oak St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      department: 'sales',
    },
    {
      key: '3',
      firstName: 'Robert',
      lastName: 'adrian',
      dateOfBirth: '1978-08-03',
      startDate: '2005-11-30',
      street: '789 Oak St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      department: 'sales',
    },
    {
      key: '3',
      firstName: 'Robert',
      lastName: 'c arl',
      dateOfBirth: '1978-08-03',
      startDate: '2005-11-30',
      street: '789 Oak St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      department: 'sales',
    },
    {
      key: '3',
      firstName: 'Robert',
      lastName: 'Johnson',
      dateOfBirth: '1978-08-03',
      startDate: '2005-11-30',
      street: '789 Oak St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      department: 'sales',
    },
    {
      key: '3',
      firstName: 'Robert',
      lastName: 'Johnson',
      dateOfBirth: '1978-08-03',
      startDate: '2005-11-30',
      street: '789 Oak St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      department: 'sales',
    },
    {
      key: '3',
      firstName: 'Robert',
      lastName: 'Johnson',
      dateOfBirth: '1978-08-03',
      startDate: '2005-11-30',
      street: '789 Oak St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      department: 'sales',
    },
    {
      key: '3',
      firstName: 'Robert',
      lastName: 'Johnson',
      dateOfBirth: '1978-08-03',
      startDate: '2005-11-30',
      street: '789 Oak St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      department: 'sales',
    },
    {
      key: '3',
      firstName: 'Robert',
      lastName: 'Johnson',
      dateOfBirth: '1978-08-03',
      startDate: '2005-11-30',
      street: '789 Oak St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      department: 'sales',
    },
    {
      key: '3',
      firstName: 'Robert',
      lastName: 'Johnson',
      dateOfBirth: '1978-08-03',
      startDate: '2005-11-30',
      street: '789 Oak St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      department: 'sales',
    },
    {
      key: '3',
      firstName: 'Robert',
      lastName: 'Johnson',
      dateOfBirth: '1978-08-03',
      startDate: '2005-11-30',
      street: '789 Oak St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      department: 'sales',
    },
    {
      key: '3',
      firstName: 'Robert',
      lastName: 'Johnson',
      dateOfBirth: '1978-08-03',
      startDate: '2005-11-30',
      street: '789 Oak St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      department: 'sales',
    },
    {
      key: '3',
      firstName: 'Robert',
      lastName: 'sly',
      dateOfBirth: '1978-08-03',
      startDate: '2005-11-30',
      street: '789 Oak St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      department: 'sales',
    },
    {
      key: '3',
      firstName: 'Robert',
      lastName: 'Johnson',
      dateOfBirth: '1978-08-03',
      startDate: '2005-11-30',
      street: '789 Oak St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      department: 'sales',
    },
    {
      key: '3',
      firstName: 'Robert',
      lastName: 'Johnson',
      dateOfBirth: '1978-08-03',
      startDate: '2005-11-30',
      street: '789 Oak St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      department: 'sales',
    },
    {
      key: '3',
      firstName: 'Robert',
      lastName: 'Johnson',
      dateOfBirth: '1978-08-03',
      startDate: '2005-11-30',
      street: '789 Oak St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      department: 'sales',
    },
    {
      key: '3',
      firstName: 'Robert',
      lastName: 'Johnson',
      dateOfBirth: '1978-08-03',
      startDate: '2005-11-30',
      street: '789 Oak St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      department: 'sales',
    },
    {
      key: '3',
      firstName: 'Robert',
      lastName: 'Johnson',
      dateOfBirth: '1978-08-03',
      startDate: '2005-11-30',
      street: '789 Oak St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      department: 'sales',
    },
    {
      key: '3',
      firstName: 'Robert',
      lastName: 'Johnson',
      dateOfBirth: '1978-08-03',
      startDate: '2005-11-30',
      street: '789 Oak St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      department: 'sales',
    },
    {
      key: '3',
      firstName: 'Robert',
      lastName: 'Johnson',
      dateOfBirth: '1978-08-03',
      startDate: '2005-11-30',
      street: '789 Oak St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      department: 'sales',
    },
    {
      key: '3',
      firstName: 'Robert',
      lastName: 'Johnson',
      dateOfBirth: '1978-08-03',
      startDate: '2005-11-30',
      street: '789 Oak St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      department: 'sales',
    },
    {
      key: '3',
      firstName: 'Robert',
      lastName: 'Johnson',
      dateOfBirth: '1978-08-03',
      startDate: '2005-11-30',
      street: '789 Oak St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      department: 'sales',
    },
    {
      key: '3',
      firstName: 'Robert',
      lastName: 'Johnson',
      dateOfBirth: '1978-08-03',
      startDate: '2005-11-30',
      street: '789 Oak St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      department: 'sales',
    },
    {
      key: '3',
      firstName: 'Robert',
      lastName: 'Johnson',
      dateOfBirth: '1978-08-03',
      startDate: '2005-11-30',
      street: '789 Oak St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      department: 'sales',
    },
    {
      key: '3',
      firstName: 'Robert',
      lastName: 'Johnson',
      dateOfBirth: '1978-08-03',
      startDate: '2005-11-30',
      street: '789 Oak St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      department: 'sales',
    },
    {
      key: '3',
      firstName: 'Robert',
      lastName: 'Johnson',
      dateOfBirth: '1978-08-03',
      startDate: '2005-11-30',
      street: '789 Oak St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      department: 'sales',
    },
    {
      key: '3',
      firstName: 'Robert',
      lastName: 'Johnson',
      dateOfBirth: '1978-08-03',
      startDate: '2005-11-30',
      street: '789 Oak St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      department: 'sales',
    },
    {
      key: '3',
      firstName: 'Robert',
      lastName: 'Johnson',
      dateOfBirth: '1978-08-03',
      startDate: '2005-11-30',
      street: '789 Oak St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      department: 'sales',
    },
    {
      key: '3',
      firstName: 'Robert',
      lastName: 'Johnson',
      dateOfBirth: '1978-08-03',
      startDate: '2005-11-30',
      street: '789 Oak St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      department: 'sales',
    },
    {
      key: '3',
      firstName: 'Robert',
      lastName: 'Johnson',
      dateOfBirth: '1978-08-03',
      startDate: '2005-11-30',
      street: '789 Oak St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      department: 'sales',
    },
    {
      key: '3',
      firstName: 'Robert',
      lastName: 'Johnson',
      dateOfBirth: '1978-08-03',
      startDate: '2005-11-30',
      street: '789 Oak St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      department: 'sales',
    },
    {
      key: '3',
      firstName: 'Robert',
      lastName: 'Johnson',
      dateOfBirth: '1978-08-03',
      startDate: '2005-11-30',
      street: '789 Oak St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      department: 'sales',
    },
    {
      key: '3',
      firstName: 'Robert',
      lastName: 'Johnson',
      dateOfBirth: '1978-08-03',
      startDate: '2005-11-30',
      street: '789 Oak St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      department: 'sales',
    },
    {
      key: '3',
      firstName: 'Robert',
      lastName: 'Johnson',
      dateOfBirth: '1978-08-03',
      startDate: '2005-11-30',
      street: '789 Oak St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      department: 'sales',
    },
    {
      key: '3',
      firstName: 'Robert',
      lastName: 'cool',
      dateOfBirth: '1978-08-03',
      startDate: '2005-11-30',
      street: '789 Oak St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      department: 'sales',
    },

   
  ];


  const [Data, setData] = useState(testData)

 
  const onChange = (pagination, filters, sorter, extra) => {
    setTableParams({
      pagination: pagination,
    });
  
    console.log('params', pagination, filters, sorter, extra);
  };


  return (
    <>
      <Header />
      <Table dataSource={Data} columns={columns} onChange={onChange} pagination={tableParams.pagination}/>
      </>
      );
}

export default EmployeeDataTable;