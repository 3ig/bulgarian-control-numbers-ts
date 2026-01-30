import { default as PersonalNumber } from './pn';
import { default as EGN } from './egn';
import { default as Bulstat } from './bulstat';
import { default as IBAN } from './iban';
declare class BGCN {
    static personalNumber: (value: string) => PersonalNumber;
    static pn: (value: string) => PersonalNumber;
    static egn: (value: string) => EGN;
    static bulstat: (value: string) => EGN | Bulstat;
    static iban: (value: string) => IBAN;
    static isValid: (value: string) => boolean;
}
export default BGCN;
//# sourceMappingURL=index.d.ts.map