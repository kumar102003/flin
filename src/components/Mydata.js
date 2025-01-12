import React from 'react';
import Navbar from './Navbar';

const Mydata = ({ data }) => {
  return (
    <div>
        
        <div className="container mt-4">
      <h2 className="text-center mb-4">Uploaded Data</h2>
      {data && data.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="thead-dark">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Description</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>{new Date(item.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center">No data available. Upload some data to display it here!</p>
      )}
    </div>
    </div>
  );
};

export default Mydata;
