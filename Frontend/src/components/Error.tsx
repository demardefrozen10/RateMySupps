export default function Error() {
    return (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
            <div className="flex items-center gap-2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="font-semibold">An Unexpected Error Occurred</span>
            </div>
        </div>
    );
}