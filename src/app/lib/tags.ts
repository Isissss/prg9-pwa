export async function getTags() {
    const tags = await fetch('https://cmgt.hr.nl/api/tags')
    .then((res) => res.json())
    .then((data) => data.data)
    .catch((error) => {
        console.error(error);
        return [];
    });  

    return tags;
}