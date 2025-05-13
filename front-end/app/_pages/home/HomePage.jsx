"use client";
import { useState, useEffect } from "react";

import { Navbar, Hero, Content, Footer } from "./component";
import { getHeight, getScrollY } from "@/app/_util/script/getHeigh";

export default function HomePage() {
    const [scrollY, setScrollY] = useState(0);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        setHeight(getHeight());
    }, []);

    useEffect(() => {
        const handleScroll = () => setScrollY(getScrollY());
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [scrollY]);
    return (
        <div className="flex flex-col justify-center relative">
            <Navbar height={height} scrollY={scrollY} />
            <Hero />
            <Content />
            <Footer />
        </div>
    );
}
