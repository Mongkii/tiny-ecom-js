const express = require('express');
const leapcell = require('@leapcell/leapcell-js');
// let engine = require('ejs-locals');

const path = require('path');
const app = express();
// app.engine('ejs', engine);
app.set('views', './views');
app.set('view engine', 'ejs');

const api = new leapcell.Leapcell({
    apiKey: process.env.LEAPCELL_API_KEY,
});
const table = api.repo('mongkii/surfboard-store').table('tbl1703263508240130048', 'name');


app.get('/', async (request, response) => {
    const res = await table.records.findMany({});
    return response.render('index', {
        products: res,
    });
});

app.get("/product/:id", async (request, response) => {

    const res = await table.records.findById(request.params.id);
    return response.render('product', {
        product: res,
    });
});

app.listen(8000, () => {
    console.log('App is listening on port 8000');
});
