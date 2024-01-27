import { NextRequest } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

export async function POST(request: NextRequest) {
  const body = await request
    .json()
    .then((data) => data as { data: { id: string } });
  const payment = await new Payment(client).get({ id: body.data.id }); //busca el pago para ver si existe

  console.log("payment:", payment);

  //Guardar la donacion en la base de datos
  const donation = {
    id: payment.id,
    amount: payment.transaction_amount,
    message: payment.description,
  };

  return Response.json({ success: true });
}
