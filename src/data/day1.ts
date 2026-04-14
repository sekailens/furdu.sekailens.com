import type { GanttEvent } from '@/lib/gantt';

// ── Time helper ───────────────────────────────────────────────────────
// Use "H:MM" strings instead of sh/sm/eh/em numbers for easy editing.
// Example: ...t('9:00','9:20') → { sh:9, sm:0, eh:9, em:20 }
function t(start: string, end: string) {
    const [sh, sm] = start.split(':').map(Number);
    const [eh, em] = end.split(':').map(Number);
    return { sh, sm, eh, em };
}

// ── Day 1 — Friday 17 April 2026 ─────────────────────────────────────
// ICS times UTC; Brisbane = UTC+10.
// Full Friday ICS coverage map (⭐ = important, 🔸 = pass):
//   10:00  Super/Ultra Dealer Access     → Neon+Jarrod
//   10:30  Sponsor Dealer Access         → Neon+Jarrod
//   11:00  Dealers Den Open (11–1)       → Neon+Jarrod
//   12:00  Negadrake Photoshoot          → Jarrod pass
//   13:00  ⭐ My First Furcon (1–2)       → Jarrod primary
//   13:00  Artists Alley (10–6:30)       → Neon pass
//   13:00  Pooltoy Playground (1–5)      → Neon pass
//   13:00  Guitar Hero Tutorial (1–3)    → Jarrod pass (2:00 PM gap)
//   13:30  ⭐ Costume Competition (1:30–2:30) → Neon primary
//   14:00  Dealers Den Open (2–5)        → background (no dedicated coverage block)
//   14:30  ⭐ Dance Competition (2:30–4:30)   → Both primary
//   16:30  Offloads (post Dance Comp)    → staggered
//   17:00  ⭐ Opening Words (5–6)         → Both primary
//   18:30  Offloads (post Ceremony)      → staggered
//   18:35  Subculture vs Slop (6:30–7:30)→ Neon pass
//   18:50  Muscle Fur Meet Up (6:30–7:30)→ Jarrod
//   19:00  ⭐ Fursuit Friendly Dance (7–8)    → Neon primary
//   19:30  Clocktower/Games pass (7–9+)  → Jarrod gap pass
//   20:00  DJ Sets: Pup Riff (8–9)       → Both alternate photo/video
//   20:00  DJ Sets: Salty (9–10)         → Both (staggered offloads at DJ transition)
//   22:00  DJ Sets: Antithesis (10–11)   → Both
//   23:00  DJ Sets: Diesel (11–midnight) → Both
//   NOTE: Streamer Meet (4–5 PM), Creating Story Ideas (2:30–3:30),
//         Puppy Play (8:30–9:30) are blocked by priority events. Noted below.
//
// DJ alternation rule: each 30-min slot swaps roles.
//   col:neon  type:neon   = Neon PHOTO  (cyan)
//   col:neon  type:jarrod = Neon VIDEO  (purple)
//   col:jarrod type:neon  = Jarrod PHOTO (cyan)
//   col:jarrod type:jarrod= Jarrod VIDEO (purple)
// ─────────────────────────────────────────────────────────────────────

export const eventsDay1: GanttEvent[] = [

    // ══════════════════════════════════════════════════════════════════
    // NEON  (primary photo)
    // ══════════════════════════════════════════════════════════════════

    // ── Morning ──────────────────────────────────────────────────────
    {
        id: 'fri-n-00', name: "Morning Briefing",
        ...t('9:00', '9:20'), col: 'neon', type: 'break', location: "Base",
        notes: "Team briefing, card checks, gear check. Confirm day priorities and radio channels.",
        quota: [{ label: 'Min. Output', value: 'Briefing notes' }]
    },

    {
        id: 'fri-n-br', name: "Registration Lines (photo)",
        ...t('9:20', '10:00'), col: 'neon', type: 'neon', location: "Entrance / Lobby",
        notes: "Queue candids before doors open. R6 II: Av f/2.0, ISO 800–3200, AFCS face tracking on. Sigma 18-35mm — 18mm for crowd context, 35mm for individual reactions. Look for: first costumed arrivals, group formations at entrance, anticipation expressions.",
        quota: [{ label: 'Min. Photos', value: '45–60' }, { label: 'Recommended Gear', value: 'Sigma 18-35mm f/1.8' }]
    },

    // ── Dealer's Den — Neon: PHOTO ───────────────────────────────────
    {
        id: 'fri-n-dd1', name: "Dealer's Den — Super/Ultra Access",
        ...t('10:00', '10:30'), col: 'neon', type: 'neon', location: "Dealer's Den",
        notes: "Early access — clean stall compositions before crowds fill in. R6 II: Av f/4, ISO 400–1600, manual WB ~3200K for warm booth lighting. Canon 24-105mm at 50–105mm for compressed stall layouts. Look for: vendor display arrangements, first-look patron reactions, merch detail close-ups.",
        quota: [{ label: 'Min. Photos', value: '30–45' }, { label: 'Recommended Gear', value: 'Canon 24-105mm' }]
    },

    {
        id: 'fri-n-dd2', name: "Dealer's Den — Sponsor Access",
        ...t('10:30', '11:00'), col: 'neon', type: 'neon', location: "Dealer's Den",
        notes: "Sponsor tier — growing floor with first purchasers arriving. R6 II: Av f/2.8, ISO 800–1600, AFCS eye-tracking for candid portraits. Sigma 85mm f/1.4 for shallow vendor portraits against busy display backgrounds. Look for: customer–vendor interaction, hand exchanges, browsing candids.",
        quota: [{ label: 'Min. Photos', value: '30–45' }, { label: 'Recommended Gear', value: 'Sigma 85mm f/1.4' }]
    },

    {
        id: 'fri-n-dd3', name: "Dealers Den Open — Rush (photo)",
        ...t('11:00', '11:30'), col: 'neon', type: 'neon', location: "Dealer's Den",
        notes: "Peak Den energy. R6 II: Tv 1/250s, ISO 800–3200, burst 10fps mechanical. Subject tracking on. Look for: first-purchase facial reactions, crowd flow through the entrance aisle, friends discovering items together. Sigma 85mm f/1.4 for candid portrait isolation.",
        quota: [{ label: 'Min. Photos', value: '45–60' }, { label: 'Recommended Gear', value: 'Sigma 85mm f/1.4' }]
    },

    // ── Lunch ────────────────────────────────────────────────────────
    {
        id: 'fri-n-ln', name: "Break (lunch)",
        ...t('11:30', '12:30'), col: 'neon', type: 'break', location: "—",
        notes: "Lunch. Battery swap. Offload 1 at 12:30 PM straight after.",
        quota: [{ label: 'Min. Output', value: 'Rest + battery swap' }]
    },

    // ── Early afternoon ──────────────────────────────────────────────
    {
        id: 'fri-n-ol1', name: "Offload 1",
        ...t('12:30', '12:45'), col: 'neon', type: 'offload', location: "ConOps",
        notes: "HIGH PRIORITY — 2.5 hrs of morning footage. Transfer all files from card to Nextcloud server, then swap to another card.",
        quota: [{ label: 'Priority', value: 'High' }, { label: 'Action', value: 'Transfer → Nextcloud, swap to another card' }]
    },

    {
        id: 'fri-n-aa1', name: "Artists Alley pass",
        ...t('12:45', '13:00'), col: 'neon', type: 'neon', location: "Artist's Alley",
        notes: "15-min pass — artists mid-work. R6 II: Av f/2.8, ISO 1600–3200, no flash (don't interrupt). Look for: hands drawing or painting, art flat-lays from above, artist concentration portraits. Canon 24-105mm at 50–105mm for table compositions. Back by 1:15 PM for Costume Comp.",
        quota: [{ label: 'Min. Photos', value: '30–45' }, { label: 'Duration', value: '15 min pass' }]
    },

    {
        id: 'fri-n-pt', name: "Pooltoy Playground pass",
        ...t('13:15', '13:30'), col: 'neon', type: 'neon', location: "Panel Room 2",
        notes: "15-min pass before Costume Comp. R6 II: Av f/1.8, ISO 1600–3200, IBIS on. Look for: colourful inflatables as graphic background elements, group posing, candid playfulness. Sigma 85mm f/1.4 for subject isolation. Back by 1:30 PM.",
        quota: [{ label: 'Min. Photos', value: '15–24' }, { label: 'Duration', value: '15 min pass' }]
    },

    // ── Afternoon priority events ────────────────────────────────────
    {
        id: 'fri-n-05', name: "⭐ Costume Competition",
        ...t('13:30', '14:30'), col: 'neon', type: 'primary', location: "Special",
        notes: "KEY EVENT — methodical coverage of each contestant. R6 II: M mode 1/200s (flash sync), ISO 400, f/5.6 for full-body sharpness; switch to f/1.4 for craft detail close-ups. Godox V1 Pro TTL with diffuser as key light; Aputure MC as fill for LED and seam close-ups. Look for: full-body front and back with crop room at edges, craftsmanship close-ups (foam work, LED detail, seams), contestant expressions, judge reactions, audience response. Cover each entry fully before moving on.",
        quota: [{ label: 'Min. Photos', value: '90–120' }, { label: 'Shots', value: 'Full-body F+B + detail close-ups' }, { label: 'Recommended Gear', value: 'Canon 70-300mm + Sigma 85mm f/1.4 + Godox V1 Pro + Aputure MC' }]
    },

    {
        id: 'fri-n-07', name: "⭐ Dance Competition",
        ...t('14:30', '16:30'), col: 'neon', type: 'primary', location: "Main Stage",
        notes: "Primary stills — Jarrod on Flowline for full video. R6 II: Tv 1/640s (raise to 1/1000 for air-time), ISO 1600–6400, burst max. Subject tracking on. Canon 70-300mm from front audience — position early. Look for: peak mid-movement freeze (jump apex, spin peak, extension), winning routine reaction moment, judges' expressions, wide crowd energy (swap to 18-35mm). Prioritise the winner reveal sequence. NOTE: Creating Story Ideas (2:30–3:30) blocked — unavoidable.",
        quota: [{ label: 'Min. Photos', value: '150–210' }, { label: 'Note', value: 'Primary stills — Jarrod on Flowline video' }, { label: 'Shutter', value: '1/640–1/1000 to freeze motion' }, { label: 'Recommended Gear', value: 'Canon 70-300mm' }]
    },

    // ── Post-Dance offload + pre-ceremony ────────────────────────────
    // Streamer Meet & Mingle (4–5 PM, Panel Room) is blocked by offloads + Opening Words.
    {
        id: 'fri-n-ol2', name: "Offload 2",
        ...t('16:30', '16:45'), col: 'neon', type: 'offload', location: "ConOps",
        notes: "Immediately after Dance Competition ends at 4:30 PM. Neon first. HIGH PRIORITY — transfer all files to Nextcloud server before Opening Words.",
        quota: [{ label: 'Priority', value: 'High' }, { label: 'Action', value: 'Transfer → Nextcloud, swap to another card' }]
    },

    {
        id: 'fri-n-bk2', name: "Break (pre-ceremony)",
        ...t('16:45', '17:00'), col: 'neon', type: 'break', location: "—",
        notes: "Transit to Main Stage. Quick gear prep for Opening Words.",
        quota: [{ label: 'Min. Output', value: 'Transit + gear check' }]
    },

    // ── Evening priority events ───────────────────────────────────────
    {
        id: 'fri-n-11', name: "⭐ Opening Words",
        ...t('17:00', '18:00'), col: 'neon', type: 'primary', location: "Main Stage",
        notes: "HIGHEST PRIORITY — sole stills photographer. R6 II: Av f/4, ISO 3200–6400, no flash during speeches, IBIS active. Canon 70-300mm for individual speaker portraits; Sigma 18-35mm for wide crowd reactions. Look for: each board speaker framed at podium, theme reveal visual moment (burst on the reveal), wide crowd reaction shot, emotional audience close-ups. Burst at each applause break — reframe between speakers only, don't shift position during speech.",
        quota: [{ label: 'Min. Photos', value: '150–200' }, { label: 'Note', value: 'Sole stills photographer' }, { label: 'Shots', value: 'Speakers, theme reveal, crowd' }, { label: 'Recommended Gear', value: 'Canon 70-300mm + Sigma 18-35mm f/1.8' }]
    },

    {
        id: 'fri-n-ol3', name: "Offload 3",
        ...t('18:15', '18:35'), col: 'neon', type: 'offload', location: "ConOps",
        notes: "~6:15 PM. Natural gap after Opening Words ends. HIGH PRIORITY — transfer ceremony footage to Nextcloud server.",
        quota: [{ label: 'Priority', value: 'High' }, { label: 'Action', value: 'Transfer → Nextcloud, swap to another card' }]
    },

    {
        id: 'fri-n-sub', name: "Subculture vs Slop (pass)",
        ...t('18:35', '18:50'), col: 'neon', type: 'neon', location: "Panel Room",
        notes: "15-min pass post-offload 3. R6 II: Av f/2.8, ISO 1600–3200 — panel rooms are dim, don't be afraid to push. Look for: presenter at podium, engaged audience candids, panel atmosphere. Canon 70-300mm for stage reach from audience.",
        quota: [{ label: 'Min. Photos', value: '15–24' }, { label: 'Duration', value: '15 min pass' }]
    },

    {
        id: 'fri-n-13', name: "⭐ Fursuit Friendly Dance",
        ...t('19:00', '19:30'), col: 'neon', type: 'primary', location: "Main Stage",
        notes: "Solo first 15 min (Jarrod joins at 7:15 PM after Muscle Fur pass). R6 II: Tv 1/400s, ISO 3200–12800, f/1.4. Subject tracking in shifting stage light. Look for: fursuiter mid-dance with LED details lit by stage light, crowd participation, handler candids from the floor. Canon 50mm f/1.8 for lightweight low-light carry; Sigma 85mm f/1.4 for fursuit isolation. Spot-meter on subject — stage lighting shifts rapidly.",
        quota: [{ label: 'Min. Photos', value: '45–60' }, { label: 'Note', value: 'Solo — Jarrod still at Muscle Fur' }, { label: 'Recommended Gear', value: 'Sigma 85mm f/1.4 or Canon 50mm f/1.8' }]
    },

    // Neon does Clocktower pass while Jarrod takes over Fursuit Dance at 7:30 PM
    {
        id: 'fri-n-clk', name: "Clocktower / Games pass",
        ...t('19:30', '19:45'), col: 'neon', type: 'neon', location: "Special / Games Room",
        notes: "15-min cross-venue pass while Jarrod holds Fursuit Dance. R6 II: Av f/2.8, ISO 3200–6400, silent shutter. Look for: gaming intensity expressions, groups gathered around screens, Clocktower social atmosphere. Canon 50mm f/1.8 lightweight carry. One or two strong frames per venue — keep moving.",
        quota: [{ label: 'Min. Photos', value: '15–24' }, { label: 'Duration', value: '15 min pass' }, { label: 'Note', value: 'Jarrod holding Fursuit Dance coverage' }]
    },

    {
        id: 'fri-n-13b', name: "⭐ Fursuit Friendly Dance (return)",
        ...t('19:45', '20:00'), col: 'neon', type: 'primary', location: "Main Stage",
        notes: "Final 15 min of dance before DJ sets begin. R6 II: Tv 1/400s, ISO 3200–12800, f/1.4. Look for: closing crowd energy, fursuiters wrapping up final moves, one wide room establishing frame to close the dance block. Sigma 85mm f/1.4.",
        quota: [{ label: 'Min. Photos', value: '15–24' }, { label: 'Note', value: 'Rejoins Jarrod for final stretch' }]
    },

    // ── DJ Sets — BOTH all night, alternating photo/video each 30-min slot ──
    // Pattern: N=photo J=video → swap → repeat. Type colour = role (neon=photo, jarrod=video).
    // Pup Riff 8–9 PM (Melodic Techno)
    {
        id: 'fri-n-dj1', name: "Pup Riff — photo",
        ...t('20:00', '20:30'), col: 'neon', type: 'neon', location: "Main Stage",
        notes: "Melodic Techno opening set. R6 II: Av f/1.4, ISO 3200–6400, Tv 1/200s minimum — no flash on floor. Look for: DJ booth close-up (hands on equipment, side-lit face), early crowd formations, lighting truss patterns on the floor. Sigma 85mm f/1.4 from floor level for low-angle crowd immersion. Coordinate position with Jarrod — split booth-side and floor-side.",
        quota: [{ label: 'Min. Photos', value: '30–45' }, { label: 'Recommended Gear', value: 'Sigma 85mm f/1.4' }]
    },

    // Offload 4 at 9 PM DJ transition — staggered with Jarrod
    {
        id: 'fri-n-ol4', name: "Offload 4",
        ...t('21:30', '21:45'), col: 'neon', type: 'offload', location: "ConOps",
        notes: "9:30 PM. Neon offloads second after Jarrod returns from Offload 4. Transfer files to Nextcloud server.",
        quota: [{ label: 'Action', value: 'Transfer → Nextcloud, swap to another card' }]
    },

    // Salty 9–10 PM (EDM/Dance) — Neon resumes 9:15 as solo photo, then both from 9:30
    {
        id: 'fri-n-dj3', name: "Salty — photo",
        ...t('21:00', '21:30'), col: 'neon', type: 'neon', location: "Main Stage",
        notes: "EDM solo window — Jarrod offloading 9:15–9:30. R6 II: Av f/1.4, ISO 3200–6400, 1/200s min. Solo this slot — cover both DJ booth and crowd floor. Look for: peak crowd energy mid-drop, hands-in-air moments, DJ gesturing. Sigma 85mm f/1.4.",
        quota: [{ label: 'Min. Photos', value: '24-36' }, { label: 'Note', value: 'Solo — Jarrod offloading' }]
    },

    // Antithesis 10–11 PM (Liquid Drum & Bass)
    {
        id: 'fri-n-dj5', name: "Antithesis — photo",
        ...t('22:00', '22:30'), col: 'neon', type: 'neon', location: "Main Stage",
        notes: "Liquid D&B late-night block. R6 II: Av f/1.4, ISO 6400–12800, 1/160s min. Subject tracking may struggle in deep dark — pre-focus on likely subject zones. Look for: bass-drop crowd reaction peaks, DJ absorbed in the set, lighting patterns across crowd faces. Sigma 85mm f/1.4.",
        quota: [{ label: 'Min. Photos', value: '30–45' }, { label: 'Recommended Gear', value: 'Sigma 85mm f/1.4' }]
    },

    // Diesel 11 PM – midnight (Electro)
    {
        id: 'fri-n-dj7', name: "Diesel — photo",
        ...t('23:00', '23:30'), col: 'neon', type: 'neon', location: "Main Stage",
        notes: "Electro final photo block before wrap. R6 II: Av f/1.4, ISO 6400–12800. Look for: late-night euphoria portraits, DJ closing energy, one wide venue atmosphere frame. Sigma 85mm f/1.4. Efficient shoot — strong frames then prep for offload 5.",
        quota: [{ label: 'Min. Photos', value: '30–45' }, { label: 'Recommended Gear', value: 'Sigma 85mm f/1.4' }]
    },

    {
        id: 'fri-n-ol5', name: "Final Offload — wrap",
        ...t('23:30', '23:50'), col: 'neon', type: 'offload', location: "ConOps",
        notes: "~11:30 PM. After Diesel photo block ends. Transfer all remaining cards to Nextcloud server. Neon wraps for the night — Jarrod continues closing video solo.",
        quota: [{ label: 'Action', value: 'Transfer all NEON cards → Nextcloud' }, { label: 'Note', value: 'Neon wrap for the night' }]
    },



    // ══════════════════════════════════════════════════════════════════
    // JARROD  (photo + video)
    // ══════════════════════════════════════════════════════════════════

    // ── Morning ──────────────────────────────────────────────────────
    {
        id: 'fri-j-00', name: "Morning Briefing",
        ...t('9:00', '9:20'), col: 'jarrod', type: 'break', location: "Base",
        notes: "Team briefing. Confirm roles, radio channels, gear check. A7S III + Tamron 28-75mm f/2.8 for day coverage.",
        quota: [{ label: 'Min. Output', value: 'Briefing notes' }]
    },

    {
        id: 'fri-j-br', name: "Registration Lines",
        ...t('9:20', '10:00'), col: 'jarrod', type: 'neon', location: "Entrance / Lobby",
        notes: "Queue B-roll and arrival candids. A7S III: S-Cinetone, 4K25fps, ISO 1600, f/2.8, IBIS on. Tamron 28mm for wide corridor sweeps, 75mm for candid face pulls. Look for: first costumed arrivals' reactions, group formations, corridor crowd flow energy. Burst stills for key costume arrivals.",
        quota: [{ label: 'Min. Photos', value: '30–45' }, { label: 'Min. Video', value: '~6 min final cut' }, { label: 'Recommended Gear', value: 'Tamron 28-75mm f/2.8' }]
    },

    // ── Dealer's Den — Jarrod: VIDEO ─────────────────────────────────
    {
        id: 'fri-j-dd1', name: "Dealer's Den — Super/Ultra Access",
        ...t('10:00', '10:30'), col: 'jarrod', type: 'neon', location: "Dealer's Den",
        notes: "Early access — establish the Den before crowds fill in. A7S III: S-Cinetone, 4K25fps, ISO 800, f/2.8. Commit a slow tracking walk at Tamron 28mm as the Den's cinematic reveal clip. Follow with stall detail stills at 75mm and vendor portrait at f/2.8. Look for: merch layout compositions, vendor-pride expressions, signage detail.",
        quota: [{ label: 'Min. Photos', value: '24–36' }, { label: 'Min. Video', value: 'Walk-through reel 6 min' }, { label: 'Recommended Gear', value: 'Tamron 28-75mm f/2.8' }]
    },

    {
        id: 'fri-j-dd2', name: "Dealer's Den — Sponsor Access",
        ...t('10:30', '11:00'), col: 'jarrod', type: 'neon', location: "Dealer's Den",
        notes: "Continuing B-roll with growing floor energy. A7S III: S-Cinetone, 4K25fps, ISO 1600–3200, f/2.8, handheld at 28mm weaving between stalls. Candid stills at 75mm of customer–vendor exchanges. Look for: purchase reactions, art being admired, fandom recognition moments.",
        quota: [{ label: 'Min. Photos', value: '24–36' }, { label: 'Min. Video', value: 'B-roll 270 sec' }, { label: 'Recommended Gear', value: 'Tamron 28-75mm f/2.8' }]
    },

    {
        id: 'fri-j-dd3', name: "Dealers Den Open — Rush",
        ...t('11:00', '11:30'), col: 'jarrod', type: 'neon', location: "Dealer's Den",
        notes: "Peak rush — hero crowd shot of the Den sequence. A7S III on Flycam Flowline: S-Cinetone, 4K25fps, ISO 1600–3200, Tamron 28mm wide. Execute a sweeping aisle tracking shot as the primary Den B-roll anchor clip. Between Flowline passes, burst stills handheld at 75mm for first-purchase reaction candids.",
        quota: [{ label: 'Min. Photos', value: '30–45' }, { label: 'Min. Video', value: '~270 sec keeper clip' }, { label: 'Recommended Gear', value: 'Tamron 28-75mm f/2.8 @ 28mm on Flycam Flowline' }]
    },

    // ── Lunch ────────────────────────────────────────────────────────
    {
        id: 'fri-j-ln', name: "Break (lunch)",
        ...t('11:30', '12:30'), col: 'jarrod', type: 'break', location: "—",
        notes: "Lunch. Battery swap. Offload 1 staggered to 12:45 PM (15 min after Neon).",
        quota: [{ label: 'Min. Output', value: 'Rest + battery swap' }]
    },

    // ── Early afternoon ──────────────────────────────────────────────
    {
        id: 'fri-j-neg', name: "Negadrake Photoshoot (pass)",
        ...t('12:30', '12:45'), col: 'jarrod', type: 'neon', location: "Panel Room",
        notes: "Low priority BTS pass — Negadrake's own event. Confirm consent with organiser before shooting. A7S III: ISO 1600, f/2.8, Tamron 28-75mm handheld, unobtrusive, SteadyShot Active. Look for: studio lighting setup atmosphere, photographer–subject interaction, styling prep candids. ~60 sec BTS clip target — slow handheld pull across the setup at 28mm, close detail of lighting rig and subject at 75mm. Do not disrupt the shoot.",
        quota: [{ label: 'Min. Photos', value: '9–15 BTS' }, { label: 'Min. Video', value: '~60 sec BTS clip' }, { label: 'Note', value: 'Low priority, consent first' }]
    },

    {
        id: 'fri-j-ol1', name: "Offload 1",
        ...t('12:45', '13:00'), col: 'jarrod', type: 'offload', location: "ConOps",
        notes: "~12:45 PM. Staggered 15 min after Neon. Transfer files to Nextcloud server. Someone always remains in the field.",
        quota: [{ label: 'Priority', value: 'High' }, { label: 'Action', value: 'Transfer → Nextcloud, swap to another card' }]
    },

    {
        id: 'fri-j-03', name: "⭐ My First Furcon",
        ...t('13:00', '14:00'), col: 'jarrod', type: 'primary', location: "Main Stage",
        notes: "IMPORTANT — board introductions and first-timer welcome. A7S III: S-Cinetone, 4K25fps, ISO 800–1600, f/2.8, handheld. Wide crowd establishing at 28mm, then Sony 70-200mm GM for speaker close-up stills. Look for: speaker warmth with audience, first-timer participatory moments (hands raised), board member introductions. 3-min highlights clip target. Neon independently at Costume Comp from 1:30.",
        quota: [{ label: 'Min. Photos', value: '30–45' }, { label: 'Min. Video', value: '~3 min short clip' }, { label: 'Recommended Gear', value: 'Sony 70-200mm GM' }]
    },

    {
        id: 'fri-j-gh', name: "Guitar Hero Tutorial (pass)",
        ...t('14:00', '14:15'), col: 'jarrod', type: 'neon', location: "Games Room",
        notes: "15-min gap filler after My First Furcon. A7S III: S-Cinetone, ISO 800–1600, 4K25fps, Tamron 28-75mm. Look for: player-intensity close-ups (hands on controller, screen-face reaction), group spectating energy, guitar peripheral in frame. 90–180 sec B-roll + 15–24 stills. Out by 2:15 PM for Dance Comp Flowline setup.",
        quota: [{ label: 'Min. Photos', value: '15–24' }, { label: 'Min. Video', value: '90–180 sec atmosphere clip' }, { label: 'Duration', value: '15 min pass' }]
    },

    // ── Afternoon priority events ─────────────────────────────────────
    // NOTE: Streamer Meet & Mingle (4–5 PM) is blocked by Dance Comp + offloads. No coverage possible.
    {
        id: 'fri-j-07', name: "⭐ Dance Competition",
        ...t('14:30', '16:30'), col: 'jarrod', type: 'primary', location: "Main Stage",
        notes: "FULL VIDEO RECORD — Flowline throughout, no stills. A7S III on Flycam Flowline: S-Log3, 4K25fps, ISO 800–3200, Tamron 28mm wide end. Shinobi II for live framing confirmation. Look for: entrance tracking shot from stage wings to centre, full routine in-frame wide from start to finish, choreography peaks (lifts, floor sections, spins). Capture each routine continuously — do not cut mid-performance. Neon covers all stills.",
        quota: [{ label: 'Min. Video', value: 'Full event record' }, { label: 'Note', value: 'Video only — Neon handles all stills' }, { label: 'Recommended Gear', value: 'Tamron 28-75mm f/2.8 @ 28mm on Flycam Flowline + Atomos Shinobi II' }]
    },

    // ── Post-Dance offload ────────────────────────────────────────────
    {
        id: 'fri-j-ol2a', name: "Break (pre-ceremony)",
        ...t('16:30', '16:45'), col: 'jarrod', type: 'break', location: "ConOps",
        notes: "Transit to Main Stage. Quick gear prep for Opening Words.",
        quota: [{ label: 'Priority', value: 'High' }, { label: 'Action', value: 'Transfer → Nextcloud, swap to another card' }]
    },

    // ── Post-Dance offload ────────────────────────────────────────────
    {
        id: 'fri-j-ol2', name: "Offload 2",
        ...t('16:45', '17:00'), col: 'jarrod', type: 'offload', location: "ConOps",
        notes: "~4:45 PM. Staggered 15 min after Neon's offload 2. PRIORITY — transfer full afternoon cards to Nextcloud server before Opening Words.",
        quota: [{ label: 'Priority', value: 'High' }, { label: 'Action', value: 'Transfer → Nextcloud, swap to another card' }]
    },

    // ── Evening priority events ───────────────────────────────────────
    {
        id: 'fri-j-09', name: "⭐ Opening Words",
        ...t('17:00', '18:00'), col: 'jarrod', type: 'primary', location: "Main Stage",
        notes: "HIGHEST PRIORITY — tripod with dynamic framing to follow each speaker, full ceremony, no stills. A7S III: S-Log3, 4K25fps, ISO 800, Tamron 28-75mm at ~35mm for stage-width framing. NEEWER 74\" tripod with smooth pan/tilt capability. RØDE VideoMic ProPlus: check audio levels pre-event (–12dB peaks), high-pass filter on for indoor reverb. Shinobi II for exposure and framing. Look for: track each speaker smoothly as they move on stage, adjust framing before any reveal prop or screen appears, maintain head room. Record continuously through transitions and applause — do not stop between speakers. Pan/tilt to follow speaker movement with fluid, professional motion.",
        quota: [{ label: 'Min. Video', value: 'Full ceremony record' }, { label: 'Note', value: 'Video only — dynamic tripod following speakers. Neon is sole stills.' }, { label: 'Audio', value: 'RØDE VideoMic ProPlus' }, { label: 'Recommended Gear', value: 'NEEWER 74" Pro Video Tripod + Tamron 28-75mm + Atomos Shinobi II' }]
    },

    {
        id: 'fri-j-ol3', name: "Offload 3",
        ...t('18:30', '18:50'), col: 'jarrod', type: 'offload', location: "ConOps",
        notes: "~6:30 PM. Staggered 15 min after Neon offload 3. HIGH PRIORITY — transfer ceremony footage to Nextcloud server.",
        quota: [{ label: 'Priority', value: 'High' }, { label: 'Action', value: 'Transfer → Nextcloud, swap to another card' }]
    },

    {
        id: 'fri-j-10', name: "Muscle Fur Meet Up (pass)",
        ...t('18:50', '19:05'), col: 'jarrod', type: 'neon', location: "Panel Room 2",
        notes: "Arrives ~6:50 PM post-offload. Confirm consent with event host before raising the camera. A7S III: S-Cinetone, ISO 1600–3200, f/2.8, Tamron 28-75mm. Look for: full group posed at 28mm, individual candids at 75mm, friendly showing-off interactions. 90–180 sec atmosphere clip + 30–45 stills. Keep it relaxed — this is their event, not a formal shoot.",
        quota: [{ label: 'Min. Photos', value: '30–45' }, { label: 'Min. Video', value: '90–180 sec group clip' }, { label: 'Note', value: 'Consent required before shooting' }]
    },

    {
        id: 'fri-j-ffd', name: "⭐ Fursuit Friendly Dance",
        ...t('19:15', '20:00'), col: 'jarrod', type: 'primary', location: "Main Stage",
        notes: "Covers dance while Neon at Clocktower pass (7:30–7:45). A7S III: S-Cinetone, 4K25fps, ISO 3200–6400, Tamron 28mm wide for floor sweep. Look for: fursuiter mid-dance with suit detail lit by stage lighting, crowd participation surrounding the floor, DJ framing from behind stage. Wide floor B-roll sweep; burst stills at 10fps for mid-fursuit-movement freeze. Neon rejoins at 7:45.",
        quota: [{ label: 'Min. Photos', value: '30–45' }, { label: 'Min. Video', value: '~270 sec B-roll' }, { label: 'Note', value: 'Neon away at Clocktower pass 7:30–7:45 PM' }, { label: 'Recommended Gear', value: 'A7S III Tamron 28-75mm f/2.8' }]
    },

    // ── DJ Sets — BOTH all night, alternating photo/video each 30-min slot ──
    // Pup Riff 8–9 PM (Melodic Techno)
    {
        id: 'fri-j-dj2', name: "Pup Riff — photo + video",
        ...t('20:30', '21:00'), col: 'jarrod', type: 'neon', location: "Main Stage",
        notes: "Melodic Techno 8:30–9:00. A7S III: S-Cinetone, 4K25fps, ISO 3200–12800, f/2.8. Mix 1–2 min highlight-reel clips with burst stills at 75mm. Look for: DJ hands on equipment (side-lit), crowd immersion at 28mm from low angle, lighting rig framing the room. Coordinate with Neon — split booth-side and floor-side positions.",
        quota: [{ label: 'Min. Photos', value: '24–36' }, { label: 'Min. Video', value: 'A-roll peak set clip' }, { label: 'Recommended Gear', value: 'A7S III Tamron 28-75mm f/2.8' }]
    },


    {
        id: 'fri-j-ol4', name: "Offload 4",
        ...t('21:15', '21:30'), col: 'jarrod', type: 'offload', location: "ConOps",
        notes: "~9:15 PM. Jarrod offloads first at the Pup Riff → Salty transition. Transfer files to Nextcloud server. Neon holds solo photo coverage 9:15–9:30.",
        quota: [{ label: 'Priority', value: 'High' }, { label: 'Action', value: 'Transfer → Nextcloud, swap to another card' }]
    },

    {
        id: 'fri-j-dj4', name: "Salty — photo + video",
        ...t('21:30', '22:00'), col: 'jarrod', type: 'neon', location: "Main Stage",
        notes: "EDM 9:30–10:00 — crowd fully warmed up, peak energy material. A7S III: S-Cinetone, 4K25fps, ISO 6400, f/2.8. Look for: mid-drop hands-up crowd moment, DJ transition gestures, strobe patterns on faces. Low-angle floor handheld at 28mm + elevated booth-angle stills at 75mm.",
        quota: [{ label: 'Min. Photos', value: '24–36' }, { label: 'Min. Video', value: 'Mid-set reel 6 min' }, { label: 'Recommended Gear', value: 'A7S III Tamron 28-75mm f/2.8' }]
    },

    {
        id: 'fri-j-dj6', name: "Antithesis — photo + video",
        ...t('22:30', '23:00'), col: 'jarrod', type: 'neon', location: "Main Stage",
        notes: "Liquid D&B 10:30–11:00. A7S III sensor is clean at ISO 12800 — use S-Log3 to recover highlight detail from lighting rigs. Look for: wide floor atmosphere with coloured lighting signature, absorbed DJ, late-night crowd persisting strong. Short punchy clips (< 2 min) for reel + compressed crowd portraits at 75mm stills.",
        quota: [{ label: 'Min. Photos', value: '24–36' }, { label: 'Min. Video', value: 'Late set reel 6 min' }, { label: 'Recommended Gear', value: 'A7S III Tamron 28-75mm f/2.8' }]
    },

    {
        id: 'fri-j-dj8', name: "Diesel — closing photo + video",
        ...t('23:30', '24:00'), col: 'jarrod', type: 'neon', location: "Main Stage",
        notes: "Electro 11:30–midnight — solo final coverage (Neon wrapped). A7S III: S-Cinetone, 4K25fps, ISO 12800–25600, f/2.8. Look for: crowd-together wide moment at 28mm, DJ acknowledgment of the crowd, end-of-night euphoria faces. Both stills and closing video. End on a strong wide frame that summarises Friday night energy.",
        quota: [{ label: 'Min. Photos', value: '24–36' }, { label: 'Min. Video', value: '6 min closing reel' }, { label: 'Note', value: 'Solo coverage — Neon wrapped' }]
    },

    {
        id: 'fri-j-ol5', name: "Final Offload — wrap",
        ...t('24:00', '24:20'), col: 'jarrod', type: 'offload', location: "ConOps",
        notes: "After midnight. Transfer all remaining footage to Nextcloud server. Verify upload integrity before disconnecting. Jarrod wraps for the night.",
        quota: [{ label: 'Action', value: 'Transfer all JAR cards → Nextcloud' }, { label: 'Verify', value: 'Check upload integrity' }, { label: 'Note', value: 'Jarrod wrap for the night' }]
    },

];
