/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { statServices } from "@/services/stat.services";
import { useQuery } from "@tanstack/react-query";
import { 
  Users, 
  UserCheck, 
  ShoppingBag, 
  DollarSign,
  Package,
  CalendarCheck2,
  Star,
  CreditCard
} from "lucide-react";
import { 
  Pie, 
  PieChart, 
  PieLabelRenderProps, 
  PieSectorShapeProps, 
  Sector,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  BarShapeProps,
  LabelList,
  LabelProps,
  Tooltip,
  Label
} from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';

const RADIAN = Math.PI / 180;
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink', 'black'];

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: PieLabelRenderProps) => {
  if (cx == null || cy == null || innerRadius == null || outerRadius == null) {
    return null;
  }
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const ncx = Number(cx);
  const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const ncy = Number(cy);
  const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > ncx ? 'start' : 'end'} dominantBaseline="central">
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};

const MyCustomPie = (props: PieSectorShapeProps) => {
  return <Sector {...props} fill={COLORS[props.index % COLORS.length]} />;
};

const getPath = (x: number, y: number, width: number, height: number) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
};

const TriangleBar = (props: BarShapeProps) => {
  const { x, y, width, height, index } = props;
  const color = COLORS[index % COLORS.length];

  return (
    <path
      strokeWidth={props.isActive ? 5 : 0}
      d={getPath(Number(x), Number(y), Number(width), Number(height))}
      stroke={color}
      fill={color}
      style={{
        transition: 'stroke-width 0.3s ease-out',
      }}
    />
  );
};

const CustomColorLabel = (props: LabelProps) => {
  const fill = COLORS[(props.index ?? 0) % COLORS.length];
  return <Label {...props} fill={fill} />;
};

const AdminDashboardHome = () => {
  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ["admin-dashboard-data"],
    queryFn: () => statServices.getDashboardStats(),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  console.log("API Response for Dashboard Stats:", dashboardData);

  const stats = [
    {
      id: "users",
      title: "Total Users",
      value: dashboardData?.userCount ?? 0,
      icon: Users,
      iconColor: "text-blue-600",
      cardBg: "bg-gradient-to-br from-blue-50 to-blue-100/50",
      borderColor: "border-blue-200/60",
    },
    {
      id: "trainers",
      title: "Total Trainers",
      value: dashboardData?.trainerCount ?? 0,
      icon: UserCheck,
      iconColor: "text-emerald-600",
      cardBg: "bg-gradient-to-br from-emerald-50 to-emerald-100/50",
      borderColor: "border-emerald-200/60",
    },
    {
      id: "products",
      title: "Total Products",
      value: dashboardData?.productCount ?? 0,
      icon: Package,
      iconColor: "text-indigo-600",
      cardBg: "bg-gradient-to-br from-indigo-50 to-indigo-100/50",
      borderColor: "border-indigo-200/60",
    },
    {
      id: "slots",
      title: "Booking Slots",
      value: dashboardData?.bookingSlotCount ?? 0,
      icon: CalendarCheck2,
      iconColor: "text-sky-600",
      cardBg: "bg-gradient-to-br from-sky-50 to-sky-100/50",
      borderColor: "border-sky-200/60",
    },
    {
      id: "orders",
      title: "Total Orders",
      value: dashboardData?.orderCount ?? 0,
      icon: ShoppingBag,
      iconColor: "text-amber-600",
      cardBg: "bg-gradient-to-br from-amber-50 to-amber-100/50",
      borderColor: "border-amber-200/60",
    },
    {
      id: "reviews",
      title: "Total Reviews",
      value: dashboardData?.reviewCount ?? 0,
      icon: Star,
      iconColor: "text-orange-600",
      cardBg: "bg-gradient-to-br from-orange-50 to-orange-100/50",
      borderColor: "border-orange-200/60",
    },
    {
      id: "payments",
      title: "Total Payments",
      value: dashboardData?.paymentCount ?? 0,
      icon: CreditCard,
      iconColor: "text-rose-600",
      cardBg: "bg-gradient-to-br from-rose-50 to-rose-100/50",
      borderColor: "border-rose-200/60",
    },
    {
      id: "revenue",
      title: "Total Revenue",
      value: dashboardData?.totalRevenue !== undefined 
        ? `$${dashboardData.totalRevenue}` 
        : "$0",
      icon: DollarSign,
      iconColor: "text-purple-600",
      cardBg: "bg-gradient-to-br from-purple-50 to-purple-100/50",
      borderColor: "border-purple-200/60",
    },
  ];

  const processedPieData = dashboardData?.pieChartData?.map((item: any) => ({
    name: item.status,
    value: item.count
  })) ?? [];

  const processedBarData = dashboardData?.barChartData?.map((item: any) => {
    const date = new Date(item.month);
    const formattedMonth = date.toLocaleString('default', { month: 'short', year: '2-digit' });
    return {
      name: formattedMonth,
      uv: item.count
    };
  }) ?? [];

  if (isLoading) {
    return (
      <div className="p-6 md:p-8 w-full animate-pulse space-y-8">
        <div className="space-y-2">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="h-32 bg-gray-100 rounded-2xl border border-gray-200"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 w-full min-h-screen bg-gray-50/40 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          Admin Dashboard Home
        </h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Overview of platform users, trainer stats, orders, and total earnings.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {stats.map((item) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.id}
              className={`${item.cardBg} ${item.borderColor} p-6 rounded-2xl border shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-between group relative overflow-hidden`}
            >
              <div className="space-y-2.5 relative z-10">
                <span className="text-xs font-bold text-gray-500/80 uppercase tracking-wider block">
                  {item.title}
                </span>
                <span className="text-2xl md:text-3xl font-extrabold text-gray-900 block tracking-tight">
                  {item.value}
                </span>
              </div>
              
              <div className="p-3 rounded-xl bg-white shadow-sm border border-white/60 relative z-10 transition-transform group-hover:scale-105 duration-300">
                <IconComponent className={`w-5 h-5 ${item.iconColor}`} strokeWidth={2.5} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
        {processedPieData.length > 0 && (
          <div className="bg-white border border-gray-200/80 p-6 rounded-2xl shadow-sm flex flex-col items-center relative">
            <div className="w-full flex justify-between items-start mb-4">
              <h2 className="text-base font-bold text-gray-800">Status Distribution</h2>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-xs font-semibold text-gray-600 bg-gray-50 p-2 rounded-xl border border-gray-100">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#0088FE]"></span>
                  <span>PENDING</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#00C49F]"></span>
                  <span>COMPLETED</span>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-center items-center">
              <PieChart style={{ width: '100%', maxWidth: '340px', aspectRatio: 1 }} responsive>
                <Pie
                  data={processedPieData}
                  labelLine={false}
                  label={renderCustomizedLabel}
                  fill="#8884d8"
                  dataKey="value"
                  isAnimationActive={true}
                  shape={MyCustomPie}
                />
                <RechartsDevtools />
              </PieChart>
            </div>
          </div>
        )}

        {processedBarData.length > 0 && (
          <div className="bg-white border border-gray-200/80 p-6 rounded-2xl shadow-sm flex flex-col items-center">
            <h2 className="text-base font-bold text-gray-800 self-start mb-4">Monthly Analytics</h2>
            <div className="w-full flex justify-center items-center">
              <BarChart
                style={{ width: '100%', maxWidth: '550px', aspectRatio: 1.618 }}
                responsive
                data={processedBarData}
                margin={{
                  top: 30,
                  right: 10,
                  left: -20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <Tooltip cursor={{ fillOpacity: 0.2 }} />
                <XAxis dataKey="name" tickLine={false} />
                <YAxis width={50} tickLine={false} />
                <Bar dataKey="uv" fill="#8884d8" shape={TriangleBar} activeBar>
                  <LabelList content={CustomColorLabel} position="top" />
                </Bar>
                <RechartsDevtools />
              </BarChart>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardHome;