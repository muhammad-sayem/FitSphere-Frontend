import { Apple, Droplet, Moon, Activity } from "lucide-react";

const HealthTips = () => {
  const tips = [
    {
      id: 1,
      icon: Apple,
      title: "BALANCED DIET",
      description: "Fuel your body with nutrient-dense whole foods, colorful vegetables, and lean proteins to sustain natural metabolic energy levels throughout the active day.",
    },
    {
      id: 2,
      icon: Droplet,
      title: "STAY HYDRATED",
      description: "Maintain optimal cellular function, cognitive clarity, and physical endurance by drinking sufficient water consistently across your entire daily routine.",
    },
    {
      id: 3,
      icon: Moon,
      title: "PRIORITIZE SLEEP",
      description: "Secure 7 to 8 hours of deep, uninterrupted rest to enhance muscle recovery, support mental health, and systematically regulate essential bodily hormones.",
    },
    {
      id: 4,
      icon: Activity,
      title: "DAILY MOVEMENT",
      description: "Engage in at least 30 minutes of moderate active physical exercise daily to strengthen cardiovascular health, bone density, and your metabolic rate.",
    },
  ];

  return (
    <section className="w-full py-12 md:py-16 bg-white">
      
      <div className="text-center mb-10 md:mb-14 px-4">
        <h2 className="text-2xl md:text-3xl font-black text-neutral-900 tracking-wide uppercase">
          HEALTH & <span className="text-primary-01"> VITALITY TIPS </span>
        </h2>
        <p className="text-lg text-secondary-01 mt-2 max-w-lg mx-auto">
          Simple yet powerful daily practices to elevate your physical performance and long-term well-being.
        </p>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full">
        {tips.map((tip, index) => {
          const IconComponent = tip.icon;
          
          const isEven = index % 2 === 1;
          
          return (
            <div
              key={tip.id}
              className={`flex flex-col items-center text-center px-6 py-12 md:py-16 transition-all duration-300 transform hover:-translate-y-2 hover:border hover:border-primary-01 ${
                isEven ? "bg-[#EDEDED]" : "bg-[#F8F8F8]"
              }`}
            >
              {/* Centered Brand Color Icon */}
              <div className="mb-4 text-orange-500">
                <IconComponent className="w-8 h-8 stroke-[1.75]" />
              </div>

              {/* Title */}
              <h3 className="text-lg font-black tracking-wider uppercase mb-2">
                {tip.title}
              </h3>

              {/* Accent Underline Line */}
              <div className="w-8 h-1 bg-orange-500 mb-5" />

              {/* Description Info */}
              <p className="text-secondary-01 text-md leading-relaxed max-w-xs">
                {tip.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HealthTips;