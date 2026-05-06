/* ── BMC Core JS — shared across all pages ────────────── */

/* Loader */
(function(){
  const loader = document.getElementById('loader')
  if (!loader) return
  const fill = loader.querySelector('.loader-fill')
  const pct  = loader.querySelector('.loader-pct')
  let p = 0
  const iv = setInterval(() => {
    p = Math.min(p + Math.random() * 9 + 2, 100)
    if (fill) fill.style.width = p + '%'
    if (pct)  pct.textContent  = Math.floor(p) + '%'
    if (p >= 100) {
      clearInterval(iv)
      setTimeout(() => loader.classList.add('out'), 400)
    }
  }, 55)
})()

/* Cursor */
;(function(){
  const dot  = document.getElementById('c-dot')
  const ring = document.getElementById('c-ring')
  if (!dot || !ring) return
  let mx=0,my=0,rx=0,ry=0
  document.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY })
  ;(function tick(){
    dot.style.left  = mx+'px'; dot.style.top  = my+'px'
    rx += (mx-rx)*.1;  ry += (my-ry)*.1
    ring.style.left = rx+'px'; ring.style.top = ry+'px'
    requestAnimationFrame(tick)
  })()
  const add = () => ring.classList.add('hover')
  const rem = () => ring.classList.remove('hover')
  function bindCursor(){
    document.querySelectorAll('a,button,.food-card,.model-card,.loc-card,.blog-card,.gal-item,[data-cursor]')
      .forEach(el => { el.removeEventListener('mouseenter',add); el.removeEventListener('mouseleave',rem); el.addEventListener('mouseenter',add); el.addEventListener('mouseleave',rem) })
  }
  bindCursor()
  new MutationObserver(bindCursor).observe(document.body,{childList:true,subtree:true})
})()

/* Scroll progress */
;(function(){
  const bar = document.getElementById('spb')
  if (!bar) return
  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100
    bar.style.width = pct + '%'
  }, { passive: true })
})()

/* Nav hide/show on scroll */
;(function(){
  const nav = document.getElementById('main-nav')
  if (!nav) return
  let lastY = 0
  window.addEventListener('scroll', () => {
    const y = window.scrollY
    const delta = y - lastY
    if (y <= 12) nav.classList.remove('hide')
    else if (delta > 6) nav.classList.add('hide')
    else if (delta < -6) nav.classList.remove('hide')
    lastY = y
  }, { passive: true })
})()

/* Mobile menu */
;(function(){
  const btn     = document.getElementById('ham-btn')
  const overlay = document.getElementById('mob-overlay')
  const close   = document.getElementById('mob-close')
  if (!btn || !overlay) return
  btn.addEventListener('click',   () => { overlay.classList.add('open');    document.body.style.overflow='hidden' })
  close.addEventListener('click', () => { overlay.classList.remove('open'); document.body.style.overflow='' })
  overlay.querySelectorAll('.mob-link,.btn').forEach(el => {
    el.addEventListener('click', () => { overlay.classList.remove('open'); document.body.style.overflow='' })
  })
})()

/* Scroll reveal — .rv .rl .rr */
;(function(){
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vis'); io.unobserve(e.target) } })
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })
  function observe(){
    document.querySelectorAll('.rv,.rl,.rr').forEach(el => { if (!el.classList.contains('vis')) io.observe(el) })
  }
  observe()
  new MutationObserver(observe).observe(document.body, { childList:true, subtree:true })
})()

/* Big word reveal */
;(function(){
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const wis = e.target.querySelectorAll('.wi')
        wis.forEach((w, i) => {
          setTimeout(() => { w.style.transform='translateY(0)'; w.style.opacity='1' }, i * 55)
        })
        io.unobserve(e.target)
      }
    })
  }, { threshold: 0.15 })
  setTimeout(() => {
    document.querySelectorAll('.big-rev').forEach(el => io.observe(el))
  }, 150)
})()

/* Lenis smooth scroll */
;(function(){
  if (typeof Lenis === 'undefined') return
  const lenis = new Lenis({ lerp: 0.08, smoothWheel: true })
  function raf(time){ lenis.raf(time); requestAnimationFrame(raf) }
  requestAnimationFrame(raf)
})()

/* Horizontal scroll sections */
;(function(){
  document.querySelectorAll('.hscroll-outer').forEach(outer => {
    const track  = outer.querySelector('.hscroll-track')
    const dots   = outer.querySelectorAll('.slide-dot')
    if (!track) return
    const slides = track.querySelectorAll('.hscroll-slide')
    const n = slides.length

    function update(){
      const rect = outer.getBoundingClientRect()
      const total = Math.max(outer.offsetHeight - window.innerHeight, 1)
      const consumed = Math.min(Math.max(-rect.top, 0), total)
      const progress = consumed / total
      const tx = -progress * (n - 1) * 100
      track.style.transform = `translate3d(${tx}vw,0,0)`
      const active = Math.min(n-1, Math.round(progress * (n-1)))
      dots.forEach((d, i) => {
        d.style.width    = i === active ? '24px' : '8px'
        d.style.background = i === active ? d.dataset.active : 'rgba(128,128,128,.30)'
      })
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
  })
})()

/* Proof counter animation */
;(function(){
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return
      e.target.querySelectorAll('.proof-n[data-vis]').forEach((el, i) => {
        setTimeout(() => { el.style.animation = 'countUp .7s ease both'; el.style.opacity='1' }, i * 120)
      })
      io.unobserve(e.target)
    })
  }, { threshold: 0.4 })
  document.querySelectorAll('.proof-section-wrap').forEach(el => io.observe(el))
})()

/* Set active nav link */
;(function(){
  const path = location.pathname.replace(/\/$/, '') || './'
  document.querySelectorAll('.nl').forEach(a => {
    const href = a.getAttribute('href').replace(/\/$/, '') || './'
    if (href === path) a.classList.add('active')
  })
})()
