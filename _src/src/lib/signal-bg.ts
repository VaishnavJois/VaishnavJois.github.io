/*
 * Signal: a human profile made of live code. A WebGL motion background.
 *
 * Vendored from the dvklab "Signal" template (https://dvklab.vercel.app/templates/signal/bg.js).
 * The shader is unchanged apart from two lines: the bust is placed at the `o` (focus) uniform the
 * original script already sends, instead of a hard-coded 62% / 55%, and an unused variable is removed.
 * The script around it is reworked for React: it attaches to a given canvas, only animates while the
 * canvas is on screen, draws a single still frame under reduced motion, and cleans up on dispose.
 */

const VERT = `attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`

const FRAG = `
precision highp float;
uniform vec2 r; uniform float t; uniform vec2 m; uniform vec2 o;
// Signal — a human profile made of live code.
// A head-and-shoulders silhouette (smooth-union SDF) is rendered as rows of tiny glyphs that re-roll as
// you watch. It is lit like a 3D bust (normal from the SDF gradient). Colour runs through it in bands
// (white, cyan, magenta, amber, ultramarine). Rows slide sideways in glitch bursts, some rows smear into
// pixel-sorted streaks, and the back of the head dissolves into glyphs carried off by the wind.
float h11(float p){return fract(sin(p*127.1)*43758.5453);}
float h21(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
float vn(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
  return mix(mix(h21(i),h21(i+vec2(1,0)),f.x),mix(h21(i+vec2(0,1)),h21(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<4;i++){v+=a*vn(p);p=p*2.03+vec2(1.3,7.1);a*=.5;}return v;}
float smin(float a,float b,float k){float h=clamp(.5+.5*(b-a)/k,0.,1.);return mix(b,a,h)-k*h*(1.-h);}
float ell(vec2 p,vec2 c,vec2 rr){vec2 q=(p-c)/rr;return (length(q)-1.)*min(rr.x,rr.y);}

// the bust, facing right. units: frame height = 1, origin at the bust's centre
float bust(vec2 p){
  float d=ell(p,vec2(-.03,.2),vec2(.2,.23));                  // cranium
  d=smin(d,ell(p,vec2(.08,.08),vec2(.13,.19)),.06);           // face
  d=smin(d,ell(p,vec2(.205,.07),vec2(.035,.03)),.03);         // nose
  d=smin(d,ell(p,vec2(.17,-.03),vec2(.05,.035)),.03);         // lips
  d=smin(d,ell(p,vec2(.1,-.1),vec2(.1,.07)),.05);             // jaw + chin
  vec2 q=p-vec2(.0,-.22); q.x+=q.y*.35;
  d=smin(d,max(abs(q.x)-.1,abs(q.y)-.16),.06);                // neck, leaning forward
  d=smin(d,ell(p,vec2(-.1,-.62),vec2(.5,.3)),.09);            // shoulders
  return d;
}
void main(){
  vec2 fc=gl_FragCoord.xy;
  // glyph grid in px
  float cw=max(4.,floor(r.y/150.)), ch=cw*1.6;
  float row=floor(fc.y/ch);
  // glitch bursts: every ~0.6 s some rows jump sideways
  float burst=floor(t*1.7);
  float hr=h21(vec2(row,burst));
  float bOn=step(.82,h11(burst*3.1));                          // is this moment a burst?
  float shift=(hr-.5)*step(.7,hr)*(.04+.12*bOn)*r.y;
  shift+=sin(row*.37+t*.6)*1.5;                                // tiny always-on wobble
  vec2 sp=fc+vec2(shift,0.);
  vec2 cell=floor(sp/vec2(cw,ch)), cf=fract(sp/vec2(cw,ch));
  vec2 cc=(cell+.5)*vec2(cw,ch);                               // cell centre px
  // bust space (pointer turns it a hair)
  vec2 p=(cc-vec2(r.x*o.x,r.y*o.y))/r.y;
  p.x-=(m.x-.5)*.03; p.y-=(m.y-.5)*.02;
  float d=bust(p);
  // pixel-sort streaks: some rows smear the silhouette out to the left
  float sr=h21(vec2(row,floor(t*.5)+9.));
  float streak=0.;
  if(sr>.8){
    float len=(.08+.3*h11(row+3.))*(.6+.4*sin(t*.8+row));
    float ds=bust(p+vec2(len,0.));
    // the smear: solid dashes trailing left of the silhouette edge
    float dash=step(.3,h21(vec2(floor(sp.x/(cw*(1.+2.*h11(row)))),row+floor(t*3.))));
    float thin=step(.25,cf.y)*step(cf.y,.7);                  // dashes are thinner than a glyph row
    streak=step(ds,0.)*step(0.,d)*dash*thin*exp(-d*9.);
  }
  // dissolve: the back of the head erodes into the wind
  float back=smoothstep(.0,-.3,p.x);
  vec2 wp=p*vec2(6.,12.)+vec2(t*.9,0.);
  float erode=(fbm(wp)-.45)*.12*back;
  float inside=step(d+erode,0.);
  // stray glyphs blown off to the left and up
  float stray=step(.93,h21(cell+floor(t*4.)))*smoothstep(.16,.0,d)*back*step(0.,d);
  float cover=max(inside,stray*.8);
  // the glyph itself: a 3x5 bitmap that re-rolls at its own pace
  vec2 g=floor(cf*vec2(4.,6.))-vec2(.5,.5);
  float bit=0.;
  if(g.x>=0.&&g.x<3.&&g.y>=0.&&g.y<5.){
    float roll=floor(t*(2.+6.*h21(cell))+h21(cell*1.7)*9.);
    bit=step(.45,h21(cell*.93+g*7.1+roll));
  }
  // some cells are solid blocks (denser data where it's bright)
  // lighting: a 3D-ish normal from the SDF gradient
  float e=.004;
  vec2 gr=vec2(bust(p+vec2(e,0.))-bust(p-vec2(e,0.)),bust(p+vec2(0.,e))-bust(p-vec2(0.,e)))/(2.*e);
  float depth=clamp(-d*7.,0.,1.);
  vec3 n=normalize(vec3(gr*(1.-depth),.35+depth));
  vec3 L=normalize(vec3(.6,.5,.65));
  float lit=clamp(dot(n,L),0.,1.)*.7+.38;
  lit*=.55+.45*smoothstep(-.45,.0,p.y-(-.35));                 // shoulders brightest at the bottom-left
  float rim=pow(1.-clamp(depth*3.,0.,1.),3.)*.6;
  // colour bands drifting through
  float hue=fbm(p*vec2(2.5,4.)+vec2(0.,t*.05))*1.4+p.y*.6;
  vec3 c1=vec3(.25,.85,1.), c2=vec3(1.,.3,.75), c3=vec3(1.,.72,.3), c4=vec3(.3,.4,1.);
  vec3 col=mix(c1,c2,smoothstep(.2,.45,fract(hue)));
  col=mix(col,c3,smoothstep(.5,.7,fract(hue)));
  col=mix(col,c4,smoothstep(.75,.95,fract(hue)));
  // most of the bust is white/grey; colour shows in bands
  float sat=smoothstep(.45,.75,fbm(p*3.+vec2(t*.04,0.)+5.));
  col=mix(vec3(.95),col,clamp(sat*1.15,0.,1.));
  float block=step(.93,h21(cell+floor(t*2.)))*lit;
  float on=max(bit,block);
  vec3 c=col*(lit+rim)*on*cover;
  // pixel-sort streaks in vivid colour
  vec3 sc=h11(row*1.7)<.33?c1:h11(row*1.7)<.66?c2:c3;
  c=max(c,sc*streak*(.75+.25*h11(row+burst))*(.55+.45*bit));
  // the bright bottom-left shoulder washes out like the reference
  c+=vec3(.9,.92,1.)*on*cover*smoothstep(-.3,-.75,p.y)*smoothstep(.1,-.4,p.x)*.5;
  // faint scanline + film grain on black
  c*=.92+.08*sin(fc.y*3.14159/ch*2.);
  c+=(h21(fc+fract(t*7.)*91.)-.5)*.02;
  gl_FragColor=vec4(c,1.);
}
`

export type SignalOptions = {
  /** Where the bust's centre sits, as shares of the canvas width and height (the template used 0.62, 0.55). */
  focus?: [number, number]
  /** Draw one still frame instead of animating. */
  still?: boolean
}

export function createSignalBg(canvas: HTMLCanvasElement, { focus = [0.62, 0.55], still = false }: SignalOptions = {}) {
  const gl = canvas.getContext('webgl', { antialias: false, alpha: false })
  if (!gl) throw new Error('WebGL unavailable')

  const shader = (type: number, src: string) => {
    const s = gl.createShader(type)!
    gl.shaderSource(s, src)
    gl.compileShader(s)
    return s
  }
  const prog = gl.createProgram()!
  gl.attachShader(prog, shader(gl.VERTEX_SHADER, VERT))
  gl.attachShader(prog, shader(gl.FRAGMENT_SHADER, FRAG))
  gl.bindAttribLocation(prog, 0, 'p')
  gl.linkProgram(prog)
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error('Signal shader failed to link')
  gl.useProgram(prog)
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
  gl.enableVertexAttribArray(0)
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)
  const ur = gl.getUniformLocation(prog, 'r')
  const ut = gl.getUniformLocation(prog, 't')
  const um = gl.getUniformLocation(prog, 'm')
  gl.uniform2f(gl.getUniformLocation(prog, 'o'), focus[0], focus[1])

  let mx = 0.5
  let my = 0.5
  let tx = mx
  let ty = my
  let frame = 0
  let running = false
  const t0 = performance.now()

  const draw = (now: number) => {
    mx += (tx - mx) * 0.04
    my += (ty - my) * 0.04
    gl.uniform2f(ur, canvas.width, canvas.height)
    // The template's reduced-motion still is the frame at t = 20 s.
    gl.uniform1f(ut, still ? 20 : (now - t0) / 1000)
    gl.uniform2f(um, mx, my)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
  }
  const tick = (now: number) => {
    draw(now)
    frame = running ? requestAnimationFrame(tick) : 0
  }

  // CSS-pixel resolution (no device-pixel-ratio boost), as in the template: the glyph grid is sized
  // in pixels, and this keeps the shader affordable on large or high-DPI screens.
  const resize = () => {
    canvas.width = Math.max(1, canvas.clientWidth)
    canvas.height = Math.max(1, canvas.clientHeight)
    gl.viewport(0, 0, canvas.width, canvas.height)
    if (!running) draw(performance.now())
  }
  const ro = new ResizeObserver(resize)
  ro.observe(canvas)
  resize()

  const onPointer = (e: PointerEvent) => {
    const b = canvas.getBoundingClientRect()
    tx = (e.clientX - b.left) / b.width
    ty = 1 - (e.clientY - b.top) / b.height
  }
  if (!still) addEventListener('pointermove', onPointer, { passive: true })

  return {
    /** Animate while true (the caller ties this to visibility); a still canvas never animates. */
    setRunning(on: boolean) {
      running = on && !still
      if (running && !frame) frame = requestAnimationFrame(tick)
    },
    dispose() {
      running = false
      cancelAnimationFrame(frame)
      ro.disconnect()
      removeEventListener('pointermove', onPointer)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    },
  }
}
