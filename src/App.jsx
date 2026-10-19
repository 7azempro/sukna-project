import { useEffect, useMemo, useRef, useState } from 'react';
import { CITIES, LISTINGS } from './listings';

const NAV = [
  { href: '#homes', label: 'ابحث عن سكن' },
  { href: '#students', label: 'للطلاب الوافدين' },
  { href: '#owners', label: 'أضف عقارك' },
  { href: '#how', label: 'كيف تعمل' },
];

const AUDIENCES = [
  { id: 'all', label: 'الكل' },
  { id: 'students', label: 'للطلاب' },
  { id: 'families', label: 'للعائلات' },
];

const BUDGETS = [
  { value: 0, label: 'أي ميزانية' },
  { value: 500, label: 'حتى ٥٠٠$' },
  { value: 1000, label: 'حتى ١٬٠٠٠$' },
  { value: 3000, label: 'حتى ٣٬٠٠٠$' },
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
  key: ['M15 7a4 4 0 1 1-3.5 6L5 19.5V21H3v-3l6.5-6.5A4 4 0 0 1 15 7z'],
  menu: ['M4 7h16M4 12h16M4 17h16'],
  close: ['M6 6l12 12M18 6L6 18'],
  check: ['M5 12l5 5 9-10'],
  arrow: ['M15 6l-6 6 6 6'],
};

/* ── Header ───────────────────────────────────────────── */
function Header({ onList }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <header className={`sticky top-0 z-40 border-b transition-colors ${scrolled ? 'border-navy/10 bg-white/90 backdrop-blur-md' : 'border-transparent bg-white'}`}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-20 sm:px-6">
        <a href="#top" className="shrink-0" aria-label="سُكنة، الصفحة الرئيسية">
          <img src="/logo.svg" alt="سُكنة" className="h-9 w-auto sm:h-10" />
        </a>
        <nav className="hidden items-center gap-8 md:flex" aria-label="الرئيسية">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="text-[15px] font-medium text-navy/70 transition-colors hover:text-teal">{n.label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button type="button" onClick={onList} className="hidden rounded-full bg-navy px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-navy-700 sm:inline-flex">
            أضف عقارك
          </button>
          <button type="button" onClick={() => setOpen(true)} className="grid h-11 w-11 place-items-center rounded-full text-navy hover:bg-teal-50 md:hidden" aria-label="القائمة" aria-expanded={open} aria-controls="mobile-menu">
            <Icon d={I.menu} className="h-6 w-6" />
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="القائمة">
          <button type="button" className="absolute inset-0 bg-navy/40" aria-label="إغلاق القائمة" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 right-0 flex w-[82%] max-w-xs flex-col bg-white p-6 shadow-lift">
            <div className="flex items-center justify-between">
              <img src="/logo.svg" alt="سُكنة" className="h-9 w-auto" />
              <button type="button" onClick={() => setOpen(false)} className="grid h-11 w-11 place-items-center rounded-full hover:bg-teal-50" aria-label="إغلاق">
                <Icon d={I.close} className="h-6 w-6" />
              </button>
            </div>
            <nav className="mt-8 grid gap-1" aria-label="القائمة">
              {NAV.map((n) => (
                <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3.5 text-lg font-medium hover:bg-teal-50">{n.label}</a>
              ))}
            </nav>
            <button type="button" onClick={() => { setOpen(false); onList(); }} className="mt-auto rounded-full bg-navy px-5 py-3.5 font-bold text-white">أضف عقارك</button>
          </div>
        </div>
      )}
    </header>
  );
}

/* ── Hero with the search panel ───────────────────────── */
function Hero({ filters, setFilters, onSearch }) {
  const set = (k) => (e) => setFilters((f) => ({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));
  return (
    <section id="top" className="relative overflow-hidden bg-teal-50">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-14 pt-10 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:pb-20 lg:pt-16">
        <div>
          <p className="inline-flex rounded-full bg-white px-3.5 py-1.5 text-sm font-bold text-teal-600 shadow-card">أبسط تجربة للإيجار في مصر</p>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.25] sm:text-5xl lg:text-[3.5rem]">
            سكنك القادم،<br /><span className="text-teal">بدون لفّ ولا سماسرة.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-navy/70">
            منصة توفر السهولة في إيجاد وتأجير الوحدات السكنية للمالكين والمستأجرين، بالإضافة إلى خدمات أساسية للطلاب الوافدين في مصر.
          </p>

          <form
            className="mt-8 rounded-3xl bg-white p-3 shadow-lift sm:p-4"
            onSubmit={(e) => { e.preventDefault(); onSearch(); }}
            role="search"
            aria-label="ابحث عن سكن"
          >
            <div className="grid gap-2 sm:grid-cols-[1.4fr_1fr_1fr_auto]">
              <label className="relative block">
                <span className="sr-only">الحي أو اسم الجامعة</span>
                <span className="pointer-events-none absolute inset-y-0 right-4 grid place-items-center text-navy/40"><Icon d={I.search} /></span>
                <input
                  type="search"
                  value={filters.q}
                  onChange={set('q')}
                  placeholder="الحي أو الجامعة، مثلاً: سموحة"
                  className="h-14 w-full rounded-2xl bg-teal-50/60 pr-12 pl-4 text-[15px] placeholder:text-navy/40 focus:bg-white"
                />
              </label>
              <label className="block">
                <span className="sr-only">المدينة</span>
                <select value={filters.city} onChange={set('city')} className="h-14 w-full rounded-2xl bg-teal-50/60 px-4 text-[15px] focus:bg-white">
                  <option value="all">كل المدن</option>
                  {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="sr-only">الميزانية الشهرية</span>
                <select value={filters.budget} onChange={set('budget')} className="h-14 w-full rounded-2xl bg-teal-50/60 px-4 text-[15px] focus:bg-white">
                  {BUDGETS.map((b) => <option key={b.value} value={b.value}>{b.label}</option>)}
                </select>
              </label>
              <button type="submit" className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-teal px-6 text-[15px] font-bold text-white transition-colors hover:bg-teal-600">
                <Icon d={I.search} /> ابحث
              </button>
            </div>
            <label className="mt-3 flex w-fit cursor-pointer items-center gap-2 px-2 text-sm text-navy/70">
              <input type="checkbox" checked={filters.furnished} onChange={set('furnished')} className="h-4 w-4 accent-teal" />
              مفروش فقط
            </label>
          </form>
        </div>

        <div className="relative hidden lg:block">
          <img src="/images/hero.jpg" alt="" className="aspect-[4/5] w-full rounded-[2rem] object-cover shadow-lift" />
          <div className="absolute -right-6 bottom-10 w-64 rounded-2xl bg-white p-4 shadow-lift">
            <p className="text-sm text-navy/60">استوديو مفروش في الشاطبي</p>
            <p className="mt-1 text-2xl font-extrabold">٣٥٠$ <span className="text-sm font-medium text-navy/50">/ شهرياً</span></p>
            <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-2.5 py-1 text-xs font-bold text-teal-600"><Icon d={I.cap} className="h-4 w-4" /> قريب من الكليات</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Listings ─────────────────────────────────────────── */
function ListingCard({ home }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-navy/5 transition-shadow hover:shadow-lift">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={home.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" style={{ objectPosition: home.focus }} />
        <span className="absolute right-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-navy">{home.audience === 'students' ? 'مناسب للطلاب' : 'للعائلات'}</span>
        {home.furnished && <span className="absolute left-3 top-3 rounded-full bg-navy/85 px-3 py-1 text-xs font-bold text-white">مفروش</span>}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="flex items-center gap-1.5 text-sm text-navy/60"><Icon d={I.pin} className="h-4 w-4" /> {home.area}، {home.city}</p>
        <h3 className="mt-1.5 text-lg font-bold leading-snug">{home.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-navy/60">{home.blurb}</p>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-navy/70">
          <span className="flex items-center gap-1.5"><Icon d={I.bed} className="h-4 w-4" /> {ar(home.beds)} {home.beds === 1 ? 'غرفة' : 'غرف'}</span>
          <span className="flex items-center gap-1.5"><Icon d={I.bath} className="h-4 w-4" /> {ar(home.baths)} {home.baths === 1 ? 'حمّام' : 'حمّامات'}</span>
          <span className="flex items-center gap-1.5 text-teal-600"><Icon d={I.cap} className="h-4 w-4" /> {home.near}</span>
        </div>
        <div className="mt-5 flex items-end justify-between border-t border-navy/10 pt-4">
          <p className="text-2xl font-extrabold">{ar(home.price)}$ <span className="text-sm font-medium text-navy/50">/ شهرياً</span></p>
          <a href={`#${home.id}`} className="rounded-full bg-teal-50 px-4 py-2 text-sm font-bold text-teal-600 transition-colors hover:bg-teal hover:text-white">التفاصيل</a>
        </div>
      </div>
    </article>
  );
}

function Listings({ filters, setFilters, results, sectionRef }) {
  return (
    <section id="homes" ref={sectionRef} className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 sm:py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold sm:text-4xl">وحدات متاحة الآن</h2>
          <p className="mt-2 text-navy/60" aria-live="polite">{ar(results.length)} {results.length === 1 ? 'وحدة تطابق بحثك' : 'وحدات تطابق بحثك'} · بيانات توضيحية</p>
        </div>
        <div className="flex gap-1 rounded-full bg-teal-50 p-1" role="group" aria-label="لمن الوحدة">
          {AUDIENCES.map((a) => (
            <button
              key={a.id}
              type="button"
              aria-pressed={filters.audience === a.id}
              onClick={() => setFilters((f) => ({ ...f, audience: a.id }))}
              className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${filters.audience === a.id ? 'bg-white text-navy shadow-card' : 'text-navy/60 hover:text-navy'}`}
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>

      {results.length ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((h) => <ListingCard key={h.id} home={h} />)}
        </div>
      ) : (
        <div className="mt-8 rounded-3xl bg-teal-50 px-6 py-16 text-center">
          <p className="text-xl font-bold">ما فيه وحدات تطابق بحثك</p>
          <p className="mt-2 text-navy/60">جرّب ميزانية أعلى، أو مدينة أخرى، أو امسح كلمة البحث.</p>
          <button type="button" onClick={() => setFilters(EMPTY)} className="mt-6 rounded-full bg-navy px-6 py-3 font-bold text-white">امسح البحث</button>
        </div>
      )}
    </section>
  );
}

/* ── Students, owners, how it works ───────────────────── */
function Students({ onPick }) {
  const points = [
    [I.cap, 'ابحث بالقرب من جامعتك', 'اكتب اسم الجامعة أو الكلية، وتظهر لك الوحدات القريبة منها أولاً.'],
    [I.sofa, 'مفروش وجاهز للسكن', 'وحدات مفروشة بالكامل، فتصل وتبدأ دراستك من أول يوم.'],
    [I.chat, 'تواصل مباشر مع المالك', 'بدون وسطاء: اسأل وتفاوض واحجز موعد معاينة من مكان واحد.'],
  ];
  return (
    <section id="students" className="scroll-mt-20 bg-navy text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-sm font-bold text-sand">للطلاب الوافدين</p>
          <h2 className="mt-3 text-3xl font-extrabold leading-snug sm:text-4xl">جاي تدرس في مصر؟<br />ابدأ بسكن قريب وواضح.</h2>
          <p className="mt-4 text-lg leading-relaxed text-white/70">أول أسبوع في مدينة جديدة أصعب أسبوع. سُكنة تختصر البحث في الأحياء القريبة من الجامعات، بأسعار شهرية واضحة.</p>
          <button type="button" onClick={onPick} className="mt-8 rounded-full bg-teal px-6 py-3.5 font-bold transition-colors hover:bg-teal-600">اعرض وحدات الطلاب</button>
        </div>
        <ul className="grid gap-4">
          {points.map(([icon, t, d]) => (
            <li key={t} className="flex gap-4 rounded-3xl bg-white/[0.06] p-5 ring-1 ring-white/10">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-teal/20 text-teal-100"><Icon d={icon} className="h-6 w-6" /></span>
              <div><p className="text-lg font-bold">{t}</p><p className="mt-1 leading-relaxed text-white/65">{d}</p></div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Owners({ onList }) {
  const steps = [
    ['أضف وحدتك', 'الصور والسعر وعدد الغرف والموقع، في دقيقتين.'],
    ['استقبل الطلبات', 'المستأجرون يتواصلون معك مباشرة، وتختار من يعاين.'],
    ['أجّر بثقة', 'اتفقوا على الموعد والعقد، وحدّث حالة الوحدة بضغطة.'],
  ];
  return (
    <section id="owners" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 sm:py-20">
      <div className="grid gap-10 rounded-[2rem] bg-teal-50 p-6 sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:p-14">
        <div>
          <p className="text-sm font-bold text-teal-600">للمالكين</p>
          <h2 className="mt-3 text-3xl font-extrabold leading-snug sm:text-4xl">عندك وحدة فاضية؟<br />خلّيها توصل لمن يبحث.</h2>
          <button type="button" onClick={onList} className="mt-8 inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3.5 font-bold text-white transition-colors hover:bg-navy-700">
            <Icon d={I.key} /> أضف عقارك
          </button>
        </div>
        <ol id="how" className="grid scroll-mt-24 gap-4">
          {steps.map(([t, d], i) => (
            <li key={t} className="flex items-start gap-4 rounded-3xl bg-white p-5 shadow-card">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-navy text-lg font-extrabold text-white">{ar(i + 1)}</span>
              <div><p className="text-lg font-bold">{t}</p><p className="mt-1 text-navy/60">{d}</p></div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ── List-your-property dialog (concept: nothing is sent) ── */
function ListDialog({ open, onClose }) {
  const ref = useRef(null);
  const [sent, setSent] = useState(false);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) { setSent(false); d.showModal(); }
    if (!open && d.open) d.close();
  }, [open]);
  return (
    <dialog ref={ref} onClose={onClose} className="w-[min(92vw,30rem)] rounded-3xl p-0 shadow-lift backdrop:bg-navy/50">
      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between">
          <h2 className="text-2xl font-extrabold">أضف عقارك</h2>
          <button type="button" onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full hover:bg-teal-50" aria-label="إغلاق"><Icon d={I.close} /></button>
        </div>
        {sent ? (
          <div className="py-8 text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-teal-50 text-teal"><Icon d={I.check} className="h-7 w-7" /></span>
            <p className="mt-4 text-lg font-bold">تمام، وصلنا طلبك.</p>
            <p className="mt-2 text-sm text-navy/60">هذه نسخة توضيحية من سُكنة، لذلك لم تُرسل أي بيانات.</p>
          </div>
        ) : (
          <form className="mt-6 grid gap-4" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            {[['name', 'اسمك', 'text'], ['phone', 'رقم الجوال', 'tel'], ['area', 'الحي والمدينة', 'text']].map(([id, label, type]) => (
              <label key={id} className="grid gap-1.5 text-sm font-bold">
                {label}
                <input required type={type} name={id} className="h-12 rounded-2xl border border-navy/15 px-4 font-normal focus:border-teal" />
              </label>
            ))}
            <label className="grid gap-1.5 text-sm font-bold">
              نوع الوحدة
              <select name="kind" className="h-12 rounded-2xl border border-navy/15 px-4 font-normal">
                <option>شقة</option><option>استوديو</option><option>غرفة في شقة مشتركة</option><option>فيلا</option>
              </select>
            </label>
            <button type="submit" className="mt-2 h-12 rounded-full bg-navy font-bold text-white hover:bg-navy-700">أرسل</button>
          </form>
        )}
      </div>
    </dialog>
  );
}

function Footer() {
  return (
    <footer className="border-t border-navy/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <img src="/logo.svg" alt="سُكنة" className="h-9 w-auto" />
          <p className="mt-3 max-w-sm text-sm text-navy/60">تبسيط تجربة الإيجار لأصحاب العقارات والمستأجرين والطلاب الوافدين في مصر.</p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-navy/70" aria-label="روابط">
          {NAV.map((n) => <a key={n.href} href={n.href} className="hover:text-teal">{n.label}</a>)}
        </nav>
      </div>
      <p className="border-t border-navy/10 px-4 py-5 text-center text-xs text-navy/50">© سُكنة · تصوّر لمنصة إيجار، والوحدات المعروضة بيانات توضيحية.</p>
    </footer>
  );
}

const EMPTY = { q: '', city: 'all', budget: '0', furnished: false, audience: 'all' };

// Arabic search that ignores alef/yaa/taa-marbuta spelling variants
const norm = (s) => s.toLowerCase().replace(/[أإآ]/g, 'ا').replace(/ى/g, 'ي').replace(/ة/g, 'ه').trim();

export default function App() {
  const [filters, setFilters] = useState(EMPTY);
  const [listOpen, setListOpen] = useState(false);
  const listingsRef = useRef(null);

  const results = useMemo(() => {
    const q = norm(filters.q);
    const budget = Number(filters.budget);
    return LISTINGS.filter((h) =>
      (filters.city === 'all' || h.city === filters.city) &&
      (!budget || h.price <= budget) &&
      (!filters.furnished || h.furnished) &&
      (filters.audience === 'all' || h.audience === filters.audience) &&
      (!q || norm(`${h.title} ${h.area} ${h.city} ${h.near}`).includes(q)));
  }, [filters]);

  const toResults = () => listingsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <>
      <a href="#homes" className="sr-only focus:not-sr-only focus:fixed focus:right-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2">انتقل إلى الوحدات</a>
      <Header onList={() => setListOpen(true)} />
      <main>
        <Hero filters={filters} setFilters={setFilters} onSearch={toResults} />
        <Listings filters={filters} setFilters={setFilters} results={results} sectionRef={listingsRef} />
        <Students onPick={() => { setFilters({ ...EMPTY, audience: 'students' }); toResults(); }} />
        <Owners onList={() => setListOpen(true)} />
      </main>
      <Footer />
      <ListDialog open={listOpen} onClose={() => setListOpen(false)} />
    </>
  );
}
