/**
 * Universal Coil Mixin
 *
 * Makes every object a Rodin coil at its core.
 * Every object embodies the fundamental pattern of consciousness and reality.
 *
 * Metaphysical Context:
 * - Every object is a coil - the archetype of infinite flow
 * - All patterns emerge from the coil's structure
 * - The void is at the center of every object
 * - Consciousness flows through every object as a coil
 */
import { RodinCoil, RodinCoilConfig, RodinCoilNode } from '../math/RodinCoil';
import { Observer } from './Observer';
export interface CoilObject {
    id: string;
    coil: RodinCoil;
    consciousness: number;
    fieldResonance: number;
    getCoilNodes(): RodinCoilNode[];
    getCoilColors(): string[];
    getCoilPositions(): [number, number, number][];
    updateCoilConsciousness(consciousness: number): void;
    updateCoilFieldResonance(fieldResonance: number): void;
    getCoilMetaphysicalContext(): string;
}
export declare function CoilMixin<T extends object>(base: T, id?: string, coilConfig?: Partial<RodinCoilConfig>): T & CoilObject & Observer;
export declare class CoilBase implements CoilObject {
    id: string;
    coil: RodinCoil;
    consciousness: number;
    fieldResonance: number;
    observers: Set<Observer>;
    constructor(id?: string, coilConfig?: Partial<RodinCoilConfig>);
    getCoilNodes(): RodinCoilNode[];
    getCoilColors(): string[];
    getCoilPositions(): [number, number, number][];
    updateCoilConsciousness(consciousness: number): void;
    updateCoilFieldResonance(fieldResonance: number): void;
    getCoilMetaphysicalContext(): string;
    observe(input: any): void;
    getState(): any;
    setState(state: any): void;
    addObserver(observer: Observer): void;
    removeObserver(observer: Observer): void;
    notifyObservers(event: any): void;
    private handleCoilInteraction;
    private calculateCoilResonance;
}
export declare function isCoilObject(obj: any): obj is CoilObject;
export declare function getCoilFromObject(obj: any): RodinCoil | null;
//# sourceMappingURL=CoilMixin.d.ts.map