export default function SearchBar() {
  return (
    <div className="w-[70rem] flex flex-row border-solid border-[#0f0e17] border-[3px] text-[1.5rem] rounded">
      <input type="text" placeholder="Pretraživanje" className="focus:text-black outline-none text-[#c2c2c2] p-2 w-[70rem]" />
      <button type="submit" className="bg-[#0f0e17] p-4 text-white hover:text-[#e53170]">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
        </svg>
      </button>
    </div>
  )
}
