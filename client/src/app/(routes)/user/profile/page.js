'use client';

import Navbar from "@/app/_components/Navbar"
import Footer from "@/app/_components/Footer"
import { useState, useEffect } from "react";
import axios from "axios";

export default function ProfilePage() {
	const [user, setUser] = useState({
		id: "",
		name: "",
		surname: "",
		email: "",
		adress: "",
		country: "",
		town: "",
		mobile: "",
		zipCode: ""
	});

	const [item, setItem] = useState({
		name: "",
		price: 0,
		category: "",
		user: ""
	});
	
	useEffect(() => {
		axios.get('http://localhost:3001/userData', { withCredentials: true }).then(res => {
			const userData = res.data[0];
			setUser({
				...user,
				id: userData.korisnik_id,
				name: userData.ime,
				surname: userData.prezime,
				email: userData.email,
				adress: userData.adresa,
				country: userData.drzava,
				town: userData.grad,
				mobile: userData.mobitel,
				zipCode: userData.postanski_broj
			});
			item.user = userData.korisnik_id
		})
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
            const response = await axios.post("http://localhost:3001/setItem", item, { withCredentials: true })
        } catch (error) {
            console.log(error)
        }
	}
	return (
		<div>
			<Navbar></Navbar>
			<main className="flex flex-col min-h-screen items-center gap-[2rem] p-[3rem]">
				<div className="w-[80%] grid grid-cols-4 gap-4 border-solid border-2 p-3">
					<div className="p-3 col-span-1">
						<img className="rounded w-36 h-36" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="Profile Avatar"></img>
						<h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{user.name} {user.surname}</h1>
						<h3 className="text-gray-600 font-lg text-semibold leading-6">Registrirala se:</h3>
					</div>
					<div className="p-3 col-span-3">
						<div className="flex flex-row justify-between space-x-2 mb-[1rem] font-semibold text-2xl text-gray-900 leading-8">
							<div className="flex flex-row">
								<svg xmlns="http://www.w3.org/2000/svg" height="27" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
									<path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
								</svg>
								<span className="tracking-wide">Profil</span>
							</div>
							<div>
								<svg xmlns="http://www.w3.org/2000/svg" height="27" fill="currentColor" className="bi bi-pencil-square cursor-pointer" viewBox="0 0 16 16">
									<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
									<path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
								</svg>
							</div>
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
				<form onSubmit={handleSubmit}>
					<button type="submit">KLIKNI ME</button>
					<div>
						<select onChange={e => { setItem({ ...item, category: e.target.value }) }}>
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
					<input type="text" placeholder="naziv" className="border-solid border-black border-2" onChange={e => { setItem({ ...item, name: e.target.value }) }}></input>
					<br></br>
					<input type="text" placeholder="cijena" className="border-solid border-black border-2" onChange={e => { setItem({ ...item, price: e.target.value }) }}></input>

				</form>
				{/* 
				<div className="container mx-auto my-5 p-5 shadow-md">
					<div className="md:flex no-wrap md:-mx-2">
						<div className="w-full md:w-3/12 md:mx-2">
							<div className="p-3">
								<img className="rounded w-36 h-36" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="Profile Avatar"></img>
								<h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{user.name} {user.surname}</h1>
								<h3 className="text-gray-600 font-lg text-semibold leading-6">Registrirala se:</h3>
							</div>
						</div>
						<div className="w-full md:w-9/12 mx-2 h-64 text-lg">
							<div className="p-3">
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
				</div> */}
			</main >
			<Footer></Footer>
		</div >
	)
}
