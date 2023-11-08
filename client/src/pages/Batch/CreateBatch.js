import React, { useEffect, useState } from 'react'
import Sidebar from '../Includes/Sidebar';
import Navbar from '../Includes/Navbar';
import Axios from 'axios';
import ApiUrls from '../Includes/corsUrls';




const CreateBatch = ({selectedCurriculum}) => {
    const[moduleID , setModuleID] = useState(null);
    const[moduleIDs , setModuleIDs] = useState([]);
    const[batchData , setBatchData] = useState({
        BatchName : '',
        Students : 0,
        TrainerID:0,
        Days: 0,
        StartDate : '',
        EndDate: '',
        Schedule : '',
        Status: 'Active', //Default Status
        ModuleID : moduleID
    })

    const[message , setMessage] = useState('');

    useEffect(() => {
        if(selectedCurriculum){
            Axios.get(ApiUrls['fetchModuleIDs'],{
                params:{curriculum : selectedCurriculum},
            })
            .then((response) => {
                setModuleID(response.data.moduleIDs);
            })
            .catch((error) => {
                console.error('Error fetching Module IDs:', error);
            });
        }
    } , [selectedCurriculum]);

    const handleModuleIDChange = e => {
        setModuleID(e.target.value);
    };


    const handleBatchInputChange = (event) => {
        const { name, value } = event.target;
        setBatchData((prevData) => ({
          ...prevData,
          [name]: value,
          ModuleID: moduleID,
        }));
      };


      const handleBatchSubmit = async () => {
        try{
            const response = await Axios.post(ApiUrls['createBatch'] , batchData);


            console.log('Server response:', response.data);
            setMessage('Batch created successfully');
        }catch(error){
            console.error('Error :' , error);
            setMessage('Failed to create Batch')
        }
      };
    

  return (
    <div className='bg-gray-100 g-sidenav-show'>
        <div className='min-height-300 bg-primary position-absolute w-100'></div>
        <Sidebar />
        <main className='main-content position-relative border-radius-lg'>
            <Navbar />
            <div className='container-fluid py-4'>
                <div className='card'>
                    <div className='card-body'>
                        <p className='text-uppercase text-sm'>Create Batch</p>
                        {message && (
                            <div className='alert alert-custom' role= 'alert'>
                                <span>{message}</span>
                            </div>
                        )}
                        <div className='form-group'>
                            <label htmlFor='ModuleID' className='form-control-label'>
                                Module ID:
                            </label>
                            <select
                                className='form-control'
                                id='ModuleID'
                                name='ModuleID'
                                value={moduleID}
                                onChange={handleModuleIDChange}
                                >
                                    <option value=''>Select Module ID</option>
                                    {moduleIDs.map((id) => {
                                        <option key={id} value={id}>
                                            {id}
                                        </option>
                                    })}
                                </select>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='BatchName' className='form-control-label'>
                                Batch Name : 
                            </label>
                            <input
                                type='text'
                                className='form-control'
                                id='BatchName'
                                name='BatchName'
                                value={batchData.BatchName}
                                onChange={handleBatchInputChange}
                                />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='Students' className='form-control-label'>
                                Students:
                            </label>
                            <input
                                type='number'
                                className='form-control'
                                id='Students'
                                name='Students'
                                value={batchData.Students}
                                onChange={handleBatchInputChange}
                                />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='Trainers' className='form-control-label'>
                                TrainerID:
                            </label>
                            <input
                                type='number'
                                className='form-control'
                                id='Trainers'
                                name='Trainers'
                                value={batchData.TrainerID}
                                onChange={handleBatchInputChange}
                                />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='Days' className='form-control-label'>
                                Days:
                            </label>
                            <input
                                type='number'
                                className='form-control'
                                id='Days'
                                name='Days'
                                value={batchData.Days}
                                onChange={handleBatchInputChange}
                                />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='StartDate' className='form-control-label'>
                                Start Date:
                            </label>
                            <input
                                type='date'
                                className='form-control'
                                id='StartDate'
                                name='StartDates'
                                value={batchData.StartDate}
                                onChange={handleBatchInputChange}
                                />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='EndDate' className='form-control-label'>
                                End Date:
                            </label>
                            <input
                                type='date'
                                className='form-control'
                                id='EndDate'
                                name='EndDate'
                                value={batchData.EndDate}
                                onChange={handleBatchInputChange}
                                />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='Schedule' className='form-control-label'>
                                Schedule:
                            </label>
                            <input
                                type='text'
                                className='form-control'
                                id='Schedule'
                                name='Schedule'
                                value={batchData.Schedule}
                                onChange={handleBatchInputChange}
                                />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='Status' className='form-control-label'>
                                Status:
                            </label>
                            <select
                                className='form-control'
                                id='Status'
                                name='Status'
                                value={batchData.Status}
                                onChange={handleBatchInputChange}
                                >
                                    <option value= 'Active'>Active</option>
                                    <option value= 'Completed'>Completed</option>
                            </select>                                
                        </div>
                        <div className='text-center'>
                            <button className='btn btn-primary btn-sm ms-auto' onClick={handleBatchSubmit}>
                                Submit
                            </button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </main>
      
    </div>
  )
}

export default CreateBatch
