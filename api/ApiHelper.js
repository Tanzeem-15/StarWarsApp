export const fetchPeople = async (username) => {
    // console.log('People Query::: ', `https://swapi.py4e.com/api/people/?search=${encodeURIComponent(username)}`);
    const res = await fetch(`https://swapi.py4e.com/api/people/?search=${encodeURIComponent(username)}`);
    if (!res.ok) throw new Error('Network error');
    const data = await res.json();
    return data.results[0];
};

export const fetchPlanetsPage = async (urlOrSearch) => {
    const url = urlOrSearch.startsWith('http')
        ? urlOrSearch
        : `https://swapi.py4e.com/api/planets/?search=${encodeURIComponent(urlOrSearch)}`;
    // console.log('url::: ', url);
    const res = await fetch(url);
    if (!res.ok) throw new Error('Network error');
    return res.json();
};
