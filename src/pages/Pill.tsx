import React from 'react';
import { CheckCircle2, DollarSign, User } from 'lucide-react';
import type { Lead } from '../types';
import { EditableTat } from './tatEdit';

interface DealPillProps {
  lead: Lead;
}

export const DealPill: React.FC<DealPillProps> = ({ lead }) => {
    // 1. Status Color Logic
    const statusColors = {
        'closed': { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700' },
        'negotiation': { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700' },
        'proposal': { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700' },
        'qualified': { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700' },
    };

    // Use the actual lead status or default to 'closed'
    const statusKey = (lead.status?.toLowerCase() || 'closed') as keyof typeof statusColors;
    const colors = statusColors[statusKey] || statusColors['closed'];

    // 2. Height & TAT Calculation
    // We use || to ensure that if parseInt fails (NaN) or is 0, it defaults to 2
    var tat:any = parseInt(lead.latitude) || 2;
    const totalHeight = tat * 50;
    var tatString = tat.toString();
    // Log to verify height calculation
    console.log(`Pill ID: ${lead._id} | Height: ${totalHeight}px`);
    const y1Height = totalHeight * 0.3; 
    const y2Height = totalHeight * 0.7;
   return (
    <>
        {lead.status !== "in_progress" ? (
            /* 1. STANDARD PILL (Solid Color) */
            <div className="flex flex-col p-2 w-full">
                <div
                    style={{ height: `${totalHeight}px` }}
                    className={`w-full flex flex-col p-3 ${colors.bg} border ${colors.border} rounded-lg shadow-sm hover:shadow-md transition-all duration-200 group overflow-hidden`}
                >
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${colors.text.replace('text-', 'bg-')}`} />
                            <span className={`text-xs font-semibold uppercase tracking-wide ${colors.text}`}>
                                {lead.status || 'Active'}
                            </span>
                        </div>
                        <CheckCircle2 className={`w-4 h-4 ${colors.text} shrink-0`} />
                    </div>

                    <h4 className="font-semibold text-gray-900 text-sm mb-3 group-hover:text-blue-600 transition-colors">
                        Lead: {lead.customer_name || 'No Name'}
                    </h4>

                    <div className="space-y-2 mt-auto">
                        <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-1 text-gray-600">
                                <DollarSign className="w-3 h-3" />
                                <span className="font-medium">Deal Val: $25K</span>
                            </div>
                            <EditableTat leadId={lead.lead_id} initialTat={tatString} />
                        </div>
                        <div className="flex items-center gap-2 pt-2 border-t border-gray-200/50">
                            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                                <User className="w-3 h-3" />
                            </div>
                            <span className="text-[10px] text-gray-500 truncate">{lead.lead_owner_email}</span>
                        </div>
                    </div>
                </div>
            </div>
        ) : (
            /* 2. SEGMENTED PILL (Red/Green Phase) */
            <div className="flex flex-col p-2 w-full">
                <div
                    style={{ height: `${totalHeight}px` }}
                    className="w-full flex flex-col border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 group overflow-hidden bg-white"
                >
                    {/* Y1 Section - Red */}
                    <div 
                        style={{ height: `${y1Height}px` }} 
                        className="w-full bg-red-100 p-3 border-b border-red-200"
                    >
                        <div className="flex justify-between items-center">
                             <span className="text-[10px] font-bold text-blue-700">IN PROGRESS - Y1</span>
                             <CheckCircle2 className="w-4 h-4 text-red-300" />
                        </div>
                    </div>

                    {/* Y2 Section - Green */}
                    <div 
                        style={{ height: `${y2Height}px` }} 
                        className="w-full bg-green-50 p-3 flex flex-col"
                    >
                        <h4 className="font-semibold text-gray-900 text-sm mb-auto">
                            {lead.customer_name || 'No Name'}
                        </h4>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-[10px]">
                                <div className="flex items-center gap-1 text-gray-600">
                                    <DollarSign className="w-3 h-3" />
                                    <span>$25K</span>
                                </div>
                                <EditableTat leadId={lead.lead_id} initialTat={tat.toString()} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </>
);
};