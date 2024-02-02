'use client'

import Navbar from '../../../_components/Navbar'
import Footer from '@/app/_components/Footer'
import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Login() {
    const router = useRouter()

    const [values, setValues] = useState({
        email: "",
        password: "",
        eye: false
    });

    axios.defaults.withCredentials = true;
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3001/login", values, { withCredentials: true });
            if (response.data === true) {
                router.replace(`/`)
            }
            else if (response.data.Error === 'No email exists.') {
                document.getElementById('status').innerText = "EMAIL NE POSTOJI.";
            }
            else if (response.data.Error === 'Password not matched.') {
                document.getElementById('status').innerText = "KRIVA ŠIFRA.";
            }
        } catch (error) {
            console.log(error)
        }
    }

    const showPassword = () => {
        if (values.eye === false) {
            document.getElementById('eye').innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" height="25" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                </svg>
            `;
            setValues({ ...values, eye: true })
        }
        else {
            document.getElementById('eye').innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" height="25" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                    <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                </svg>
            `;
            setValues({ ...values, eye: false })
        }
    }

    return (
        <div>
            <Navbar></Navbar>
            <main>
                <div className="flex min-h-screen flex-col items-center gap-[2rem] p-[3rem]">
                    <p className="text-2xl font-extrabold text-rose-600" id="status"></p>
                    <form className="flex flex-col gap-6 text-xl" onSubmit={handleSubmit}>
                        <div className='w-[30rem] flex flex-row border-solid border-[#0f0e17] border-[3px] text-[1.5rem] rounded'>
                            <span className="bg-[#0f0e17] p-4 text-white cursor-default">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                                </svg>
                            </span>
                            <input type="email" required className="outline-none p-2 w-[30rem]" onChange={e => { setValues({ ...values, email: e.target.value }) }} />
                        </div>
                        <div className='w-[30rem] flex flex-row border-solid border-[#0f0e17] border-[3px] text-[1.5rem] rounded'>
                            <span className="bg-[#0f0e17] p-4 text-white cursor-default">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 24 24" width="30" fill="currentColor">
                                    <path d="M8.612 16.337l3.746-3.747 1.027.183a5 5 0 1 0-4.039-4.039l.184 1.028-6.994 6.994.177 2.651 2.651.177 1.833-1.833-.707-.707a1 1 0 0 1 1.415-1.414l.707.707zm.707-13.435a7 7 0 1 1 3.715 11.84L6.137 21.64l-4.43-.295a1 1 0 0 1-.932-.932l-.295-4.43 6.898-6.898a6.992 6.992 0 0 1 1.94-6.183zm4.242 5.656A2 2 0 1 1 16.39 5.73a2 2 0 0 1-2.829 2.828z"></path>
                                </svg>
                            </span>
                            <input type={values.eye ? 'text' : 'password'} required className="outline-none p-2 w-[30rem]" onChange={e => { setValues({ ...values, password: e.target.value }) }} />
                            <div className="flex p-2 items-center">
                                <label className="text-2xl" id="eye" onClick={showPassword}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="25" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                                        <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                                        <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                                        <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                                    </svg>
                                </label>
                            </div>
                        </div>
                        <div className='flex flex-row justify-between'>
                            <button type="submit" className='bg-[#0f0e17] text-white hover:bg-[#e53170] hover:text-[#0f0e17] p-2 rounded-lg'>PRIJAVA</button>
                            <button className='bg-[#0f0e17] text-white hover:bg-[#e53170] hover:text-[#0f0e17] p-2 rounded-lg'><Link href="register">REGISTRIRAJ SE</Link></button>
                        </div>
                    </form>
                </div>
            </main>
            <Footer></Footer>
        </div>
    )
}
