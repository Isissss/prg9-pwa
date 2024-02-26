
export async function getCMGTProjects() {
    try {
        const req = await fetch("https://cmgt.hr.nl/api/projects");
        const data = await req.json(); 
        console.log(data);
        return data.data;

    } catch (error) {
        console.error(error);
        return [];
    }

}