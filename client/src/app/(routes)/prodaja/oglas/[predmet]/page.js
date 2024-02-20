"use client"
import Footer from "@/app/_components/Footer"
import Navbar from "@/app/_components/Navbar"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import axios from "axios"

export default function itemInformation() {
    const searchParams = useSearchParams();
    const search = searchParams.get("predmet");
    const [item, setItem] = useState([]);
    const [bid, setBid] = useState({
        bidding: 0,
        itemID: 0,
        biggestBidder: ""
    });
    const [intervalActive, setIntervalActivity] = useState(false);

    useEffect(() => {
        if (!intervalActive) {
            const interval = setInterval(async () => {
                try {
                    const response = await axios.get("http://localhost:3001/getItem", { params: { predmetID: search } }, { withCredentials: true })
                    const itemData = response.data[0];
                    setItem([
                        {
                            id: itemData.predmetID,
                            name: itemData.naziv,
                            description: itemData.opis,
                            bid: itemData.najvisaPonuda,
                            image: "http://localhost:3001/" + itemData.slika,
                            expiration_date: `${itemData["YEAR(zavrsetak)"]}-${itemData["MONTH(zavrsetak)"]}-${itemData["DAY(zavrsetak)"]}  ${itemData["TIME(zavrsetak)"]}`,
                            timer: `${itemData["HOUR(stoperica)"]}:${itemData["MINUTE(stoperica)"]}:${itemData["SECOND(stoperica)"]}`,
                            category: itemData.kategorijaID,
                            buyer: itemData.ponudac,
                            seller: `${itemData.ime} ${itemData.prezime}`
                        }]);
                    setBid({ ...bid, itemID: itemData.predmetID })
                }
                catch (error) {
                    console.log(error)
                }
            }, 1000);

            setIntervalActivity(true);

            return () => {
                clearInterval(interval);
                setIntervalActivity(false);
            }
        }
    }, [search])

    const updateBid = () => {
        bid.bidding = document.getElementById('bid').value
    
        axios.post("http://localhost:3001/updateBid", { bid }, { withCredentials: true })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const zoomImage = (zoom) => {
        if (zoom == false) return document.getElementById("zoomedImage").classList.add("hidden");
        document.getElementById("zoomedImage").classList.remove("hidden")
    }

    return (
        <div>
            <Navbar></Navbar>
            <main className='flex min-h-screen flex-col items-center gap-[2rem] p-[3rem]'>
                <div className="container mx-10 my-5 p-5 w-[100%] sm:w-[80%] md:w-[70%] lg:w-[60%] 2xl:w-[70%]">
                    {item.map((item, index) => {
                        return (
                            <div key={index} className="flex flex-col gap-3 relative">
                                <div className="hidden w-full h-full top-0 left-0 fixed z-50 bg-black/70 p-[10rem]" id="zoomedImage">
                                    <img src={item.image} onClick={e => { zoomImage(false) }} className="cursor-zoom-out h-[600px] w-full object-contain"></img>
                                </div>
                                <p className="text-2xl">{item.name}</p>
                                <div className="flex flex-row gap-3">
                                    <div className="flex flex-col p-2">
                                        <p className="text-gray-600 cursor-text text-[16px] leading-[140%]">BROJ PREDMETA:</p>
                                        <p className="font-bold cursor-text text-[16px] leading-[140%]">#{item.id}</p>
                                    </div>
                                    <span className="border-solid border-r"></span>
                                    <div className="flex flex-col p-2">
                                        <p className="text-gray-600 cursor-text text-[16px] leading-[140%]">ZAVRŠAVA:</p>
                                        <p className="font-bold cursor-text text-[16px] leading-[140%]">{item.expiration_date} {item.expiration_time}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col md:flex-row space-y-10 md:space-y-0 md:space-x-32">
                                    <div className="h-[400px] w-full md:w-[500px] overflow-hidden relative border-solid border-2 bg-slate-50">
                                        <img src={item.image} onClick={e => { zoomImage(true) }} className="cursor-zoom-in h-[400px] w-[100%] md:w-[500px] object-contain"></img>
                                    </div>
                                    <div className="flex flex-col gap-5 text-lg">
                                        <div className="text-2xl w-[10rem] mb-4 bg-[#0f0e17] text-white p-2 rounded-lg">
                                            <p>Ponuda: {item.bid} €</p>
                                        </div>
                                        <div className="flex flex-row justify-between gap-3">
                                            <p>Završava za:</p>
                                            <p>{item.timer}</p>
                                        </div>
                                        <span className="border-b-2 border-solid"></span>
                                        <div className="flex flex-row justify-between gap-3">
                                            <p>Najviši ponuđač:</p>
                                            <p>{item.buyer}</p>
                                        </div>
                                        <span className="border-b-2 border-solid"></span>
                                        <div className="flex flex-row gap-4">
                                            <input type="number" id="bid" className="p-2 border-solid border-[#0f0e17] border-2 w-[10rem]"></input>
                                            <button onClick={updateBid} className="bg-[#0f0e17] text-white p-2 px-[2rem] rounded-full">Unesite ponudu</button>
                                        </div>
                                        <div className="flex flex-row justify-between gap-3">
                                            <p>Prodavatelj:</p>
                                            <p>{item.seller}</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-lg font-bold">Opis predmeta</p>
                                    <p className="p-2 text-lg">{item.description}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </main>
            <Footer></Footer>
        </div>
    )
}
