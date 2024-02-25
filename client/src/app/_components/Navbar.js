"use client"

import Logo from '../../../public/logo.png';
import Logo_Hover from '../../../public/logo_hover.png';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import axios from 'axios';

export default function Navbar() {
    const router = useRouter()
    const [isHovering, setIsHovered] = useState(false);
    const onMouseEnter = () => setIsHovered(true);
    const onMouseLeave = () => setIsHovered(false);

    const [auth, setAuth] = useState(false);
    useEffect(() => {
        axios.get('http://localhost:3001/auth', { withCredentials: true }).then(res => {
            if (res.data.Status === 'Success') {
                setAuth(true)
            }
            else {
                setAuth(false)
            }
        })
    }, [])

    const logout = async () => {
        try {
            await axios.get("http://localhost:3001/logout", { withCredentials: true })
            router.replace(`/user/login`)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <nav className="bg-[#0f0e17] text-white text-[1.2rem] z-[1000]">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div>
                    <Link href="/" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                        {isHovering ? (
                            <Image src={Logo_Hover} alt="Logo Aukcije" className="w-full h-[2.3rem]"></Image>
                        ) : (
                            <Image src={Logo} alt="Logo Aukcije" className="w-full h-[2.3rem]"></Image>
                        )}
                    </Link>
                </div>

                <div className="" id="navbar-default">
                    <ul className="flex p-0 flex-row space-x-8 rtl:space-x-reverse mt-0">
                        {
                            auth ? (
                                <>
                                    <li>
                                        <Link href="/user/profile">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-person-circle hover:text-[#e53170]" viewBox="0 0 16 16">
                                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                                            </svg>
                                        </Link>
                                    </li>
                                    <li>
                                        <button onClick={logout}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-box-arrow-right hover:text-[#e53170]" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
                                                <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                                            </svg>
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <li>
                                    <Link href="/user/login" className="flex flex-row gap-[5px] hover:text-[#e53170]">
                                        PRIJAVA
                                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-door-open" viewBox="0 0 16 16">
                                            <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1" />
                                            <path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117M11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5M4 1.934V15h6V1.077z" />
                                        </svg>
                                    </Link>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
        </nav >
    )
}