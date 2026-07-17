# Frontend Architecture — الجزء 4 (نهائي محدَّث): شجرة المشروع الكاملة
**VERTEXworkout — Final Project Tree (v1.1 — بعد إضافات المراجعة النهائية)**

---

```
vertexworkout/
│
├── apps/
│   ├── web/
│   │   ├── src/
│   │   │   ├── app/                          # (كما في النسخة السابقة بالكامل — غير متأثر)
│   │   │   ├── features/                     # (كما في النسخة السابقة بالكامل — غير متأثر)
│   │   │   ├── shared/                       # (كما في النسخة السابقة — غير متأثر)
│   │   │   │
│   │   │   ├── services/                     # ⭐ جديد — طبقة Composition الخاصة بتطبيق web فقط
│   │   │   │   ├── api.ts                    # يهيّئ ويُصدِّر packages/api مع إعدادات web المحلية
│   │   │   │   ├── auth.ts                   # يهيّئ packages/auth (Supabase client الخاص بـ web)
│   │   │   │   ├── storage.ts                # يهيّئ packages/storage (bucket المخصص لصور web)
│   │   │   │   └── analytics.ts              # يهيّئ packages/analytics (GA4/PostHog IDs الخاصة بـ web)
│   │   │   │
│   │   │   ├── store/{cart-store,ui-store,locale-store}.ts
│   │   │   ├── styles/globals.css
│   │   │   └── middleware.ts
│   │   ├── messages/{ar,en}/*.json
│   │   ├── public/{images,fonts,favicon.ico}
│   │   ├── README.md
│   │   ├── next.config.js
│   │   ├── tailwind.config.ts
│   │   └── package.json
│   │
│   ├── admin/          # Skeleton — Phase 3
│   ├── coach/           # Skeleton — Phase 3
│   └── mobile/          # مستقبلي — Phase 4
│
├── packages/
│   ├── design-system/src/tokens/*.ts
│   ├── ui/                                    # (كما سبق بالكامل)
│   ├── api/src/{store,programs,academy,client,auth}/*.ts
│   ├── database/                              # (كما سبق بالكامل)
│   ├── auth/src/{permissions.ts,guards.ts,roles.ts}
│   ├── validation/src/{store,auth,client,programs}/*.ts
│   │
│   ├── lib/                                    # بنية تحتية أساسية + Cross-cutting concerns (محدَّثة بعد المراجعة المعمارية v1)
│   │   └── src/{supabase-client.ts,logger.ts,sentry.ts,theme.ts,env.ts,rate-limit.ts,cors.ts,csp.ts,sanitize.ts,errors.ts,with-error-handler.ts,api-response.ts}
│   │
│   ├── email/                                  # ⭐ جديد
│   │   ├── src/
│   │   │   ├── templates/{welcome-email,order-confirmation,password-reset,program-enrollment}.tsx
│   │   │   ├── components/{email-layout,email-button,email-footer}.tsx
│   │   │   ├── send.ts                        # دالة إرسال موحّدة (تستخدم Resend/SendGrid لاحقًا)
│   │   │   └── index.ts
│   │   ├── README.md
│   │   └── package.json                       # dependency: react-email, resend
│   │
│   ├── storage/                                # ⭐ جديد
│   │   ├── src/
│   │   │   ├── upload.ts                       # رفع ملفات لـ Supabase Storage buckets
│   │   │   ├── delete.ts                       # حذف/تنظيف ملفات يتيمة
│   │   │   ├── image.ts                        # تحويل/ضغط الصور قبل الرفع (Sharp أو مكافئ)
│   │   │   └── index.ts
│   │   ├── README.md
│   │   └── package.json
│   │
│   ├── analytics/                              # ⭐ محدَّث — كل مزودي التحليلات بلا استثناء
│   │   ├── src/
│   │   │   ├── ga4.ts                          # Google Analytics 4
│   │   │   ├── gtm.ts                          # Google Tag Manager
│   │   │   ├── meta-pixel.ts                   # Meta (Facebook/Instagram) Pixel
│   │   │   ├── tiktok-pixel.ts                 # TikTok Pixel
│   │   │   ├── clarity.ts                      # Microsoft Clarity
│   │   │   ├── posthog.ts                      # PostHog (اختياري مستقبلاً)
│   │   │   ├── events.ts                       # كتالوج موحّد لكل الأحداث — يُرسِل لكل المزوّدين المفعّلين معًا
│   │   │   └── index.ts
│   │   ├── README.md
│   │   └── package.json
│   │
│   ├── testing/                                 # ⭐ محدَّث — تسمية دقيقة كما اعتُمد
│   │   ├── fixtures/{products.json,programs.json,users.json}
│   │   ├── mocks/{supabase-mock.ts,api-mock-handlers.ts}
│   │   ├── factories/{product-factory.ts,user-factory.ts,order-factory.ts}
│   │   ├── test-utils/render-with-providers.tsx
│   │   ├── render-helpers/test-query-client.ts
│   │   ├── custom-matchers/to-be-within-range.ts
│   │   ├── README.md
│   │   └── package.json                        # dependency: @faker-js/faker, msw
│   │
│   ├── utils/src/*.ts
│   ├── i18n/src/*.ts
│   ├── types/src/*.ts
│   ├── constants/src/*.ts
│   └── config/{eslint,tailwind,typescript}/
│
├── docs/{PRD.md,architecture/,database/,api/,deployment-guide.md,coding-standards.md,roadmap.md,adr/}
├── scripts/{setup.sh,seed.ts,backup.sh,generate-types.sh}
├── tests/{unit,integration,e2e}/               # ملفات الاختبار الفعلية فقط (تستهلك packages/testing)
├── .github/workflows/
├── .husky/
├── .env.{example,local,development,staging,production}
├── .prettierrc
├── commitlint.config.js
├── turbo.json
├── pnpm-workspace.yaml
├── package.json
└── README.md
```

## ملخص التعديلات (v1.0 → v1.1)
| التغيير | السبب |
|---|---|
| ➕ `packages/email` | فصل قوالب ومنطق البريد الإلكتروني عن باقي البنية التحتية — يخدم `notification_templates` (channel='email') من Database Schema |
| ➕ `packages/storage` | فصل عمليات الملفات الفعلية (Upload/Delete/Resize) عن `packages/database` الذي يتعامل مع سجلات `media` فقط، لا الملفات نفسها |
| ➕ `packages/analytics` | عزل كل تكامل تتبع السلوك (كان مبعثرًا كملف واحد داخل `lib`) |
| ➕ `apps/web/src/services/` | طبقة Composition تُهيّئ كل حزمة بإعدادات web المحلية، فتبقى `features/` غير مدركة تمامًا لتفاصيل التهيئة |
| ➕ `packages/testing` | مصدر واحد لكل بيانات ووظائف الاختبار الوهمية، يُستهلك من Vitest وPlaywright معًا |
| 🔄 `packages/lib` | تقليص نطاقه إلى البنية التحتية الأساسية فقط بعد فصل email/storage/analytics |

---

## ✅ المرحلة 8 مكتملة بنسبة 100% (بعد دمج المراجعة النهائية)
