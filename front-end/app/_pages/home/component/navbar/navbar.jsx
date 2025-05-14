import { useState } from 'react';

import { Squeeze as Hamburger } from 'hamburger-react'

import navData from"@/app/_data/home/navbarData.json";
import NavMobile from './navMobile';
import NavButton from "@/app/_components/home/button/NavButton";
import LinkButtonIcon from '@/app/_components/home/button/LinkButtonIcon';


export default function Navbar({ height, scrollY }) {
    const [ navMobileOpen, setNavMobileOpen ] = useState(false);
    const [ navMobileClose, setNavMobileClose ] = useState(true);

    const closeNavMobile = () => {
        if (navMobileOpen === false) {
            setNavMobileOpen(true);
            setNavMobileClose(false);
        } else {
            setNavMobileClose(true);
            setTimeout(() => {
                setNavMobileOpen(false);
            }, ((navData.length * 100) + 100));
        }
    }

    return (
        <nav className={`${navMobileOpen ? 'bg-zinc-200 h-[100dvh]' : 'h-auto'} fixed w-full flex flex-col items-center top-0 left-0 duration-300`}>
            <div className={`${navMobileOpen || scrollY > 100 ? 'bg-zinc-200/30 backdrop-blur-xs' : 'bg-transparent'} ${navMobileOpen ? 'rounded-none border-b-[1px] border-black/70' : 'border-b-[1px] border-transparent rounded-3xl'} w-[90%] flex flex-row justify-between items-center px-1 duration-300 mt-5`}>
                <div className="md:hidden p-0">
                    <Hamburger toggled={navMobileOpen} toggle={() => closeNavMobile()} size={20} duration={0.5} />
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
                <div className='w-full h-auto flex justify-center'>
                    <NavMobile height={height} setNavMobileOpen={setNavMobileOpen} navMobileClose={navMobileClose} />
                </div>  
            ) : null}
        </nav>
    );
}