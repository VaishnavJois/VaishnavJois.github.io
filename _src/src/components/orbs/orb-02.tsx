import { useEffect, useRef, type CSSProperties } from 'react'
import { useReducedMotion } from '@/hooks/useMotion'
import { cn } from '@/lib/utils'

/*
 * ORB-02 – "ornate scrollwork on a rolling dome".
 *
 * Shader by XorDev (https://x.com/XorDev), from shadercn's orb set. Non-commercial use only,
 * with attribution to XorDev; keep this notice with the file. Ported from shadercn's WebGPU /
 * TypeGPU version to plain WebGL2 so it needs no extra dependencies and runs in every browser.
 */

export type OrbState = 'idle' | 'thinking' | 'speaking'

type Params = {
  speed: number
  swirl: number
  radius: number
  bulge: number
  zoom: number
  warpFreq: number
  hueShift: number
  coreClamp: number
  falloff: number
  gain: number
  rim: number
  rimPow: number
  alphaGain: number
  baseVis: number
}

const DEFAULTS: Params = {
  speed: 0.5,
  swirl: 0.06,
  radius: 0.9,
  bulge: 0.35,
  zoom: 4.4,
  warpFreq: 1.5,
  hueShift: 0,
  coreClamp: 0.12,
  falloff: 1,
  gain: 0.55,
  rim: 0.12,
  rimPow: 2.2,
  alphaGain: 2.4,
  baseVis: 0.08,
}

// `swirl` is deliberately absent: the swirl angle is clock × swirl, so changing it per state
// would spin the whole dome while the preset glides.
const STATES: Record<OrbState, Partial<Params>> = {
  idle: { alphaGain: 2.4, coreClamp: 0.12, falloff: 1, gain: 0.55, rim: 0.12, speed: 0.5, warpFreq: 1.5, zoom: 4.4 },
  thinking: { alphaGain: 2.5, coreClamp: 0.11, falloff: 0.96, gain: 0.6, rim: 0.13, speed: 0.65, warpFreq: 1.6, zoom: 4.6 },
  speaking: { alphaGain: 3, coreClamp: 0.07, falloff: 1.1, gain: 0.85, rim: 0.2, speed: 3, warpFreq: 1.2, zoom: 4.4 },
}

const KEYS = Object.keys(DEFAULTS) as (keyof Params)[]

const VERT = `#version 300 es
in vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }`

const FRAG = `#version 300 es
precision highp float;
uniform vec2 uRes;
uniform float uAnim;
${KEYS.map((k) => `uniform float u_${k};`).join('\n')}
out vec4 outColor;

void main() {
  vec2 fragCoord = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y);
  vec2 uv = (fragCoord * 2.0 - uRes) / min(uRes.x, uRes.y);

  float R = max(u_radius, 0.001);
  float r2d = length(uv);
  // 1 - smoothstep(lo, hi, x): reversed edges are undefined in GLSL ES.
  float mask = 1.0 - smoothstep(-0.012, 0.012, r2d - R);
  float nr = clamp(r2d / R, 0.0, 1.0);
  float z = sqrt(max(1.0 - nr * nr, 0.0));

  // Stereographic projection of the dome onto the pattern plane; bulge flattens it toward a disc.
  vec3 sp = vec3(uv / R, z);
  vec2 p = sp.xy / (sp.z + 1.0 + u_bulge) * u_zoom;
  float sw = uAnim * u_swirl;
  float c = cos(sw), s = sin(sw);
  p = mat2(c, -s, s, c) * p;

  vec4 acc = vec4(0.0);
  for (int i = 0; i < 10; i++) {
    float fi = float(i) + 1.0;
    vec2 v = p;
    for (int j = 0; j < 9; j++) {
      float f = float(j) + 1.0;
      v += sin(v.yx * (f * u_warpFreq) + fi + uAnim) / f;
    }
    float rad = pow(max(length(v), u_coreClamp), u_falloff);
    acc += (cos(vec4(0.0, 1.0, 2.0, 3.0) + fi + u_hueShift) + 1.0) / 6.0 / rad;
  }

  vec3 col = tanh(clamp(acc.xyz * acc.xyz * u_gain, -10.0, 10.0));
  float fresnel = pow(1.0 - z, u_rimPow);
  col += vec3(fresnel * u_rim);

  float lum = dot(col, vec3(0.2126, 0.7152, 0.0722));
  float a = mask * clamp(lum * u_alphaGain + u_baseVis + fresnel * 0.25, 0.0, 1.0);
  outColor = vec4(col * a, a);
}`

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!
  gl.shaderSource(sh, src)
  gl.compileShader(sh)
  return sh
}

type Props = {
  size?: number
  state?: OrbState
  /** Fine-tune any shader parameter on top of the state preset. */
  params?: Partial<Params>
  className?: string
}

export function Orb02({ size = 306, state = 'idle', params, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const target = useRef<Params>({ ...DEFAULTS })
  // Set only when motion is reduced: redraws the still frame after a state or params change.
  const redraw = useRef<(() => void) | null>(null)
  const reduced = useReducedMotion()

  // The render loop reads the target every frame and glides towards it, so state changes are smooth.
  target.current = { ...DEFAULTS, ...STATES[state], ...params }

  useEffect(() => {
    const canvas = canvasRef.current
    const gl = canvas?.getContext('webgl2', { premultipliedAlpha: true, antialias: false })
    if (!canvas || !gl) return

    const prog = gl.createProgram()!
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const aPos = gl.getAttribLocation(prog, 'aPos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(prog, 'uRes')
    const uAnim = gl.getUniformLocation(prog, 'uAnim')
    const uParams = KEYS.map((k) => [k, gl.getUniformLocation(prog, `u_${k}`)] as const)

    const current = { ...target.current }
    // Start part-way into the animation so a still (reduced-motion) frame shows developed scrollwork.
    let anim = 12
    let last = 0
    let raf = 0
    let visible = true

    const draw = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const px = Math.round(canvas.clientWidth * dpr)
      if (canvas.width !== px) {
        canvas.width = px
        canvas.height = px
      }
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uAnim, anim)
      for (const [k, loc] of uParams) gl.uniform1f(loc, current[k])
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    const frame = (now: number) => {
      raf = 0
      const dt = last ? Math.min((now - last) / 1000, 0.1) : 0
      last = now
      const ease = 1 - Math.exp(-dt * 3)
      for (const k of KEYS) current[k] += (target.current[k] - current[k]) * ease
      // Speed is integrated rather than multiplied by time, so changing it never makes the pattern jump.
      anim += current.speed * dt
      draw()
      schedule()
    }

    const schedule = () => {
      if (!raf && visible && !document.hidden) raf = requestAnimationFrame(frame)
    }
    const pause = () => {
      cancelAnimationFrame(raf)
      raf = 0
      last = 0
    }

    if (reduced) {
      redraw.current = () => {
        Object.assign(current, target.current)
        draw()
      }
      redraw.current()
      return () => {
        redraw.current = null
        gl.deleteBuffer(buf)
        gl.deleteProgram(prog)
      }
    }

    // Only animate while on screen and the tab is visible.
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) schedule()
      else pause()
    })
    io.observe(canvas)
    const onVisibility = () => (document.hidden ? pause() : schedule())
    document.addEventListener('visibilitychange', onVisibility)
    schedule()

    return () => {
      pause()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      gl.deleteBuffer(buf)
      gl.deleteProgram(prog)
    }
  }, [reduced])

  useEffect(() => redraw.current?.())

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      // Size goes through a CSS variable so a width class in `className` can still override it.
      className={cn('block aspect-square w-(--orb-size) max-w-full', className)}
      style={{ '--orb-size': `${size}px` } as CSSProperties}
    />
  )
}

export default Orb02
