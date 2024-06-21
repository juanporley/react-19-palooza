import { use, createContext, Suspense } from "react";

// random context
const OurContext = createContext<string>("Oh mighty context!");

// some promise that resolves to an array of strings
const ourPromise = new Promise<string[]>((res) => setTimeout(() => {
    res(["Queen", "Led Zeppelin", "The Beatles", "The Rolling Stones"]);
}, 5000));

export function Use({ loadContext }: { loadContext: boolean }) {
    let ctx;
    // we optionally choose to use the context
    if (loadContext) {
        ctx = use(OurContext);
    }
    return (
    <article>
        <h1>use API</h1>
        {/* We provide a Suspense fallback while BandList resolves its values */}
        <Suspense fallback={"Loading..."}>
            <BandList />
        </Suspense>
        {ctx && <section> {ctx} </section>}
    </article>
    );
}

function BandList() {
    // use() will make this component "async" while it resolves the data it needs (promise)
    const bands = use(ourPromise);
    return (
        <section>
            <h3>Bands:</h3>
            {bands.map((band) => (
                <div key={band}>
                    {band}
                </div>
            ))}
        </section>
    );
}