import { useState, useEffect, useRef, useCallback } from "react";

/* ================================================================
   MAJESTIC BARBERSHOP R&S LLC — V2
   Real data from shop visit. Admin-editable. Photo-ready.
   ================================================================ */

const DEFAULT_DATA = {
  business: {
    name: "Majestic Barbershop R&S LLC",
    tagline: "Premium Cuts in Jamaica, Queens",
    subtitle: "Where every cut is a statement.",
    phone1: "(347) 617-9697",
    phone2: "(347) 245-8086",
    address: "89-28 163rd St, Jamaica, NY 11432",
    mapsUrl: "https://maps.google.com/?q=89-28+163rd+St,+Jamaica,+NY+11432",
    rating: "4.4",
    reviewCount: "21",
    movedBanner: "We've Moved — Same barbers. Same quality. New location.",
    guarantee: "Not happy with your cut? We'll fix it free within 24 hours.",
    guaranteeEs: "¿No está satisfecho? Se lo arreglamos gratis en 24 horas.",
    walkIns: "Walk-Ins Welcome",
    heroVideo: "/hero-video.mp4",
    barbersVideo: "/shop-walkthrough.mp4",
    hours: [
      { days: "Monday – Thursday", time: "10 AM – 8 PM" },
      { days: "Friday – Saturday", time: "9 AM – 8 PM" },
      { days: "Sunday", time: "9 AM – 5 PM" },
    ],
    instagram: "",
    facebook: "",
    tiktok: "",
    whatsapp: "",
  },
  services: {
    barbershop: [
      { id: "s1", name: "Haircut", price: "$25", image: "/services/haircut.webp", desc: "Classic cut tailored to your style" },
      { id: "s2", name: "Haircut & Shave", price: "$35", image: "/services/haircut-shave.webp", desc: "Full cut with a clean hot towel shave" },
      { id: "s3", name: "Children", price: "$25", image: "/services/children.jpg", desc: "Ages 12 and under" },
      { id: "s4", name: "Children Skin Fade", price: "$25", image: "/services/children-skin-fade.webp", desc: "Precision skin fade for the young ones" },
      { id: "s5", name: "Shave & Line Up", price: "$15", image: "/services/shave-lineup.webp", desc: "Clean shave with sharp line-up" },
      { id: "s6", name: "Flat Top", price: "$25", image: "/services/flat-top.jpg", desc: "Level precision flat top cut" },
      { id: "s7", name: "Line Up", price: "$12", image: "/services/line-up.jpg", desc: "Crisp edges and hairline shaping" },
      { id: "s8", name: "Taper", price: "$25", image: "/services/taper.jpg", desc: "Gradual fade from short to long" },
      { id: "s9", name: "Haircut, Shave & Color", price: "$65", image: "/services/haircut-shave-color.jpg", desc: "Full service with color treatment" },
      { id: "s10", name: "Beard Shave", price: "$12", image: "/services/beard-shave.jpg", desc: "Full beard removal with hot towel" },
      { id: "s11", name: "Beard Trim", price: "$7", image: "/services/beard-trim.jpg", desc: "Shape and maintain your beard" },
      { id: "s12", name: "Designs", price: "$60", image: "/services/designs.webp", desc: "Custom freehand hair art and patterns" },
      { id: "s13", name: "Eyebrows", price: "$7", image: "/services/eyebrows.jpg", desc: "Clean shaping and grooming" },
      { id: "s14", name: "Haircut, Shave & Facial", price: "$65", image: "/services/haircut-shave-facial.webp", desc: "Premium package with facial treatment" },
      { id: "s15", name: "Facials Only", price: "$25", image: "/services/facials.jpg", desc: "Deep cleanse and rejuvenation" },
      { id: "s16", name: "Haircut & Eyebrows", price: "$30", image: "/services/haircut-eyebrows.jpg", desc: "Cut plus brow cleanup combo" },
    ],
  },
  nailsSalon: {
    name: "IZ Nails",
    phone: "(518) 451-1720",
    link: "",
    tagline: "Full nail services available in-house",
  },
  barbers: [
    { id: "b1", name: "Barber 1", role: "Master Barber", bio: "Precision fades and razor-sharp line-ups. 10+ years in the chair.", specialties: ["Skin Fades", "Line-ups", "Hot Towel Shaves", "Designs"], phone: "(347) 617-9697", image: null, instagram: "", facebook: "", tiktok: "", whatsapp: "" },
    { id: "b2", name: "Barber 2", role: "Senior Barber", bio: "Versatile with every texture. Tapers, designs, and creative work.", specialties: ["Tapers", "Designs", "Flat Top", "Beard Work"], phone: "(347) 617-9697", image: null, instagram: "", facebook: "", tiktok: "", whatsapp: "" },
    { id: "b3", name: "Barber 3", role: "Barber", bio: "Consistent, reliable cuts every time. The regulars' favorite.", specialties: ["Classic Cuts", "Fades", "Beard Trim", "Kids Cuts"], phone: "(347) 245-8086", image: null, instagram: "", facebook: "", tiktok: "", whatsapp: "" },
    { id: "b4", name: "Barber 4", role: "Barber", bio: "Fresh styles and trending cuts. Great with kids and creative fades.", specialties: ["Trending Styles", "Fades", "Kids Cuts", "Edge-ups"], phone: "(347) 245-8086", image: null, instagram: "", facebook: "", tiktok: "", whatsapp: "" },
  ],
  styleGallery: [
    { id: "style-1", number: 1, name: "Burst Skin Fade", desc: "Fade radiates around the ear in a curved burst pattern", image: "/styles/style-1.webp" },
    { id: "style-2", number: 2, name: "Classic Comb Over", desc: "Timeless side-swept style with a clean hard part", image: "/styles/style-2.webp" },
    { id: "style-3", number: 3, name: "Comb Over Burst Fade", desc: "Structured comb over paired with a rounded burst fade", image: "/styles/style-3.webp" },
    { id: "style-4", number: 4, name: "Comb Over Drop Fade", desc: "Side-swept top with a fade that drops behind the ear", image: "/styles/style-4.webp" },
    { id: "style-5", number: 5, name: "Comb Over Fade", desc: "Clean comb over blended into a gradual side fade", image: "/styles/style-5.webp" },
    { id: "style-6", number: 6, name: "Comb Over High Fade", desc: "Polished comb over with a high skin fade on the sides", image: "/styles/style-6.webp" },
    { id: "style-7", number: 7, name: "Comb Over Long Hair", desc: "Longer flowing top swept to one side with volume", image: "/styles/style-7.webp" },
    { id: "style-8", number: 8, name: "Comb Over Mid Fade", desc: "Balanced comb over with a mid-level fade blend", image: "/styles/style-8.webp" },
    { id: "style-9", number: 9, name: "Comb Over Mullet", desc: "Modern mullet with combed top and length in the back", image: "/styles/style-9.jpg" },
    { id: "style-10", number: 10, name: "Comb Over Pompadour", desc: "Voluminous pompadour swept back with side fade", image: "/styles/style-10.jpg" },
    { id: "style-11", number: 11, name: "Comb Over Side Part", desc: "Sharp side part with a sleek combed finish", image: "/styles/style-11.webp" },
    { id: "style-12", number: 12, name: "Comb Over Low Fade", desc: "Subtle low fade keeping the sides tight and clean", image: "/styles/style-12.webp" },
    { id: "style-13", number: 13, name: "Drop Skin Fade", desc: "Skin fade that drops low behind the ear for a curved finish", image: "/styles/style-13.webp" },
    { id: "style-14", number: 14, name: "High Skin Fade", desc: "Skin-to-scalp fade starting high on the temples", image: "/styles/style-14.webp" },
    { id: "style-15", number: 15, name: "High Taper Skin Fade", desc: "Tapered blend from skin up high into the top length", image: "/styles/style-15.webp" },
    { id: "style-16", number: 16, name: "High Taper Comb Over", desc: "Comb over with a high taper for a sharp professional look", image: "/styles/style-16.webp" },
    { id: "style-17", number: 17, name: "Low Skin Fade", desc: "Gradual skin fade sitting low around the ears and neckline", image: "/styles/style-17.webp" },
    { id: "style-18", number: 18, name: "Low Taper Skin Fade", desc: "Subtle taper at the bottom blending into skin", image: "/styles/style-18.webp" },
    { id: "style-19", number: 19, name: "Medium Length Comb Over", desc: "Mid-length textured top swept into a relaxed comb over", image: "/styles/style-19.webp" },
    { id: "style-20", number: 20, name: "Messy Comb Over", desc: "Loose, textured comb over with natural movement", image: "/styles/style-20.webp" },
    { id: "style-21", number: 21, name: "Mid Skin Fade", desc: "Skin fade starting at the midpoint of the head", image: "/styles/style-21.webp" },
    { id: "style-22", number: 22, name: "Mid Taper Skin Fade", desc: "Medium taper blending into skin at the mid-section", image: "/styles/style-22.webp" },
    { id: "style-23", number: 23, name: "Mid Taper Comb Over", desc: "Classic comb over with a mid-level taper on the sides", image: "/styles/style-23.webp" },
    { id: "style-24", number: 24, name: "Modern Comb Over", desc: "Contemporary take on the comb over with a hard part and fade", image: "/styles/style-24.webp" },
    { id: "style-25", number: 25, name: "Pompadour", desc: "Bold volume swept up and back — the iconic statement cut", image: "/styles/style-25.jpg" },
    { id: "style-26", number: 26, name: "Shadow Fade Buzz Cut", desc: "Ultra-short buzz with a soft shadow fade on the sides", image: "/styles/style-26.jpg" },
    { id: "style-27", number: 27, name: "Short Skin Fade", desc: "Minimal length on top with a tight skin fade", image: "/styles/style-27.webp" },
    { id: "style-28", number: 28, name: "Short Comb Over", desc: "Low-maintenance short comb over with clean edges", image: "/styles/style-28.webp" },
    { id: "style-29", number: 29, name: "Skin Fade — Waves", desc: "360 waves on top with a sharp skin fade all around", image: "/styles/style-29.webp" },
    { id: "style-30", number: 30, name: "Skin Fade Buzz Cut", desc: "Close-cropped buzz paired with a clean skin fade", image: "/styles/style-30.webp" },
    { id: "style-31", number: 31, name: "Skin Fade Curly Top", desc: "Natural curls left full on top with a tight skin fade", image: "/styles/style-31.webp" },
    { id: "style-32", number: 32, name: "Skin Fade Fringe", desc: "Textured fringe falling forward over a sharp skin fade", image: "/styles/style-32.webp" },
    { id: "style-33", number: 33, name: "Skin Fade High & Tight", desc: "Military-inspired cut with skin-shaved sides and short top", image: "/styles/style-33.webp" },
    { id: "style-34", number: 34, name: "Skin Fade Messy Fringe", desc: "Effortless tousled fringe with a seamless skin fade", image: "/styles/style-34.webp" },
    { id: "style-35", number: 35, name: "Skin Fade Mullet", desc: "Modern mullet with faded sides and party in the back", image: "/styles/style-35.webp" },
    { id: "style-36", number: 36, name: "Skin Fade Perm", desc: "Curly perm on top dropping into a crisp skin fade", image: "/styles/style-36.webp" },
    { id: "style-37", number: 37, name: "Skin Fade Quiff", desc: "Lifted quiff with volume at the front and faded sides", image: "/styles/style-37.jpg" },
    { id: "style-38", number: 38, name: "Skin Fade Side Part", desc: "Defined side part with skin-tight fade for a sharp finish", image: "/styles/style-38.webp" },
    { id: "style-39", number: 39, name: "Skin Fade Textured Crop", desc: "Choppy textured crop sitting over a blended skin fade", image: "/styles/style-39.webp" },
    { id: "style-40", number: 40, name: "Skin Fade Textured Fringe", desc: "Layered fringe with texture and a clean skin fade", image: "/styles/style-40.webp" },
    { id: "style-41", number: 41, name: "Skin Fade Undercut", desc: "Disconnected undercut shaved to skin on the sides", image: "/styles/style-41.webp" },
    { id: "style-42", number: 42, name: "Taper Skin Fade", desc: "Classic taper gradually blending down to skin", image: "/styles/style-42.webp" },
  ],
  reviews: [
    { name: "Marcus T.", text: "Been coming here for years. Even after the move, same quality every time. Never miss.", rating: 5 },
    { name: "David R.", text: "Best barbershop in Jamaica. Clean shop, skilled barbers, no long waits.", rating: 5 },
    { name: "Kevin L.", text: "My taper came out perfect. New spot is easy to find. Highly recommend.", rating: 4 },
  ],
};

const loadData = () => { try { const s = localStorage.getItem("majestic-v2"); if (s) { const p = JSON.parse(s); return { ...DEFAULT_DATA, ...p, business: { ...DEFAULT_DATA.business, ...p.business }, services: { barbershop: p.services?.barbershop || DEFAULT_DATA.services.barbershop }, nailsSalon: { ...DEFAULT_DATA.nailsSalon, ...p.nailsSalon }, barbers: p.barbers || DEFAULT_DATA.barbers, styleGallery: p.styleGallery || DEFAULT_DATA.styleGallery, reviews: p.reviews || DEFAULT_DATA.reviews }; } } catch(e){} return DEFAULT_DATA; };
const saveData = (d) => { try { localStorage.setItem("majestic-v2", JSON.stringify(d)); } catch(e){} };

// ─── EDITABLE COMPONENTS ───
function E({ value, onChange, admin, tag: Tag = "span", multi, className = "", style = {}, ph = "Click to edit..." }) {
  if (!admin) return <Tag className={className} style={style}>{value || ""}</Tag>;
  if (multi) return <textarea value={value||""} onChange={e=>onChange(e.target.value)} placeholder={ph} style={{ ...style, background:"rgba(196,30,42,0.07)", border:"1px dashed var(--accent)", borderRadius:6, padding:"8px 10px", color:"inherit", font:"inherit", resize:"vertical", minHeight:60, width:"100%", boxSizing:"border-box" }} />;
  return <input type="text" value={value||""} onChange={e=>onChange(e.target.value)} placeholder={ph} style={{ ...style, background:"rgba(196,30,42,0.07)", border:"1px dashed var(--accent)", borderRadius:6, padding:"6px 10px", color:"inherit", font:"inherit", width:"100%", boxSizing:"border-box" }} />;
}

function ImgUpload({ src, onSet, admin, style = {}, placeholder, children }) {
  const ref = useRef(null);
  const handle = (e) => { const f = e.target.files[0]; if(!f) return; const r = new FileReader(); r.onload = ev => onSet(ev.target.result); r.readAsDataURL(f); };
  const has = src && src.length > 10;
  return (
    <div style={{ ...style, position:"relative", overflow:"hidden" }}>
      {has ? <img src={src} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} /> : (
        <div style={{ width:"100%", height:"100%", background:"linear-gradient(135deg,#131313,#1e1e1e)", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:6 }}>
          {children || <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-7 8-7s8 3 8 7"/></svg>}
          {placeholder && <span style={{ color:"#444", fontSize:11, fontWeight:600 }}>{placeholder}</span>}
        </div>
      )}
      {admin && <>
        <button onClick={()=>ref.current?.click()} style={{ position:"absolute", bottom:6, right:6, background:"var(--accent)", color:"#000", border:"none", borderRadius:6, padding:"5px 12px", fontSize:11, fontWeight:700, cursor:"pointer", boxShadow:"0 2px 8px rgba(0,0,0,.5)" }}>📷 Upload</button>
        <input ref={ref} type="file" accept="image/*" onChange={handle} style={{ display:"none" }} />
        {has && <button onClick={()=>onSet(null)} style={{ position:"absolute", top:6, right:6, background:"rgba(231,76,60,0.9)", color:"#fff", border:"none", borderRadius:"50%", width:24, height:24, fontSize:14, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>×</button>}
      </>}
    </div>
  );
}

function VideoUpload({ src, onSet }) {
  const ref = useRef(null);
  const [loading, setLoading] = useState(false);
  const handle = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    // For large videos, store as object URL instead of base64
    if (f.size > 5 * 1024 * 1024) {
      const url = URL.createObjectURL(f);
      onSet(url);
      return;
    }
    setLoading(true);
    const r = new FileReader();
    r.onload = ev => { onSet(ev.target.result); setLoading(false); };
    r.readAsDataURL(f);
  };
  return (
    <div style={{ display:"flex", gap:8, flexWrap:"wrap", justifyContent:"center" }}>
      <button onClick={()=>ref.current?.click()} style={{ background:"var(--accent)", color:"#000", border:"none", borderRadius:8, padding:"10px 20px", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>
        {loading ? "⏳ Processing..." : src ? "🎬 Replace Video" : "🎬 Upload Hero Video"}
      </button>
      {src && <button onClick={()=>onSet(null)} style={{ background:"rgba(231,76,60,.15)", color:"#e74c3c", border:"1px solid rgba(231,76,60,.3)", borderRadius:8, padding:"10px 16px", fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>Remove Video</button>}
      <input ref={ref} type="file" accept="video/*" onChange={handle} style={{ display:"none" }} />
      <div style={{ width:"100%", textAlign:"center", fontSize:11, color:"var(--dim)", marginTop:4 }}>MP4 recommended · Will autoplay muted on loop</div>
    </div>
  );
}

// ─── ICONS ───
const Icons = {
  scissors: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>,
  phone: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
  map: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  clock: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  shield: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  star: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  grid: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  nail: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2C8 2 6 5 6 9c0 3 1 5 3 6.5V22h6v-6.5c2-1.5 3-3.5 3-6.5 0-4-2-7-6-7z"/></svg>,
  chevron: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>,
  back: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>,
  text: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
  instagram: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
  facebook: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>,
  tiktok: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12a4 4 0 104 4V4a5 5 0 005 5"/></svg>,
  whatsapp: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>,
  externalLink: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>,
};

// ─── GLOBAL STYLES ───
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Outfit:wght@300;400;500;600;700;800&display=swap');
:root{--accent:#c41e2a;--accent-hover:#a8181f;--accent-subtle:rgba(196,30,42,.1);--accent-border:rgba(196,30,42,.2);--dark:#060606;--card:#0c0c0c;--card2:#111;--surface:#161616;--text:#e8e6e3;--dim:#8a8884;--border:rgba(255,255,255,0.07);--radius:14px;--pink:#e6a0b8;--pink-dim:rgba(230,160,184,0.1);--pink-border:rgba(230,160,184,0.15);}
*{margin:0;padding:0;box-sizing:border-box;}html{scroll-behavior:smooth;}
body{font-family:'Outfit',sans-serif;background:var(--dark);color:var(--text);-webkit-font-smoothing:antialiased;overflow-x:hidden;}
::selection{background:var(--accent);color:#fff;}
.page-enter{animation:fadeUp .35s ease-out;}
@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
@keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
.gold-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;background:#fff;color:#000;font-weight:600;font-size:15px;font-family:'Outfit',sans-serif;padding:14px 28px;border-radius:10px;border:none;cursor:pointer;text-decoration:none;transition:all .3s cubic-bezier(.25,.1,.25,1);letter-spacing:.2px;min-height:48px;}
.gold-btn:hover{background:#e8e8e8;box-shadow:0 1px 3px rgba(0,0,0,.15);}
.gold-btn:active{transform:scale(.98);opacity:.9;}
.outline-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;background:rgba(255,255,255,.04);color:var(--text);font-weight:500;font-size:15px;font-family:'Outfit',sans-serif;padding:13px 28px;border-radius:10px;border:1px solid rgba(255,255,255,.12);cursor:pointer;text-decoration:none;transition:all .3s cubic-bezier(.25,.1,.25,1);min-height:48px;backdrop-filter:blur(4px);}
.outline-btn:hover{background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.2);}
.outline-btn:active{transform:scale(.98);opacity:.9;}
.red-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;background:var(--accent);color:#fff;font-weight:600;font-size:15px;font-family:'Outfit',sans-serif;padding:14px 28px;border-radius:10px;border:none;cursor:pointer;text-decoration:none;transition:all .3s cubic-bezier(.25,.1,.25,1);min-height:48px;}
.red-btn:hover{background:var(--accent-hover);}
.red-btn:active{transform:scale(.98);opacity:.9;}
.pink-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;background:var(--pink);color:#000;font-weight:600;font-size:15px;font-family:'Outfit',sans-serif;padding:14px 28px;border-radius:10px;border:none;cursor:pointer;text-decoration:none;transition:all .3s cubic-bezier(.25,.1,.25,1);min-height:48px;}
.pink-btn:hover{background:#d993ab;}
.pink-btn:active{transform:scale(.98);opacity:.9;}
.section{padding:56px 20px;max-width:960px;margin:0 auto;}
@media(min-width:768px){.section{padding:72px 24px;}}
.heading{font-family:'Cormorant Garamond',serif;font-weight:700;color:#fff;line-height:1.15;}
.admin-bar{position:fixed;top:0;left:0;right:0;z-index:999;background:linear-gradient(90deg,#c41e2a,#e0323e,#c41e2a);background-size:200% 100%;animation:shimmer 3s linear infinite;color:#fff;padding:10px 20px;font-weight:600;font-size:13px;text-align:center;letter-spacing:.5px;}
.admin-fab{position:fixed;bottom:20px;right:20px;z-index:1000;background:rgba(255,255,255,.9);color:#000;border:none;border-radius:10px;padding:12px 20px;font-weight:600;font-size:13px;cursor:pointer;box-shadow:0 2px 12px rgba(0,0,0,.3);transition:all .3s cubic-bezier(.25,.1,.25,1);display:flex;align-items:center;gap:8px;font-family:'Outfit',sans-serif;backdrop-filter:blur(8px);}
.admin-fab:hover{background:rgba(255,255,255,1);}.admin-fab.on{background:rgba(196,30,42,.95);color:#fff;}
.sticky-cta{position:fixed;bottom:0;left:0;right:0;z-index:800;background:linear-gradient(transparent,rgba(6,6,6,.98) 35%);padding:24px 16px 16px;display:flex;gap:8px;}
@media(min-width:769px){.sticky-cta{display:none!important;}}
`;

// ─── NAV ───
function Nav({ admin, currentPage, onNav, biz }) {
  const [open, setOpen] = useState(false);
  const links = [
    { l: "Home", p: "home" }, { l: "Barbers", p: "barbers" },
    { l: "Services", p: "services" }, { l: "Styles", p: "gallery" },
    { l: "Contact", p: "contact" },
  ];
  return (
    <nav style={{ position:"sticky", top: admin ? 36 : 0, zIndex:900, background:"rgba(6,6,6,.92)", backdropFilter:"blur(16px)", borderBottom:"1px solid var(--border)" }}>
      <div style={{ maxWidth:960, margin:"0 auto", padding:"12px 20px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <button onClick={()=>onNav("home")} style={{ background:"none", border:"none", cursor:"pointer" }}>
          <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:700, color:"#fff", letterSpacing:1.5 }}>MAJESTIC</span>
        </button>
        <div className="dnav" style={{ display:"flex", gap:2, alignItems:"center" }}>
          {links.map(l=>(
            <button key={l.p} onClick={()=>onNav(l.p)} style={{ background:currentPage===l.p?"rgba(196,30,42,.1)":"none", border:"none", color:currentPage===l.p?"var(--accent)":"var(--dim)", padding:"7px 14px", borderRadius:8, fontSize:13, fontWeight:600, cursor:"pointer", transition:"all .2s", fontFamily:"'Outfit',sans-serif" }}>{l.l}</button>
          ))}
        </div>
        <button className="mnav-btn" onClick={()=>setOpen(!open)} style={{ background:"none", border:"none", cursor:"pointer", padding:8, display:"none" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth="2"><path d={open?"M18 6L6 18M6 6l12 12":"M3 12h18M3 6h18M3 18h18"}/></svg>
        </button>
      </div>
      {open && <div style={{ background:"rgba(6,6,6,.98)", borderTop:"1px solid var(--border)", padding:"6px 20px 14px" }}>
        {links.map(l=><button key={l.p} onClick={()=>{onNav(l.p);setOpen(false);}} style={{ display:"block", width:"100%", textAlign:"left", background:"none", border:"none", color:currentPage===l.p?"var(--accent)":"var(--text)", padding:"13px 0", fontSize:15, fontWeight:600, cursor:"pointer", borderBottom:"1px solid rgba(255,255,255,.04)", fontFamily:"'Outfit',sans-serif" }}>{l.l}</button>)}
      </div>}
      <style>{`@media(max-width:720px){.mnav-btn{display:block!important;}.dnav{display:none!important;}}`}</style>
    </nav>
  );
}

// ─── HOME ───
function HomePage({ data, admin, update, onNav }) {
  const biz = data.business;
  const ub = (k,v) => update("business", { ...biz, [k]: v });
  return (
    <div className="page-enter">
      {/* Hero — Full-bleed video background */}
      <div style={{ position:"relative", overflow:"hidden", minHeight:"100vh", display:"flex", flexDirection:"column" }}>
        {/* Video / Placeholder Background */}
        <div style={{ position:"absolute", inset:0, zIndex:0 }}>
          {biz.heroVideo ? (
            <video
              autoPlay muted loop playsInline
              style={{ width:"100%", height:"100%", objectFit:"cover" }}
              src={biz.heroVideo}
            />
          ) : (
            <div style={{ width:"100%", height:"100%", background:"linear-gradient(160deg, #0a0a0a 0%, #1a1510 30%, #0d0b08 60%, #0a0a0a 100%)", display:"flex", alignItems:"center", justifyContent:"center" }}>
              {admin && (
                <div style={{ textAlign:"center", opacity:.5 }}>
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  <p style={{ color:"var(--accent)", fontSize:13, marginTop:8, fontWeight:600 }}>Upload hero video below</p>
                </div>
              )}
            </div>
          )}
          {/* Dark overlay for text readability */}
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.65) 80%, rgba(6,6,6,1) 100%)" }} />
        </div>


        {/* Hero Content */}
        <div style={{ position:"relative", zIndex:2, flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:"60px 20px 80px", textAlign:"center" }}>
          <div style={{ maxWidth:500 }}>
            <div style={{ fontSize:11, fontWeight:700, color:"var(--accent)", letterSpacing:4, textTransform:"uppercase", marginBottom:20, opacity:.8 }}>Jamaica, Queens</div>
            <h1 className="heading" style={{ fontSize:"clamp(38px,9vw,60px)", marginBottom:14, textShadow:"0 2px 40px rgba(0,0,0,.6)" }}>
              <E value={biz.name} onChange={v=>ub("name",v)} admin={admin} style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"inherit", fontWeight:700, color:"#fff" }} />
            </h1>
            <p style={{ fontSize:18, color:"rgba(255,255,255,.7)", marginBottom:12, lineHeight:1.6 }}>
              <E value={biz.subtitle} onChange={v=>ub("subtitle",v)} admin={admin} style={{ fontSize:18, color:"rgba(255,255,255,.7)" }} />
            </p>
            <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(196,30,42,.12)", backdropFilter:"blur(6px)", padding:"6px 16px", borderRadius:20, marginBottom:36 }}>
              <span style={{ color:"var(--accent)", fontWeight:800 }}>{Icons.star}</span>
              <E value={biz.rating} onChange={v=>ub("rating",v)} admin={admin} style={{ color:"var(--accent)", fontWeight:700, fontSize:14, width:admin?40:"auto", textAlign:"center" }} />
              <span style={{ color:"rgba(255,255,255,.4)", fontSize:13 }}>·</span>
              <E value={biz.reviewCount} onChange={v=>ub("reviewCount",v)} admin={admin} style={{ color:"rgba(255,255,255,.5)", fontSize:13, width:admin?35:"auto" }} />
              <span style={{ color:"rgba(255,255,255,.5)", fontSize:13 }}>reviews</span>
            </div>

            <div style={{ display:"flex", flexDirection:"column", gap:10, maxWidth:340, margin:"0 auto" }}>
              <button className="gold-btn" onClick={()=>onNav("barbers")} style={{ width:"100%" }}>Book Appointment</button>
              <a href={`tel:${biz.phone1.replace(/\D/g,"")}`} className="outline-btn" style={{ width:"100%", textDecoration:"none" }}>{Icons.phone} {biz.phone1}</a>
              <a href={biz.mapsUrl} target="_blank" rel="noopener noreferrer" className="outline-btn" style={{ width:"100%", textDecoration:"none" }}>{Icons.map} Get Directions</a>
            </div>
          </div>
        </div>

        {/* Admin: Video upload control */}
        {admin && (
          <div style={{ position:"relative", zIndex:2, padding:"0 20px 20px", display:"flex", justifyContent:"center" }}>
            <VideoUpload
              src={biz.heroVideo}
              onSet={v => ub("heroVideo", v)}
            />
          </div>
        )}
      </div>

      {/* Guarantee + Hours */}
      <div style={{ background:"var(--card)", borderTop:"1px solid var(--border)", borderBottom:"1px solid var(--border)" }}>
        <div className="section" style={{ paddingTop:36, paddingBottom:36 }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:20 }}>
            {/* Guarantee */}
            <div style={{ background:"var(--surface)", borderRadius:"var(--radius)", padding:24, border:"1px solid var(--border)" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12, color:"var(--accent)" }}>{Icons.shield}<span style={{ fontWeight:700, fontSize:14, letterSpacing:.5 }}>SATISFACTION GUARANTEE</span></div>
              <E value={biz.guarantee} onChange={v=>ub("guarantee",v)} admin={admin} tag="p" style={{ fontSize:15, lineHeight:1.6, color:"var(--text)", marginBottom:8 }} />
              <E value={biz.guaranteeEs} onChange={v=>ub("guaranteeEs",v)} admin={admin} tag="p" style={{ fontSize:13, lineHeight:1.5, color:"var(--dim)", fontStyle:"italic" }} />
            </div>
            {/* Hours */}
            <div style={{ background:"var(--surface)", borderRadius:"var(--radius)", padding:24, border:"1px solid var(--border)" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12, color:"var(--accent)" }}>{Icons.clock}<span style={{ fontWeight:700, fontSize:14, letterSpacing:.5 }}>HOURS</span></div>
              {biz.hours.map((h,i)=>(
                <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom: i < biz.hours.length-1 ? "1px solid var(--border)" : "none" }}>
                  <E value={h.days} onChange={v=>{ const nh=[...biz.hours]; nh[i]={...nh[i],days:v}; ub("hours",nh); }} admin={admin} style={{ fontSize:14, color:"var(--text)", fontWeight:500 }} />
                  <E value={h.time} onChange={v=>{ const nh=[...biz.hours]; nh[i]={...nh[i],time:v}; ub("hours",nh); }} admin={admin} style={{ fontSize:14, color:"var(--accent)", fontWeight:600, textAlign:"right" }} />
                </div>
              ))}
              <div style={{ marginTop:14, display:"inline-flex", alignItems:"center", gap:6, background:"rgba(196,30,42,.08)", padding:"5px 14px", borderRadius:20 }}>
                <span style={{ color:"var(--accent)", fontSize:12, fontWeight:700 }}>✦ {biz.walkIns}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Services Preview */}
      <div className="section" style={{ paddingTop:36, paddingBottom:20 }}>
        <h2 className="heading" style={{ fontSize:28, textAlign:"center", marginBottom:6 }}>Services & Pricing</h2>
        <p style={{ textAlign:"center", color:"var(--dim)", fontSize:14, marginBottom:24 }}>Straight from the board. No surprises.</p>
        <div style={{ display:"grid", gridTemplateColumns:"1fr", gap:1 }}>
          {data.services.barbershop.slice(0,8).map(s=>(
            <div key={s.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 0", borderBottom:"1px solid var(--border)" }}>
              <span style={{ fontSize:15, fontWeight:500 }}>{s.name}</span>
              <span style={{ fontSize:15, fontWeight:700, color:"var(--accent)" }}>{s.price}</span>
            </div>
          ))}
        </div>
        <button onClick={()=>onNav("services")} style={{ width:"100%", marginTop:20, background:"var(--surface)", border:"1px solid var(--border)", borderRadius:12, padding:"14px", color:"var(--accent)", fontWeight:600, fontSize:14, cursor:"pointer", fontFamily:"'Outfit',sans-serif", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
          View Full Menu — {data.services.barbershop.length} services {Icons.chevron}
        </button>
      </div>

      {/* IZ Nails — Redirect Portal */}
      <div className="section" style={{ paddingTop:16, paddingBottom:20 }}>
        <div style={{ background:"linear-gradient(135deg, #1a0f14 0%, #0e0e0e 100%)", border:"1px solid var(--pink-border)", borderRadius:"var(--radius)", padding:28, textAlign:"center", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:"linear-gradient(90deg, var(--pink), #c77dba, var(--pink))" }} />
          <div style={{ fontSize:11, fontWeight:700, color:"var(--pink)", letterSpacing:3, textTransform:"uppercase", marginBottom:10 }}>Also In-House</div>
          <h3 className="heading" style={{ fontSize:24, marginBottom:6 }}>
            {admin ? <E value={data.nailsSalon.name} onChange={v=>update("nailsSalon",{...data.nailsSalon,name:v})} admin={admin} style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:24, fontWeight:700, color:"#fff", textAlign:"center" }} /> : data.nailsSalon.name}
          </h3>
          <p style={{ color:"var(--dim)", fontSize:14, marginBottom:6 }}>
            {admin ? <E value={data.nailsSalon.tagline} onChange={v=>update("nailsSalon",{...data.nailsSalon,tagline:v})} admin={admin} style={{ fontSize:14, color:"var(--dim)", textAlign:"center" }} /> : data.nailsSalon.tagline}
          </p>
          <p style={{ color:"var(--pink)", fontSize:13, fontWeight:600, marginBottom:18 }}>Call {data.nailsSalon.phone}</p>
          {admin && (
            <div style={{ marginBottom:16 }}>
              <label style={{ fontSize:11, color:"var(--dim)", display:"block", marginBottom:4 }}>Nail salon website URL (leave blank if none yet)</label>
              <E value={data.nailsSalon.link} onChange={v=>update("nailsSalon",{...data.nailsSalon,link:v})} admin={admin} ph="https://iznails.com" style={{ fontSize:13, color:"var(--pink)", textAlign:"center" }} />
            </div>
          )}
          <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap" }}>
            {data.nailsSalon.link ? (
              <a href={data.nailsSalon.link} target="_blank" rel="noopener noreferrer" className="pink-btn" style={{ fontSize:14, padding:"11px 24px", textDecoration:"none" }}>
                View Nail Services →
              </a>
            ) : (
              <a href={`tel:${data.nailsSalon.phone.replace(/\D/g,"")}`} className="pink-btn" style={{ fontSize:14, padding:"11px 24px", textDecoration:"none" }}>
                Call {data.nailsSalon.name}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div style={{ background:"var(--card)", borderTop:"1px solid var(--border)" }}>
        <div className="section" style={{ paddingTop:36, paddingBottom:36 }}>
          <h2 className="heading" style={{ fontSize:24, textAlign:"center", marginBottom:24 }}>What People Say</h2>
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {data.reviews.map((r,i)=>(
              <div key={i} style={{ background:"var(--surface)", borderRadius:"var(--radius)", padding:20, border:"1px solid var(--border)" }}>
                <div style={{ color:"var(--accent)", marginBottom:8, letterSpacing:2, fontSize:13 }}>{"★".repeat(r.rating)}{"☆".repeat(5-r.rating)}</div>
                <E value={r.text} onChange={v=>{const n=[...data.reviews];n[i]={...n[i],text:v};update("reviews",n);}} admin={admin} multi tag="p" style={{ fontSize:15, lineHeight:1.6, color:"var(--text)", marginBottom:10 }} />
                <E value={r.name} onChange={v=>{const n=[...data.reviews];n[i]={...n[i],name:v};update("reviews",n);}} admin={admin} style={{ fontSize:13, fontWeight:600, color:"var(--dim)" }} />
              </div>
            ))}
          </div>
          {admin && <button onClick={()=>update("reviews",[...data.reviews,{name:"New Reviewer",text:"Great experience!",rating:5}])} style={{ marginTop:14, background:"rgba(196,30,42,.06)", border:"1px dashed var(--accent)", borderRadius:10, padding:"12px", color:"var(--accent)", fontWeight:600, cursor:"pointer", width:"100%", fontSize:13 }}>+ Add Review</button>}
        </div>
      </div>
    </div>
  );
}

// ─── SERVICES PAGE (Interactive Menu with Photo Slots) ───
function ServicesPage({ data, admin, update, onNav }) {
  const [view, setView] = useState("list"); // list | grid
  const services = data.services.barbershop;
  const updateService = (i, field, val) => { const n = [...services]; n[i] = { ...n[i], [field]: val }; update("services", { ...data.services, barbershop: n }); };
  const addService = () => update("services", { ...data.services, barbershop: [...services, { id: "s"+Date.now(), name: "New Service", price: "$0", image: null, desc: "" }] });
  const removeService = (i) => update("services", { ...data.services, barbershop: services.filter((_,idx)=>idx!==i) });

  return (
    <div className="page-enter">
      <div className="section">
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
          <h1 className="heading" style={{ fontSize:30 }}>Barbershop Services</h1>
          <div style={{ display:"flex", gap:4, background:"var(--surface)", borderRadius:8, padding:3 }}>
            <button onClick={()=>setView("list")} style={{ background:view==="list"?"var(--accent)":"transparent", color:view==="list"?"#000":"var(--dim)", border:"none", borderRadius:6, padding:"6px 10px", cursor:"pointer", fontSize:12, fontWeight:600 }}>List</button>
            <button onClick={()=>setView("grid")} style={{ background:view==="grid"?"var(--accent)":"transparent", color:view==="grid"?"#000":"var(--dim)", border:"none", borderRadius:6, padding:"6px 10px", cursor:"pointer", fontSize:12, fontWeight:600 }}>{Icons.grid} Grid</button>
          </div>
        </div>
        <p style={{ color:"var(--dim)", fontSize:14, marginBottom:28 }}>{services.length} services · Prices straight from the board</p>

        {view === "list" ? (
          <div>
            {services.map((s,i)=>(
              <div key={s.id} style={{ display:"flex", gap:16, padding:"20px 0", borderBottom:"1px solid var(--border)", alignItems:"flex-start" }}>
                <ImgUpload src={s.image} onSet={v=>updateService(i,"image",v)} admin={admin} style={{ width:110, height:110, borderRadius:12, flexShrink:0 }} placeholder="">
                  {Icons.scissors}
                </ImgUpload>
                <div style={{ flex:1, minWidth:0, paddingTop:4 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:12, marginBottom:6 }}>
                    <E value={s.name} onChange={v=>updateService(i,"name",v)} admin={admin} style={{ fontSize:17, fontWeight:600, color:"#fff", display:"block" }} />
                    <div style={{ display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>
                      <E value={s.price} onChange={v=>updateService(i,"price",v)} admin={admin} style={{ fontSize:18, fontWeight:700, color:"var(--accent)", textAlign:"right", width:admin?70:"auto" }} />
                      {admin && <button onClick={()=>removeService(i)} style={{ background:"none", border:"none", color:"#e74c3c", cursor:"pointer", fontSize:16 }}>×</button>}
                    </div>
                  </div>
                  <E value={s.desc} onChange={v=>updateService(i,"desc",v)} admin={admin} style={{ fontSize:13, color:"var(--dim)", lineHeight:1.5, display:"block" }} ph="Add a description..." />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:16 }}>
            {services.map((s,i)=>(
              <div key={s.id} style={{ background:"var(--card)", borderRadius:"var(--radius)", overflow:"hidden", border:"1px solid var(--border)", position:"relative" }}>
                <ImgUpload src={s.image} onSet={v=>updateService(i,"image",v)} admin={admin} style={{ width:"100%", height:260 }} placeholder={s.name}>
                  <div style={{ color:"var(--accent)", opacity:.3 }}>{Icons.scissors}</div>
                </ImgUpload>
                <div style={{ padding:"16px 18px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
                    <E value={s.name} onChange={v=>updateService(i,"name",v)} admin={admin} style={{ fontSize:16, fontWeight:600, color:"#fff", display:"block" }} />
                    <E value={s.price} onChange={v=>updateService(i,"price",v)} admin={admin} style={{ fontSize:17, fontWeight:700, color:"var(--accent)", flexShrink:0 }} />
                  </div>
                  <E value={s.desc} onChange={v=>updateService(i,"desc",v)} admin={admin} style={{ fontSize:13, color:"var(--dim)", lineHeight:1.5, display:"block" }} ph="Add a description..." />
                </div>
                {admin && <button onClick={()=>removeService(i)} style={{ position:"absolute", top:8, right:8, background:"rgba(231,76,60,.9)", color:"#fff", border:"none", borderRadius:"50%", width:24, height:24, fontSize:14, cursor:"pointer" }}>×</button>}
              </div>
            ))}
          </div>
        )}
        {admin && <button onClick={addService} style={{ marginTop:16, background:"rgba(196,30,42,.06)", border:"2px dashed var(--accent)", borderRadius:"var(--radius)", padding:"32px 20px", color:"var(--accent)", fontWeight:700, cursor:"pointer", width:"100%", fontSize:15 }}>+ Add Service</button>}

        <div style={{ marginTop:32, textAlign:"center" }}>
          <button className="gold-btn" onClick={()=>onNav("barbers")}>Book With a Barber</button>
        </div>
      </div>
    </div>
  );
}

// ─── STYLE GALLERY (25 numbered styles) ───
function GalleryPage({ data, admin, update }) {
  const gallery = data.styleGallery;
  const [lightbox, setLightbox] = useState(null);
  const updateStyle = (i, field, val) => { const n = [...gallery]; n[i] = { ...n[i], [field]: val }; update("styleGallery", n); };
  const addStyle = () => update("styleGallery", [...gallery, { id:"style-"+Date.now(), number:gallery.length+1, name:`Style ${gallery.length+1}`, desc:"", image:null }]);
  const removeStyle = (i) => update("styleGallery", gallery.filter((_,idx)=>idx!==i));

  const goNext = () => { if (lightbox === null) return; setLightbox((lightbox + 1) % gallery.length); };
  const goPrev = () => { if (lightbox === null) return; setLightbox((lightbox - 1 + gallery.length) % gallery.length); };

  return (
    <div className="page-enter">
      <div className="section" style={{ maxWidth:960 }}>
        <h1 className="heading" style={{ fontSize:30, textAlign:"center", marginBottom:6 }}>Style Gallery</h1>
        <p style={{ textAlign:"center", color:"var(--dim)", fontSize:14, marginBottom:28 }}>Tap any style to view full size. Show your barber. Get the cut.</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:16 }}>
          {gallery.map((s,i)=>(
            <div key={s.id} onClick={()=>!admin && s.image && setLightbox(i)} style={{ position:"relative", background:"var(--card)", borderRadius:14, overflow:"hidden", border:"1px solid var(--border)", cursor: (!admin && s.image) ? "pointer" : "default", transition:"transform .2s" }} onMouseEnter={e=>{if(!admin&&s.image)e.currentTarget.style.transform="scale(1.02)";}} onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";}}>
              <ImgUpload src={s.image} onSet={v=>updateStyle(i,"image",v)} admin={admin} style={{ width:"100%", aspectRatio:"3/4" }} placeholder="">
                <span style={{ fontSize:48, fontWeight:800, color:"#282828", fontFamily:"'Outfit',sans-serif" }}>{s.number}</span>
              </ImgUpload>
              {/* Number badge */}
              <div style={{ position:"absolute", top:10, left:10, background:"rgba(0,0,0,.8)", backdropFilter:"blur(4px)", borderRadius:8, padding:"4px 12px", fontSize:15, fontWeight:700, color:"var(--accent)" }}>
                #{s.number}
              </div>
              {/* Info overlay */}
              {!admin && (
                <div style={{ position:"absolute", bottom:0, left:0, right:0, background:"linear-gradient(transparent, rgba(0,0,0,.85))", padding:"32px 14px 14px" }}>
                  <span style={{ color:"#fff", fontSize:14, fontWeight:600, display:"block" }}>{s.name}</span>
                  {s.desc && <span style={{ color:"rgba(255,255,255,.55)", fontSize:12, marginTop:3, display:"block", lineHeight:1.4 }}>{s.desc}</span>}
                </div>
              )}
              {admin && (
                <>
                  <div style={{ position:"absolute", bottom:0, left:0, right:0, background:"rgba(0,0,0,.85)", padding:"10px 12px" }}>
                    <input value={s.name} onChange={e=>updateStyle(i,"name",e.target.value)} placeholder="Style name" style={{ background:"transparent", border:"none", color:"#fff", fontSize:13, fontWeight:600, width:"100%", fontFamily:"'Outfit',sans-serif", marginBottom:4 }} />
                    <input value={s.desc||""} onChange={e=>updateStyle(i,"desc",e.target.value)} placeholder="Description (e.g. Low skin fade with textured top)" style={{ background:"transparent", border:"none", color:"rgba(255,255,255,.5)", fontSize:11, width:"100%", fontFamily:"'Outfit',sans-serif" }} />
                  </div>
                  <button onClick={(e)=>{e.stopPropagation();removeStyle(i);}} style={{ position:"absolute", top:8, right:8, background:"rgba(231,76,60,.9)", color:"#fff", border:"none", borderRadius:"50%", width:24, height:24, fontSize:13, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>×</button>
                </>
              )}
            </div>
          ))}
          {admin && (
            <button onClick={addStyle} style={{ aspectRatio:"3/4", background:"rgba(196,30,42,.04)", border:"2px dashed rgba(196,30,42,.3)", borderRadius:14, color:"var(--accent)", fontWeight:700, cursor:"pointer", fontSize:28, display:"flex", alignItems:"center", justifyContent:"center" }}>+</button>
          )}
        </div>
      </div>

      {/* Fullscreen Lightbox */}
      {lightbox !== null && (
        <div onClick={()=>setLightbox(null)} style={{ position:"fixed", inset:0, zIndex:9999, background:"rgba(0,0,0,.95)", display:"flex", alignItems:"center", justifyContent:"center", padding:20, cursor:"pointer" }}>
          {/* Close button */}
          <button onClick={()=>setLightbox(null)} style={{ position:"absolute", top:16, right:16, background:"rgba(255,255,255,.1)", border:"none", borderRadius:"50%", width:44, height:44, color:"#fff", fontSize:24, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", zIndex:2 }}>×</button>

          {/* Prev button */}
          <button onClick={(e)=>{e.stopPropagation();goPrev();}} style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", background:"rgba(255,255,255,.08)", border:"none", borderRadius:"50%", width:48, height:48, color:"#fff", fontSize:22, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", zIndex:2 }}>
            {Icons.back}
          </button>

          {/* Image */}
          <div onClick={(e)=>e.stopPropagation()} style={{ maxWidth:"90vw", maxHeight:"85vh", position:"relative", cursor:"default", textAlign:"center" }}>
            {gallery[lightbox]?.image && (
              <img src={gallery[lightbox].image} alt={gallery[lightbox].name} style={{ maxWidth:"90vw", maxHeight:"75vh", objectFit:"contain", borderRadius:12 }} />
            )}
            <div style={{ marginTop:16 }}>
              <div style={{ fontSize:20, fontWeight:700, color:"#fff" }}>
                #{gallery[lightbox]?.number} — {gallery[lightbox]?.name}
              </div>
              {gallery[lightbox]?.desc && (
                <div style={{ fontSize:14, color:"rgba(255,255,255,.5)", marginTop:6, maxWidth:400, margin:"6px auto 0", lineHeight:1.5 }}>
                  {gallery[lightbox].desc}
                </div>
              )}
            </div>
          </div>

          {/* Next button */}
          <button onClick={(e)=>{e.stopPropagation();goNext();}} style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", background:"rgba(255,255,255,.08)", border:"none", borderRadius:"50%", width:48, height:48, color:"#fff", fontSize:22, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", zIndex:2 }}>
            {Icons.chevron}
          </button>
        </div>
      )}
    </div>
  );
}


// ─── BARBERS PAGE ───
function BarbersPage({ data, admin, update, onNav }) {
  const biz = data.business;
  return (
    <div className="page-enter">
      {/* Shop Walkthrough Video */}
      {(biz.barbersVideo || admin) && <>
        <div style={{ position:"relative", overflow:"hidden", maxHeight:560 }}>
          {biz.barbersVideo ? (
            <video autoPlay muted loop playsInline style={{ width:"100%", height:560, objectFit:"cover", display:"block" }} src={biz.barbersVideo} />
          ) : (
            <div style={{ width:"100%", height:340, background:"linear-gradient(135deg, #0d0b08, #1a1510)", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <div style={{ textAlign:"center", opacity:.4 }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                <p style={{ color:"var(--accent)", fontSize:12, marginTop:6 }}>Shop walkthrough video</p>
              </div>
            </div>
          )}
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, transparent 40%, rgba(6,6,6,1) 100%)" }} />
          {biz.barbersVideo && (
            <div style={{ position:"absolute", bottom:20, left:0, right:0, textAlign:"center", zIndex:2 }}>
              <span style={{ background:"rgba(0,0,0,.6)", backdropFilter:"blur(6px)", padding:"6px 16px", borderRadius:20, fontSize:12, fontWeight:600, color:"var(--accent)", letterSpacing:1 }}>INSIDE THE SHOP</span>
            </div>
          )}
        </div>
        {admin && (
          <div style={{ padding:"12px 20px", display:"flex", justifyContent:"center" }}>
            <VideoUpload src={biz.barbersVideo} onSet={v=>update("business",{...biz,barbersVideo:v})} />
          </div>
        )}
      </>}

      <div className="section" style={{ paddingTop: (biz.barbersVideo || admin) ? 20 : undefined }}>
        <h1 className="heading" style={{ fontSize:30, textAlign:"center", marginBottom:6 }}>Our Barbers</h1>
        <p style={{ textAlign:"center", color:"var(--dim)", fontSize:15, marginBottom:32 }}>Pick your barber. Call or text them to book.</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:16 }}>
          {data.barbers.map((b,i)=>(
            <div key={b.id} style={{ background:"var(--card)", borderRadius:"var(--radius)", overflow:"hidden", border:"1px solid var(--border)", cursor:admin?"default":"pointer" }} onClick={()=>!admin&&onNav("barber-profile",b.id)}>
              <ImgUpload src={b.image} onSet={v=>{const n=[...data.barbers];n[i]={...n[i],image:v};update("barbers",n);}} admin={admin} style={{ width:"100%", height:320 }} placeholder={b.name} />
              <div style={{ padding:18 }}>
                <E value={b.name} onChange={v=>{const n=[...data.barbers];n[i]={...n[i],name:v};update("barbers",n);}} admin={admin} tag="h3" style={{ fontSize:18, fontWeight:700, color:"#fff", fontFamily:"'Cormorant Garamond',serif", marginBottom:3 }} />
                <E value={b.role} onChange={v=>{const n=[...data.barbers];n[i]={...n[i],role:v};update("barbers",n);}} admin={admin} style={{ fontSize:12, color:"var(--accent)", fontWeight:600, display:"block", marginBottom:10 }} />
                <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginBottom:14 }}>
                  {(admin ? b.specialties : b.specialties.slice(0,3)).map((s,si)=>(
                    <span key={si}>
                      {admin ? (
                        <span style={{ display:"inline-flex", alignItems:"center", gap:2 }}>
                          <input value={s} onChange={e=>{const n=[...data.barbers];const ns=[...n[i].specialties];ns[si]=e.target.value;n[i]={...n[i],specialties:ns};update("barbers",n);}} style={{ background:"rgba(196,30,42,.1)", border:"1px dashed var(--accent)", borderRadius:16, padding:"3px 8px", color:"var(--accent)", fontSize:10, fontWeight:600, width:80, fontFamily:"'Outfit',sans-serif" }} />
                          <button onClick={e=>{e.stopPropagation();const n=[...data.barbers];n[i]={...n[i],specialties:b.specialties.filter((_,x)=>x!==si)};update("barbers",n);}} style={{ background:"#e74c3c", color:"#fff", border:"none", borderRadius:"50%", width:16, height:16, fontSize:10, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", lineHeight:1 }}>×</button>
                        </span>
                      ) : (
                        <span style={{ background:"rgba(196,30,42,.08)", color:"var(--accent)", fontSize:10, fontWeight:600, padding:"3px 9px", borderRadius:16 }}>{s}</span>
                      )}
                    </span>
                  ))}
                  {admin && <button onClick={e=>{e.stopPropagation();const n=[...data.barbers];n[i]={...n[i],specialties:[...b.specialties,"New"]};update("barbers",n);}} style={{ background:"none", border:"1px dashed var(--accent)", borderRadius:16, padding:"3px 8px", color:"var(--accent)", fontSize:10, cursor:"pointer", fontWeight:600 }}>+</button>}
                </div>
                <button className="gold-btn" onClick={e=>{e.stopPropagation();onNav("barber-profile",b.id);}} style={{ width:"100%", fontSize:13, padding:"11px 16px" }}>View Barber</button>
              </div>
            </div>
          ))}
        </div>
        {admin && <button onClick={()=>update("barbers",[...data.barbers,{id:"b"+Date.now(),name:"New Barber",role:"Barber",bio:"Bio here.",specialties:["Cuts","Fades"],phone:data.business.phone1,image:null}])} style={{ marginTop:16, background:"rgba(196,30,42,.04)", border:"2px dashed var(--accent)", borderRadius:"var(--radius)", padding:"36px", color:"var(--accent)", fontWeight:700, cursor:"pointer", width:"100%", fontSize:15 }}>+ Add Barber</button>}
      </div>
    </div>
  );
}

// ─── BARBER PROFILE ───
function BarberProfile({ barber, idx, data, admin, update, onNav }) {
  if (!barber) return <div className="section" style={{ textAlign:"center" }}><p>Barber not found.</p><button className="gold-btn" onClick={()=>onNav("barbers")}>← Back</button></div>;
  const b = barber;
  const up = (f,v) => { const n=[...data.barbers]; n[idx]={...n[idx],[f]:v}; update("barbers",n); };
  return (
    <div className="page-enter">
      <div className="section" style={{ maxWidth:600 }}>
        <button onClick={()=>onNav("barbers")} style={{ background:"none", border:"none", color:"var(--accent)", fontWeight:600, cursor:"pointer", fontSize:14, marginBottom:20, padding:0, fontFamily:"'Outfit',sans-serif", display:"flex", alignItems:"center", gap:4 }}>{Icons.back} All Barbers</button>
        <ImgUpload src={b.image} onSet={v=>up("image",v)} admin={admin} style={{ width:"100%", height:440, borderRadius:"var(--radius)" }} placeholder={b.name} />
        <div style={{ marginTop:22 }}>
          <E value={b.name} onChange={v=>up("name",v)} admin={admin} tag="h1" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:34, fontWeight:700, color:"#fff", marginBottom:3 }} />
          <E value={b.role} onChange={v=>up("role",v)} admin={admin} style={{ fontSize:14, color:"var(--accent)", fontWeight:600, display:"block", marginBottom:18 }} />
          <E value={b.bio} onChange={v=>up("bio",v)} admin={admin} multi tag="p" style={{ fontSize:15, lineHeight:1.7, color:"var(--text)", marginBottom:24 }} />

          <div style={{ fontSize:12, fontWeight:700, color:"var(--dim)", letterSpacing:1.5, textTransform:"uppercase", marginBottom:10 }}>Specialties</div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:7, marginBottom:28 }}>
            {b.specialties.map((s,si)=>(
              <span key={si}>
                {admin ? (
                  <span style={{ display:"inline-flex", alignItems:"center", gap:3 }}>
                    <input value={s} onChange={e=>{const n=[...b.specialties];n[si]=e.target.value;up("specialties",n);}} style={{ background:"rgba(196,30,42,.1)", border:"1px dashed var(--accent)", borderRadius:16, padding:"5px 11px", color:"var(--accent)", fontSize:12, fontWeight:600, width:110, fontFamily:"'Outfit',sans-serif" }}/>
                    <button onClick={()=>up("specialties",b.specialties.filter((_,x)=>x!==si))} style={{ background:"#e74c3c", color:"#fff", border:"none", borderRadius:"50%", width:18, height:18, fontSize:11, cursor:"pointer" }}>×</button>
                  </span>
                ) : (
                  <span style={{ background:"rgba(196,30,42,.08)", color:"var(--accent)", fontSize:12, fontWeight:600, padding:"5px 13px", borderRadius:16 }}>{s}</span>
                )}
              </span>
            ))}
            {admin && <button onClick={()=>up("specialties",[...b.specialties,"New"])} style={{ background:"none", border:"1px dashed var(--accent)", borderRadius:16, padding:"5px 12px", color:"var(--accent)", fontSize:12, cursor:"pointer" }}>+</button>}
          </div>

          {/* Book CTA */}
          {(()=>{
            const sLabel = { fontSize:11, fontWeight:700, color:"var(--dim)", letterSpacing:1.8, textTransform:"uppercase", marginBottom:14 };
            const crd = { background:"var(--card)", borderRadius:16, border:"1px solid var(--border)", overflow:"hidden" };
            const cRow = { display:"flex", alignItems:"center", gap:14, padding:"16px 20px", transition:"background .2s" };
            const cDiv = { height:1, background:"var(--border)", margin:"0 20px" };
            const iWrap = (bg) => ({ width:40, height:40, borderRadius:10, background:bg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 });
            const socials = [
              { key:"instagram", label:"Instagram", icon:Icons.instagram, color:"#E1306C", bg:"rgba(225,48,108,.12)", prefix:"https://instagram.com/", placeholder:"username" },
              { key:"facebook", label:"Facebook", icon:Icons.facebook, color:"#1877F2", bg:"rgba(24,119,242,.12)", prefix:"https://facebook.com/", placeholder:"page or URL" },
              { key:"tiktok", label:"TikTok", icon:Icons.tiktok, color:"#fff", bg:"rgba(255,255,255,.1)", prefix:"https://tiktok.com/@", placeholder:"username" },
            ];
            const bUrl = (val, prefix) => {
              if (!val) return "";
              if (val.startsWith("http://") || val.startsWith("https://")) return val;
              return prefix + val.replace(/^@/, "");
            };
            const waUrl = b.whatsapp ? `https://wa.me/${b.whatsapp.replace(/\D/g,"")}` : "";
            const hasSocial = socials.some(s=>!!b[s.key]) || !!b.whatsapp;
            return <>
              <div style={sLabel}>Book with {b.name}</div>
              <div style={{ ...crd, marginBottom:28 }}>
                {admin && <div style={{ padding:"14px 20px", borderBottom:"1px solid var(--border)" }}>
                  <label style={{ fontSize:11, color:"var(--dim)" }}>Barber's Phone</label>
                  <E value={b.phone} onChange={v=>up("phone",v)} admin={admin} style={{ color:"#fff", fontSize:14 }} />
                </div>}
                <a href={`tel:${b.phone.replace(/\D/g,"")}`} style={{ ...cRow, textDecoration:"none", color:"inherit", cursor:"pointer" }}>
                  <div style={iWrap("rgba(196,30,42,.12)")}><span style={{ color:"var(--accent)" }}>{Icons.phone}</span></div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:15, fontWeight:600, color:"#fff" }}>Call {b.name}</div>
                    <div style={{ fontSize:12, color:"var(--dim)", marginTop:1 }}>{b.phone}</div>
                  </div>
                  <span style={{ color:"var(--dim)" }}>{Icons.chevron}</span>
                </a>
                <div style={cDiv}/>
                <a href={`sms:${b.phone.replace(/\D/g,"")}`} style={{ ...cRow, textDecoration:"none", color:"inherit", cursor:"pointer" }}>
                  <div style={iWrap("rgba(255,255,255,.06)")}><span style={{ color:"var(--dim)" }}>{Icons.text}</span></div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:15, fontWeight:600, color:"#fff" }}>Text {b.name}</div>
                    <div style={{ fontSize:12, color:"var(--dim)", marginTop:1 }}>Send an SMS</div>
                  </div>
                  <span style={{ color:"var(--dim)" }}>{Icons.chevron}</span>
                </a>
                {(b.whatsapp || admin) && <>
                  <div style={cDiv}/>
                  {admin && !b.whatsapp && (
                    <div style={{ padding:"14px 20px", borderBottom:"1px solid var(--border)" }}>
                      <label style={{ fontSize:11, color:"var(--dim)", display:"block", marginBottom:4 }}>WhatsApp (with country code)</label>
                      <input type="text" value={b.whatsapp||""} onChange={e=>up("whatsapp",e.target.value)} placeholder="13476179697" style={{ width:"100%", padding:"10px 12px", borderRadius:8, border:"1px dashed var(--accent)", background:"rgba(196,30,42,0.07)", color:"#fff", fontSize:14, fontFamily:"'Outfit',sans-serif", boxSizing:"border-box" }} />
                    </div>
                  )}
                  {b.whatsapp ? (
                    <a href={waUrl} target="_blank" rel="noopener noreferrer" style={{ ...cRow, textDecoration:"none", color:"inherit", cursor:"pointer" }}>
                      <div style={iWrap("rgba(37,211,102,.12)")}><span style={{ color:"#25D366" }}>{Icons.whatsapp}</span></div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontSize:15, fontWeight:600, color:"#fff" }}>WhatsApp {b.name}</div>
                        <div style={{ fontSize:12, color:"var(--dim)", marginTop:1 }}>Tap to open chat</div>
                      </div>
                      <span style={{ color:"#25D366" }}>{Icons.externalLink}</span>
                    </a>
                  ) : admin ? null : (
                    <div style={{ ...cRow, opacity:.4 }}>
                      <div style={iWrap("rgba(255,255,255,.04)")}><span style={{ color:"var(--dim)" }}>{Icons.whatsapp}</span></div>
                      <div style={{ flex:1 }}><div style={{ fontSize:15, fontWeight:500, color:"var(--dim)" }}>WhatsApp</div><div style={{ fontSize:12, color:"var(--dim)", marginTop:1 }}>Coming soon</div></div>
                    </div>
                  )}
                </>}
              </div>

              {/* Social Media */}
              <div style={sLabel}>Follow {b.name}</div>
              <div style={{ ...crd, marginBottom:28 }}>
                {admin && (
                  <div style={{ padding:"14px 20px", borderBottom:"1px solid var(--border)", display:"flex", flexDirection:"column", gap:10 }}>
                    {socials.map(s=>(
                      <div key={s.key}>
                        <label style={{ fontSize:11, color:"var(--dim)", display:"block", marginBottom:4 }}>{s.label}</label>
                        <input type="text" value={b[s.key]||""} onChange={e=>up(s.key,e.target.value)} placeholder={s.placeholder} style={{ width:"100%", padding:"10px 12px", borderRadius:8, border:"1px dashed var(--accent)", background:"rgba(196,30,42,0.07)", color:"#fff", fontSize:14, fontFamily:"'Outfit',sans-serif", boxSizing:"border-box" }} />
                      </div>
                    ))}
                    <div>
                      <label style={{ fontSize:11, color:"var(--dim)", display:"block", marginBottom:4 }}>WhatsApp (with country code)</label>
                      <input type="text" value={b.whatsapp||""} onChange={e=>up("whatsapp",e.target.value)} placeholder="13476179697" style={{ width:"100%", padding:"10px 12px", borderRadius:8, border:"1px dashed var(--accent)", background:"rgba(196,30,42,0.07)", color:"#fff", fontSize:14, fontFamily:"'Outfit',sans-serif", boxSizing:"border-box" }} />
                    </div>
                  </div>
                )}
                {socials.map((s,i)=>{
                  const val = b[s.key];
                  const url = bUrl(val, s.prefix);
                  const has = !!val;
                  return (
                    <div key={s.key}>
                      {i > 0 && <div style={cDiv}/>}
                      {has ? (
                        <a href={url} target="_blank" rel="noopener noreferrer" style={{ ...cRow, textDecoration:"none", color:"inherit", cursor:"pointer" }}>
                          <div style={iWrap(s.bg)}><span style={{ color:s.color }}>{s.icon}</span></div>
                          <div style={{ flex:1, minWidth:0 }}>
                            <div style={{ fontSize:15, fontWeight:600, color:"#fff" }}>{s.label}</div>
                            <div style={{ fontSize:12, color:"var(--dim)", marginTop:1 }}>@{val.replace(/^@/,"").replace(/^https?:\/\/(www\.)?[^/]+\/?/,"")}</div>
                          </div>
                          <span style={{ color:s.color }}>{Icons.externalLink}</span>
                        </a>
                      ) : (
                        <div style={{ ...cRow, opacity:.4 }}>
                          <div style={iWrap("rgba(255,255,255,.04)")}><span style={{ color:"var(--dim)" }}>{s.icon}</span></div>
                          <div style={{ flex:1 }}>
                            <div style={{ fontSize:15, fontWeight:500, color:"var(--dim)" }}>{s.label}</div>
                            <div style={{ fontSize:12, color:"var(--dim)", marginTop:1 }}>Not connected yet</div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>;
          })()}
          {admin && <button onClick={()=>{if(confirm(`Remove ${b.name}?`)){update("barbers",data.barbers.filter((_,x)=>x!==idx));onNav("barbers");}}} style={{ marginTop:12, background:"rgba(231,76,60,.08)", border:"1px solid rgba(231,76,60,.25)", borderRadius:10, padding:"10px", color:"#e74c3c", fontWeight:600, cursor:"pointer", width:"100%", fontSize:13 }}>🗑 Remove Barber</button>}
        </div>
      </div>
    </div>
  );
}

// ─── CONTACT PAGE ───
function ContactPage({ data, admin, update }) {
  const biz = data.business;
  const ub = (k,v)=>update("business",{...biz,[k]:v});
  const [form,setForm]=useState({name:"",msg:""});
  const [sent,setSent]=useState(false);

  const sectionLabel = { fontSize:11, fontWeight:700, color:"var(--dim)", letterSpacing:1.8, textTransform:"uppercase", marginBottom:14 };
  const card = { background:"var(--card)", borderRadius:16, border:"1px solid var(--border)", overflow:"hidden" };
  const cardRow = { display:"flex", alignItems:"center", gap:14, padding:"16px 20px", transition:"background .2s" };
  const cardDivider = { height:1, background:"var(--border)", margin:"0 20px" };
  const iconWrap = (bg) => ({ width:40, height:40, borderRadius:10, background:bg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 });

  const socialLinks = [
    { key:"instagram", label:"Instagram", icon:Icons.instagram, color:"#E1306C", bg:"rgba(225,48,108,.12)", prefix:"https://instagram.com/", placeholder:"username" },
    { key:"facebook", label:"Facebook", icon:Icons.facebook, color:"#1877F2", bg:"rgba(24,119,242,.12)", prefix:"https://facebook.com/", placeholder:"page name or URL" },
    { key:"tiktok", label:"TikTok", icon:Icons.tiktok, color:"#fff", bg:"rgba(255,255,255,.1)", prefix:"https://tiktok.com/@", placeholder:"username" },
  ];

  const buildUrl = (val, prefix) => {
    if (!val) return "";
    if (val.startsWith("http://") || val.startsWith("https://")) return val;
    return prefix + val.replace(/^@/, "");
  };

  const whatsappUrl = biz.whatsapp ? `https://wa.me/${biz.whatsapp.replace(/\D/g,"")}` : "";

  return (
    <div className="page-enter">
      <div className="section" style={{ maxWidth:600 }}>
        <h1 className="heading" style={{ fontSize:30, textAlign:"center", marginBottom:6 }}>Get in Touch</h1>
        <p style={{ textAlign:"center", color:"var(--dim)", fontSize:15, marginBottom:36 }}>Fastest way to book? Call or text. We pick up.</p>

        {/* ── Call & Text ── */}
        <div style={sectionLabel}>Call & Text</div>
        <div style={{ ...card, marginBottom:28 }}>
          <a href={`tel:${biz.phone1.replace(/\D/g,"")}`} style={{ ...cardRow, textDecoration:"none", color:"inherit", cursor:"pointer" }}>
            <div style={iconWrap("rgba(196,30,42,.12)")}><span style={{ color:"var(--accent)" }}>{Icons.phone}</span></div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:15, fontWeight:600, color:"#fff" }}>{biz.phone1}</div>
              <div style={{ fontSize:12, color:"var(--dim)", marginTop:1 }}>Primary line</div>
            </div>
            <span style={{ color:"var(--dim)" }}>{Icons.chevron}</span>
          </a>
          <div style={cardDivider}/>
          <a href={`tel:${biz.phone2.replace(/\D/g,"")}`} style={{ ...cardRow, textDecoration:"none", color:"inherit", cursor:"pointer" }}>
            <div style={iconWrap("rgba(196,30,42,.12)")}><span style={{ color:"var(--accent)" }}>{Icons.phone}</span></div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:15, fontWeight:600, color:"#fff" }}>{biz.phone2}</div>
              <div style={{ fontSize:12, color:"var(--dim)", marginTop:1 }}>Secondary line</div>
            </div>
            <span style={{ color:"var(--dim)" }}>{Icons.chevron}</span>
          </a>
          <div style={cardDivider}/>
          <a href={`sms:${biz.phone1.replace(/\D/g,"")}`} style={{ ...cardRow, textDecoration:"none", color:"inherit", cursor:"pointer" }}>
            <div style={iconWrap("rgba(255,255,255,.06)")}><span style={{ color:"var(--dim)" }}>{Icons.text}</span></div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:15, fontWeight:600, color:"#fff" }}>Text Us</div>
              <div style={{ fontSize:12, color:"var(--dim)", marginTop:1 }}>Send an SMS</div>
            </div>
            <span style={{ color:"var(--dim)" }}>{Icons.chevron}</span>
          </a>
        </div>

        {/* ── WhatsApp ── */}
        <div style={sectionLabel}>WhatsApp</div>
        <div style={{ ...card, marginBottom:28 }}>
          {admin && (
            <div style={{ padding:"14px 20px", borderBottom:"1px solid var(--border)" }}>
              <label style={{ fontSize:11, color:"var(--dim)", display:"block", marginBottom:6 }}>WhatsApp number (with country code, e.g. 13476179697)</label>
              <input type="text" value={biz.whatsapp||""} onChange={e=>ub("whatsapp",e.target.value)} placeholder="13476179697" style={{ width:"100%", padding:"10px 12px", borderRadius:8, border:"1px dashed var(--accent)", background:"rgba(196,30,42,0.07)", color:"#fff", fontSize:14, fontFamily:"'Outfit',sans-serif", boxSizing:"border-box" }} />
            </div>
          )}
          {biz.whatsapp ? (
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" style={{ ...cardRow, textDecoration:"none", color:"inherit", cursor:"pointer" }}>
              <div style={iconWrap("rgba(37,211,102,.12)")}><span style={{ color:"#25D366" }}>{Icons.whatsapp}</span></div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:15, fontWeight:600, color:"#fff" }}>Message on WhatsApp</div>
                <div style={{ fontSize:12, color:"var(--dim)", marginTop:1 }}>Tap to open chat</div>
              </div>
              <span style={{ color:"#25D366" }}>{Icons.externalLink}</span>
            </a>
          ) : (
            <div style={{ ...cardRow, opacity:.4 }}>
              <div style={iconWrap("rgba(255,255,255,.04)")}><span style={{ color:"var(--dim)" }}>{Icons.whatsapp}</span></div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:15, fontWeight:500, color:"var(--dim)" }}>WhatsApp</div>
                <div style={{ fontSize:12, color:"var(--dim)", marginTop:1 }}>Coming soon</div>
              </div>
            </div>
          )}
        </div>

        {/* ── Social Media ── */}
        <div style={sectionLabel}>Follow Us</div>
        <div style={{ ...card, marginBottom:28 }}>
          {admin && (
            <div style={{ padding:"14px 20px", borderBottom:"1px solid var(--border)", display:"flex", flexDirection:"column", gap:10 }}>
              {socialLinks.map(s=>(
                <div key={s.key}>
                  <label style={{ fontSize:11, color:"var(--dim)", display:"block", marginBottom:4 }}>{s.label} (username or full URL)</label>
                  <input type="text" value={biz[s.key]||""} onChange={e=>ub(s.key,e.target.value)} placeholder={s.placeholder} style={{ width:"100%", padding:"10px 12px", borderRadius:8, border:"1px dashed var(--accent)", background:"rgba(196,30,42,0.07)", color:"#fff", fontSize:14, fontFamily:"'Outfit',sans-serif", boxSizing:"border-box" }} />
                </div>
              ))}
            </div>
          )}
          {socialLinks.map((s,i)=>{
            const val = biz[s.key];
            const url = buildUrl(val, s.prefix);
            const hasLink = !!val;
            return (
              <div key={s.key}>
                {i > 0 && <div style={cardDivider}/>}
                {hasLink ? (
                  <a href={url} target="_blank" rel="noopener noreferrer" style={{ ...cardRow, textDecoration:"none", color:"inherit", cursor:"pointer" }}>
                    <div style={iconWrap(s.bg)}><span style={{ color:s.color }}>{s.icon}</span></div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:15, fontWeight:600, color:"#fff" }}>{s.label}</div>
                      <div style={{ fontSize:12, color:"var(--dim)", marginTop:1 }}>@{val.replace(/^@/,"").replace(/^https?:\/\/(www\.)?[^/]+\/?/,"")}</div>
                    </div>
                    <span style={{ color:s.color }}>{Icons.externalLink}</span>
                  </a>
                ) : (
                  <div style={{ ...cardRow, opacity:.4 }}>
                    <div style={iconWrap("rgba(255,255,255,.04)")}><span style={{ color:"var(--dim)" }}>{s.icon}</span></div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:15, fontWeight:500, color:"var(--dim)" }}>{s.label}</div>
                      <div style={{ fontSize:12, color:"var(--dim)", marginTop:1 }}>Not connected yet</div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Location & Hours ── */}
        <div style={sectionLabel}>Location & Hours</div>
        <div style={{ ...card, marginBottom:28 }}>
          <a href={biz.mapsUrl} target="_blank" rel="noopener noreferrer" style={{ ...cardRow, textDecoration:"none", color:"inherit", cursor:"pointer" }}>
            <div style={iconWrap("rgba(196,30,42,.12)")}><span style={{ color:"var(--accent)" }}>{Icons.map}</span></div>
            <div style={{ flex:1, minWidth:0 }}>
              <E value={biz.address} onChange={v=>ub("address",v)} admin={admin} style={{ fontSize:15, color:"#fff", fontWeight:500 }} />
              <div style={{ fontSize:12, color:"var(--accent)", fontWeight:600, marginTop:3 }}>Open in Maps</div>
            </div>
            <span style={{ color:"var(--dim)" }}>{Icons.chevron}</span>
          </a>
          <div style={cardDivider}/>
          <div style={{ padding:"14px 20px" }}>
            {biz.hours.map((h,i)=>(
              <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"7px 0" }}>
                <span style={{ fontSize:13, color:"var(--dim)" }}>{h.days}</span>
                <span style={{ fontSize:13, color:"var(--accent)", fontWeight:600 }}>{h.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Nails redirect ── */}
        <div style={{ ...card, borderColor:"var(--pink-border)", marginBottom:28 }}>
          <a href={data.nailsSalon.link || `tel:${data.nailsSalon.phone.replace(/\D/g,"")}`} target={data.nailsSalon.link ? "_blank" : undefined} rel={data.nailsSalon.link ? "noopener noreferrer" : undefined} style={{ ...cardRow, textDecoration:"none", color:"inherit", cursor:"pointer" }}>
            <div style={iconWrap("var(--pink-dim)")}><span style={{ color:"var(--pink)" }}>{Icons.nail}</span></div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:15, fontWeight:600, color:"var(--pink)" }}>{data.nailsSalon.name}</div>
              <div style={{ fontSize:12, color:"var(--dim)", marginTop:1 }}>Nail services in-house</div>
            </div>
            <span style={{ color:"var(--pink)" }}>{data.nailsSalon.link ? Icons.externalLink : Icons.chevron}</span>
          </a>
        </div>

        {/* ── Contact Form ── */}
        <div style={sectionLabel}>Leave a Message</div>
        <div style={{ ...card, padding:22 }}>
          <p style={{ fontSize:13, color:"var(--dim)", marginBottom:16 }}>Not urgent? Drop us a note.</p>
          {sent ? <div style={{ textAlign:"center", padding:20, color:"var(--accent)", fontWeight:600 }}>Sent! We'll be in touch.</div> : <>
            <input type="text" placeholder="Your name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} style={{ width:"100%", padding:"13px 14px", borderRadius:10, border:"1px solid var(--border)", background:"var(--surface)", color:"#fff", fontSize:14, marginBottom:9, fontFamily:"'Outfit',sans-serif", boxSizing:"border-box" }} />
            <textarea placeholder="What's up?" value={form.msg} onChange={e=>setForm({...form,msg:e.target.value})} style={{ width:"100%", padding:"13px 14px", borderRadius:10, border:"1px solid var(--border)", background:"var(--surface)", color:"#fff", fontSize:14, minHeight:90, fontFamily:"'Outfit',sans-serif", boxSizing:"border-box", resize:"vertical" }} />
            <button className="gold-btn" onClick={()=>setSent(true)} style={{ width:"100%", marginTop:10 }}>Send</button>
          </>}
        </div>
      </div>
    </div>
  );
}

// ─── FOOTER ───
function Footer({ biz }) {
  const footerSocials = [
    { key:"instagram", icon:Icons.instagram, color:"#E1306C", prefix:"https://instagram.com/" },
    { key:"facebook", icon:Icons.facebook, color:"#1877F2", prefix:"https://facebook.com/" },
    { key:"tiktok", icon:Icons.tiktok, color:"#fff", prefix:"https://tiktok.com/@" },
    { key:"whatsapp", icon:Icons.whatsapp, color:"#25D366", prefix:"https://wa.me/" },
  ];
  const buildUrl = (val, prefix, key) => {
    if (!val) return "";
    if (key === "whatsapp") return prefix + val.replace(/\D/g,"");
    if (val.startsWith("http://") || val.startsWith("https://")) return val;
    return prefix + val.replace(/^@/, "");
  };
  const activeSocials = footerSocials.filter(s => !!biz[s.key]);
  return (
    <footer style={{ borderTop:"1px solid var(--border)", padding:"32px 20px", textAlign:"center" }}>
      <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:18, fontWeight:700, color:"var(--accent)", letterSpacing:1 }}>MAJESTIC</span>
      <p style={{ color:"var(--dim)", fontSize:12, marginTop:8 }}>{biz.address}</p>
      <p style={{ color:"var(--dim)", fontSize:12, marginTop:3 }}>{biz.phone1} · {biz.phone2}</p>
      {activeSocials.length > 0 && (
        <div style={{ display:"flex", justifyContent:"center", gap:16, marginTop:14 }}>
          {activeSocials.map(s=>(
            <a key={s.key} href={buildUrl(biz[s.key], s.prefix, s.key)} target="_blank" rel="noopener noreferrer" style={{ width:36, height:36, borderRadius:10, background:"rgba(255,255,255,.06)", display:"flex", alignItems:"center", justifyContent:"center", color:s.color, transition:"background .2s", textDecoration:"none" }}
              onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,.12)"}
              onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,.06)"}
            >{s.icon}</a>
          ))}
        </div>
      )}
      <p style={{ color:"#333", fontSize:11, marginTop:16 }}>Built by Flow Productions</p>
    </footer>
  );
}

// ─── MAIN APP ───
export default function App() {
  const [data, setData] = useState(loadData);
  const [admin, setAdmin] = useState(false);
  const [page, setPage] = useState("home");
  const [barberId, setBarberId] = useState(null);

  useEffect(() => { saveData(data); }, [data]);

  const update = useCallback((key, value) => setData(prev => ({ ...prev, [key]: value })), []);
  const nav = useCallback((p, bid) => { setPage(p); if (bid) setBarberId(bid); window.scrollTo({ top:0, behavior:"smooth" }); }, []);

  const barber = data.barbers.find(b=>b.id===barberId);
  const barberIdx = data.barbers.findIndex(b=>b.id===barberId);

  const toggleAdmin = () => {
    if (!admin) { const c=prompt("Enter admin code:"); if(c==="majestic2025") setAdmin(true); else if(c!==null) alert("Wrong code."); }
    else setAdmin(false);
  };

  const exportData = () => { const b=new Blob([JSON.stringify(data,null,2)],{type:"application/json"}); const u=URL.createObjectURL(b); const a=document.createElement("a"); a.href=u; a.download="majestic-data.json"; a.click(); URL.revokeObjectURL(u); };
  const importData = () => { const inp=document.createElement("input"); inp.type="file"; inp.accept=".json"; inp.onchange=e=>{ const f=e.target.files[0]; if(!f)return; const r=new FileReader(); r.onload=ev=>{try{setData({...DEFAULT_DATA,...JSON.parse(ev.target.result)});alert("Imported!");}catch{alert("Invalid file.");}}; r.readAsText(f); }; inp.click(); };

  return (
    <>
      <style>{CSS}</style>
      {admin && <div className="admin-bar">✏️ EDIT MODE — All changes save automatically</div>}
      <Nav admin={admin} currentPage={page} onNav={nav} biz={data.business} />

      <main style={{ paddingBottom: admin ? 20 : 80, minHeight:"80vh" }}>
        {page==="home" && <HomePage data={data} admin={admin} update={update} onNav={nav} />}
        {page==="barbers" && <BarbersPage data={data} admin={admin} update={update} onNav={nav} />}
        {page==="barber-profile" && <BarberProfile barber={barber} idx={barberIdx} data={data} admin={admin} update={update} onNav={nav} />}
        {page==="services" && <ServicesPage data={data} admin={admin} update={update} onNav={nav} />}
        {page==="gallery" && <GalleryPage data={data} admin={admin} update={update} />}
        {page==="contact" && <ContactPage data={data} admin={admin} update={update} />}
      </main>

      <Footer biz={data.business} />

      {!admin && page!=="barber-profile" && (
        <div className="sticky-cta">
          <button className="gold-btn" onClick={()=>nav("barbers")} style={{ flex:1, fontSize:14, padding:"13px 14px" }}>Book Now</button>
          <a href={`tel:${data.business.phone1.replace(/\D/g,"")}`} className="outline-btn" style={{ flex:1, fontSize:14, padding:"13px 14px", textDecoration:"none" }}>{Icons.phone} Call</a>
        </div>
      )}

      {/* Admin tools */}
      {admin && (
        <div style={{ position:"fixed", bottom:20, left:16, zIndex:1000, display:"flex", flexDirection:"column", gap:6 }}>
          <button onClick={exportData} style={{ background:"var(--card)", color:"var(--accent)", border:"1px solid rgba(196,30,42,.3)", borderRadius:8, padding:"7px 13px", fontSize:11, fontWeight:600, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>💾 Export</button>
          <button onClick={importData} style={{ background:"var(--card)", color:"var(--dim)", border:"1px solid var(--border)", borderRadius:8, padding:"7px 13px", fontSize:11, fontWeight:600, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>📂 Import</button>
          <button onClick={()=>{if(confirm("Reset everything?")){setData(DEFAULT_DATA);localStorage.removeItem("majestic-v2");}}} style={{ background:"rgba(231,76,60,.08)", color:"#e74c3c", border:"1px solid rgba(231,76,60,.2)", borderRadius:8, padding:"7px 13px", fontSize:11, fontWeight:600, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>🔄 Reset</button>
        </div>
      )}

      <button className={`admin-fab ${admin?"on":""}`} onClick={toggleAdmin}>
        {admin ? "🔒 Exit Edit Mode" : "✏️ Admin"}
      </button>
    </>
  );
}
