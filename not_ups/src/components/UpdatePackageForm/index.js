import  React, {useState} from 'react';
const axios = require('axios')

export const UpdatePackageForm = (props) => {
    const [id, setId] = useState('');
    const [location, setLocation] = useState('');
    const handleSubmit= (e) =>{
      e.preventDefault()
      console.log(id, location)
      axios.post('/api/update', {
        packageId: id,
        packageLocation: location,
      }).then(res => {
        props.dataCallback(res.data)
        setId('')
        setLocation('')
      })
    }
    return (
      <form onSubmit = {handleSubmit}>
        <label>
          PackageId:
          </label>
          <input type='text' name='packageId' onChange={(e) => setId(e.target.value)} value={id}/> 
          <br /> 
          <label>
            PackageLocation:
          </label>
          <input type='text' name='packageLocation' onChange={(e) => setLocation(e.target.value)} value={location}/> 
          <br /> 
        <input type='submit' value='Submit' />
      </form> 
  
    )
  }
  