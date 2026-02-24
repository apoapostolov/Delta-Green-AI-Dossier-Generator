// departments-data/index.ts
import type { Department } from '../types';
import { cdcDepartments } from './cdc';
import { ciaDepartments } from './cia';
import { deaDepartments } from './dea';
import { dosDepartments } from './dos';
import { epaDepartments } from './epa';
import { fbiDepartments } from './fbi';
import { iceDepartments } from './ice';
import { miscDepartments } from './misc';
import { usafDepartments } from './usaf';
import { usaDepartments } from './usa';
import { usmcDepartments } from './usmc';
import { usnDepartments } from './usn';

export const DEPARTMENTS: Department[] = [
    ...cdcDepartments,
    ...ciaDepartments,
    ...deaDepartments,
    ...dosDepartments,
    ...epaDepartments,
    ...fbiDepartments,
    ...iceDepartments,
    ...miscDepartments,
    ...usafDepartments,
    ...usaDepartments,
    ...usmcDepartments,
    ...usnDepartments,
];