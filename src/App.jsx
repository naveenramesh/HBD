import { useState, useEffect, useRef, useCallback } from "react";

const CARDS = [
  { n:1,  title:"The First Word",           hidden:"నువ్వు",        content:`You walked in whispering "Meeru telugu aa?" — and before I knew it, that whisper transformed into a shout, "Telugu lo cheppachu kadha!"\n\nJust like that, without warning, without planning... you became the closest person of all to me.` },
  { n:2,  title:"Dhevini Bhidda 😅",         hidden:"ఒక",           content:`I don't know if it's your voice. Or the way you talk. Or just your entirety.\n\nIt feels like home with you. Genuinely, inexplicably, magically — the angel kind.\n\nDhevini Bhidda. 😅` },
  { n:3,  title:"Timeless",                  hidden:"చోటు",         content:`10 minutes. 30 minutes. 1 hour. Sometimes 5 hours.\n\nIt never mattered how long. Your presence — next to me or on a call — just made me never want to leave.` },
  { n:4,  title:"A Thought",                 hidden:"కాదు",         content:`See you.\nListen to you.\nOr as much as just think of you.\n\nMy heart feels lighter. My face breaking into a smile — without even trying.\n\nJust a thought of you is enough.` },
  { n:5,  title:"Instead",                   hidden:"నువ్వు",        content:`From your first statement — "Chennai asalu nachadhu naaku" — to me quietly showing you its true nature...\n\nI came to prove something. I ended up building something instead.\n\nSomething I never imagined. Something I'll always be grateful for.` },
  { n:6,  title:"What You Deserve",          hidden:"ఒక",           content:`Nuvvu deserve chesthaavu — to be seen. To be valued. To be taken care of.\n\nI hope every card reminds you of exactly that.` },
  { n:7,  title:"The Journey, The Heart",    hidden:"అనుభవం",       content:`Our first meeting. Travelling together to see Lord Shiva. To the moment you fed me a heartful meal with so much care.\n\nFrom that journey to every long call that felt like home — I wish we could do many more of these.\n\nForever.` },
  { n:8,  title:"Trust",                     hidden:"నువ్వు",        content:`Of the many people I know, you are the one I know the most.\n\nYour family. Your friends. Your joys. Your scars. Your pride. Your pain.\n\nYou shared everything — when you barely knew me. Thank you for trusting me.\n\nI trust you more.` },
  { n:9,  title:"Alavaaatu",                 hidden:"నా",           content:`Neetho matladatam. Godavapadatam. Navvukodam. Rojulu gadapatam.\n\nAlavaaatu ayipoyindhi.\n\nThe good kind. The kind I don't ever want to quit.` },
  { n:10, title:"Jagadalu, Paschathapalu",   hidden:"ఆలోచనల్లో",   content:`Every time we fought, every time you were annoyed — I knew you missed me, my presence.\n\nI knew that if I were right there next to you, that fight wouldn't exist.\n\nAll we ever needed was each other.\n\nThank you for those fights. They showed me exactly how much you missed me.` },
  { n:11, title:"Pristine",                  hidden:"నా రోజులో",    content:`I smiled when you left Chennai. But my heart sunk deep.\n\nHappy — you'd finally be home.\nSad — you were no more here.\nAnnoyed — I missed your last minutes in Chennai.\nUnfortunate — I couldn't spend more time with you.\nUpset — I couldn't meet you in three whole years.\n\nA month, a day, an hour, even a minute with you — always worth it.` },
  { n:12, title:"Heart to Heart",            hidden:"నా లోకంలో",    content:`You gave me back something I hadn't felt in years.\n\nNo filters. Two people under the cool breezy comfort of each other. Spoke heart to heart at 3 AM in the night.\n\nThose were the deepest conversations I've ever had.` },
  { n:13, title:"Weightage",                 hidden:"భాగమయ్యావు",  content:`You matter. Not in a polite way. Not in a "you're a good person" way.\n\nIn a — I think about you every single day, and my life genuinely feels better because you're in it — way.\n\nYou matter to me. A lot.` },
  { n:14, title:`"You Don't Understand Me"`, hidden:"తెలియకుండానే", content:`Nuvvu naaku arthamayaavu — before I even tried to understand.\n\nYes, I did — though I always sound like I didn't.\n\nYou kept saying I don't understand you. But the truth? I always had to pull it out of you — and every time I did, I understood you more than you ever knew.` },
  { n:15, title:"No Going Back",             hidden:"తిరిగి",       content:`Vellaleleni dooram vacchesaavu nuvvu.\n\nWithout me realizing — that there's simply no going back to a life where you weren't this important.` },
  { n:16, title:"Still Here",                hidden:"వెళ్ళలేని",    content:`Distance changed nothing.\n\nYou're still the first voice I want to hear when a day begins. The last thought I carry into the night.\n\nStill you. Always, only you.` },
  { n:17, title:"First and Last",            hidden:"దూరం",         content:`You are the first person I speak to in the morning.\nThe last person I speak to at night.\n\nEvery single day — without fail — you find a way into my thoughts, my words, my world.\n\nI didn't plan for this. I didn't see it coming.\n\nBut here we are. And I wouldn't change a single second of it.` },
  { n:18, title:"My Dearest Teju",           hidden:"వచ్చేసావు ❤️", content:`You walked into my life saying you didn't know English — and somehow you became the person I found the most words for.\n\nHere's to many more years of this. Of us. Of whatever this beautiful, unexplainable thing is.\n\nHappy Birthday, Tejaswi. 🎂\n\nOne last thing — go back through every card. At the bottom of each, a word waits. Read all 18 in order. That's what I really wanted to say.` },
];

// ─── CANVAS HOOK ─────────────────────────────────────────────────────────────
function useCanvas(draw, deps = []) {
  const ref = useRef(null);
  const rafRef = useRef(null);
  const drawRef = useRef(draw);
  drawRef.current = draw;
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let frame = 0;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const loop = () => { drawRef.current(ctx, canvas.width, canvas.height, frame++); rafRef.current = requestAnimationFrame(loop); };
    loop();
    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect(); };
  }, deps);
  return ref;
}

// ─── CARD 1: Typewriter "teju" → deletes → "tejaswi" ────────────────────────
function Bg1() {
  const seq = ["teju", "tej", "teja", "tejas", "tejasw", "tejaswi"];
  const draw = useCallback((ctx, W, H, f) => {
    ctx.clearRect(0, 0, W, H);
    // Total cycle: 180 frames
    const cycle = f % 300;
    let text = "";
    if (cycle < 40)       text = "teju".slice(0, Math.floor(cycle / 10) + 1);
    else if (cycle < 80)  text = "teju";
    else if (cycle < 120) text = "teju".slice(0, Math.max(0, 4 - Math.floor((cycle - 80) / 10)));
    else if (cycle < 200) {
      const buildIdx = Math.floor((cycle - 120) / 12);
      text = seq[Math.min(buildIdx, seq.length - 1)];
    }
    else text = "tejaswi";

    const size = Math.min(W * 0.18, 72);
    ctx.font = `${size}px Georgia, serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    // Multiple ghost instances across the bg
    const positions = [[0.5,0.25],[0.2,0.6],[0.8,0.5],[0.35,0.82],[0.7,0.15],[0.15,0.35],[0.65,0.7]];
    positions.forEach(([x, y], i) => {
      const alpha = 0.08 + (i % 3) * 0.04;
      const scale = 0.5 + (i % 4) * 0.2;
      ctx.save();
      ctx.translate(x * W, y * H);
      ctx.scale(scale, scale);
      ctx.fillStyle = `rgba(245,220,230,${alpha})`;
      ctx.fillText(text, 0, 0);
      // Cursor blink on main instance
      if (i === 0 && f % 30 < 20) {
        const tw = ctx.measureText(text).width;
        ctx.fillStyle = `rgba(201,100,120,0.35)`;
        ctx.fillRect(tw / 2 + 4, -size * 0.5, 2, size);
      }
      ctx.restore();
    });
  }, []);
  return <canvas ref={useCanvas(draw, [])} style={{ position:"absolute", inset:0, width:"100%", height:"100%" }} />;
}

// ─── CARD 2: Emojis float up from bottom ─────────────────────────────────────
function Bg2() {
  const emojis = ["🕉️","🙏🏻","😇","🪽"];
  const particles = useRef(Array.from({length:20}, (_, i) => ({
    emoji: emojis[i % emojis.length],
    x: 5 + Math.random() * 90,
    y: 110 + Math.random() * 60,
    speed: 0.06 + Math.random() * 0.08,
    wobble: Math.random() * Math.PI * 2,
    wobbleSpeed: 0.01 + Math.random() * 0.015,
    size: 18 + Math.random() * 16,
    alpha: 0.3 + Math.random() * 0.4,
  })));
  const draw = useCallback((ctx, W, H) => {
    ctx.clearRect(0, 0, W, H);
    particles.current.forEach(p => {
      p.wobble += p.wobbleSpeed;
      p.y -= p.speed;
      if (p.y < -10) { p.y = 110 + Math.random() * 30; p.x = 5 + Math.random() * 90; }
      const fade = p.y < 20 ? p.y / 20 : p.y > 90 ? (100 - p.y) / 10 : 1;
      ctx.globalAlpha = p.alpha * fade;
      ctx.font = `${p.size}px serif`;
      ctx.textAlign = "center";
      ctx.fillText(p.emoji, (p.x / 100) * W + Math.sin(p.wobble) * 12, (p.y / 100) * H);
    });
    ctx.globalAlpha = 1;
  }, []);
  return <canvas ref={useCanvas(draw, [])} style={{ position:"absolute", inset:0, width:"100%", height:"100%" }} />;
}

// ─── CARD 3: Numbers fade in/out 1–12 in random positions ───────────────────
function Bg3() {
  const state = useRef({ slots: Array.from({length:8}, (_, i) => ({ num: i+1, x: 10+Math.random()*80, y: 10+Math.random()*80, life: Math.random()*120, phase: Math.random() > 0.5 ? "in" : "out" })), nextNum: 9 });
  const draw = useCallback((ctx, W, H, f) => {
    ctx.clearRect(0, 0, W, H);
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    state.current.slots.forEach(s => {
      s.life++;
      let alpha = 0;
      if (s.phase === "in")  { alpha = Math.min(1, s.life / 60) * 0.55; if (s.life > 120) { s.phase = "hold"; s.life = 0; } }
      if (s.phase === "hold"){ alpha = 0.55; if (s.life > 90) { s.phase = "out"; s.life = 0; } }
      if (s.phase === "out") { alpha = Math.max(0, 0.55 - s.life / 60 * 0.55); if (s.life > 60) { s.num = state.current.nextNum; state.current.nextNum = state.current.nextNum % 12 + 1; s.x = 8 + Math.random() * 84; s.y = 8 + Math.random() * 84; s.phase = "in"; s.life = 0; } }
      ctx.globalAlpha = alpha;
      ctx.font = `bold ${28 + (s.num > 9 ? 0 : 4)}px Georgia, serif`;
      ctx.fillStyle = "rgba(220,200,210,1)";
      ctx.fillText(String(s.num), (s.x/100)*W, (s.y/100)*H);
    });
    ctx.globalAlpha = 1;
  }, []);
  return <canvas ref={useCanvas(draw, [])} style={{ position:"absolute", inset:0, width:"100%", height:"100%" }} />;
}

// ─── CARD 4: Hearts burst from center outward ────────────────────────────────
function Bg4() {
  const hearts = ["💜","❤️","🤎","🤍","💙","💚","💛","🧡","🩵","🩶","🩷"];
  const bursts = useRef([]);
  const lastBurst = useRef(0);
  const draw = useCallback((ctx, W, H, f) => {
    ctx.clearRect(0, 0, W, H);
    if (f - lastBurst.current > 55) {
      lastBurst.current = f;
      const cx = W * (0.35 + Math.random() * 0.3);
      const cy = H * (0.35 + Math.random() * 0.3);
      for (let i = 0; i < 10; i++) {
        const angle = (i / 10) * Math.PI * 2 + Math.random() * 0.4;
        const speed = 1.2 + Math.random() * 2.5;
        bursts.current.push({ emoji: hearts[Math.floor(Math.random()*hearts.length)], x: cx, y: cy, vx: Math.cos(angle)*speed, vy: Math.sin(angle)*speed - 0.5, life: 0, maxLife: 80 + Math.random()*40, size: 16+Math.random()*18 });
      }
    }
    bursts.current = bursts.current.filter(b => b.life < b.maxLife);
    bursts.current.forEach(b => {
      b.life++; b.x += b.vx; b.y += b.vy; b.vy += 0.04;
      const progress = b.life / b.maxLife;
      const alpha = progress < 0.2 ? progress/0.2 : 1 - (progress-0.2)/0.8;
      ctx.globalAlpha = alpha * 0.75;
      ctx.font = `${b.size}px serif`;
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText(b.emoji, b.x, b.y);
    });
    ctx.globalAlpha = 1;
  }, []);
  return <canvas ref={useCanvas(draw, [])} style={{ position:"absolute", inset:0, width:"100%", height:"100%" }} />;
}

// ─── CARD 5: City emojis slide in from left like moving street ───────────────
function Bg5() {
  const emojis = ["🌆","🛺","🌉","🌃","🏙️","🛺","🌆","🌃"];
  const draw = useCallback((ctx, W, H, f) => {
    ctx.clearRect(0, 0, W, H);
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    const rows = [0.2, 0.45, 0.68, 0.85];
    rows.forEach((rowY, ri) => {
      const speed = 0.4 + ri * 0.2;
      const spacing = W * 0.28;
      for (let i = 0; i < 6; i++) {
        const baseX = (i * spacing - (f * speed) % (spacing * emojis.length / 2)) + W;
        const x = ((baseX % (W + spacing * 4)) - spacing * 2 + W * 2) % (W + spacing * 2) - spacing;
        const size = 20 + ri * 4;
        ctx.globalAlpha = 0.45 + ri * 0.08;
        ctx.font = `${size}px serif`;
        ctx.fillText(emojis[(i + ri) % emojis.length], x, rowY * H);
      }
    });
    ctx.globalAlpha = 1;
  }, []);
  return <canvas ref={useCanvas(draw, [])} style={{ position:"absolute", inset:0, width:"100%", height:"100%" }} />;
}

// ─── CARD 6: Stars twinkle in/out randomly ───────────────────────────────────
function Bg6() {
  const stars = useRef(Array.from({length:22}, () => ({ x: Math.random()*100, y: Math.random()*100, phase: Math.random()*Math.PI*2, speed: 0.02+Math.random()*0.03, emoji: ["✨","🌟","💫","⭐","🌠"][Math.floor(Math.random()*5)], size: 16+Math.random()*18 })));
  const draw = useCallback((ctx, W, H, f) => {
    ctx.clearRect(0, 0, W, H);
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    stars.current.forEach(s => {
      s.phase += s.speed;
      const alpha = (Math.sin(s.phase) * 0.5 + 0.5) * 0.65;
      const scale = 0.7 + Math.sin(s.phase * 1.3) * 0.3;
      ctx.globalAlpha = alpha;
      ctx.save(); ctx.translate((s.x/100)*W, (s.y/100)*H); ctx.scale(scale, scale);
      ctx.font = `${s.size}px serif`;
      ctx.fillText(s.emoji, 0, 0);
      ctx.restore();
    });
    ctx.globalAlpha = 1;
  }, []);
  return <canvas ref={useCanvas(draw, [])} style={{ position:"absolute", inset:0, width:"100%", height:"100%" }} />;
}

// ─── CARD 7: Temple emojis rise from bottom like floating lamps ──────────────
function Bg7() {
  const emojis = ["🪔","🔱","🌸","🛕","🪔","🌸"];
  const lamps = useRef(Array.from({length:14}, (_, i) => ({ emoji: emojis[i%emojis.length], x: 5+Math.random()*90, y: 100+Math.random()*40, speed: 0.03+Math.random()*0.04, wobble: Math.random()*Math.PI*2, wSpeed: 0.008+Math.random()*0.01, size: 18+Math.random()*14 })));
  const draw = useCallback((ctx, W, H) => {
    ctx.clearRect(0, 0, W, H);
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    lamps.current.forEach(p => {
      p.wobble += p.wSpeed; p.y -= p.speed;
      if (p.y < -5) { p.y = 105+Math.random()*20; p.x = 5+Math.random()*90; }
      const fade = p.y < 15 ? p.y/15 : p.y > 85 ? (100-p.y)/15 : 1;
      ctx.globalAlpha = 0.55 * fade;
      ctx.font = `${p.size}px serif`;
      ctx.fillText(p.emoji, (p.x/100)*W + Math.sin(p.wobble)*8, (p.y/100)*H);
    });
    ctx.globalAlpha = 1;
  }, []);
  return <canvas ref={useCanvas(draw, [])} style={{ position:"absolute", inset:0, width:"100%", height:"100%" }} />;
}

// ─── CARD 8: Emojis appear one at a time, hold, fade ────────────────────────
function Bg8() {
  const emojis = ["🔐","💌","📜","🤝"];
  const slots = useRef(Array.from({length:8}, (_, i) => ({ emoji: emojis[i%emojis.length], x: 10+Math.random()*80, y: 10+Math.random()*80, life: i*30, phase: "in", size: 22+Math.random()*16 })));
  const draw = useCallback((ctx, W, H) => {
    ctx.clearRect(0, 0, W, H);
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    slots.current.forEach((s, i) => {
      s.life++;
      let alpha = 0;
      if (s.phase==="in")  { alpha = Math.min(1,s.life/50)*0.6; if(s.life>100){s.phase="hold";s.life=0;} }
      if (s.phase==="hold"){ alpha = 0.6; if(s.life>80){s.phase="out";s.life=0;} }
      if (s.phase==="out") { alpha = Math.max(0,0.6-s.life/60*0.6); if(s.life>60){s.emoji=emojis[Math.floor(Math.random()*emojis.length)];s.x=10+Math.random()*80;s.y=10+Math.random()*80;s.phase="in";s.life=0;} }
      ctx.globalAlpha = alpha;
      ctx.font = `${s.size}px serif`;
      ctx.fillText(s.emoji, (s.x/100)*W, (s.y/100)*H);
    });
    ctx.globalAlpha = 1;
  }, []);
  return <canvas ref={useCanvas(draw, [])} style={{ position:"absolute", inset:0, width:"100%", height:"100%" }} />;
}

// ─── CARD 9: Emojis orbit in slow circles ────────────────────────────────────
function Bg9() {
  const emojis = ["☕","📞","💬","🌙","🌛"];
  const orbiters = useRef(Array.from({length:12}, (_, i) => ({
    emoji: emojis[i%emojis.length],
    angle: (i/12)*Math.PI*2,
    radius: 0.15 + (i%3)*0.1,
    speed: (0.004+Math.random()*0.004) * (i%2===0?1:-1),
    cx: 0.3+Math.random()*0.4, cy: 0.3+Math.random()*0.4,
    size: 18+Math.random()*14,
  })));
  const draw = useCallback((ctx, W, H) => {
    ctx.clearRect(0, 0, W, H);
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    orbiters.current.forEach(o => {
      o.angle += o.speed;
      const x = o.cx*W + Math.cos(o.angle)*o.radius*W;
      const y = o.cy*H + Math.sin(o.angle)*o.radius*H*0.6;
      ctx.globalAlpha = 0.55;
      ctx.font = `${o.size}px serif`;
      ctx.fillText(o.emoji, x, y);
    });
    ctx.globalAlpha = 1;
  }, []);
  return <canvas ref={useCanvas(draw, [])} style={{ position:"absolute", inset:0, width:"100%", height:"100%" }} />;
}

// ─── CARD 10: Emojis shake/vibrate then settle ───────────────────────────────
function Bg10() {
  const emojis = ["⚡","🌧️","💢","🌊","🌪️"];
  const particles = useRef(Array.from({length:18}, (_, i) => ({
    emoji: emojis[i%emojis.length],
    x: 5+Math.random()*90, y: 5+Math.random()*90,
    shakeX: 0, shakeY: 0,
    size: 20+Math.random()*14,
    phase: Math.random()*Math.PI*2,
  })));
  const draw = useCallback((ctx, W, H, f) => {
    ctx.clearRect(0, 0, W, H);
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    const intensity = Math.sin(f * 0.08) * 0.5 + 0.5;
    particles.current.forEach(p => {
      p.phase += 0.04;
      const shake = intensity * (4 + Math.sin(p.phase * 3) * 3);
      const sx = Math.sin(p.phase * 7.3) * shake;
      const sy = Math.cos(p.phase * 5.7) * shake;
      ctx.globalAlpha = 0.45 + intensity * 0.2;
      ctx.font = `${p.size}px serif`;
      ctx.fillText(p.emoji, (p.x/100)*W + sx, (p.y/100)*H + sy);
    });
    ctx.globalAlpha = 1;
  }, []);
  return <canvas ref={useCanvas(draw, [])} style={{ position:"absolute", inset:0, width:"100%", height:"100%" }} />;
}

// ─── CARD 11: Emojis rain fast then slow ────────────────────────────────────
function Bg11() {
  const emojis = ["🚉","🧳","😊","😢","😤","😔","🥹"];
  const drops = useRef(Array.from({length:24}, (_, i) => ({
    emoji: emojis[i%emojis.length],
    x: Math.random()*100, y: -10-Math.random()*100,
    speed: 0.15+Math.random()*0.25,
    size: 16+Math.random()*14,
    wobble: Math.random()*Math.PI*2,
  })));
  const draw = useCallback((ctx, W, H, f) => {
    ctx.clearRect(0, 0, W, H);
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    // Speed slows over 300-frame cycle
    const cycle = f % 400;
    const speedMult = cycle < 80 ? 2.5 : cycle < 200 ? 2.5-(cycle-80)/120*2 : 0.5;
    drops.current.forEach(p => {
      p.wobble += 0.015; p.y += p.speed * speedMult;
      if (p.y > 108) { p.y = -8-Math.random()*20; p.x = Math.random()*100; }
      const fade = p.y < 5 ? p.y/5 : p.y > 95 ? (100-p.y)/5 : 1;
      ctx.globalAlpha = 0.55 * fade;
      ctx.font = `${p.size}px serif`;
      ctx.fillText(p.emoji, (p.x/100)*W + Math.sin(p.wobble)*5, (p.y/100)*H);
    });
    ctx.globalAlpha = 1;
  }, []);
  return <canvas ref={useCanvas(draw, [])} style={{ position:"absolute", inset:0, width:"100%", height:"100%" }} />;
}

// ─── CARD 12: Emojis pulse in/out from random spots (whispers) ──────────────
function Bg12() {
  const emojis = ["🌙","⭐","🌬️","💬","🕯️"];
  const whispers = useRef(Array.from({length:14}, (_, i) => ({
    emoji: emojis[i%emojis.length],
    x: 5+Math.random()*90, y: 5+Math.random()*90,
    phase: Math.random()*Math.PI*2,
    speed: 0.012+Math.random()*0.016,
    size: 18+Math.random()*16,
  })));
  const draw = useCallback((ctx, W, H) => {
    ctx.clearRect(0, 0, W, H);
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    whispers.current.forEach(p => {
      p.phase += p.speed;
      const alpha = (Math.sin(p.phase)*0.5+0.5)*0.6;
      const scale = 0.6 + Math.sin(p.phase*0.7)*0.4;
      ctx.globalAlpha = alpha;
      ctx.save(); ctx.translate((p.x/100)*W,(p.y/100)*H); ctx.scale(scale,scale);
      ctx.font = `${p.size}px serif`;
      ctx.fillText(p.emoji, 0, 0);
      ctx.restore();
    });
    ctx.globalAlpha = 1;
  }, []);
  return <canvas ref={useCanvas(draw, [])} style={{ position:"absolute", inset:0, width:"100%", height:"100%" }} />;
}

// ─── CARD 13: Hearts pulse in rhythmic waves from center ────────────────────
function Bg13() {
  const hearts = ["💗","💓","💞","💖","💝"];
  const waves = useRef([]);
  const lastWave = useRef(0);
  const draw = useCallback((ctx, W, H, f) => {
    ctx.clearRect(0, 0, W, H);
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    // Heartbeat rhythm: double pulse every 90 frames
    const beat = f % 90;
    if (beat === 0 || beat === 18) {
      for (let i = 0; i < 8; i++) {
        const angle = (i/8)*Math.PI*2;
        const speed = 1.5+Math.random()*1.5;
        waves.current.push({ emoji: hearts[Math.floor(Math.random()*hearts.length)], x: W/2, y: H/2, vx: Math.cos(angle)*speed, vy: Math.sin(angle)*speed, life: 0, maxLife: 70+Math.random()*30, size: 16+Math.random()*14 });
      }
    }
    waves.current = waves.current.filter(w => w.life < w.maxLife);
    waves.current.forEach(w => {
      w.life++; w.x += w.vx; w.y += w.vy;
      const p = w.life/w.maxLife;
      const alpha = p < 0.15 ? p/0.15 : 1-(p-0.15)/0.85;
      const scale = 0.5 + p*0.8;
      ctx.globalAlpha = alpha * 0.7;
      ctx.save(); ctx.translate(w.x,w.y); ctx.scale(scale,scale);
      ctx.font = `${w.size}px serif`;
      ctx.fillText(w.emoji, 0, 0);
      ctx.restore();
    });
    ctx.globalAlpha = 1;
  }, []);
  return <canvas ref={useCanvas(draw, [])} style={{ position:"absolute", inset:0, width:"100%", height:"100%" }} />;
}

// ─── CARD 14: Emojis appear then blur, slowly focus ─────────────────────────
function Bg14() {
  const emojis = ["🤐","💭","👂","🪞"];
  const items = useRef(Array.from({length:12}, (_, i) => ({
    emoji: emojis[i%emojis.length],
    x: 8+Math.random()*84, y: 8+Math.random()*84,
    phase: Math.random()*Math.PI*2, speed: 0.008+Math.random()*0.01,
    size: 20+Math.random()*14,
  })));
  const draw = useCallback((ctx, W, H) => {
    ctx.clearRect(0, 0, W, H);
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    items.current.forEach(p => {
      p.phase += p.speed;
      // blur effect: draw multiple offset copies with low alpha
      const blurAmt = Math.sin(p.phase)*0.5+0.5;
      const alpha = 0.5;
      const offsets = blurAmt > 0.2 ? [[-blurAmt*4,0],[blurAmt*4,0],[0,-blurAmt*3],[0,blurAmt*3]] : [[0,0]];
      offsets.forEach(([ox, oy]) => {
        ctx.globalAlpha = alpha * (ox===0&&oy===0 ? 1 : 0.25) * (1-blurAmt*0.5);
        ctx.font = `${p.size}px serif`;
        ctx.fillText(p.emoji, (p.x/100)*W+ox, (p.y/100)*H+oy);
      });
    });
    ctx.globalAlpha = 1;
  }, []);
  return <canvas ref={useCanvas(draw, [])} style={{ position:"absolute", inset:0, width:"100%", height:"100%" }} />;
}

// ─── CARD 15: Emojis swept by tide wave, come back ──────────────────────────
function Bg15() {
  const emojis = ["🌊","🌀","⏳","🔄"];
  const items = useRef(Array.from({length:16}, (_, i) => ({
    emoji: emojis[i%emojis.length],
    baseX: 5+Math.random()*90, y: 10+Math.random()*80,
    wobble: Math.random()*Math.PI*2, wSpeed: 0.01+Math.random()*0.01,
    size: 20+Math.random()*14,
  })));
  const draw = useCallback((ctx, W, H, f) => {
    ctx.clearRect(0, 0, W, H);
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    const tideOffset = Math.sin(f*0.025)*25;
    items.current.forEach(p => {
      p.wobble += p.wSpeed;
      const x = p.baseX + tideOffset + Math.sin(p.wobble)*3;
      const fade = x < 0 || x > 100 ? 0 : x < 8 ? x/8 : x > 92 ? (100-x)/8 : 1;
      ctx.globalAlpha = 0.55 * fade;
      ctx.font = `${p.size}px serif`;
      ctx.fillText(p.emoji, (x/100)*W, (p.y/100)*H);
    });
    ctx.globalAlpha = 1;
  }, []);
  return <canvas ref={useCanvas(draw, [])} style={{ position:"absolute", inset:0, width:"100%", height:"100%" }} />;
}

// ─── CARD 16: Emojis rise slowly like sunrise ────────────────────────────────
function Bg16() {
  const emojis = ["📱","🌅","🌙","☀️"];
  const risers = useRef(Array.from({length:14}, (_, i) => ({
    emoji: emojis[i%emojis.length],
    x: 5+Math.random()*90,
    y: 60+Math.random()*50,
    speed: 0.025+Math.random()*0.035,
    wobble: Math.random()*Math.PI*2, wSpeed: 0.008+Math.random()*0.01,
    size: 20+Math.random()*14,
  })));
  const draw = useCallback((ctx, W, H) => {
    ctx.clearRect(0, 0, W, H);
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    risers.current.forEach(p => {
      p.wobble += p.wSpeed; p.y -= p.speed;
      if (p.y < -5) { p.y = 105+Math.random()*20; p.x = 5+Math.random()*90; }
      const fade = p.y < 10 ? p.y/10 : p.y > 85 ? (100-p.y)/15 : 1;
      ctx.globalAlpha = 0.58 * fade;
      ctx.font = `${p.size}px serif`;
      ctx.fillText(p.emoji, (p.x/100)*W + Math.sin(p.wobble)*6, (p.y/100)*H);
    });
    ctx.globalAlpha = 1;
  }, []);
  return <canvas ref={useCanvas(draw, [])} style={{ position:"absolute", inset:0, width:"100%", height:"100%" }} />;
}

// ─── CARD 17: Emojis drift from both sides, meet center ─────────────────────
function Bg17() {
  const emojis = ["🌄","🌠","🌌","✨","🌃"];
  const left  = useRef(Array.from({length:8}, (_, i) => ({ emoji: emojis[i%emojis.length], x: -15-Math.random()*30, y: 10+i*11, speed: 0.06+Math.random()*0.06, size: 18+Math.random()*14, wobble: Math.random()*Math.PI*2, done: false })));
  const right = useRef(Array.from({length:8}, (_, i) => ({ emoji: emojis[(i+2)%emojis.length], x: 115+Math.random()*30, y: 15+i*11, speed: 0.06+Math.random()*0.06, size: 18+Math.random()*14, wobble: Math.random()*Math.PI*2, done: false })));
  const draw = useCallback((ctx, W, H) => {
    ctx.clearRect(0, 0, W, H);
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    left.current.forEach(p => {
      p.wobble += 0.01;
      if (!p.done) p.x += p.speed;
      if (p.x >= 48) { p.done = true; p.x = 48+Math.sin(p.wobble)*1.5; }
      ctx.globalAlpha = 0.58;
      ctx.font = `${p.size}px serif`;
      ctx.fillText(p.emoji, (p.x/100)*W, (p.y/100)*H);
    });
    right.current.forEach(p => {
      p.wobble += 0.01;
      if (!p.done) p.x -= p.speed;
      if (p.x <= 52) { p.done = true; p.x = 52+Math.sin(p.wobble)*1.5; }
      ctx.globalAlpha = 0.58;
      ctx.font = `${p.size}px serif`;
      ctx.fillText(p.emoji, (p.x/100)*W, (p.y/100)*H);
    });
    ctx.globalAlpha = 1;
  }, []);
  return <canvas ref={useCanvas(draw, [])} style={{ position:"absolute", inset:0, width:"100%", height:"100%" }} />;
}

// ─── CARD 18: Flowers explode from center, fill entire screen ───────────────
function Bg18() {
  const flowers = ["🌸","🌺","🌷","🌻","💐","🌹","🪷"];
  const bursts = useRef([]);
  const lastBurst = useRef(-999);
  const draw = useCallback((ctx, W, H, f) => {
    ctx.clearRect(0, 0, W, H);
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    if (f - lastBurst.current > 40) {
      lastBurst.current = f;
      const cx = W*(0.3+Math.random()*0.4), cy = H*(0.3+Math.random()*0.4);
      for (let i = 0; i < 14; i++) {
        const angle = (i/14)*Math.PI*2 + Math.random()*0.3;
        const speed = 1.8+Math.random()*3;
        bursts.current.push({ emoji: flowers[Math.floor(Math.random()*flowers.length)], x: cx, y: cy, vx: Math.cos(angle)*speed, vy: Math.sin(angle)*speed-0.8, life: 0, maxLife: 90+Math.random()*50, size: 20+Math.random()*20 });
      }
    }
    // Always keep lingering flowers
    while (bursts.current.length > 120) bursts.current.shift();
    bursts.current.forEach(b => {
      b.life++; b.x += b.vx; b.y += b.vy * 0.98; b.vy += 0.03;
      const p = b.life/b.maxLife;
      const alpha = p < 0.1 ? p/0.1 : p > 0.7 ? 1-(p-0.7)/0.3 : 1;
      ctx.globalAlpha = alpha * 0.75;
      ctx.save(); ctx.translate(b.x,b.y); ctx.rotate(p*Math.PI);
      ctx.font = `${b.size}px serif`;
      ctx.fillText(b.emoji, 0, 0);
      ctx.restore();
    });
    bursts.current = bursts.current.filter(b => b.life < b.maxLife);
    ctx.globalAlpha = 1;
  }, []);
  return <canvas ref={useCanvas(draw, [])} style={{ position:"absolute", inset:0, width:"100%", height:"100%" }} />;
}

const BG_COMPONENTS = [Bg1,Bg2,Bg3,Bg4,Bg5,Bg6,Bg7,Bg8,Bg9,Bg10,Bg11,Bg12,Bg13,Bg14,Bg15,Bg16,Bg17,Bg18];

// ─── CARD GLOW ────────────────────────────────────────────────────────────────
function CardGlow() {
  const draw = useCallback((ctx, W, H, f) => {
    ctx.clearRect(0, 0, W, H);
    const t = f * 0.018;
    const pulse  = Math.sin(t) * 0.3 + 0.7;
    const pulse2 = Math.sin(t * 1.3 + 1) * 0.2 + 0.8;
    const m = 14, cLen = 22;
    const cornerAlpha = 0.35 + pulse * 0.22;

    // Corners
    ctx.strokeStyle = `rgba(201,100,120,${cornerAlpha})`; ctx.lineWidth = 1.3;
    [[m,m,1,1],[W-m,m,-1,1],[m,H-m,1,-1],[W-m,H-m,-1,-1]].forEach(([x,y,dx,dy]) => {
      ctx.beginPath(); ctx.moveTo(x,y+dy*cLen); ctx.lineTo(x,y); ctx.lineTo(x+dx*cLen,y); ctx.stroke();
    });

    // Border lines
    [[m,m,W-m,m],[m,H-m,W-m,H-m]].forEach(([x1,y1,x2,y2]) => {
      const g = ctx.createLinearGradient(x1,y1,x2,y2);
      g.addColorStop(0,"transparent"); g.addColorStop(0.2,`rgba(201,100,120,${0.42+pulse*0.25})`);
      g.addColorStop(0.5,`rgba(225,120,140,${0.58+pulse2*0.2})`);
      g.addColorStop(0.8,`rgba(201,100,120,${0.42+pulse*0.25})`); g.addColorStop(1,"transparent");
      ctx.strokeStyle=g; ctx.lineWidth=1.2;
      ctx.beginPath(); ctx.moveTo(x1+cLen,y1); ctx.lineTo(x2-cLen,y2); ctx.stroke();
    });
    [[m,m,m,H-m],[W-m,m,W-m,H-m]].forEach(([x1,y1,x2,y2]) => {
      const g = ctx.createLinearGradient(x1,y1,x2,y2);
      g.addColorStop(0,"transparent"); g.addColorStop(0.2,`rgba(201,100,120,${0.38+pulse*0.2})`);
      g.addColorStop(0.5,`rgba(225,120,140,${0.48+pulse2*0.15})`);
      g.addColorStop(0.8,`rgba(201,100,120,${0.38+pulse*0.2})`); g.addColorStop(1,"transparent");
      ctx.strokeStyle=g; ctx.lineWidth=1.2;
      ctx.beginPath(); ctx.moveTo(x1,y1+cLen); ctx.lineTo(x2,y2-cLen); ctx.stroke();
    });

    // Inner glow
    const ig = ctx.createRadialGradient(W/2,H/2,0,W/2,H/2,Math.max(W,H)*0.65);
    ig.addColorStop(0,`rgba(150,40,70,${0.045+pulse*0.03})`); ig.addColorStop(1,"transparent");
    ctx.fillStyle=ig; ctx.fillRect(0,0,W,H);

    // Corner sparkles
    const sp = Math.max(0, Math.sin(t*2.5)*0.6);
    if (sp > 0) {
      [[m,m],[W-m,m],[m,H-m],[W-m,H-m]].forEach(([x,y]) => {
        ctx.beginPath(); ctx.arc(x,y,2,0,Math.PI*2);
        ctx.fillStyle=`rgba(255,180,200,${sp*0.65})`; ctx.fill();
      });
    }

    // Shimmer travelling along top border
    const sh = ((t*0.35)%1);
    const shX = m + cLen + sh*(W-2*m-2*cLen);
    const sg = ctx.createLinearGradient(shX-30,m,shX+30,m);
    sg.addColorStop(0,"transparent"); sg.addColorStop(0.5,`rgba(255,200,220,${0.7*pulse})`); sg.addColorStop(1,"transparent");
    ctx.strokeStyle=sg; ctx.lineWidth=1.5;
    ctx.beginPath(); ctx.moveTo(shX-30,m); ctx.lineTo(shX+30,m); ctx.stroke();
  }, []);
  const ref = useCanvas(draw, []);
  return <canvas ref={ref} style={{ position:"absolute", inset:0, width:"100%", height:"100%", zIndex:4, pointerEvents:"none" }} />;
}

// ─── PROGRESS DOTS ────────────────────────────────────────────────────────────
function ProgressDots({ current, total, revealed, onGo }) {
  return (
    <div style={{ display:"flex", gap:"5px", justifyContent:"center", flexWrap:"wrap", maxWidth:"320px" }}>
      {Array.from({length:total},(_,i) => (
        <div key={i} onClick={()=>onGo(i)} style={{
          width: i===current?"22px":"8px", height:"8px", borderRadius:"4px",
          background: i===current?"#c97d6e": revealed.has(i)?"rgba(201,125,110,0.5)":"rgba(255,255,255,0.1)",
          cursor:"pointer", transition:"all 0.3s ease",
        }}/>
      ))}
    </div>
  );
}

// ─── INTRO ────────────────────────────────────────────────────────────────────
function IntroBg() {
  const draw = useCallback((ctx, W, H, f) => {
    ctx.clearRect(0,0,W,H);
    ctx.textAlign="center"; ctx.textBaseline="middle";
    const items = ["🌸","అ","✨","🌺","ఆ","💫","🌷","ఇ","⭐","💐","ఈ","🌹"];
    items.forEach((s,i) => {
      const x = (i*137)%W;
      const y = ((i*83 + f*0.3*(1+i%3*0.3))%(H+40))-20;
      const alpha = 0.18 + (i%4)*0.06;
      ctx.globalAlpha = alpha;
      ctx.font = `${14+i%6*3}px serif`;
      ctx.fillText(s, x, y);
    });
    ctx.globalAlpha=1;
  }, []);
  const ref = useCanvas(draw, []);
  return <canvas ref={ref} style={{ position:"absolute", inset:0, width:"100%", height:"100%" }} />;
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [started, setStarted]     = useState(false);
  const [current, setCurrent]     = useState(0);
  const [transitioning, setTrans] = useState(false);
  const [cardVisible, setCardVis] = useState(true);
  const [scrolled, setScrolled]   = useState(false);
  const [wordVisible, setWordVis] = useState(false);
  const [revealed, setRevealed]   = useState(new Set());
  const cardBodyRef               = useRef(null);
  const card = CARDS[current];
  const BgComp = BG_COMPONENTS[current];

  useEffect(() => {
    setScrolled(false); setWordVis(false);
    if (cardBodyRef.current) cardBodyRef.current.scrollTop = 0;
  }, [current]);

  useEffect(() => {
    const el = cardBodyRef.current;
    if (!el) return;
    const fn = () => {
      if (el.scrollHeight - el.scrollTop - el.clientHeight < 44 && !scrolled) {
        setScrolled(true);
        setTimeout(() => { setWordVis(true); setRevealed(p => new Set([...p, current])); }, 500);
      }
    };
    el.addEventListener("scroll", fn, { passive:true });
    return () => el.removeEventListener("scroll", fn);
  }, [current, scrolled]);

  const navigate = useCallback(async (next) => {
    if (transitioning || next < 0 || next >= CARDS.length) return;
    setTrans(true); setCardVis(false);
    await new Promise(r => setTimeout(r, 350));
    setCurrent(next);
    await new Promise(r => setTimeout(r, 60));
    setCardVis(true); setTrans(false);
  }, [transitioning]);

  // ── INTRO ──
  if (!started) return (
    <div style={{ minHeight:"100vh", background:"radial-gradient(ellipse at 50% 40%, #1a0810 0%, #06020e 60%, #030108 100%)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"Georgia,serif", overflow:"hidden", position:"relative" }}>
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes wordIn{from{opacity:0;filter:blur(5px);transform:translateY(6px)}to{opacity:1;filter:blur(0);transform:translateY(0)}}
        @keyframes shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}
        @keyframes fadeUp2{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes bgPulse{0%,100%{opacity:0.5}50%{opacity:0.9}}
        *{box-sizing:border-box} ::-webkit-scrollbar{display:none}
      `}</style>
      <IntroBg />
      <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 50% 40%, rgba(150,30,60,0.14) 0%, transparent 60%)", animation:"bgPulse 4s ease-in-out infinite" }}/>
      <div style={{ textAlign:"center", zIndex:1, maxWidth:"320px", animation:"fadeUp 1s ease forwards" }}>
        <div style={{ fontSize:"52px", marginBottom:"20px", filter:"drop-shadow(0 0 22px rgba(201,80,100,0.45))" }}>🎂</div>
        <div style={{ fontSize:"10px", letterSpacing:"5px", color:"rgba(201,125,110,0.6)", textTransform:"uppercase", marginBottom:"12px" }}>a gift of words</div>
        <h1 style={{ fontSize:"46px", color:"#f5e6e0", fontWeight:400, margin:"0 0 6px", letterSpacing:"2px", textShadow:"0 0 40px rgba(201,80,100,0.3)" }}>Tejaswi</h1>
        <div style={{ width:"40px", height:"1px", background:"rgba(201,125,110,0.3)", margin:"14px auto" }}/>
        <p style={{ color:"rgba(245,230,224,0.35)", fontSize:"13px", marginBottom:"36px", fontStyle:"italic", lineHeight:1.85 }}>18 cards. One journey.<br/>Something I never said out loud — until now.</p>
        <button onClick={()=>setStarted(true)} style={{ background:"transparent", border:"1px solid rgba(201,125,110,0.45)", color:"#c97d6e", padding:"14px 50px", fontSize:"11px", letterSpacing:"3px", textTransform:"uppercase", cursor:"pointer", borderRadius:"2px", minHeight:"44px", touchAction:"manipulation", transition:"all 0.3s" }}
          onMouseEnter={e=>{e.currentTarget.style.background="rgba(201,125,110,0.1)";e.currentTarget.style.borderColor="#c97d6e";}}
          onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.borderColor="rgba(201,125,110,0.45)";}}>
          Begin
        </button>
      </div>
    </div>
  );

  // ── MAIN ──
  return (
    <div style={{ minHeight:"100vh", background:"radial-gradient(ellipse at 50% 30%, #120508 0%, #06020e 50%, #030108 100%)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", fontFamily:"Georgia,serif", position:"relative", overflow:"hidden" }}>

      {/* Full-screen animated background */}
      <div style={{ position:"fixed", inset:0, zIndex:0 }}>
        <BgComp />
        <div style={{ position:"absolute", inset:0, background:"rgba(4,1,8,0.55)", pointerEvents:"none" }}/>
      </div>

      {/* Top bar */}
      <div style={{ position:"fixed", top:0, left:0, right:0, zIndex:20, padding:"14px 20px 10px", display:"flex", flexDirection:"column", alignItems:"center", gap:"8px", background:"linear-gradient(to bottom, rgba(4,1,8,0.88), transparent)" }}>
        <ProgressDots current={current} total={CARDS.length} revealed={revealed} onGo={navigate}/>
        <div style={{ color:"rgba(245,230,224,0.18)", fontSize:"10px", letterSpacing:"2px" }}>{current+1} of {CARDS.length}</div>
      </div>

      {/* Card */}
      <div style={{ position:"relative", zIndex:10, width:"min(400px, calc(100vw - 32px))", marginTop:"72px", marginBottom:"72px", opacity:cardVisible?1:0, transform:cardVisible?"scale(1)":"scale(1.05)", transition:"opacity 0.35s cubic-bezier(0.4,0,0.2,1), transform 0.35s cubic-bezier(0.4,0,0.2,1)", willChange:"transform,opacity" }}>
        {/* Stack shadows */}
        <div style={{ position:"absolute", inset:"7px -7px -7px 7px", background:"rgba(120,20,50,0.05)", borderRadius:"4px", border:"1px solid rgba(120,20,50,0.07)" }}/>
        <div style={{ position:"absolute", inset:"3px -3px -3px 3px", background:"rgba(120,20,50,0.04)", borderRadius:"4px", border:"1px solid rgba(120,20,50,0.05)" }}/>

        {/* Main card */}
        <div style={{ background:"linear-gradient(155deg, rgba(24,8,16,0.97) 0%, rgba(14,5,12,0.99) 100%)", border:"1px solid rgba(140,40,65,0.22)", borderRadius:"4px", position:"relative", overflow:"hidden", boxShadow:"0 28px 80px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.03)" }}>
          <CardGlow />
          {/* Top accent */}
          <div style={{ height:"2px", background:"linear-gradient(90deg, transparent, rgba(201,80,100,0.7) 25%, rgba(230,110,130,0.95) 50%, rgba(201,80,100,0.7) 75%, transparent)", position:"relative", zIndex:5 }}/>

          {/* Header */}
          <div style={{ padding:"15px 24px 0", display:"flex", justifyContent:"space-between", alignItems:"center", position:"relative", zIndex:5 }}>
            <span style={{ fontSize:"10px", letterSpacing:"3px", color:"rgba(201,125,110,0.38)", textTransform:"uppercase" }}>{String(card.n).padStart(2,"0")} / 18</span>
            <span style={{ fontSize:"10px", color:"rgba(245,230,224,0.14)", fontStyle:"italic" }}>{revealed.has(current)?"✓":"↓"}</span>
          </div>

          {/* Scrollable body */}
          <div ref={cardBodyRef} style={{ padding:"12px 24px 0", maxHeight:"58vh", overflowY:"auto", scrollbarWidth:"none", position:"relative", zIndex:5 }}>
            <h2 style={{ fontSize:"19px", fontWeight:400, color:"#f5e6e0", margin:"0 0 14px", lineHeight:1.35, letterSpacing:"0.3px", animation:"fadeUp2 0.5s ease forwards", textShadow:"0 0 24px rgba(201,80,100,0.18)" }}>{card.title}</h2>
            <p style={{ fontSize:"15px", lineHeight:"1.9", color:"rgba(245,230,224,0.76)", margin:"0 0 24px", whiteSpace:"pre-line", animation:"fadeUp2 0.5s 0.1s ease both" }}>{card.content}</p>

            {/* Telugu word */}
            <div style={{ borderTop:"1px solid rgba(201,125,110,0.1)", padding:"15px 0 19px", textAlign:"center", minHeight:"52px", display:"flex", alignItems:"center", justifyContent:"center" }}>
              {wordVisible ? (
                <div style={{ fontSize:"22px", color:"#c97d6e", letterSpacing:"3px", animation:"wordIn 0.9s ease forwards", textShadow:"0 0 28px rgba(201,80,100,0.5)" }}>{card.hidden}</div>
              ) : (
                <div style={{ width:"60px", height:"13px", background:"rgba(201,125,110,0.06)", borderRadius:"2px", overflow:"hidden", position:"relative" }}>
                  <div style={{ position:"absolute", inset:0, background:"linear-gradient(90deg,transparent,rgba(201,125,110,0.12),transparent)", animation:"shimmer 2s infinite" }}/>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div style={{ position:"fixed", bottom:"20px", left:"50%", transform:"translateX(-50%)", display:"flex", gap:"14px", zIndex:20 }}>
        <button onClick={()=>navigate(current-1)} disabled={current===0||transitioning} style={{ background:"rgba(201,125,110,0.07)", border:"1px solid rgba(201,125,110,0.15)", color:current===0?"rgba(201,125,110,0.15)":"#c97d6e", width:"48px", height:"48px", borderRadius:"50%", fontSize:"18px", cursor:current===0?"default":"pointer", touchAction:"manipulation", transition:"all 0.2s", display:"flex", alignItems:"center", justifyContent:"center" }}>←</button>
        <button onClick={()=>navigate(current+1)} disabled={current===CARDS.length-1||transitioning} style={{ background:current===CARDS.length-1?"rgba(201,125,110,0.03)":"rgba(201,125,110,0.11)", border:"1px solid rgba(201,125,110,0.22)", color:current===CARDS.length-1?"rgba(201,125,110,0.15)":"#c97d6e", width:"48px", height:"48px", borderRadius:"50%", fontSize:"18px", cursor:current===CARDS.length-1?"default":"pointer", touchAction:"manipulation", transition:"all 0.2s", display:"flex", alignItems:"center", justifyContent:"center" }}>→</button>
      </div>
    </div>
  );
}
