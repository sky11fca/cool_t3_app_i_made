import Footer from "~/components/Header";
import LoginForm from "~/components/LoginForm";

export default function LoginPage(){
    return(
        <div>
            <LoginForm />
            <p>Don't have an account? <a href="/register">Register</a></p>
            <Footer />
        </div>
    )
}