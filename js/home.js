/* ── Homepage specific JS ─────────────────────────────── */

/* Hero animation using GSAP */
;(function(){
  if (typeof gsap === 'undefined') return
  const bg      = document.getElementById('hero-bg')
  const words   = document.querySelectorAll('.hero-word-inner')
  const sub     = document.getElementById('hero-sub')
  const btns    = document.getElementById('hero-btns')
  const scroll  = document.getElementById('hero-scroll')
  if (!bg) return

  const tl = gsap.timeline({ delay: 0.2 })
  tl.to(bg, { clipPath:'circle(150% at 50% 50%)', duration:1.2, ease:'power4.inOut' })
  words.forEach((el, i) => {
    tl.to(el, { y:0, opacity:1, duration:1, ease:'power4.out' }, i===0 ? '-=0.6' : '-=0.75')
  })
  if (sub)    tl.to(sub,    { opacity:1, y:0, duration:0.8, ease:'power3.out' }, '-=0.5')
  if (btns)   tl.to(btns,   { opacity:1, y:0, duration:0.7, ease:'power3.out' }, '-=0.5')
  if (scroll) tl.to(scroll, { opacity:1, duration:0.5 }, '-=0.3')
})()
