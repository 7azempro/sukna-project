import { useEffect, useMemo, useRef, useState } from 'react';
import { KINDS, LISTINGS } from './listings';

const NAV = [
  { href: '#top', label: 'الرئيسية' },
  { href: '#services', label: 'الخدمات' },
  { href: '#list', label: 'اعرض اعلانك' },
  { href: '#about', label: 'من نحن' },
];

const AUDIENCES = [
  { id: 'all', label: 'الكل' },
  { id: 'students', label: 'للطلاب' },
  { id: 'families', label: 'للعائلات' },
];

const ROLES = [
  { id: 'tenant', title: 'مستأجر', body: 'إذا كنت تبحث عن سكن.' },
  { id: 'owner', title: 'مالك عقار', body: 'إذا كنت تريد عرض وحداتك للإيجار أو البيع.' },
  { id: 'agency', title: 'وكالة عقارات', body: 'إذا كنت تدير أكثر من وحدة بين الملاك والمستأجرين.' },
];

const ar = (n) => n.toLocaleString('ar-EG');

/* ── Icons (inline, 1.6 stroke) ───────────────────────── */
const Icon = ({ d, className = 'h-5 w-5' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    {d.map((p, i) => <path key={i} d={p} />)}
  </svg>
);
const I = {
  search: ['M21 21l-4.3-4.3', 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14z'],
  bed: ['M3 18v-7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7', 'M3 14h18', 'M7 9V6h4v3'],
  bath: ['M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3z', 'M6 12V6a2 2 0 0 1 4 0'],
  pin: ['M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z', 'M12 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z'],
  cap: ['M2 9l10-5 10 5-10 5L2 9z', 'M6 11v5c3 2 9 2 12 0v-5'],
  sofa: ['M4 11V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3', 'M3 11h18v6H3z', 'M5 17v2M19 17v2'],
  chat: ['M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z'],
  user: ['M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', 'M4 21a8 8 0 0 1 16 0'],
  key: ['M15 7a4 4 0 1 1-3.5 6L5 19.5V21H3v-3l6.5-6.5A4 4 0 0 1 15 7z'],
  building: ['M4 21V5l8-3v19', 'M12 21V9l8 3v9', 'M8 8h.01M8 12h.01M8 16h.01M16 14h.01M16 18h.01', 'M2 21h20'],
  menu: ['M4 7h16M4 12h16M4 17h16'],
  close: ['M6 6l12 12M18 6L6 18'],
  check: ['M5 12l5 5 9-10'],
  back: ['M5 12h14', 'M13 6l6 6-6 6'],
};
const ROLE_ICON = { tenant: I.user, owner: I.key, agency: I.building };

const Logo = ({ className = 'h-10 w-auto' }) => <img src="/logo.svg" alt="سُكنة" className={className} />;

/* ── Header: the pale band from the design ─────────────── */
function Header({ onJoin }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <header className="sticky top-0 z-40 bg-mist/95 backdrop-blur-md">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-6 px-4 sm:h-24 sm:px-8">
        <a href="#top" className="shrink-0" aria-label="سُكنة، الصفحة الرئيسية"><Logo className="h-9 w-auto sm:h-11" /></a>

        <nav className="hidden items-center gap-9 lg:flex" aria-label="الرئيسية">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="text-[17px] font-bold text-navy transition-colors hover:text-teal">{n.label}</a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button type="button" onClick={() => onJoin('signin')} className="hidden items-center gap-3 text-[17px] font-bold md:flex">
            حسابي
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-cyan-soft text-teal"><Icon d={I.user} className="h-6 w-6" /></span>
          </button>
          <button type="button" onClick={() => onJoin('tenant')} className="hidden h-11 items-center rounded-xl bg-cyan-soft px-5 text-[17px] font-bold text-teal-600 transition-colors hover:bg-cyan sm:inline-flex">
            تسجيل
          </button>
          <span className="hidden h-12 w-px bg-navy/15 sm:block" aria-hidden="true" />
          <a href="#contact" className="hidden h-11 items-center rounded-xl bg-navy px-5 text-[17px] font-bold text-white transition-colors hover:bg-navy-700 sm:inline-flex">
            تواصل معنا
          </a>
          <button type="button" onClick={() => setOpen(true)} className="grid h-11 w-11 place-items-center rounded-xl text-navy hover:bg-white/60 lg:hidden" aria-label="القائمة" aria-expanded={open} aria-controls="mobile-menu">
            <Icon d={I.menu} className="h-6 w-6" />
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="القائمة">
          <button type="button" className="absolute inset-0 bg-navy/40" aria-label="إغلاق القائمة" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 right-0 flex w-[84%] max-w-xs flex-col bg-white p-6 shadow-lift">
            <div className="flex items-center justify-between">
              <Logo className="h-9 w-auto" />
              <button type="button" onClick={() => setOpen(false)} className="grid h-11 w-11 place-items-center rounded-xl hover:bg-mist" aria-label="إغلاق"><Icon d={I.close} className="h-6 w-6" /></button>
            </div>
            <nav className="mt-8 grid gap-1" aria-label="القائمة">
              {NAV.map((n) => (
                <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3.5 text-lg font-bold hover:bg-mist">{n.label}</a>
              ))}
            </nav>
            <div className="mt-auto grid gap-3">
              <button type="button" onClick={() => { setOpen(false); onJoin('tenant'); }} className="h-12 rounded-xl bg-cyan-soft font-bold text-teal-600">تسجيل</button>
              <a href="#contact" onClick={() => setOpen(false)} className="grid h-12 place-items-center rounded-xl bg-navy font-bold text-white">تواصل معنا</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

/* ── Hero: tagline and search on one side, the street photo on the other ── */
function Hero({ filters, setFilters, onSearch }) {
  const set = (k) => (e) => setFilters((f) => ({ ...f, [k]: e.target.value }));
  const thumbs = LISTINGS.slice(0, 3);
  return (
    <section id="top" className="relative overflow-hidden bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-10 sm:px-8 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-6 lg:pb-24 lg:pt-14">
        <div className="relative z-10">
          <h1 className="font-display text-[2.4rem] font-bold leading-[1.35] sm:text-5xl lg:text-[3.4rem]">
            سكنك في مصر،<br /><span className="text-teal">من غير لفّ.</span>
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-navy/70">
            منصة توفر السهولة في إيجاد وتأجير الوحدات السكنية للمالكين والمستأجرين، بالإضافة إلى خدمات أساسية للطلاب الوافدين في مصر.
          </p>

          <form
            className="mt-8 rounded-3xl bg-[#f3f5f6] p-5 shadow-[0_30px_60px_-30px_rgba(2,48,71,.35)] sm:p-6"
            onSubmit={(e) => { e.preventDefault(); onSearch(); }}
            role="search"
            aria-label="ابحث عن سكن"
          >
            <label className="block">
              <span className="font-display text-xl font-bold">بتدور على سكن فين؟</span>
              <input
                type="search"
                value={filters.q}
                onChange={set('q')}
                placeholder="الحي أو الجامعة، مثلاً: سموحة"
                className="mt-2.5 h-12 w-full rounded-xl border border-navy/25 bg-white px-4 text-[15px] placeholder:text-navy/40 focus:border-teal"
              />
            </label>
            <label className="mt-5 block">
              <span className="font-display text-xl font-bold">نوع السكن</span>
              <select value={filters.kind} onChange={set('kind')} className="mt-2.5 h-12 w-full rounded-xl border border-navy/25 bg-white px-4 text-[15px] focus:border-teal">
                <option value="all">أي نوع</option>
                {KINDS.map((k) => <option key={k} value={k}>{k}</option>)}
              </select>
            </label>
            <div className="mt-5 flex items-center justify-between gap-3">
              <p className="text-sm text-navy/55">{filters.q || filters.kind !== 'all' ? 'النتائج تتحدث وأنت بتكتب' : 'القاهرة والإسكندرية'}</p>
              <button type="submit" className="inline-flex h-11 items-center gap-2 rounded-xl bg-cyan-soft px-5 font-bold text-teal-600 transition-colors hover:bg-cyan">
                <Icon d={I.search} /> بحث
              </button>
            </div>
          </form>
        </div>

        <div className="relative lg:-ml-[max(2rem,calc((100vw-80rem)/2+2rem))]">
          <img src="/images/street.jpg" alt="صف من البيوت الملوّنة" className="aspect-[5/4] w-full rounded-3xl object-cover shadow-[0_40px_80px_-30px_rgba(2,48,71,.45)] lg:aspect-[1.02] lg:rounded-r-3xl lg:rounded-l-none" />
          <div className="absolute -top-6 right-4 w-[min(22rem,88%)] rounded-3xl bg-white/95 p-4 text-center shadow-lift ring-1 ring-navy/5 backdrop-blur sm:right-10 sm:p-5">
            <p className="inline-flex rounded-xl border border-butter-line/60 bg-butter px-3.5 py-1.5 text-sm font-bold text-butter-ink">متاح الآن للمعاينة</p>
            <div className="mt-3 flex justify-center">
              {thumbs.map((h) => <img key={h.id} src={h.image} alt="" className="-ml-3 h-14 w-14 rounded-full border-[3px] border-white object-cover first:ml-0" style={{ objectPosition: h.focus }} />)}
              <span className="-ml-3 grid h-14 w-14 place-items-center rounded-full border-[3px] border-white bg-navy text-sm font-bold text-white">+{ar(LISTINGS.length - thumbs.length)}</span>
            </div>
            <p className="mt-3 text-sm text-navy/65">{ar(LISTINGS.length)} وحدات في القاهرة والإسكندرية، أقربها للجامعات.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Listings, as the Services frame: big rounded photos with a label ── */
function ListingCard({ home }) {
  return (
    <article className="group">
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
        <img src={home.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" style={{ objectPosition: home.focus }} />
        <span className="absolute right-4 top-4 rounded-full border border-emerald-300 bg-emerald-50 px-3.5 py-1 text-xs font-bold text-emerald-700">{home.audience === 'students' ? 'مناسب للطلاب' : 'للعائلات'}</span>
        {home.furnished && <span className="absolute left-4 top-4 rounded-full bg-navy/85 px-3 py-1 text-xs font-bold text-white">مفروش</span>}
      </div>
      <div className="px-1 pt-4">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-bold leading-snug">{home.title}</h3>
          <p className="shrink-0 font-display text-xl font-bold">{ar(home.price)}$<span className="text-xs font-medium text-navy/50"> / شهر</span></p>
        </div>
        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-navy/60"><Icon d={I.pin} className="h-4 w-4" /> {home.area}، {home.city} · {home.kind}</p>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-navy/70">
          <span className="flex items-center gap-1.5"><Icon d={I.bed} className="h-4 w-4" /> {ar(home.beds)} {home.beds === 1 ? 'غرفة' : 'غرف'}</span>
          <span className="flex items-center gap-1.5"><Icon d={I.bath} className="h-4 w-4" /> {ar(home.baths)} {home.baths === 1 ? 'حمّام' : 'حمّامات'}</span>
          <span className="flex items-center gap-1.5 text-teal-600"><Icon d={I.cap} className="h-4 w-4" /> {home.near}</span>
        </div>
      </div>
    </article>
  );
}

function Listings({ filters, setFilters, results, sectionRef }) {
  return (
    <section id="services" ref={sectionRef} className="scroll-mt-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-8 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">وحدات متاحة</h2>
            <p className="mt-2 text-navy/60" aria-live="polite">{ar(results.length)} {results.length === 1 ? 'وحدة تطابق بحثك' : 'وحدات تطابق بحثك'} · بيانات توضيحية</p>
          </div>
          <div className="flex gap-1 rounded-2xl bg-mist p-1" role="group" aria-label="لمن الوحدة">
            {AUDIENCES.map((a) => (
              <button
                key={a.id}
                type="button"
                aria-pressed={filters.audience === a.id}
                onClick={() => setFilters((f) => ({ ...f, audience: a.id }))}
                className={`rounded-xl px-4 py-2 text-sm font-bold transition-colors ${filters.audience === a.id ? 'bg-white text-navy shadow-card' : 'text-navy/60 hover:text-navy'}`}
              >
                {a.label}
              </button>
            ))}
          </div>
        </div>

        {results.length ? (
          <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((h) => <ListingCard key={h.id} home={h} />)}
          </div>
        ) : (
          <div className="mt-10 rounded-3xl bg-mist px-6 py-16 text-center">
            <p className="font-display text-xl font-bold">مفيش وحدات مطابقة لبحثك</p>
            <p className="mt-2 text-navy/60">جرّب حي تاني، أو نوع سكن مختلف، أو امسح كلمة البحث.</p>
            <button type="button" onClick={() => setFilters(EMPTY)} className="mt-6 rounded-xl bg-navy px-6 py-3 font-bold text-white">امسح البحث</button>
          </div>
        )}
      </div>
    </section>
  );
}

/* ── Who it's for: the three onboarding roles ─────────── */
function Roles({ onJoin }) {
  return (
    <section id="list" className="scroll-mt-24 bg-gradient-to-b from-mist to-[#cfe5ef]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-8 sm:py-20">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">اعرض إعلانك، أو لاقي سكنك.</h2>
          <p className="mt-3 text-lg text-navy/65">حساب واحد لكل طرف: المستأجر يبحث ويتواصل، والمالك يعرض وحدته، والوكالة تدير وحداتها كلها من مكان واحد.</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {ROLES.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => onJoin(r.id)}
              className="group flex flex-col items-start rounded-3xl bg-white/80 p-6 text-right shadow-card ring-1 ring-white transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-lift"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-soft text-teal-600"><Icon d={ROLE_ICON[r.id]} className="h-6 w-6" /></span>
              <span className="mt-5 font-display text-2xl font-bold">{r.title}</span>
              <span className="mt-2 text-navy/65">{r.body}</span>
              <span className="mt-6 inline-flex items-center gap-2 font-bold text-teal-600">ابدأ كـ{r.title} <Icon d={I.back} className="h-4 w-4 rotate-180" /></span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Students({ onPick }) {
  const points = [
    [I.cap, 'ابحث بالقرب من جامعتك', 'اكتب اسم الجامعة أو الكلية، وتظهر لك الوحدات القريبة منها.'],
    [I.sofa, 'مفروش وجاهز للسكن', 'وحدات مفروشة بالكامل، فتوصل وتبدأ دراستك من أول يوم.'],
    [I.chat, 'تواصل مباشر مع المالك', 'من غير وسطاء: اسأل واتفق واحجز معاد معاينة من مكان واحد.'],
  ];
  return (
    <section className="bg-navy text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-sm font-bold text-cyan">للطلاب الوافدين</p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-[1.4] sm:text-4xl">جاي تدرس في مصر؟<br />ابدأ بسكن قريب وواضح.</h2>
          <p className="mt-4 text-lg leading-relaxed text-white/70">أول أسبوع في مدينة جديدة هو الأصعب. سُكنة تختصر البحث في الأحياء القريبة من الجامعات، بأسعار شهرية واضحة.</p>
          <button type="button" onClick={onPick} className="mt-8 rounded-xl bg-cyan px-6 py-3.5 font-bold text-navy transition-colors hover:bg-white">اعرض وحدات الطلاب</button>
        </div>
        <ul className="grid gap-4">
          {points.map(([icon, t, d]) => (
            <li key={t} className="flex gap-4 rounded-3xl bg-white/[0.06] p-5 ring-1 ring-white/10">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-cyan/15 text-cyan"><Icon d={icon} className="h-6 w-6" /></span>
              <div><p className="text-lg font-bold">{t}</p><p className="mt-1 leading-relaxed text-white/65">{d}</p></div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── Onboarding: the split dialog from the design (concept: nothing is sent) ── */
function Onboarding({ start, onClose }) {
  const ref = useRef(null);
  const [step, setStep] = useState(0);
  const [role, setRole] = useState('tenant');
  const signin = start === 'signin';

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (start && !d.open) {
      setStep(0);
      if (start !== 'signin') setRole(start);
      d.showModal();
    }
    if (!start && d.open) d.close();
  }, [start]);

  const steps = signin ? 2 : 3;
  const roleTitle = ROLES.find((r) => r.id === role)?.title;

  return (
    <dialog ref={ref} onClose={onClose} className="m-0 h-full max-h-none w-full max-w-none bg-transparent p-0 backdrop:bg-navy/50 sm:m-auto sm:h-[min(56rem,94vh)] sm:w-[min(72rem,94vw)] sm:rounded-[2rem]">
      <div className="grid h-full overflow-hidden bg-white sm:rounded-[2rem] lg:grid-cols-[1fr_0.95fr]">
        <div className="relative flex h-full flex-col overflow-y-auto bg-gradient-to-br from-[#d8e8ef] via-[#e6f0f4] to-[#cfe3ee] px-6 py-8 sm:px-14">
          <button type="button" onClick={onClose} className="absolute left-5 top-5 grid h-11 w-11 place-items-center rounded-xl bg-cyan-soft text-teal-600 hover:bg-cyan" aria-label="إغلاق">
            <Icon d={I.back} />
          </button>
          <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-6">
            <img src="/logo.svg" alt="سُكنة" className="mx-auto h-14 w-auto" />

            {step === 0 && !signin && (
              <>
                <h2 className="mt-6 text-center font-display text-2xl font-bold">تسجيل حساب جديد</h2>
                <p className="mt-2 text-center text-navy/65">أخبرنا هل تريد تسجيل حساب مستأجر، مالك عقار، أم وكالة عقارات؟</p>
                <fieldset className="mt-8 grid gap-4">
                  <legend className="sr-only">نوع الحساب</legend>
                  {ROLES.map((r) => (
                    <label key={r.id} className={`flex cursor-pointer items-center gap-4 rounded-2xl bg-white/80 p-4 shadow-card ring-2 transition-colors ${role === r.id ? 'ring-teal' : 'ring-transparent hover:ring-navy/10'}`}>
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-mist text-navy"><Icon d={ROLE_ICON[r.id]} /></span>
                      <span className="flex-1"><span className="block font-display text-lg font-bold">{r.title}</span><span className="block text-xs text-navy/60">{r.body}</span></span>
                      <input type="radio" name="role" value={r.id} checked={role === r.id} onChange={() => setRole(r.id)} className="h-5 w-5 accent-teal" />
                    </label>
                  ))}
                </fieldset>
                <button type="button" onClick={() => setStep(1)} className="mt-8 h-12 rounded-xl bg-navy font-bold text-white hover:bg-navy-700">التالي</button>
                <p className="mt-4 text-center text-sm text-navy/65">لدي حساب بالفعل! <button type="button" onClick={() => onClose('signin')} className="font-bold text-navy underline underline-offset-4">تسجيل الدخول</button></p>
              </>
            )}

            {step === 0 && signin && (
              <form className="mt-6" onSubmit={(e) => { e.preventDefault(); setStep(1); }}>
                <h2 className="text-center font-display text-2xl font-bold">تسجيل الدخول</h2>
                <label className="mt-8 grid gap-1.5 text-sm font-bold">رقم الموبايل<input required type="tel" dir="ltr" placeholder="01x xxxx xxxx" className="h-12 rounded-xl border border-navy/20 bg-white px-4 text-right font-normal focus:border-teal" /></label>
                <button type="submit" className="mt-6 h-12 w-full rounded-xl bg-navy font-bold text-white hover:bg-navy-700">أرسل رمز الدخول</button>
                <p className="mt-4 text-center text-sm text-navy/65">ما عندكش حساب؟ <button type="button" onClick={() => onClose('tenant')} className="font-bold text-navy underline underline-offset-4">سجّل حساب جديد</button></p>
              </form>
            )}

            {step === 1 && !signin && (
              <form className="mt-6" onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                <h2 className="text-center font-display text-2xl font-bold">بياناتك كـ{roleTitle}</h2>
                <div className="mt-8 grid gap-4">
                  {[['name', 'الاسم', 'text'], ['phone', 'رقم الموبايل', 'tel'], ...(role === 'tenant' ? [['area', 'بتدور على سكن فين؟', 'text']] : [['area', 'الحي والمدينة', 'text']])].map(([id, label, type]) => (
                    <label key={id} className="grid gap-1.5 text-sm font-bold">{label}<input required type={type} name={id} className="h-12 rounded-xl border border-navy/20 bg-white px-4 font-normal focus:border-teal" /></label>
                  ))}
                </div>
                <div className="mt-8 flex gap-3">
                  <button type="button" onClick={() => setStep(0)} className="h-12 flex-1 rounded-xl bg-white/80 font-bold text-navy">رجوع</button>
                  <button type="submit" className="h-12 flex-[2] rounded-xl bg-navy font-bold text-white hover:bg-navy-700">أنشئ الحساب</button>
                </div>
              </form>
            )}

            {step === steps - 1 && (
              <div className="mt-8 text-center">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-cyan-soft text-teal-600"><Icon d={I.check} className="h-7 w-7" /></span>
                <p className="mt-4 font-display text-xl font-bold">{signin ? 'أهلاً بيك تاني' : 'أهلاً بيك في سُكنة'}</p>
                <p className="mt-2 text-sm text-navy/60">هذه نسخة توضيحية من سُكنة، لذلك لم تُرسل أي بيانات.</p>
                <button type="button" onClick={() => onClose()} className="mt-6 h-12 w-full rounded-xl bg-navy font-bold text-white">تصفّح الوحدات</button>
              </div>
            )}
          </div>

          <ol className="mx-auto mt-4 flex w-full max-w-sm gap-3" aria-label={`الخطوة ${ar(step + 1)} من ${ar(steps)}`}>
            {Array.from({ length: steps }, (_, i) => <li key={i} className={`h-1.5 flex-1 rounded-full ${i <= step ? 'bg-teal' : 'bg-navy/20'}`} />)}
          </ol>
        </div>
        <div className="relative hidden lg:block">
          <img src="/images/building.jpg" alt="" className="absolute inset-0 h-full w-full object-cover object-right" />
        </div>
      </div>
    </dialog>
  );
}

function Footer() {
  return (
    <footer id="about" className="scroll-mt-24 bg-mist">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-8 md:grid-cols-[1.2fr_1fr]">
        <div>
          <Logo className="h-10 w-auto" />
          <h2 className="mt-5 font-display text-2xl font-bold">من نحن</h2>
          <p className="mt-3 max-w-md leading-relaxed text-navy/70">سُكنة تبسّط تجربة الإيجار لأصحاب العقارات والمستأجرين والطلاب الوافدين في مصر: إعلانات واضحة، بحث بالحي أو الجامعة، وتواصل مباشر من غير وسطاء.</p>
        </div>
        <div id="contact" className="scroll-mt-24">
          <h2 className="font-display text-2xl font-bold">تواصل معنا</h2>
          <p className="mt-3 text-navy/70">عندك سؤال أو عايز تعرض وحدات كتير؟ ابعتلنا وهنرد عليك.</p>
          <nav className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold text-navy/70" aria-label="روابط">
            {NAV.map((n) => <a key={n.href} href={n.href} className="hover:text-teal">{n.label}</a>)}
          </nav>
        </div>
      </div>
      <p className="border-t border-navy/10 px-4 py-5 text-center text-xs text-navy/55">© سُكنة · تصوّر لمنصة إيجار، والوحدات المعروضة بيانات توضيحية.</p>
    </footer>
  );
}

const EMPTY = { q: '', kind: 'all', audience: 'all' };

// Arabic search that ignores alef/yaa/taa-marbuta spelling variants
const norm = (s) => s.toLowerCase().replace(/[أإآ]/g, 'ا').replace(/ى/g, 'ي').replace(/ة/g, 'ه').trim();

export default function App() {
  const [filters, setFilters] = useState(EMPTY);
  const [join, setJoin] = useState(null); // null | 'tenant' | 'owner' | 'agency' | 'signin'
  const listingsRef = useRef(null);

  const results = useMemo(() => {
    const q = norm(filters.q);
    return LISTINGS.filter((h) =>
      (filters.kind === 'all' || h.kind === filters.kind) &&
      (filters.audience === 'all' || h.audience === filters.audience) &&
      (!q || norm(`${h.title} ${h.area} ${h.city} ${h.near}`).includes(q)));
  }, [filters]);

  const toResults = () => listingsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  // Closing can hand over to another entry point (sign in <-> sign up)
  const closeJoin = (next) => {
    setJoin(null);
    if (typeof next === 'string') setTimeout(() => setJoin(next), 60);
  };

  return (
    <>
      <a href="#services" className="sr-only focus:not-sr-only focus:fixed focus:right-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-white focus:px-4 focus:py-2">انتقل إلى الوحدات</a>
      <Header onJoin={setJoin} />
      <main>
        <Hero filters={filters} setFilters={setFilters} onSearch={toResults} />
        <Listings filters={filters} setFilters={setFilters} results={results} sectionRef={listingsRef} />
        <Roles onJoin={setJoin} />
        <Students onPick={() => { setFilters({ ...EMPTY, audience: 'students' }); toResults(); }} />
      </main>
      <Footer />
      <Onboarding start={join} onClose={closeJoin} />
    </>
  );
}
