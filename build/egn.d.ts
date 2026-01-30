import { Birthday, Gender } from './types';
declare class EGN {
    private _value;
    private _gender;
    private _birthday;
    constructor(value: string);
    get value(): string;
    get gender(): Gender;
    get birthday(): Birthday;
    private _parse;
    get isValid(): boolean;
}
export default EGN;
//# sourceMappingURL=egn.d.ts.map