export async function fetchData(url) {
  const data = await fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error(response.statusText);
      return response.text();
    })
    .catch((error) => {
      throw error;
    });
  console.log("yyyy: data fetch complete!");
  return data;
  // try {
  //   let response = await fetch(url);
  //   if (!response.ok) {
  //     throw new Error(response.statusText);
  //   }
  //   let text = await response.text();
  //   // console.log(text);
  //   return text;
  // } catch (error) {
  //   console.log("handleError:", error);
  //   throw error;
  // }
}
