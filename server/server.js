const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());


app.get('', (req, res) => {
    res.send('Vikram...');
});

app.post('/api/submitFormData', (req, res) => {
  const { name, email, message } = req.body;
  // Do something with the form data (e.g., save to database)
  console.log('Received form data:', { name, email, message });
  res.status(200).send('Form data received');
});

app.listen(8000, (err) => {
    if(err){
        console.log(err);
    }
    else{
        console.log('Listening..')
    }
});