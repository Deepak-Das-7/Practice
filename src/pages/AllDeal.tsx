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

    const leadsByOwner = useMemo(() => {
        return team.reduce((acc, person) => {
            // Find the owner object and grab their specific leads
            const ownerData = leads.find(l => l.lead_owner === person);
            acc[person] = ownerData?.leads ? ownerData.leads.slice(0, 50) : [];
            return acc;
        }, {} as Record<string, any[]>);
    }, [leads, team]);

    if (loading) {
        return <div className="flex h-screen items-center justify-center">Loading...</div>;
    }

return (
        /* The Outer Container must fill the available height */
        <div className="bg-gray-50 flex h-full w-full">
            <div className="bg-white border-gray-200 w-full flex flex-col">
                {/* Header: Fixed at the top */}
                <div className="p-4 border-b border-gray-200 bg-gray-50/50 flex items-center justify-between shrink-0">
                    <h2 className="text-lg font-semibold text-gray-800">Leads Funnel</h2>
                </div>

                {/* Horizontal Scroll Area: This is the 'Board' */}
                <div className="flex-1 overflow-x-auto overflow-y-hidden">
                    <div className="flex h-full min-w-max">
                        {team.map((person) => {
                            const personLeads = leadsByOwner[person] || [];

                            return (
                                <div key={person} className="w-64 border-r border-gray-200 flex flex-col h-full group">
                                    {/* Column Header: Sticky and separate */}
                                    <div className="p-4 bg-white border-b border-gray-200 shrink-0 group-hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Building2 className="w-4 h-4 text-blue-600 shrink-0" />
                                            <span className="text-sm font-bold text-gray-900 truncate uppercase">
                                                {person.split('.')[0]}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between mt-2">
                                            <span className="text-[10px] font-medium text-gray-400">LEADS</span>
                                            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                                                {personLeads.length}
                                            </span>
                                        </div>
                                    </div>

                                    {/* COLUMN BODY: This is the part that SCROLLS INFINITELY */}
                                    <div className="flex-1 overflow-y-auto p-2 bg-gray-50/30 flex flex-col gap-3 items-start custom-scrollbar">
                                        {personLeads.map((lead, idx) => (
                                            <div
                                                key={lead.id || `${person}-${idx}`}
                                                className="w-full shrink-0 hover:scale-[1.02] transition-transform cursor-pointer"
                                            >
                                                <DealPill lead={lead} />
                                            </div>
                                        ))}

                                        {personLeads.length === 0 && <EmptyState />}
                                        
                                        {/* Spacer to allow some bottom padding in scroll */}
                                        <div className="h-20 w-full shrink-0" />
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
        <Plus className="w-5 h-5 mb-2 opacity-20" />
        <p className="text-xs">No active deals</p>
    </div>
);


