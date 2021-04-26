const dollarsToCents = require('dollars-to-cents')

class PaymentController {
    async createPaymentIntent(req, res) {
        const { amount } = req.body
        try { 
            const paymentIntent = await stripe.paymentIntent.create({
                amount: dollarsToCents(amount),
                currency: 'eur',
                payment_method_types: ['card']
            })

            return res.status(200).send(paymentIntent)
        } catch (err) {
            res.status(500).send(err)            
        }
    }
}


module.exports = PaymentController()