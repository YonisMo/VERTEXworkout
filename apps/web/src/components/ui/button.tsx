import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "bg-[#F2EA79] text-[#022859] hover:bg-[#F2DF80]",

    secondary:
      "bg-[#022859] text-[#F2EA79] hover:bg-[#033B79]",

    outline:
      "border-2 border-[#F2EA79] text-[#F2EA79] hover:bg-[#F2EA79] hover:text-[#022859]",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={`
        rounded-2xl
        font-bold
        transition-all
        duration-300
        hover:scale-105
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}