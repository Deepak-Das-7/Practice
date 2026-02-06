import React, { useEffect, useRef, useState } from 'react';
import { CalendarDays, ChevronRight, Clock } from 'lucide-react';
import DealPage from './AllDeal';

const MasterPage: React.FC = () => {
    const todayRef = useRef<HTMLButtonElement>(null);
    // const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        // const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        // return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (todayRef.current) {
            todayRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, []);

    const generateDates = () => {
        const dates = [];
        for (let i = -100; i <= 400; i++) {
            const d = new Date();
            d.setDate(d.getDate() + i);
            dates.push(d);
        }
        return dates;
    };

    const dateList = generateDates();
    const todayStr = new Date().toLocaleDateString('en-US', {
        month: '2-digit', day: '2-digit', year: '2-digit'
    });

    return (
        <div className="flex h-screen w-screen bg-gray-50 overflow-hidden">
            {/* LEFT SIDEBAR: Timeline */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shrink-0 relative z-20">
                <div className="p-4 border-b border-gray-100 bg-white">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 text-gray-800 font-bold text-sm">
                            <CalendarDays className="w-4 h-4 text-blue-600" />
                            <span>Timeline</span>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-bold">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> LIVE
                        </div>
                    </div>
                    {/* <div className="text-2xl font-mono font-black text-gray-800 tracking-tighter">
                        {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
                    </div> */}
                </div>

                <div className="flex-1 overflow-y-auto p-2 space-y-1 scroll-smooth bg-gray-50/20">
                    {dateList.map((dateObj, index) => {
                        const formattedDate = dateObj.toLocaleDateString('en-US', {
                            month: '2-digit', day: '2-digit', year: '2-digit'
                        });
                        const isToday = formattedDate === todayStr;

                        return (
                            <button
                                key={index}
                                ref={isToday ? todayRef : null}
                                className={`relative w-full flex items-center justify-between px-4 py-6 rounded-xl transition-all group border ${isToday
                                    ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200 scale-[1.02] z-10'
                                    : 'text-gray-500 hover:bg-white border-transparent hover:border-gray-200 hover:text-gray-900'
                                    }`}
                            >
                                <div className="flex flex-col items-start z-10">
                                    <span className={`font-mono text-sm ${isToday ? 'font-bold' : 'font-medium'}`}>
                                        {formattedDate}
                                    </span>
                                    {isToday && <span className="text-[10px] text-blue-100 flex items-center gap-1 mt-1 font-bold italic"><Clock className="w-3 h-3" /> CURRENT DAY</span>}
                                </div>
                                <ChevronRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isToday ? 'text-white' : 'text-gray-300'}`} />

                                {/* THE DASHED LINE extending across the main content area */}
                                {isToday && (
                                    <div className="absolute top-1/2 left-full w-[200vw] border-t-2 border-dashed border-blue-400/40 z-0 pointer-events-none" />
                                )}
                            </button>
                        );
                    })}
                </div>

                <div className="p-4 border-t border-gray-100 bg-white">
                    <button
                        onClick={() => todayRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                        className="w-full py-2.5 text-xs text-blue-600 font-bold border-2 border-blue-50 rounded-xl hover:bg-blue-50 transition-all active:scale-95"
                    >
                        Back to Today
                    </button>
                </div>
            </aside>

            {/* RIGHT CONTENT: Deal Funnel */}
            <main className="flex-1 h-full overflow-hidden relative">
                <DealPage />
            </main>
        </div>
    );
};

export default MasterPage;