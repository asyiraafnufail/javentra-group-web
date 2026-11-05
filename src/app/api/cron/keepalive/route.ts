import { NextResponse } from 'next/server';
import { createPublicClient } from '@/lib/supabase/public';

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createPublicClient();
  if (!supabase) {
    return NextResponse.json(
      { status: 'skipped', message: 'Supabase credentials not configured' },
      { status: 200 }
    );
  }

  try {
    const start = Date.now();
    const { data, error } = await supabase
      .from('packages')
      .select('id')
      .limit(1);

    if (error) throw error;

    return NextResponse.json({
      status: 'active',
      timestamp: new Date().toISOString(),
      latencyMs: Date.now() - start,
      rows: data?.length ?? 0,
    });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json(
      { status: 'error', message: error.message },
      { status: 500 }
    );
  }
}
