// Client-safe lead types and label maps (no server-only imports).

export type Lead = {
  id: string;
  createdAt: number; // epoch ms
  read: boolean;
  yourName: string;
  businessName: string;
  businessType: string;
  email: string;
  phone: string;
  city: string;
  currentWebsite: string;
  hadWebsite: string;
  goals: string;
  message: string;
};

export const hadWebsiteLabels: Record<string, string> = {
  "yes-happy": "Yes, and I liked it",
  "yes-unhappy": "Yes, but it didn't work well",
  no: "No, this would be their first",
};

export const goalsLabels: Record<string, string> = {
  leads: "Generate more leads and calls",
  credibility: "Look professional and build trust",
  bookings: "Accept online bookings",
  reviews: "Get more Google reviews",
  all: "All of the above",
};

export function hadWebsiteLabel(value: string): string {
  return hadWebsiteLabels[value] ?? value;
}

export function goalsLabel(value: string): string {
  return goalsLabels[value] ?? value;
}

export function digitsOnly(phone: string): string {
  return phone.replace(/\D/g, "");
}
