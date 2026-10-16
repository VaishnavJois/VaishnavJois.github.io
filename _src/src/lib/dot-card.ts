/*
 * Turns the DevCard image into coloured dots drawn on a canvas laid over it.
 *
 * - Intro: the card assembles from scattered dots, then the real image fades in under them.
 * - Burst: on hover the dots fly out from the cursor and fade; on leave they fly back in.
 *
 * Dots are sampled from the image at runtime (it is same-origin), so they always match the
 * card that daily.dev refreshes each day. The canvas only draws while something is moving.
 */

type Dot = {
  /** Home position as a share of the card's width / height. */
  u: number
  v: number
  /** Intro start offset, in card widths. */
  ix: number
  iy: number
  /** Intro delay (0–0.35), burst distance factor and sideways curve. */
  delay: number
  reach: number
  curve: number
}

export type CardPoint = { x: number; y: number }

const COLS = 52
// The canvas overhangs the card by these shares of its size so dots can travel past its edges.
const PAD_X = 0.4
const PAD_Y = 0.3
const INTRO_MS = 1500
const BURST_MS = 850

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)
const smooth = (t: number) => t * t * (3 - 2 * t)
const clamp01 = (t: number) => Math.min(1, Math.max(0, t))

function sample(img: HTMLImageElement) {
  const rows = Math.round((COLS * img.naturalHeight) / img.naturalWidth)
  const off = document.createElement('canvas')
  off.width = COLS
  off.height = rows
  const ctx = off.getContext('2d', { willReadFrequently: true })
  if (!ctx) throw new Error('2d context unavailable')
  ctx.drawImage(img, 0, 0, COLS, rows)
  const { data } = ctx.getImageData(0, 0, COLS, rows)

  // Quantised colours let every dot of one colour share a single fill() call.
  const groups = new Map<string, Dot[]>()
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < COLS; c++) {
      const i = (r * COLS + c) * 4
      if (data[i + 3] < 140) continue
      const q = (n: number) => Math.min(255, Math.round(n / 24) * 24)
      const key = `rgb(${q(data[i])},${q(data[i + 1])},${q(data[i + 2])})`
      const angle = Math.random() * Math.PI * 2
      const far = 0.5 + Math.random() * 0.9
      const dot: Dot = {
        u: (c + 0.5) / COLS,
        v: (r + 0.5) / rows,
        ix: Math.cos(angle) * far,
        iy: Math.sin(angle) * far,
        delay: Math.random() * 0.35,
        reach: 0.25 + Math.random() * 0.6,
        curve: (Math.random() - 0.5) * 0.25,
      }
      const list = groups.get(key)
      if (list) list.push(dot)
      else groups.set(key, [dot])
    }
  }
  return { groups: [...groups], rows }
}

export function createDotCard(canvas: HTMLCanvasElement, img: HTMLImageElement) {
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('2d context unavailable')
  const { groups, rows } = sample(img)

  let W = 0
  let H = 0
  let frame = 0
  let last = 0
  // Intro runs once, from 0 to 1. Burst eases between 0 (home) and 1 (scattered).
  let intro = -1
  let burst = 0
  let burstTarget = 0
  const pointer = { x: 0, y: 0 }

  const resize = () => {
    W = img.offsetWidth
    H = img.offsetHeight
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = Math.round(W * (1 + 2 * PAD_X) * dpr)
    canvas.height = Math.round(H * (1 + 2 * PAD_Y) * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, W * PAD_X * dpr, H * PAD_Y * dpr)
    draw()
  }

  const draw = () => {
    ctx.save()
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.restore()

    const radius = (W / COLS) * 0.42
    const introOn = intro >= 0 && intro < 1
    if (!introOn && burst === 0) return

    if (introOn) {
      // Dots stay solid while they converge, then hand over to the real image.
      ctx.globalAlpha = 1 - clamp01((intro - 0.78) / 0.22)
      for (const [color, dots] of groups) {
        ctx.fillStyle = color
        ctx.beginPath()
        for (const d of dots) {
          const e = easeOut(clamp01((intro - d.delay) / 0.62))
          const x = d.u * W + d.ix * W * (1 - e)
          const y = d.v * H + d.iy * W * (1 - e)
          ctx.moveTo(x + radius, y)
          ctx.arc(x, y, radius, 0, Math.PI * 2)
        }
        ctx.fill()
      }
    } else {
      const e = smooth(burst)
      const bend = Math.sin(e * Math.PI)
      const r = radius * (1 - e * 0.35)
      // Visible only while travelling: invisible at home (the card is there) and once fully out.
      ctx.globalAlpha = Math.pow(bend, 0.8)
      for (const [color, dots] of groups) {
        ctx.fillStyle = color
        ctx.beginPath()
        for (const d of dots) {
          const hx = d.u * W
          const hy = d.v * H
          const vx = hx - pointer.x
          const vy = hy - pointer.y
          const len = Math.hypot(vx, vy) || 1
          const nx = vx / len
          const ny = vy / len
          const dist = d.reach * W * e
          const side = d.curve * W * bend
          const x = hx + nx * dist - ny * side
          const y = hy + ny * dist + nx * side
          ctx.moveTo(x + r, y)
          ctx.arc(x, y, r, 0, Math.PI * 2)
        }
        ctx.fill()
      }
    }
    ctx.globalAlpha = 1
  }

  const tick = (now: number) => {
    const dt = last ? Math.min(now - last, 100) : 16
    last = now
    if (intro >= 0 && intro < 1) {
      intro = Math.min(1, intro + dt / INTRO_MS)
      img.style.opacity = String(clamp01((intro - 0.72) / 0.28))
      if (intro === 1) img.style.opacity = ''
    } else {
      const step = dt / BURST_MS
      burst = burstTarget > burst ? Math.min(burstTarget, burst + step) : Math.max(burstTarget, burst - step)
    }
    draw()
    const moving = (intro >= 0 && intro < 1) || burst !== burstTarget
    frame = moving ? requestAnimationFrame(tick) : 0
    if (!moving) {
      last = 0
      // An idle canvas inside the floating, tilting card still costs a layer every frame: drop it.
      canvas.style.display = 'none'
    }
  }

  const run = () => {
    canvas.style.display = ''
    if (!frame) frame = requestAnimationFrame(tick)
  }

  const observer = new ResizeObserver(resize)
  observer.observe(img)
  resize()
  canvas.style.display = 'none'

  return {
    rows,
    /** Hide the image and assemble it from dots. */
    playIntro() {
      if (intro >= 0) return
      intro = 0
      img.style.opacity = '0'
      run()
    },
    /** Scatter the dots away from `point` (card pixels), or bring them home. */
    burst(on: boolean, point?: CardPoint) {
      if (point) Object.assign(pointer, point)
      burstTarget = on ? 1 : 0
      // Hovering mid-intro waits for the card to finish assembling.
      if (intro >= 0 && intro < 1) return
      run()
    },
    dispose() {
      observer.disconnect()
      cancelAnimationFrame(frame)
      canvas.style.display = 'none'
      img.style.opacity = ''
    },
  }
}
