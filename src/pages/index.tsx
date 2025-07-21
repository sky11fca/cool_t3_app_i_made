import Header from "~/components/Header";
import Footer from "~/components/Footer";
import LandingContents from "~/components/LandingContents";
import Navbar from "~/components/Navbar";

export default function Landing(){
    return(
        <div>
            <Navbar />
            <Header />
            <LandingContents />
            <Footer />
        </div>
    )
}