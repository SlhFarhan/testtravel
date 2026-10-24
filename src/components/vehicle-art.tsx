import { cn } from "@/lib/cn";
import type { FleetTheme } from "@/lib/fleet";

const themes = {
  clay: {
    skyTop: "#fae7da",
    skyBottom: "#efc7ad",
    sun: "#e9a47d",
    hillFar: "#d9ab8e",
    hillNear: "#c48f6d",
    road: "#332a25",
    lane: "#f8e9d9",
    body: "#16232b",
    glass: "#f7eadb",
    rim: "#d9cebc",
    accent: "#c94f27",
  },
  sage: {
    skyTop: "#e9f0e7",
    skyBottom: "#c9dccf",
    sun: "#a9c3af",
    hillFar: "#a9c3b1",
    hillNear: "#87a897",
    road: "#24312f",
    lane: "#e8f0e6",
    body: "#142520",
    glass: "#eef4ee",
    rim: "#cfdacb",
    accent: "#27574b",
  },
  gold: {
    skyTop: "#f9eccd",
    skyBottom: "#eed7a4",
    sun: "#e2bb6d",
    hillFar: "#dcc294",
    hillNear: "#c6a474",
    road: "#322b22",
    lane: "#faf0d8",
    body: "#1d2429",
    glass: "#faf1dd",
    rim: "#e0d2b4",
    accent: "#c8922f",
  },
  ink: {
    skyTop: "#dfe7ea",
    skyBottom: "#b9c9d1",
    sun: "#9db4bf",
    hillFar: "#a9bcc4",
    hillNear: "#8ba3ad",
    road: "#1d272c",
    lane: "#e7eef0",
    body: "#101e26",
    glass: "#eef2f3",
    rim: "#c9d2d4",
    accent: "#3f6c7d",
  },
  sky: {
    skyTop: "#e2eef3",
    skyBottom: "#c3dee9",
    sun: "#a9cfdf",
    hillFar: "#aecbd8",
    hillNear: "#8db4c4",
    road: "#26333a",
    lane: "#e9f2f5",
    body: "#14242c",
    glass: "#eef4f7",
    rim: "#cfdadf",
    accent: "#2a6d8c",
  },
} satisfies Record<FleetTheme, Record<string, string>>;

const vanBody =
  "M8 102V32Q8 14 26 12L250 12Q268 12 282 24L312 56Q318 63 318 72V106Q318 116 306 116H20Q8 116 8 106Z";

const carBody =
  "M20 102V78Q20 68 30 64L82 34Q88 30 100 30H204Q218 30 228 40L270 76Q300 78 306 88Q310 94 310 100V104Q310 110 300 110H30Q20 110 20 102Z";

export function VehicleArt({
  theme = "clay",
  kind = "van",
  label,
  className,
}: {
  theme?: FleetTheme;
  kind?: "van" | "car";
  label?: string;
  className?: string;
}) {
  const t = themes[theme];
  const gradientId = `vehicle-sky-${theme}-${kind}`;
  const isVan = kind === "van";

  return (
    <svg
      viewBox="0 0 600 400"
      preserveAspectRatio="xMidYMid slice"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn("size-full", className)}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0.2" y2="1">
          <stop offset="0%" stopColor={t.skyTop} />
          <stop offset="100%" stopColor={t.skyBottom} />
        </linearGradient>
      </defs>

      <rect width="600" height="400" fill={`url(#${gradientId})`} />

      <circle cx="452" cy="112" r="52" fill={t.sun} opacity="0.85" />
      <circle cx="452" cy="112" r="74" fill={t.sun} opacity="0.18" />

      <g aria-hidden fill="none" stroke={t.body} strokeWidth="2.2" opacity="0.28" strokeLinecap="round">
        <path d="M348 84c7-8 16-8 23 0" />
        <path d="M382 62c5-6 12-6 17 0" />
      </g>

      <path
        d="M0 250C70 210 120 220 180 240C240 205 310 200 380 232C440 205 520 205 600 240V306H0Z"
        fill={t.hillFar}
        opacity="0.45"
      />
      <path
        d="M0 280C80 255 150 268 220 280C300 250 390 255 470 275C520 288 560 286 600 278V306H0Z"
        fill={t.hillNear}
        opacity="0.4"
      />

      <path d="M0 306H600V400H0Z" fill={t.road} />
      <path d="M0 306H600" stroke={t.lane} strokeWidth="2" opacity="0.3" />
      <path
        d="M-20 365H620"
        stroke={t.lane}
        strokeWidth="4"
        strokeDasharray="36 28"
        opacity="0.38"
      />
      <path d="M-20 394H620" stroke={t.lane} strokeWidth="2" opacity="0.12" />

      <ellipse
        cx={isVan ? 310 : 300}
        cy={isVan ? 318 : 312}
        rx="172"
        ry="12"
        fill="#0a1114"
        opacity="0.22"
      />

      <g
        transform={
          isVan ? "translate(140 182)" : "translate(135 172)"
        }
        fill={t.body}
      >
        <path d={isVan ? vanBody : carBody} />

        {isVan ? (
          <>
            <rect
              x="24"
              y="27"
              width="210"
              height="42"
              rx="6"
              fill={t.glass}
              opacity="0.94"
            />
            <path
              d="M78 27V69M132 27V69M186 27V69"
              stroke={t.body}
              strokeWidth="2.5"
              opacity="0.5"
            />
            <path
              d="M248 27H268L290 59H248Z"
              fill={t.glass}
              opacity="0.94"
            />
            <path
              d="M244 20V108"
              stroke={t.body}
              strokeWidth="2.5"
              opacity="0.45"
            />
            <path
              d="M10 90H302"
              stroke={t.accent}
              strokeWidth="4.5"
              opacity="0.9"
            />
            <rect
              x="300"
              y="82"
              width="11"
              height="12"
              rx="3"
              fill={t.accent}
            />
            <path
              d="M286 44L302 60"
              stroke={t.glass}
              strokeWidth="2"
              opacity="0.35"
            />
          </>
        ) : (
          <>
            <path
              d="M46 66L92 40Q97 37 105 37H198Q207 37 214 44L246 72Z"
              fill={t.glass}
              opacity="0.94"
            />
            <path
              d="M152 38V72M104 44L100 72"
              stroke={t.body}
              strokeWidth="2.5"
              opacity="0.5"
            />
            <path
              d="M144 66V108M230 70V110"
              stroke={t.body}
              strokeWidth="2"
              opacity="0.4"
            />
            <path
              d="M28 90H294"
              stroke={t.accent}
              strokeWidth="4.5"
              opacity="0.9"
            />
            <rect
              x="292"
              y="84"
              width="12"
              height="9"
              rx="3"
              fill={t.accent}
            />
            <path
              d="M232 44L262 74"
              stroke={t.glass}
              strokeWidth="2"
              opacity="0.35"
            />
          </>
        )}

        <Wheel cx={isVan ? 74 : 92} cy={isVan ? 116 : 108} rim={t.rim} />
        <Wheel cx={isVan ? 254 : 252} cy={isVan ? 116 : 108} rim={t.rim} />
      </g>
    </svg>
  );
}

function Wheel({ cx, cy, rim }: { cx: number; cy: number; rim: string }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r="26" fill="#0e1417" />
      <circle cx={cx} cy={cy} r="12" fill={rim} opacity="0.9" />
      <circle cx={cx} cy={cy} r="4.5" fill="#6c6a63" />
    </g>
  );
}
