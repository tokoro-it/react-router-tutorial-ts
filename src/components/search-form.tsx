import type { FC } from "react";
import { useEffect } from "react";
import {
  Form,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { RootLoaderResult } from "../types/RootLoaderResult";

export const SearchForm: FC = () => {
  const { q } = useLoaderData() as RootLoaderResult;
  const { location } = useNavigation();
  const submit = useSubmit();
  const searching = location && new URLSearchParams(location.search).has("q");
  useEffect(() => {
    (document.getElementById("q") as HTMLInputElement).value = q ?? "";
  }, [q]);
  return (
    <div>
      <Form id="search-form" role="search">
        <input
          id="q"
          className={searching ? "loading" : ""}
          aria-label="Search contacts"
          placeholder="Search"
          type="search"
          name="q"
          defaultValue={q ?? undefined}
          onChange={({ currentTarget: { form } }) => {
            const isFirstSearch = q == null;
            // submit(form);
            submit(form, {
              replace: !isFirstSearch,
            });
          }}
        />
        <div id="search-spinner" aria-hidden hidden={!searching} />
        <div className="sr-only" aria-live="polite"></div>
      </Form>
      <Form method="post">
        <button type="submit">New</button>
      </Form>
    </div>
  );
};
