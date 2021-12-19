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

export const buildData = (rawData) => {
  console.log(rawData);
  const data = { rawData };
  initOptions(data);
  initFilters(data);
  filterDataBySelection(data, data.filters);
  console.log("options:", data.options);
  console.log("filters:", data.filters);

  return data;
};

const initOptions = (data) => {
  const { rawData } = data;
  const options = {};
  options.countries = Array.from(
    d3.group(rawData, (d) => d.country).keys()
  ).sort();
  options.categories = Array.from(d3.group(rawData, (d) => d.category).keys());
  options.years = Array.from(d3.group(rawData, (d) => d.year).keys()).sort(
    (a, b) => a - b
  );
  options.genders = ["Male", "Female"];
  data.options = options;
  return data;
};

const initFilters = (data) => {
  const { options, rawData } = data;
  const filters = {};
  filters.category = [...data.options.categories];
  filters.gender = [...options.genders];
  filters.country = d3
    .rollups(
      rawData,
      (v) => v.length,
      (d) => d.country
    )
    .sort((d1, d2) => d3.descending(d1[1], d2[1]))
    .slice(0, 10)
    .map((d) => d[0])
    .concat(["China", "India"]);
  filters.year = [options.years[0], options.years.at(-1)];
  data.filters = filters;
  return data;
};

export const filterDataBySelection = (data, newFilter) => {
  data.filters = newFilter;
  const { filters } = data;
  console.log("Before filter, data:", data);
  const filteredData = data.rawData.filter(
    (d) =>
      d.year >= filters.year[0] &&
      d.year <= filters.year[1] &&
      filters.country.find(
        (item) => item.toLowerCase() == d.country.toLowerCase()
      ) &&
      filters.category.find(
        (item) => item.toLowerCase() == d.category.toLowerCase()
      ) &&
      filters.gender.find(
        (item) => item.toLowerCase() == d.gender.toLowerCase()
      )
  );
  data.filteredData = filteredData;
  console.log("XXXXX after filter:", data);
  buildChartData(data);
  return data;
};

export const buildChartData = (data) => {
  const { filteredData } = data;
  filteredData.winnersByCountry = d3
    .flatRollup(
      filteredData,
      (v) => v.length,
      (d) => d.country
    )
    .sort((a, b) => d3.descending(a[1], b[1]));

  filteredData.maxWinners = filteredData.winnersByCountry[0];
  filteredData.sumWinners = d3.sum(
    filteredData.winnersByCountry,
    ([k, v]) => v
  );
  filteredData.countryNum = filteredData.winnersByCountry.length;
  filteredData.year = data.filters.year;

  console.log("XXXXX chart data:", data);
  return data;
};

export const getNobelNumPerCountry = (filter) => {
  return filter.winnersByCountry.map((d, i) => ({
    country: d[0],
    number: d[1],
    countryId: i + 1,
  }));
};

export const getDataByRadio = (data) => {
  let sum = data.reduce((sum, d) => sum + d.number, 0);
  data.forEach((d) => {
    d.radio = (d.number * 100) / sum;
    // d.radio = `${((d.number * 100) / sum).toFixed(0)}%`;
  });
  console.log("Radio:", data);
  return data;
};
