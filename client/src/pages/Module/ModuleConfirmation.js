import React, { useState } from 'react';
import axios from 'axios';
import Layout from '../Layout/Layout';
import ScriptSection from '../Includes/ScriptSection';
import Navbar from '../Includes/Navbar';
import Sidebar from '../Includes/Sidebar';
import DOMPurify from 'dompurify';
import { Toaster,toast} from 'sonner';


const ModuleConfirmation = () => {
  const initialConfirmationData = {
    ModuleID: '',
    // AdminID: '',
    // ModeratorID: '',
    ConfirmationDate: '',
    ConfirmationStatus: 'Pending',
    Comments: '',
  };

  const [confirmationData, setConfirmationData] = useState(initialConfirmationData);
  const [message, setMessage] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setConfirmationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const charOnly = /^[A-Za-z ]+$/;
  const charNum= /^[a-zA-Z0-9]*$/;
    const nums=/^[0-9]*$/;

  const handleSubmit = () => {
    if(!confirmationData.ModuleID || confirmationData.ModuleID.match(nums))
    {
      toast.error("Please enter a valid Module Id");
      return;
    }
    if(!confirmationData.ConfirmationDate)
    {
      toast.error("confirmation date can't be empty");
      return;
    }
    if(!confirmationData.ConfirmationStatus || confirmationData.ConfirmationStatus.match(charOnly))
    {
      toast.error("Please enter a valid Confirmation Status");
      return;
    }
    if(!confirmationData.Comments)
    {
      toast.error("Comments section can't be empty");
      return;
    }


    confirmationData.ModuleID=DOMPurify.sanitize(confirmationData.ModuleID).trim();
    confirmationData.ConfirmationDate=DOMPurify.sanitize(confirmationData.ConfirmationDate).trim();
    confirmationData.ConfirmationStatus=DOMPurify.sanitize(confirmationData.ConfirmationStatus).trim();
    confirmationData.Comments=DOMPurify.sanitize(confirmationData.Comments).trim();
    axios
      .post('/add-module-confirmation', confirmationData)
      .then((response) => {
        setMessage(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
        setMessage('An error occurred.');
      });
  };

  return (

      <div className="bg-gray-100 g-sidenav-show">
        <div className="min-height-300 bg-primary position-absolute w-100"></div>
        {/* Include the sidebar component */}
        <Sidebar />
        <Toaster richColors position='top-center'/>
        <main className="main-content position-relative border-radius-lg">
          {/* Include the navbar component */}
          <Navbar />
          <div className="container-fluid py-4">
          <div className="card">
        <div className="card-body">
          <p className="text-uppercase text-sm">Module Confirmation</p>
          {message && (
            <div className="alert alert-custom" role="alert">
              <span>{message}</span>
            </div>
          )}
          <div className="form-group">
            <label htmlFor="MODULEID" className="form-control-label">MODULE ID:</label>
            <input
              className="form-control"
              type="text"
              id="MODULEID"
              name="MODULEID"
              value={confirmationData.ModuleID}
              onChange={handleInputChange}
            />
          </div>
          {/* <div className="form-group">
            <label htmlFor="AdminID" className="form-control-label">Admin ID:</label>
            <input
              className="form-control"
              type="text"
              id="AdminID"
              name="AdminID"
              value={confirmationData.AdminID}
              onChange={handleInputChange}
            />
          </div> */}
          {/* <div className="form-group">
            <label htmlFor="ModeratorID" className="form-control-label">Moderator ID:</label>
            <input
              className="form-control"
              type="text"
              id="ModeratorID"
              name="ModeratorID"
              value={confirmationData.ModeratorID}
              onChange={handleInputChange}
            />
          </div> */}
          <div className="form-group">
            <label htmlFor="ConfirmationDate" className="form-control-label">Confirmation Date:</label>
            <input
              className="form-control"
              type="text"
              id="ConfirmationDate"
              name="ConfirmationDate"
              value={confirmationData.ConfirmationDate}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="ConfirmationStatus" className="form-control-label">Confirmation Status:</label>
            <select
              className="form-control"
              id="ConfirmationStatus"
              name="ConfirmationStatus"
              value={confirmationData.ConfirmationStatus}
              onChange={handleInputChange}
            >
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="Comments" className="form-control-label">Comments:</label>
            <textarea
              className="form-control"
              id="Comments"
              name="Comments"
              value={confirmationData.Comments}
              onChange={handleInputChange}
            />
          </div>
          <button className="btn btn-primary btn-sm ms-auto" onClick={handleSubmit}>Submit</button>
          </div>
          </div>
          </div>
            </main>
          </div>
          
  );
};

export default ModuleConfirmation;
