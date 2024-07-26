import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Alert, Button, Popconfirm, Input } from 'antd';
import { Link } from 'react-router-dom';
import './Hom.css';

const DataTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [N_OF, setN_OF] = useState('');
  const [alertInfo, setAlertInfo] = useState(null);

  useEffect(() => {
    fetchTableData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const filtered = data.filter(item =>
        Object.values(item).some(val =>
          val.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredData(filtered.map((item) => ({ ...item, key: item.id })));
    }
  }, [searchTerm, data]);

  const fetchTableData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/index');
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching data. Please try again later.');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/destroy/${id}`);
      fetchTableData();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleSearch = async () => {
    if (!N_OF) {
      setError('Please enter an ID to search.');
      setAlertInfo(null);
      return;
    }
    try {
      const response = await axios.get(`http://127.0.0.1:8000/show/${N_OF}`);
      console.log(response)
      const result = response.data ?response.data : null;
      setFilteredData(result);
      setAlertInfo(result ? result : { message: 'No data found for the provided ID.' });
      setError('');
    } catch (error) {
      setError('Error fetching data. Please try again.');
      setFilteredData([]);
      setAlertInfo(null);
    }
  };

  const columns = [
    { title: 'Date', dataIndex: 'Date', key: 'Date' },
    { title: 'Shift', dataIndex: 'Shift', key: 'Shift' },
    { title: 'Client', dataIndex: 'Client', key: 'Client' },
    { title: 'N_OF', dataIndex: 'N_OF', key: 'N_OF' },
    { title: 'Designation', dataIndex: 'Designation', key: 'Designation' },
    { title: 'Famille', dataIndex: 'Famille', key: 'Famille' },
    { title: 'MATRUCULE', dataIndex: 'MATRUCULE', key: 'MATRUCULE' },
    { title: 'Nombre Piste', dataIndex: 'Nombre_piste', key: 'Nombre_piste' },
    { title: 'MACHINE', dataIndex: 'MACHINE', key: 'MACHINE' },
    { title: 'QTE', dataIndex: 'QTE', key: 'QTE' },
    { title: 'METRAGE', dataIndex: 'METRAGE', key: 'METRAGE' },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (text, record) => (
        <Popconfirm
          key={`delete-${record.id}`}
          title="Are you sure to delete this item?"
          onConfirm={() => handleDelete(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button color="red" size="small">Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Input
          type="text"
          value={N_OF}
          onChange={(e) => setN_OF(e.target.value)}
          placeholder="Enter ID"
          style={{ width: 200, marginRight: 8 }}
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>
      {error && <Alert message="Error" description={error} type="error" showIcon />}
     
      <Table
        className="ss"
        columns={columns}
        dataSource={filteredData.length > 0 ? filteredData : data}
        loading={loading}
        rowKey="id"
      />
      <Link to="/Form" style={{ marginLeft: 8 }}>Ajouter</Link>
    </div>
  );
};

export default DataTable;
