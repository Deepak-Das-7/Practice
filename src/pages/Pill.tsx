import React from 'react';
import { CheckCircle2, DollarSign, Calendar, User } from 'lucide-react';

export const DealPill: React.FC = () => {


    // Random deal status for variety
    const statusColors = {
        'closed': { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700' },
        'negotiation': { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700' },
        'proposal': { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700' },
        'qualified': { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700' },
    };

    const statuses = Object.keys(statusColors) as (keyof typeof statusColors)[];
    // eslint-disable-next-line react-hooks/purity
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    const colors = statusColors[randomStatus];

    // Random deal value
    const dealValue = React.useMemo(() => {
        const values = ['$25K', '$50K', '$100K', '$250K', '$500K', '$1M'];
        // eslint-disable-next-line react-hooks/purity
        return values[Math.floor(Math.random() * values.length)];
    }, []);

    // Random date
    // eslint-disable-next-line react-hooks/purity
    const randomDays = Math.floor(Math.random() * 30) + 1;

    const heightInPx = randomDays * 15;
    return (
        <div className="flex flex-col p-2 w-full">
            <div
                style={{ minHeight: `${heightInPx}px` }}
                className={`w-full flex flex-col p-3 ${colors.bg} border ${colors.border} rounded-l shadow-sm hover:shadow-md transition-all duration-200 group cursor-pointer`}
            >
                {/* Deal Header */}
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${colors.text.replace('text-', 'bg-')}`} />
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                            {randomStatus}
                        </span>
                    </div>
                    <CheckCircle2 className={`w-4 h-4 ${colors.text} shrink-0`} />
                </div>

                {/* Deal Name */}
                <h4 className="font-semibold text-gray-900 text-sm mb-3 group-hover:text-blue-600 transition-colors">
                    Deal number {randomDays}
                </h4>

                {/* Deal Metadata */}
                <div className="space-y-2 mt-auto">
                    <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1 text-gray-600">
                            <DollarSign className="w-3 h-3" />
                            <span className="font-medium">{dealValue}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
                            <Calendar className="w-3 h-3" />
                            <span>in {randomDays}d</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-gray-200/50">
                        <div className="w-6 h-6 bg-linear-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            <User className="w-3 h-3" />
                        </div>
                        <span className="text-xs text-gray-600 truncate">Alex Johnson</span>
                    </div>
                </div>
            </div>
        </div>
    );
};