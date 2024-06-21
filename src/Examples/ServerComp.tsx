// import { userService } from "../services/userService";

import { ClientComp } from "./ClientComp";

export function ServerComp() {

    // const serverData = await userService.fetchAllUsers();

    return (
        <article>
            <h1>Server Component</h1>
            <p>
                Server components can be async, so they can use await within render.
            </p>
            <p>
                You can mix server components with client components. Server components won't have interactivity, useState, and such. 
            </p>
            <ClientComp />
        </article>
    );
}