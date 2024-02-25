
import { useState } from "react"
import Navbar from "@/app/_components/Navbar";
import Footer from "@/app/_components/Footer";
import axios from "axios";

export default function Prodaj() {
    const [item, setItem] = useState({
        name: "",
        description: "",
        bid: 0,
        category: "",
        duration: ""
    });

    const [image, setImage] = useState({
        preview: '',
        raw: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        let formData = new FormData();
        for (const key in item) {
            formData.append(key, item[key]);
        }
        await formData.append('image', image.raw);

        try {
            const response = await axios.post("http://localhost:3001/setItem", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }, withCredentials: true
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handlePhotoChange = (e) => {
        if (e.target.files.length) {
            setImage({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0],
            });
        }
    };

    return (
        <div className="w-full">
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-10 w-full text-lg">
                <div className="flex flex-col gap-5 bg-gray-200 p-5 rounded w-full">
                    <p className="text-xl font-bold text-gray-600">Kategorija</p>
                    <select onChange={e => { setItem({ ...item, category: e.target.value }) }} className="p-3 bg-white text-md border border-gray-400">
                        <option value="0">Odaberite kategoriju</option>
                        <option value="1">Audio, video, foto</option>
                        <option value="2">Filatelija</option>
                        <option value="3">Film i glazba</option>
                        <option value="4">Graditeljstvo i alati</option>
                        <option value="5">Knjige i tisak</option>
                        <option value="6">Kolekcionarstvo</option>
                        <option value="7">Kozmetika i zdravlje</option>
                        <option value="8">Kuća, ured i vrt</option>
                        <option value="9">Numizmatika</option>
                        <option value="10">Odjevni predmeti</option>
                        <option value="11">Računala</option>
                        <option value="12">Satovi i nakit</option>
                        <option value="13">Sport</option>
                        <option value="14">Sve za djecu</option>
                        <option value="15">Telekomunikacija</option>
                        <option value="16">Umjetnine</option>
                    </select>
                </div>
                <div className="flex flex-col gap-5 bg-gray-200 p-5 rounded w-full">
                    <p className="text-xl font-bold text-gray-600">Detalji predmeta</p>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="naziv" className="font-bold block text-gray-600 cursor-text text-md leading-[140%]">Naziv predmeta</label>
                        <input type="text" required id="naziv" onChange={e => { setItem({ ...item, name: e.target.value }) }} className="rounded border border-gray-400 text-lg leading-[18px] p-[11px]"></input>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="font-bold block text-gray-600 cursor-text text-md leading-[140%]">Opis predmeta</label>
                        <textarea rows="10" onChange={e => { setItem({ ...item, description: e.target.value }) }} className="rounded border border-gray-400 text-lg leading-[18px] p-[11px]"></textarea>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="cijena" className="font-bold block text-gray-600 cursor-text text-md leading-[140%]">Početna cijena <span className="text-red-600">(upisujete u EUR / €)</span></label>
                        <input type="number" required step=".01" min="0" id="cijena" onChange={e => { setItem({ ...item, bid: e.target.value }) }} className="rounded border border-gray-400 text-lg leading-[18px] p-[11px] w-fit"></input>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="vrijeme" className="font-bold block text-gray-600 cursor-text text-md leading-[140%]">Istječe za: <span className="text-red-600">(u satu)</span></label>
                        <input type="number" required step="0" min="0" id="vrijeme" onChange={e => { setItem({ ...item, duration: e.target.value }) }} className="rounded border border-gray-400 text-lg leading-[18px] p-[11px] w-fit"></input>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="image" className="font-bold block text-gray-600 cursor-text text-md leading-[140%]">Slika proizvoda:</label>
                        <input type="file" required onChange={handlePhotoChange} id="image" name="image" accept="image/png, image/jpeg, image/jpg" />
                    </div>
                </div>
                <button type="submit" value="dalje" className="bg-[#0f0e17] text-white hover:bg-[#e53170] p-2 rounded-lg">POSTAVI NA AUKCIJE</button>
            </form>
        </div>
    )
}
