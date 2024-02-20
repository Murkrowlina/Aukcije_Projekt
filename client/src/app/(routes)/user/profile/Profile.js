export default function Profile({ user }) {

    return (
        <div className="w-[80%] grid grid-cols-1 md:grid-cols-4 gap-4 border-solid border-2 p-3">
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
                </div>
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
