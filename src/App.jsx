import { useState } from 'react';
import { updateNameInDB } from './apis/updateNameInDB';

function App() {
  const [name, setName] = useState(
    () => JSON.parse(localStorage.getItem("name")) || "Anonymous user"
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong.</p>;
  }

  async function formAction(formData) {
    setLoading(true);
    setError(null);
    try {
      const newName = await updateNameInDB(formData.get("name"));
      setName(newName);
    } catch (error) {
      console.error(error);
      setError(error)
    }
    setLoading(false);
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
