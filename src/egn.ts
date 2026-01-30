/**
 * Всеки български гражданин има ЕГН и това го идентифицира еднозначно. ЕГН се
 * поддържа от ЕСГРАОН.
 */

import type { Birthday, Gender } from './types';

const CONTROLS: readonly number[] = [2, 4, 8, 5, 10, 9, 7, 3, 6];

class EGN {
  private _value: string;
  private _gender: Gender;
  private _birthday: Birthday;

  constructor(value: string) {
    if (typeof value !== "string") {
      throw new Error(`${value} is not of type string!`);
    }

    if (value.length !== 10) {
      throw new Error(`${value} is not of size 10!`);
    }

    this._value = value;
    this._gender = "m"; // Will be set by _parse()
    this._birthday = { year: 0, month: 0, day: 0 };
    this._parse();
  }

  get value(): string {
    return this._value;
  }

  get gender(): Gender {
    return this._gender;
  }

  get birthday(): Birthday {
    return this._birthday;
  }

  private _parse = (): void => {
    this._gender = ~~this._value.charAt(8) % 2 === 0 ? "m" : "f";

    const day = ~~this._value.substr(4, 2);
    let month = ~~this._value.substr(2, 2);
    let year = ~~this._value.substr(0, 2);

    if (month > 40) {
      year += 2000;
      month -= 40;
    } else if (month > 20) {
      year += 1800;
      month -= 20;
    } else {
      year += 1900;
    }

    this._birthday = { year, month, day };
  };

  get isValid(): boolean {
    let sum = 0;

    for (let i = 0; i < this._value.length - 1; i++) {
      sum += ~~this._value.charAt(i) * CONTROLS[i];
    }

    let mod = sum % 11;
    mod = mod < 10 ? mod : 0;

    return mod === ~~this._value.charAt(9);
  }
}

export default EGN;
