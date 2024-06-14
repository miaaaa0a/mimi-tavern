const API_KEY = import.meta.env.PRIVATE_API_KEY;

export async function POST({ redirect, url }) {
    const link = `https://www.last.fm/api/auth/?api_key=${API_KEY}&cb=http://127.0.0.1:4321/judgement`;
    return redirect(link);
}