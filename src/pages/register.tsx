import Footer from "~/components/Header";
import RegisterForm from "~/components/RegisterForm";

export default function RegisterPage(){
    return(
        <div>
            <RegisterForm />
            <p>Already have an account? <a href="/login">Login</a></p>
            <Footer />
        </div>
    )
}