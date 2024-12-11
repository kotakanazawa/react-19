import { useActionState } from "react"
import { updateNameInDB } from "./apis/updateNameInDB"

function App() {
  const [name, actionFunction, isPending] = useActionState(
    updateName, // 非同期関数
    JSON.parse(localStorage.getItem("name")) || "Anonymous user" // 初期値
  )

  async function updateName(formData) {
    try {
      const newName = await updateNameInDB(formData.get("name"))
      return newName
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <>
      <p>Current user: {name}</p>
      {isPending && <p>Updating name...</p>}
      <form action={actionFunction}>
        <input type="text" name="name" required />
        <button type="submit">Update</button>
      </form>
    </>
  )
}

export default App
