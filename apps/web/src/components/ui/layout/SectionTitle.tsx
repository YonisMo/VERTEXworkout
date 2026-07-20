type Props = {
  title: string;
  subtitle?: string;
};

export default function SectionTitle({
  title,
  subtitle,
}: Props) {
  return (
    <div className="mb-14 text-center">
      <h2 className="text-4xl font-extrabold text-[#022859] md:text-5xl">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-5 text-lg text-gray-600">
          {subtitle}
        </p>
      )}
    </div>
  );
}