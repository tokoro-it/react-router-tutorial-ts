import { ActionFunction, ActionFunctionArgs, redirect } from "react-router-dom";
import { deleteContact } from "../contacts";

export const action: ActionFunction = async (
  args: ActionFunctionArgs
): Promise<Response> => {
  // throw new Error('oh dang!');
  const contactId = args.params.contactId;
  if (contactId) {
    await deleteContact(contactId);
  }
  return redirect("/");
};
