import Link from 'next/link';

const Navbar = () => {
    return(
        <nav>
            <div className={"navbar"}>
                <Link href="/directory">
                    Directory
                </Link>
                <Link href="/directory">
                    My Codices
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
