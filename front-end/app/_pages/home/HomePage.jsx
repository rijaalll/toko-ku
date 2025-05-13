import { Navbar, Hero, Content, Footer } from "./component";

export default function HomePage() {
    return (
        <div className="flex flex-col justify-center relative">
            <Navbar />
            <Hero />
            <Content />
            <Footer />
        </div>
    );
}