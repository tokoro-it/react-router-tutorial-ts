export type ContactType = {
  id?: string;
  first?: string;
  last?: string;
  avatar?: string;
  twitter?: string;
  notes?: string;
  favorite?: boolean;
};
export type Params = {
  params: { contactId: string };
};
