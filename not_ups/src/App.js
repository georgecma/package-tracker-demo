import './App.css';
import React, { useState } from 'react';
import { UpdatePackageForm } from './components/UpdatePackageForm'
import { GetPackageForm } from './components/GetPackageForm'
import { GetPackagePrefixForm } from './components/GetPackagePrefixForm'
import { DisplayPackageDiv } from './components/DisplayPackageDiv'

import { CustomerForm } from './components/CustomerForm'
import { VendorForm } from './components/VendorForm'

const axios = require('axios')


function App() {
  const [displayData, setDisplayData] = useState('');
  return (
    <div className="App">
      <CustomerForm dataCallback={setDisplayData} />
      <VendorForm dataCallback={setDisplayData} />
      <GetPackagePrefixForm dataCallback={setDisplayData} />
      <DisplayPackageDiv displayData={displayData} />
    </div >
  );
}

export default App;
