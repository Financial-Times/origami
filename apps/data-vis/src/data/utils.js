import { descending } from "d3-array";
import componentData from "./component-data.json";

export const totalData = totalReleases(false);
export const quarterlyData = totalReleases(true);

function totalReleases(quarterly) {
	let data = [];
  const releaseDates = [];

  componentData.forEach(component => {
    const name = component.name;
    const orderedReleases = component.releases.sort((a, b) => new Date(a.published_at) - new Date(b.published_at));

    const releases = orderedReleases.map((release, i) => {
      const modifiedRelease = {
        date: release.published_at,
        name,
        value: i + 1
      };

      if (quarterly) {
        const date = new Date(release.published_at);
        const quarter = convertMonthToQuarter(date.getMonth());
        const year = date.getFullYear();
        modifiedRelease.quarter = quarter;
        modifiedRelease.year = year;
      }

      return modifiedRelease;
    });

    releaseDates.push(...releases);
  });

  releaseDates.sort((a, b) => new Date(a.date) - new Date(b.date));

  const dates = [...new Set(releaseDates.map(item => item.date))];
  const releaseCounts = {};
  const labels = componentData.map(component => component.name);
  labels.forEach(name => (releaseCounts[name] = 0));

  dates.forEach(date => {
    const dateData = releaseDates.filter(item => item.date === date);

    if (quarterly) {
      const quarterActiveComponents = dateData.map(item => item.name);

      labels.forEach(name => {
        if (quarterActiveComponents.includes(name)) {
          releaseCounts[name] = dateData.find(item => item.name === name).value;
        } else {
          releaseCounts[name] = 0;
        }
      });
    } else {
      dateData.forEach(data => {
        releaseCounts[data.name] += 1;
      });
    }

    const componentsWithReleaseValues = labels.map(name => ({ name, value: releaseCounts[name] }));

    data.push([date, rank(componentsWithReleaseValues)]);
  });

  if (quarterly) {
    const dataMap = data.reduce((acc, item) => {
      const [date] = item;
      const dateObj = new Date(date);
      const quarter = convertMonthToQuarter(dateObj.getMonth());
      const year = dateObj.getFullYear();
      const key = `${year}-${quarter}`;
      acc[key] = item;
      return acc;
    }, {});

    data = Object.values(dataMap);
  }

  return { data, labels };
}

export function convertMonthToQuarter(month) {
  return Math.floor(month / 3) + 1;
}

function rank(components) {
  return components
    .sort((a, b) => descending(a.value, b.value))
    .map((d, i) => ({ ...d, rank: i }));
}
