import type { Metadata } from "next";
import AcademyNavigation from "@/components/academy/AcademyNavigation";

export const metadata: Metadata = {
  title: {
    default: "VERTEXworkout Academy",
    template: "%s | VERTEXworkout Academy",
  },
  description:
    "Professional fitness education, certifications, workshops, and learning resources from VERTEXworkout.",
};

type AcademyLayoutProps = {
  children: React.ReactNode;
};

export default function AcademyLayout({
  children,
}: AcademyLayoutProps) {
  return (
    <>
      <AcademyNavigation />
      {children}
    </>
  );
}