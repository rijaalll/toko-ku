"use client";
import { useState, useEffect } from "react";
import Head from "next/head";

import { Navbar, Hero, Content, Footer } from "./component";
import HomeLoadOverlay from "@/src/components/overlay/loading/homeLoad";
import { getHeight, getScrollY } from "@/src/util/script/getHeigh";
import { IsLoading } from "@/src/util/script/isLoading";

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
        <>
            <Head>
                <link rel="preload" href="@/public/image/home/hero/image-blue.png" as="image" />
                <link rel="preload" href="@/public/image/home/hero/image-red.png" as="image" />
                <link rel="preload" href="@/public/image/home/hero/image-green.png" as="image" />
            </Head>
            <div className="flex flex-col justify-center relative">
                <Navbar height={height} scrollY={scrollY} />
                <Hero />
                <Content />
                <Footer />
            </div>
        </>
    );
}
