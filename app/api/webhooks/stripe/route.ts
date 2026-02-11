import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import { supabase } from '@/lib/supabase/client';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const body = await req.text();
    const signature = headers().get('Stripe-Signature') as string;

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err: any) {
        return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
    }

    const session = event.data.object as any;

    if (event.type === 'checkout.session.completed') {
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string);

        // Update subscription in database
        await supabase
            .from('subscriptions')
            .update({
                stripe_subscription_id: subscription.id,
                stripe_customer_id: subscription.customer as string,
                status: subscription.status,
                plan_type: session.metadata.plan_type,
                current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            })
            .eq('restaurant_id', session.metadata.restaurant_id);
    }

    if (event.type === 'customer.subscription.deleted' || event.type === 'customer.subscription.updated') {
        const subscription = event.data.object as any;

        await supabase
            .from('subscriptions')
            .update({
                status: subscription.status,
                current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            })
            .eq('stripe_subscription_id', subscription.id);
    }

    return new NextResponse(null, { status: 200 });
}
