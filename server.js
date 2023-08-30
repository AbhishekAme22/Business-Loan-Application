const express = require('express');
const bodyParser = require('body-parser');
const decisionEngine = require('./decisionEngine');
const path = require('path'); 
const app = express();
app.use(bodyParser.json());

const publicPath = path.join(__dirname, 'public'); // Set the path to the 'public' directory
console.log(publicPath)
app.use(express.static(publicPath));

// Simulated sample balance sheet data
const sampleBalanceSheet = [
    {
      "year": 2022,
      "month": 12,
      "profitOrLoss": 20000,
      "assetsValue": 100000
    },
    {
      "year": 2022,
      "month": 11,
      "profitOrLoss": 15000,
      "assetsValue": 90000
    },
    {
      "year": 2021,
      "month": 12,
      "profitOrLoss": 18000,
      "assetsValue": 85000
    },
    {
      "year": 2021,
      "month": 11,
      "profitOrLoss": 12000,
      "assetsValue": 80000
    }
  ];
  

app.get('/fetchBalanceSheet', (req, res) => {
  const provider = req.query.provider;
  if (provider === 'Xero' || provider === 'MYOB') {
    // Return the sample balance sheet data
    res.json(sampleBalanceSheet);
  } else {
    res.status(400).json({ error: 'Invalid accounting provider' });
  }
});

app.post('/processApplication', async (req, res) => {
  try {
    const applicationData = req.body;
    const result = await decisionEngine.processApplication(applicationData);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
