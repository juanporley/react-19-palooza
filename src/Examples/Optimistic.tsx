import { useState, useOptimistic } from "react";

export function Optimistic() {
  // This is the original source of truth
  const [messages, setMessages] = useState([
    { text: "Initial Message", sending: false },
  ]);

  // useOptimistic gives us the temporary source of truth, with a function to update it
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage: string) => [
      ...state,
      {
        text: newMessage,
        sending: true,
      },
    ]
  );

  // after a successful submission to the server, we update the original source of truth
  async function sendFormData(formData: FormData) {
    const sentMessage = await fakeServerAction(formData.get("msg") as string);
    setMessages((messages) => [...messages, { text: sentMessage, sending: false }]);
  }
 
  // zzz
  async function fakeServerAction(message: string) {
    await new Promise((res) => setTimeout(res, 1000));
    return message;
  }

  // we update the optimistic store with the new message and trigger the server action
  const submitData = async (userData: FormData) => {
    addOptimisticMessage(userData.get("msg") as string);

    await sendFormData(userData);
  };

  return (
    <article>
      <h1>useOptimistic Hook</h1>
      {/* we configure the form's Action */}
      <form action={submitData}> 
        <label>Message: </label>
        <input type="text" name="msg"/>
        <button type="submit" style={{ marginLeft: 10 }}>Submit</button>
      </form>
      <section>
        <h3>Messages:</h3>
        {/* We always render from optimistic, which will automatically sync with source of truth */}
        {optimisticMessages.map((message, index) => (
          <div key={index}>
            {message.text}
            {!!message.sending && <small> (Sending...)</small>}
          </div>
        ))}
      </section>
    </article>
  );
};