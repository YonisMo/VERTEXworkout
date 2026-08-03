import Button from "@/components/ui/Button";

type AcademyCardProps = {
  title: string;
  description: string;
  href: string;
};

export default function AcademyCard({
  title,
  description,
  href,
}: AcademyCardProps) {
  return (
    <div className="group rounded-3xl border border-[#E8D85A] bg-[#F2EA79] p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <h3 className="mb-4 text-2xl font-bold text-[#022859]">
        {title}
      </h3>

      <p className="mb-8 font-medium leading-8 text-[#022859]/85">
        {description}
      </p>

      <Button
        href={href}
        size="md"
        className="transition-all duration-300 group-hover:shadow-lg"
      >
        Explore
      </Button>
    </div>
  );
}