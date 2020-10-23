const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

exports.handler = async (event) => {
    const {image, name, price } = JSON.parse(event.body);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      shipping_address_collection: {
        allowed_countries: ['ES', 'NI'],
      },
      locale:'es',
      success_url: `${process.env.URL}`,
      cancel_url: process.env.URL,
      line_items: [
        {
          name: name,
         // description: product.description,
          images: [`https://amazing-goldwasser-d2fc24.netlify.app/${image}`],
          amount: price*100,
          currency: 'EUR',
          quantity: '1',
        },
      ],
    });

    console.log(`https://amazing-goldwasser-d2fc24.netlify.app/${image}`)
  
    return {
      statusCode: 200,
      body: JSON.stringify({
        sessionId: session.id,
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    
      }),
    };
  };