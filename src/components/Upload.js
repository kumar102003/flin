import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Upload = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg border-0">
            <div className="card-header  text-black text-center">
              <h3>Upload Your Data</h3>
            </div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="fileInput" className="form-label">
                    Choose File
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="fileInput"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    rows="3"
                    placeholder="Add a description for your upload..."
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Upload
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
