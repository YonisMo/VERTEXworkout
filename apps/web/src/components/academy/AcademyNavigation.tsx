import Link from "next/link";

const navigationItems = [
  {
    title: "Academy Home",
    href: "/academy",
  },
  {
    title: "Courses",
    href: "/academy/courses",
  },
  {
    title: "Certifications",
    href: "/academy/certifications",
  },
  {
    title: "Workshops",
    href: "/academy/workshops",
  },
];

export default function AcademyNavigation() {
  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-6 px-6 py-5">
        {navigationItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="font-semibold text-[#022859] transition-colors duration-300 hover:text-[#F2EA79]"
          >
            {item.title}
          </Link>
        ))}
      </div>
    </nav>
  );
}