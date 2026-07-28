import Footer from "@/components/home/footer";
import SearchProperty from "@/components/home/SearchProperty";
import WhyChoose from "@/components/home/WhyChoose";
import Hero from "@/components/home/Hero";
import Navbar from "@/components/shared/Navbar";

export default function Home() {
  return (
    <div>
       <Navbar/>
       <Hero/>
       <SearchProperty/>
       <WhyChoose/>
       <Footer/>
    </div>
  );
}
