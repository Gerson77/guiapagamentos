const express = require('express');
const Mercadopago = require('mercadopago');
const app = express()

Mercadopago.configure({
    sandbox: true,
    access_token: 'TEST-8248481310805126-020815-03f126d96e1cd34634281767c91a2df4-172871784'
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
        
        return res.redirect(pagamento.body.init_point);
    } catch (err) {
        return res.send(err.message)
    }
    
})

app.post('/not', (req, res)=> {
    var id = req.query.id;

    setTimeout(()=> {

        var filtro = {
            "oder.id": id
        }

        Mercadopago.payment.search({
            qs: filtro
        }).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })

    },20000)
})

app.listen(80, () => {
    console.log('Server running...')
})