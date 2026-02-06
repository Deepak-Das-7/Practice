import { useState } from 'react';
import axios from 'axios';
import { Calendar, Loader2 } from 'lucide-react';

export const EditableTat = ({ leadId, initialTat }: { leadId: string, initialTat: string }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [tat, setTat] = useState(initialTat);
    const [loading, setLoading] = useState(false);

    const handleUpdate = async (newValue: string) => {
        // const numValue = parseInt(newValue);
        const numValue = newValue;

        if (numValue === tat) {
            setIsEditing(false);
            return;
        }

        setLoading(true);
        try {
            // Replace with your actual API endpoint
            await axios.put(`https://seonebodev.sunedison.in/bo/api/lead/updateLeadData`, {
                lead_id: leadId,
                latitude: numValue
            });
            setTat(numValue);
        } catch (error) {
            console.error("Update failed:", error);
            // Optionally reset to old value on error
        } finally {
            setLoading(false);
            setIsEditing(false);
        }
    };

    return (
        <div className="flex items-center gap-1 text-gray-600">
            <Calendar className="w-3 h-3" />
            {isEditing ? (
                <input
                    autoFocus
                    type="number"
                    className="w-10 border-b border-blue-500 outline-none bg-transparent text-sm"
                    defaultValue={tat}
                    onBlur={(e) => handleUpdate(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleUpdate(e.currentTarget.value)}
                />
            ) : (
                <span 
                    className="cursor-pointer hover:text-blue-600 hover:underline decoration-dotted"
                    onClick={() => setIsEditing(true)}
                >
                    {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : `in ${tat}d`}
                </span>
            )}
        </div>
    );
};