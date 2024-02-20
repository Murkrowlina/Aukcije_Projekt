"use client"
import Navbar from "@/app/_components/Navbar"
import Footer from "@/app/_components/Footer"
import Tabs from "@/app/_components/Tabs"
import { useSearchParams } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import axios from "axios"
import Link from "next/link"

export default function page() {
    const searchParams = useSearchParams();
    const search = searchParams.get("categoryID")
    const [itemArray, setItemArray] = useState([]);
    const enter = useRef(false);

    useEffect(() => {
        const fetchItems = async () => {
            if (!enter.current) return ;

            try {
                const response = await axios.get("http://localhost:3001/listItems", { params: { categoryID: search } }, { withCredentials: true })
                for (var i = 0; i < response.data.length; i++) {
                    const itemData = response.data[i];
                    setItemArray(
                        itemArray => [...itemArray,
                        {
                            id: itemData.predmetID,
                            name: itemData.naziv,
                            description: itemData.opis,
                            bid: itemData.pocetnaCijena,
                            category: itemData.kategorijaID,
                            image: "http://localhost:3001/" + itemData.slika,
                            timer: itemData.stoperica
                        }
                        ])
                }
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchItems()
        enter.current = true;
    }, [])


    return (
        <div>
            <Navbar></Navbar>
            <main className='flex min-h-screen flex-col items-center gap-[2rem] p-[3rem]'>
                <div className="container mx-10 my-5 p-5">
                    <div className="text-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                        {itemArray.map((item, index) => {
                            return (
                                <div className="col-span-2 border-2 border-solid rounded-[0.6rem]" key={index}>
                                    <Link href={{
                                        pathname: `oglas/${item.name.split(" ").join("-")}`,
                                        query: `predmet=${item.id}`
                                    }}>
                                        <div className="flex flex-col md:flex-row gap-3">
                                            <img src={item.image} className="rounded-l-lg w-[15rem] md:h-[180px]" />
                                            <div className="p-3 flex flex-col justify-between text-lg">
                                                <div className="flex flex-row justify-between">
                                                    <p>{item.name}</p>
                                                </div>
                                                <div>
                                                    <p>{item.bid}€</p>
                                                    <p>{item.timer}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </main>
            <Footer></Footer>
        </div>
    )
}
