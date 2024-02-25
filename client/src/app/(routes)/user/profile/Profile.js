import Image from 'next/image';
import ProfileAvatar from '../../../../../public/profile.png'; 

export default function Profile({ user }) {
    return (
        <div className="lg:w-[60%] grid grid-cols-1 md:grid-cols-4 items-center border-solid border-2 p-3">
            <div className="p-3 col-span-1 flex flex-col items-center">
                <Image src={ProfileAvatar} alt="Profile Avatar" className="rounded w-36 h-36"></Image>
                <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{user.name} {user.surname}</h1>
            </div>
            <div className="p-3 col-span-3 text-lg">
                <div className="text-gray-700">
                    <div class="grid grid-cols-1 md:grid-cols-2">
                        <div class="flex flex-row">
                            <p class="px-4 py-2 font-semibold">Ime</p>
                            <p class="px-4 py-2">{user.name}</p>
                        </div>
                        <div class="flex flex-row">
                            <div class="px-4 py-2 font-semibold">Prezime</div>
                            <div class="px-4 py-2">{user.surname}</div>
                        </div>
                        <div class="flex flex-row">
                            <div class="px-4 py-2 font-semibold">Email.</div>
                            <div class="px-4 py-2">
                                <a class="text-blue-800" href="mailto:{user.email}">{user.email}</a>
                            </div>
                        </div>
                        <div class="flex flex-row">
                            <div class="px-4 py-2 font-semibold">Mobitel</div>
                            <div class="px-4 py-2">{user.mobile}</div>
                        </div>
                        <div class="flex flex-row">
                            <div class="px-4 py-2 font-semibold">Država</div>
                            <div class="px-4 py-2">{user.country}</div>
                        </div>
                        <div class="flex flex-row">
                            <div class="px-4 py-2 font-semibold">Grad</div>
                            <div class="px-4 py-2">{user.town}</div>
                        </div>
                        <div class="flex flex-row">
                            <div class="px-4 py-2 font-semibold">Adresa</div>
                            <div class="px-4 py-2">{user.adress}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
