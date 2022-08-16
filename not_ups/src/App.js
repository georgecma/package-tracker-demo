import './App.css';
import React, { useState } from 'react';
import { UpdatePackageForm } from './components/UpdatePackageForm'
import { GetPackageForm } from './components/GetPackageForm'
import { GetPackagePrefixForm } from './components/GetPackagePrefixForm'
import { DisplayPackageDiv } from './components/DisplayPackageDiv'

const axios = require('axios')


function App() {
  const [displayData, setDisplayData] = useState('');
  return (
    <div className="App">
      <header className="App-header">
        <GetPackageForm dataCallback={setDisplayData} />
        {
          // vendor has access to the following: 
        }
        <UpdatePackageForm dataCallback={setDisplayData} />
        <GetPackagePrefixForm dataCallback={setDisplayData} />
        <DisplayPackageDiv displayData={displayData} />
      </header>
    </div>
  );
}

export default App;
