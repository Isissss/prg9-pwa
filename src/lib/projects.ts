
export async function getCMGTProjects() {
 
        const req = await fetch("https://cmgt.hr.nl/api/projects").catch((error) => { console.log(error) });
        console.log(req);
        if (!req) return [];
        const data = await req.json();  
        return data.data; 
}

export async function getProject(key: string) {
  console.log(key);
  const req = await fetch(`https://cmgt.hr.nl/api/projects/${key}`).catch((error) => { console.log(error) });
  if (!req) return [];
  const data = await req.json();  
  console.log(data); 
  return data; 
}