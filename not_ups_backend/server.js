

const { request } = require('express');
const express = require('express');
const app = express();
app.use(express.json())
const bigtable = require('./bigtable')

const port = process.env.PORT || 8080;

/**
 * packageId format: shipperId, serviceSuffix (e.g. priority shipping, normal shipping), dateId, random hash
 * packageId format: 6 digits,  YYYYMMDD, 2 digits, 4 digit hash 
 * total is 18 digits, same as UPS length
 */

/**
 * Function area for bigtable
 */


// Get one package from the database.
app.post('/api/get', (req, res) => {
    bigtable.getPackageLocation(req.body.packageId).then(data => {
        res.status(200).send(data)
    })
})

// Get multiple packages from the database filtering by prefix. 
app.post('/api/getByPrefix', (req, res) => {
    bigtable.getPackageLocationByPrefix(req.body.packageIdPrefix).then(data => {
        res.status(200).send(data)
    })

})

// create a packageId

// Create or update a package entry.
app.post('/api/update', (req, res) => {
    // simple verification for request body
    if (!req.body || !req.body.packageId || !req.body.packageLocation) {
        res.status(400).send()
    }

    bigtable.updatePackageLocation(req.body.packageId, req.body.packageLocation).then(data =>
        res.status(200).send(data)
    )
})



app.listen(port, () => console.log('app is listening on ' + port))
