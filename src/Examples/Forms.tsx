import { useActionState } from "react";
import { useFormStatus } from "react-dom";

async function submitData(prevState: Record<string, any>, formData: FormData) {
    await new Promise((res) => setTimeout(res, 2000));
    return {
        ...prevState,
        condition: formData.get("condition"),
        price: formData.get("price"),
    }; 
}

export function Forms() {

    // we provide an initial state and a function to update it
    // we get back the current state, the wrapped function to provide to the form, and a pending flag
    const [state, formAction, isPending] = useActionState<Record<string, any>, FormData>(submitData, { color: "red" });
   
    return (
        <article>
          <h1>useActionState and useFormStatus Hooks</h1>
          <form action={formAction}>
            <div className="field">
                <label>Condition: </label>
                <input type="text" name="condition"/>
            </div>
            <div className="field">
                <label>Price: </label>
                <input type="number" name="price"/>
            </div>
            <SubmitBtn />
          </form>
          <pre style={{ textAlign: "left" }}>{JSON.stringify(state, null, 2)}</pre> 
          {isPending && <small>Sending...</small>}
        </article>
      );
}


function SubmitBtn() {
    // it has to be used in a component that is rendered INSIDE the form
    const { pending, data, method, action } = useFormStatus();

    console.log("form pending", pending);
    console.log("form data", data);

    return <button type="submit" disabled={pending}>{pending ? "Sending..." : "Submit"}</button>

}