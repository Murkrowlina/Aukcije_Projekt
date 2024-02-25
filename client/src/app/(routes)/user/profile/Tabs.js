import axios from "axios";
import Prodaj from "./Prodaj";

export default function Tabs({ user }) {
    const openTab = async (tabName) => {
        let tabs = document.getElementsByClassName("tab");
        for (let i = 0; i < tabs.length; i++) {
            tabs[i].style.display = "none";
        }
        document.getElementById(tabName).style.display = "flex";
    }

    const activeItems = async () => {
        document.getElementById("appendMyAuctions").innerHTML = "";
        try {
            const response = await axios.get("http://localhost:3001/activeItems", { params: user, withCredentials: true });
            for (let i = 0; i < response.data.length; i++) {
                const item = response.data[i];
                document.getElementById("appendMyAuctions").innerHTML +=
                    `
                        <div class="text-lg w-[80%]">
                            <div class="border-2 border-solid border-gray-300 rounded-[0.6rem]" key={index}>
                                <a href="../prodaja/oglas/${item.naziv.split(" ").join("-").split("/").join("-")}?predmet=${item.predmetID}"
                                    <div class="flex flex-col md:flex-row gap-3">
                                        <img src='http://localhost:3001/${item.slika}' alt="slika predmeta" class="rounded-l-lg w-[15rem] md:h-[180px]" />
                                        <div class="p-3 flex flex-col justify-between text-lg w-full">
                                            <div class="flex flex-row justify-between pr-5">
                                                <p>${item.naziv} - #${item.predmetID}</p>
                                                <p class="text-xl">Cijena: ${item.najvisaPonuda}€</p>
                                            </div>
                                            <div>
                                                <p>Završava za: ${item.stoperica}</p>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    `
            }
        } catch (error) {
            console.log(error);
        }
    };

    const expiredItems = async () => {
        document.getElementById("appendMyAuctions").innerHTML = "";
        try {
            const response = await axios.get("http://localhost:3001/expiredItems", { params: user, withCredentials: true });
            for (let i = 0; i < response.data.length; i++) {
                const item = response.data[i];
                const date = response.data[i].zavrsetak.split("T")
                const timer = date[1].split(".000Z");
                console.log(response.data[i].zavrsetak);

                document.getElementById("appendMyAuctions").innerHTML +=
                    `
                        <div class="text-lg w-[80%]">
                            <div class="border-2 border-solid border-gray-300 rounded-[0.6rem]" key={index}>
                                <div class="flex flex-col md:flex-row gap-3">
                                    <img src='http://localhost:3001/${item.slika}' class="rounded-l-lg w-[15rem] md:h-[180px]" />
                                    <div class="p-3 flex flex-col justify-between text-lg w-full">
                                        <div class="flex flex-row justify-between pr-5">
                                            <p>${item.naziv} - #${item.predmetID}</p>
                                            <p class="text-xl">Cijena: ${item.najvisaPonuda}€</p>
                                        </div>
                                        <div>
                                            <p>Završilo: ${date[0]} ${timer[0]}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `
            }
        } catch (error) {
            console.log(error);
        }
    };

    const soldItems = async () => {
        document.getElementById("appendMyAuctions").innerHTML = ""
        try {
            const response = await axios.get("http://localhost:3001/soldItems", { params: user, withCredentials: true });
            for (let i = 0; i < response.data.length; i++) {
                const item = response.data[i];
                const date = response.data[i].zavrsetak.split("T")
                const timer = date[1].split(".000Z");
                document.getElementById("appendMyAuctions").innerHTML +=
                    `
                        <div class="text-lg w-[80%]">
                            <div class="border-2 border-solid border-gray-300 rounded-[0.6rem]" key={index}>
                                <div class="flex flex-col md:flex-row gap-3">
                                    <img src='http://localhost:3001/${item.slika}' class="rounded-l-lg w-[15rem] md:h-[180px]" />
                                    <div class="p-3 flex flex-col justify-between text-lg w-full">
                                        <div class="flex flex-row justify-between pr-5">
                                            <p>${item.naziv} - #${item.predmetID}</p>
                                            <p class="text-xl">${item.najvisaPonuda}€</p>
                                        </div>
                                        <div>
                                            <p>Kupac: ${item.ime} ${item.prezime}</p>
                                            <p>Završilo: ${date[0]} ${timer[0]}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `
            }
        } catch (error) {
            console.log(error);
        }
    };

    const offeredItems = async () => {
        document.getElementById("appendOfferedAuctions").innerHTML = "";
        try {
            const response = await axios.get("http://localhost:3001/offeredItems", { params: user, withCredentials: true });
            for (let i = 0; i < response.data.length; i++) {
                const item = response.data[i];

                document.getElementById("appendOfferedAuctions").innerHTML +=
                    `
                        <div class="text-lg w-[80%]">
                            <div class="border-2 border-solid border-gray-300 rounded-[0.6rem]" key={index}>
                                <a href="../prodaja/oglas/${item.naziv.split(" ").join("-").split("/").join("-")}?predmet=${item.predmetID}"
                                    <div class="flex flex-col md:flex-row gap-3">
                                        <img src='http://localhost:3001/${item.slika}' class="rounded-l-lg w-[15rem] md:h-[180px]" />
                                        <div class="p-3 flex flex-col justify-between text-lg w-full">
                                            <div class="flex flex-row justify-between pr-5">
                                                <p>${item.naziv} - #${item.predmetID}</p>
                                                <p class="text-xl">Cijena: ${item.najvisaPonuda}€</p>
                                            </div>
                                            <div>
                                                <p>Završava za: ${item.stoperica}</p>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                        `
            }
        } catch (error) {
            console.log(error);
        }
    }

    const purchasedItems = async () => {
        document.getElementById("appendOfferedAuctions").innerHTML = "";
        try {
            const response = await axios.get("http://localhost:3001/purchasedItems", { params: user, withCredentials: true });
            for (let i = 0; i < response.data.length; i++) {
                const item = response.data[i];
                const date = response.data[i].zavrsetak.split("T")
                const timer = date[1].split(".000Z");

                document.getElementById("appendOfferedAuctions").innerHTML +=
                    `
                        <div class="text-lg w-[80%]">
                            <div class="border-2 border-solid border-gray-300 rounded-[0.6rem]" key={index}>
                                <div class="flex flex-col md:flex-row gap-3">
                                    <img src='http://localhost:3001/${item.slika}' class="rounded-l-lg w-[15rem] md:h-[180px]" />
                                    <div class="p-3 flex flex-col justify-between text-lg w-full">
                                        <div class="flex flex-row justify-between pr-5">
                                            <p>${item.naziv} - #${item.predmetID}</p>
                                            <p>Kupljeno za: ${item.najvisaPonuda}€</p>
                                        </div>
                                        <div>
                                            <p>Završilo: ${date[0]} ${timer[0]}</p>
                                            <p>Prodavatelj: ${item.ime} ${item.prezime}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="w-[80%]">
            <div className="border-b border-gray-200 dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                    <li onClick={() => openTab("sellItem")}>
                        <a className="cursor-pointer inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg group text-lg hover:bg-[#0f0e17] hover:text-[#e53170] text-black">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="23" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                            </svg>
                            <p className="ml-1">PRODAJ</p>
                        </a>
                    </li>
                    <li onClick={() => openTab("myAuctions")}>
                        <a className="cursor-pointer inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:bg-[#0f0e17] hover:text-[#e53170] text-black group text-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-tag-fill" viewBox="0 0 16 16">
                                <path d="M2 1a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l4.586-4.586a1 1 0 0 0 0-1.414l-7-7A1 1 0 0 0 6.586 1zm4 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                            </svg>
                            <p className="ml-1">Prodaja</p>
                        </a>
                    </li>
                    <li onClick={() => openTab("followingAuctions")}>
                        <a className="cursor-pointer inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:bg-[#0f0e17] hover:text-[#e53170] text-black group text-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-cart4" viewBox="0 0 16 16">
                                <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
                            </svg>
                            <p className="ml-1">Kupnja</p>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="pt-4">
                <div id="sellItem" className="tab hidden">
                    <Prodaj></Prodaj>
                </div>
                <div id="myAuctions" className="tab flex flex-row hidden text-lg gap-20">
                    <ul className="w-[20%] h-fit rounded-lg text-gray-800 border-2 border-gray-600 border-solid ">
                        <li className="bg-[#0f0e17] text-white py-3 px-2 border-b-[#0f0e17] border-b-2 border-solid rounded-sm">Moje aukcije</li>
                        <li className="cursor-pointer p-2 border-b-2 border-b-gray-600 border-solid rounded-sm hover:bg-gray-200" onClick={() => activeItems()}>Aktivni predmeti</li>
                        <li className="cursor-pointer p-2 border-b-2 border-b-gray-600 border-solid rounded-sm hover:bg-gray-200"
                            onClick={() => expiredItems()}>Istekli predmeti</li>
                        <li className="cursor-pointer p-2 rounded-sm hover:bg-gray-200" onClick={() => soldItems()}>Prodani predmeti</li>
                    </ul>
                    <div id="appendMyAuctions" className="w-full flex flex-col gap-2"></div>
                </div>
                <div id="followingAuctions" className="tab flex flex-row hidden text-lg gap-20">
                    <ul className="w-[20%] h-fit rounded-lg text-gray-800 border-2 border-gray-600 border-solid ">
                        <li className="bg-[#0f0e17] text-white py-3 px-2 border-b-[#0f0e17] border-b-2 border-solid rounded-sm">Aukcije</li>
                        <li className="cursor-pointer p-2 border-b-2 border-b-gray-600 border-solid rounded-sm hover:bg-gray-200"
                            onClick={() => offeredItems()}>Moje ponude</li>
                        <li className="cursor-pointer p-2 rounded-sm hover:bg-gray-200" onClick={() => purchasedItems()}>Kupljeni predmeti</li>
                    </ul>
                    <div id="appendOfferedAuctions" className="w-full flex flex-col gap-2"></div>
                </div>
            </div>
        </div>
    )
}
