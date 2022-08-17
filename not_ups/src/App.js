import './App.css';
import React, { useState } from 'react';

import { CustomerLookupForm } from './components/CustomerLookupForm'
import { VendorEditForm } from './components/VendorEditForm'
import { ResultForm } from './components/ResultForm'

function App() {
  const [displayData, setDisplayData] = useState('');
  return (
    <div className="App">
      <CustomerLookupForm dataCallback={setDisplayData} />
      <VendorEditForm dataCallback={setDisplayData} />
      <ResultForm displayData={displayData} />
    </div >
  );
}

export default App;
