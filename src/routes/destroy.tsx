import { ActionFunction, redirect } from "react-router-dom";
import { deleteContact } from "../contacts";
import { Params } from "../types";

export const action: ActionFunction<Params> = async ({
  params: { contactId },
}) => {
  // throw new Error('oh dang!');
  if (contactId) {
    await deleteContact(contactId);
  }
  return redirect("/");
};
