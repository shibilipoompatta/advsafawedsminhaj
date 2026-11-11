import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowUpRight, CalendarDays, Check, Heart, MapPin, Share2 } from 'lucide-react'
import { siteUrl } from '@/lib/site'

export const Route = createFileRoute('/')({ component: Home })
const weddingDate = new Date('2026-11-29T10:15:00+05:30').getTime()
const weddingDayEnd = new Date('2026-11-29T23:59:59+05:30').getTime()
const googleCalendarUrl = `https://calendar.google.com/calendar/render?${new URLSearchParams({
  action: 'TEMPLATE',
  text: 'Wedding of Adv. Safa Janna TK & Muhammed Minhaj NC',
  dates: '20261129T044500Z/20261129T083000Z',
  ctz: 'Asia/Kolkata',
  details: `Join us to celebrate our wedding on Sunday, 29 November 2026.\nNikah: 10:15 AM IST.\nReception: 11:00 AM–2:00 PM IST.\nWith love and blessings from our families.\n${siteUrl}`,
  location: 'NC Convention Centre, Pulparamba, Mukkam, Kozhikode, Kerala',
})}`
const mapUrl = 'https://www.google.com/maps/search/?api=1&query=NC+Convention+Centre+Pulparamba+Mukkam+Kozhikode'
const icsUrl = '/safa-minhaj-wedding.ics'

function isAppleDevice() {
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent
  return (
    /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) ||
    /Macintosh|Mac OS X/.test(ua)
  )
}

function handleCalendarClick(event: React.MouseEvent<HTMLAnchorElement>) {
  if (isAppleDevice()) {
    event.preventDefault()
    window.location.assign(icsUrl)
  }
}

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      el.dataset.reveal = 'visible'
      return
    }

    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
      el.dataset.reveal = 'visible'
      return
    }

    el.dataset.reveal = 'pending'
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.dataset.reveal = 'visible'
            observer.unobserve(el)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}
function Countdown() {
  const [now, setNow] = useState<number | null>(null)
  useEffect(() => {
    const update = () => setNow(Date.now())
    update()
    const timer = window.setInterval(update, 1000)
    return () => window.clearInterval(timer)
  }, [])
  if (now !== null && now >= weddingDate) {
    const isWeddingDay = now <= weddingDayEnd
    return (
      <div className="countdown-milestone" role="status">
        <p className="milestone-title">{isWeddingDay ? 'Today is the day' : 'Happily Married · Alhamdulillah'}</p>
        <p className="milestone-sub">
          {isWeddingDay
            ? 'Join us at NC Convention Centre · Nikah at 10:15 AM IST'
            : 'Thank you for celebrating our special day with us'}
        </p>
      </div>
    )
  }
  const remaining = now === null ? null : Math.max(0, weddingDate - now)
  const values = remaining === null ? ['—', '—', '—', '—'] : [Math.floor(remaining / 86400000), Math.floor(remaining / 3600000) % 24, Math.floor(remaining / 60000) % 60, Math.floor(remaining / 1000) % 60]
  return <div className="countdown">{values.map((value, i) => <div key={i}><span>{String(value).padStart(2, '0')}</span><small>{['Days', 'Hours', 'Minutes', 'Seconds'][i]}</small></div>)}</div>
}
function InvitationMusic({
  audioRef,
  active,
}: {
  audioRef: React.RefObject<HTMLAudioElement | null>
  active: boolean
}) {
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !active) return
    let disposed = false
    const play = () => {
      if (!disposed && audio.paused) void audio.play().catch(() => {
        // Autoplay may require a guest's first interaction with the invitation.
      })
    }
    const retryOnInteraction = (event: Event) => {
      // Calendar, directions and other links do not trigger the music.
      if (event.target instanceof Element && event.target.closest('a')) return
      play()
    }
    // The asset itself starts at the original song's 00:21, including on loops.
    audio.addEventListener('canplay', play)
    document.addEventListener('click', retryOnInteraction)
    document.addEventListener('touchend', retryOnInteraction)
    document.addEventListener('keydown', retryOnInteraction)
    play()
    return () => {
      disposed = true
      audio.removeEventListener('canplay', play)
      document.removeEventListener('click', retryOnInteraction)
      document.removeEventListener('touchend', retryOnInteraction)
      document.removeEventListener('keydown', retryOnInteraction)
      audio.pause()
    }
  }, [active, audioRef])
  return <audio ref={audioRef} loop preload="auto" hidden aria-hidden="true" src="/audio/wedding-background-from-21.m4a" />
}
function InvitationCover({ closing, onOpen }: { closing: boolean; onOpen: () => void }) {
  const onOpenRef = useRef(onOpen)

  useEffect(() => {
    onOpenRef.current = onOpen
  }, [onOpen])

  useEffect(() => {
    if (closing) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onOpenRef.current()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [closing])

  return (
    <div
      className={`cover-overlay${closing ? ' is-closing' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cover-title"
    >
      <div className="cover-florals" aria-hidden="true" />
      <div className="cover-card">
        <div className="cover-card-inner" />
        <p className="eyebrow cover-eyebrow">Wedding Invitation</p>
        <h2 id="cover-title" className="cover-names">
          Safa <span>&amp;</span> Minhaj
        </h2>
        <p className="cover-date">29 · 11 · 2026</p>
        <button type="button" className="wax-seal-btn" onClick={onOpen} aria-label="Open wedding invitation">
          <span className="wax-seal" aria-hidden="true">
            <span className="wax-seal-ring">
              S<i>&amp;</i>M
            </span>
          </span>
          <span className="cover-cta">Open Invitation</span>
        </button>
      </div>
    </div>
  )
}
function Home() {
  const [opened, setOpened] = useState(false)
  const [coverDismissed, setCoverDismissed] = useState(false)
  const [shared, setShared] = useState(false)
  const [shareMessage, setShareMessage] = useState('')
  const audioRef = useRef<HTMLAudioElement>(null)
  const celebrationRef = useReveal<HTMLElement>()
  const countdownRef = useReveal<HTMLElement>()
  const venueRef = useReveal<HTMLElement>()
  const closingRef = useReveal<HTMLElement>()

  useEffect(() => {
    if (!opened || coverDismissed) return
    const timer = window.setTimeout(() => setCoverDismissed(true), 500)
    return () => window.clearTimeout(timer)
  }, [opened, coverDismissed])

  function openInvitation() {
    if (opened) return
    setOpened(true)
    const audio = audioRef.current
    if (audio && audio.paused) {
      // Trigger playback synchronously within the user tap/click for mobile browser support.
      void audio.play().catch(() => {})
    }
  }

  async function share() {
    const data = { title: 'Safa & Minhaj · Wedding Invitation', text: 'Join us on 29 November 2026 at NC Convention Centre, Pulparamba, Mukkam, Kozhikode.', url: siteUrl }
    try {
      if (navigator.share) await navigator.share(data)
      else { await navigator.clipboard.writeText(data.url); setShared(true); setShareMessage('Invitation link copied'); window.setTimeout(() => setShared(false), 3000) }
    } catch (error) { if (!(error instanceof DOMException && error.name === 'AbortError')) setShareMessage('Please copy the invitation link from your browser to share.') }
  }
  return <>
    {!coverDismissed && <InvitationCover closing={opened} onOpen={openInvitation} />}
    <header className="site-header"><a className="monogram" href="#invitation" aria-label="Safa and Minhaj home">S<span>&</span>M<i /></a><nav aria-label="Main navigation"><a href="#celebration">The celebration</a><a href="#venue">The venue</a><a className="nav-save" href={googleCalendarUrl} target="_blank" rel="noopener noreferrer" onClick={handleCalendarClick}><CalendarDays size={14} /> Save the date</a></nav></header>
    <main>
      <section className="hero" id="invitation">
        <div className="hero-florals" aria-hidden="true" />
        <div className="invitation-frame"><div className="frame-inner" />
          <div className="invitation-copy">
            <p className="arabic" lang="ar" dir="rtl">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
            <p className="eyebrow invocation">In the name of Allah</p>
            <div className="little-divider"><span />✧<span /></div>
            <p className="intro">With hearts full of love and gratitude</p><p className="intro">we are tying the knot with our families</p>
            <h1><span className="name"><small>Adv.</small> Safa Janna <small>TK</small></span><span className="ampersand">&</span><span className="name">Muhammed Minhaj <small>NC</small></span></h1>
            <div className="families"><p>D/o Abdul Jabbar TK & Maimoona TN</p><span>together with</span><p>S/o Muhammed NC & Maimoona EP</p></div>
            <div className="date-line"><span>Sunday</span><strong>29</strong><span>November<br />2026</span></div>
            <p className="hijri">19 Jumada Al-Akhirah 1448</p>
            <p className="hero-venue">NC Convention Centre</p><p className="location">Pulparamba · Mukkam · Kozhikode</p>
            <a href="#celebration" className="hero-link">You are lovingly invited <ArrowDown size={13} /></a>
          </div>
        </div>
        <div className="hero-foot"><span>A new chapter, together.</span><span>29.11.2026</span></div>
      </section>
      <InvitationMusic audioRef={audioRef} active={opened} />
      <section ref={celebrationRef} className="welcome section-wrap" id="celebration"><p className="eyebrow">Two hearts. One beautiful beginning.</p><h2>A day made more beautiful<br />with <em>you.</em></h2><p className="welcome-text">Together with our families, we warmly invite you to celebrate our Nikah.<br className="desktop-break" /> Your presence and duas would mean the world to us.</p><div className="flower-mark" aria-hidden="true">❧</div>
        <div className="events"><article><span className="event-number">01 / THE PROMISE</span><h3>Nikah</h3><p className="event-time">10:15 <small>AM</small></p><p>The beginning of our forever,<br />with Allah’s blessings.</p></article><div className="event-center" aria-hidden="true"><Heart size={23} strokeWidth={1} /></div><article><span className="event-number">02 / THE CELEBRATION</span><h3>Reception</h3><p className="event-time">11:00 <small>AM</small> <span>—</span> 2:00 <small>PM</small></p><p>Join us for a meal, warm wishes,<br />and memories to cherish.</p></article></div>
      </section>
      <section ref={countdownRef} className="countdown-section"><p className="eyebrow">Counting the moments</p><h2>Until our <em>forever begins.</em></h2><Countdown /><a className="button" href={googleCalendarUrl} target="_blank" rel="noopener noreferrer" onClick={handleCalendarClick}><CalendarDays size={16} /> Add to Calendar <ArrowUpRight size={15} /></a><p className="time-note">Sunday, 29 November 2026 · All times in IST</p></section>
      <section ref={venueRef} className="venue section-wrap" id="venue"><div className="venue-art"><div className="venue-arch"><span className="venue-monogram">S <i>&</i> M</span><span className="eyebrow">A celebration of love</span><span className="arch-date">29 · 11 · 2026</span></div></div><div className="venue-copy"><p className="eyebrow">Meet us here</p><h2>A place to gather.<br />A day to <em>remember.</em></h2><div className="venue-address"><MapPin size={21} strokeWidth={1.2} /><div><h3>NC Convention Centre</h3><p>Pulparamba, Mukkam<br />Kozhikode, Kerala</p><p className="venue-landmark">Near Chennamangallur · ~4 km from Mukkam town</p></div></div><a className="button" href={mapUrl} target="_blank" rel="noopener noreferrer">Get directions <ArrowUpRight size={16} /></a><p className="venue-note">We can’t wait to celebrate with you.</p></div></section>
      <section ref={closingRef} className="closing"><div className="little-divider"><span />♡<span /></div><p>With love, and the blessings of our families</p><h2>Safa <em>&</em> Minhaj</h2><p className="eyebrow">Your presence is our most cherished gift.</p><button className="share-button" onClick={share}>{shared ? <Check size={15} /> : <Share2 size={15} />}{shared ? 'Link copied' : 'Share the invitation'}</button><p className="share-status" role="status">{shareMessage}</p></section>
    </main><footer><span>S & M</span><p>Made with love, for a lifetime of love.</p><a href="#invitation">Back to the invitation ↑</a></footer>
  </>
}
