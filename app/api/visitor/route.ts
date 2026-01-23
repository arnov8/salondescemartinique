import { NextResponse } from 'next/server'
import { z } from 'zod'
import { rateLimit, getClientIP } from '@/lib/rate-limit'

// Server-side validation schema
const visitorSchema = z.object({
  fullName: z.string().min(2).max(100),
  position: z.string().min(2).max(100),
  company: z.string().min(2).max(200),
  cseName: z.string().min(2).max(200),
  email: z.string().email().max(254),
  phone: z.string().min(10).max(20),
})

export async function POST(request: Request) {
  try {
    // Rate limiting: 5 requests per minute per IP
    const clientIP = getClientIP(request)
    const rateLimitResult = rateLimit(`visitor:${clientIP}`, {
      windowMs: 60000,
      maxRequests: 5,
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
    const validationResult = visitorSchema.safeParse(data)
    if (!validationResult.success) {
      const errors = validationResult.error.errors.map((e) => e.message).join(', ')
      return NextResponse.json(
        { error: `Données invalides: ${errors}` },
        { status: 400 }
      )
    }

    const validData = validationResult.data

    // Log the submission (in production, save to database)
    console.log('Nouvelle inscription visiteur CSE/COS:', {
      fullName: validData.fullName,
      position: validData.position,
      company: validData.company,
      cseName: validData.cseName,
      email: validData.email,
      phone: validData.phone,
      createdAt: new Date().toISOString(),
      ip: clientIP,
    })

    // Here you would typically:
    // - Save to database
    // - Send confirmation email
    // - Generate visitor badge

    return NextResponse.json(
      { message: 'Inscription enregistrée avec succès' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Erreur API visitor:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'enregistrement. Veuillez réessayer.' },
      { status: 500 }
    )
  }
}
