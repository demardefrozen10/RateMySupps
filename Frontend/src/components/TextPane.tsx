export default function TextPane() {
  const features = [
    {
      title: "Manage Your Ratings",
      description: "Edit and update your supplement reviews anytime.",
      iconColor: "from-emerald-400 to-emerald-600",
      iconPath: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    },
    {
      title: "Always Anonymous",
      description: "Your ratings remain private and confidential.",
      iconColor: "from-emerald-300 to-emerald-500",
      iconPath: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
    },
    {
      title: "Vote on Reviews",
      description: "Help others by rating the most helpful reviews.",
      iconColor: "from-teal-400 to-emerald-500",
      iconPath: "M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
    }
  ];

  return (
    <section className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="mb-16 text-center md:text-left">
          <span className="text-emerald-600 font-bold tracking-widest uppercase text-xs">
            Platform Features
          </span>
          <h2 className="mt-3 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
             Enhance Your Experience
          </h2>
        </div>
        
        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="bg-white border border-gray-200 p-10 rounded-xl flex flex-col items-start"
            >
              {/* Circular Icon restored to your original style */}
              <div className={`
                w-16 h-16 rounded-full mb-8 
                flex items-center justify-center 
                bg-gradient-to-br shadow-sm ${feature.iconColor}
              `}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.iconPath} />
                </svg>
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-500 leading-relaxed text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}