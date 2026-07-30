import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function AcademyHero() {
  return (
    // تم التأكد من أن القسم في المنتصف تماماً
    <section className="bg-[#022859] py-20 text-center">
      <Container>
        {/* استخدام flex و items-center لضمان توسيط كل العناصر عمودياً وأفقياً */}
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-center text-center">
          
          {/* الشارة العلوية */}
          <span className="mb-4 inline-block rounded-full bg-[#F2EA79] px-4 py-1.5 text-xs font-bold text-[#022859] shadow-md">
            VERTEXworkout Academy
          </span>

          {/* تم تصغير حجم العنوان الرئيسي من 6xl إلى 4xl ليكون متناسقاً (وهو نفس الحجم الذي ظهر في الصورة التي ولدتها لك) */}
          <h1 className="mb-4 text-4xl font-extrabold leading-tight text-white md:text-5xl">
            Learn. Develop. Become a Professional.
          </h1>

          {/* تم تغيير لون النص إلى أبيض ناصع (text-white) لضمان الوضوح التام فوق الخلفية الزرقاء الداكنة */}
          <p className="mx-auto mb-8 max-w-2xl text-base leading-7 text-white md:text-lg">
            A complete education platform designed for coaches, trainers, and
            athletes through professional courses, certifications, workshops,
            and practical fitness knowledge.
          </p>

          {/* تم وضع الزر داخل حاجز (div) بعرض كامل مع توسيط flex لضمان عدم محاذاته لليسار أبداً */}
          <div className="flex w-full justify-center">
            <Button
              href="/academy/courses"
              size="md"
              className="bg-[#F2EA79] text-[#022859] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              Explore Courses
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}