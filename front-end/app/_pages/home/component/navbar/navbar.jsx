import { useState } from 'react';

import { Squeeze as Hamburger } from 'hamburger-react'

import navData from"@/app/_data/home/navbarData.json";
import NavMobile from './navMobile';
import NavButton from "@/app/_components/home/button/NavButton";
import LinkButtonIcon from '@/app/_components/home/button/LinkButtonIcon';


export default function Navbar({ height, scrollY }) {
    const [ navMobileOpen, setNavMobileOpen ] = useState(false);

    return (
        <nav className={`${navMobileOpen && 'bg-zinc-200'} fixed w-full h-auto flex flex-col items-center top-0 left-0`}>
            <div className={`${navMobileOpen || scrollY > 100 ? 'bg-zinc-200/30 backdrop-blur-xs' : 'bg-transparent'} ${navMobileOpen ? 'rounded-none border-b-[1px] border-black/70' : 'border-b-[1px] border-transparent rounded-3xl'} w-[90%] flex flex-row justify-between items-center px-1 duration-300 mt-5`}>
                <div className="md:hidden p-0">
                    <Hamburger toggled={navMobileOpen} toggle={setNavMobileOpen} size={20} duration={0.5} />
                </div>
                <div>
                    <p className='text-xl'>Panjul Shop</p>
                </div>
                <div className="hidden md:flex">
                    {navData.map((item, index) => (
                        <NavButton key={index} title={item.title} url={item.url} height={height} />
                    ))}
                </div>
                <LinkButtonIcon url={"/cart"} icon={"bi-cart"} size={25} />
            </div>
            {navMobileOpen ? (
                <div className='w-full h-[100dvh] flex justify-center'>
                    <NavMobile height={height} setNavMobileOpen={setNavMobileOpen} />
                </div>  
            ) : null}
        </nav>
    );
}