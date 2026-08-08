export type AttendanceStatus =
  | "Checked In"
  | "Checked Out"
  | "Absent";

export type Attendance = {
  id: number;

  memberId: number;

  memberName: string;

  program: string;

  coach: string;

  checkIn: string;

  checkOut: string;

  date: string;

  status: AttendanceStatus;
};

export const attendance: Attendance[] = [
  {
    id: 1,

    memberId: 1,

    memberName: "Ahmed Hassan",

    program: "Weight Loss",

    coach: "Coach Omar",

    checkIn: "08:00",

    checkOut: "09:15",

    date: "2026-08-07",

    status: "Checked Out",
  },

  {
    id: 2,

    memberId: 2,

    memberName: "Mohamed Ali",

    program: "Swimming",

    coach: "Coach Ahmed",

    checkIn: "10:00",

    checkOut: "",

    date: "2026-08-07",

    status: "Checked In",
  },

  {
    id: 3,

    memberId: 3,

    memberName: "Sara Mohamed",

    program: "Functional Training",

    coach: "Coach Mona",

    checkIn: "",

    checkOut: "",

    date: "2026-08-07",

    status: "Absent",
  },

  {
    id: 4,

    memberId: 4,

    memberName: "Yousef Ibrahim",

    program: "Calisthenics",

    coach: "Coach Ali",

    checkIn: "07:30",

    checkOut: "08:40",

    date: "2026-08-07",

    status: "Checked Out",
  },
];