import Navbar from "@/components/NavBar";
import Title from "@/components/Title";

const Layout = ({ children }) => {
    return (
        <div>
            <Title title="My Website" />
            <Navbar />
            <main>{children}</main>
        </div>
    );
};

export default Layout;
