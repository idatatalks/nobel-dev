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

  filteredData.maxWinners = filteredData.winnersByCountry.at(-1);
  console.log("xxx:", filteredData.maxWinners);
  filteredData.countryNum = filteredData.at(-1).countryId;

  initOptions(filteredData);
  initFilters(filteredData, filteredData.options);

  console.log("options:", filteredData.options);
  console.log("filters:", filteredData.filters);

  return filteredData;
};

const initOptions = (data) => {
  data.options = {};
  data.options.countries = data.winnersByCountry.map(([k, v]) => k);
  data.options.categories = Array.from(
    d3.group(data, (d) => d.category).keys()
  );
  data.options.years = Array.from(d3.group(data, (d) => d.year).keys()).sort(
    (a, b) => a - b
  );
  data.options.genders = ["Male", "Female"];
};

const initFilters = (data, options) => {
  data.filters = {};
  data.filters.category = [...options.categories];
  data.filters.gender = [...options.genders];
  data.filters.country = options.countries
    .slice(0, 10)
    .concat(["China", "India"]);
  data.filters.year = [options.years[0], options.years.at(-1)];
};
