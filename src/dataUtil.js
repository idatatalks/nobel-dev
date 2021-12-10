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
  data.winnersByCountry = (() => {
    return d3
      .flatGroup(rawData, (d) => d.country)
      .map(([key, value]) => {
        return [key, value.length];
      })
      .sort((a, b) => b[1] - a[1]);
  })();
  initOptions(data);
  initFilters(data);
  updateDataByFilter(data, data.filters);
  console.log("options:", data.options);
  console.log("filters:", data.filters);

  return data;
};

const initOptions = (data) => {
  data.options = {};
  data.options.countries = Array.from(
    d3.group(data.rawData, (d) => d.country).keys()
  );
  data.options.categories = Array.from(
    d3.group(data.rawData, (d) => d.category).keys()
  );
  data.options.years = Array.from(
    d3.group(data.rawData, (d) => d.year).keys()
  ).sort((a, b) => a - b);
  data.options.genders = ["Male", "Female"];
  return data;
};

const initFilters = (data) => {
  const { options, winnersByCountry } = data;
  data.filters = {};
  data.filters.category = [...data.options.categories];
  data.filters.gender = [...options.genders];
  data.filters.country = winnersByCountry
    .slice(0, 10)
    .map((d) => d[0])
    .concat(["China", "India"]);
  data.filters.year = [options.years[0], options.years.at(-1)];
  return data;
};

export const updateDataByFilter = (data, filters) => {
  console.log("Before filter, data:", data);
  let filteredData = data.rawData.filter(
    (d) =>
      filters.category.find(
        (item) => item.toLowerCase() == d.category.toLowerCase()
      ) &&
      filters.gender.find(
        (item) => item.toLowerCase() == d.gender.toLowerCase()
      ) &&
      filters.country.find(
        (item) => item.toLowerCase() == d.country.toLowerCase()
      ) &&
      d.year >= filters.year[0] &&
      d.year <= filters.year[1]
  );

  filteredData = d3
    .flatGroup(filteredData, (d) => d.country)
    .map((d, i) => {
      return d[1].map((d, j) => {
        d.winnerId = j + 1;
        d.countryId = i + 1;
        return d;
      });
    })
    .flat();

  filteredData.winnersByCountry = (() => {
    return d3
      .flatGroup(filteredData, (d) => d.country)
      .map(([key, value]) => {
        return [key, value.length];
      })
      .sort((a, b) => b[1] - a[1]);
  })();

  filteredData.maxWinners = filteredData.winnersByCountry[0];
  filteredData.countryNum = filteredData.at(-1).countryId;
  filteredData.year = filters.year;

  data.filters = filters;
  data.filteredData = filteredData;
  console.log("After filter, data:", data);
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
