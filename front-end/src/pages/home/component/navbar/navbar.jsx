import { useState } from 'react';

import { Squeeze as Hamburger } from 'hamburger-react';

import navData from"@/src/data/home/navbarData.json";
import NavMobile from './navMobile';
import NavButton from "@/src/components/home/button/NavButton";
import LinkButtonIcon from '@/src/components/home/button/LinkButtonIcon';


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
        <nav className={`${navMobileOpen ? 'max-md:bg-zinc-200 h-[100dvh]' : 'max-md:h-auto'} ${scrollY > 100 ? 'md:bg-zinc-200/30 md:backdrop-blur-xs md:border-b-[1px] md:border-black/30' : 'md:bg-transparent md:border-b-[1px] md:border-transparent'} md:h-auto md:py-4 fixed w-full flex flex-col items-center top-0 left-0 duration-300 z-[10]`}>
            <div className={`${navMobileOpen || scrollY > 100 ? 'max-md:bg-zinc-200/30 max-md:backdrop-blur-xs' : 'max-md:bg-transparent'} ${navMobileOpen ? 'max-md:rounded-none border-b-[1px] max-mdborder-black/70' : 'max-md:order-b-[1px] max-md:border-transparent max-md:rounded-3xl'} max-md:mt-5 relative w-[90%] flex flex-row justify-between items-center px-1 py-[2px] duration-300`}>
                <div className="md:hidden p-0">
                    <Hamburger toggled={navMobileOpen} toggle={() => closeNavMobile()} size={20} duration={0.5} />
                </div>
                <div>
                    <p className='text-xl md:text-2xl'>Panjul Shop</p>
                </div>
                <div className="hidden md:flex md:gap-4 md:absolute md:left-1/2 md:-translate-x-1/2">
                    {navData.map((item, index) => (
                        <NavButton key={index} title={item.title} url={item.url} height={height} fontSize={20} />
                    ))}
                </div>
                <div className='px-1 md:hidden'>
                    <LinkButtonIcon url={"/product/all"} icon={"bi-cart"} size={23} />
                </div>
                <div className='px-1 max-md:hidden'>
                    <LinkButtonIcon url={"/product/all"} icon={"bi-cart"} size={25} />
                </div>
            </div>
            {navMobileOpen ? (
                <div className='w-full h-auto flex justify-center'>
                    <NavMobile height={height} setNavMobileOpen={setNavMobileOpen} navMobileClose={navMobileClose} />
                </div>  
            ) : null}
        </nav>
    );
}