/**
 * IBAN е стандарт за международен номер на банкова сметка. Концепцията за
 * международен номер на банкова сметка (International Bank Account Number) е
 * разработена от Европейския комитет за банкови стандарти (EBS 204/август 2003)
 * съвместно с Международната организация по стандартизация (ISO) и е
 * международно признат стандарт ISO 13616:2003. В България е приет от
 * Българския комитет по стандартизация, като стандарт БДС ISO 13616:2004
 * Международен номер на банкова сметка (IBAN) на Българския институт по
 * стандартизация.
 *
 * BGkk bbbb ssss ttcc cccc cc
 *
 * b = BIC bank code
 * s = Branch (BAE) number
 * t = Account type
 * c = Account number
 */
declare class IBAN {
    private _value;
    private _bic;
    private _accountNo;
    constructor(value: string);
    get value(): string;
    get bic(): string;
    get accountNo(): string;
    private _modulo;
    get isValid(): boolean;
}
export default IBAN;
//# sourceMappingURL=iban.d.ts.map