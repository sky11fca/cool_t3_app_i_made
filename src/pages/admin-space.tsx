import Footer from "~/components/Footer";
import LinkForm from "~/components/LinkForm";
import ShowLinks from "~/components/ShowLinks";

export default function AdminSpace() {
    return(
        <div>
            <LinkForm/>
            <ShowLinks/>
            <Footer/>
        </div>
    )
}