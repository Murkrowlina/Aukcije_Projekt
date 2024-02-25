import axios from "axios"

export default function Tabs() {
    const openTab = async (tabName) => {
        let tabs = document.getElementsByClassName("tab");
        for (let i = 0; i < tabs.length; i++) {
            tabs[i].style.display = "none";
        }
        document.getElementById(tabName).style.display = "flex";

        try {
            const response = await axios.get(`http://localhost:3001/${tabName}Items`, { withCredentials: true });
            document.getElementById(tabName).innerHTML = response.data.map(item => (
                `
                <div class="text-lg w-[40%]">
                    <div class="border-2 border-solid border-gray-300 rounded-[0.6rem]" key={index}>
                        <a href="../prodaja/oglas/${item.naziv.split(" ").join("-").split("/").join("-")}?predmet=${item.predmetID}"
                            <div class="flex flex-col md:flex-row gap-2">
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
    }

    return (
        <div className="w-[80%]">
            <div className="border-b border-gray-300">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500">
                    <li onClick={() => openTab("new")}>
                        <a className="cursor-pointer inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:bg-[#0f0e17] hover:text-[#e53170] text-black group text-lg">
                            <p className="ml-1">Najnovije</p>
                        </a>
                    </li>
                    <li onClick={() => openTab("ending")}>
                        <a className="cursor-pointer inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:bg-[#0f0e17] hover:text-[#e53170] text-black group text-lg">
                            <p className="ml-1">Završava</p>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="pt-4">
                <div id="new" className="tab flex-row flex-wrap hidden text-lg gap-5">
                </div>
                <div id="ending" className="tab flex-row flex-wrap hidden text-lg gap-5">
                </div>
            </div>
        </div>
    )
}
