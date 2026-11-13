import { ImmersiveHero } from "@/components/sections/ImmersiveHero";
import { Strip } from "@/components/sections/Strip";
import { About } from "@/components/sections/About";
import { Stays } from "@/components/sections/Stays";
import { Dining } from "@/components/sections/Dining";
import { Celebrations } from "@/components/sections/Celebrations";
import { Corbett } from "@/components/sections/Corbett";
import { Gallery } from "@/components/sections/Gallery";
import { Voices } from "@/components/sections/Voices";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <ImmersiveHero />
      <Strip />
      <About />
      <Stays />
      <Dining />
      <Celebrations />
      <Corbett />
      <Gallery />
      <Voices />
      <Contact />
    </>
  );
}
