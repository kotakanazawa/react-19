import { useState } from 'react';
import { updateNameInDB } from './apis/updateNameInDB';

function App() {
  const [input, setInput] = useState('');
  const [name, setName] = useState(
    () => JSON.parse(localStorage.getItem("name")) || "Anonymous user"
  );

  function handleChange(event) {
    setInput(event.target.value);
  }

  console.log(input)

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const newName = await updateNameInDB(input);
      setName(newName);
      setInput("")
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <p>
        Current user: {name}
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={handleChange}
          required
        />
        <button type='submit'>Update</button>
      </form>
    </>
  )
}

export default App;
