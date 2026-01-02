import type { APIRoute } from 'astro';
import Stripe from 'stripe';
import { Resend } from 'resend';

// Inicializar clientes
// NOTA: Asegúrate de definir estas variables en tu archivo .env
const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY, {
    // apiVersion se omitirá para usar la por defecto del paquete
});
const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
        return new Response('Firma de Stripe no encontrada', { status: 400 });
    }

    try {
        // Es CRÍTICO leer el body como texto puro para validación de firma
        const body = await request.text();

        let event;
        try {
            event = stripe.webhooks.constructEvent(
                body,
                signature,
                import.meta.env.STRIPE_WEBHOOK_SECRET
            );
        } catch (err: any) {
            console.error(`⚠️  Webhook signature verification failed.`, err.message);
            return new Response(`Webhook Error: ${err.message}`, { status: 400 });
        }

        // Manejar el evento
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object as Stripe.Checkout.Session;

            const emailCliente = session.customer_details?.email ?? 'Desconocido';
            const telefonoCliente = session.customer_details?.phone ?? 'No proporcionado';
            const monto = session.amount_total ? (session.amount_total / 100).toFixed(2) : '0.00';
            const moneda = session.currency?.toUpperCase() ?? 'EUR';

            // Generar links al dashboard de Stripe
            const isLive = session.livemode;
            const dashboardBase = isLive ? 'https://dashboard.stripe.com' : 'https://dashboard.stripe.com/test';

            const customerId = typeof session.customer === 'string' ? session.customer : session.customer?.id;
            const paymentIntentId = typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id;

            const linkCliente = customerId ? `${dashboardBase}/customers/${customerId}` : null;
            const linkTransaccion = paymentIntentId ? `${dashboardBase}/payments/${paymentIntentId}` : null;

            console.log(`💰 Pago recibido de ${emailCliente} por ${monto} ${moneda}`);

            // Enviar email de aviso usando Resend
            // IMPORTANTE: Cambia el 'to' a tu email personal
            // y asegúrate de que el 'from' sea un dominio verificado en Resend (o use onboarding@resend.dev para pruebas)
            await resend.emails.send({
                from: 'Ama el Proceso <onboarding@resend.dev>',
                to: [import.meta.env.NOTIFICATION_EMAIL ?? 'amaelprocesomaria@gmail.com'], // Usa variable de entorno o fallback
                subject: `💰 Nuevo pago de ${monto} ${moneda} - ${emailCliente}`,
                html: `
          <h1>¡Nuevo Pedido Completado!</h1>
          <p>Has recibido un nuevo pago en Stripe.</p>
          <ul>
            <li><strong>Cliente (Email):</strong> ${emailCliente}</li>
            <li><strong>Teléfono:</strong> ${telefonoCliente}</li>
            <li><strong>Monto:</strong> ${monto} ${moneda}</li>
            <li><strong>ID Sesión:</strong> ${session.id}</li>
          </ul>
          
          <p><strong>Enlaces rápidos:</strong></p>
          <ul>
            ${linkCliente ? `<li><a href="${linkCliente}">Ver Cliente en Stripe</a></li>` : ''}
            ${linkTransaccion ? `<li><a href="${linkTransaccion}">Ver Transacción en Stripe</a></li>` : ''}
          </ul>

          <p>Revisa tu dashboard de Stripe para más detalles.</p>
        `,
            });
        }

        return new Response(JSON.stringify({ received: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (err: any) {
        console.error('Error procesando webhook:', err);
        return new Response(`Server Error: ${err.message}`, { status: 500 });
    }
};
