import Powder from "../assets/powder.jpg";
export default function Search() {
    return <>
    <div className="w-full h-[50vh] flex flex-col items-center justify-center gap-6 px-4 relative bg-cover bg-center">
        <div className="absolute inset-0 bg-black/40"></div>
        
        <h2 className="font-bold text-lg">
            Authentic and Real Reviews of Supplements from Around the World
        </h2>
       <input 
        type="text" 
        placeholder="Supplement Brand" 
        className="w-full max-w-2xl px-4 py-2 rounded-full border-2 border-gray-300 focus:outline-none shadow-lg relative z-10"        
        />
      <p>I'd like to search by supplement category instead</p>
    </div>
    </>;
}