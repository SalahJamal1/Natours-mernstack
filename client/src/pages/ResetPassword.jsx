import Main from "../components/Main";
import FormReset from "../components/resetpassword/FormReset";
import Footer from "../ui/Footer";
import Header from "../ui/Header";

function ResetPassword() {
  return (
    <>
      <Header />
      <Main>
        <FormReset />
      </Main>
      <Footer />
    </>
  );
}

export default ResetPassword;
