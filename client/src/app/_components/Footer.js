import Logo from '../../../public/logo.png';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-[#0f0e17] text-[1.2rem] w-full box-border py-[2rem] px-[10rem] flex flex-col gap-6 bottom-0">
            <div>
                <Link href="/"><Image src={Logo} alt="Logo Aukcije" className="w-auto h-[7rem]"></Image></Link>
            </div>
            <p className='text-[#a7a9be]'>Nikolina Vulić</p>
        </footer>
    )
}
