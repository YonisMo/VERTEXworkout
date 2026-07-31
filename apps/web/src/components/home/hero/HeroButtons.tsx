import Link from "next/link";
import Button from "@/components/ui/Button";

interface HeroButton {
  label: string;
  href: string;
  variant: "primary" | "secondary";
  icon: React.ElementType;
}

interface HeroButtonsProps {
  buttons: readonly HeroButton[];
}

export default function HeroButtons({
  buttons,
}: HeroButtonsProps) {
  return (
    <div className="mt-10 flex flex-wrap items-center justify-center gap-5 lg:justify-start">
      {buttons.map((button) => {
        const Icon = button.icon;

        return (
          <Link key={button.label} href={button.href}>
            <Button variant={button.variant} size="lg">
              <span className="flex items-center gap-2">
                {button.label}
                <Icon className="h-5 w-5" />
              </span>
            </Button>
          </Link>
        );
      })}
    </div>
  );
}