// ── Gantt chart — shared types, constants, and pure helpers ──────────

export const START_HOUR  = 9;
export const END_HOUR    = 25;
export const TOTAL_HOURS = END_HOUR - START_HOUR; // 15
export const DEFAULT_PX  = 120; // px per hour at 100% zoom

// CSS value that uses the --hour-px custom property for zoom reactivity
export function hpx(n: number): string {
  return `calc(${n} * var(--hour-px, ${DEFAULT_PX}px))`;
}

// ── Time tick grid ────────────────────────────────────────────────────
export type TickKind = 'hour' | 'half' | 'quarter';
export interface TimeTick {
  i:      number;
  offset: number;   // hours from START_HOUR
  absH:   number;
  m:      number;
  kind:   TickKind;
  label:  string;
}

export const timeTicks: TimeTick[] = Array.from({ length: TOTAL_HOURS * 4 + 1 }, (_, i) => {
  const offset = i * 0.25;
  let absH   = START_HOUR + Math.floor(offset);
  const m      = Math.round((offset % 1) * 60);
  const kind: TickKind = m === 0 ? 'hour' : m === 30 ? 'half' : 'quarter';
  const hNorm = absH % 24;
  const h12   = hNorm % 12 || 12;
  const ampm  = hNorm < 12 ? 'AM' : 'PM';
  const label = `${h12}:00 ${ampm}`;
  return { i, offset, absH, m, kind, label };
});

// ── Types ─────────────────────────────────────────────────────────────
export type GanttCol  = 'neon' | 'jarrod';
export type GanttType = 'primary' | 'neon' | 'break' | 'offload';

export interface GanttQuota {
  label: string;
  value: string;
}

export interface GanttEvent {
  id:       string;
  name:     string;
  sh:       number;
  sm:       number;
  eh:       number;
  em:       number;
  col:      GanttCol;
  type:     GanttType;
  location: string;
  notes:    string;
  quota?:   GanttQuota[];
}

export type LanedEvent = GanttEvent & { lane: number; totalLanes: number };

// ── Helpers ───────────────────────────────────────────────────────────
export function toH(h: number, m: number): number {
  return h + m / 60;
}

export function topCss(sh: number, sm: number): string {
  return hpx((sh - START_HOUR) + sm / 60);
}

export function heightCss(sh: number, sm: number, eh: number, em: number): string {
  return hpx(Math.max((eh - sh) + (em - sm) / 60, 0.25)); // 15-min minimum
}

export function fmtTime(h: number, m: number): string {
  const hNorm = h % 24;                  // normalize to 0–23
  const h12   = hNorm % 12 || 12;       // convert to 1–12
  const ampm  = hNorm < 12 ? 'AM' : 'PM';
  return `${h12}:${String(m).padStart(2, '0')} ${ampm}`;
}

// ── Free-slot computation ────────────────────────────────────────────
// Returns the gaps (≥15 min) between event coverage within START_HOUR–END_HOUR.
export function freeSlots(evs: GanttEvent[]): Array<{ sh: number; sm: number; eh: number; em: number }> {
  const MIN_GAP = 0.25;
  const sorted = [...evs].sort((a, b) => toH(a.sh, a.sm) - toH(b.sh, b.sm));
  const slots: Array<{ sh: number; sm: number; eh: number; em: number }> = [];
  let cursor = START_HOUR;
  for (const ev of sorted) {
    const start = toH(ev.sh, ev.sm);
    if (start - cursor >= MIN_GAP) {
      const sh = Math.floor(cursor);
      const sm = Math.round((cursor - sh) * 60);
      const eh = Math.floor(start);
      const em = Math.round((start - eh) * 60);
      slots.push({ sh, sm, eh, em });
    }
    const end = toH(ev.eh, ev.em);
    if (end > cursor) cursor = end;
  }
  if (END_HOUR - cursor >= MIN_GAP) {
    const sh = Math.floor(cursor);
    const sm = Math.round((cursor - sh) * 60);
    slots.push({ sh, sm, eh: END_HOUR, em: 0 });
  }
  return slots;
}

// ── Lane assignment ───────────────────────────────────────────────────
// Greedy bin-packing so overlapping events share a column width rather
// than rendering on top of each other.
export function assignLanes(evs: GanttEvent[]): LanedEvent[] {
  const sorted = [...evs].sort((a, b) => toH(a.sh, a.sm) - toH(b.sh, b.sm));
  const laneEnd: number[] = [];
  const result: LanedEvent[] = sorted.map(ev => {
    const start = toH(ev.sh, ev.sm);
    const end   = toH(ev.eh, ev.em);
    let lane = laneEnd.findIndex(t => t <= start);
    if (lane === -1) lane = laneEnd.length;
    laneEnd[lane] = end;
    return { ...ev, lane, totalLanes: 1 };
  });
  // Second pass: resolve totalLanes from the widest overlap group
  for (const ev of result) {
    const s = toH(ev.sh, ev.sm), e = toH(ev.eh, ev.em);
    let maxLane = 0;
    for (const o of result) {
      if (toH(o.sh, o.sm) < e && toH(o.eh, o.em) > s) {
        maxLane = Math.max(maxLane, o.lane);
      }
    }
    ev.totalLanes = maxLane + 1;
  }
  return result;
}

// ── Static config ─────────────────────────────────────────────────────
export const DAYS = [
  { id: 'fri', label: 'Friday',   date: '17 Apr', sub: 'Day 1' },
  { id: 'sat', label: 'Saturday', date: '18 Apr', sub: 'Day 2' },
  { id: 'sun', label: 'Sunday',   date: '19 Apr', sub: 'Day 3' },
] as const;

export const COLUMNS = [
  { id: 'neon'   as GanttCol, label: 'Neon',   role: 'Photo',         dot: 'bg-cyan-400',   stripe: 'bg-cyan-950/20'   },
  { id: 'jarrod' as GanttCol, label: 'Jarrod', role: 'Photo + Video', dot: 'bg-violet-400', stripe: 'bg-violet-950/20' },
];

export const LEGEND_ITEMS = [
  { label: 'Primary event ⭐ (Full Coverage)',  bg: 'bg-amber-500/70',  border: 'border-amber-400/80'  },
  { label: 'Assigned event',    bg: 'bg-cyan-700/60',   border: 'border-cyan-500/60'   },
  { label: 'Break',             bg: 'bg-slate-700/60',  border: 'border-slate-500/50'  },
  { label: 'Offload window',    bg: 'bg-amber-900/60',  border: 'border-amber-600/60'  },
];
