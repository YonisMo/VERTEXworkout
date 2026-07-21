type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

export default function Button({
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const styles = {
    primary:
      "bg-[#F2EA79] text-[#022859] hover:bg-[#F2DF80]",

    secondary:
      "border-2 border-[#F2EA79] text-[#F2EA79] hover:bg-[#F2EA79] hover:text-[#022859]",
  };

  return (
    <button
      className={`
        rounded-2xl
        px-8
        py-4
        font-bold
        transition-all
        duration-300
        hover:scale-105
        ${styles[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}