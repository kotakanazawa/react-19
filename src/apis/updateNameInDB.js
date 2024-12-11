export async function updateNameInDB(newName) {
  await new Promise(resolve => setTimeout(resolve, 1000));
  if (newName.toLowerCase().includes("error")) {
    throw new Error("Failed to update name");
  }
  localStorage.setItem("name", JSON.stringify(newName));
  return newName;
}
