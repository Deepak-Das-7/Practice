export interface Person {
    name: string;
    id: string;
    location: string;
    deals: number; // This determines how many "pills" show in their column
}


export interface Lead {
    "_id": string,
    "is_delete": Boolean,
    "latitude": string,
    "longitude": string,
    "form_updated_at": string,
    "profile_shared_at": string,
    "status": string,
    "lead_id": string,
    "lead_name": string,
    "lead_owner_email": string,
    "address": string,
    "city": string,
    "customer_email": string,
    "zoho_lead_id": string,
    "customer_mobile": string,
    "customer_name": string,
    "deal_nickname": string,
    "customer_whatsapp": string,
    "form_history": any[],
    "expected_tat": number,
    "createdAt": string,
    "updatedAt": string
}