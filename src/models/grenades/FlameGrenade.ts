import { Vector3D } from "../helpers/Vector3D";
import { GrenadeBase, GrenadeBaseInput } from "./GrenadeBase";

export interface FlameGrenadeInput extends GrenadeBaseInput {
    flames: Record<string, string>;
}

export class FlameGrenade extends GrenadeBase {
    public flames: Vector3D[];

    constructor(data: FlameGrenadeInput) {
        super(data);

        this.flames = Object.values(data.flames).map(v => Vector3D.fromString(v));
    }

    toSerializableObject(): FlameGrenadeInput {
        return {
            ...super.toSerializableObject(),
            flames: Object.fromEntries(this.flames.map(v => [FlameGrenade.Vector3DToFlameKey(v), v.toString()]))
        }
    }

    private static Vector3DToFlameKey(v: Vector3D) {
        let key = "flame";

        for (let val of v.toArray()) {
            if (val < 0) {
                key += "_n";
            } else {
                key += "_p";
            }

            key += Math.abs(Math.round(val));
        }

        return key;
    }
}