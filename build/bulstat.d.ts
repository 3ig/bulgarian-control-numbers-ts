/**
 * Булстат е идентификатор, какъвто има всяка фирма в България. Булстатът може
 * да бъде 9, 10 или 13 знака.
 */
declare class Bulstat {
    private _value;
    constructor(value: string);
    get value(): string;
    get isValid(): boolean;
}
export default Bulstat;
//# sourceMappingURL=bulstat.d.ts.map