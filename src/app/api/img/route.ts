export async function GET(req: Request, res: Response) {
    const { searchParams } = new URL(req.url)
    const imageUrl = searchParams.get('url');

    if (!imageUrl) {
        return new Response('Missing image URL', { status: 400 });
    }

    try {
        const imageResponse = await fetch(imageUrl);
        const imageBuffer = await imageResponse.arrayBuffer();

        return new Response(Buffer.from(imageBuffer), {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'image/jpeg',
            }
        });

    } catch (error) {
        return new Response('Error fetching image', { status: 500 });
    }
}