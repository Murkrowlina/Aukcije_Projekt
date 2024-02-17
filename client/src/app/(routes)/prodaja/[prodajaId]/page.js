"use client"
import Navbar from "@/app/_components/Navbar"
import Footer from "@/app/_components/Footer"
import { useSearchParams } from "next/navigation"
import { useState, useRef } from "react"
import axios from "axios"

export default function page() {
    const searchParams = useSearchParams();
    const search = searchParams.get("categoryID")
    const [itemArray, setItemArray] = useState([]);
    const enter = useRef(true);

    const fetchItems = async () => {
        try {
            const response = await axios.get("http://localhost:3001/listItems", { params: { categoryID: search } }, { withCredentials: true })
            console.log(response.data)
            for (var i = 0; i < response.data.length; i++) {
                const itemData = response.data[i];
                setItemArray(
                    itemArray => [...itemArray,
                    {
                        name: itemData.naziv,
                        description: itemData.opis,
                        starting_bid: itemData.pocetna_cijena,
                        category: itemData.kategorija_id,
                        image: "http://localhost:3001/" + itemData.slika
                    }])
            }
            return response;
        }
        catch (error) {
            console.log(error)
        }
    }

    if (enter.current === true) {
        fetchItems()
        enter.current = false;
    }

    return (
        <div>
            <Navbar></Navbar>
            <main className='flex min-h-screen flex-col items-center gap-[2rem] p-[3rem]'>
                <div className="container mx-10 my-5 p-5">
                    <div className="text-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                        {itemArray.map((item, index) => {
                            return (
                                <div className="flex flex-col md:flex-row gap-3 col-span-2 md:h-[180px] border-2 border-solid rounded-[0.6rem]">
                                    <img src={item.image} className="rounded-l-lg" />
                                    <div className="p-3 flex flex-col justify-between text-lg">
                                        <div className="flex flex-row justify-between">
                                            <p>{item.name}</p>
                                        </div>
                                        <div>
                                            <p>{item.starting_bid}€</p>
                                            <p>(vrijeme)</p>
                                        </div>
                                    </div>
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
