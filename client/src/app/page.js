'use client'

import Navbar from './_components/Navbar.js';
import Footer from './_components/Footer.js';
import SearchBar from './_components/SearchBar.js';
import CarouselItems from './_components/CarouselItems.js';
import Tabs from './_components/Tabs.js';

export default function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <main className='flex min-h-screen flex-col items-center gap-[2rem] p-[3rem]'>
        <SearchBar></SearchBar>
        <CarouselItems></CarouselItems>
        <Tabs></Tabs>
      </main>
      <Footer></Footer>
    </div>
  )
}
