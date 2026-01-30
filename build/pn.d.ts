/**
 * ЛНЧ - Личен номер на чужденец се издава на всички чужденци, които
 * възнамеряват да пребивават продължително време в България. Издава се от МВР.
 */
declare class PersonalNumber {
    private _value;
    constructor(value: string);
    get value(): string;
    get isValid(): boolean;
}
export default PersonalNumber;
//# sourceMappingURL=pn.d.ts.map