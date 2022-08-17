const express = require('express');
const bigtable = require('./bigtable2')

// Initialize express app and bigtable instance.  
const port = process.env.PORT || 8080;
const app = express();
app.use(express.json()) // Let app communicate in jsons. 

const btInstance = new bigtable.BigTableReader(
    process.env.BT_INSTANCE || 'georgecma-spacewalk', // TODO: scrub personal credentials.
    process.env.BT_TABLE || 'package-record',
)

// Get one package's latest location from the database.
app.post('/api/get', (req, res) => {
    btInstance.readRow(req.body.packageId, {
        row: {
            cellLimit: 1,
        }
    }).then(
        data => {
            console.log(data)
            res.status(200).send(data)
        }
    ).catch(err => {
        console.log(err)
        res.status(400).send(err)
    })
})

// Get one package's entire location history from the database.
app.post('/api/getAll', (req, res) => {
    btInstance.readRow(req.body.packageId).then(
        data => {
            console.log(data)
            res.status(200).send(data)
        }
    ).catch(err => {
        console.log(err)
        res.status(400).send(err)
    })
})

// Get multiple packages' latest locations from the database filtering by prefix. 
app.post('/api/getByPrefix', (req, res) => {
    // TODO: implement prefix check.
    btInstance.readRowByPrefix(req.body.packageId, {
        row: {
            cellLimit: 1,
        }
    }).then(
        data => {
            console.log(data)
            res.status(200).send(data)
        }
    ).catch(err => {
        console.log(err)
        res.status(400).send(err)
    })
})

app.post('/api/getByPrefixAll', (req, res) => {
    // TODO: implement prefix check.
    btInstance.readRowByPrefix(req.body.packageId).then(
        data => {
            console.log(data)
            res.status(200).send(data)
        }
    ).catch(err => {
        console.log(err)
        res.status(400).send(err)
    })
})

// Create or update a package entry.
app.post('/api/update', (req, res) => {
    btInstance.updateRow(req.body.packageId, req.body.packageLocation).then(data => {
        console.log(data)
        res.status(200).send(data)
    }).catch(err => {
        console.log(err)
        res.status(400).send(err)
    })
})

app.post('/api/create', (req, res) => {
    btInstance.createRow(req.body.packageId, req.body.packageLocation).then(data =>
        res.status(200).send(data)
    ).catch(err => {
        console.log(err)
        res.status(400).send(err)
    })
})


app.listen(port, () => console.log('app is listening on ' + port))
