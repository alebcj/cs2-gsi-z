import { GrenadeType } from "../../constants/enums";
import { GRENADEID } from "../../constants/types";
import { ModelBase } from "../ModelBase";
import { FlameGrenade, FlameGrenadeInput } from "./FlameGrenade";
import { GrenadeBase, GrenadeBaseInput } from "./GrenadeBase";

export type GrenadeListInput = Record<
  GRENADEID,
  GrenadeBaseInput | FlameGrenadeInput
>;

export class GrenadeList extends ModelBase {
  public readonly list: Record<GRENADEID, GrenadeBase | FlameGrenade>;

  constructor(data: GrenadeListInput = {}) {
    super();

    this.list = Object.fromEntries(
      Object.entries(data).map(([k, v]) => {
        if (v.flames) {
          return [k, new FlameGrenade(v as FlameGrenadeInput)];
        }

        return [k, new GrenadeBase(v as GrenadeBaseInput)];
      })
    );
  }

  getById(id: number) {
    return this.list[id];
  }

  getAllWithType(type: GrenadeType) {
    return Object.values(this.list).filter((g) => g.type === type);
  }

  toSerializableObject() {
    return Object.fromEntries(
      Object.entries(this.list).map(([k, v]) => {
        if (v instanceof FlameGrenade) {
          return [k, v.toSerializableObject()];
        }

        return [k, v.toSerializableObject()];
      })
    );
  }
}
