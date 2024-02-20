import axios from "axios";
import Link from "next/link";

export default function Tabs() {
    const openTab = (tabName) => {
        let tabs = document.getElementsByClassName("tab");
        for (let i = 0; i < tabs.length; i++) {
            tabs[i].style.display = "none";
        }
        document.getElementById(tabName).style.display = "flex";
    }

    const activeItems = async () => {
        try {
            const response = await axios.get("http://localhost:3001/activeItems", { withCredentials: true });
            document.getElementById("append").innerHTML = response.data.map(item => (
                `
                <div class="text-lg w-[50%]">
                    <div class="border-2 border-solid rounded-[0.6rem]" key={index}>
                        <a href="../prodaja/oglas/${item.naziv.split(" ").join("-")}?predmet=${item.predmetID}"
                            <div class="flex flex-col md:flex-row gap-3">
                                <img src='http://localhost:3001/${item.slika}' class="rounded-l-lg w-[15rem] md:h-[180px]" />
                                <div class="p-3 flex flex-col justify-between text-lg">
                                    <div class="flex flex-row justify-between">
                                        <p>${item.naziv} - #${item.predmetID}</p>
                                    </div>
                                    <div>
                                        <p>${item.najvisaPonuda}€</p>
                                        <p>Završava za: ${item.stoperica}</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                `
            )).join("")
        } catch (error) {
            console.log(error);
        }
    };

    const expiredItems = async () => {
        try {
            const response = await axios.get("http://localhost:3001/expiredItems", { withCredentials: true });
            document.getElementById("append").innerHTML = response.data.map(item => (
                `
                <div class="text-lg w-[50%]">
                    <div class="border-2 border-solid rounded-[0.6rem]" key={index}>
                        <a href="../prodaja/oglas/${item.naziv.split(" ").join("-")}?predmet=${item.predmetID}"
                            <div class="flex flex-col md:flex-row gap-3">
                                <img src='http://localhost:3001/${item.slika}' class="rounded-l-lg w-[15rem] md:h-[180px]" />
                                <div class="p-3 flex flex-col justify-between text-lg">
                                    <div class="flex flex-row justify-between">
                                        <p>${item.naziv} - #${item.predmetID}</p>
                                    </div>
                                    <div>
                                        <p>${item.najvisaPonuda}€</p>
                                        <p>Završava za: ${item.stoperica}</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                `
            )).join("")
        } catch (error) {
            console.log(error);
        }
    };

    const soldItems = async () => {
        document.getElementById("append").innerHTML = ""
        try {
            const response = await axios.get("http://localhost:3001/soldItems", { withCredentials: true });
            for (let i = 0; i < response.data.length; i++) {
                const item = response.data[i];

                document.getElementById("append").innerHTML +=
                    `
                        <div class="text-lg w-[50%]">
                            <div class="border-2 border-solid rounded-[0.6rem]" key={index}>
                                <a href="../prodaja/oglas/${item.naziv.split(" ").join("-")}?predmet=${item.predmetID}"
                                    <div class="flex flex-col md:flex-row gap-3">
                                        <img src='http://localhost:3001/${item.slika}' class="rounded-l-lg w-[15rem] md:h-[180px]" />
                                        <div class="p-3 flex flex-col justify-between text-lg">
                                            <div class="flex flex-row justify-between">
                                                <p>${item.naziv} - #${item.predmetID}</p>
                                            </div>
                                            <div>
                                                <p>${item.najvisaPonuda}€</p>
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

    return (
        <div className="w-[80%]">
            <div className="border-b border-gray-200 dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                    <li>
                        <Link
                            href="/prodaja/opis" className="cursor-pointer inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg group text-lg hover:bg-[#0f0e17] hover:text-[#e53170] text-black">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="23" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                            </svg>
                            <p className="ml-1">PRODAJ</p>
                        </Link>
                    </li>
                    <li onClick={() => openTab("sale")}>
                        <a className="cursor-pointer inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:bg-[#0f0e17] hover:text-[#e53170] text-black group text-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-tag-fill" viewBox="0 0 16 16">
                                <path d="M2 1a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l4.586-4.586a1 1 0 0 0 0-1.414l-7-7A1 1 0 0 0 6.586 1zm4 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                            </svg>
                            <p className="ml-1">Prodaja</p>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="pt-4">
                <div id="profile" className="tab hidden"></div>
                <div id="sale" className="tab flex flex-row hidden text-lg gap-20">
                    <ul className="w-[20%] rounded-lg text-gray-800 border-2 border-gray-600 border-solid ">
                        <li className="bg-[#0f0e17] text-white py-3 px-2 border-b-[#0f0e17] border-b-2 border-solid rounded-sm">Moje aukcije</li>
                        <li className="cursor-pointer p-2 border-b-2 border-b-gray-600 border-solid rounded-sm hover:bg-gray-200" onClick={() => activeItems()}>Aktivni predmeti</li>
                        <li className="cursor-pointer p-2 border-b-2 border-b-gray-600 border-solid rounded-sm hover:bg-gray-200"
                            onClick={() => expiredItems()}>Istekli predmeti</li>
                        <li className="cursor-pointer p-2 rounded-sm hover:bg-gray-200" onClick={() => soldItems()}>Prodani predmeti</li>
                    </ul>
                    <div id="append" className="w-full flex flex-col gap-2"></div>
                </div>
            </div>
        </div>
    )
}
