export default function TextPane() {
    return (
        <div className="bg-white py-16 px-8">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-32 h-32 bg-emerald-300 rounded-full flex items-center justify-center shadow-lg">
                        <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">Manage Your Ratings</h3>
                    <p className="text-gray-600">Edit and update your supplement reviews anytime</p>
                </div>

                <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-32 h-32 bg-emerald-400 rounded-full flex items-center justify-center shadow-lg">
                        <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">Always Anonymous</h3>
                    <p className="text-gray-600">Your ratings remain private and confidential</p>
                </div>

                <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-32 h-32 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                        <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">Vote on Reviews</h3>
                    <p className="text-gray-600">Help others by rating the most helpful reviews</p>
                </div>
            </div>
        </div>
    );
}