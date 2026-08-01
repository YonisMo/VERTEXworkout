import Link from "next/link";
import type { Url } from "next/dist/shared/lib/router/router";
import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type CommonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
};

type ButtonAsButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type ButtonAsAnchorProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: Url;
  };

type ButtonProps = ButtonAsButtonProps | ButtonAsAnchorProps;

function isLinkProps(props: ButtonProps): props is ButtonAsAnchorProps {
  return props.href !== undefined;
}

export default function Button(props: ButtonProps) {
  const variant = props.variant ?? "primary";
  const size = props.size ?? "md";
  const className = props.className ?? "";

  const variants = {
    primary: "bg-[#F2EA79] text-[#022859] hover:bg-[#F2DF80]",
    secondary: "bg-[#022859] text-[#F2EA79] hover:bg-[#033B79]",
    outline:
      "border-2 border-[#F2EA79] text-[#F2EA79] hover:bg-[#F2EA79] hover:text-[#022859]",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const classes = [
    "inline-flex",
    "items-center",
    "justify-center",
    "rounded-2xl",
    "font-bold",
    "transition-all",
    "duration-300",
    "hover:scale-105",
    variants[variant],
    sizes[size],
    className,
  ].join(" ");

  if (isLinkProps(props)) {
    const {
      href,
      children,
      variant: _variant,
      size: _size,
      className: _className,
      ...anchorProps
    } = props;

    void _variant;
    void _size;
    void _className;

    return (
      <Link
        href={href}
        className={classes}
        {...anchorProps}
      >
        {children}
      </Link>
    );
  }

  const {
    children,
    variant: _variant,
    size: _size,
    className: _className,
    type = "button",
    ...buttonProps
  } = props;

  void _variant;
  void _size;
  void _className;

  return (
    <button
      type={type}
      className={classes}
      {...buttonProps}
    >
      {children}
    </button>
  );
}