import { FC } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage } from "./components/error-page";
import {
  Contact,
  action as contactAction,
  loader as contactLoader,
} from "./routes/contact";
import { action as destroyAction } from "./routes/destroy";
import { action as editAction, EditContact } from "./routes/edit";
import { Index } from "./routes/index";
import {
  Root,
  action as rootAction,
  loader as rootLoader,
} from "./routes/root";
import "./style.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          {
            path: "contacts/:contactId",
            element: <Contact />,
            loader: contactLoader,
            action: contactAction,
          },
          {
            path: "contacts/:contactId/edit",
            element: <EditContact />,
            loader: contactLoader,
            action: editAction,
          },
          {
            path: "contacts/:contactId/destroy",
            action: destroyAction,
            errorElement: <div>Oops! There was an error.</div>,
          },
        ],
      },
    ],
  },
]);
export const App: FC = () => {
  return <RouterProvider router={router} />;
};
