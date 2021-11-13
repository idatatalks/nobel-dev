export async function fetchData(url) {
  try {
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    let text = await response.text();
    console.log(text);
    return text;
  } catch (error) {
    console.log("handleError:", error);
    throw error;
  }
  
}
