import FromSignup from "../components/signup/FromSignup";
import Main from "../components/Main";
import Footer from "../ui/Footer";
import Header from "../ui/Header";

function Signup() {
  return (
    <>
      <Header />
      <Main>
        <FromSignup />
      </Main>
      <Footer />
    </>
  );
}

export default Signup;
