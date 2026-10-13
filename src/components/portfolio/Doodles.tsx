import type { ReactNode } from 'react';
import { doodleCode } from '@/data/terms';
function Doodle({ children, className = '' }: { children: ReactNode; className?: string }) { return <svg className={`doodle ${className}`} viewBox="0 0 150 100" aria-hidden="true" fill="none">{children}</svg>; }
export function DoodleBarChart() { return <Doodle><path d="M15 10V85H140"/><path d="M30 85V58H48V85M65 85V30H83V85M100 85V44H118V85"/></Doodle>; }
export function DoodleScatter() { return <Doodle><path d="M15 10V85H140M25 75L130 20"/>{[[30,68],[48,73],[62,44],[76,55],[100,30],[116,43],[128,17]].map(([x,y])=><circle key={x} cx={x} cy={y} r="3"/>)}</Doodle>; }
export function DoodleDonut() { return <Doodle><circle cx="75" cy="50" r="36"/><circle cx="75" cy="50" r="20"/><path d="M75 14V30M95 50H111M61 64L49 76"/></Doodle>; }
export function DoodleKpiTile() { return <Doodle><rect x="18" y="18" width="115" height="64" rx="3"/><path d="M30 34H62M30 48H50M30 59H74M85 63L98 47L111 53L124 31"/></Doodle>; }
export function DoodleHeatmap() { return <Doodle><path d="M24 14H126V86H24ZM24 38H126M24 62H126M58 14V86M92 14V86"/><path d="M26 16H56V36H26ZM94 40H124V60H94ZM60 64H90V84H60Z" className="doodle-fill"/></Doodle>; }
export function DoodleConfusionMatrix() { return <Doodle><path d="M35 12H115V88H35ZM35 50H115M75 12V88"/><path d="M46 25L53 32L64 20M86 65L94 73L105 59M88 25L101 37M101 25L88 37M47 64L61 78M61 64L47 78"/></Doodle>; }
export function DoodleHistogram() { return <Doodle><path d="M15 12V86H140M24 86V70H42V48H60V23H78V32H96V59H114V75H132V86"/></Doodle>; }
export function DoodleDecisionTree() { return <Doodle><path d="M75 28V39L38 55M75 39L112 55M38 66L20 83M38 66L55 83M112 66L94 83M112 66L130 83"/>{[[65,14],[28,54],[102,54],[10,83],[45,83],[84,83],[120,83]].map(([x,y])=><rect key={`${x}-${y}`} x={x} y={y} width="20" height="12" rx="2"/>)}</Doodle>; }
export function DoodleCode({ index = 0 }: { index?: number }) { return <div className="doodle-code" aria-hidden="true">{doodleCode[index % doodleCode.length]}</div>; }
const sets = [[DoodleBarChart,DoodleScatter],[DoodleDonut,DoodleHeatmap],[DoodleHistogram,DoodleDecisionTree],[DoodleKpiTile,DoodleConfusionMatrix],[DoodleScatter,DoodleDonut],[DoodleDecisionTree,DoodleBarChart]];
export function SectionDoodles({ index }: { index: number }) { const [First,Second] = sets[index % sets.length] ?? sets[0]!; return <div className="section-doodles" aria-hidden="true"><div>{First && <First/>}</div><DoodleCode index={index}/><div>{Second && <Second/>}</div></div>; }
