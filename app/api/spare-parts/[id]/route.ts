// Placeholder API route for spare-parts
// The page uses static generation and doesn't call this API
export async function GET() {
  return new Response(
    JSON.stringify({ success: true, data: [] }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}

export async function POST() {
  return new Response(
    JSON.stringify({ error: 'Not implemented' }),
    {
      status: 501,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}

export async function PUT() {
  return new Response(
    JSON.stringify({ error: 'Not implemented' }),
    {
      status: 501,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}

export async function DELETE() {
  return new Response(
    JSON.stringify({ error: 'Not implemented' }),
    {
      status: 501,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}
