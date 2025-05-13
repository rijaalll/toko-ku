import { useState } from 'react';

import { Squeeze as Hamburger } from 'hamburger-react'

import navData from"@/app/_data/home/navbarData.json";
import NavButton from "@/app/_components/home/button/NavButton";


export default function Navbar({ height, scrollY }) {
    const [ navMobileOpen, setNavMobileOpen ] = useState(false);

    return (
        <nav className="fixed w-full h-auto flex justify-center top-5 left-0">
            <div className={`${scrollY > 100 ? 'bg-zinc-600' : ''} w-[90%] flex flex-row justify-between items-center rounded-3xl px-5 duration-300`}>
                <div>
                    <p>Panjul Shop</p>
                </div>
                <div className="hidden md:flex">
                    {navData.map((item, index) => (
                        <NavButton key={index} title={item.title} url={item.url} height={height} />
                    ))}
                </div>
                <div className="md:hidden p-0">
                    <Hamburger toggled={navMobileOpen} toggle={setNavMobileOpen} size={20} duration={0.5} />
                </div>
            </div>
        </nav>
    );
}