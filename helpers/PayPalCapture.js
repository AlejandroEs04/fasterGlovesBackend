import paypal from '@paypal/checkout-server-sdk'

const captureOrder =  async(orderId) => {
    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_SECRET_KEY;
    const envirement = new paypal.core.LiveEnvironment(clientId, clientSecret)
    const client = new paypal.core.PayPalHttpClient(envirement)

    let request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});
    // Call API with your client and get a response for your call
    let response = await client.execute(request);

    return response.result.id
}

export default captureOrder