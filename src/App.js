

import React, { useEffect, useState } from 'react'
import './App.css';
import axios from 'axios';
import FloatingWindow from './components/FloatingWindow';

// axios.defaults.baseURL="http://localhost:8080/"
axios.defaults.baseURL=`${window.location.origin}`

function App() {
  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: ""
  });
  const [formDataEdit, setFormDataEdit] = useState({
    name: "",
    mobile: "",
    _id: ""
  });
  const [dataList, setDataList] = useState([]);
  const [theme, setTheme] = useState('light'); // New state for theme

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };


  const getFetchData=async()=>{
        const data=await axios.get('/')
        if(data.data.success){
          setDataList(data.data.data)
        }
      }

      const handleOnChange=(e)=>{
            const {value, name}=e.target
            console.log(value);
            console.log(e.target);
            setFormData((preve)=>{
              return{
                ...preve,
                [name]:value
              }
            })
          }

          const handleSubmit=async (e)=>{
                e.preventDefault();
                const data=await axios.post('/create', formData);
                if(data.data.success){
                  setAddSection(false)
                  getFetchData()
                  setFormData({
                    name: "",
                    mobile: ""
                  })
                }
              }

  useEffect(() => {
    getFetchData();
  }, []);

  // Remaining code remains unchanged
  const handleDelete=async (id)=>{
        const data=await axios.delete(`/delete/${id}`)
        if(data.data.success)
        getFetchData()
    }
    
    const handleUpdate=async (e)=>{
      e.preventDefault();
      const data=await axios.put('/update', formDataEdit)
      if(data.data.success)
        getFetchData()
      setEditSection(false)
    }
    
    const handleEditOnChange=async (e)=>{
       const {value, name}=e.target
       setFormDataEdit((prev)=>{
        return{
          ...prev,
          [name]:value
        }
       })
      //  getFetchData()
    }
    
    const handleEdit=(el)=>{
     setFormDataEdit(el)
     setEditSection(true)
    }

  return (
    <>
      <div className={`container ${theme}`}>
        {/* Rest of your JSX */}
        <button className='btn btn-add' onClick={() => setAddSection(true)}>ADD</button>
        {
      addSection && (
        <FloatingWindow
        handleSubmit={handleSubmit}
        handleOnChange={handleOnChange}
        handleClose={()=>setAddSection(false)}
        rest={formData}
        />
      )
    }
    {
      editSection && (
        <FloatingWindow
        handleSubmit={handleUpdate}
        handleOnChange={handleEditOnChange}
        handleClose={()=>setEditSection(false)}
        rest={formDataEdit}
        />
      )
    }

    <div className="tableContainer">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Mobile</th>
            <th>
            <button className='theme' onClick={toggleTheme}>Change Theme</button>
            </th>
          </tr>
        </thead>
        <tbody>
          {dataList[0]?(
            dataList.map((el)=>{
              return(
                <tr key={el._id}>
                  <td>{el.name}</td>
                  <td>{el.mobile}</td>
                  <td>
                    <button className=' btn-edit' onClick={()=>handleEdit(el)}>EDIT</button>
                    <button className=' btn-delete' onClick={()=>handleDelete(el._id)}>DELETE</button>
                  </td>
                </tr>
              )
            }))
            :(
              <td style={{textAlign:'center'}}>No data</td>
            )
          }
        </tbody>
      </table>
    </div>
       
      </div>
    </>
  )

}

export default App;
