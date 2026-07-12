import { Users, Dumbbell, Package, Star } from "lucide-react";
import { statServices } from "@/services/stat.services";
import CountUp from "./CountUp";

type CommonStatsData = {
  userCount?: number;
  trainerCount?: number;
  productCount?: number;
  reviewCount?: number;
};

const STATS_CONFIG: Array<{
  key: keyof CommonStatsData;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
}> = [
    { key: "userCount", label: "Active Users", Icon: Users },
    { key: "trainerCount", label: "Expert Trainers", Icon: Dumbbell },
    { key: "productCount", label: "Products", Icon: Package },
    { key: "reviewCount", label: "Reviews", Icon: Star },
  ];

const CommonStats = async () => {
  const { data: commonStatsData } = await statServices.getCommonStats();

  const stats = STATS_CONFIG.map(({ key, label, Icon }) => ({
    label,
    value:
      key === "userCount"
        ? (commonStatsData?.userCount ?? 0) - (commonStatsData?.trainerCount ?? 0)
        : commonStatsData?.[key] ?? 0,
    Icon,
  }));

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 md:mb-16">
      <div className="text-center mb-4 md:mb-10">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-neutral-900 uppercase tracking-wide">
          Our Growing <span className="text-primary-01">Community</span>
        </h2>
        <p className="text-sm md:text-base text-secondary-01 max-w-2xl mx-auto">
          Numbers that reflect the trust our members place in FitSphere every day.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {stats.map(({ label, value, Icon }) => (
          <div
            data-aos="flip-up"
            data-aos-duration="1500"
            key={label}
            className="group relative flex flex-col items-center justify-center text-center gap-3 rounded-xl border border-neutral-200 bg-white px-4 sm:px-6 py-8 shadow-sm overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-primary-01/60 hover:shadow-xl hover:shadow-primary-01/15 cursor-default"
          >
            {/* Subtle gradient overlay that fades in on hover */}
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary-01/0 via-primary-01/0 to-primary-01/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Top accent bar that grows on hover */}
            <span className="pointer-events-none absolute top-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-primary-01 rounded-full transition-all duration-300 ease-out group-hover:w-2/3" />

            <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-primary-01/10 transition-all duration-300 ease-out group-hover:bg-primary-01 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg group-hover:shadow-primary-01/30">
              <Icon className="relative w-6 h-6 text-primary-01 stroke-[1.75] transition-colors duration-300 ease-out group-hover:text-white" />
            </div>

            <h3 className="relative text-3xl md:text-4xl lg:text-5xl font-black text-neutral-900 tabular-nums transition-colors duration-300 ease-out group-hover:text-primary-01">
              <CountUp target={value} />
            </h3>

            <p className="relative text-xs sm:text-sm md:text-base font-medium text-secondary-01 uppercase tracking-wide transition-colors duration-300 ease-out group-hover:text-neutral-900">
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CommonStats;