import {useNavigate} from "react-router-dom";


export default function Footer() {
    const navigate = useNavigate();

    const HandleClick = () => {
        navigate('/');
    }
    return <>
        <div className="pt-3 pb-2 bg-slate-800 text-white flex flex-col items-center">
            <h1 className="text-xl font-bold cursor-pointer mb-4" onClick={HandleClick}>
                RateMy<span className="text-emerald-500">Supplements</span>
            </h1>
            <div className="flex items-center gap-1 text-sm">
                <p
                    className="cursor-pointer hover:underline"
                    onClick={() => navigate('/terms-and-conditions')}
                >
                    Terms & Conditions
                </p>
                <p>•</p>
                <p
                    className="cursor-pointer hover:underline"
                    onClick={() => navigate('/privacy-policy')}
                >
                    Privacy Policy
                </p>
                <p>•</p>
                <p>All Rights Reserved</p>
            </div>
        </div>
    </>;
}