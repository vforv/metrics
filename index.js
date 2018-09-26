const Axios = require('axios');
const express = require('express');
var cors = require('cors')
var bodyParser = require('body-parser')
const app = express();
app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
app.post('/report', (req, res) => {
    const {start_date, end_date, country} = req.body;
    const reqs = {
        method: 'POST',
        url: '',
        auth: {
            username: 'api-key',
            password: ''
        },
        data: {
            start_date,
            end_date,
            "period": "43200",
            "name": "bandwidth",
            "namespace": "vpn",
            "filters": [
                { "name": "pop", "value": "iad" },
                { "name": "pop", "value": "atl" },
                { "name": "origin_country", "value": country }
            ],
            "statistics": ["sum", "average", "minimum", "maximum"]
        }
    }

    Axios(reqs)
        .then((success) => {
            res.json(success.data)
        })
        .catch((err) => {
            res.json(err.data)
        })
})

app.listen(3001, () => {
    console.log('App listen on port 3001');
})