import { useState, useEffect } from "react";

import NavButton from "@/app/_components/home/button/NavButton";
import navData from "@/app/_data/home/navbarData.json";

export default function NavMobile({height, setNavMobileOpen, navMobileClose}) {
    const [ textOpen, setTextOpen ] = useState(false);

    useEffect(()=> {
        setTimeout(() => {
            setTextOpen(true);
        }, 100);
    }, [])

    const closeNavMobile = () => {
        setNavMobileOpen(false);
    }

    useEffect(() => {
        navMobileClose && setTextOpen(false);
    }, [navMobileClose]);

    return (
        <div className="w-[90%] h-full mt-8">
            <div className="w-full flex flex-col gap-y-3.5 items-start">
                {navData.map((item, index) => (
                    <div key={index} onClick={closeNavMobile} style={{transitionDelay: `${textOpen ? `${index * 100}ms` : `${(navData.length * 100)-(index * 100)}ms`}`}} className={`${textOpen ? 'translate-x-0' : '-translate-x-[200%]'} duration-300 w-auto h-auto cursor-pointer`}>
                        <NavButton title={item.title} url={item.url} height={height} fontSize={20} />
                    </div>
                ))}
            </div>
        </div>
    )
}