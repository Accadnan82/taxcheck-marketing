import React, { useMemo } from "react";

export default function Home() {
  const year = useMemo(() => new Date().getFullYear(), []);

  // Screenshots (عدّل الروابط لاحقًا إذا رغبت)
  const screenshots = [
    { src: "REPLACE_WITH_SCREENSHOT_1_URL", alt: "TaxCheck – Screen 1" },
    { src: "REPLACE_WITH_SCREENSHOT_2_URL", alt: "TaxCheck – Screen 2" },
    { src: "REPLACE_WITH_SCREENSHOT_3_URL", alt: "TaxCheck – Screen 3" },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Hero background effects */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="heroGlow" />
          <div className="heroShimmer" />
        </div>

        {/* Header */}
        <div className="relative mx-auto max-w-6xl px-6 pt-10">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-slate-800">
              TaxCheck
              <div className="text-xs text-slate-500">
                Corporate Tax & VAT • UAE
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="/login"
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
              >
                Sign in
              </a>
              <a
                href="/login"
                className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
              >
                Start Free
              </a>
            </div>
          </div>

          {/* Hero */}
          <div className="mt-14 grid grid-cols-1 gap-10 pb-14 md:grid-cols-2 md:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs text-slate-600 backdrop-blur">
                Corporate Tax + VAT • AI-assisted • Built for Accountants
              </div>

              <h1 className="mt-6 text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1]">
                Corporate Tax & VAT in the UAE
                <span className="block mt-3 text-slate-700 font-medium">
                  Clear workflows. Practical outputs.
                </span>
              </h1>

              <p className="mt-5 text-base leading-7 text-slate-600">
                TaxCheck helps accountants and SMEs manage taxpayers, tax
                periods, and Corporate Tax / VAT filings through guided steps,
                validations, and professional reports.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="/login"
                  className="rounded-xl bg-emerald-600 px-6 py-3 text-sm font-medium text-white hover:bg-emerald-700"
                >
                  Start Free
                </a>
                <a
                  href="#screens"
                  className="rounded-xl border border-slate-200 px-6 py-3 text-sm text-slate-700 hover:bg-slate-50"
                >
                  View Product Screens
                </a>
                <a
                  href="#contact"
                  className="rounded-xl border border-slate-200 px-6 py-3 text-sm text-slate-700 hover:bg-slate-50"
                >
                  Contact Us
                </a>
              </div>
            </div>

            {/* Right card */}
            <div className="relative">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-sm font-medium text-slate-800">
                      What you get
                    </div>
                    <div className="text-sm text-slate-500 mt-1">
                      Designed for real tax work
                    </div>
                  </div>
                  <div className="text-xs bg-emerald-50 text-emerald-700 px-3 py-2 rounded-xl font-medium">
                    AI + Rules
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  <Feature
                    title="Guided Corporate Tax workflow"
                    desc="Clear steps, validations, and checkpoints."
                  />
                  <Feature
                    title="VAT return preparation"
                    desc="Structured sections with practical summaries."
                  />
                  <Feature
                    title="Professional outputs"
                    desc="Reports ready for review and submission."
                  />
                  <Feature
                    title="Client-ready structure"
                    desc="Organized per taxpayer and tax period."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Screenshots */}
      <div id="screens" className="mx-auto max-w-6xl px-6 pb-14">
        <h2 className="text-2xl font-semibold tracking-tight">
          Product Screenshots
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          A preview of the TaxCheck interface and workflows.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
          {screenshots.map((s, i) => (
            <div
              key={i}
              className="rounded-3xl border border-slate-200 bg-white p-3 shadow-sm"
            >
              <div className="aspect-[16/10] rounded-2xl bg-slate-100 grid place-items-center text-sm text-slate-500">
                Screenshot {i + 1}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* About */}
      <div className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <h2 className="text-2xl font-semibold tracking-tight">
            About TaxCheck
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600 max-w-3xl">
            TaxCheck is developed by Fintech Technologies FZ-LLC to provide
            accountants and SMEs in the UAE with practical, compliance-focused
            tax software that prioritizes clarity and real operational needs.
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MiniCard title="Clarity-first UX" desc="Simple, structured workflows." />
            <MiniCard title="Compliance mindset" desc="Validations and guidance." />
            <MiniCard title="Accountant-grade outputs" desc="Clean, reliable reports." />
            <MiniCard title="Built for SMEs" desc="Fast daily usage." />
          </div>
        </div>
      </div>

      {/* Contact */}
      <div id="contact" className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="text-2xl font-semibold tracking-tight">Contact Us</h2>
        <p className="mt-3 text-sm text-slate-600 max-w-xl">
          For product questions, consulting, or implementation support.
        </p>

        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 max-w-xl">
          <div className="text-sm text-slate-600">
            <div>Email: info@taxcheck.ae</div>
            <div className="mt-1">Location: UAE</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-8 flex justify-between text-sm text-slate-600">
          <div>© {year} TaxCheck</div>
          <div className="flex gap-4">
            <a href="#screens" className="hover:text-slate-900">Screens</a>
            <a href="#contact" className="hover:text-slate-900">Contact</a>
            <a href="/login" className="hover:text-slate-900">Sign in</a>
          </div>
        </div>
      </div>

      {/* Local CSS */}
      <style>{`
        .heroGlow {
          position:absolute;
          inset:-40% -30%;
          background:
            radial-gradient(circle at 30% 30%, rgba(16,185,129,0.18), transparent 55%),
            radial-gradient(circle at 70% 40%, rgba(15,23,42,0.14), transparent 60%);
          filter: blur(12px);
        }
        .heroShimmer {
          position:absolute;
          top:-120px;
          left:-40%;
          width:60%;
          height:520px;
          background: linear-gradient(115deg, transparent 0%, rgba(16,185,129,0.10) 45%, transparent 70%);
          animation: shimmerMove 7s linear infinite;
        }
        @keyframes shimmerMove {
          from { transform: translateX(0); }
          to { transform: translateX(140%); }
        }
      `}</style>
    </div>
  );
}

function Feature({ title, desc }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
      <div className="text-sm font-medium text-slate-800">{title}</div>
      <div className="text-sm text-slate-600 mt-1">{desc}</div>
    </div>
  );
}

function MiniCard({ title, desc }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="text-sm font-medium text-slate-800">{title}</div>
      <div className="text-sm text-slate-600 mt-1">{desc}</div>
    </div>
  );
}
