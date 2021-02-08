const express = require('express');
const Mercadopago = require('mercadopago');
const app = express()

Mercadopago.configure({
    sandbox: true,
    access_token: 'APP_USR-8248481310805126-020815-59ca03eb9a4e83a3c94b3f2b44d11c0b-172871784'
})

app.get('/', (req, res)=> {
    res.send('Olá mundo')
})

app.get('/pagar', async (req, res)=> {
    
    let id = "" + Date.now()
    let emailDoPagador =  'gerson.snts55@outlook.com'
    let dados = {
        items: [
            item = {
                id: id,
                title: "5x video games",
                quantity: 1,
                currency_id: 'BRL',
                unit_price: parseFloat(150)
            }
        ],
        payer: {
            emial:emailDoPagador,
        },
        external_reference: id
    }
    try {
        var pagamento = await Mercadopago.preferences.create(dados)
        console.log(pagamento)
        return res.redirect(pagamento.body.init_point);
    } catch (err) {
        return res.send(err.message)
    }
    
})

app.post('/not', (req, res)=> {
    console.log(req.query)
    res.send('Ok')
})

app.listen(3000, () => {
    console.log('Server running...')
})