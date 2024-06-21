import FromLogin from "../components/login/FromLogin";
import Main from "../components/Main";
import Footer from "../ui/Footer";
import Header from "../ui/Header";

function Login() {
  return (
    <>
      <Header />
      <Main>
        <FromLogin />
      </Main>
      <Footer />
    </>
  );
}

export default Login;
