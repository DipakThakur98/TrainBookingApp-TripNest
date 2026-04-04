import { NavLink } from "react-router-dom";
import { HomeIcon, ChartBarIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";

const items = [
  { to: "/", label: "Dashboard", icon: HomeIcon },
  { to: "/trains", label: "Train Management", icon: HomeIcon },
  { to:"/Users", label:"User Management", icon:HomeIcon},
  { to: "/bookings", label: "Booking Management", icon: ChartBarIcon },
  // { to:"/reports", label: "Reports", icon: ChartBarIcon },
  // { to: "/settings", label: "System Setting", icon: Cog6ToothIcon },
  // { to:"/support", label: "Support & Help", icon: Cog6ToothIcon},

  
];
// 
export default function Sidebar(){
   return (
    <aside className="w-64 bg-white border-r shadow-sm hidden md:block">
      <div className="p-5 text-2xl font-bold">IRCTC</div>
      <nav className="px-2">
        {items.map(it=>{
          const Icon = it.icon;
          return (
            <NavLink key={it.to} to={it.to}
              className={({isActive}) => `flex items-center gap-3 p-3 rounded-md mb-1 ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}>
              <Icon className="h-5 w-5"/>
              <span>{it.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}