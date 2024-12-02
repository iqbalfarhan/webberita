export async function GET() {
  const users = [
    {
      id: 1,
      name: 'iqbal',
      email: 'iqbalfarhan1996@gmail.com',
    },
    {
      id: 2,
      name: 'farhan',
      email: 'ifarhan08@gmail.com',
    },
  ];

  return Response.json(users);
}

export async function POST(req: Request) {
  const res = await req.json();
  return Response.json({
    message: 'anda berhasil login',
    res,
  });
}

export async function PUT(req: Request) {
  const res = await req.json();
  return Response.json({
    message: 'anda berhasil login',
    res,
  });
}

export async function DELETE(req: Request) {
  const res = await req.json();
  return Response.json({
    message: 'anda berhasil login',
    res,
  });
}
