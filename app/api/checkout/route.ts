import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
    try {
        const { planId, restaurantId } = await req.json();
        const supabase = createServerComponentClient({ cookies });
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const checkoutSession = await stripe.checkout.sessions.create({
            mode: 'subscription',
            payment_method_types: ['card'],
            line_items: [
                {
                    price: planId, // This would be the actual Stripe Price ID
                    quantity: 1,
                },
            ],
            subscription_data: {
                trial_period_days: 14, // <--- THE 2 WEEK FREE TRIAL
                metadata: {
                    restaurant_id: restaurantId,
                    plan_type: planId,
                },
            },
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings/subscription`,
            metadata: {
                restaurant_id: restaurantId,
                plan_type: planId,
            },
        });

        return NextResponse.json({ url: checkoutSession.url });
    } catch (err: any) {
        return new NextResponse(err.message, { status: 500 });
    }
}
