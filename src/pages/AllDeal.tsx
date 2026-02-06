import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { Building2, MapPin, Plus } from 'lucide-react';
import { DealPill } from './Pill';

const API_BASE = 'https://seonebodev.sunedison.in/bo/api/lead';
const OWNER_EMAIL = 'deepak.d%40feniceenergy.com';

export default function DealPage() {
    const [leads, setLeads] = useState([]);
    const [team, setTeam] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch both concurrently for better performance
                const [leadsRes, teamRes] = await Promise.all([
                    axios.get(`${API_BASE}/getLeads?owner=${OWNER_EMAIL}`),
                    axios.get(`${API_BASE}/myTeam?owner=${OWNER_EMAIL}`)
                ]);

                setLeads(leadsRes.data.data || []);
                setTeam(teamRes.data.data || []);
            } catch (error) {
                console.error("Data Fetching Error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Memoize the grouped leads to prevent heavy recalculations on every render
    const leadsByOwner = useMemo(() => {
        return team.reduce((acc, person) => {
            acc[person] = leads.filter(lead => lead.lead_owner === person)[0]?.leads.slice(1, 5);
            

            
            return acc;
        }, {});
    }, [leads, team]);

    if (loading) {
        return <div className="flex h-screen items-center justify-center">Loading...</div>;
    }

    return (
        <div className=" bg-gray-50 flex">
            <div className="bg-white border-gray-200 overflow-hidden">
                {/* Header */}
                <div className="p-4 border-b border-gray-200 bg-gray-50/50 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-800">Leads Funnel</h2>
                    <div>[Search] [Filter]</div>
                </div>

                {/* Horizontal Scroll Area */}
                <div className="overflow-x-auto">
                    <div className="flex min-w-max">
                        {team.map((person) => {
                            const personLeads = leadsByOwner[person] || [];

                            return (
                                <div key={person} className="w-64 border-r border-gray-200 flex flex-col group">
                                    {/* Column Header */}
                                    <div className="sticky top-0 p-4 bg-white border-b border-gray-200 min-h-27.5 flex flex-col justify-between group-hover:bg-gray-50 transition-colors">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <Building2 className="w-4 h-4 text-blue-600 shrink-0" />
                                                <span className="text-sm font-bold text-gray-900 truncate uppercase tracking-tight">
                                                    {person.split('.')[0]} {/* Clean name if it's an email */}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-[10px] text-gray-500">
                                                <MapPin className="w-3 h-3" />
                                                <span className="truncate">{person}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
                                            <span className="text-[11px] font-medium text-gray-400">TOTAL LEADS</span>
                                            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                                                {personLeads.length}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Column Body */}
                                    <div className="p-2 space-y-3 bg-gray-50/30 min-h-100">
                                        {personLeads.map((lead, idx) => (
                                            <div key={lead.id || idx} className="hover:scale-[1.02] transition-transform cursor-pointer">
                                                <DealPill data={lead} />
                                            </div>
                                        ))}

                                        {personLeads.length === 0 && <EmptyState />}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-10 text-gray-400">
        <div className="w-10 h-10 border-2 border-dashed border-gray-200 rounded-full flex items-center justify-center mb-2">
            <Plus className="w-5 h-5" />
        </div>
        <p className="text-xs">No active deals</p>
    </div>
);