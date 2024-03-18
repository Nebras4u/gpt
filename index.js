const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch').default;

const app = express();
const port = 3000;

const API_KEY = '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';

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index', { reply: '' });
});

app.post('/ask', async (req, res) => {
    try {
        const { message } = req.body;
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`,
            },
            body: JSON.stringify({
                model: 'text-davinci-003',
                prompt: message,
                max_tokens: 150,
            }),
        });

        const data = await response.json();
        //console.log(data);
        const reply = data.choices[0].text.trim();
        res.render('index', { reply });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`App listening at https://nebgpt.onrender.com:${port}`);
});
