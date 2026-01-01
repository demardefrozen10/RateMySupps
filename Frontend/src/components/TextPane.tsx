export default function TextPane() {
  const features = [
    {
      title: "Real & Authentic Reviews",
      description: "Read verified customer experiences, we NEVER allow fake or paid reviews!",
      iconColor: "from-emerald-400 to-emerald-600",
      iconPath: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    },
    {
      title: "Confidentiality Guaranteed",
      description: "Your privacy matters. Choose to use your name or remain completely anonymous.",
      iconColor: "from-emerald-300 to-emerald-500",
      iconPath: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
    },
    {
      title: "Community Driven",
      description: "Help the community by voting on the most helpful and detailed reviews.",
      iconColor: "from-teal-400 to-emerald-500",
      iconPath: "M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
    }
  ];

  return (
    <section className="pb-20 pt-5 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col items-center mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Trust Us?
          </h2>
          <div className="w-12 h-1.5 bg-emerald-500 mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="group flex flex-col items-center text-center p-8 rounded-3xl transition-all duration-300 border border-transparent hover:border-gray-50 hover:bg-slate-50/50"
            >
              <div className={`
                w-14 h-14 rounded-2xl mb-6 
                flex items-center justify-center 
                bg-gradient-to-br shadow-lg shadow-emerald-100/50 
                group-hover:scale-110 transition-transform duration-500 ${feature.iconColor}
              `}>
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.iconPath} />
                </svg>
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-gray-500 leading-relaxed text-sm md:text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}