'use client';

import Navbar from "@/app/_components/Navbar"
import Profile from "./Profile";
import Tabs from "./Tabs";
import Footer from "@/app/_components/Footer"
import axios from "axios";
import { useState, useEffect } from "react";

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

	useEffect(() => {
		axios.get('http://localhost:3001/userData', { withCredentials: true }).then(res => {
			const userData = res.data[0];
			setUser({
				...user,
				id: userData.korisnikID,
				name: userData.ime,
				surname: userData.prezime,
				email: userData.email,
				adress: userData.adresa,
				country: userData.drzava,
				town: userData.grad,
				mobile: userData.mobitel,
				zipCode: userData.postanskiBroj
			});
		})
	}, []);

	return (
		<div>
			<Navbar></Navbar>
			<main className="flex flex-col min-h-screen items-center gap-[2rem] p-[3rem]">
				<Profile user={user}></Profile>
				<Tabs user={user}></Tabs>
			</main >
			<Footer></Footer>
		</div >
	)
}
