import * as d3 from "d3";
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

export const parseData = (data) => {
  console.log(data);
  const filteredData = d3
    .flatGroup(data, (d) => d.country)
    .map((d, i) => {
      return d[1].map((d, j) => {
        d.winnerId = j + 1;
        // d.winnerY = d.winnerId * mark.height;
        d.countryId = i + 1;
        return d;
      });
    })
    .flat();

  filteredData.winnersByCountry = (() => {
    return d3
      .flatGroup(data, (d) => d.country)
      .map(([key, value]) => {
        return [key, value.length];
      })
      .sort((a, b) => b[1] - a[1]);
  })();

  // filteredData.winnersByCountry = d3.sort(filtere)
  filteredData.maxWinners =
    filteredData.winnersByCountry[filteredData.winnersByCountry.length - 1];
  // filteredData.maxWinners = (() => {
  //   let index = d3.maxIndex(filteredData.winnersByCountry, (d) => d[1]);
  //   return [filteredData.winnersByCountry[index][0], filteredData.winnersByCountry[index][1]];
  // })();
  console.log("xxx:", filteredData.maxWinners);
  filteredData.countryNum = filteredData[filteredData.length - 1].countryId;
  // filteredData.countries = Array.from(d3.group(data, (d) => d.country).keys());
  filteredData.countries = filteredData.winnersByCountry.map(([k, v]) => k);
  filteredData.categories = Array.from(
    d3.group(data, (d) => d.category).keys()
  );
  filteredData.years = Array.from(d3.group(data, (d) => d.year).keys()).sort(
    (a, b) => a - b
  );
  filteredData.genders = ["Male", "Female"];
  console.log("Country numbers:", filteredData.countryNum);
  console.log("Country names:", filteredData.countries.length);
  console.log("filtered data:", filteredData);

  // setData({ data: filteredData, isDataMangled: true });
  return filteredData;
};

export const getFilterTemplate = (data) => {
  data.filterTemplate = { category: [], gender: [], countries: [] };
  // data.filterTemplate.category =
};
