import { useEffect, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowDown,
  ArrowUpRight,
  CalendarDays,
  CalendarPlus,
  Clock3,
  Globe,
  MapPin,
  Menu,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { artwork } from '@/assets/wedding/artwork';
import { getCountdown, weddingDetails as details } from '@/config/weddingDetails';

type Lang = 'en' | 'te';

const translations = {
  en: {
    bride: details.bride,
    brideFull: details.brideFull,
    brideRole: details.brideRole,
    brideParents: details.brideParents,
    groom: details.groom,
    groomFull: details.groomFull,
    groomRole: details.groomRole,
    groomParents: details.groomParents,
    monogram: ['L', 'S'] as const,
    nav: {
      home: 'Home',
      invitation: 'Invitation',
      schedule: 'Schedule',
      location: 'Venue',
      dateBadge: '26 NOV 2026',
    },
    opening: {
      almightyBlessing: details.blessings,
      cordiallyInvite: 'We solicit your gracious presence with family and friends on the auspicious occasion of the marriage of our elder daughter',
      dateText: '26 NOVEMBER 2026 · PARIMALA CONVENTION, HYDERABAD',
      openButton: 'Open invitation',
      footnote: `With best compliments from: ${details.compliments}`,
    },
    hero: {
      eyebrow: 'Wedding Invitation · Subhalekha',
      message: 'We solicit your gracious presence with family and friends on the auspicious occasion of the marriage of our elder daughter Lokeshwari Devi with Shiva Kumar.',
      muhurthamBadge: '01 · Sumuhurtham',
      muhurthamShortDate: '26 Nov 2026 (Thu)',
      muhurthamTime: '9:16 AM IST (Dhanur Lagnam)',
      receptionBadge: '02 · Vivaha Bhojanam',
      receptionShortDate: '26 Nov 2026 (Thu)',
      receptionTime: '11:30 AM onwards',
      countdownComplete: 'Today marks the auspicious beginning of forever',
      countdownHeading: 'Counting down to the auspicious Sumuhurtham',
      units: {
        days: 'days',
        hours: 'hours',
        minutes: 'minutes',
        seconds: 'seconds',
      },
      countdownSubtext: 'Thursday, 26 November 2026 · 9:16 AM IST · Dhanur Lagnam',
      viewSchedule: 'View Schedule',
      venueMap: 'Parimala Convention Map',
    },
    invitation: {
      coupleCaption: 'Two Families · One Sacred Union',
      eyebrow: 'Wedding Invitation',
      heading: 'Subhalekha',
      BrideLabel: 'Bride · Our Elder Daughter',
      GroomLabel: 'Groom',
      abhilashaTitle: 'Abhilasha (Our Wish)',
      abhilashaText: '“In the pearl canopy and amidst sacred mantras and joyous celebrations, we request your gracious presence and blessings for Lokeshwari Devi & Shiva Kumar as they unite with the sacred three knots.”',
      hostsHeading: 'Invited by',
      hostsList: [
        { role: 'Parents (Yours Truly)', names: 'Smt. Anugutala Padma & Late Sri Anugutala Venkatesh' },
      ],
      compliments: `With best compliments from: ${details.compliments}`,
    },
    events: {
      eyebrow: 'Sacred Vedic Rituals · Schedule of Events',
      heading: 'Wedding Celebrations',
      edurukolu: {
        step: 'Event 01 · Morning Welcome',
        title: 'Edurukolu & Kasi Yatra',
        date: 'Thursday, 26 November 2026',
        time: '8:00 AM onwards',
        description: 'Traditional mangala vadyam welcome of the groom and bridal party with family blessings.',
      },
      muhurtham: {
        step: 'Event 02 · Principal Muhurtham',
        title: 'Wedding Sumuhurtham (Dhanur Lagnam)',
        date: 'Thursday, 26 November 2026',
        time: '9:16 AM IST (Dhanur Lagnam)',
        description: 'Sacred Jeelakarra Bellam, Mangalya Dharanam, and Talambralu in the auspicious Dhanur Lagnam.',
        addCalendar: 'Add Sumuhurtham to Calendar',
      },
      bhojanam: {
        step: 'Event 03 · Feast & Blessings',
        title: 'Vivaha Bhojanam & Aashirvadam',
        date: 'Thursday, 26 November 2026',
        time: '11:30 AM onwards',
        description: 'Bless the newlywed couple on stage followed by traditional festive wedding lunch.',
      },
    },
    venue: {
      eyebrow: 'Kalyana Vedika · Venue & Navigation',
      heading: 'Parimala Convention, Hyderabad',
      defaultName: details.venueName,
      defaultAddress: details.venueAddress,
      contactLabel: `Venue Address: ${details.venueAddress}`,
      directionsButton: 'Get Google Maps Directions',
      signoffEyebrow: 'Awaiting Your Gracious Presence',
      footerDate: '26 NOVEMBER 2026 · LOKESHWARI DEVI & SHIVA KUMAR · PARIMALA CONVENTION, HYDERABAD',
    },
  },
  te: {
    bride: 'లోకేశ్వరి దేవి',
    brideFull: 'చి|| సౌ|| లోకేశ్వరి దేవి',
    brideRole: 'మా జ్యేష్ఠ పుత్రిక',
    brideParents: details.brideParentsTe,
    groom: 'శివ కుమార్',
    groomFull: 'చి|| శివ కుమార్',
    groomRole: 'వరుడు',
    groomParents: details.groomParentsTe,
    monogram: ['లో', 'శి'] as const,
    nav: {
      home: 'శుభలేఖ',
      invitation: 'ఆహ్వానం',
      schedule: 'వేడుకలు',
      location: 'వేదిక',
      dateBadge: '26 నవంబర్ 2026',
    },
    opening: {
      almightyBlessing: details.blessingsTe,
      cordiallyInvite: 'మా జ్యేష్ఠ పుత్రిక వివాహ శుభ సందర్భంగా సాదర ఆహ్వానం',
      dateText: '26 నవంబర్ 2026 · పరిమళ కన్వెన్షన్, హైదరాబాద్',
      openButton: 'ఆహ్వాన పత్రిక తెరవండి',
      footnote: details.complimentsTe,
    },
    hero: {
      eyebrow: 'శుభ వివాహ ఆహ్వాన పత్రిక',
      message: 'మా జ్యేష్ఠ పుత్రిక వివాహ మహోత్సవ శుభ సందర్భంగా తామెల్లరు సకుటుంబ సపరివార సమేతంగా విచ్చేసి నూతన వధూవరులను ఆశీర్వదించవలసిందిగా ప్రార్థన.',
      muhurthamBadge: '01 · పవిత్ర సుముహూర్తం',
      muhurthamShortDate: '26 నవంబర్ 2026 (గురువారం)',
      muhurthamTime: 'ఉదయం 9:16 ని.లకు (ధనుర్ లగ్నం)',
      receptionBadge: '02 · వివాహ భోజనం',
      receptionShortDate: '26 నవంబర్ 2026 (గురువారం)',
      receptionTime: 'ఉదయం 11:30 గంటల నుండి',
      countdownComplete: 'నేటితో మా కొత్త జీవిత ప్రయాణం శుభారంభం',
      countdownHeading: 'శుభ సుముహూర్తానికి మిగిలి ఉన్న సమయం',
      units: {
        days: 'రోజులు',
        hours: 'గంటలు',
        minutes: 'నిమిషాలు',
        seconds: 'సెకన్లు',
      },
      countdownSubtext: 'గురువారం, 26 నవంబర్ 2026 · ఉదయం 9:16 ని.లకు · ధనుర్ లగ్నం',
      viewSchedule: 'వేడుకల వివరాలు',
      venueMap: 'పరిమళ కన్వెన్షన్ మ్యాప్',
    },
    invitation: {
      coupleCaption: 'రెండు కుటుంబాలు · ఒకే పవిత్ర బంధం',
      eyebrow: 'పవిత్ర బంధం',
      heading: 'శుభ వివాహ ఆహ్వాన పత్రిక',
      BrideLabel: 'వధువు · మా జ్యేష్ఠ పుత్రిక',
      GroomLabel: 'వరుడు',
      abhilashaTitle: 'అభిలాష',
      abhilashaText: '“పెద్దల ఆశీస్సులతో, బంధుమిత్రుల సమక్షంలో మూడుముళ్ళ బంధంతో ఏకమవుతున్న లోకేశ్వరి దేవి & శివ కుమార్ గార్లను నిండు మనస్సుతో ఆశీర్వదించగలరు.”',
      hostsHeading: 'ఆహ్వానించువారు',
      hostsList: [
        { role: 'తల్లిదండ్రులు (భవదీయులు)', names: 'శ్రీమతి అనుగుతల పద్మ & కీ||శే|| శ్రీ అనుగుతల వెంకటేష్' },
      ],
      compliments: details.complimentsTe,
    },
    events: {
      eyebrow: 'పవిత్ర వివాహ క్రతువు · వేడుకల వివరాలు',
      heading: 'వివాహ మహోత్సవ వేడుకలు',
      edurukolu: {
        step: 'వేడుక 01 · ఎదురుకోలు & కాశీయాత్ర',
        title: 'ఎదురుకోలు & సాంప్రదాయ స్వాగతం',
        date: '26 నవంబర్ 2026, గురువారం',
        time: 'ఉదయం 8:00 గంటల నుండి',
        description: 'మంగళ వాయిద్యాల నడుమ వరునికి మరియు బంధుమిత్రులకు సాంప్రదాయ స్వాగతం.',
      },
      muhurtham: {
        step: 'వేడుక 02 · ప్రధాన సుముహూర్తం',
        title: 'శుభ సుముహూర్తం (ధనుర్ లగ్నం)',
        date: '26 నవంబర్ 2026, గురువారం',
        time: 'ఉదయం 9:16 ని.లకు (ధనుర్ లగ్నం)',
        description: 'పవిత్ర ధనుర్ లగ్న సుముహూర్తమున జీలకర్ర బెల్లం, మాంగళ్య ధారణ మరియు తలంబ్రాల వేడుక.',
        addCalendar: 'క్యాలెండర్‌లో చేర్చుకోండి',
      },
      bhojanam: {
        step: 'వేడుక 03 · ఆశీర్వాదం & విందు',
        title: 'నూతన వధూవరుల ఆశీర్వాదం & వివాహ భోజనం',
        date: '26 నవంబర్ 2026, గురువారం',
        time: 'ఉదయం 11:30 గంటల నుండి',
        description: 'నూతన వధూవరులను ఆశీర్వదించి, సాంప్రదాయ వివాహ విందు భోజనం స్వీకరించగలరు.',
      },
    },
    venue: {
      eyebrow: 'కళ్యాణ వేదిక & మార్గదర్శకత్వం',
      heading: 'పరిమళ కన్వెన్షన్, హైదరాబాద్',
      defaultName: 'పరిమళ కన్వెన్షన్',
      defaultAddress: details.venueAddress,
      contactLabel: `వేదిక చిరునామా: ${details.venueAddress}`,
      directionsButton: 'గూగుల్ మ్యాప్స్ డైరెక్షన్స్',
      signoffEyebrow: 'మీ ఆగమనాన్ని కోరుతూ',
      footerDate: '26 నవంబర్ 2026 · లోకేశ్వరి దేవి & శివ కుమార్ · పరిమళ కన్వెన్షన్, హైదరాబాద్',
    },
  },
} as const;

function Art({ src, alt, className = '', eager = false }: { src: string; alt: string; className?: string; eager?: boolean }) {
  return <img className={`wedding-art ${className}`} src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" />;
}

function OrnamentalDivider() {
  return <Art src={artwork.divider} alt="Golden lotus and jasmine ornamental divider" className="ornamental-divider" />;
}

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: reduced ? 0 : 0.65 }}
    >
      {children}
    </motion.div>
  );
}

function LanguageSwitcher({
  lang,
  onToggle,
  floating = false,
}: {
  lang: Lang;
  onToggle: (next: Lang) => void;
  floating?: boolean;
}) {
  return (
    <div
      className={floating ? 'lang-switcher lang-switcher-floating' : 'lang-switcher'}
      role="group"
      aria-label="Language selector / భాష ఎంపిక"
    >
      <Globe size={13} className="lang-icon" aria-hidden="true" />
      <button
        type="button"
        className={lang === 'en' ? 'lang-btn is-active' : 'lang-btn'}
        onClick={() => onToggle('en')}
        aria-pressed={lang === 'en'}
      >
        EN
      </button>
      <button
        type="button"
        className={lang === 'te' ? 'lang-btn is-active telugu' : 'lang-btn telugu'}
        onClick={() => onToggle('te')}
        aria-pressed={lang === 'te'}
      >
        తెలుగు
      </button>
    </div>
  );
}

function getGoogleCalendarUrl(title: string, startIso: string, durationMinutes: number, description: string) {
  const startMs = Date.parse(startIso);
  const endMs = startMs + durationMinutes * 60 * 1000;
  const fmt = (ms: number) => new Date(ms).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${fmt(startMs)}/${fmt(endMs)}`,
    details: `${description}\n\nVenue: ${details.venueName}, ${details.venueAddress}\nDirections: ${details.mapsUrl}`,
    location: `${details.venueName}, ${details.venueAddress}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/* ========================================================
   OPENING SCREEN — Lokeshwari Devi & Shiva Kumar Wedding
   ======================================================== */
function Opening({
  onOpen,
  lang,
  onToggleLang,
}: {
  onOpen: () => void;
  lang: Lang;
  onToggleLang: (next: Lang) => void;
}) {
  const reduced = useReducedMotion();
  const t = translations[lang];
  const isTe = lang === 'te';

  return (
    <motion.section
      className={`opening ${isTe ? 'lang-te' : ''}`}
      aria-label="Open the wedding invitation"
      initial={false}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0 : 0.75 }}
    >
      <LanguageSwitcher lang={lang} onToggle={onToggleLang} floating />
      <Art
        src={artwork.toranam}
        alt="Traditional mango leaf toranam with jasmine garlands and brass bell"
        className="opening-toranam"
        eager
      />

      <div className="opening-content">
        <div className="telugu-auspicious-row">
          <span>|| శ్రీరస్తు ||</span>
          <span className="dot">·</span>
          <span>|| శుభమస్తు ||</span>
          <span className="dot">·</span>
          <span>|| అవిఘ్నమస్తు ||</span>
        </div>

        <motion.div
          initial={false}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reduced ? 0 : 0.85 }}
        >
          <Art
            src={artwork.ganesha}
            alt="Golden Lord Ganesha surrounded by jasmine flowers and glowing traditional deepams"
            className="opening-ganesha"
            eager
          />
        </motion.div>

        <p className="telugu blessing">శ్రీ గణేశాయ నమః</p>
        <p className={`opening-blessing ${isTe ? 'telugu' : ''}`}>{t.opening.almightyBlessing}</p>

        <OrnamentalDivider />

        <p className={`eyebrow ${isTe ? 'telugu eyebrow-te' : ''}`}>{t.opening.cordiallyInvite}</p>

        <h1 className={`opening-names ${isTe ? 'telugu names-te' : ''}`}>
          {t.bride}
          <span>&amp;</span>
          {t.groom}
        </h1>

        <p className={`opening-date ${isTe ? 'telugu' : ''}`}>{t.opening.dateText}</p>

        <Button variant="invitation" onClick={onOpen} className={isTe ? 'telugu' : ''}>
          {t.opening.openButton} <ArrowUpRight aria-hidden="true" size={16} />
        </Button>

        <p className={`opening-footnote ${isTe ? 'telugu' : ''}`}>{t.opening.footnote}</p>
      </div>

      <p className="opening-bottom telugu">శుభమస్తు</p>
    </motion.section>
  );
}

/* ========================================================
   STICKY HEADER — Clean, Minimal, Translucent Frosted Glass
   ======================================================== */
function Navigation({ lang, onToggleLang }: { lang: Lang; onToggleLang: (next: Lang) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = translations[lang];
  const isTe = lang === 'te';

  const links = [
    [t.nav.home, 'home'],
    [t.nav.invitation, 'invitation'],
    [t.nav.schedule, 'celebrations'],
    [t.nav.location, 'venue'],
  ];

  return (
    <header className="wedding-header">
      <a className={`monogram ${isTe ? 'telugu' : ''}`} href="#home" aria-label="Lokeshwari Devi and Shiva Kumar, home">
        {t.monogram[0]} <span>&amp;</span> {t.monogram[1]}
      </a>

      <nav className={menuOpen ? 'wedding-navigation is-open' : 'wedding-navigation'} aria-label="Wedding navigation">
        {links.map(([label, id]) => (
          <a
            href={`#${id}`}
            key={id}
            className={isTe ? 'telugu nav-link-te' : ''}
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </a>
        ))}
      </nav>

      <div className="header-right-controls">
        <p className={`nav-date ${isTe ? 'telugu' : ''}`}>{t.nav.dateBadge}</p>
        <LanguageSwitcher lang={lang} onToggle={onToggleLang} />
        <Button
          className="mobile-menu"
          variant="weddingNav"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </Button>
      </div>
    </header>
  );
}

/* ========================================================
   SECTION 1 — HERO PROCLAMATION & COUNTDOWN
   ======================================================== */
function Hero({ lang }: { lang: Lang }) {
  const reduced = useReducedMotion();
  const [count, setCount] = useState<ReturnType<typeof getCountdown> | null>(null);
  const t = translations[lang];
  const isTe = lang === 'te';

  useEffect(() => {
    const update = () => setCount(getCountdown(Date.now()));
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="home" className="hero wedding-section">
      <Art src={artwork.garland} alt="" className="hero-floral hero-floral-left" eager />
      <Art src={artwork.garland} alt="" className="hero-floral hero-floral-right" eager />

      <div className="hero-container">
        <Reveal className="arch-frame">
          <Art
            src={artwork.arch}
            alt="Ornate ivory temple arch framed by jasmine garlands and banana leaves"
            className="temple-arch"
            eager
          />
          <div className="hero-names">
            <p className={`eyebrow ${isTe ? 'telugu eyebrow-te' : ''}`}>{t.hero.eyebrow}</p>
            <h1 className={`hero-names-compact ${isTe ? 'telugu hero-names-te' : ''}`}>
              {[t.bride, '&', t.groom].map((name, i) => (
                <motion.span
                  key={name}
                  className={name === '&' ? 'hero-ampersand' : undefined}
                  initial={{ opacity: +!reduced, y: reduced ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduced ? 0 : 0.65, delay: reduced ? 0 : 0.12 + i * 0.14 }}
                >
                  {name}
                </motion.span>
              ))}
            </h1>
            <p className="telugu">శుభమస్తు</p>
          </div>
        </Reveal>

        <Reveal className="hero-summary-card">
          <div className="telugu-auspicious-row card-auspicious">
            <span>|| శ్రీరస్తు ||</span>
            <span className="dot">·</span>
            <span>|| శుభమస్తు ||</span>
            <span className="dot">·</span>
            <span>|| అవిఘ్నమస్తు ||</span>
          </div>

          <p className={`hero-message ${isTe ? 'telugu hero-message-te' : ''}`}>{t.hero.message}</p>
          <OrnamentalDivider />

          <div className="hero-event-dates">
            <div className="hero-date-item">
              <span className={`event-badge ${isTe ? 'telugu' : ''}`}>{t.hero.muhurthamBadge}</span>
              <strong className={isTe ? 'telugu' : ''}>{t.hero.muhurthamShortDate}</strong>
              <small className={isTe ? 'telugu' : ''}>{t.hero.muhurthamTime}</small>
            </div>
            <span className="date-separator" aria-hidden="true" />
            <div className="hero-date-item">
              <span className={`event-badge ${isTe ? 'telugu' : ''}`}>{t.hero.receptionBadge}</span>
              <strong className={isTe ? 'telugu' : ''}>{t.hero.receptionShortDate}</strong>
              <small className={isTe ? 'telugu' : ''}>{t.hero.receptionTime}</small>
            </div>
          </div>

          <div id="countdown" className="hero-countdown-strip">
            <p className={`eyebrow ${isTe ? 'telugu eyebrow-te' : ''}`}>
              {count?.complete ? t.hero.countdownComplete : t.hero.countdownHeading}
            </p>
            {!count?.complete && (
              <div className="countdown" role="timer" aria-label="Time until the wedding Muhurtham">
                {(['days', 'hours', 'minutes', 'seconds'] as const).map((unit) => (
                  <div className="countdown-unit" key={unit}>
                    <span>{count ? String(count[unit]).padStart(2, '0') : '—'}</span>
                    <small className={isTe ? 'telugu' : ''}>{t.hero.units[unit]}</small>
                  </div>
                ))}
              </div>
            )}
            <p className={`countdown-subtext ${isTe ? 'telugu' : ''}`}>{t.hero.countdownSubtext}</p>
          </div>

          <div className="hero-actions">
            <a href="#celebrations" className={`scroll-cue ${isTe ? 'telugu' : ''}`}>
              <span>{t.hero.viewSchedule}</span>
              <ArrowDown size={14} />
            </a>
            <a href={details.mapsUrl} target="_blank" rel="noopener noreferrer" className={`venue-link ${isTe ? 'telugu' : ''}`}>
              <MapPin size={14} />
              <span>{t.hero.venueMap}</span>
              <ArrowUpRight size={13} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ========================================================
   SECTION 2 — COUPLE & INVITATION SUBHALEKHA
   ======================================================== */
function CoupleSection({ lang }: { lang: Lang }) {
  const t = translations[lang];
  const isTe = lang === 'te';

  return (
    <section id="invitation" className="invitation-section wedding-section">
      <Art src={artwork.corner} alt="" className="invitation-floral-tl" />
      <Art src={artwork.corner} alt="" className="invitation-floral-br" />

      <div className="invitation-layout">
        <Reveal className="couple-frame">
          <div className="couple-arch-card">
            <Art
              src={artwork.couple}
              alt="Lokeshwari Devi and Shiva Kumar"
              className="couple-art"
            />
            <div className="couple-caption">
              <p className={`eyebrow ${isTe ? 'telugu eyebrow-te' : ''}`}>{t.invitation.coupleCaption}</p>
              <p className="telugu">కళ్యాణమస్తు</p>
            </div>
          </div>
        </Reveal>

        <Reveal className="invitation-copy">
          <p className={`eyebrow ${isTe ? 'telugu eyebrow-te' : ''}`}>{t.invitation.eyebrow}</p>
          <h2 className={isTe ? 'telugu heading-te' : ''}>{t.invitation.heading}</h2>
          <OrnamentalDivider />

          <div className="couple-formal-names">
            <div className="person-block">
              <span className={`person-role ${isTe ? 'telugu' : ''}`}>{t.invitation.BrideLabel}</span>
              <h3 className={isTe ? 'telugu names-inline-te' : ''}>{t.brideFull}</h3>
              <p className={`parent-detail ${isTe ? 'telugu' : ''}`}>{t.brideParents}</p>
            </div>

            <p className={`with-conjunction ${isTe ? 'telugu' : ''}`}>&amp;</p>

            <div className="person-block">
              <span className={`person-role ${isTe ? 'telugu' : ''}`}>{t.invitation.GroomLabel}</span>
              <h3 className={isTe ? 'telugu names-inline-te' : ''}>{t.groomFull}</h3>
              <p className={`parent-detail ${isTe ? 'telugu' : ''}`}>{t.groomParents}</p>
            </div>
          </div>

          <div className="hosts-grid">
            <h4 className={`hosts-title ${isTe ? 'telugu' : ''}`}>{t.invitation.hostsHeading}</h4>
            {t.invitation.hostsList.map((host) => (
              <div className="host-entry" key={host.role}>
                <span className={`host-role ${isTe ? 'telugu' : ''}`}>{host.role}</span>
                <p className={`host-names ${isTe ? 'telugu' : ''}`}>{host.names}</p>
              </div>
            ))}
          </div>

          <p className={`compliments-note ${isTe ? 'telugu' : ''}`}>{t.invitation.compliments}</p>

          <blockquote className={`telugu-mantra ${isTe ? 'telugu' : ''}`}>
            <strong>{t.invitation.abhilashaTitle}</strong>
            <p>{t.invitation.abhilashaText}</p>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}

/* ========================================================
   SECTION 3 — CELEBRATIONS & TIMELINE
   ======================================================== */
function CelebrationsSection({ lang }: { lang: Lang }) {
  const t = translations[lang];
  const isTe = lang === 'te';

  const weddingCalUrl = getGoogleCalendarUrl(
    `Lokeshwari Devi & Shiva Kumar — Wedding Sumuhurtham`,
    details.wedding.startsAt,
    180,
    `Sacred Wedding Sumuhurtham ("Dhanur Lagnam") of Chi. Sow. Lokeshwari Devi & Chi. Shiva Kumar at Parimala Convention, Narayanaguda, Hyderabad.`
  );

  return (
    <section id="celebrations" className="celebrations-section wedding-section">
      <Reveal className="section-heading">
        <p className={`eyebrow ${isTe ? 'telugu eyebrow-te' : ''}`}>{t.events.eyebrow}</p>
        <h2 className={isTe ? 'telugu heading-te' : ''}>{t.events.heading}</h2>
        <OrnamentalDivider />
      </Reveal>

      <div className="event-grid">
        <Reveal className="event-card">
          <div className="event-card-header">
            <span className={`event-step ${isTe ? 'telugu' : ''}`}>{t.events.edurukolu.step}</span>
          </div>
          <div className="event-art">
            <Art src={artwork.diya} alt="Traditional golden brass lamp surrounded by jasmine flowers" />
          </div>
          <div className="event-body">
            <h3 className={isTe ? 'telugu heading-te' : ''}>{t.events.edurukolu.title}</h3>
            {!isTe && <p className="telugu event-telugu">స్వాగతం &amp; ఎదురుకోలు</p>}
            <div className="event-facts">
              <div className={`event-fact ${isTe ? 'telugu' : ''}`}>
                <CalendarDays size={15} />
                <span>{t.events.edurukolu.date}</span>
              </div>
              <div className={`event-fact ${isTe ? 'telugu' : ''}`}>
                <Clock3 size={15} />
                <span>{t.events.edurukolu.time}</span>
              </div>
            </div>
            <p className={`event-description ${isTe ? 'telugu body-te' : ''}`}>{t.events.edurukolu.description}</p>
          </div>
        </Reveal>

        <Reveal className="event-card">
          <div className="event-card-header">
            <span className={`event-step ${isTe ? 'telugu' : ''}`}>{t.events.muhurtham.step}</span>
          </div>
          <div className="event-art">
            <Art src={artwork.mandapam} alt="Traditional South Indian wedding mandapam" />
          </div>
          <div className="event-body">
            <h3 className={isTe ? 'telugu heading-te' : ''}>{t.events.muhurtham.title}</h3>
            {!isTe && <p className="telugu event-telugu">ధనుర్ లగ్న సుముహూర్తం</p>}
            <div className="event-facts">
              <div className={`event-fact ${isTe ? 'telugu' : ''}`}>
                <CalendarDays size={15} />
                <span>{t.events.muhurtham.date}</span>
              </div>
              <div className={`event-fact ${isTe ? 'telugu' : ''}`}>
                <Clock3 size={15} />
                <span>{t.events.muhurtham.time}</span>
              </div>
            </div>
            <p className={`event-description ${isTe ? 'telugu body-te' : ''}`}>{t.events.muhurtham.description}</p>
            <a href={weddingCalUrl} target="_blank" rel="noopener noreferrer" className={`event-cal-link ${isTe ? 'telugu' : ''}`}>
              <CalendarPlus size={14} />
              <span>{t.events.muhurtham.addCalendar}</span>
            </a>
          </div>
        </Reveal>

        <Reveal className="event-card">
          <div className="event-card-header">
            <span className={`event-step ${isTe ? 'telugu' : ''}`}>{t.events.bhojanam.step}</span>
          </div>
          <div className="event-art">
            <Art src={artwork.feast} alt="Traditional Telugu wedding feast on banana leaf" />
          </div>
          <div className="event-body">
            <h3 className={isTe ? 'telugu heading-te' : ''}>{t.events.bhojanam.title}</h3>
            {!isTe && <p className="telugu event-telugu">ఆశీర్వాదం &amp; వివాహ భోజనం</p>}
            <div className="event-facts">
              <div className={`event-fact ${isTe ? 'telugu' : ''}`}>
                <CalendarDays size={15} />
                <span>{t.events.bhojanam.date}</span>
              </div>
              <div className={`event-fact ${isTe ? 'telugu' : ''}`}>
                <Clock3 size={15} />
                <span>{t.events.bhojanam.time}</span>
              </div>
            </div>
            <p className={`event-description ${isTe ? 'telugu body-te' : ''}`}>{t.events.bhojanam.description}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ========================================================
   SECTION 4 — VENUE & FOOTER
   ======================================================== */
function VenueSection({ lang }: { lang: Lang }) {
  const t = translations[lang];
  const isTe = lang === 'te';

  return (
    <footer id="venue" className="venue-closing-section wedding-section">
      <Art src={artwork.corner} alt="" className="closing-floral-tl" />
      <Art src={artwork.corner} alt="" className="closing-floral-br" />

      <div className="venue-closing-container">
        <Reveal className="venue-card">
          <div className="venue-icon-wrap">
            <MapPin className="venue-pin" size={22} strokeWidth={1.5} />
          </div>
          <p className={`eyebrow ${isTe ? 'telugu eyebrow-te' : ''}`}>{t.venue.eyebrow}</p>
          <h2 className={isTe ? 'telugu heading-te' : ''}>{t.venue.heading}</h2>
          <p className={`venue-name ${isTe ? 'telugu' : ''}`}>{t.venue.defaultName}</p>
          <p className={`venue-address ${isTe ? 'telugu body-te' : ''}`}>{t.venue.defaultAddress}</p>
          <p className={`contact-residence ${isTe ? 'telugu' : ''}`}>{t.venue.contactLabel}</p>

          <div className="venue-actions">
            <Button variant="invitation" asChild className={isTe ? 'telugu' : ''}>
              <a href={details.mapsUrl} target="_blank" rel="noopener noreferrer">
                {t.venue.directionsButton} <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </Button>
          </div>
        </Reveal>

        <Reveal className="closing-signoff">
          <OrnamentalDivider />
          <p className={`eyebrow ${isTe ? 'telugu eyebrow-te' : ''}`}>{t.venue.signoffEyebrow}</p>
          <h3 className={isTe ? 'telugu names-inline-te' : ''}>
            {t.bride} <i>&amp;</i> {t.groom}
          </h3>
          <div className="telugu-auspicious-row closing-row">
            <span>|| శ్రీరస్తు ||</span>
            <span className="dot">·</span>
            <span>|| శుభమస్తు ||</span>
            <span className="dot">·</span>
            <span>|| అవిఘ్నమస్తు ||</span>
          </div>
        </Reveal>
      </div>

      <p className={`footer-date ${isTe ? 'telugu' : ''}`}>{t.venue.footerDate}</p>
    </footer>
  );
}

export function WeddingInvitation() {
  const [opened, setOpened] = useState(false);
  const [lang, setLang] = useState<Lang>('en');

  useEffect(() => {
    if (!opened) return;
    window.scrollTo(0, 0);
  }, [opened]);

  return (
    <>
      <AnimatePresence>
        {!opened && <Opening onOpen={() => setOpened(true)} lang={lang} onToggleLang={setLang} />}
      </AnimatePresence>
      {opened && (
        <motion.div
          className={lang === 'te' ? 'lang-te' : undefined}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <Navigation lang={lang} onToggleLang={setLang} />
          <main>
            <Hero lang={lang} />
            <CoupleSection lang={lang} />
            <CelebrationsSection lang={lang} />
          </main>
          <VenueSection lang={lang} />
        </motion.div>
      )}
    </>
  );
}
