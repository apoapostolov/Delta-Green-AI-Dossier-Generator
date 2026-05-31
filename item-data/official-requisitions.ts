import type { DGItem } from '../types';

export const officialRequisitions: DGItem[] = [
  {
    section: 'Law Enforcement (Official Requisition Only)',
    name: 'Access to Unclassified but Restricted Files Such as Criminal or Financial Records',
    expense: 'Incidental',
    description: 'Must relate to an official investigation. If not, a failed Luck roll means it draws official review (see page 87).',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Law Enforcement (Official Requisition Only)',
    name: 'Holding a Prisoner for 24 Hours with no Questions Asked',
    expense: 'Standard',
    description: 'Must relate to an official investigation. If not, a failed Luck roll means it draws official review (see page 87).',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Law Enforcement (Official Requisition Only)',
    name: 'Use for a Day of an Agency-Owned Sedan, Patrol Vehicle, or SUV',
    expense: 'Standard',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Law Enforcement (Official Requisition Only)',
    name: 'Acquiring Data from an Unrelated Case',
    expense: 'Standard',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Law Enforcement (Official Requisition Only)',
    name: 'Drone Surveillance of a Specific Suspect for a Day or Two',
    expense: 'Unusual',
    description: 'Automatically elicits official review (see page 87).',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Law Enforcement (Official Requisition Only)',
    name: 'Use for a Day of an Agency-Owned Quad Runner, Patrol Boat or Other Small, Specialized Craft',
    expense: 'Unusual',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Law Enforcement (Official Requisition Only)',
    name: 'Deployment of 2–5 Local Uniformed Police',
    expense: 'Unusual',
    description: 'Automatically elicits official review (see page 87).',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Law Enforcement (Official Requisition Only)',
    name: 'Surveillance Data from an Ongoing Case',
    expense: 'Unusual',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Law Enforcement (Official Requisition Only)',
    name: 'Order a Wiretap',
    expense: 'Unusual',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Law Enforcement (Official Requisition Only)',
    name: 'An Armored SUV Requisitioned for a Week',
    expense: 'Unusual',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Law Enforcement (Official Requisition Only)',
    name: 'Calling in a Regional FBI SWAT Team for a Raid',
    expense: 'Extreme',
    description: 'Automatically elicits official review (see page 87).',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Military (Official Requisition Only)',
    name: 'Secure a Seat on an Already Scheduled Support Flight (Space Available or "Space-A")',
    expense: 'Incidental',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Military (Official Requisition Only)',
    name: 'Calling in a Special Operations Team for Security or Evacuation',
    expense: 'Extreme',
    description: 'Automatically elicits official review (see page 87).',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Military (Official Requisition Only)',
    name: 'Helicopter Support (transport or surveillance)',
    expense: 'Extreme',
    description: 'Automatically elicits official review (see page 87).',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Military (Official Requisition Only)',
    name: 'Missile Strike',
    expense: 'Extreme',
    description: 'Automatically elicits official review (see page 87); will not be performed on American soil.',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Intelligence (Official Requisition Only)',
    name: 'Access to Classified Reporting',
    expense: 'Standard',
    description: 'A professional perk granting access to classified intelligence databases, reports, and briefings relevant to current operations. This is not a physical item but a level of authorization.',
    isRestricted: true,
    sourceType: 'ai'
  },
  {
    section: 'Intelligence (Official Requisition Only)',
    name: "Access to Another Agency's Classified Files (not related to national security)",
    expense: 'Unusual',
    description: 'Includes digital communications data from NarusInsight (FBI) or XKeyscore (NSA).',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Intelligence (Official Requisition Only)',
    name: 'Drone Flyover and Surveillance Over a Specific Site',
    expense: 'Unusual',
    description: 'Automatically elicits official review (see page 87).',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Intelligence (Official Requisition Only)',
    name: "Holding a Prisoner at a 'Black Site' for 48 Hours",
    expense: 'Major',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Intelligence (Official Requisition Only)',
    name: 'Acquire Clearance to be Present During an Interrogation or Debriefing',
    expense: 'Major',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Intelligence (Official Requisition Only)',
    name: 'Acquire Sophisticated Fake Documents',
    expense: 'Major',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Intelligence (Official Requisition Only)',
    name: "Access to Classified Files Related to National Security (which the Agent has no 'need to know')",
    expense: 'Major',
    description: 'Technically espionage. It can result in firing and/or prosecution if detected.',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Intelligence (Official Requisition Only)',
    name: 'Extended Drone or Satellite Surveillance Over a Specific Site (more than a short flyover)',
    expense: 'Extreme',
    description: 'Automatically elicits official review (see page 87).',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Intelligence (Official Requisition Only)',
    name: 'Call in Support from a Covert Operative Team in the Area',
    expense: 'Extreme',
    description: 'Automatically elicits official review (see page 87).',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Public Safety (Official Requisition Only)',
    name: 'Credentials for Unescorted Entry into a Restricted Site',
    expense: 'Standard',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Public Safety (Official Requisition Only)',
    name: "Access to Sensitive Files Outside the Agent's Specialty",
    expense: 'Standard',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Public Safety (Official Requisition Only)',
    name: 'Place a Request for Local Law Enforcement to Make an Arrest (with justification)',
    expense: 'Standard',
    description: 'Automatically elicits official review (see page 87).',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Public Safety (Official Requisition Only)',
    name: 'Get a Warrant for Access to an Industrial Site for Alleged Environmental Crimes',
    expense: 'Unusual',
    description: 'Automatically elicits official review (see page 87).',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Public Safety (Official Requisition Only)',
    name: 'Temporarily Shut Down a Site for Investigation of Environmental Crimes',
    expense: 'Major',
    description: 'Automatically elicits official review (see page 87).',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Public Safety (Official Requisition Only)',
    name: 'Quarantine a Single Location (see QUARANTINES on page 159)',
    expense: 'Major',
    description: 'Automatically elicits official review (see page 87).',
    isRestricted: false,
    sourceType: 'core'
  },
  {
    section: 'Public Safety (Official Requisition Only)',
    name: 'Quarantine an Area',
    expense: 'Major',
    description: 'Automatically elicits official review (see page 87).',
    isRestricted: false,
    sourceType: 'core'
  },
];