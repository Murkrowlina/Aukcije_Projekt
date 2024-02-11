"use client"
import Navbar from "@/app/_components/Navbar"
import Footer from "@/app/_components/Footer"
import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import axios from "axios"

export default function page() {
    const searchParams = useSearchParams();
    const search = searchParams.get("categoryID")

    const [item, setItem] = useState({
        name: "",
        description: "",
        starting_bid: 0,
        category: ""
    });

    useEffect(() => {
        axios.get("http://localhost:3001/listItems", { params: { categoryID: search } }, { withCredentials: true }).then(res => {
            // const itemData = res.data[0];
            // setItem({
            // 	...item,
            // 	name: itemData.naziv,
            // 	description: itemData.opis,
            //     starting_bid: itemData.pocetna_cijena,
            //     category: itemData.kategorija_id
            // });
            // console.log(itemData)
            console.log(res)
        }).catch((error) => console.log(error));
    }, []);

    return (
        <div>
            <Navbar></Navbar>
            <main className='flex min-h-screen flex-col items-center gap-[2rem] p-[3rem]'>
                <div className="container mx-10 my-5 p-5">
                    <div className="text-lg grid grid-cols-4 gap-10">
                        <div className="flex flex-row gap-3 col-span-2 h-[180px] border-2 border-solid rounded-[0.6rem]">
                            <img src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D" className="rounded-l-lg" />
                            <div className="p-3 flex flex-col justify-between">
                                <p>Naziv proizvoda</p>
                                <div>
                                    <p>Završava za:</p>
                                    <p>Cijena proizvoda</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer></Footer>
        </div>
    )
}
