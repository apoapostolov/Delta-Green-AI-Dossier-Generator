import type { DGItem } from '../types';

import { handToHandWeapons } from './hand-to-hand-weapons';
import { nonLethalWeapons } from './non-lethal-weapons';
import { firearms } from './firearms';
import { heavyWeapons } from './heavy-weapons';
import { demolitions } from './demolitions';
import { artillery } from './artillery';
import { bodyArmor } from './body-armor';
import { vehicles } from './vehicles';
import { agencyAndTacticalGear } from './agency-tactical-gear';
import { services } from './services';
import { restraints } from './restraints';
import { researchGear } from './research-gear';
import { commsAndComputers } from './comms-computers';
import { surveillance } from './surveillance';
import { lightingAndVision } from './lighting-vision';
import { breakingAndEntering } from './breaking-entering';
import { emergencyAndSurvival } from './emergency-survival';
import { offTheBooksServices } from './off-the-books-services';
import { weaponAccessories } from './weapon-accessories';
import { officialRequisitions } from './official-requisitions';
import { scientificAndMedicalGear } from './scientific-medical-gear';


export const ITEMS: DGItem[] = [
    ...handToHandWeapons,
    ...nonLethalWeapons,
    ...firearms,
    ...heavyWeapons,
    ...demolitions,
    ...artillery,
    ...bodyArmor,
    ...vehicles,
    ...agencyAndTacticalGear,
    ...services,
    ...restraints,
    ...researchGear,
    ...commsAndComputers,
    ...surveillance,
    ...lightingAndVision,
    ...breakingAndEntering,
    ...emergencyAndSurvival,
    ...offTheBooksServices,
    ...weaponAccessories,
    ...officialRequisitions,
    ...scientificAndMedicalGear,
];
