export const internData = {
  name: "Alex Doe",
  referralCode: "ALEXD2024",
  donationLink: "https://fundify.app/donate?ref=ALEXD2024",
  stats: {
    totalRaised: 1650,
    totalDonors: 18,
    nextMilestone: 2000,
  },
  milestones: [
    { amount: 500, achieved: true },
    { amount: 1000, achieved: true },
    { amount: 2000, achieved: false },
    { amount: 5000, achieved: false },
    { amount: 10000, achieved: false },
  ],
};

export const transactions = [
  { id: 1, donorName: "Jane Smith", amount: 100, date: "2024-07-20" },
  { id: 2, donorName: "John Appleseed", amount: 50, date: "2024-07-20" },
  { id: 3, donorName: "Anonymous", amount: 250, date: "2024-07-19" },
  { id: 4, donorName: "Emily White", amount: 75, date: "2024-07-18" },
  { id: 5, donorName: "Michael Brown", amount: 150, date: "2024-07-18" },
  { id: 6, donorName: "Sarah Green", amount: 200, date: "2024-07-17" },
  { id: 7, donorName: "Anonymous", amount: 50, date: "2024-07-16" },
  { id: 8, donorName: "David Lee", amount: 300, date: "2024-07-15" },
  { id: 9, donorName: "Jessica Chen", amount: 125, date: "2024-07-14" },
  { id: 10, donorName: "Chris Taylor", amount: 300, date: "2024-07-12" },
];

export const leaderboard = {
  daily: [
    { rank: 1, name: "Priya Sharma", amount: 550 },
    { rank: 2, name: "Rohan Kumar", amount: 480 },
    { rank: 3, name: "Alex Doe", amount: 350 },
  ],
  weekly: [
    { rank: 1, name: "Maria Garcia", amount: 2100 },
    { rank: 2, name: "Alex Doe", amount: 1650 },
    { rank: 3, name: "Chen Wei", amount: 1500 },
    { rank: 4, name: "Fatima Al-Sayed", amount: 1350 },
    { rank: 5, name: "David Johnson", amount: 1200 },
  ],
  allTime: [
    { rank: 1, name: "John Smith", amount: 12500 },
    { rank: 2, name: "Emily Jones", amount: 11200 },
    { rank: 3, name: "Maria Garcia", amount: 9800 },
    { rank: 4, name: "Alex Doe", amount: 8450 },
    { rank: 5, name: "Chen Wei", amount: 7600 },
  ],
};

export const notifications = [
    { id: 1, type: "donation", content: "You received a new donation of ₹100 from Jane Smith.", time: "2h ago", read: false },
    { id: 2, type: "milestone", content: "Congratulations! You've unlocked the ₹1000 milestone badge.", time: "1d ago", read: false },
    { id: 3, type: "donation", content: "You received a new anonymous donation of ₹250.", time: "2d ago", read: true },
    { id: 4, type: "announcement", content: "The weekly leaderboard has been updated. Check your rank!", time: "3d ago", read: true },
    { id: 5, type: "donation", content: "You received a new donation of ₹75 from Emily White.", time: "4d ago", read: true },
];
