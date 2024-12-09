const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// GraphQL API Endpoint
const GRAPHQL_API = 'http://localhost:5100/graphql';

// Route to fetch data from GraphQL API
app.get('/', async (req, res) => {
  try {
    const query = `
      query {
        products {
          id
          name
          price
        }
      }
    `;

    const response = await axios.post(GRAPHQL_API, { query });

    // Pass data to the HTML view
    res.render('dashboard', { products: response.data.data.products });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error fetching data');
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
