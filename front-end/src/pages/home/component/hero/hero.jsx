import Image from 'next/image';
import { useState, useEffect } from 'react';

import MainComment from '@/src/components/home/comment/mainComment';
import ColorButton from '@/src/components/home/button/ColorButton';
import IconComment from '@/src/components/home/comment/iconComment';

import blueImage from '@/public/image/home/hero/image-blue.png';
import redImage from '@/public/image/home/hero/image-red.png';
import greenImage from '@/public/image/home/hero/image-green.png';


const imageColor = [
    {
        "state": "blue",
        "rgb": "rgb(0, 0, 255)"
    },
    {
        "state": "red",
        "rgb": "rgb(242, 107, 107)"
    },
    {
        "state": "green",
        "rgb": "rgb(4, 53, 0)"
    }
]

const iconComment = [
    {
        "name": "jam",
        "icon": "bi-watch"
    },
    {
        "name": "harga",
        "icon": "bi-currency-dollar"
    }
    
]

export default function Hero() {
    const [ colorState, setColorState ] = useState('blue');

    useEffect(() => {
        const interval = setInterval(() => {
            setColorState(prevState => prevState === 'blue' ? 'red' : prevState === 'red' ? 'green' : 'blue');
        }, 3000);
        return () => clearInterval(interval);
    }, [])

    return (
        <section className='w-full h-[100dvh]'>
            <div className='w-full h-full flex justify-center items-center'>
                <div className='w-[90%] h-[90%] max-md:max-w-[28rem] md:w-[95%] flex flex-col max-md:items-center md:flex-row md:bg-zinc-300/60 md:rounded-2xl md:h-[70%] gap-12'>

                    <div className='max-md:w-full h-[60%] flex justify-start items-end md:basis-1/2 md:order-1 md:self-end'>
                        <div className='w-full h-[50%] md:h-full max-md:bg-zinc-300/60 rounded-2xl relative'>
                            <div className='w-full h-auto'>
                                <div className='absolute bottom-0 w-[70%] max-w-[15rem] md:w-full md:max-w-[20rem] lg:max-w-[25rem] xl:max-w-[30rem]'>
                                    <div className='md:hidden'>
                                        <MainComment text={"1k+ Ratings"} top={26} right={0} star={4} fontSize={12} />
                                    </div>
                                    <div className='max-md:hidden lg:hidden'>
                                        <MainComment text={"1k+ Ratings"} top={30} right={0} star={4} fontSize={15} />
                                    </div>
                                    <div className='max-lg:hidden xl:hidden'>
                                        <MainComment text={"1k+ Ratings"} top={32} right={0} star={4} fontSize={18} />
                                    </div>
                                    <div className='max-xl:hidden'>
                                        <MainComment text={"1k+ Ratings"} top={35} right={0} star={4} fontSize={20} />
                                    </div>
                                    <Image src={colorState === 'blue' ? blueImage : colorState === 'red' ? redImage : greenImage} alt="mainImage" className='w-full bottom-0'></Image>
                                </div>
                                <div className='w-auto h-auto flex flex-row gap-5 absolute right-8 bottom-5 z-[3]'>
                                    {imageColor.map((item, index) => (
                                        <ColorButton key={index} color={item.rgb} colorName={item.state} colorState={colorState} setColorState={setColorState} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='max-md:w-full h-[40%] md:basis-1/2 md:h-full md:px-8'>
                        <div className='w-full h-full flex justify-start items-start md:items-center'>
                            <div className='w-auto h-auto flex flex-col gap-2'>
                                <p className='text-3xl md:text-4xl lg:text-6xl'>Temukan passion anda</p>
                                <p className='text-xl lg:text-3xl'>Di Panjul Shop</p>  
                                <div className='w-full h-auto flex flex-row justify-start gap-0'>
                                    {iconComment.map((icon, index) => (
                                        <IconComment key={index} iconTitle={icon.name} iconClass={icon.icon} fontSize={13} iconSize={18} />
                                    ))}
                                </div>          
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )}