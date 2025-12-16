import BrandCard from "../components/BrandCard"
export default function Catalog() {
    return <>
    <div className="flex flex-col items-center gap-5 mt-10">
    
    <p>219 brands with the brand name "Revolution Nutrition".</p>
    <div className="max-w-xl">
        <BrandCard/>
    </div>
        </div>
    </>
}