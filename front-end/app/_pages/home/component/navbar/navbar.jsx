import navData from"@/app/_data/home/navbarData.json";
import NavButton from "@/app/_components/home/button/NavButton";

export default function Navbar() {
    return (
        <nav className="fixed w-full h-auto flex justify-center">
            <div className="w-[90%] flex flex-row justify-between items-center">
                <div>
                    <p>Panjul Shop</p>
                </div>
                <div>
                    {navData.map((item, index) => (
                        <NavButton key={index} title={item.title} url={item.url} />
                    ))}
                </div>
            </div>
        </nav>
    );
}