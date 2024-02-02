'use client';

import Navbar from "@/app/_components/Navbar"
import Footer from "@/app/_components/Footer"
import { useState, useEffect } from "react";
import axios from "axios";

export default function ProfilePage() {
	const [user, setUser] = useState({
		name: "",
		surname: "",
		email: "",
		adress: "",
		country: "",
		town: "",
		mobile: "",
		zipCode: ""
	});

	useEffect(() => {
		axios.get('http://localhost:3001/userData', { withCredentials: true }).then(res => {
			const userData = res.data[0];
			setUser({
				...user,
				name: userData.name,
				surname: userData.surname,
				email: userData.email,
				adress: userData.adress,
				country: userData.country,
				town: userData.town,
				mobile: userData.mobile,
				zipCode: userData.zipCode
			});
		})
	}, [])

	return (
		<div>
			<Navbar></Navbar>
			<main className="flex flex-col min-h-screen items-center gap-[2rem] p-[3rem]">
				<div className="container mx-auto my-5 p-5">
					<div className="md:flex no-wrap md:-mx-2">
						<div className="w-full md:w-3/12 md:mx-2">
							<div className="p-3 shadow-sm">
								<img className="rounded w-36 h-36" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="Profile Avatar"></img>
								<h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{user.name} {user.surname}</h1>
								<h3 className="text-gray-600 font-lg text-semibold leading-6">Owner at Her Company Inc.</h3>
								<p className="text-sm text-gray-500 hover:text-gray-600 leading-6">Lorem ipsum dolor sit amet
									consectetur adipisicing elit.
									Reprehenderit, eligendi dolorum sequi illum qui unde aspernatur non deserunt</p>
								<ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
									<li className="flex items-center py-3">
										<span>Status</span>
										<span className="ml-auto"><span
											className="bg-green-500 py-1 px-2 rounded text-white text-sm">Active</span></span>
									</li>
									<li className="flex items-center py-3">
										<span>Member since</span>
										<span className="ml-auto">Nov 07, 2016</span>
									</li>
								</ul>
							</div>
						</div>
						<div className="w-full md:w-9/12 mx-2 h-64 text-lg">
							<div className="p-3 shadow-sm rounded-sm">
								<div className="flex items-center space-x-2 mb-[1rem] font-semibold text-2xl text-gray-900 leading-8">
									<span clas="text-green-500">
										<svg xmlns="http://www.w3.org/2000/svg" height="27" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
											<path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
										</svg>
									</span>
									<span className="tracking-wide">Profil</span>
								</div>
								<div className="text-gray-700">
									<div className="grid md:grid-cols-2">
										<div className="grid grid-cols-2">
											<div className="px-4 py-2 font-semibold">Ime</div>
											<div className="px-4 py-2">{user.name}</div>
										</div>
										<div className="grid grid-cols-2">
											<div className="px-4 py-2 font-semibold">Prezime</div>
											<div className="px-4 py-2">{user.surname}</div>
										</div>
										<div className="grid grid-cols-2">
											<div className="px-4 py-2 font-semibold">Email.</div>
											<div className="px-4 py-2">
												<a className="text-blue-800" href="mailto:{user.email}">{user.email}</a>
											</div>
										</div>
										<div className="grid grid-cols-2">
											<div className="px-4 py-2 font-semibold">Mobitel</div>
											<div className="px-4 py-2">{user.mobile}</div>
										</div>
										<div className="grid grid-cols-2">
											<div className="px-4 py-2 font-semibold">Država</div>
											<div className="px-4 py-2">{user.country}</div>
										</div>
										<div className="grid grid-cols-2">
											<div className="px-4 py-2 font-semibold">Grad</div>
											<div className="px-4 py-2">{user.town}</div>
										</div>
										<div className="grid grid-cols-2">
											<div className="px-4 py-2 font-semibold">Adresa</div>
											<div className="px-4 py-2">{user.adress}</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main >
			<Footer></Footer>
		</div >
	)
}
