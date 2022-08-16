import React, { useState } from 'react';
const axios = require('axios')

export const GetPackageForm = (props) => {
    const [id, setId] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('/api/get', {
            packageId: id,
        }).then(res => {
            // console.log('res', res.data)
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
