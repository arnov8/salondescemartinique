import { NextResponse } from 'next/server'
import { z } from 'zod'
import { rateLimit, getClientIP } from '@/lib/rate-limit'

// Server-side validation schema
const exhibitorSchema = z.object({
  companyName: z.string().min(2).max(200),
  sector: z.string().min(1).max(100),
  contactName: z.string().min(2).max(100),
  email: z.string().email().max(254),
  phone: z.string().min(10).max(20),
  address: z.string().min(5).max(300),
  message: z.string().max(2000).optional(),
})

export async function POST(request: Request) {
  try {
    // Rate limiting: 3 requests per minute per IP (stricter for exhibitors)
    const clientIP = getClientIP(request)
    const rateLimitResult = rateLimit(`exhibitor:${clientIP}`, {
      windowMs: 60000,
      maxRequests: 3,
    })

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Trop de requêtes. Veuillez réessayer dans quelques minutes.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil(rateLimitResult.resetIn / 1000)),
          },
        }
      )
    }

    const data = await request.json()

    // Server-side validation
    const validationResult = exhibitorSchema.safeParse(data)
    if (!validationResult.success) {
      const errors = validationResult.error.errors.map((e) => e.message).join(', ')
      return NextResponse.json(
        { error: `Données invalides: ${errors}` },
        { status: 400 }
      )
    }

    const validData = validationResult.data

    // Log the submission (in production, save to database)
    console.log('Nouvelle demande exposant CSE/COS:', {
      companyName: validData.companyName,
      sector: validData.sector,
      contactName: validData.contactName,
      email: validData.email,
      phone: validData.phone,
      address: validData.address,
      message: validData.message,
      createdAt: new Date().toISOString(),
      ip: clientIP,
    })

    // Here you would typically:
    // - Save to database
    // - Send confirmation email
    // - Notify sales team

    return NextResponse.json(
      { message: 'Demande enregistrée avec succès' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Erreur API exhibitor:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'enregistrement. Veuillez réessayer.' },
      { status: 500 }
    )
  }
}
