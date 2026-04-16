import type { GanttEvent } from '@/lib/gantt';

// ── Time helper ───────────────────────────────────────────────────────
function t(start: string, end: string) {
    const [sh, sm] = start.split(':').map(Number);
    const [eh, em] = end.split(':').map(Number);
    return { sh, sm, eh, em };
}

// ── Day 2 — Saturday 18 April 2026 ───────────────────────────────────
// ICS times UTC; Brisbane = UTC+10.
// Full Saturday ICS coverage map (⭐ = important, 🔸 = pass):
//   10:00  ⭐ Fursuit Walk (10–12)               → Both shooters
//   12:00  Artists Alley Open (12–6:20 PM)        → Neon pass
//   13:00  ⭐ FurDU Pub Trivia (1–3 PM)           → Both (Jarrod 1:15, Neon 1:30)
//   13:00  Stuck in the Middle (1–2, Panel Room)  → blocked by Pub Trivia
//   14:00  Getting Into Fighting Games (2–3)       → Jarrod pass
//   14:00  Dealers Den Open (2–6 PM)              → passes
//   14:30  Aquaduck (2:30–4:30, Prepaid, Special) → Neon outdoor pass
//   14:30  Furry Studies: brief history (2:30–3:30)→ Neon pass
//   15:00  Transformation Furs M&G (3–4 PM)       → Jarrod pass
//   16:00  ⭐ From Garment to Fursuit (4–5 PM)    → Both primary (Main Stage)
//   16:00  Open DJ Workshop (4–6, Panel Room)      → blocked by Garment panel
//   16:30  Vore Meet (4:30–5:30, Panel Room 2)    → pass
//   17:30  ⭐ FurDU Talent Show (5:30–7 PM)       → Both primary (Main Stage)
//   18:00  Super Sponsor Dinner (6–8, Special)    → pass
//   18:30  Furmily Feud (6:30–7:30, Panel Room)   → Jarrod pass
//   18:30  Rubberfurs (6:30–7:30, Panel Room 2)   → Neon pass + photoshoot
//   20:00  ⭐ DJ Sets (8 PM–midnight):
//     Vargr      Melodic Techno & Progressive House  8–9 PM
//     Peachy     Ragga Jungle / Drum and Bass         9–10 PM
//     Xiinox     Bass House/EDM                       10–11 PM
//     CoryKuma   Trance                               11 PM–midnight
//   20:00  Karaoke (8–11, Special), Guitar Hero Comp (8–10, Games Room),
//          Panel Panel Reborn (8–9:30, Panel Room 2), Sticker Trades (8–9:30)
//          → all parallel; both shooters committed to Main Stage DJ Sets.
//
// DJ alternation: Neon photo first 30 min, Jarrod photo+video second 30 min.
// Offload stagger at 9 PM (Peachy): Jarrod offloads 9:15, Neon offloads 9:30.
// ─────────────────────────────────────────────────────────────────────

export const eventsDay2: GanttEvent[] = [

    // ══════════════════════════════════════════════════════════════════
    // NEON  (primary photo)
    // ══════════════════════════════════════════════════════════════════

    {
        id: 'sat-n-00', name: "Morning Briefing",
        ...t('9:00', '9:20'), col: 'neon', type: 'break', location: "Base",
        notes: "Team briefing, card checks, gear check. Day 2 priorities: Fursuit Walk, Talent Show, DJ Sets. Confirm wristbands for night coverage.",
        quota: [{ label: 'Output', value: 'Briefing notes' }]
    },

    {
        id: 'sat-n-pw', name: "Pre-Walk Candids",
        ...t('9:20', '10:00'), col: 'neon', type: 'neon', location: "Lobby / Assembly Area",
        notes: "Assembly candids before the walk begins. R6 II: Tv 1/640s, ISO 800–3200, f/4, Servo AF+Tracking, 12fps burst. Sigma 18-35mm at 18mm for crowd context, 35mm for individual reactions. Look for: first costumed arrivals in full suit, handler–fursuiter pairs prepping, mounting excitement in the assembly queue, large group formation moments.",
        quota: [{ label: 'Min. Photos', value: '45–60' }, { label: 'Recommended Gear', value: 'Sigma 18-35mm f/1.8' }]
    },

    {
        id: 'sat-n-01', name: "⭐ Fursuit Walk",
        ...t('10:00', '12:00'), col: 'neon', type: 'primary', location: "All Rooms / Beach",
        notes: "HIGHEST PRIORITY Day 2 — primary stills, Jarrod on handheld video. R6 II: Tv 1/640s, ISO 400–800 outdoors (raise to ISO 1600–3200 for indoor corridors), f/5.6, Servo AF+Tracking, 12fps burst, IBIS on. Sigma 85mm for parade-line portrait isolation; Sigma 18-35mm for wide crowd and beach establishing. Look for: parade column leading-line from street level, individual suit details mid-march (LED, fabric texture, eyes), bystander reactions framed outside the procession, beach group formation from elevated position, eye-level approach to fursuiter face height.",
        quota: [{ label: 'Min. Photos', value: '200–270' }, { label: 'Note', value: 'Primary stills — Jarrod on handheld video' }, { label: 'Shots', value: 'Assembly, march, group photo, candids' }, { label: 'Recommended Gear', value: 'Sigma 85mm f/1.4 + Sigma 18-35mm f/1.8' }]
    },

    {
        id: 'sat-n-ln', name: "Break (lunch)",
        ...t('12:00', '12:45'), col: 'neon', type: 'break', location: "—",
        notes: "Lunch after the walk. Battery swap. Offload 1 immediately after at 12:45 — Neon goes first.",
        quota: [{ label: 'Output', value: 'Rest + battery swap' }]
    },

    {
        id: 'sat-n-ol1', name: "Offload 1",
        ...t('12:45', '13:00'), col: 'neon', type: 'offload', location: "ConOps",
        notes: "HIGH PRIORITY — 3 hrs of fursuit walk + morning footage. Transfer all files from NEON-A card to Nextcloud server, swap to NEON-B.",
        quota: [{ label: 'Priority', value: 'High' }, { label: 'Action', value: 'Transfer NEON-A → Nextcloud, swap to NEON-B' }]
    },

    {
        id: 'sat-n-aa', name: "Artists Alley pass",
        ...t('13:00', '13:05'), col: 'neon', type: 'neon', location: "Artist's Alley",
        notes: "Repeat pass — covered Day 1. R6 II: Av f/2.8, ISO 1600. One or two strong variety frames (different artist, different medium from Day 1) and move on to Pub Trivia setup.",
        quota: [{ label: 'Min. Photos', value: '10–15' }, { label: 'Duration', value: '5 min pass (repeat)' }]
    },

    {
        id: 'sat-n-02', name: "⭐ Pub Trivia (photo)",
        ...t('13:30', '14:30'), col: 'neon', type: 'primary', location: "Main Stage",
        notes: "Main Stage community event — high audience participation. R6 II: Av f/4, ISO 3200–6400, no flash (stage ambient), Servo AF+Face tracking. Canon 70-300mm for host-at-podium pulls and team-table reactions; Sigma 85mm for wide-angle cross-stage candids. Look for: host energy mid-round delivery, team answering expressions (delight, concentration, confusion), wrong-answer groans, winning-team celebration burst. Jarrod in position from 1:15 PM. NOTE: Stuck in the Middle (Panel Room 1–2 PM) blocked — unavoidable.",
        quota: [{ label: 'Min. Photos', value: '120–150' }, { label: 'Recommended Gear', value: 'Canon 70-300mm + Sigma 85mm f/1.4' }, { label: 'Note', value: 'Jarrod joins at 1:15 PM' }]
    },

    {
        id: 'sat-n-dd', name: "Dealers Den pass",
        ...t('14:30', '14:35'), col: 'neon', type: 'neon', location: "Dealer's Den",
        notes: "Repeat pass — covered Day 1. R6 II: Av f/2.8, ISO 1600. One updated variety frame (different stall or interaction from Day 1) and move to Aquaduck.",
        quota: [{ label: 'Min. Photos', value: '10–15' }, { label: 'Duration', value: '5 min pass (repeat)' }]
    },

    {
        id: 'sat-n-aq', name: "Aquaduck / outdoor pass",
        ...t('15:00', '15:30'), col: 'neon', type: 'neon', location: "Special",
        notes: "Outdoor natural-light opportunity — rare chance for fursuits in open air. R6 II: Tv 1/1000s, ISO 400–800, f/5.6–8, Servo AF+Tracking. No flash. Sigma 18-35mm at 18mm for wide waterfront crowd; swap to Sigma 85mm for boarding reaction close-ups. Look for: costumed attendees reacting to the duck tour, bright outdoor suit colours with genuine waterfront background, group boarding energy, candid expressions framed against sky.",
        quota: [{ label: 'Min. Photos', value: '30–45' }, { label: 'Note', value: 'Prepaid event — capture reactions' }, { label: 'Recommended Gear', value: 'Sigma 18-35mm f/1.8' }]
    },

    {
        id: 'sat-n-fs', name: "Furry Studies pass",
        ...t('15:30', '15:45'), col: 'neon', type: 'neon', location: "Panel Room",
        notes: "15-min pass. R6 II: Av f/2.8, ISO 1600–3200, no flash. Canon 70-300mm from audience for presenter pulls. Look for: presenter engaged mid-point, audience listening candids, projected slide visible alongside speaker.",
        quota: [{ label: 'Min. Photos', value: '15–24' }, { label: 'Duration', value: '15 min pass' }]
    },

    {
        id: 'sat-n-bk', name: "Break (pre-panel)",
        ...t('15:45', '16:00'), col: 'neon', type: 'break', location: "—",
        notes: "Short break before From Garment to Fursuit on Main Stage. Transit + gear check.",
        quota: [{ label: 'Output', value: 'Transit + gear check' }]
    },

    {
        id: 'sat-n-03', name: "⭐ From Garment to Fursuit",
        ...t('16:00', '17:00'), col: 'neon', type: 'primary', location: "Main Stage",
        notes: "Sole stills. R6 II: Av f/4, ISO 3200–6400, no flash, IBIS active. Canon 70-300mm for on-stage demonstration detail pulls; swap to Sigma 18-35mm for wide audience reaction shots. Look for: construction prop/costume close-up when held up to audience (burst on the visual reveal), skill-demonstration hand detail, sponsor stages of a finished piece, audience awe expressions. Reframe between demo segments only — don't shift position during active demonstration.",
        quota: [{ label: 'Min. Photos', value: '120–160' }, { label: 'Note', value: 'Sole stills photographer — Jarrod on tripod full video' }, { label: 'Shots', value: 'Speaker, demonstrations, audience reactions' }, { label: 'Recommended Gear', value: 'Canon 70-300mm + Godox V1 Pro' }]
    },

    {
        id: 'sat-n-ol2', name: "Offload 2",
        ...t('17:00', '17:15'), col: 'neon', type: 'offload', location: "ConOps",
        notes: "Immediately after From Garment to Fursuit ends at 5 PM. HIGH PRIORITY — transfer afternoon footage from NEON-B to Nextcloud server before Talent Show.",
        quota: [{ label: 'Priority', value: 'High' }, { label: 'Action', value: 'Transfer NEON-B → Nextcloud, swap to NEON-C' }]
    },

    {
        id: 'sat-n-bk2', name: "Break (pre-Talent Show)",
        ...t('17:15', '17:30'), col: 'neon', type: 'break', location: "—",
        notes: "15-min transit + position for Talent Show. Confirm front-of-stage position with Jarrod. Flash ready.",
        quota: [{ label: 'Output', value: 'Transit + position check' }]
    },

    {
        id: 'sat-n-04', name: "⭐ FurDU Talent Show",
        ...t('17:30', '19:00'), col: 'neon', type: 'primary', location: "Main Stage",
        notes: "KEY EVENT — primary stills, Jarrod on tripod video. R6 II: Tv 1/640s (lift to 1/1000s for high-speed acts), ISO 3200–6400, f/4–5.6, Servo AF+Tracking, 12fps burst. Godox V1 Pro TTL if stage permits fill. Look for: peak mid-performance moment (apex of trick, highest energy pose), performer expressions at climax, crowd reaction to big acts (wide swap to 18-35mm), MC/host energy between acts, winner reveal sequence (burst through announcement to celebration). Vary positions — stage-front centre, stage-left side angle, audience-rear for crowd-framed establishing.",
        quota: [{ label: 'Min. Photos', value: '150–210' }, { label: 'Note', value: 'Primary stills — Jarrod on tripod full video' }, { label: 'Shots', value: 'Performers, crowd, host, winner reveals' }, { label: 'Recommended Gear', value: 'Canon 70-300mm + Sigma 85mm f/1.4 + Godox V1 Pro' }]
    },

    {
        id: 'sat-n-ol3', name: "Offload 3",
        ...t('19:00', '19:15'), col: 'neon', type: 'offload', location: "ConOps",
        notes: "Immediately after Talent Show ends at 7 PM. HIGH PRIORITY — transfer talent show footage from NEON-C to Nextcloud server.",
        quota: [{ label: 'Priority', value: 'High' }, { label: 'Action', value: 'Transfer NEON-C → Nextcloud, swap to NEON-D' }]
    },

    {
        id: 'sat-n-rb', name: "Rubberfurs photoshoot (pass)",
        ...t('19:15', '19:30'), col: 'neon', type: 'neon', location: "Panel Room 2",
        notes: "15-min end-of-event pass after offload 3. Consent with organiser before raising camera. R6 II: M mode 1/200s (flash sync), ISO 400–800, f/5.6. Godox V1 Pro TTL with diffuser for posed group; Aputure MC constant fill for individual portrait close-ups. Look for: full group posed (ensure everyone visible), individual costume material texture close-ups, candid group interaction that shows community energy.",
        quota: [{ label: 'Min. Photos', value: '15–24' }, { label: 'Duration', value: '15 min pass' }, { label: 'Recommended Gear', value: 'Sigma 85mm f/1.4 + Godox V1 Pro + Aputure MC' }, { label: 'Note', value: 'Consent required before shooting' }]
    },

    {
        id: 'sat-n-bk3', name: "Dinner + transit to DJs",
        ...t('19:30', '20:00'), col: 'neon', type: 'break', location: "—",
        notes: "30-min dinner and transit window before DJ sets. Grab food, then head to Main Stage DJ venue. Gear swap to low-light DJ setup — flash off, available light only.",
        quota: [{ label: 'Output', value: 'Dinner + transit + low-light gear setup' }]
    },

    // ── DJ Sets — BOTH all night, alternating photo/video each 30-min slot ──
    // Pattern: N=photo J=video → swap → repeat. Type colour = role (neon=photo).
    // Vargr 8–9 PM (Melodic Techno & Progressive House)
    {
        id: 'sat-n-dj1', name: "Vargr — photo",
        ...t('20:00', '20:30'), col: 'neon', type: 'neon', location: "Main Stage",
        notes: "Melodic Techno & Progressive House opening set. R6 II: Av f/1.4, ISO 3200–6400, 1/200s min, silent shutter. No flash. Sigma 85mm from floor level. Look for: DJ focused at mixer (side-lit face), early crowd cohesion forming on the floor, stage lighting patterns printed on faces, booth illumination. Coordinate with Jarrod — split booth-side and floor-side positions.",
        quota: [{ label: 'Min. Photos', value: '30–45' }, { label: 'Recommended Gear', value: 'Sigma 85mm f/1.4' }]
    },

    {
        id: 'sat-n-ppb', name: "Panel Panel Reborn (pass)",
        ...t('20:30', '20:45'), col: 'neon', type: 'neon', location: "Panel Room 2",
        notes: "15-min mid-panel pass. R6 II: Av f/2.8, ISO 3200, no flash. Two or three strong frames — panellist at speaking, engaged audience — then return to Main Stage.",
        quota: [{ label: 'Min. Photos', value: '15–24' }, { label: 'Duration', value: '15 min pass' }]
    },

    {
        id: 'sat-n-st', name: "Sticker Trades (pass)",
        ...t('20:45', '21:00'), col: 'neon', type: 'neon', location: "Trading Area",
        notes: "15-min pass. R6 II: Av f/2.8, ISO 3200, 1/160s. Look for: hands-in-exchange trade moment (burst on the handover), proud collection display flat-lay, enthusiastic reaction over a rare find. Nimble and observational — no flash.",
        quota: [{ label: 'Min. Photos', value: '15–24' }, { label: 'Duration', value: '15 min pass' }]
    },

    // Offload at 9 PM Peachy transition — Jarrod first at 9:15, Neon second at 9:30
    {
        id: 'sat-n-dj3', name: "Peachy — solo photo",
        ...t('21:00', '21:30'), col: 'neon', type: 'neon', location: "Main Stage",
        notes: "Ragga Jungle/D&B solo window — Jarrod offloading 9:15–9:30. R6 II: Av f/1.4, ISO 3200–6400, 1/160s min. Solo this slot — cover DJ and crowd floor both. Look for: D&B crowd floor energy (low-angle wide), DJ hands on deck during drops, crowd building to the break.",
        quota: [{ label: 'Min. Photos', value: '15–24' }, { label: 'Note', value: 'Solo — Jarrod offloading 9:15–9:30' }]
    },

    {
        id: 'sat-n-ol4', name: "Offload 4",
        ...t('21:30', '21:45'), col: 'neon', type: 'offload', location: "ConOps",
        notes: "9:30 PM. Neon offloads after Jarrod returns from Offload 4. Transfer NEON-D to Nextcloud server while Jarrod holds solo coverage.",
        quota: [{ label: 'Action', value: 'Transfer NEON-D → Nextcloud, swap to NEON-E' }]
    },

    {
        id: 'sat-n-ghc', name: "Guitar Hero Comp — finals pass",
        ...t('21:45', '22:00'), col: 'neon', type: 'neon', location: "Games Room",
        notes: "15-min finals pass after offload 4. R6 II: Av f/2.8, ISO 3200, 1/200s. Look for: finalist face lit by screen glow during a critical sequence, crowd gathered around the final competitor, on-screen score framed with player in background.",
        quota: [{ label: 'Min. Photos', value: '15–24' }, { label: 'Duration', value: '15 min pass' }]
    },

    // Xiinox 10–11 PM (Bass House/EDM)
    {
        id: 'sat-n-dj5', name: "Xiinox — photo",
        ...t('22:00', '22:30'), col: 'neon', type: 'neon', location: "Main Stage",
        notes: "Bass House/EDM late-night peak. R6 II: Av f/1.4, ISO 6400–12800, 1/200s min, silent shutter. Look for: bass-drop crowd reaction (hands, faces, movement blur on non-subjects), DJ pump-up gestures toward crowd, coloured LED truss patterns painting the floor.",
        quota: [{ label: 'Min. Photos', value: '30–45' }, { label: 'Recommended Gear', value: 'Sigma 85mm f/1.4' }]
    },

    {
        id: 'sat-n-kar', name: "Karaoke (pass)",
        ...t('22:30', '22:45'), col: 'neon', type: 'neon', location: "Special",
        notes: "15-min pass between DJ sets. R6 II: Av f/1.8, ISO 3200–6400. Look for: performer mid-song expression at climax, crowd sing-along wide shot, stage lighting atmosphere. One strong portrait, one wide crowd frame — then back to Main Stage for CoryKuma.",
        quota: [{ label: 'Min. Photos', value: '15–24' }, { label: 'Duration', value: '15 min pass' }]
    },

    // CoryKuma 11 PM – midnight (Trance)
    {
        id: 'sat-n-dj7', name: "CoryKuma — photo",
        ...t('23:00', '23:30'), col: 'neon', type: 'neon', location: "Main Stage",
        notes: "Closing Trance set. R6 II: Av f/1.4, ISO 6400–12800, 1/160s min. Look for: dreamlike Trance crowd portraits with slow-moving aerial lighting, DJ closing with visible energy, late-night persisting crowd proving Saturday stamina. Strong late-night wide before wrap.",
        quota: [{ label: 'Min. Photos', value: '30–45' }, { label: 'Recommended Gear', value: 'Sigma 85mm f/1.4' }]
    },

    {
        id: 'sat-n-ol5', name: "Final Offload — wrap",
        ...t('23:30', '23:50'), col: 'neon', type: 'offload', location: "ConOps",
        notes: "~11:30 PM. After CoryKuma photo block. Transfer all remaining NEON cards to Nextcloud server. Neon wraps for the night — Jarrod continues closing video solo.",
        quota: [{ label: 'Action', value: 'Transfer all NEON cards → Nextcloud' }, { label: 'Note', value: 'Neon wrap for the night' }]
    },


    // ══════════════════════════════════════════════════════════════════
    // JARROD  (photo + video)
    // ══════════════════════════════════════════════════════════════════

    {
        id: 'sat-j-00', name: "Morning Briefing",
        ...t('9:00', '9:20'), col: 'jarrod', type: 'break', location: "Base",
        notes: "Team briefing. Day 2 priorities: Fursuit Walk, Talent Show, DJ Sets. A7S III + Tamron 28-75mm f/2.8 primary. Confirm RØDE audio rig for Talent Show and panel.",
        quota: [{ label: 'Output', value: 'Briefing notes' }]
    },

    {
        id: 'sat-j-pw', name: "Pre-Walk atmosphere",
        ...t('9:20', '10:00'), col: 'jarrod', type: 'neon', location: "Lobby / Assembly Area",
        notes: "B-roll of fursuit walk assembly. A7S III: S-Cinetone, 4K25fps, ISO 1600, f/2.8, IBIS on. Tamron 28mm for wide corridor sweeps, 75mm for costume face-pull candids. Look for: crowd energy building, costumed arrivals drawing attention, handler–fursuiter prep moments, queue perspective shot from above the assembled group.",
        quota: [{ label: 'Min. Photos', value: '30–45' }, { label: 'Min. Video', value: '~6 min assembly B-roll' }, { label: 'Recommended Gear', value: 'Tamron 28-75mm f/2.8' }]
    },

    {
        id: 'sat-j-01', name: "⭐ Fursuit Walk",
        ...t('10:00', '12:00'), col: 'jarrod', type: 'primary', location: "All Rooms / Beach",
        notes: "HIGHEST PRIORITY Day 2 — handheld full walk video, no stills. A7S III handheld, SteadyShot Active: S-Log3, 4K25fps, ISO 400 outdoors (add ND if highlights clip on beach), Tamron 28mm wide. Look for: parade leading-line tracking from street level alongside the procession, wide beach establishing with full group visible, individual fursuit tracking as they pass camera, bystander reaction framed outside the parade. Record continuously — do not stop during the march.",
        quota: [{ label: 'Min. Video', value: 'Full walk record + beach highlights reel' }, { label: 'Note', value: 'Video only — Neon handles all stills' }, { label: 'Recommended Gear', value: 'A7S III + Tamron 28-75mm f/2.8 @ 28mm handheld (SteadyShot Active) + ND filter (beach/outdoor)' }]
    },

    {
        id: 'sat-j-ln', name: "Break (lunch)",
        ...t('12:00', '12:45'), col: 'jarrod', type: 'break', location: "—",
        notes: "Lunch. Battery swap. Jarrod's Offload 1 staggered to 1:00 PM (15 min after Neon).",
        quota: [{ label: 'Output', value: 'Rest + battery swap' }]
    },

    {
        id: 'sat-j-ol1', name: "Offload 1",
        ...t('13:00', '13:15'), col: 'jarrod', type: 'offload', location: "ConOps",
        notes: "~1:00 PM. Staggered 15 min after Neon offload 1. Transfer JAR-A files to Nextcloud server. Neon covers Artists Alley in the meantime.",
        quota: [{ label: 'Priority', value: 'High' }, { label: 'Action', value: 'Transfer JAR-A → Nextcloud, swap to JAR-B' }]
    },

    {
        id: 'sat-j-02', name: "⭐ Pub Trivia (photo + video)",
        ...t('13:15', '14:30'), col: 'jarrod', type: 'primary', location: "Main Stage",
        notes: "Hybrid coverage. A7S III: S-Cinetone, 4K25fps, ISO 1600–3200, f/2.8, SteadyShot Active. Tamron 28mm for wide A-roll; Sony 70-200mm GM for host portrait stills between video segments. RØDE VideoMic ProPlus: -20dB pad in loud crowd, high-pass on — check levels before host starts. Look for: host energy mid-round delivery, team answering reactions (wide crowd reveals audience energy), wrong-answer group groan, winning-round celebration sequence stand up. 3-min highlights reel target. Neon joins from 1:30 PM. NOTE: Stuck in the Middle blocked — unavoidable.",
        quota: [{ label: 'Min. Photos', value: '60–90' }, { label: 'Min. Video', value: '~6 min highlights reel' }, { label: 'Audio', value: 'RØDE VideoMic ProPlus' }, { label: 'Recommended Gear', value: 'A7S III + Sony 70-200mm GM' }]
    },

    {
        id: 'sat-j-gf', name: "Getting Into Fighting Games (pass)",
        ...t('14:30', '14:45'), col: 'jarrod', type: 'neon', location: "Games Room",
        notes: "15-min pass after Pub Trivia. A7S III: S-Cinetone, ISO 1600, f/2.8, 4K25fps, Tamron 28-75mm. Look for: player intensity close-up with screen reflected in eyes, controller + game display framed together, spectators leaning in over a competitor's shoulder. 90–180 sec B-roll + select stills.",
        quota: [{ label: 'Min. Photos', value: '30–45' }, { label: 'Min. Video', value: '90–180 sec atmosphere clip' }, { label: 'Duration', value: '15 min pass' }]
    },

    {
        id: 'sat-j-tf', name: "Transformation Furs M&G (pass)",
        ...t('15:00', '15:15'), col: 'jarrod', type: 'neon', location: "Panel Room 2",
        notes: "15-min pass. Confirm consent with host before shooting. A7S III: S-Cinetone, ISO 1600, f/2.8, Tamron 28-75mm. Look for: full group posed at 28mm, subgroup candid interaction, themed costume detail close-ups. 90–180 sec atmosphere clip + 30–45 stills.",
        quota: [{ label: 'Min. Photos', value: '30–45' }, { label: 'Min. Video', value: '90–180 sec atmosphere clip' }, { label: 'Note', value: 'Consent required before shooting' }]
    },

    {
        id: 'sat-j-dd', name: "Dealers Den pass",
        ...t('15:30', '15:35'), col: 'jarrod', type: 'neon', location: "Dealer's Den",
        notes: "Repeat pass — covered Day 1. A7S III: ISO 800, Tamron 28mm wide. Single aisle B-roll walk (~60 sec) + one stall still. Move on.",
        quota: [{ label: 'Min. Photos', value: '8–12' }, { label: 'Min. Video', value: '~60 sec B-roll' }, { label: 'Duration', value: '5 min pass (repeat)' }]
    },

    {
        id: 'sat-j-03', name: "⭐ From Garment to Fursuit",
        ...t('16:00', '17:00'), col: 'jarrod', type: 'primary', location: "Main Stage",
        notes: "Full panel video — tripod with dynamic framing to follow the presenter, no stills. A7S III: S-Log3, 4K25fps, ISO 800, Tamron ~35mm for stage-width framing. NEEWER 74\" tripod with smooth pan/tilt capability. RØDE VideoMic ProPlus: check levels pre-event (–12dB peaks), high-pass on for indoor reverb. Shinobi II peaking for speaker focus confirmation. Record continuously through all demo segments and audience questions — do not cut. Look for: track Astris smoothly as they move on stage, frame each construction prop/demo piece when displayed to audience, pan/tilt to re-frame as presenter moves. Maintain fluid motion.",
        quota: [{ label: 'Min. Video', value: 'Full panel record' }, { label: 'Note', value: 'Video only — dynamic tripod following presenter. Neon is sole stills.' }, { label: 'Audio', value: 'RØDE VideoMic ProPlus' }, { label: 'Recommended Gear', value: 'A7S III + NEEWER 74" Pro Video Tripod + Tamron 28-75mm f/2.8 + Atomos Shinobi II' }]
    },

    {
        id: 'sat-j-ol2', name: "Offload 2",
        ...t('17:15', '17:30'), col: 'jarrod', type: 'offload', location: "ConOps",
        notes: "~5:15 PM. Staggered 15 min after Neon offload 2. Transfer JAR-B footage to Nextcloud server before Talent Show.",
        quota: [{ label: 'Priority', value: 'High' }, { label: 'Action', value: 'Transfer JAR-B → Nextcloud, swap to JAR-C' }]
    },

    {
        id: 'sat-j-04', name: "⭐ FurDU Talent Show",
        ...t('17:30', '19:00'), col: 'jarrod', type: 'primary', location: "Main Stage",
        notes: "KEY EVENT — full event video on tripod with dynamic framing to follow performers, no stills. A7S III: S-Log3, 4K25fps, ISO 1600, NEEWER 74\" tripod with smooth pan/tilt capability. SteadyShot OFF. RØDE VideoMic ProPlus: set -20dB for live stage performance, check pre-show audio levels. Shinobi II for framing confirmation. Record every performance continuously — do not stop between acts. Look for: track each performer smoothly, keep fully in-frame with headroom; pan/tilt to follow MC between acts; monitor audio peaks on Shinobi during loud musical numbers. Use fluid tripod movement to follow stage action.",
        quota: [{ label: 'Min. Video', value: 'Full event record' }, { label: 'Note', value: 'Video only — dynamic tripod following performers. Neon handles all stills.' }, { label: 'Audio', value: 'RØDE VideoMic ProPlus' }, { label: 'Recommended Gear', value: 'A7S III + NEEWER 74" Pro Video Tripod + Atomos Shinobi II' }]
    },

    {
        id: 'sat-j-dinner', name: "Dinner break",
        ...t('19:00', '19:30'), col: 'jarrod', type: 'break', location: "—",
        notes: "30-min dinner after Talent Show. Grab food before offload and DJ sets.",
        quota: [{ label: 'Output', value: 'Food + rest' }]
    },

    {
        id: 'sat-j-ol3', name: "Offload 3",
        ...t('19:15', '19:30'), col: 'jarrod', type: 'offload', location: "ConOps",
        notes: "~7:15 PM. Staggered 15 min after Neon offload 3. Transfer talent show footage JAR-C to Nextcloud server.",
        quota: [{ label: 'Priority', value: 'High' }, { label: 'Action', value: 'Transfer JAR-C → Nextcloud, swap to JAR-D' }]
    },

    {
        id: 'sat-j-fm', name: "Furmily Feud pass",
        ...t('19:30', '19:45'), col: 'jarrod', type: 'neon', location: "Panel Room",
        notes: "15-min pass after offload 3. A7S III: S-Cinetone, ISO 1600, f/2.8, Tamron 28-75mm, SteadyShot Active. Look for: game show team reaction moments (delight or dismay), host energy calling answers, crowd participation cheers. 90–180 sec highlight clip + 30–45 stills.",
        quota: [{ label: 'Min. Photos', value: '30–45' }, { label: 'Min. Video', value: '90–180 sec atmosphere clip' }, { label: 'Duration', value: '15 min pass' }]
    },

    {
        id: 'sat-j-ghc', name: "Guitar Hero Comp — opening pass",
        ...t('20:00', '20:15'), col: 'jarrod', type: 'neon', location: "Games Room",
        notes: "15-min opening pass before Vargr video block. A7S III: S-Cinetone, ISO 3200, f/2.8, 4K25fps. Screen glow provides handheld ambient. Look for: player close-up with screen-lit face in a critical sequence, controller + visible score display in same frame, first-round bracket energy. ~60 sec B-roll + 15–24 stills.",
        quota: [{ label: 'Min. Photos', value: '15–24' }, { label: 'Min. Video', value: '~60 sec atmosphere clip' }, { label: 'Duration', value: '15 min pass' }]
    },

    {
        id: 'sat-j-kar', name: "Karaoke — opening pass",
        ...t('20:15', '20:30'), col: 'jarrod', type: 'neon', location: "Special",
        notes: "15-min opening pass. A7S III: S-Cinetone, ISO 3200, f/2.8, 4K25fps. Look for: first performer establishing atmosphere shot, crowd gathering and settling in, stage/venue setup. ~60 sec B-roll + 15–24 stills. Head to Main Stage for Vargr video block after.",
        quota: [{ label: 'Min. Photos', value: '15–24' }, { label: 'Min. Video', value: '~60 sec atmosphere clip' }, { label: 'Duration', value: '15 min pass' }]
    },

    // ── DJ Sets ──────────────────────────────────────────────────────
    // Vargr 8–9 PM (Melodic Techno & Progressive House)
    {
        id: 'sat-j-dj2', name: "Vargr — photo + video",
        ...t('20:30', '21:00'), col: 'jarrod', type: 'neon', location: "Main Stage",
        notes: "Melodic Techno & Progressive House 8:30–9:00. A7S III: S-Cinetone, 4K25fps, ISO 3200–6400, f/2.8, SteadyShot Active. Mix 1–2 min crowd clips at 28mm + burst stills at 75mm for DJ booth portraits. Look for: progressive build crowd cohesion on the floor, DJ absorbed in set with focused expression, stage lighting truss framing the room atmosphere. Coordinate with Neon — split booth-side and floor-side.",
        quota: [{ label: 'Min. Photos', value: '24–36' }, { label: 'Min. Video', value: '6 min peak set clip' }, { label: 'Recommended Gear', value: 'A7S III Tamron 28-75mm f/2.8' }]
    },

    {
        id: 'sat-j-ol4', name: "Offload 4",
        ...t('21:15', '21:30'), col: 'jarrod', type: 'offload', location: "ConOps",
        notes: "~9:15 PM. Jarrod offloads first at Peachy transition. Transfer JAR-D to Nextcloud server. Neon holds solo photo coverage 9:00–9:30 PM.",
        quota: [{ label: 'Action', value: 'Transfer JAR-D → Nextcloud, swap to JAR-E' }]
    },

    // Peachy 9–10 PM (Ragga Jungle / Drum and Bass)
    {
        id: 'sat-j-dj4', name: "Peachy — photo + video",
        ...t('21:30', '22:00'), col: 'jarrod', type: 'neon', location: "Main Stage",
        notes: "Ragga Jungle/D&B 9:30–10:00. A7S III: S-Cinetone, 4K25fps, ISO 3200–6400, f/2.8, Tamron 28mm for floor sweep. Look for: D&B drop crowd peak (hands, movement energy), DJ deck close-up during the break, full floor wide sweep with crowd filling frame. 6-min highlight clip + 24–36 stills.",
        quota: [{ label: 'Min. Photos', value: '24–36' }, { label: 'Min. Video', value: '6 min D&B floor energy reel' }, { label: 'Recommended Gear', value: 'A7S III Tamron 28-75mm f/2.8' }]
    },

    // Xiinox 10–11 PM (Bass House/EDM)
    {
        id: 'sat-j-dj6', name: "Xiinox — photo + video",
        ...t('22:30', '23:00'), col: 'jarrod', type: 'neon', location: "Main Stage",
        notes: "Bass House/EDM 10:30–11:00. A7S III: S-Log3 to recover EDM lighting rig highlights, 4K25fps, ISO 6400–12800, f/2.8. Look for: strobe/LED effects framed with crowd silhouettes, DJ–crowd connection moment, coloured light sweep across faces. Short punchy clips for reel + compressed crowd portraits at 75mm stills.",
        quota: [{ label: 'Min. Photos', value: '24–36' }, { label: 'Min. Video', value: '6 min late set reel' }, { label: 'Recommended Gear', value: 'A7S III Tamron 28-75mm f/2.8' }]
    },

    // CoryKuma 11 PM – midnight (Trance)
    {
        id: 'sat-j-dj8', name: "CoryKuma — closing photo + video",
        ...t('23:30', '24:00'), col: 'jarrod', type: 'neon', location: "Main Stage",
        notes: "Trance 11:30–midnight — solo closing coverage (Neon wrapped). A7S III: S-Cinetone, 4K25fps, ISO 12800, f/2.8. Look for: wide trance crowd with slowly morphing aerial lighting for a dreamlike atmosphere frame, DJ closing intensity for reel anchor, final end-of-night euphoria portraits at 75mm. End on a strong wide frame summarising the Saturday night energy.",
        quota: [{ label: 'Min. Photos', value: '24–36' }, { label: 'Min. Video', value: '6 min closing reel' }, { label: 'Note', value: 'Solo coverage — Neon wrapped' }]
    },

    {
        id: 'sat-j-ol5', name: "Final Offload — wrap",
        ...t('24:00', '24:20'), col: 'jarrod', type: 'offload', location: "ConOps",
        notes: "After midnight. Transfer all remaining JAR-E footage to Nextcloud server. Verify upload integrity before disconnecting. Jarrod wraps for the night.",
        quota: [{ label: 'Action', value: 'Transfer all JAR cards → Nextcloud' }, { label: 'Verify', value: 'Check upload integrity' }, { label: 'Note', value: 'Jarrod wrap for the night' }]
    },

];
