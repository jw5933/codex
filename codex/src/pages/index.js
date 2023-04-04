import Head from "next/head";
const NavBar = () => {
    return(
        <div>
            Hello.
        </div>
    )
}

export default function Home() {
    return(
        <>
            <Head>
                <title>Codex</title>
            </Head>
            <main>
                <NavBar/>
                This is the '/' page. Go to '/directory'
            </main>
        </>
    )
}
console.log(process.env);