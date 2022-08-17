import React, { useState } from 'react';
const axios = require('axios')

export const GetPackagePrefixForm = (props) => {
  const [id, setId] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(id)
    axios.post('/api/getAll', {
      packageIdPrefix: id,
    }).then(res => {
      props.dataCallback(res.data)
      setId('')
    })
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>
        PackageId:
      </label>
      <input type='text' name='packageId' onChange={(e) => setId(e.target.value)} value={id} />
      <br />
      <input type='submit' value='Submit' />
    </form>

  )
}
