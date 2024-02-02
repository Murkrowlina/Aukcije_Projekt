'use client'
import Footer from '@/app/_components/Footer'
import Navbar from '../../../_components/Navbar'
import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Register() {
    const router = useRouter();

    const [values, setValues] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        adress: "",
        country: "",
        town: "",
        mobile: "",
        zipCode: ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3001/register", values, { withCredentials: true })
            router.replace('/user/login')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <Navbar></Navbar>
            <main className="flex flex-col min-h-screen items-center gap-[2rem] p-[3rem]">
                <form className="flex flex-col gap-6 text-xl" onSubmit={handleSubmit}>
                    <div className="flex flex-row gap-6">
                        <div>
                            <label className="block">Ime *</label>
                            <input type="text" required className="block border-2 border-solid border-[#243837] rounded outline-none p-2 w-[14rem]" onChange={e => { setValues({ ...values, name: e.target.value }) }} />
                        </div>
                        <div>
                            <label className="block">Prezime *</label>
                            <input type="text" required className="block border-2 border-solid border-[#243837] rounded outline-none p-2 w-[14rem]" onChange={e => { setValues({ ...values, surname: e.target.value }) }} />
                        </div>
                    </div>
                    <div>
                        <label>Adresa *</label>
                        <input type="text" required className="block border-2 border-solid border-[#243837] rounded outline-none p-2 w-[30rem]" onChange={e => { setValues({ ...values, adress: e.target.value }) }} />
                    </div>
                    <div className="flex flex-row gap-6">
                        <div>
                            <label className="block">Država *</label>
                            <input type="text" required className="block border-2 border-solid border-[#243837] rounded outline-none p-2 w-[14rem]" onChange={e => { setValues({ ...values, country: e.target.value }) }} />
                        </div>
                        <div>
                            <label className="block">Grad *</label>
                            <input type="text" required className="block border-2 border-solid border-[#243837] rounded outline-none p-2 w-[14rem]" onChange={e => { setValues({ ...values, town: e.target.value }) }} />
                        </div>
                    </div>
                    <div className="flex flex-row gap-6">
                        <div>
                            <label className="block">Poštanski broj *</label>
                            <input type="text" required className="block border-2 border-solid border-[#243837] rounded outline-none p-2 w-[14rem]" onChange={e => { setValues({ ...values, zipCode: e.target.value }) }} />
                        </div>
                        <div>
                            <label className="block">Mobitel *</label>
                            <input type="text" required className="block border-2 border-solid border-[#243837] rounded outline-none p-2 w-[14rem]" onChange={e => { setValues({ ...values, mobile: e.target.value }) }} />
                        </div>
                    </div>
                    <div>
                        <label>E-mail adresa *</label>
                        <input type="email" required className="block border-2 border-solid border-[#243837] rounded outline-none p-2 w-[30rem]" onChange={e => { setValues({ ...values, email: e.target.value }) }} />
                    </div>
                    <div>
                        <label>Lozinka *</label>
                        <input type="password" required className="block border-2 border-solid border-[#243837] rounded outline-none p-2 w-[30rem]" onChange={e => { setValues({ ...values, password: e.target.value }) }} />
                    </div>
                    <button type="submit" className='bg-[#0f0e17] text-white hover:bg-[#e53170] hover:text-[#0f0e17] p-2'>Registriraj se</button>
                </form>
            </main>
            <Footer></Footer>
        </div>
    )
}
