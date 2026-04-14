import type { GanttEvent } from '@/lib/gantt';

// ── Time helper ───────────────────────────────────────────────────────
function t(start: string, end: string) {
    const [sh, sm] = start.split(':').map(Number);
    const [eh, em] = end.split(':').map(Number);
    return { sh, sm, eh, em };
}

// ── Day 3 — Sunday 19 April 2026 ─────────────────────────────────────
// ICS times UTC; Brisbane = UTC+10.
// Full Sunday ICS coverage map (⭐ = important, 🔸 = pass):
//   10:00  ⭐ Fursuit Games (10–12, Main Stage)             → Both shooters
//   10:00  Artists Alley Open (10–4:20)                     → background
//   10:00  Dealers Den Open (10–1)                          → pass
//   12:00  Geometry Dash 10yr Showcase (12–1, Games Room)   → Neon pass
//   12:00  The Plush Meet! (12–1:30, Panel Room)            → Neon pass
//   13:00  ⭐ Floor Wars (1–2:30, Main Stage)                → Both primary
//   14:00  Dealers Den Open (2–4)                           → Neon pass
//   14:00  Fursuit Acting (2–3:30, Panel Room)              → Jarrod pass
//   14:30  Macro/Micro Meet & Photoshoot (2:30–4:30, PR 2)  → Neon primary pass
//   15:00  Faux Hunt Great Games (3–4, Special)             → Jarrod pass
//   15:30  Rent Free in Their Heads (3:30–4:30, Main Stage) → Neon quick pass
//   17:00  ⭐ Closing Ceremony/Charity Auction (5–7, Main Stage) → Both primary
//   20:00  ⭐ DJ Sets — Dead Dog Dance (8 PM–midnight):
//     Hexafox    UK Garage and House   8–9 PM
//     BeatSpark  Dubstep               9–10 PM
//     Retronic   Drum and Bass         10–11 PM
//     NOR        Hard Dance            11 PM–midnight
//   20:00  Pups of Furdu (8–9:30, Panel Room 2) → Jarrod opening pass; Neon on Main Stage
//
// DJ alternation: Neon photo first 30-min slot, Jarrod photo+video second 30-min slot.
// Offload stagger at 9 PM (BeatSpark): Jarrod offloads 9:15, Neon offloads 9:30.
// NOTE: All three Dealers Den sessions have coverage blocked or reduced — prioritise
//       Main Stage primary events and the Closing Ceremony above all else.
// ─────────────────────────────────────────────────────────────────────

export const eventsDay3: GanttEvent[] = [

    // ══════════════════════════════════════════════════════════════════
    // NEON  (primary photo)
    // ══════════════════════════════════════════════════════════════════

    {
        id: 'sun-n-00', name: "Morning Briefing",
        ...t('9:00', '9:20'), col: 'neon', type: 'break', location: "Base",
        notes: "Day 3 final briefing. Priorities: Closing Ceremony > Fursuit Games > Floor Wars > DJ Sets. Confirm long-lens and flash charge for evening Closing Ceremony. Last card stock check.",
        quota: [{ label: 'Output', value: 'Briefing notes' }]
    },

    {
        id: 'sun-n-pw', name: "Pre-Fursuit Games candids",
        ...t('9:20', '10:00'), col: 'neon', type: 'neon', location: "Lobby / Main Stage area",
        notes: "Assembly candids before games begin. R6 II: Tv 1/640s, ISO 800–3200, f/4, Servo AF+Tracking, 12fps burst. Sigma 18-35mm at 18mm for queue crowd; swap to Sigma 85mm at 9:45 AM for tighter fursuit portrait isolation. Look for: team formations gathering under stage lights, individual suit check expressions, handler–fursuiter pairs warming up, numbered team bibs if used.",
        quota: [{ label: 'Min. Photos', value: '45–60' }, { label: 'Recommended Gear', value: 'Sigma 18-35mm f/1.8 → Sigma 85mm f/1.4' }]
    },

    {
        id: 'sun-n-01', name: "⭐ Fursuit Games",
        ...t('10:00', '12:00'), col: 'neon', type: 'primary', location: "Main Stage",
        notes: "HIGH PRIORITY — primary stills, Jarrod on Flowline video. R6 II: Tv 1/640s (lift to 1/1000s for fast game moments), ISO 1600–6400, f/4–5.6, Servo AF+Tracking, 12fps burst. Sigma 85mm for contestant action isolation; Sigma 18-35mm for crowd/stage wide establishing. Look for: peak mid-game action freeze (relay hand-off, physical challenge apex, tug-of-war strain), crowd cheering close-ups framed around competitors, team coordinating mid-game communication, elimination reaction (surprised/disappointed expression), winner celebration burst. Vary angles — stage-level for competitor perspective, audience-row for crowd-framed overhead look.",
        quota: [{ label: 'Min. Photos', value: '150–210' }, { label: 'Note', value: 'Primary stills — Jarrod on Flowline video' }, { label: 'Shots', value: 'Mid-game action, crowd cheering, winners' }, { label: 'Recommended Gear', value: 'Sigma 85mm f/1.4 + Sigma 18-35mm f/1.8' }]
    },

    {
        id: 'sun-n-ln', name: "Break (lunch)",
        ...t('12:00', '12:45'), col: 'neon', type: 'break', location: "—",
        notes: "Lunch after Fursuit Games. Geometry Dash 10yr Showcase (12–1 PM, Games Room) and The Plush Meet (12–1:30 PM, Panel Room) both running — swing by Geometry Dash on the way out if walking past Games Room.",
        quota: [{ label: 'Output', value: 'Rest + battery swap' }]
    },

    {
        id: 'sun-n-ol1', name: "Offload 1",
        ...t('12:45', '13:00'), col: 'neon', type: 'offload', location: "ConOps",
        notes: "HIGH PRIORITY — full Fursuit Games morning footage. Transfer all files from NEON-A to Nextcloud server, swap to NEON-B. Back to Main Stage by 1:00 PM for Floor Wars.",
        quota: [{ label: 'Priority', value: 'High' }, { label: 'Action', value: 'Transfer NEON-A → Nextcloud, swap to NEON-B' }]
    },

    {
        id: 'sun-n-02', name: "⭐ Floor Wars",
        ...t('13:00', '14:30'), col: 'neon', type: 'primary', location: "Main Stage",
        notes: "Primary stills — Jarrod on Flowline video. R6 II: Tv 1/640s (1/1000s for air-time), ISO 3200–6400, f/4–5.6, Servo AF+Tracking, 12fps burst. Canon 70-300mm from front audience for stage reach; Sigma 85mm from side for profile shots during solo battle. Look for: peak mid-move freeze (jump apex, floorwork extension, spin peak), battler stare-down eye-contact moments between rounds, judges' deliberation expressions, crowd's collective lean-in during close battles, elimination moment (exact frame of the judge's decision being shown), winner celebration with crowd.",
        quota: [{ label: 'Min. Photos', value: '150–210' }, { label: 'Note', value: 'Primary stills — Jarrod on Flowline video' }, { label: 'Shots', value: 'Mid-move freeze, eliminations, winner reveal, crowd' }, { label: 'Recommended Gear', value: 'Canon 70-300mm + Sigma 85mm f/1.4' }]
    },

    {
        id: 'sun-n-dd', name: "Dealers Den + Artists Alley pass",
        ...t('14:30', '14:35'), col: 'neon', type: 'neon', location: "Dealer's Den / Artist's Alley",
        notes: "Repeat pass — covered Days 1 and 2. R6 II: Av f/2.8, ISO 1600. One final-day reference frame across both spaces then out.",
        quota: [{ label: 'Min. Photos', value: '10–15' }, { label: 'Duration', value: '5 min pass (repeat)' }]
    },

    {
        id: 'sun-n-macro', name: "Macro/Micro Meet & Photoshoot (pass)",
        ...t('14:45', '15:00'), col: 'neon', type: 'neon', location: "Panel Room 2",
        notes: "First pass (Jarrod follows at 3 PM). Confirm consent before individual close-ups. R6 II: M mode 1/200s (flash sync), ISO 400–800, f/5.6. Godox V1 Pro TTL with small diffuser as key. Look for: grouped posed frame with everyone visible (full-group priority), individual suit texture detail close-up (beach theme props if present), candid conversational group energy before the event fills up further.",
        quota: [{ label: 'Min. Photos', value: '20–35' }, { label: 'Duration', value: '15 min pass (Jarrod follows at 3 PM)' }, { label: 'Note', value: 'Consent for individual close-ups' }, { label: 'Recommended Gear', value: 'Sigma 85mm f/1.4 + Godox V1 Pro' }]
    },

    {
        id: 'sun-n-rf', name: "Rent Free in Their Heads (pass)",
        ...t('16:00', '16:15'), col: 'neon', type: 'neon', location: "Main Stage",
        notes: "15-min pass on the way to offload. R6 II: Av f/2.8, ISO 3200, no flash. Canon 70-300mm from audience. Look for: presenter engaged at screen mid-reveal, projected example prominently visible alongside speaker, engaged audience close-up.",
        quota: [{ label: 'Min. Photos', value: '15–24' }, { label: 'Duration', value: '15 min pass' }]
    },

    {
        id: 'sun-n-ol2', name: "Offload 2",
        ...t('16:15', '16:30'), col: 'neon', type: 'offload', location: "ConOps",
        notes: "4:15 PM — PRIORITY offload before Closing Ceremony. Transfer afternoon footage from NEON-B to Nextcloud server. Swap to NEON-C. Full charge on flash for ceremony coverage.",
        quota: [{ label: 'Priority', value: 'High' }, { label: 'Action', value: 'Transfer NEON-B → Nextcloud, swap to NEON-C' }]
    },

    {
        id: 'sun-n-bk', name: "Break (pre-ceremony)",
        ...t('16:30', '17:00'), col: 'neon', type: 'break', location: "—",
        notes: "30-min transit + positioning for Closing Ceremony on Main Stage. Arrive early for front-row stage position. Flash charged, Canon 70-300mm + Sigma 18-35mm both ready.",
        quota: [{ label: 'Output', value: 'Transit + stage position + gear check' }]
    },

    {
        id: 'sun-n-03', name: "⭐ Closing Ceremony / Charity Auction",
        ...t('17:00', '19:00'), col: 'neon', type: 'primary', location: "Main Stage",
        notes: "HIGHEST PRIORITY of the entire convention — sole stills photographer, Jarrod on locked tripod. R6 II: Av f/4, ISO 3200–6400, no flash during speeches, IBIS active. Canon 70-300mm for speaker-at-podium pulls and bid paddle close-ups; Sigma 18-35mm for wide crowd reaction shots. Look for: each board speaker at podium with crowd behind (wide establishing then tighten), charity auction bid-paddle moment in-frame (burst as hands go up), emotional audience close-ups — end-of-year feels run high, charity reveal reaction (burst through moment and hold), final group-energy wide closing frame. Reframe only between segments — do NOT step away.",
        quota: [{ label: 'Min. Photos', value: '200–280' }, { label: 'Note', value: 'Sole stills photographer — Jarrod on tripod full video' }, { label: 'Shots', value: 'Speakers, auction bids, crowd reactions, charity reveal, closing moments' }, { label: 'Recommended Gear', value: 'Canon 70-300mm + Sigma 18-35mm f/1.8 + Godox V1 Pro' }]
    },

    {
        id: 'sun-n-ol3', name: "Offload 3",
        ...t('19:15', '19:30'), col: 'neon', type: 'offload', location: "ConOps",
        notes: "7:15 PM. Immediately after Closing Ceremony ends. HIGH PRIORITY — transfer ceremony footage from NEON-C to Nextcloud server. Neon offloads first. Swap to NEON-D for Dead Dog Dance.",
        quota: [{ label: 'Priority', value: 'High' }, { label: 'Action', value: 'Transfer NEON-C → Nextcloud, swap to NEON-D' }]
    },

    {
        id: 'sun-n-bk2', name: "Break / transit to Dead Dog Dance",
        ...t('19:30', '20:00'), col: 'neon', type: 'break', location: "—",
        notes: "30-min transit to Main Stage DJ venue for Dead Dog Dance. Gear swap to low-light DJ setup — flash off, high-ISO night mode. NOTE: Pups of Furdu (8–9:30 PM, Panel Room 2) runs parallel; Neon fully committed to Main Stage.",
        quota: [{ label: 'Output', value: 'Transit + low-light DJ gear setup' }]
    },

    // ── DJ Sets — Dead Dog Dance — BOTH all night ─────────────────────
    // Hexafox 8–9 PM (UK Garage and House)
    {
        id: 'sun-n-dj1', name: "Hexafox — photo",
        ...t('20:00', '20:30'), col: 'neon', type: 'neon', location: "Main Stage",
        notes: "UK Garage and House Dead Dog Dance opener. R6 II: Av f/1.4, ISO 3200–6400, 1/200s min, silent shutter. No flash. Sigma 85mm from floor level. Look for: DJ focused at mixer in opening energy, early crowd formations finding the floor, UK Garage groove visible in movement style, stage lighting patterns painting first faces of the night. Coordinate with Jarrod — split booth-side and floor-side.",
        quota: [{ label: 'Min. Photos', value: '30–45' }, { label: 'Recommended Gear', value: 'Sigma 85mm f/1.4' }]
    },

    // BeatSpark 9–10 PM (Dubstep) — Jarrod offloads first at 9:15, Neon second at 9:30
    {
        id: 'sun-n-dj3', name: "BeatSpark — solo photo",
        ...t('21:00', '21:30'), col: 'neon', type: 'neon', location: "Main Stage",
        notes: "Dubstep solo window — Jarrod offloading 9:15–9:30. R6 II: Av f/1.4, ISO 3200–6400, 1/200s min, silent shutter. Solo — cover both DJ booth and floor. Look for: Dubstep drop crowd reaction (full-body movement burst), DJ hand-raise pump-up gesture, laser/lighting rig patterns cutting across faces.",
        quota: [{ label: 'Min. Photos', value: '15–24' }, { label: 'Note', value: 'Solo — Jarrod offloading 9:15–9:30' }]
    },

    {
        id: 'sun-n-ol4', name: "Offload 4",
        ...t('21:30', '21:45'), col: 'neon', type: 'offload', location: "ConOps",
        notes: "9:30 PM. Neon offloads after Jarrod returns. Transfer NEON-D to Nextcloud server. Jarrod holds solo photo+video coverage 9:30–9:45 PM.",
        quota: [{ label: 'Action', value: 'Transfer NEON-D → Nextcloud, swap to NEON-E' }]
    },

    // Retronic 10–11 PM (Drum and Bass)
    {
        id: 'sun-n-dj5', name: "Retronic — photo",
        ...t('22:00', '22:30'), col: 'neon', type: 'neon', location: "Main Stage",
        notes: "D&B late-night peak. R6 II: Av f/1.4, ISO 6400–12800, 1/200s min, silent shutter. Look for: D&B crowd low-angle energy shot (hands, movement), DJ in-focus with blurred crowd energy behind, coloured lighting truss framing the floor sweep. Subject tracking may struggle in deep dark — pre-focus on likely zones.",
        quota: [{ label: 'Min. Photos', value: '30–45' }, { label: 'Recommended Gear', value: 'Sigma 85mm f/1.4' }]
    },

    // NOR 11 PM – midnight (Hard Dance)
    {
        id: 'sun-n-dj7', name: "NOR — photo",
        ...t('23:00', '23:30'), col: 'neon', type: 'neon', location: "Main Stage",
        notes: "Hard Dance final set of the convention. R6 II: Av f/1.4, ISO 6400–12800, 1/160s min. Look for: last-night euphoria crowd portrait (every face in the frame knowing this is the final night), DJ at peak intensity, one wide venue frame capturing the full Dead Dog energy. Make the closing frame count.",
        quota: [{ label: 'Min. Photos', value: '30–45' }, { label: 'Recommended Gear', value: 'Sigma 85mm f/1.4' }]
    },

    {
        id: 'sun-n-ol5', name: "Final Offload — wrap",
        ...t('23:30', '23:50'), col: 'neon', type: 'offload', location: "ConOps",
        notes: "~11:30 PM. After NOR photo block. Transfer all remaining NEON cards to Nextcloud server. Neon wraps for the convention — Jarrod continues closing video solo.",
        quota: [{ label: 'Action', value: 'Transfer all NEON cards → Nextcloud' }, { label: 'Note', value: 'Neon convention wrap' }]
    },


    // ══════════════════════════════════════════════════════════════════
    // JARROD  (photo + video)
    // ══════════════════════════════════════════════════════════════════

    {
        id: 'sun-j-00', name: "Morning Briefing",
        ...t('9:00', '9:20'), col: 'jarrod', type: 'break', location: "Base",
        notes: "Day 3 final briefing. Priorities: Closing Ceremony > Fursuit Games > Floor Wars > DJ Sets. Confirm RØDE audio rig for Closing Ceremony. NEEWER 74\" Pro Video Tripod packed. A7S III + Tamron 28-75mm f/2.8 primary rig.",
        quota: [{ label: 'Output', value: 'Briefing notes' }]
    },

    {
        id: 'sun-j-pw', name: "Pre-Fursuit Games atmosphere",
        ...t('9:20', '10:00'), col: 'jarrod', type: 'neon', location: "Lobby / Main Stage area",
        notes: "B-roll of Fursuit Games check-in and team assembly. A7S III: S-Cinetone, 4K25fps, ISO 1600, f/2.8, IBIS on. Tamron 28mm for wide stage-area sweeps, 75mm for candid team-formation pulls. Look for: fursuit group heading to stage en masse (corridor-perspective tracking shot), individual suit reveal arrivals drawing attention, team huddle energy, numbered-team check-in interaction.",
        quota: [{ label: 'Min. Photos', value: '30–45' }, { label: 'Min. Video', value: '~6 min assembly B-roll' }, { label: 'Recommended Gear', value: 'Tamron 28-75mm f/2.8' }]
    },

    {
        id: 'sun-j-01', name: "⭐ Fursuit Games",
        ...t('10:00', '12:00'), col: 'jarrod', type: 'primary', location: "Main Stage",
        notes: "HIGH PRIORITY — Flowline full event video, no stills. A7S III on Flycam Flowline: S-Log3, 4K25fps, ISO 1600–3200, Tamron 28mm wide. SteadyShot OFF for Flowline operation. Shinobi II for live framing. Look for: entrance tracking shot from stage wings to event centre, each game round fully in frame from start to finish, Flowline sweep between team zones to show full game layout, crowd reaction visible from stage-adjacent position. Record continuously through all rounds — do not cut mid-game.",
        quota: [{ label: 'Min. Video', value: 'Full event record' }, { label: 'Note', value: 'Video only — Neon handles all stills' }, { label: 'Recommended Gear', value: 'A7S III + Tamron 28-75mm f/2.8 @ 28mm on Flycam Flowline' }]
    },

    {
        id: 'sun-j-ln', name: "Break (lunch)",
        ...t('12:00', '12:45'), col: 'jarrod', type: 'break', location: "—",
        notes: "Lunch. Battery swap. Offload 1 simultaneous with Neon at 12:45 PM — both must be done before Floor Wars starts at 1 PM. Geometry Dash Showcase (12–1 PM, Games Room) running — low priority while both on lunch.",
        quota: [{ label: 'Output', value: 'Rest + battery swap' }]
    },

    {
        id: 'sun-j-ol1', name: "Offload 1",
        ...t('12:45', '13:00'), col: 'jarrod', type: 'offload', location: "ConOps",
        notes: "12:45 PM. Simultaneous with Neon offload 1. Both shooters offload together during lunch break — must be done by 1:00 PM. Transfer JAR-A files to Nextcloud server. Both head to Main Stage for Floor Wars immediately after.",
        quota: [{ label: 'Priority', value: 'High' }, { label: 'Action', value: 'Transfer JAR-A → Nextcloud, swap to JAR-B' }]
    },

    {
        id: 'sun-j-02', name: "⭐ Floor Wars",
        ...t('13:00', '14:30'), col: 'jarrod', type: 'primary', location: "Main Stage",
        notes: "Full event video — Flowline throughout, no stills. A7S III on Flycam Flowline: S-Log3, 4K25fps, ISO 1600–3200, Tamron 28mm wide. SteadyShot OFF. RØDE VideoMic ProPlus: -20dB pad for crowd/commentary commentary, high-pass on. Shinobi II for exposure and framing. Look for: entrance tracking pull through the battle corridor to centre stage, each battle round in-frame from first move to judge decision, full Flowline sweep capturing both battlers in a single frame during peaks, crowd-reaction framing from stage-adjacent. Record continuously through every round — do not cut.",
        quota: [{ label: 'Min. Video', value: 'Full event record' }, { label: 'Note', value: 'Video only — Neon handles all stills' }, { label: 'Audio', value: 'RØDE VideoMic ProPlus' }, { label: 'Recommended Gear', value: 'A7S III + Tamron 28-75mm f/2.8 @ 28mm on Flycam Flowline + Atomos Shinobi II' }]
    },

    {
        id: 'sun-j-fa', name: "Fursuit Acting (pass)",
        ...t('14:30', '14:45'), col: 'jarrod', type: 'neon', location: "Panel Room",
        notes: "15-min pass, arriving mid-session. A7S III: S-Cinetone, ISO 1600, f/2.8, 4K25fps, Tamron 28-75mm, SteadyShot Active. Look for: participant actively demonstrating a fursuit expression or movement, coach-participant interaction, group watching a technique demonstration. 90–180 sec B-roll + 30–45 stills.",
        quota: [{ label: 'Min. Photos', value: '30–45' }, { label: 'Min. Video', value: '90–180 sec atmosphere clip' }, { label: 'Duration', value: '15 min pass' }]
    },

    {
        id: 'sun-j-macro', name: "Macro/Micro Meet & Photoshoot (pass)",
        ...t('15:00', '15:15'), col: 'jarrod', type: 'neon', location: "Panel Room 2",
        notes: "Second pass (Neon was in at 2:35). Confirm consent with host before shooting. A7S III: S-Cinetone, ISO 1600, f/2.8, Tamron 28-75mm, SteadyShot Active. Look for: group candid interaction at 28mm, themed beach-prop detail close-up at 75mm, subgroup focused on a posed moment. 90–180 sec atmosphere clip + 30–45 stills.",
        quota: [{ label: 'Min. Photos', value: '30–45' }, { label: 'Min. Video', value: '90–180 sec atmosphere clip' }, { label: 'Note', value: 'Consent for close-up shots; Neon in position' }]
    },

    {
        id: 'sun-j-faux', name: "Faux Hunt Great Games (pass)",
        ...t('15:30', '15:45'), col: 'jarrod', type: 'neon', location: "Special",
        notes: "15-min pass. A7S III: S-Cinetone, ISO 1600, f/2.8, 4K25fps, Tamron 28-75mm. Look for: elimination-round participant reaction (win or out), group gathered around a decisive moment, final-afternoon convention energy visible on faces. 90–180 sec B-roll + 30–45 stills.",
        quota: [{ label: 'Min. Photos', value: '30–45' }, { label: 'Min. Video', value: '90–180 sec atmosphere clip' }, { label: 'Duration', value: '15 min pass' }]
    },

    {
        id: 'sun-j-ol2', name: "Offload 2",
        ...t('16:00', '16:15'), col: 'jarrod', type: 'offload', location: "ConOps",
        notes: "4:00 PM. PRIORITY offload before Closing Ceremony. Transfer JAR-B afternoon footage to Nextcloud server. Swap to JAR-C. Pack NEEWER 74\" Pro Video Tripod and RØDE audio for ceremony.",
        quota: [{ label: 'Priority', value: 'High' }, { label: 'Action', value: 'Transfer JAR-B → Nextcloud, swap to JAR-C' }]
    },

    {
        id: 'sun-j-bk', name: "Break (pre-ceremony)",
        ...t('16:15', '17:00'), col: 'jarrod', type: 'break', location: "—",
        notes: "45-min transit and setup for Closing Ceremony. Set up NEEWER 74\" Pro Video Tripod at optimal stage-right position. RØDE audio rig attached. Confirm with Neon on position split — Jarrod static tripod, Neon roving.",
        quota: [{ label: 'Output', value: 'NEEWER 74" Pro Video Tripod setup + RØDE audio rig + position check' }]
    },

    {
        id: 'sun-j-03', name: "⭐ Closing Ceremony / Charity Auction",
        ...t('17:00', '19:00'), col: 'jarrod', type: 'primary', location: "Main Stage",
        notes: "HIGHEST PRIORITY of the convention — locked-off tripod, full ceremony, no stills. A7S III: S-Log3, 4K25fps, ISO 800–1600, Tamron ~35mm for stage-width framing. NEEWER 74\" tripod. RØDE VideoMic ProPlus: -20dB pad (stage audio can spike sharply with applause), high-pass on, check levels on Shinobi before doors open. Record continuously through all speakers, auction rounds, and the charity reveal — do not cut between segments. Look for: re-frame before any visual prop or screen reveal appears, maintain headroom on each speaker, monitor Shinobi audio waveform through loud applause peaks.",
        quota: [{ label: 'Min. Video', value: 'Full ceremony record' }, { label: 'Note', value: 'Video only — locked-off tripod full ceremony. Neon is sole stills.' }, { label: 'Audio', value: 'RØDE VideoMic ProPlus' }, { label: 'Recommended Gear', value: 'A7S III + NEEWER 74" Pro Video Tripod + Tamron 28-75mm + Atomos Shinobi II' }]
    },

    {
        id: 'sun-j-ol3', name: "Offload 3",
        ...t('19:30', '19:45'), col: 'jarrod', type: 'offload', location: "ConOps",
        notes: "~7:30 PM. Staggered 15 min after Neon offload 3. Transfer ceremony footage JAR-C to Nextcloud server. Swap to JAR-D for Dead Dog Dance.",
        quota: [{ label: 'Priority', value: 'High' }, { label: 'Action', value: 'Transfer JAR-C → Nextcloud, swap to JAR-D' }]
    },

    {
        id: 'sun-j-pup', name: "Pups of Furdu (opening pass)",
        ...t('19:45', '20:00'), col: 'jarrod', type: 'neon', location: "Panel Room 2",
        notes: "15-min opening pass after offload 3. Consent first with the host. A7S III: S-Cinetone, ISO 3200, f/2.8, Tamron 28-75mm. Look for: opening group gathering, best-dressed participant stand-out moment, community pup social energy. 90–180 sec atmosphere clip + 30–45 stills. Exit to Main Stage for Hexafox at 8:00 PM.",
        quota: [{ label: 'Min. Photos', value: '30–45' }, { label: 'Min. Video', value: '90–180 sec group atmosphere clip' }, { label: 'Note', value: 'Consent first; Jarrod exits to Main Stage at 8:00 PM' }]
    },

    // ── DJ Sets — Dead Dog Dance ──────────────────────────────────────
    // Hexafox 8–9 PM (UK Garage and House)
    {
        id: 'sun-j-dj2', name: "Hexafox — photo + video",
        ...t('20:30', '21:00'), col: 'jarrod', type: 'neon', location: "Main Stage",
        notes: "UK Garage and House 8:30–9:00. A7S III: S-Cinetone, 4K25fps, ISO 3200–6400, f/2.8, SteadyShot Active. Mix 1–2 min crowd clips at 28mm + burst stills at 75mm for DJ booth portraits. Look for: UK Garage groove visible in crowd movement style, DJ absorbed mid-set, stage lighting defining the floor atmosphere. Coordinate with Neon — split booth-side and floor-side.",
        quota: [{ label: 'Min. Photos', value: '24–36' }, { label: 'Min. Video', value: '6 min peak set clip' }, { label: 'Recommended Gear', value: 'A7S III Tamron 28-75mm f/2.8' }]
    },

    {
        id: 'sun-j-ol4', name: "Offload 4",
        ...t('21:15', '21:30'), col: 'jarrod', type: 'offload', location: "ConOps",
        notes: "~9:15 PM. Jarrod offloads first at BeatSpark transition. Transfer JAR-D to Nextcloud server. Neon holds solo photo coverage 9:00–9:30 PM.",
        quota: [{ label: 'Action', value: 'Transfer JAR-D → Nextcloud, swap to JAR-E' }]
    },

    // BeatSpark 9–10 PM (Dubstep)
    {
        id: 'sun-j-dj4', name: "BeatSpark — photo + video",
        ...t('21:30', '22:00'), col: 'jarrod', type: 'neon', location: "Main Stage",
        notes: "Dubstep 9:30–10:00. A7S III: S-Cinetone, 4K25fps, ISO 3200–6400, f/2.8, Tamron 28mm for floor sweep. Look for: Dubstep drop crowd peak (hands, body movement energy, bass-face), DJ deck close-up on a hard transition, laser/LED rig effects framing the floor. 6-min highlight reel + 24–36 stills.",
        quota: [{ label: 'Min. Photos', value: '24–36' }, { label: 'Min. Video', value: '6 min Dubstep drop reel' }, { label: 'Recommended Gear', value: 'A7S III Tamron 28-75mm f/2.8' }]
    },

    // Retronic 10–11 PM (Drum and Bass)
    {
        id: 'sun-j-dj6', name: "Retronic — photo + video",
        ...t('22:30', '23:00'), col: 'jarrod', type: 'neon', location: "Main Stage",
        notes: "D&B 10:30–11:00. A7S III: S-Log3 to recover rig highlights, 4K25fps, ISO 6400–12800, f/2.8. Look for: D&B floor energy low-angle sweep, DJ focused and locked in, coloured truss lighting painting the crowd. Short punchy clips for reel + compressed 75mm crowd portraits.",
        quota: [{ label: 'Min. Photos', value: '24–36' }, { label: 'Min. Video', value: '6 min D&B late set reel' }, { label: 'Recommended Gear', value: 'A7S III Tamron 28-75mm f/2.8' }]
    },

    // NOR 11 PM – midnight (Hard Dance)
    {
        id: 'sun-j-dj8', name: "NOR — closing photo + video",
        ...t('23:30', '24:00'), col: 'jarrod', type: 'neon', location: "Main Stage",
        notes: "Hard Dance 11:30–midnight — solo closing coverage (Neon wrapped). A7S III: S-Cinetone, 4K25fps, ISO 12800, f/2.8. Look for: closing-night crowd wide frame with everyone still standing (convention stamina), DJ final moments at the deck, end-of-con euphoria portraits at 75mm. Make the final closing frame a full-floor wide — this is the last image of FurDU 2026.",
        quota: [{ label: 'Min. Photos', value: '24–36' }, { label: 'Min. Video', value: '6 min closing Hard Dance reel' }, { label: 'Note', value: 'Solo coverage — Neon wrapped' }]
    },

    {
        id: 'sun-j-ol5', name: "Final Offload — convention wrap",
        ...t('24:00', '24:20'), col: 'jarrod', type: 'offload', location: "ConOps",
        notes: "After midnight. Transfer all remaining JAR-E footage to Nextcloud server. Verify upload integrity on ALL cards from all three days before disconnecting. Convention complete.",
        quota: [{ label: 'Action', value: 'Transfer all JAR cards → Nextcloud' }, { label: 'Verify', value: 'Check upload integrity — all 3 days' }, { label: 'Note', value: 'Convention wrap' }]
    },

];
