import { ContactType } from "../types";

export type RootLoaderResult = {
  contacts: ContactType[];
  q?: string;
};
