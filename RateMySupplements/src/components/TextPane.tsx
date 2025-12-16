export default function TextPane() {
    return <>
    <div className="grid grid-cols-3 gap-8 p-12">
        <div className="flex flex-col items-center text-center">
            <div className="h-48 mb-6">
                <div className="w-32 h-32 bg-yellow-300 rounded-full mx-auto"></div>
            </div>
            <h1 className="text-xl font-bold mb-4">Manage and edit your ratings</h1>
        </div>

        <div className="flex flex-col items-center text-center">
            <div className="h-48 mb-6">
                <div className="w-32 h-32 bg-pink-300 rounded-full mx-auto"></div>
            </div>
            <h1 className="text-xl font-bold mb-4">Your ratings are always anonymous</h1>
        </div>

        <div className="flex flex-col items-center text-center">
            <div className="h-48 mb-6">
                <div className="w-32 h-32 bg-blue-400 rounded-full mx-auto"></div>
            </div>
            <h1 className="text-xl font-bold mb-4">Like or dislike ratings</h1>
        </div>
    </div>
    </>
}