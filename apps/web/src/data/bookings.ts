export type BookingStatus =
  | "Confirmed"
  | "Pending"
  | "Completed"
  | "Cancelled";

export type Booking = {
  id: number;

  memberId: number;
  memberName: string;

  program: string;
  coach: string;

  date: string;
  time: string;

  status: BookingStatus;

  notes?: string;
};

export const bookings: Booking[] = [
  {
    id: 1,
    memberId: 1,
    memberName: "Ahmed Hassan",
    program: "Weight Loss",
    coach: "Coach Omar",
    date: "2026-08-08",
    time: "08:00",
    status: "Confirmed",
    notes: "",
  },

  {
    id: 2,
    memberId: 2,
    memberName: "Mohamed Ali",
    program: "Swimming",
    coach: "Coach Ahmed",
    date: "2026-08-08",
    time: "10:00",
    status: "Confirmed",
    notes: "",
  },

  {
    id: 3,
    memberId: 3,
    memberName: "Sara Mohamed",
    program: "Functional Training",
    coach: "Coach Mona",
    date: "2026-08-08",
    time: "17:00",
    status: "Pending",
    notes: "",
  },

  {
    id: 4,
    memberId: 4,
    memberName: "Yousef Ibrahim",
    program: "Calisthenics",
    coach: "Coach Ali",
    date: "2026-08-09",
    time: "07:30",
    status: "Completed",
    notes: "",
  },
];