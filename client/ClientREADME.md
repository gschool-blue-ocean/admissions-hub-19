# Admissions Hub Client File

## Page Routing
### React Router Tutorial
https://reactrouter.com/en/main/start/tutorial

### Overview
Client side routing allows your app to update the URL from a link click without making another request for another document from the server.

Client side routing is enabled by creating a Router and linking/submitting to pages with Link and <Form>:

```
import * as React from "react";
import { createRoot } from "react-dom/client";

// These imports show components in the React Router library that allow you to link different pages
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

const router = createBrowserRouter([
  {

    // Path is where you input the page you are linking to (there are more examples in the tutorial on React Router)
    path: "/",
    element: (
      <div>
        <h1>Hello World</h1>
        <Link to="about">About Us</Link>
      </div>
    ),
  },
  {
    path: "about",
    element: <div>About</div>,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
```


## Component Naming
Naming components is important for readability and organization. The following are some guidelines for naming components within this project

If you go into the client folder ==> src ==> pages folder you will see a list of files that represent the pages of the website. Each of these files contains a component that is named after the page it represents. For example, the component for the Login page is named LoginUI in the components folder.

Components dealing with that page can easily be reviewed or edited by looking at the components folder and finding the component with the same name as the page.

## Component CSS
The design and CSS for this project revolved around React-Boostrap, React-Boostrap is a library that allows you to use Bootstrap components in React https://react-bootstrap.github.io/getting-started/introduction/ ,and inline styling meaning that most of the CSS is done within the components themselves. This is not the best practice for CSS but it was the easiest way to get the project done in the time frame we had.

### Keep that in mind when editing CSS

React-Boostrap is a library that allows you to use Bootstrap components in React. The following is a link to the React-Boostrap documentation: 



