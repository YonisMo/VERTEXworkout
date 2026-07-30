"use client";

import { useState } from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function Why() {
  // حالة لتتبع أي قسم مفتوح حالياً (افتراضياً الأول مفتوح أو كلها مغلقة)
  const [openSection, setOpenSection] = useState<number | null>(0);

  const toggleSection = (index: number) => {
    setOpenSection(openSection === index ? null : index);
  };

  return (
    <section className="py-20 bg-white" dir="ltr">
      <Container>
        {/* عنوان القسم في المنتصف تماماً */}
        <div className="text-center mx-auto max-w-2xl mb-16">
          <span className="inline-block rounded-full bg-[#F2EA79] px-4 py-1.5 text-sm font-bold text-[#022859] mb-4 shadow-sm">
            Our Advantages
          </span>
          <h2 className="font-cairo text-3xl sm:text-4xl font-black text-[#022859]">
            Why Choose VERTEXworkout
          </h2>
          <p className="mt-4 font-tajawal text-slate-600 text-base sm:text-lg">
            We combine high-performance functional equipment, elite training programs, and professional education under one ecosystem.
          </p>
        </div>

        {/* الأقسام التفاعلية (Accordion Style) */}
        <div className="max-w-4xl mx-auto space-y-6 font-tajawal">
          
          {/* العنصر الأول: Premium Equipment */}
          <div className="rounded-3xl bg-slate-50 border border-slate-200/80 overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md">
            <button
              onClick={() => toggleSection(0)}
              className="w-full flex items-center justify-between p-6 sm:p-8 text-left focus:outline-none"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-[#022859] text-[#F2EA79] text-xl font-bold shadow-md">
                  01
                </div>
                <div>
                  <h3 className="font-cairo text-xl sm:text-2xl font-bold text-[#022859]">
                    Premium Equipment
                  </h3>
                  <p className="text-sm font-semibold text-[#022859]/70 mt-0.5">
                    Built for Performance. Designed to Last.
                  </p>
                </div>
              </div>
              <span className="text-2xl font-bold text-[#022859] transition-transform duration-300">
                {openSection === 0 ? "−" : "+"}
              </span>
            </button>

            {openSection === 0 && (
              <div className="px-6 pb-8 sm:px-8 border-t border-slate-200/60 pt-6 animate-fadeIn">
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                  Every piece of VERTEXworkout equipment is engineered to withstand intensive daily use while delivering maximum comfort, safety, and performance. From Power Bags to functional training accessories, our products are developed for athletes, coaches, fitness facilities, and high-performance training environments.
                </p>

                <div className="mb-6 bg-white p-6 rounded-2xl border border-slate-100">
                  <h4 className="font-cairo text-xs font-bold uppercase tracking-wider text-[#022859] mb-4">
                    What&apos;s Included
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
                    <li className="flex items-center gap-2">✓ Professional VERTEX Power Bags</li>
                    <li className="flex items-center gap-2">✓ Resistance Bands &amp; Mini Bands</li>
                    <li className="flex items-center gap-2">✓ Agility Ladders &amp; Speed Equipment</li>
                    <li className="flex items-center gap-2">✓ Balance &amp; Stability Tools</li>
                    <li className="flex items-center gap-2">✓ Cones, Hurdles &amp; Training Accessories</li>
                    <li className="flex items-center gap-2">✓ Heavy-Duty Materials</li>
                    <li className="flex items-center gap-2">✓ Indoor &amp; Outdoor Ready</li>
                    <li className="flex items-center gap-2">✓ Commercial-Grade Quality</li>
                  </ul>
                </div>

                <div className="text-left">
                  <Link href="/store">
                    <Button variant="primary" size="sm">
                      Explore Equipment Store
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* العنصر الثاني: Elite Academy */}
          <div className="rounded-3xl bg-slate-50 border border-slate-200/80 overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md">
            <button
              onClick={() => toggleSection(1)}
              className="w-full flex items-center justify-between p-6 sm:p-8 text-left focus:outline-none"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-[#022859] text-[#F2EA79] text-xl font-bold shadow-md">
                  02
                </div>
                <div>
                  <h3 className="font-cairo text-xl sm:text-2xl font-bold text-[#022859]">
                    Elite Academy
                  </h3>
                  <p className="text-sm font-semibold text-[#022859]/70 mt-0.5">
                    Learn. Coach. Lead.
                  </p>
                </div>
              </div>
              <span className="text-2xl font-bold text-[#022859] transition-transform duration-300">
                {openSection === 1 ? "−" : "+"}
              </span>
            </button>

            {openSection === 1 && (
              <div className="px-6 pb-8 sm:px-8 border-t border-slate-200/60 pt-6 animate-fadeIn">
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                  VERTEX Academy provides professional education for coaches and fitness enthusiasts who want to build real-world skills. Our curriculum combines science, practical coaching experience, and internationally inspired training methods to help you become a confident and knowledgeable professional.
                </p>

                <div className="mb-6 bg-white p-6 rounded-2xl border border-slate-100">
                  <h4 className="font-cairo text-xs font-bold uppercase tracking-wider text-[#022859] mb-4">
                    What You&apos;ll Learn
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
                    <li className="flex items-center gap-2">✓ Functional Training Methodology</li>
                    <li className="flex items-center gap-2">✓ Personal Training Systems</li>
                    <li className="flex items-center gap-2">✓ Strength &amp; Conditioning</li>
                    <li className="flex items-center gap-2">✓ Sports Performance</li>
                    <li className="flex items-center gap-2">✓ Corrective Exercise</li>
                    <li className="flex items-center gap-2">✓ Boxing Fitness</li>
                    <li className="flex items-center gap-2">✓ Swimming Coaching</li>
                    <li className="flex items-center gap-2">✓ Professional Certifications</li>
                    <li className="flex items-center gap-2">✓ Workshops &amp; Continuing Education</li>
                  </ul>
                </div>

                <div className="text-left">
                  <Link href="/academy">
                    <Button variant="primary" size="sm">
                      Enroll in Academy
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* العنصر الثالث: Complete Ecosystem */}
          <div className="rounded-3xl bg-slate-50 border border-slate-200/80 overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md">
            <button
              onClick={() => toggleSection(2)}
              className="w-full flex items-center justify-between p-6 sm:p-8 text-left focus:outline-none"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-[#022859] text-[#F2EA79] text-xl font-bold shadow-md">
                  03
                </div>
                <div>
                  <h3 className="font-cairo text-xl sm:text-2xl font-bold text-[#022859]">
                    Complete Ecosystem
                  </h3>
                  <p className="text-sm font-semibold text-[#022859]/70 mt-0.5">
                    Everything Connected in One Place.
                  </p>
                </div>
              </div>
              <span className="text-2xl font-bold text-[#022859] transition-transform duration-300">
                {openSection === 2 ? "−" : "+"}
              </span>
            </button>

            {openSection === 2 && (
              <div className="px-6 pb-8 sm:px-8 border-t border-slate-200/60 pt-6 animate-fadeIn">
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                  VERTEXworkout is more than a fitness brand—it&apos;s a complete ecosystem that combines education, equipment, coaching, technology, and community into one integrated platform. Every product and service is designed to work together, creating a seamless training experience from your first workout to advanced athletic performance.
                </p>

                <div className="mb-6 bg-white p-6 rounded-2xl border border-slate-100">
                  <h4 className="font-cairo text-xs font-bold uppercase tracking-wider text-[#022859] mb-4">
                    Inside the Ecosystem
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
                    <li className="flex items-center gap-2">✓ Professional Training Programs</li>
                    <li className="flex items-center gap-2">✓ Premium Equipment Store</li>
                    <li className="flex items-center gap-2">✓ VERTEX Academy</li>
                    <li className="flex items-center gap-2">✓ Exercise Library</li>
                    <li className="flex items-center gap-2">✓ Smart Workout Plans</li>
                    <li className="flex items-center gap-2">✓ Nutrition &amp; Recovery Resources</li>
                    <li className="flex items-center gap-2">✓ Coach &amp; Athlete Community</li>
                    <li className="flex items-center gap-2">✓ Progress Tracking System</li>
                    <li className="flex items-center gap-2">✓ Events &amp; Workshops</li>
                    <li className="flex items-center gap-2">✓ Future Digital Platform &amp; Mobile App</li>
                  </ul>
                </div>

                <div className="text-left">
                  <Link href="/register">
                    <Button variant="primary" size="sm">
                      Join the Ecosystem
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>

        </div>
      </Container>
    </section>
  );
}