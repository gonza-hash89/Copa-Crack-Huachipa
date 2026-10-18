import Hero from "@/components/Hero";
import Teams from "@/components/Teams";
import PastTournaments from "@/components/PastTournaments";
import PhotoGallery from "@/components/PhotoGallery";

export default function Home() {
  return (
    <>
      <Hero />
      <Teams />
      <PastTournaments />
      <PhotoGallery />
    </>
  );
}