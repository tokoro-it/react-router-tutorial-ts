import type { FC } from "react";
import { NavLink, useLoaderData } from "react-router-dom";
import { ContactType } from "../types";

export const Contacts: FC = () => {
  const { contacts } = useLoaderData() as { contacts: ContactType[] };
  return (
    <nav>
      {contacts.length ? (
        <ul>
          {contacts.map(({ id, first, last, favorite }) => (
            <li key={id}>
              <NavLink
                to={`contacts/${id}`}
                className={({ isActive, isPending }) =>
                  isActive ? "active" : isPending ? "pending" : ""
                }
              >
                {first || last ? (
                  <>
                    {first} {last}
                  </>
                ) : (
                  <i>No Name</i>
                )}{" "}
                {favorite && <span>★</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      ) : (
        <p>
          <i>No contacts</i>
        </p>
      )}
    </nav>
  );
};
