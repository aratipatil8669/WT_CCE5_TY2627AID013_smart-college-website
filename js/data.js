
const dataCache = {};

async function getData(file) {
    if (dataCache[file]) {
        return dataCache[file];
    }

    const response = await fetch("data/" + file + ".json");

    if (!response.ok) {
        throw new Error("Unable to load " + file + ".json");
    }

    const data = await response.json();
    dataCache[file] = data;

    return data;
}
