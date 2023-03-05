const apiKey = 'pk.eyJ1Ijoicm9tYW5rb2xhciIsImEiOiJjbGV2cWFvaDkwOTYxNDRvNHZtN3B3ZGZrIn0.BCwmoWw5rzrYgVnBzC5sPA';

export async function getPlacesResponse(text) {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json?access_token=${apiKey}&cachebuster=1625641871908&autocomplete=true&types=place`;
    try {
        const res = await fetch(url, {
            method: 'GET'
        });
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
    } catch (err) {
        return { error: 'Unable to retrieve places' };
    }
};