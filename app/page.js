import Hero from "@/components/Hero";
import Fixture from "@/components/Fixture";
import Teams from "@/components/Teams";
import Standings from "@/components/Standings";
import PastTournaments from "@/components/PastTournaments";
import PhotoGallery from "@/components/PhotoGallery";
import Sponsors from "@/components/Sponsors";
import RegisterForm from "@/components/RegisterForm";

export default function Home() {
  return (
    <>
      <Hero />
      <Fixture />
      <Teams />
      <Standings />
      <PastTournaments />
      <PhotoGallery />
      <Sponsors />
      <RegisterForm />
    </>
  );
}