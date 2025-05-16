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
        <div className="w-full h-[100dvh] flex justify-center items-end pb-5">
            <div className="w-[90%] h-[87%]">
                <div className="w-full h-full flex flex-col items-start">
                    <div className="w-full h-auto py-2 pl-4 border-b-[1px] border-black/30">
                        <div className="w-full h-auto flex flex-row gap-6 ">
                            {categoryData.map((item, index) => (
                                <button onClick={() => {switchCategory(item); setCategoryState(item);}} key={index} className={`${item === categoryState ? "bg-zinc-200/60" : "bg-transparent"} `}>
                                    <span className="text-lg capitalize">{item}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="w-full h-full overflow-y-scroll">
                        <div className="w-full h-auto">
                            <div className="flex flex-row flex-wrap">
                                {productState.map((item, index) => (
                                    <div key={index} className="w-[50%] h-auto flex justify-center items-center">
                                        <div className="w-[90%] h-auto flex flex-col items-center">
                                            <div className="w-full h-auto">
                                                <img src={item.image} alt={item.name} className="w-full h-full" />
                                            </div>
                                            <div className="w-full h-auto">
                                                <p className="text-center">{item.name}</p>
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