const express = require('express');
const app = express();
const router = require('./routes/index')
const port = 5000;


app.use('/', router)
app.get('*', (req, res) => {
    res.status(400).send('Not Found')
})

app.listen(port, () =>{console.log(`listening on port ${port}`)})