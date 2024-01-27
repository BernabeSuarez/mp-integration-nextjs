import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";

// SDK de Mercado Pago
import { MercadoPagoConfig, Preference } from "mercadopago";
import { redirect } from "next/navigation";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

export default function Home() {
  async function pay(formData: FormData) {
    //configura la preferencia de pago
    "use server";
    const preference = await new Preference(client).create({
      body: {
        items: [
          {
            id: "Donaciones",
            title: formData.get("msg") as string,
            quantity: 1,
            unit_price: Number(formData.get("amount")),
          },
        ],
      },
    });
    redirect(preference.sandbox_init_point!);
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-900 text-white">
      <form action={pay} className="grid gap-6 max-w-96 border p-4 rounded-md">
        <Label className="grid gap-2">
          <span>Cuanto quieres donar</span>
          <Input
            type="number"
            placeholder="$0"
            name="amount"
            className="text-black"
          />
        </Label>
        <Label className="grid gap-2">
          <span>Deja tu mensajer</span>
          <Textarea name="msg" className="text-black" />
        </Label>
        <Button variant="secondary" type="submit">
          Donar
        </Button>
      </form>
      <Toaster />
    </main>
  );
}
