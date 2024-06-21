"use client"

import { useState } from "react";

export function ClientComp() {
    const [toggle, setToggle] = useState(false);

    return (
    <p>
        <input type="checkbox" checked={toggle} onClick={() => setToggle(!toggle)} /> 
        <span> Show content </span>
        {toggle && <div>content</div>}
    </p>
    );
}