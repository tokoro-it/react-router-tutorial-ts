import localforage from "localforage";
import { matchSorter } from "match-sorter";
import { sortBy } from "sort-by-typescript";
import type { ContactType } from "./types";

type GetContactType = { createdAt: number; id: string };
export const getContacts = async (query: string = "") => {
  await fakeNetwork(`getContacts:${query}`);
  let contacts: GetContactType[] | null = await localforage.getItem("contacts");
  if (!contacts) contacts = [];
  if (query) {
    contacts = matchSorter(contacts, query, { keys: ["first", "last"] });
  }
  return contacts.sort(sortBy("last", "createdAt"));
};
export const createContact = async () => {
  await fakeNetwork();
  const id = Math.random().toString(36).substring(2, 9);
  const contact = { id, createdAt: Date.now() };
  const contacts = await getContacts();
  contacts.unshift(contact);
  await set(contacts);
  return contact;
};
export const getContact = async (id?: string | undefined) => {
  await fakeNetwork(`contact:${id}`);
  const contacts: GetContactType[] | null = await localforage.getItem(
    "contacts"
  );
  if (!contacts) return;
  const contact: GetContactType | undefined = contacts.find(
    (contact) => contact.id === id
  );
  return contact ?? null;
};
export const updateContact = async (id: string, updates: ContactType) => {
  console.log("updateContact:", id, updates);
  await fakeNetwork("");
  const contacts = (await localforage.getItem("contacts")) as ContactType[];
  const contact = contacts.find((contact) => contact.id === id);
  if (!contact) throw new Error(`No contact found for ${id}`);
  Object.assign(contact, updates);
  await set(contacts);
  return contact;
};
export const deleteContact = async (id: string) => {
  const contacts = (await localforage.getItem("contacts")) as ContactType[];
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index > -1) {
    contacts.splice(index, 1);
    await set(contacts);
    return true;
  }
  return false;
};
function set(contacts: ContactType[]) {
  return localforage.setItem("contacts", contacts);
}
// fake a cache so we don't slow down stuff we've already seen
let fakeCache: any = {};
const fakeNetwork = async (key: string = "") => {
  if (!key) {
    fakeCache = {};
  }
  if (fakeCache[key]) {
    return;
  }
  fakeCache[key] = true;
  return new Promise((res) => {
    setTimeout(res, Math.random() * 800);
  });
};
