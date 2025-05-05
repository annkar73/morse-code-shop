import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
<main className="p-6 max-w-7xl mx-auto">

  <section className="bg-white p-6 rounded shadow-md mb-10">
    <h1 className="text-3xl font-bold text-center mb-4 text-[var(--color-green-dark)]">Välkommen till Signalarmband</h1>
    <p className="text-xl font-light text-center text-[var(--color-black)] mb-6">
      Utforska våra pärlade morsearmband och bär med dig ett personligt budskap varje dag.
    </p>
    <p className="text-lg text-center text-[var(--color-green-dark)]">Pärlor med mening – armband som speglar din attityd genom morsekod.</p>
  </section>


  <section className="bg-white p-6 rounded shadow-md mb-10">
    <h2 className="text-2xl font-semibold text-[var(--color-green-dark)] text-center mb-6">På Signalarmband skapar vi armband med attityd.</h2>
    <p className="text-lg text-center text-[var(--color-black)]">
      På Signalarmband skapar vi mer än bara smycken. Varje pärla bär ett dolt budskap – ibland kärleksfullt, ibland kaxigt, ibland bara för dig. Det ser kanske ut som ett vanligt armband, men den som kan morsekod vet bättre.
    </p>
  </section>

  <section className="bg-white p-6 rounded shadow-md mb-10">
    <h2 className="text-2xl font-semibold text-[var(--color-green-dark)] text-center mb-4">Bär ditt eget budskap</h2>
    <p className="text-lg text-center text-[var(--color-black)] mb-6">
      Bär ett armband med ett personlig betydelse. Välj ett armband som visar det budskap just du har till världen.
    </p>
    <Link href="/products">
    <Button className="w-full py-2 px-4 bg-[var(--color-pink-dark)] text-white font-semibold text-lg rounded-md">
      Gå till produktlista
    </Button>
    </Link>
  </section>
</main>
  );
}
