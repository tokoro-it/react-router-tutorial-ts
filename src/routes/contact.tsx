/* eslint-disable react-refresh/only-export-components */
import type { FC } from "react";
import type { LoaderFunction, LoaderFunctionArgs } from "react-router-dom";
import { Form, useFetcher, useLoaderData } from "react-router-dom";
import { getContact, updateContact } from "../contacts";
import type { ContactType } from "../types";
import { ContactLoaderResult } from "../types/ContactLoaderResult";

export const loader: LoaderFunction = async (
  args: LoaderFunctionArgs
): Promise<ContactLoaderResult> => {
  const contact = await getContact(args.params.contactId);
  if (!contact) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  const result: ContactLoaderResult = {
    contact,
  };

  return result;
};
export const action = async ({ request, params: { contactId } }) => {
  const formData = await request.formData();
  return updateContact(contactId, {
    favorite: formData.get("favorite") === "true",
  });
};
export const Contact: FC = () => {
  const { contact } = useLoaderData() as ContactLoaderResult;
  return (
    <div id="contact">
      <div>
        <img key={contact.avatar} src={contact.avatar || undefined} />
      </div>
      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact={contact} />
        </h1>
        {contact.twitter && (
          <p>
            <a target="_blank" href={`https://twitter.com/${contact.twitter}`}>
              {contact.twitter}
            </a>
          </p>
        )}
        {contact.notes && <p>{contact.notes}</p>}
        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (!confirm("Please confirm you want to delete this record.")) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
};
const Favorite: FC<{ contact: ContactType }> = ({ contact }) => {
  const fetcher = useFetcher();
  let favorite = contact.favorite;
  if (fetcher.formData) {
    favorite = fetcher.formData.get("favorite") === "true";
  }
  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
};
