import { RoundWinCondition, stringToRoundWinCondition } from "../../constants/enums";
import { ModelBase } from "../ModelBase";

export type RoundWinsInput = Record<`${number}`, string>;

export class RoundWins extends ModelBase {
    public list: Record<`${number}`, RoundWinCondition>;
    constructor(data: RoundWinsInput = {}) {
        super();

        if (typeof data !== 'object' || data === null) {
            console.warn('⚠️ RoundWins received invalid data, defaulting to empty object.');

            data = {};
        }

        this.list = Object.fromEntries(Object.entries(data).map(([key, value]) => [key, stringToRoundWinCondition(value)]));
    }
    toSerializableObject(): RoundWinsInput {
        return {
            ...this.list,
        };
    }
}