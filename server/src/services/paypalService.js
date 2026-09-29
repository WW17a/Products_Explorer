const PAYPAL_BASE_URL = process.env.PAYPAL_BASE_URL;

export const getPayPalAccessToken = async () => {
    const credentials = Buffer.from(
        `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
    ).toString("base64");

    const response = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
        method: "POST",
        headers: {
            Authorization: `Basic ${credentials}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=client_credentials",
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`PayPal authentication failed: ${error}`);
    }

    const data = await response.json();

    return data.access_token;
};

export const createPayPalOrder = async ({ amount, currency, requestId }) => {
    const accessToken = await getPayPalAccessToken();

    const response = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
            "PayPal-Request-Id": requestId,
        },
        body: JSON.stringify({
            intent: "CAPTURE",
            purchase_units: [
                {
                    amount: {
                        currency_code: currency,
                        value: amount.toFixed(2),
                    },
                },
            ],
        }),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`PayPal order creation failed: ${error}`);
    }

    return response.json();
};


export const capturePayPalOrder = async ({ paypalOrderId, requestId }) => {
  const accessToken = await getPayPalAccessToken();

  const response = await fetch(
    `${PAYPAL_BASE_URL}/v2/checkout/orders/${paypalOrderId}/capture`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "PayPal-Request-Id": requestId,
      },
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`PayPal order capture failed: ${error}`);
  }

  return response.json();
};