export async function refundPayment(reference: string) {
  const response = await fetch("https://api.paystack.co/refund", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      transaction: reference,
    }),
  });

  const data = await response.json();

  if (!data.status) {
    throw new Error("Refund failed");
  }

  return data;
}