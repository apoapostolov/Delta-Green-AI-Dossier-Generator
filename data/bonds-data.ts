import type { BondType } from '../types';

export const BONDS: BondType[] = [
  // Family (High to Medium)
  { name: 'Partner', isGroup: false, description: 'A significant other or domestic partner.', weight: 10, allowRepeat: false, exclusionGroup: 'marital' },
  { name: 'Spouse', isGroup: false, description: 'A current marital partner.', weight: 10, allowRepeat: false, exclusionGroup: 'marital' },
  { name: 'Child', isGroup: false, description: 'A son or daughter.', weight: 10, allowRepeat: true, repeatWeight: 2, exclusionGroup: 'offspring' },
  { name: 'The Team', isGroup: true, description: 'A close-knit group of professional colleagues.', weight: 10, allowRepeat: false },
  { name: 'Best Friend', isGroup: false, description: 'A lifelong, platonic companion.', weight: 8, allowRepeat: true, repeatWeight: 3 },
  { name: 'Trauma Survivors', isGroup: true, description: 'People who went through a terrible experience with you.', weight: 6, allowRepeat: false },
  { name: 'Parents', isGroup: true, description: 'Both mother and father.', weight: 6, allowRepeat: false, exclusionGroup: 'parental' },
  { name: 'Parent', isGroup: false, description: 'A mother or father.', weight: 6, allowRepeat: true, repeatWeight: 2, exclusionGroup: 'parental' },
  { name: 'Siblings', isGroup: true, description: 'More than one brother or sister.', weight: 5, allowRepeat: false, exclusionGroup: 'sibling' },
  { name: 'Sibling', isGroup: false, description: 'A brother or sister.', weight: 5, allowRepeat: true, repeatWeight: 3, exclusionGroup: 'sibling' },
  { name: 'Children', isGroup: true, description: 'More than one son or daughter.', weight: 5, allowRepeat: false, exclusionGroup: 'offspring' },
  { name: 'Ex-Spouse', isGroup: false, description: 'A former marital partner with whom ties remain.', weight: 5, allowRepeat: false },
  { name: 'Mentor', isGroup: false, description: 'An older, respected figure who provided guidance.', weight: 5, allowRepeat: false },
  { name: 'Support Group', isGroup: true, description: 'A group like AA, NA, or therapy group.', weight: 5, allowRepeat: false },
  
  // Professional (Medium)
  { name: 'Confidential Informant', isGroup: false, description: 'A source you rely on, and who relies on you for protection.', weight: 4, allowRepeat: true, repeatWeight: 2 },
  { name: 'Therapist', isGroup: false, description: 'A mental health professional helping you cope.', weight: 4, allowRepeat: false },
  { name: 'Childhood Friend', isGroup: false, description: 'Someone who has known you since you were young.', weight: 4, allowRepeat: true, repeatWeight: 1 },
  { name: 'A Promise to the Dying', isGroup: false, description: 'A vow made to a dying friend or family member.', weight: 4, allowRepeat: false },

  // Obligation & Community (Low)
  { name: 'Protégé', isGroup: false, description: 'A younger colleague you have taken under your wing.', weight: 3, allowRepeat: true, repeatWeight: 1 },
  { name: 'The "Old Guard"', isGroup: true, description: 'A group of grizzled veterans in your profession you look up to.', weight: 3, allowRepeat: false },
  { name: 'Dependent Relative', isGroup: false, description: 'A relative who depends on you for financial or physical care.', weight: 3, allowRepeat: false },
  { name: 'Local Bar', isGroup: true, description: 'The regulars at your favorite watering hole.', weight: 3, allowRepeat: false },
  { name: 'Family Pet', isGroup: false, description: 'A beloved animal companion.', weight: 3, allowRepeat: true, repeatWeight: 1 },
  { name: 'A Code of Honor', isGroup: false, description: 'A strict personal or professional code you will not break.', weight: 3, allowRepeat: false },
  { name: 'A Dangerous Secret', isGroup: false, description: 'A piece of information you must protect at all costs.', weight: 3, allowRepeat: false },
  
  // Rare & Specific
  { name: 'Life Debt', isGroup: false, description: 'Someone who saved your life, to whom you owe everything.', weight: 2, allowRepeat: false },
  { name: 'Witness in Protection', isGroup: false, description: 'A person you are responsible for keeping safe from harm.', weight: 2, allowRepeat: false },
  { name: 'Church or Parish', isGroup: true, description: 'A religious community that provides spiritual solace.', weight: 2, allowRepeat: false },
  { name: 'Hobby Group', isGroup: true, description: 'A book club, sports team, or gaming group.', weight: 2, allowRepeat: false },
  { name: 'Patriotism', isGroup: false, description: 'A deep and unwavering love for your country and its ideals.', weight: 2, allowRepeat: false },
  { name: 'A Quest for Vengeance', isGroup: false, description: 'The need to see justice done for a past wrong.', weight: 2, allowRepeat: false },
  { name: 'The Search for Truth', isGroup: false, description: 'An obsessive dedication to uncovering a specific secret.', weight: 2, allowRepeat: false },
  { name: 'Respected Rival', isGroup: false, description: 'A professional adversary you respect and compete with.', weight: 2, allowRepeat: false },
  { name: 'Secret Lover', isGroup: false, description: 'A romantic partner that must be kept hidden.', weight: 2, allowRepeat: true, repeatWeight: 1 },
  { name: 'The One That Got Away', isGroup: false, description: 'A past love you still pine for.', weight: 2, allowRepeat: false },
  { name: 'Grandparent', isGroup: false, description: 'A grandmother or grandfather.', weight: 2, allowRepeat: false },
  { name: 'Extended Family', isGroup: true, description: 'Aunts, uncles, cousins, or other relatives.', weight: 2, allowRepeat: false },
  
  // Very Rare
  { name: 'Someone Who Owes You', isGroup: false, description: 'A person whose life you saved, who is now in your debt.', weight: 1, allowRepeat: false },
  { name: 'The Old Neighborhood', isGroup: true, description: 'A place that represents your roots and identity.', weight: 1, allowRepeat: false },
  { name: 'Home Town', isGroup: true, description: 'The small town or city neighborhood you grew up in.', weight: 1, allowRepeat: false },
  { name: 'An Isolated Homestead', isGroup: false, description: 'A property that represents your only place of peace and security.', weight: 1, allowRepeat: false },
  { name: 'A Political Cause', isGroup: true, description: 'A movement or ideal you are passionately devoted to.', weight: 1, allowRepeat: false },
  { name: 'A Family You Wronged', isGroup: true, description: 'Victims of a past mistake you can never fully repay.', weight: 1, allowRepeat: false },
  { name: 'A Criminal You Let Escape', isGroup: false, description: 'The one mistake that haunts your professional career.', weight: 1, allowRepeat: false },
  { name: 'The Enemy Who Defines You', isGroup: false, description: 'A nemesis whose existence gives your life purpose.', weight: 1, allowRepeat: false },
  { name: 'A Corrupt Institution', isGroup: true, description: 'An organization you are fighting from the inside.', weight: 1, allowRepeat: false },
  { name: 'Fling', isGroup: false, description: 'A casual but intense romantic relationship.', weight: 1, allowRepeat: true, repeatWeight: 1 },
  { name: 'Unrequited Love', isGroup: false, description: 'Someone you love who does not love you back.', weight: 1, allowRepeat: false },
  { name: 'A Prized Possession', isGroup: false, description: 'An object with immense sentimental value.', weight: 1, allowRepeat: false },
  { name: 'A Struggling Business', isGroup: true, description: 'A small business you own or are trying to keep afloat.', weight: 1, allowRepeat: false },
];
