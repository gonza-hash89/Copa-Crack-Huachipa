import Hero from "@/components/Hero";
import Categorias from "@/components/Categorias";
import CopaBanner from "@/components/CopaBanner";
import Uniformes from "@/components/Uniformes";
import Galeria from "@/components/Galeria";
import Testimonios from "@/components/Testimonios";
import FAQ from "@/components/FAQ";
import Ubicacion from "@/components/Ubicacion";
import Contacto from "@/components/Contacto";
import NightParticles from "@/components/NightParticles";

export default function Home() {
  return (
    <>
      <NightParticles />
      <Hero />
      <CopaBanner />
      <Categorias />
      <Uniformes />
      <Galeria />
      <Testimonios />
      <FAQ />
      <Ubicacion />
      <Contacto />
    </>
  );
}
