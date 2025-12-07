import { Logger } from "../../utils/Logger";
import { ModelBase } from "../ModelBase";

export interface Vector3DInput {
    x?: number;
    y?: number;
    z?: number;
}

export class Vector3D extends ModelBase {
    public x: number;
    public y: number;
    public z: number;

    private static vectorStringRegex = /([+-]?\d*\.?\d+),\s([+-]?\d*\.?\d+),\s([+-]?\d*\.?\d+)/;

    static fromString(str: string = '0, 0, 0') {
        const match = str.match(this.vectorStringRegex);

        if (!match) {
            console.error(`⚠️ Vector3D.fromString received invalid string: ${str}`);
        }

        return new Vector3D({
            x: parseFloat(match?.[1] ?? '0'),
            y: parseFloat(match?.[2] ?? '0'),
            z: parseFloat(match?.[3] ?? '0'),
        });
    }

    constructor(data: Vector3DInput = {}) {
        super();

        if (typeof data !== 'object' || data === null) {
            console.warn('⚠️ Vector3D constructor received invalid data, defaulting to empty object.');

            data = {};
        }

        this.x = this.validateNumber(data.x);
        this.y = this.validateNumber(data.y);
        this.z = this.validateNumber(data.z);
    }
}