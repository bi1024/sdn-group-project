import { useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MenuLeft from "./components/blog/MenuLeft";

function App(props) {

  const location = useLocation();

  return (
    <>
      <Header />

      <section>
        <div className="container">
          <div className="row">
            {location.pathname !== "/login" 
            && location.pathname !== "/updateMember" 
            && location.pathname !== "/myProduct" 
            && location.pathname !== "/addProduct"
            && location.pathname !== "/myAccount" 
            && location.pathname !== "/editProduct/"
			&& location.pathname !== "/carts" 
			&& location.pathname !== "/checkout"     
            && !location.pathname.includes("editProduct")
            && <MenuLeft />}
            {props.children}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default App;
