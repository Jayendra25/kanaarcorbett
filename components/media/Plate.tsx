import Image from "next/image";
import { useId } from "react";
import type { SiteImage } from "@/lib/images";

export type Scene =
  | "facade"
  | "arch"
  | "room"
  | "suite"
  | "dining"
  | "banquet"
  | "conference"
  | "forest"
  | "river"
  | "pool"
  | "terrace";

type PlateProps = {
  scene: Scene;
  caption?: string;
  className?: string;
  ratio?: string;
  dark?: boolean;
  /** Real property photography; the original artwork shows when omitted. */
  image?: SiteImage;
  /** CSS object-position used to frame the photograph inside the plate. */
  imagePosition?: string;
  sizes?: string;
  priority?: boolean;
  alt?: string;
};

const ink = "#3d372e";
const line = { fill: "none", stroke: ink, strokeWidth: 1.15, opacity: 0.58 } as const;
const hair = { fill: "none", stroke: ink, strokeWidth: 0.9, opacity: 0.34 } as const;

const sky = "#f0e9dc";
const paper = "#e7dece";
const stone = "#dcd0bc";
const stoneMid = "#cfc0a9";
const stoneDeep = "#bcaa90";
const shadow = "#a9977d";
const gold = "#b99a67";
const sage = "#7f8068";
const sageLight = "#999a80";
const sageDeep = "#5f6350";

function Tree({
  x,
  y,
  s = 1,
  tone = sage,
  opacity = 1,
}: {
  x: number;
  y: number;
  s?: number;
  tone?: string;
  opacity?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={opacity}>
      <path d="M0 6 V-128" stroke="#695f51" strokeWidth="3.2" opacity="0.65" />
      <path
        d="M0 -34 C-40 -48 -54 -88 -32 -114 C-21 -128 -7 -136 0 -146 C9 -136 23 -128 33 -113 C53 -86 37 -49 0 -34Z"
        fill={tone}
      />
      <path d="M0 -118 C-8 -102 -9 -84 0 -64" {...hair} />
    </g>
  );
}

function Cypress({
  x,
  y,
  s = 1,
  tone = sageDeep,
  opacity = 1,
}: {
  x: number;
  y: number;
  s?: number;
  tone?: string;
  opacity?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={opacity}>
      <path
        d="M0 0 C-24 -58 -20 -134 0 -198 C20 -134 24 -58 0 0Z"
        fill={tone}
      />
      <path d="M0 -8 V-170" {...hair} />
    </g>
  );
}

function Birds({ x = 0, y = 0, scale = 1 }: { x?: number; y?: number; scale?: number }) {
  return (
    <g
      transform={`translate(${x} ${y}) scale(${scale})`}
      fill="none"
      stroke={ink}
      strokeWidth="1.4"
      opacity="0.4"
      strokeLinecap="round"
    >
      <path d="M0 0q8 -7 16 0" />
      <path d="M16 0q8 -7 16 0" />
      <path d="M48 22q6 -5 12 0" />
      <path d="M60 22q6 -5 12 0" />
    </g>
  );
}

/* -------------------------------------------------------------------------- */

export function Plate({
  scene,
  caption,
  className = "",
  ratio,
  dark = false,
  image,
  imagePosition,
  sizes,
  priority,
  alt,
}: PlateProps) {
  const uid = useId().replace(/[:]/g, "");
  const sid = `p${uid}`;

  const content = (() => {
    switch (scene) {
      case "facade":
        return (
          <>
            <defs>
              <linearGradient id={`${sid}-sky`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#f6f0e4" />
                <stop offset="0.58" stopColor="#ecdfcd" />
                <stop offset="1" stopColor="#deceb7" />
              </linearGradient>
              <radialGradient id={`${sid}-warm`}>
                <stop offset="0" stopColor="#d7b37a" stopOpacity="0.45" />
                <stop offset="1" stopColor="#d7b37a" stopOpacity="0" />
              </radialGradient>
              <pattern
                id={`${sid}-jali`}
                width="26"
                height="26"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M13 1 25 13 13 25 1 13Z"
                  fill="none"
                  stroke={ink}
                  strokeWidth="0.55"
                  opacity="0.4"
                />
                <circle cx="13" cy="13" r="1.5" fill={ink} opacity="0.35" />
              </pattern>
            </defs>

            <rect width="800" height="1000" fill={`url(#${sid}-sky)`} />
            <circle cx="596" cy="196" r="82" fill={gold} opacity="0.2" />
            <circle cx="596" cy="196" r="54" fill={gold} opacity="0.2" />
            <path
              d="M0 560 C110 512 210 540 310 514 C430 482 540 516 660 494 C724 482 772 488 800 480 V1000 H0Z"
              fill={paper}
              opacity="0.7"
            />
            <path
              d="M0 624 C130 588 244 612 370 584 C500 554 630 588 800 560 V1000 H0Z"
              fill={stone}
              opacity="0.55"
            />
            <Birds x={276} y={190} scale={1.05} />

            <Tree x={214} y={706} s={2.1} tone={sageDeep} opacity={0.5} />
            <Tree x={612} y={696} s={2.35} tone={sageDeep} opacity={0.52} />
            <Cypress x={142} y={720} s={1.7} tone={sage} opacity={0.7} />
            <Cypress x={672} y={724} s={1.8} tone={sage} opacity={0.7} />

            {/* Principal elevation */}
            <path d="M150 884 V428 H650 V884Z" fill="#e8ddca" />
            <path d="M150 884 V428 H258 V884Z" fill="#e2d6c1" opacity="0.55" />
            <path d="M150 428 H650 V408 H150Z" fill={stoneMid} />
            <path d="M138 408 H662 M138 428 H662" {...line} />
            <path d="M150 458 H650 M150 472 H650" {...hair} />

            {/* Chhatri / rooftop pavilion */}
            <path d="M366 408 V378 H434 V408Z" fill="#e3d6c1" />
            <path d="M348 378 H452" {...line} />
            <path
              d="M368 378 C368 348 380 330 400 318 C420 330 432 348 432 378Z"
              fill={stoneMid}
              stroke={ink}
              strokeWidth="1.1"
              opacity="0.92"
            />
            <path d="M400 318 V298" {...line} />
            <circle cx="400" cy="293" r="5" fill="none" stroke={gold} strokeWidth="1.5" />
            <path d="M372 388 H428 M384 398 H416" {...hair} />

            {/* Jali texture band */}
            <rect
              x="160"
              y="462"
              width="480"
              height="54"
              fill={`url(#${sid}-jali)`}
              opacity="0.65"
            />

            {/* Arcade — central arch */}
            <path
              d="M324 884 V650 C324 598 356 558 400 534 C444 558 476 598 476 650 V884Z"
              fill="#c8b69c"
              opacity="0.72"
            />
            <path
              d="M324 884 V650 C324 598 356 558 400 534 C444 558 476 598 476 650 V884"
              stroke={ink}
              strokeWidth="1.7"
              opacity="0.62"
              fill="none"
            />
            <path
              d="M342 884 V658 C342 614 368 580 400 560 C432 580 458 614 458 658 V884"
              {...hair}
            />
            <path d="M400 534 V884" {...hair} opacity="0.2" />
            <circle cx="400" cy="608" r="4" fill={gold} opacity="0.9" />
            <path d="M340 700 H460 M340 812 H460" {...hair} opacity="0.22" />
            <path d="M400 858 V830 M368 858 V840 M432 858 V840" {...hair} opacity="0.3" />

            {/* Arcade — side arches */}
            {[
              { x: 194, w: 104, apex: 584 },
              { x: 502, w: 104, apex: 584 },
            ].map((a, i) => (
              <g key={i}>
                <path
                  d={`M${a.x} 884 V664 C${a.x} 626 ${a.x + a.w * 0.28} ${a.apex} ${
                    a.x + a.w / 2
                  } ${a.apex - 18} C${a.x + a.w * 0.72} ${a.apex} ${a.x + a.w} 626 ${
                    a.x + a.w
                  } 664 V884Z`}
                  fill="#d4c4ab"
                  opacity="0.55"
                />
                <path
                  d={`M${a.x} 884 V664 C${a.x} 626 ${a.x + a.w * 0.28} ${a.apex} ${
                    a.x + a.w / 2
                  } ${a.apex - 18} C${a.x + a.w * 0.72} ${a.apex} ${a.x + a.w} 626 ${
                    a.x + a.w
                  } 664 V884`}
                  {...line}
                  strokeWidth={1.4}
                />
                <path
                  d={`M${a.x + 14} 884 V672 C${a.x + 14} 642 ${a.x + a.w * 0.34} ${
                    a.apex + 10
                  } ${a.x + a.w / 2} ${a.apex - 2} C${a.x + a.w * 0.66} ${a.apex + 10} ${
                    a.x + a.w - 14
                  } 642 ${a.x + a.w - 14} 672 V884`}
                  {...hair}
                />
                <circle cx={a.x + a.w / 2} cy={a.apex + 48} r="3.5" fill={gold} opacity="0.8" />
              </g>
            ))}

            {/* Pilasters and columns */}
            {[178, 308, 492, 622].map((x) => (
              <g key={x}>
                <path d={`M${x} 884 V462`} {...hair} opacity="0.4" />
                <path d={`M${x - 6} 486 H${x + 6} M${x - 8} 874 H${x + 8}`} {...hair} opacity="0.45" />
              </g>
            ))}
            <path d="M150 884 H650 M160 900 H640" {...line} />

            {/* Warmth at the threshold */}
            <circle cx="400" cy="824" r="136" fill={`url(#${sid}-warm)`} />
            <path d="M382 884 V844 H418 V884" fill="#bda98d" opacity="0.5" />
            <path d="M382 844 H418" {...hair} />

            {/* Steps */}
            <path d="M122 900 H678 V918 H122Z" fill={stoneDeep} opacity="0.55" />
            <path d="M102 918 H698 V936 H102Z" fill={stoneDeep} opacity="0.4" />
            <path d="M84 936 H716 V952 H84Z" fill={shadow} opacity="0.32" />
            <path d="M70 952 H730" {...line} />

            {/* Garden front */}
            <path
              d="M0 968 C90 936 160 950 244 938 C338 924 404 942 486 934 C576 924 650 942 800 930 V1000 H0Z"
              fill={sageLight}
              opacity="0.5"
            />
            <Cypress x={70} y={1008} s={2.1} tone={sageDeep} opacity={0.75} />
            <Cypress x={738} y={1008} s={2.2} tone={sageDeep} opacity={0.78} />
            <path d="M300 968 C330 952 360 960 390 950 M470 956 C500 944 536 950 566 940" {...hair} opacity="0.3" />
            <ellipse cx="400" cy="964" rx="330" ry="26" fill={shadow} opacity="0.18" />
          </>
        );

      case "arch":
        return (
          <>
            <rect width="800" height="1000" fill="#ded4c3" />
            <rect x="0" y="0" width="800" height="1000" fill="none" />
            {/* garden seen through the arch */}
            <path d="M212 838 V470 C212 356 300 268 400 212 C500 268 588 356 588 470 V838Z" fill={`url(#${sid}-garden)`} />
            <circle cx="470" cy="420" r="58" fill={gold} opacity="0.3" />
            <path d="M212 640 C268 612 318 626 360 606 C420 578 482 600 588 570 V838 H212Z" fill={sageLight} opacity="0.6" />
            <path d="M212 700 C288 668 352 690 424 660 C490 632 538 650 588 634 V838 H212Z" fill={sage} opacity="0.55" />
            <Tree x={310} y={712} s={1.4} tone={sageDeep} opacity={0.9} />
            <Tree x={500} y={690} s={1.15} tone={sage} opacity={0.85} />
            <path d="M212 820 C270 796 330 812 400 796 C470 780 534 800 588 786 V838 H212Z" fill={sageDeep} opacity="0.3" />
            <Birds x={410} y={330} scale={0.9} />

            {/* stone wall */}
            <path
              d="M0 0 H800 V1000 H0Z M212 838 V470 C212 356 300 268 400 212 C500 268 588 356 588 470 V838Z"
              fill="#e8e0d2"
              fillRule="evenodd"
            />
            <path
              d="M212 838 V470 C212 356 300 268 400 212 C500 268 588 356 588 470 V838"
              stroke={ink}
              strokeWidth="2"
              opacity="0.5"
              fill="none"
            />
            <path
              d="M238 838 V478 C238 378 314 296 400 248 C486 296 562 378 562 478 V838"
              {...hair}
            />
            <path d="M178 838 V462 C178 334 280 236 400 170 C520 236 622 334 622 462 V838" {...hair} />
            <path d="M0 868 H800 M0 892 H800" {...hair} />
            <path d="M188 868 V838 M612 868 V838" {...line} />
            <path d="M0 900 H800" stroke={ink} strokeWidth="1.4" opacity="0.3" fill="none" />
            <path d="M280 900 V960 M520 960 V900" {...hair} />

            {/* plant */}
            <path d="M92 1000 V880 L152 892 V1000Z" fill={stoneDeep} opacity="0.7" />
            <path d="M122 884 V810 M122 856 C96 834 92 806 104 788 M122 840 C150 820 158 792 146 772 M122 818 C102 800 100 780 108 764" stroke={sageDeep} strokeWidth="2" fill="none" opacity="0.7" />
            <ellipse cx="122" cy="884" rx="30" ry="10" fill={stoneDeep} opacity="0.7" />
            <ellipse cx="400" cy="900" rx="180" ry="18" fill={shadow} opacity="0.35" />
            <defs>
              <linearGradient id={`${sid}-garden`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#f4efe5" />
                <stop offset="0.55" stopColor="#e8e0d1" />
                <stop offset="1" stopColor="#d5c8b3" />
              </linearGradient>
            </defs>
          </>
        );

      case "room":
        return (
          <>
            <rect width="800" height="1000" fill="#eee8dc" />
            <path d="M0 780 H800 V1000 H0Z" fill="#d9cdb9" opacity="0.62" />
            <path d="M0 780 H800" {...hair} />
            {/* window */}
            <path d="M500 780 V430 C500 344 552 280 620 246 C688 280 740 344 740 430 V780Z" fill="#e6ddce" />
            <path d="M500 780 V430 C500 344 552 280 620 246 C688 280 740 344 740 430 V780" {...line} strokeWidth={1.6} />
            <path d="M620 250 V780 M500 540 H740" {...hair} />
            <path d="M540 760 V440 C540 370 580 318 620 292 C660 318 700 370 700 440 V760Z" fill="#f6f2e9" />
            <circle cx="650" cy="430" r="34" fill={gold} opacity="0.22" />
            <path d="M540 640 C578 618 610 632 660 610 C680 602 692 604 700 606 V760 H540Z" fill={sageLight} opacity="0.55" />
            <path d="M590 620 C590 596 600 578 620 566 M620 620 V566" stroke={sageDeep} strokeWidth="2" fill="none" opacity="0.5" />
            <path d="M476 780 V420 M764 780 V420" stroke={stoneDeep} strokeWidth="3" opacity="0.7" />
            <path d="M476 440 H764" {...hair} />
            <path d="M500 780 V430 M740 780 V430" stroke={ink} strokeWidth="1" opacity="0.2" />

            {/* curtain */}
            <path d="M478 420 C466 520 490 620 462 800 L520 800 C506 660 520 540 512 420Z" fill="#f7f2e8" opacity="0.9" />
            <path d="M762 420 C774 520 750 620 778 800 L720 800 C734 660 720 540 728 420Z" fill="#f7f2e8" opacity="0.9" />
            <path d="M492 440 C486 540 502 660 484 800 M746 430 C752 540 738 660 756 800" {...hair} />

            {/* bed */}
            <path d="M60 580 H420 V780 H60Z" fill="#e3d8c6" />
            <path d="M60 560 H420 V600 H60Z" fill={stoneDeep} opacity="0.55" />
            <path d="M60 580 V540 C60 520 76 506 96 506 H384 C404 506 420 520 420 540 V580" fill="#f3ede2" stroke={ink} strokeWidth="1.2" opacity="0.95" />
            <path d="M90 556 C90 542 102 532 118 532 H180 C196 532 208 542 208 556 V600 H90Z" fill="#fbf8f2" stroke={ink} strokeWidth="0.9" opacity="0.8" />
            <path d="M236 556 C236 542 248 532 264 532 H326 C342 532 354 542 354 556 V600 H236Z" fill="#fbf8f2" stroke={ink} strokeWidth="0.9" opacity="0.8" />
            <path d="M60 660 H420 V780 H60Z" fill="#f5f0e7" />
            <path d="M60 690 C160 676 300 676 420 690 V730 C300 716 160 716 60 730Z" fill={stoneDeep} opacity="0.45" />
            <path d="M60 740 C160 726 300 726 420 740 V780 C300 766 160 766 60 780Z" fill="#dfd3c1" opacity="0.8" />
            <path d="M60 780 H420 M60 660 H420" {...hair} />
            <path d="M60 600 V780 M420 600 V780" {...hair} />
            <path d="M0 820 H470" stroke={ink} strokeWidth="1" opacity="0.2" />

            {/* side table + lamp */}
            <path d="M440 780 V720 H490 V780" fill={stoneDeep} opacity="0.6" />
            <path d="M465 720 V660" stroke={ink} strokeWidth="1.6" opacity="0.5" />
            <path d="M438 660 H492 L484 622 H446Z" fill="#f5efe3" stroke={ink} strokeWidth="1" opacity="0.75" />
            <circle cx="465" cy="622" r="2.5" fill={gold} />
            <ellipse cx="280" cy="810" rx="250" ry="26" fill={shadow} opacity="0.28" />
            <path d="M0 900 H800" {...hair} />
            <path d="M60 940 H420 M500 940 H760" {...hair} />
          </>
        );

      case "suite":
        return (
          <>
            <rect width="800" height="1000" fill="#ece6da" />
            <path d="M0 760 H800 V1000 H0Z" fill="#d6cab7" opacity="0.6" />
            {/* arched window */}
            <path d="M290 760 V440 C290 348 356 278 430 244 C504 278 570 348 570 440 V760Z" fill="#e8e0d1" />
            <path d="M290 760 V440 C290 348 356 278 430 244 C504 278 570 348 570 440 V760" {...line} strokeWidth={1.6} />
            <path d="M330 760 V450 C330 374 372 318 430 286 C488 318 530 374 530 450 V760Z" fill="#f7f3ea" />
            <path d="M430 286 V760 M330 500 H530" {...hair} />
            <circle cx="480" cy="420" r="28" fill={gold} opacity="0.25" />
            <path d="M330 620 C380 598 428 614 480 596 C500 590 518 592 530 594 V760 H330Z" fill={sageLight} opacity="0.55" />
            <path d="M270 760 V432 C270 326 346 244 430 204 C514 244 590 326 590 432 V760" {...hair} />

            {/* sofa */}
            <path d="M70 660 H290 V790 H70Z" fill="#e2d6c4" />
            <path d="M70 620 V580 C70 558 88 542 110 542 H250 C272 542 290 558 290 580 V620" fill="#f2ece1" stroke={ink} strokeWidth="1.2" opacity="0.9" />
            <path d="M96 604 H170 V680 H96Z" fill="#faf7f0" stroke={ink} strokeWidth="0.8" opacity="0.7" />
            <path d="M190 604 H264 V680 H190Z" fill="#faf7f0" stroke={ink} strokeWidth="0.8" opacity="0.7" />
            <path d="M70 700 H290 V790 H70Z" fill="#ebe2d4" />
            <path d="M70 700 H290" {...hair} />
            <path d="M70 790 V820 M290 790 V820" stroke={ink} strokeWidth="1.5" opacity="0.4" />

            {/* coffee table */}
            <ellipse cx="380" cy="842" rx="120" ry="24" fill="#e9e0d1" stroke={ink} strokeWidth="1" opacity="0.8" />
            <path d="M300 842 V900 M460 842 V900" stroke={ink} strokeWidth="1.6" opacity="0.5" />
            <ellipse cx="380" cy="858" rx="104" ry="18" fill={shadow} opacity="0.2" />
            <path d="M356 830 H396 V842 L386 858 H366 L356 842Z" fill={gold} opacity="0.4" />
            <path d="M356 830 C348 830 344 836 348 840 M396 830 C404 830 408 836 404 840" stroke={ink} strokeWidth="1" opacity="0.4" fill="none" />

            {/* floor lamp */}
            <path d="M690 860 V590" stroke={ink} strokeWidth="2" opacity="0.5" />
            <path d="M662 590 H718 L704 520 H676Z" fill="#f6f1e7" stroke={ink} strokeWidth="1" opacity="0.8" />
            <path d="M670 860 H710" stroke={ink} strokeWidth="2" opacity="0.45" />
            <circle cx="690" cy="558" r="36" fill={gold} opacity="0.08" />

            {/* art + plant */}
            <path d="M620 320 H720 V430 H620Z" fill="#e9e1d3" stroke={ink} strokeWidth="1.2" opacity="0.8" />
            <path d="M646 400 C662 372 684 386 694 360" {...hair} />
            <path d="M60 860 V800 L100 806 V860" fill={stoneDeep} opacity="0.6" />
            <path d="M80 804 V740 M80 780 C58 766 54 738 68 724 M80 766 C104 748 110 720 96 706" stroke={sageDeep} strokeWidth="2" fill="none" opacity="0.65" />
            <ellipse cx="380" cy="940" rx="340" ry="40" fill={shadow} opacity="0.18" />
          </>
        );

      case "dining":
        return (
          <>
            <rect width="800" height="1000" fill="#ece6da" />
            <path d="M0 0 H800 V1000 H0Z" fill="#e8e1d4" opacity="0.4" />
            {/* back arches */}
            <path d="M120 760 V470 C120 392 174 334 236 306 C298 334 352 392 352 470 V760Z" fill="#f4efe5" />
            <path d="M120 760 V470 C120 392 174 334 236 306 C298 334 352 392 352 470 V760" {...line} />
            <path d="M448 760 V470 C448 392 502 334 564 306 C626 334 680 392 680 470 V760Z" fill="#f4efe5" />
            <path d="M448 760 V470 C448 392 502 334 564 306 C626 334 680 392 680 470 V760" {...line} />
            <path d="M156 760 V482 C156 420 190 376 236 352 C282 376 316 420 316 482 V760Z" fill="#faf6ee" />
            <path d="M484 760 V482 C484 420 518 376 564 352 C610 376 644 420 644 482 V760Z" fill="#faf6ee" />
            <path d="M236 352 V760 M564 352 V760" {...hair} />
            <circle cx="236" cy="470" r="38" fill={gold} opacity="0.1" />
            <circle cx="564" cy="470" r="38" fill={gold} opacity="0.1" />
            <path d="M70 760 V430 M730 760 V430" stroke={stoneDeep} strokeWidth="2.5" opacity="0.6" />
            <path d="M70 430 H160 M640 430 H730" {...hair} />

            {/* pendants */}
            {[236, 400, 564].map((x, i) => (
              <g key={i}>
                <path d={`M${x} 0 V${i === 1 ? 250 : 220}`} stroke={ink} strokeWidth="1.2" opacity="0.35" />
                <path d={`M${x - 30} ${i === 1 ? 250 : 220} H${x + 30} L${x + 18} ${i === 1 ? 292 : 262} H${x - 18}Z`} fill="#f6f1e6" stroke={ink} strokeWidth="1" opacity="0.8" />
                <circle cx={x} cy={i === 1 ? 270 : 240} r="3" fill={gold} />
              </g>
            ))}

            {/* chairs behind table */}
            <g opacity="0.8">
              <path d="M150 820 V720 H190 V820 M150 760 H190" fill="none" stroke={ink} strokeWidth="2" opacity="0.4" />
              <path d="M610 820 V720 H650 V820 M610 760 H650" fill="none" stroke={ink} strokeWidth="2" opacity="0.4" />
            </g>

            {/* table */}
            <path d="M60 830 H740 V864 H60Z" fill="#e3d8c6" stroke={ink} strokeWidth="1.2" opacity="0.9" />
            <path d="M90 864 H710" stroke={ink} strokeWidth="1" opacity="0.3" />
            <ellipse cx="400" cy="828" rx="330" ry="46" fill="#f7f2e8" />
            <ellipse cx="400" cy="828" rx="330" ry="46" fill="none" stroke={ink} strokeWidth="1" opacity="0.25" />
            <ellipse cx="400" cy="826" rx="200" ry="80" fill={gold} opacity="0.06" />

            {/* table settings */}
            {[190, 330, 470, 610].map((x, i) => (
              <g key={i}>
                <ellipse cx={x} cy={806} rx="38" ry="12" fill="#fdfbf6" stroke={ink} strokeWidth="0.9" opacity="0.9" />
                <ellipse cx={x} cy={803} rx="24" ry="7" fill="#ebe2d3" />
                <path d={`M${x + 46} 790 V820 M${x + 46} 790 C${x + 52} 796 ${x + 52} 804 ${x + 46} 810`} stroke={ink} strokeWidth="1.1" opacity="0.4" fill="none" />
                <path d={`M${x - 58} 820 l14 -24 M${x - 58} 820 l14 0`} stroke={ink} strokeWidth="1" opacity="0.35" />
              </g>
            ))}
            <path d="M400 780 V710 M382 710 H418 L410 694 H390Z" fill={gold} opacity="0.35" />
            <path d="M400 770 C380 762 374 744 382 730 M400 758 C420 748 426 732 418 718" stroke={sageDeep} strokeWidth="1.5" fill="none" opacity="0.5" />

            {/* foreground chairs */}
            <path d="M120 1000 V900 C120 878 138 862 160 862 C182 862 200 878 200 900 V1000" fill="#ddd1bf" opacity="0.85" />
            <path d="M600 1000 V900 C600 878 618 862 640 862 C662 862 680 878 680 900 V1000" fill="#ddd1bf" opacity="0.85" />
            <ellipse cx="400" cy="930" rx="360" ry="50" fill={shadow} opacity="0.18" />
            <path d="M0 960 H800" {...hair} />
          </>
        );

      case "banquet":
        return (
          <>
            <rect width="800" height="1000" fill="#ddd2c1" />
            <rect width="800" height="1000" fill="#efe8dc" opacity="0.32" />
            {/* stage */}
            <path d="M110 700 V420 H690 V700Z" fill="#e7dece" />
            <path d="M270 700 V500 C270 430 326 376 400 350 C474 376 530 430 530 500 V700Z" fill="#f6f1e7" />
            <path d="M270 700 V500 C270 430 326 376 400 350 C474 376 530 430 530 500 V700" {...line} strokeWidth={1.5} />
            <path d="M306 700 V510 C306 452 348 406 400 384 C452 406 494 452 494 510 V700Z" fill={gold} opacity="0.1" />
            <path d="M400 350 V700 M270 540 H530" {...hair} />
            <path d="M110 420 H690 M96 404 H704" {...hair} />
            <path d="M130 700 H670" {...hair} />
            <path d="M400 700 V730 M330 730 H470" stroke={ink} strokeWidth="1.2" opacity="0.35" fill="none" />

            {/* chandeliers */}
            {[190, 400, 610].map((x, i) => (
              <g key={i}>
                <path d={`M${x} 0 V${i === 1 ? 200 : 170}`} stroke={ink} strokeWidth="1" opacity="0.3" />
                <path d={`M${x - 46} ${i === 1 ? 200 : 170} H${x + 46}`} stroke={gold} strokeWidth="1.2" fill="none" opacity="0.8" />
                <path
                  d={`M${x - 46} ${i === 1 ? 200 : 170} l12 26 M${x - 22} ${i === 1 ? 200 : 170} l6 32 M${x} ${i === 1 ? 200 : 170} v34 M${x + 22} ${i === 1 ? 200 : 170} l-6 32 M${x + 46} ${i === 1 ? 200 : 170} l-12 26`}
                  stroke={gold}
                  strokeWidth="1"
                  opacity="0.7"
                />
                {[-46, -22, 0, 22, 46].map((d, j) => (
                  <circle
                    key={j}
                    cx={x + d}
                    cy={(i === 1 ? 200 : 170) + [26, 32, 34, 32, 26][j]}
                    r="2.6"
                    fill={gold}
                  />
                ))}
                <circle cx={x} cy={(i === 1 ? 200 : 170) - 8} r="3" fill={gold} opacity="0.8" />
              </g>
            ))}

            {/* draped fabric */}
            <path d="M110 420 C160 460 150 540 118 620 M690 420 C640 460 650 540 682 620" stroke={ink} strokeWidth="1" fill="none" opacity="0.14" />
            <path d="M140 420 C176 470 170 560 146 660 M660 420 C624 470 630 560 654 660" stroke={ink} strokeWidth="1" fill="none" opacity="0.12" />

            {/* round tables */}
            <g>
              {[
                { x: 170, y: 790, r: 90 },
                { x: 400, y: 830, r: 110 },
                { x: 640, y: 780, r: 86 },
              ].map((t, i) => (
                <g key={i}>
                  <ellipse cx={t.x} cy={t.y + 10} rx={t.r + 6} ry={t.r * 0.3 + 6} fill={shadow} opacity="0.2" />
                  <ellipse cx={t.x} cy={t.y} rx={t.r} ry={t.r * 0.28} fill="#f8f4ea" stroke={ink} strokeWidth="1" opacity="0.95" />
                  <path d={`M${t.x - t.r + 30} ${t.y} C${t.x - t.r + 30} ${t.y + 60} ${t.x - 20} ${t.y + 100} ${t.x} ${t.y + 110}`} stroke={ink} strokeWidth="1" opacity="0.14" fill="none" />
                  <ellipse cx={t.x} cy={t.y - 2} rx={t.r * 0.55} ry={t.r * 0.16} fill="#ebe2d3" opacity="0.8" />
                  <path d={`M${t.x} ${t.y + 4} V${t.y + 60} M${t.x - 30} ${t.y + 60} H${t.x + 30}`} stroke={ink} strokeWidth="1.4" opacity="0.22" />
                  <circle cx={t.x} cy={t.y - 8} r="4" fill={gold} opacity="0.7" />
                </g>
              ))}
            </g>
            {/* chairs */}
            {[
              [60, 880],
              [280, 900],
              [540, 890],
              [740, 860],
            ].map(([x, y], i) => (
              <g key={i}>
                <path d={`M${x} ${y} V${y + 80}`} stroke={ink} strokeWidth="1.2" opacity="0.25" />
                <path d={`M${x - 24} ${y + 40} H${x + 24}`} stroke={ink} strokeWidth="1.2" opacity="0.25" />
                <path d={`M${x - 24} ${y + 40} V${y + 60} M${x + 24} ${y + 40} V${y + 60}`} stroke={ink} strokeWidth="1.2" opacity="0.25" />
              </g>
            ))}
            <path d="M0 990 H800" {...hair} />
            <ellipse cx="400" cy="600" rx="300" ry="220" fill={gold} opacity="0.04" />
          </>
        );

      case "conference":
        return (
          <>
            <rect width="800" height="1000" fill="#e9e3d7" />
            <path d="M0 760 H800 V1000 H0Z" fill="#d7cbb8" opacity="0.5" />
            {/* screen */}
            <path d="M120 240 H680 V520 H120Z" fill="#e2d8c8" stroke={ink} strokeWidth="1.2" opacity="0.8" />
            <path d="M136 256 H664 V504 H136Z" fill="#f6f2e9" />
            <path d="M180 320 H480 M180 352 H420 M180 420 C260 392 330 410 400 388 C460 370 520 384 580 372" stroke={gold} strokeWidth="1.4" fill="none" opacity="0.45" />
            <path d="M400 520 V552 M320 552 H480" stroke={ink} strokeWidth="1.4" opacity="0.3" fill="none" />
            {/* windows */}
            <path d="M0 560 V320 H90 V560Z M710 560 V320 H800 V560Z" fill="#f1ebe0" />
            {/* ceiling lights */}
            {[220, 400, 580].map((x, i) => (
              <g key={i}>
                <path d={`M${x} 0 V90`} stroke={ink} strokeWidth="1" opacity="0.3" />
                <path d={`M${x - 54} 90 H${x + 54}`} stroke={ink} strokeWidth="2" opacity="0.4" />
                <path d={`M${x - 54} 98 H${x + 54}`} stroke={gold} strokeWidth="1" opacity="0.4" />
                <ellipse cx={x} cy="150" rx="70" ry="26" fill={gold} opacity="0.06" />
              </g>
            ))}
            {/* table */}
            <path d="M110 700 H690 V740 H110Z" fill="#e1d5c3" stroke={ink} strokeWidth="1.2" opacity="0.85" />
            <ellipse cx="400" cy="700" rx="290" ry="34" fill="#f8f4ea" />
            <path d="M150 740 V810 M650 740 V810" stroke={ink} strokeWidth="2" opacity="0.35" />
            {/* chairs */}
            {[170, 260, 350, 440, 530, 620].map((x, i) => (
              <g key={i}>
                <path d={`M${x} 660 C${x} 634 ${x + 12} 620 ${x + 26} 620 C${x + 40} 620 ${x + 52} 634 ${x + 52} 660`} fill="#ddd1bf" stroke={ink} strokeWidth="1" opacity="0.65" />
                <path d={`M${x + 26} 700 V790`} stroke={ink} strokeWidth="1.2" opacity="0.25" />
              </g>
            ))}
            {/* notepads */}
            {[250, 400, 550].map((x, i) => (
              <g key={i}>
                <rect x={x - 26} y="684" width="52" height="16" fill="#fdfbf6" stroke={ink} strokeWidth="0.8" opacity="0.8" />
                <path d={`M${x - 18} 692 H${x + 18}`} stroke={ink} strokeWidth="0.8" opacity="0.2" />
                <circle cx={x + 44} cy="692" r="4" fill={gold} opacity="0.4" />
              </g>
            ))}
            {/* plant */}
            <path d="M726 850 V800 L766 806 V850" fill={stoneDeep} opacity="0.55" />
            <path d="M746 804 V748 M746 790 C724 776 720 750 734 736 M746 776 C770 758 776 730 762 716" stroke={sageDeep} strokeWidth="2" fill="none" opacity="0.6" />
            <ellipse cx="400" cy="930" rx="330" ry="34" fill={shadow} opacity="0.16" />
          </>
        );

      case "forest":
        return (
          <>
            <rect width="800" height="1000" fill="#efe9de" />
            <circle cx="520" cy="330" r="108" fill={gold} opacity="0.16" />
            <circle cx="520" cy="330" r="64" fill={gold} opacity="0.14" />
            <path d="M0 480 C90 430 180 452 268 420 C390 376 480 412 590 386 C680 364 748 380 800 366 V1000 H0Z" fill="#d8d4c2" opacity="0.7" />
            <path d="M0 570 C120 522 208 556 320 520 C440 482 540 522 660 494 C724 480 770 490 800 484 V1000 H0Z" fill="#c3c3ac" opacity="0.65" />
            <path d="M0 660 C100 620 210 648 330 616 C450 584 560 620 680 594 C738 582 774 588 800 584 V1000 H0Z" fill="#a9aa91" opacity="0.55" />
            {/* mist bands */}
            <path d="M0 520 C140 500 250 526 380 508 C520 488 650 514 800 492 V540 C650 560 520 536 380 556 C250 574 140 548 0 568Z" fill="#f6f1e7" opacity="0.55" />
            <path d="M0 610 C120 590 260 614 400 596 C540 578 660 604 800 584 V614 C660 632 540 608 400 626 C260 644 120 620 0 640Z" fill="#f6f1e7" opacity="0.4" />
            {/* trees */}
            <Tree x={120} y={760} s={1.9} tone={sage} opacity={0.55} />
            <Tree x={250} y={780} s={1.4} tone={sage} opacity={0.5} />
            <Tree x={660} y={780} s={2.2} tone={sage} opacity={0.55} />
            <Tree x={550} y={800} s={1.5} tone={sage} opacity={0.5} />
            <Tree x={60} y={920} s={2.6} tone={sageDeep} opacity={0.9} />
            <Tree x={720} y={940} s={2.8} tone={sageDeep} opacity={0.92} />
            <Tree x={200} y={960} s={2.1} tone={sageDeep} opacity={0.75} />
            <Tree x={590} y={980} s={2.2} tone={sageDeep} opacity={0.8} />
            <Birds x={300} y={260} scale={1.2} />
            <Birds x={600} y={210} scale={0.8} />
            {/* foreground grasses */}
            <path d="M0 1000 C60 950 120 940 190 954 M0 1000 C84 970 140 968 210 984 M800 1000 C740 946 680 938 610 952 M800 1000 C716 968 660 968 590 984" stroke={sageDeep} strokeWidth="3" fill="none" opacity="0.35" />
            <ellipse cx="400" cy="960" rx="420" ry="80" fill={sageDeep} opacity="0.12" />
          </>
        );

      case "river":
        return (
          <>
            <rect width="800" height="1000" fill="#f1ece1" />
            <circle cx="590" cy="270" r="86" fill={gold} opacity="0.2" />
            <path d="M0 470 C130 426 220 458 330 428 C450 394 560 424 680 404 C736 394 772 400 800 392 V1000 H0Z" fill="#d5d3be" opacity="0.75" />
            <path d="M0 560 C110 522 210 550 340 522 C470 492 590 526 800 494 V660 H0Z" fill="#bfc0a6" opacity="0.6" />
            <Birds x={250} y={250} scale={1.1} />
            <Tree x={100} y={640} s={1.5} tone={sage} opacity={0.85} />
            <Tree x={690} y={626} s={1.7} tone={sage} opacity={0.8} />
            <Cypress x={180} y={660} s={1.3} />
            <Cypress x={620} y={654} s={1.4} />
            {/* river */}
            <path d="M0 760 C120 700 260 700 400 736 C540 772 660 728 800 692 V1000 H0Z" fill="#d9d5c2" />
            <path d="M0 800 C140 744 250 742 390 776 C530 810 660 766 800 732 V1000 H0Z" fill="#c5c6ac" opacity="0.55" />
            {/* water ripples */}
            {Array.from({ length: 11 }).map((_, i) => (
              <path
                key={i}
                d={`M${-40 + (i % 3) * 40} ${790 + i * 18} C${180 + i * 22} ${774 + i * 18} ${340 + i * 8} ${806 + i * 18} ${520 + i * 10} ${792 + i * 18} C${640 + i * 4} ${782 + i * 18} ${720} ${796 + i * 18} 840 ${788 + i * 18}`}
                fill="none"
                stroke="#f8f3e9"
                strokeWidth="1.4"
                opacity={0.5 - i * 0.02}
              />
            ))}
            <path d="M0 900 C120 872 220 890 330 872 C460 850 540 874 660 858 C740 848 780 854 800 850 V900 H0Z" fill="#e5ddcd" opacity="0.6" />
            <path d="M0 1000 C130 960 250 986 400 964 C550 942 680 976 800 954 V1000Z" fill="#b1b096" opacity="0.28" />
          </>
        );

      case "pool":
        return (
          <>
            <rect width="800" height="1000" fill="#f0eade" />
            <circle cx="650" cy="200" r="74" fill={gold} opacity="0.2" />
            {/* building behind */}
            <path d="M80 540 V320 H720 V540Z" fill="#ece4d6" />
            <path d="M80 340 H720 M96 324 H704" {...hair} />
            <path d="M400 320 V280 C400 258 418 240 440 232 C462 240 480 258 480 280 V320" fill={stoneMid} />
            {[140, 260, 380, 500, 620].map((x) => (
              <g key={x}>
                <path d={`M${x} 520 V410 Q${x} 372 ${x + 34} 360 Q${x + 68} 372 ${x + 68} 410 V520Z`} fill="#ded2bf" opacity="0.65" />
                <path d={`M${x} 520 V410 Q${x} 372 ${x + 34} 360 Q${x + 68} 372 ${x + 68} 410 V520`} {...hair} />
              </g>
            ))}
            <path d="M0 540 H800 V620 H0Z" fill="#ded4c3" opacity="0.7" />
            {/* palms / trees */}
            <Tree x={70} y={520} s={1.7} tone={sage} opacity={0.85} />
            <Tree x={740} y={510} s={1.9} tone={sage} opacity={0.85} />
            {/* umbrellas and loungers */}
            {[160, 610].map((x, i) => (
              <g key={i}>
                <path d={`M${x} 700 V600`} stroke={ink} strokeWidth="2" opacity="0.4" />
                <path d={`M${x - 76} 620 C${x - 62} 566 ${x + 62} 566 ${x + 76} 620Z`} fill="#e7ddcc" stroke={ink} strokeWidth="1.1" opacity="0.85" />
                <path d={`M${x - 76} 620 C${x - 54} 604 ${x + 54} 604 ${x + 76} 620Z`} fill={gold} opacity="0.18" />
                <path d={`M${x - 40} 702 H${x + 54} L${x + 46} 720 H${x - 32}Z`} fill="#f7f3ea" stroke={ink} strokeWidth="1" opacity="0.9" />
                <path d={`M${x - 30} 720 V742 M${x + 36} 720 V742`} stroke={ink} strokeWidth="1" opacity="0.3" />
              </g>
            ))}
            {/* pool */}
            <path d="M0 760 H800 V1000 H0Z" fill="#dfe0d2" />
            <path d="M0 780 H800 V1000 H0Z" fill="#cfd2c1" />
            <path d="M0 760 H800" stroke={ink} strokeWidth="1.2" opacity="0.28" />
            {Array.from({ length: 10 }).map((_, i) => (
              <path
                key={i}
                d={`M${60 + (i % 4) * 90} ${812 + i * 20} C${210 + (i % 5) * 40} ${800 + i * 20} ${360 + (i % 3) * 60} ${828 + i * 20} ${540 + (i % 4) * 40} ${812 + i * 20}`}
                fill="none"
                stroke="#f7f3e9"
                strokeWidth="1.4"
                opacity={0.42 - i * 0.025}
              />
            ))}
            <path d="M120 1000 C180 940 260 920 340 940" stroke="#f4efe5" strokeWidth="2" fill="none" opacity="0.4" />
            <path d="M0 960 C160 936 300 966 440 944 C580 922 700 952 800 936" stroke="#f4efe5" strokeWidth="1.2" fill="none" opacity="0.3" />
          </>
        );

      case "terrace":
        return (
          <>
            <rect width="800" height="1000" fill="#eae2d4" />
            {/* view */}
            <path d="M70 780 V420 C70 330 136 254 236 218 C336 254 402 330 402 420 V780Z" fill="#f5f0e6" />
            <circle cx="286" cy="390" r="46" fill={gold} opacity="0.22" />
            <path d="M70 600 C140 570 200 586 260 562 C320 538 360 548 402 536 V780 H70Z" fill={sageLight} opacity="0.5" />
            <path d="M70 662 C130 636 200 654 270 628 C330 606 372 614 402 610 V780 H70Z" fill={sage} opacity="0.45" />
            <path d="M70 780 V420 C70 330 136 254 236 218 C336 254 402 330 402 420 V780" {...line} strokeWidth={1.7} />
            <path d="M236 218 V780 M70 520 H402" {...hair} />
            <path d="M110 780 V440 C110 366 164 302 236 272 C308 302 362 366 362 440 V780" {...hair} />
            <Birds x={250} y={310} scale={0.8} />

            {/* wall + arches */}
            <path d="M402 780 V400 H800 V780Z" fill="#e3dacb" />
            <path d="M450 780 V520 C450 460 486 414 540 392 C594 414 630 460 630 520 V780Z" fill="#f4efe5" />
            <path d="M450 780 V520 C450 460 486 414 540 392 C594 414 630 460 630 520 V780" {...line} />
            <path d="M540 392 V780 M450 600 H630" {...hair} />
            <path d="M500 780 V540 C500 494 518 462 540 448 C562 462 580 494 580 540 V780Z" fill="#f9f5ec" opacity="0.7" />
            <path d="M670 780 V500 H760 V780Z" fill="#eae2d3" opacity="0.8" />
            <path d="M670 540 H760 M670 600 H760 M670 660 H760" {...hair} />
            <path d="M402 400 H800 M396 384 H800" {...hair} />

            {/* railing */}
            <path d="M0 820 H800" stroke={ink} strokeWidth="1.6" opacity="0.4" />
            {[40, 100, 160, 220, 280, 340, 400, 460, 520, 580, 640, 700, 760].map((x) => (
              <path key={x} d={`M${x} 820 V894`} stroke={ink} strokeWidth="1" opacity="0.22" />
            ))}
            <path d="M0 890 H800" {...hair} />

            {/* furniture */}
            <g>
              <path d="M180 900 C150 900 140 878 140 850 C140 826 156 814 180 814 H300 C324 814 340 826 340 850 C340 878 330 900 300 900" fill="#ded2bf" opacity="0.9" />
              <path d="M160 848 C160 830 172 822 190 822 H290 C308 822 320 830 320 848" fill="#f7f2e8" stroke={ink} strokeWidth="1" opacity="0.8" />
              <path d="M140 900 V950 M340 900 V950 M160 900 H320" stroke={ink} strokeWidth="1.5" opacity="0.3" />
            </g>
            <g>
              <ellipse cx="430" cy="902" rx="54" ry="14" fill="#eee6d8" stroke={ink} strokeWidth="1" opacity="0.85" />
              <path d="M430 916 V970 M400 970 H460" stroke={ink} strokeWidth="1.4" opacity="0.3" />
              <path d="M414 890 H446 V902 L438 916 H422 L414 902Z" fill={gold} opacity="0.35" />
            </g>
            <path d="M660 900 V860 H706 V900" fill={stoneDeep} opacity="0.5" />
            <path d="M683 858 V790 M683 836 C655 818 650 786 666 770 M683 820 C711 800 718 768 702 752" stroke={sageDeep} strokeWidth="2" fill="none" opacity="0.6" />
            {/* lantern */}
            <path d="M760 400 V470" stroke={ink} strokeWidth="1" opacity="0.3" />
            <path d="M744 470 H776 L768 510 H752Z" fill="#f6f1e6" stroke={gold} strokeWidth="1.2" opacity="0.9" />
            <circle cx="760" cy="490" r="18" fill={gold} opacity="0.1" />
            <ellipse cx="400" cy="980" rx="380" ry="34" fill={shadow} opacity="0.16" />
          </>
        );
    }
  })();

  return (
    <div
      className={`plate ${dark ? "plate--dark" : ""} ${image ? "plate--photo" : ""} ${className}`.trim()}
      style={ratio ? { aspectRatio: ratio } : undefined}
      data-scene={scene}
    >
      {image ? (
        <Image
          className="plate__img"
          src={image.src}
          alt={alt ?? image.alt}
          fill
          sizes={sizes ?? "(max-width: 900px) 100vw, 50vw"}
          quality={88}
          priority={priority}
          style={{ objectPosition: imagePosition ?? "50% 50%" }}
        />
      ) : (
        <div className="plate__art" aria-hidden="true">
          <svg viewBox="0 0 800 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
            {content}
          </svg>
        </div>
      )}
      {caption ? <div className="plate__caption">{caption}</div> : null}
    </div>
  );
}
