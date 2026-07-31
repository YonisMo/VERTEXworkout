import WhyAccordion from "./WhyAccordion";
import WhyHeader from "./WhyHeader";
import { whyHeader, whyItems } from "./why.data";

export default function Why() {
  return (
    <section className="bg-slate-50 py-24">
      <WhyHeader
        badge={whyHeader.badge}
        title={whyHeader.title}
        subtitle={whyHeader.subtitle}
      />

      <WhyAccordion items={whyItems} />
    </section>
  );
}