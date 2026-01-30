import PersonalNumber from "./pn";
import EGN from "./egn";
import Bulstat from "./bulstat";
import IBAN from "./iban";

class BGCN {
  static personalNumber = (value: string): PersonalNumber => {
    return new PersonalNumber(value);
  };

  static pn = (value: string): PersonalNumber => {
    return this.personalNumber(value);
  };

  static egn = (value: string): EGN => {
    return new EGN(value);
  };

  static bulstat = (value: string): EGN | Bulstat => {
    if (typeof value === "string" && value.length === 10) {
      // 10 знака е Булстат, който е еднакъв с ЕГН на търговеца
      return new EGN(value);
    }
    return new Bulstat(value);
  };

  static iban = (value: string): IBAN => {
    return new IBAN(value);
  };

  static isValid = (value: string): boolean => {
    if (typeof value !== "string") {
      throw new Error(`${value} is not of type string!`);
    }
    value = value.replace(/\s/g, "");
    switch (value.length) {
      case 22:
        return this.iban(value).isValid;
      case 9:
      case 11: // BGxxxxxxxxx
      case 13:
        return this.bulstat(value).isValid;
      case 10:
        return this.egn(value).isValid || this.pn(value).isValid;
      // default:
      //   throw new Error(`${value} with size ${value.length} is not a known control number!`);
    }
    return false;
  };
}

export default BGCN;
