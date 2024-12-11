import { useState } from 'react';
import { updateNameInDB } from './apis/updateNameInDB';

function App() {
  const [name, setName] = useState(
    () => JSON.parse(localStorage.getItem("name")) || "Anonymous user"
  );

  async function formAction(formData) {
    try {
      const newName = await updateNameInDB(formData.get("name"));
      setName(newName);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <p>
        Current user: {name}
      </p>
      <form action={formAction}>
        <input
          type="text"
          name="name"
          required
        />
        <button type='submit'>Update</button>
      </form>
    </>
  )
}

export default App;
