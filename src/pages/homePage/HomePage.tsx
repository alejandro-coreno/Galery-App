import Home from "../../components/home/Home";
import Navbar from "../../components/navbar/Navbar";
import "./homePage.css"

const HomePage = () => {
    return (
        <div className="container-app">
            <Navbar />
            <Home />
        </div>
    );
}

export default HomePage;