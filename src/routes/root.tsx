/* eslint-disable react-refresh/only-export-components */
import type { FC } from "react";
import type { ActionFunction, LoaderFunction } from "react-router-dom";
import { Outlet, redirect, useNavigation } from "react-router-dom";
import { Contacts } from "../components/contacts";
import { SearchForm } from "../components/search-form";
import { createContact, getContacts } from "../contacts";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  console.log("contacts:", contacts);
  return { contacts, q };
};
export const action: ActionFunction = async () => {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
};
export const Root: FC = () => {
  const { state } = useNavigation();
  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <SearchForm />
        <Contacts />
      </div>
      <div id="detail" className={state === "loading" ? "loading" : ""}>
        <Outlet />
      </div>
    </>
  );
};
