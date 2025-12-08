import { ModelBase } from "../ModelBase";

export type Vector3DArray = [x: number, y: number, z: number];

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

    static isVector3DArray(arr: any): arr is Vector3DArray {
        return Array.isArray(arr) && arr.length === 3 && typeof arr[0] === 'number' && typeof arr[1] === 'number' && typeof arr[2] === 'number';
    }

    static isVector3D(obj: any): obj is Vector3D {
        return obj instanceof Vector3D;
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

    toArray(): Vector3DArray {
        return [this.x, this.y, this.z];
    }
}