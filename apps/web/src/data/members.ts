export type Member = {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  gender: "Male" | "Female";
  dateOfBirth: string;

  membership: "Active" | "Expired" | "Pending";

  program: string;
  coach: string;

  startDate: string;
  endDate: string;

  visits: number;

  avatar: string;

  notes: string;
};

export const members: Member[] = [
  {
    id: 1,
    fullName: "Ahmed Hassan",
    email: "ahmed@gmail.com",
    phone: "+20 100 123 4567",
    gender: "Male",
    dateOfBirth: "1997-05-18",

    membership: "Active",

    program: "Weight Loss",
    coach: "Coach Omar",

    startDate: "2026-01-05",
    endDate: "2026-10-05",

    visits: 45,

    avatar: "https://i.pravatar.cc/150?img=1",

    notes: "Excellent commitment and attendance.",
  },
  {
    id: 2,
    fullName: "Mohamed Ali",
    email: "mohamed@gmail.com",
    phone: "+20 101 222 3333",
    gender: "Male",
    dateOfBirth: "1995-11-03",

    membership: "Expired",

    program: "Swimming",
    coach: "Coach Ahmed",

    startDate: "2025-12-12",
    endDate: "2026-06-12",

    visits: 18,

    avatar: "https://i.pravatar.cc/150?img=2",

    notes: "Membership expired. Waiting for renewal.",
  },
  {
    id: 3,
    fullName: "Sara Mohamed",
    email: "sara@gmail.com",
    phone: "+20 102 333 4444",
    gender: "Female",
    dateOfBirth: "2000-09-21",

    membership: "Pending",

    program: "Functional Training",
    coach: "Coach Mona",

    startDate: "2026-07-01",
    endDate: "2026-12-01",

    visits: 8,

    avatar: "https://i.pravatar.cc/150?img=5",

    notes: "Recently joined. Initial assessment completed.",
  },
  {
    id: 4,
    fullName: "Yousef Ibrahim",
    email: "yousef@gmail.com",
    phone: "+20 111 444 5555",
    gender: "Male",
    dateOfBirth: "1993-01-14",

    membership: "Active",

    program: "Calisthenics",
    coach: "Coach Ali",

    startDate: "2026-02-14",
    endDate: "2027-02-14",

    visits: 63,

    avatar: "https://i.pravatar.cc/150?img=7",

    notes: "One of the most consistent members.",
  },
];