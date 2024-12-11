import { useActionState } from "react"
import { updateNameInDB } from "./apis/updateNameInDB"

function App() {
  const [state, actionFunction, isPending] = useActionState(
    updateName,
    {
      error: null,
      name: JSON.parse(localStorage.getItem("name")) || "Anonymous user"
    }
  )

  async function updateName(prevState, formData) {
    try {
      const newName = await updateNameInDB(formData.get("name"))
      return { name: newName, error: null }
    } catch (error) {
      return { error, name: prevState.name }
    }
  }

  return (
    <>
      <p>Current user: {state.name}</p>
      {isPending && <p>Updating name...</p>}
      <form action={actionFunction}>
        <input type="text" name="name" required />
        <button type="submit">Update</button>
        {!isPending && state.error && <p style={{ color: "red" }}>{state.error.message}</p>}
      </form>
    </>
  )
}

export default App
