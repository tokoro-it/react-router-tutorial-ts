/* eslint-disable react-refresh/only-export-components */
import type { FC } from "react";
import type { ActionFunction } from "react-router-dom";
import { Form, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { updateContact } from "../contacts";
import type { Params } from "../types";
import { ContactLoaderResult } from "../types/ContactLoaderResult";

export const action: ActionFunction<{
  request: Request;
  params: Params;
}> = async ({ request, params: { contactId } }) => {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContact(contactId, updates);
  return redirect(`/contacts/${contactId}`);
};
export const EditContact: FC = () => {
  const { contact } = useLoaderData() as ContactLoaderResult;

  const navigate = useNavigate();
  return (
    <Form method="post" id="contact-form">
      <p>
        <span>Name</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
          defaultValue={contact.first}
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="last"
          defaultValue={contact.last}
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
          type="text"
          name="twitter"
          placeholder="@jack"
          defaultValue={contact.twitter}
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={contact.avatar}
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea name="notes" defaultValue={contact.notes} rows={6} />
      </label>
      <p>
        <button type="submit">Save</button>
        <button
          type="button"
          onClick={() => {
            navigate(-1);
          }}
        >
          Cancel
        </button>
      </p>
    </Form>
  );
};
