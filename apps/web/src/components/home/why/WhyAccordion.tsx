"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, LucideIcon } from "lucide-react";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

type WhyItem = {
  id: number;
  number: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  description: string;
  buttonText: string;
  buttonLink: string;
  features: readonly string[];
};

interface WhyAccordionProps {
  items: readonly WhyItem[];
}

export default function WhyAccordion({
  items,
}: WhyAccordionProps) {
  const [openId, setOpenId] = useState<number>(items[0]?.id ?? 1);

  return (
    <Container>
      <div className="mx-auto max-w-5xl space-y-6">

        {items.map((item) => {
          const Icon = item.icon;
          const isOpen = openId === item.id;

          return (
            <div
              key={item.id}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300"
            >
              <button
                onClick={() =>
                  setOpenId(isOpen ? 0 : item.id)
                }
                className="flex w-full items-center justify-between p-8 text-left"
              >
                <div className="flex items-center gap-6">

                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#022859] text-[#F2EA79]">
                    <Icon size={28} />
                  </div>

                  <div>

                    <div className="font-tajawal text-sm font-bold uppercase tracking-[0.25em] text-slate-400">
                      {item.number}
                    </div>

                    <h3 className="mt-2 font-cairo text-2xl font-black text-[#022859]">
                      {item.title}
                    </h3>

                    <p className="mt-1 font-tajawal text-sm text-slate-500">
                      {item.subtitle}
                    </p>

                  </div>

                </div>

                <ChevronDown
                  className={`transition duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="border-t border-slate-200 px-8 pb-8 pt-8">

                  <p className="max-w-3xl font-tajawal text-lg leading-8 text-slate-600">
                    {item.description}
                  </p>

                  <div className="mt-8 grid gap-4 md:grid-cols-2">

                    {item.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-3 rounded-2xl bg-slate-50 px-5 py-4"
                      >
                        <div className="h-2.5 w-2.5 rounded-full bg-[#F2EA79]" />

                        <span className="font-tajawal text-slate-700">
                          {feature}
                        </span>
                      </div>
                    ))}

                  </div>

                  <div className="mt-10">

                    <Link href={item.buttonLink}>
                      <Button variant="primary">
                        {item.buttonText}
                      </Button>
                    </Link>

                  </div>

                </div>
              )}

            </div>
          );
        })}

      </div>
    </Container>
  );
}