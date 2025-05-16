"use client";
import { useState, useEffect } from "react";

import { Navbar, Hero, Content, Footer } from "./component";
import HomeLoadOverlay from "@/app/_components/overlay/loading/homeLoad";
import { getHeight, getScrollY } from "@/app/_util/script/getHeigh";
import { IsLoading } from "@/app/_util/script/isLoading";

export default function HomePage() {
    const [scrollY, setScrollY] = useState(0);
    const [height, setHeight] = useState(0);
    const isClient = IsLoading();

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

    if (!isClient) {
        return <HomeLoadOverlay />;
    }

    return (
        <div className="flex flex-col justify-center relative">
            <Navbar height={height} scrollY={scrollY} />
            <Hero />
            <Content />
            <Footer />
        </div>
    );
}
