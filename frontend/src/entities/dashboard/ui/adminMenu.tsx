// src/components/layout/AdminSidebar.tsx

import { useLogoutMutation } from "@/entities/auth/hooks/useLogout";
import { ERouteNames } from '@/shared';
import { cn } from '@/shared/lib/utils/twMerge';
import { BarChart3, Briefcase, Building, Clock, School } from 'lucide-react';
import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

type NavItem = {
    id: string;
    label: string;
    icon: FC<{ className?: string }>;
    path: string;
};

const navItems: NavItem[] = [
    { id: 'rating', label: 'Рейтинг резидентов', icon: BarChart3, path: ERouteNames.RESIDENTS_RATING_ROUTE },
    { id: 'stats', label: 'Общая статистика', icon: Clock, path: ERouteNames.EMPTY_ROUTE },
    { id: 'vacancies', label: 'Управление вакансиями', icon: Briefcase, path: 'vacancies' },
    { id: 'residents', label: 'Управление резидентами', icon: Building, path: 'residents' },
    { id: 'universities', label: 'Управление ВУЗами', icon: School, path: 'universities' },
];

export const AdminSidebar = () => {
    const location = useLocation();
    const currentPath = location.pathname.split('/').pop() || '';
    const logoutMutation = useLogoutMutation();

    const handleLogoutClick = () => {
        logoutMutation.mutate();
    };

    return (
        <div className="p-2">
            <nav>
                <ul className="space-y-3">
                    {navItems.map((item) => {
                        const isActive = currentPath === item.path || (item.path === ERouteNames.EMPTY_ROUTE && currentPath === '');

                        return (
                            <li key={item.id} className="mb-2 w-[280px] h-[50px]">
                                <Link
                                    to={`/${ERouteNames.DASHBOARD_ADMIN_ROUTE}/${item.path}`}
                                    className={cn(
                                        "flex items-center w-full p-4 rounded-full text-[15px] font-normal transition-colors duration-200",
                                        isActive
                                            ? "bg-[#D00E46] text-white"
                                            : "bg-white text-gray-700 hover:bg-gray-100",
                                    )}
                                >
                                    <item.icon className="mr-3 h-5 w-5" />
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
};