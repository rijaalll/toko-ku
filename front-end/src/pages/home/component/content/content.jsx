import { useState, useEffect } from "react";
import Image from "next/image";


const dataFashion = [
    {
        "shirt":[
            {
                "id":1,
                "name":"shirt 1",
                "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
            },
            {
                "id":2,
                "name":"shirt 2",
                "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
            },
            {
                "id":3,
                "name":"shirt 3",
                "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
            },
            {
                "id":4,
                "name":"shirt 4",
                "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
            }
        ],
        "pants":[
            {
                "id":1,
                "name":"Pants 1",
                "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
            },
            {
                "id":2,
                "name":"Pants 2",
                "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
            },
            {
                "id":3,
                "name":"Pants 3",
                "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
            },
            {
                "id":4,
                "name":"Pants 4",
                "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
            }
        ],
        "shoes":[
            {
                "id":1,
                "name":"Shoes 1",
                "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
            },
            {
                "id":2,
                "name":"Shoes 2",
                "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
            },
            {
                "id":3,
                "name":"Shoes 3",
                "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
            },
            {
                "id":4,
                "name":"Shoes 4",
                "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
            }
        ]
    }
]


const categoryData = [];

for (let key in dataFashion[0]) {
    categoryData.push(key);
}

export default function Content() {
    const [categoryState, setCategoryState] = useState("shirt");
    const [productState, setProductState] = useState(dataFashion[0]["shirt"]);

    const switchCategory = (category) => {
        setProductState(dataFashion[0][category]);
    }

    return (
        <div className="w-full h-[100dvh] flex flex-col justify-start items-center">
            <div className="pb-7">
                <p className="text-2xl">Produk unggulan kami</p>
            </div>
            <div className="w-[90%] h-[70%] max-md:max-w-[28rem]">
                <div className="w-full h-full flex flex-col md:flex-row">

                    <div className="w-full h-auto py-2 pl-4 border-b-[1px] border-black/30 md:hidden">
                        <div className="w-full h-auto flex flex-row gap-6 ">
                            {categoryData.map((item, index) => (
                                <button onClick={() => {switchCategory(item); setCategoryState(item);}} key={index} className={`${item === categoryState ? "bg-zinc-200/60" : "bg-transparent"} `}>
                                    <span className="text-lg capitalize">{item}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="max-md:hidden basis-[20%] h-auto border-r-[1px] border-black/30">
                        <div className="w-full h-full flex flex-col px-3 gap-3">
                            {categoryData.map((item, index) => (
                                <button onClick={() => {switchCategory(item); setCategoryState(item);}} key={index} className={`${item === categoryState ? "bg-zinc-200/60" : "bg-transparent"} `}>
                                    <span className="text-lg capitalize">{item}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="max-md:w-full h-full overflow-y-scroll py-5 md:basis-[80%]">
                        <div className="w-full h-auto">
                            <div className="w-full h-auto flex flex-row flex-wrap">
                                {productState.map((item, index) => (
                                    <div key={index} className="w-[50%] h-auto flex justify-center items-center my-4">
                                        <div className="w-[90%] h-auto flex flex-col items-center">
                                            <div className="w-[60%] h-auto lg:w-[50%] xl:w-[40%]">
                                                <img src={item.image} alt="" className="w-full h-auto" />
                                            </div>
                                            <div className="w-full text-start">
                                                <p className="text-xl">{item.name}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}