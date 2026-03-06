'use client'

import { useState, useRef, useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle, Printer, Send, AlertCircle, Loader2 } from 'lucide-react'
import SignaturePad from '../SignaturePad'
import CGVPage1 from '../CGVPage1'
import CGVPage2 from '../CGVPage2'

// --- Schema ---
const inscriptionSchema = z.object({
  entreprise: z.string().min(2, 'Requis').max(200),
  siret: z.string().regex(/^\d{14}$/, 'SIRET invalide (14 chiffres)'),
  adresse: z.string().min(5, 'Requis').max(300),
  representant: z.string().min(2, 'Requis').max(100),
  telBureau: z.string().min(10, 'Requis').max(20),
  telPortable: z.string().min(10, 'Requis').max(20),
  email: z.string().email('Email invalide').max(254),
  facebook: z.string().max(100).optional().or(z.literal('')),
  instagram: z.string().max(100).optional().or(z.literal('')),
  siteWeb: z.string().max(200).optional().or(z.literal('')),
  produits: z.string().min(2, 'Requis').max(500),
  emplacement: z.literal(true, { errorMap: () => ({ message: 'Obligatoire' }) }),
  cadeauTombola: z.string().min(2, 'Cadeau tombola obligatoire (valeur mini 120€)').max(300),
  optionLogo: z.boolean().optional(),
  optionFacebook: z.boolean().optional(),
  optionRadio: z.boolean().optional(),
  optionEmailing: z.boolean().optional(),
  optionSacs: z.boolean().optional(),
  luEtApprouve: z.literal(true, { errorMap: () => ({ message: 'Vous devez accepter les CGV' }) }),
  honeypot: z.string().max(0).optional(),
})

type InscriptionData = z.infer<typeof inscriptionSchema>

const PRICES = { emplacement: 905, logo: 250, facebook: 400, radio: 400, emailing: 400, sacs: 800 } as const
const TVA_RATE = 0.085
function fmt(n: number) { return n.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }

// A4 page wrapper
const PAGE = "a4-page bg-white mx-auto shadow-[0_1px_10px_rgba(0,0,0,0.12)] border border-gray-300 relative"

const FOOTER = "ANTILLES SALONS SASU – Centre Commercial de Bellevue Corniche 3 Bvd de la Marne 97200 Fort-de-France Martinique – Tél. : 0596 61 21 21 - Port. : 0696 26 30 96 – 0696 33 47 00 – SASU au capital de 1 000€ – RCS de Fort-de-France - SIRET 879 070 852 00022 - Assurance RC CS000000006691"

export default function InscriptionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [signatureAlert, setSignatureAlert] = useState<string | null>(null)
  const [signature, setSignature] = useState<string | null>(null)
  const [signatureCGV, setSignatureCGV] = useState<string | null>(null)
  const contractRef = useRef<HTMLDivElement>(null)

  const { register, handleSubmit, watch, formState: { errors } } = useForm<InscriptionData>({
    resolver: zodResolver(inscriptionSchema),
    defaultValues: { emplacement: true, optionLogo: false, optionFacebook: false, optionRadio: false, optionEmailing: false, optionSacs: false, luEtApprouve: undefined },
  })

  const w = watch(['optionLogo', 'optionFacebook', 'optionRadio', 'optionEmailing', 'optionSacs'])
  const totals = useMemo(() => {
    let ht = PRICES.emplacement
    if (w[0]) ht += PRICES.logo; if (w[1]) ht += PRICES.facebook; if (w[2]) ht += PRICES.radio; if (w[3]) ht += PRICES.emailing; if (w[4]) ht += PRICES.sacs
    const tva = Math.round(ht * TVA_RATE * 100) / 100
    return { totalHT: ht, tva, totalTTC: Math.round((ht + tva) * 100) / 100 }
  }, [w])

  const checkSignatures = useCallback(() => {
    if (!signature && !signatureCGV) {
      setSignatureAlert('Veuillez signer les deux cases de signature : celle du contrat (page 1) et celle des CGV (page 3).')
      return false
    }
    if (!signature) {
      setSignatureAlert('Veuillez signer la case de signature du contrat de participation (page 1, en bas à droite).')
      return false
    }
    if (!signatureCGV) {
      setSignatureAlert('Veuillez signer la case de signature d\'acceptation des CGV (page 3, « lu et approuvé »).')
      return false
    }
    setSignatureAlert(null)
    return true
  }, [signature, signatureCGV])

  const handlePrint = useCallback(() => {
    if (!checkSignatures()) return
    window.print()
  }, [checkSignatures])

  const onSubmit = useCallback(async (data: InscriptionData) => {
    if (!checkSignatures()) return
    if (data.honeypot) { setIsSubmitted(true); return }
    setIsSubmitting(true); setSubmitError(null)
    try {
      let pdfBase64: string | null = null
      if (contractRef.current) {
        const html2pdf = (await import('html2pdf.js')).default
        const pdfBlob = await html2pdf().set({
          margin: 0, filename: 'bulletin-inscription.pdf',
          image: { type: 'jpeg', quality: 0.95 },
          html2canvas: { scale: 2, useCORS: true, logging: false },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
          pagebreak: { mode: ['css'], before: '.page-break-before' },
        }).from(contractRef.current).outputPdf('blob')
        const reader = new FileReader()
        pdfBase64 = await new Promise<string>((resolve) => {
          reader.onloadend = () => resolve((reader.result as string).split(',')[1])
          reader.readAsDataURL(pdfBlob)
        })
      }
      const res = await fetch('/api/inscription', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, signature, signatureCGV, pdfBase64, totalHT: totals.totalHT, tva: totals.tva, totalTTC: totals.totalTTC }),
      })
      if (!res.ok) { const err = await res.json(); throw new Error(err.error || 'Erreur') }
      setIsSubmitted(true)
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Erreur lors de l\'envoi.')
    } finally { setIsSubmitting(false) }
  }, [signature, signatureCGV, totals, checkSignatures])

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-10 border border-gray-100">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-3">Bulletin d&apos;inscription envoyé !</h2>
          <p className="text-gray-600 text-lg mb-1">Merci pour votre inscription au Salon des CSE &amp; COS de Martinique 2026.</p>
          <p className="text-gray-500 mb-8">Un email de confirmation avec votre bulletin en pièce jointe vous sera envoyé sous quelques minutes.</p>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-left mb-6">
            <h3 className="font-bold text-amber-900 mb-2 text-base">Prochaine étape — Validez votre inscription :</h3>
            <p className="text-amber-800 text-sm leading-relaxed">
              Votre inscription sera définitive une fois que vous aurez procédé au <strong>virement d&apos;acompte de 50%</strong>, soit <strong>{fmt(totals.totalTTC / 2)}€ TTC</strong>.<br />
              Les virements doivent être émis à l&apos;ordre de <strong>ANTILLES SALONS</strong>.
            </p>
            <a href="/docs/rib-antilles-salons.pdf" download className="inline-block mt-3 bg-primary text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-primary-dark transition-colors">
              Télécharger notre RIB
            </a>
          </div>

          <div className="bg-blue-50 rounded-xl p-4 text-sm text-primary">
            <strong>Jeudi 1er Octobre 2026</strong> — Palais des Congrès de Madiana, Schœlcher<br />
            <span className="text-xs text-gray-500">Installation : Mercredi 30 Septembre de 15h à 18h</span>
          </div>

          <p className="mt-6 text-sm text-gray-400">
            Une question ? Contactez-nous au 05 96 61 21 21 ou 06 96 26 30 96
          </p>
        </div>
      </div>
    )
  }

  // Mobile-friendly + print-compact inputs
  const inp = "w-full bg-gray-50 border border-gray-300 rounded px-3 py-2.5 sm:px-2 sm:py-[3px] text-sm sm:text-[12px] text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary placeholder:text-gray-400"
  const errS = "text-red-500 text-xs sm:text-[9px]"

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <input type="text" {...register('honeypot')} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div ref={contractRef} id="contrat-printable">

        {/* ==================== PAGE 1 : CONTRAT ==================== */}
        <div className={PAGE}>
          <div className="a4-inner p-5 sm:px-[9mm] sm:py-[5mm]">

            {/* En-tête avec vrai logo */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-1.5 border-b-2 border-primary pb-3 sm:pb-1.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo-scse-mq-bleu.png" alt="Le Salon des CSE & COS de Martinique" className="h-[45px] sm:h-[45px] w-auto" />
              <div className="text-center sm:text-right">
                <h1 className="text-base sm:text-[18px] font-black text-primary leading-tight tracking-tight">CONTRAT DE PARTICIPATION</h1>
                <p className="text-xs sm:text-[11px] text-gray-700 font-semibold mt-0.5">Salon des CSE &amp; COS de Martinique 2026</p>
                <p className="text-[11px] sm:text-[10px] text-gray-500">Jeudi 1er Octobre 2026 &middot; Madiana Schœlcher</p>
              </div>
            </div>

            {/* Champs entreprise */}
            <div className="space-y-3 sm:space-y-[4px] mb-4 sm:mb-1">
              <MobileField label="L'Entreprise" inp={inp} reg={register('entreprise')} ph="Nom de votre entreprise" err={errors.entreprise?.message} errS={errS} />
              <MobileField label="N°SIRET (obligatoire)*" inp={inp} reg={register('siret')} ph="14 chiffres" err={errors.siret?.message} errS={errS} max={14} />
              <MobileField label="Adresse" inp={inp} reg={register('adresse')} ph="Adresse complète" err={errors.adresse?.message} errS={errS} />
              <MobileField label="Représentée par" inp={inp} reg={register('representant')} ph="Nom et prénom" err={errors.representant?.message} errS={errS} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-2 print-grid-2">
                <MobileField label="Tel Bureau" inp={inp} reg={register('telBureau')} ph="0596 XX XX XX" err={errors.telBureau?.message} errS={errS} type="tel" />
                <MobileField label="Tel Portable" inp={inp} reg={register('telPortable')} ph="0696 XX XX XX" err={errors.telPortable?.message} errS={errS} type="tel" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-2 print-grid-2">
                <MobileField label="Email" inp={inp} reg={register('email')} ph="email@exemple.com" err={errors.email?.message} errS={errS} type="email" />
                <MobileField label="Page Facebook" inp={inp} reg={register('facebook')} ph="(optionnel)" errS={errS} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-2 print-grid-2">
                <MobileField label="Site web" inp={inp} reg={register('siteWeb')} ph="(optionnel)" errS={errS} />
                <MobileField label="Page Instagram" inp={inp} reg={register('instagram')} ph="(optionnel)" errS={errS} />
              </div>
              <MobileField label="Produits/services" inp={inp} reg={register('produits')} ph="Décrivez vos produits ou services" err={errors.produits?.message} errS={errS} />
            </div>

            {/* Clauses */}
            <div className="text-xs sm:text-[9px] leading-snug text-gray-500 mb-3 sm:mb-1 space-y-1 sm:space-y-0 print-text-compact">
              <p>1. Nous confirmons par la présente notre participation au Salon des CSE &amp; COS de Martinique 2026.</p>
              <p>2. Nous confirmons avoir pris connaissance des conditions générales et acceptons les termes sans réserve.</p>
              <p>3. Nous nous engageons à remettre à ANTILLES SALONS tous règlements et documents nécessaires.</p>
              <p>4. Nous réservons la ou (les) prestations suivantes :</p>
            </div>

            {/* TABLEAU TARIFS */}
            <table className="w-full border-collapse border border-gray-400 text-xs sm:text-[10px] mb-3 sm:mb-1">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-400 px-2 sm:px-1.5 py-2 sm:py-1 text-left font-bold"></th>
                  <th className="border border-gray-400 px-2 sm:px-1 py-2 sm:py-1 text-center font-bold w-[90px] sm:w-[75px]">TARIF</th>
                  <th className="border border-gray-400 px-2 sm:px-1 py-2 sm:py-1 text-center font-bold w-[50px] sm:w-[40px]">CHOIX</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-400 px-2 sm:px-1.5 py-2 sm:py-1">
                    <span className="font-bold text-sm sm:text-[11px]">LOCATION EMPLACEMENT + ELECTRICITE (SANS CLOISON)</span><br />
                    <span className="text-gray-500">Espace de 5m², livré avec 1 table et 4 chaises avec accès électrique</span>
                  </td>
                  <td className="border border-gray-400 px-2 sm:px-1 py-2 sm:py-1 text-center font-bold text-sm sm:text-[11px]">905,00€ HT</td>
                  <td className="border border-gray-400 px-2 sm:px-1 py-2 sm:py-1 text-center"><input type="checkbox" {...register('emplacement')} className="w-5 h-5 sm:w-3.5 sm:h-3.5 accent-primary pointer-events-none" tabIndex={-1} /></td>
                </tr>
                <tr className="bg-amber-50">
                  <td className="border border-gray-400 px-2 sm:px-1.5 py-2 sm:py-1" colSpan={3}>
                    <span className="font-bold text-sm sm:text-[11px]">CADEAU DE TOMBOLA* <span className="text-red-600">(OBLIGATOIRE)</span></span><br />
                    <span className="text-gray-500">Cadeau pour la Tombola des Comités (valeur mini 120€) :</span>
                    <input {...register('cadeauTombola')} className={inp + " !bg-white mt-1"} placeholder="Merci de décrire le cadeau offert par vos soins..." />
                    {errors.cadeauTombola && <span className={errS}> {errors.cadeauTombola.message}</span>}
                  </td>
                </tr>
                <OptRow reg={register} name="optionLogo" t="OPTION LOGO" d="Logo sur carton d'invitation – 355 Comités. Max 10 exposants (Bouclage 10/07)" p="250€ HT" />
                <OptRow reg={register} name="optionFacebook" t="OPTION FACEBOOK-INSTAGRAM" d="Pub Facebook dédiée – 15 jours. Max 3 participants (Bouclage 10/07)" p="400€ HT" />
                <OptRow reg={register} name="optionRadio" t="OPTION RADIO" d="Spot RCI – 3 passages/jour, 6 jours – 54 000 auditeurs/jour. Limité à 3" p="400€ HT" />
                <OptRow reg={register} name="optionEmailing" t="OPTION EMAILING" d="Visuel dans emailing invitations – 355 destinataires. Limité à 3 (Bouclage 10/07)" p="400€ HT" />
                <OptRow reg={register} name="optionSacs" t="OPTION SACS" d="Logo sur sacs visiteurs – 650 ex. Limité à 1 (Bouclage 14/07)" p="800€ HT" />
              </tbody>
            </table>

            {/* Totaux + Paiement */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-1.5 mb-3 sm:mb-1.5 print-grid-2">
              <div className="text-xs sm:text-[10px] text-gray-700 border border-gray-400 rounded p-3 sm:p-1.5 space-y-1 sm:space-y-0">
                <p className="font-bold text-sm sm:text-[11px]">Modalité de paiement : 2 virements</p>
                <p>– 1<sup>er</sup> virement à la réservation</p>
                <p>– 2<sup>e</sup> virement au <u>15 septembre 2026</u></p>
                <p className="mt-1 font-bold text-sm sm:text-[11px]"><u>Clôture des inscriptions : 1er juillet 2026</u></p>
                <p className="mt-1">5. Nous émettons 1 virement de 50% d&apos;acompte.</p>
              </div>
              <table className="border-collapse border border-gray-400 text-sm sm:text-[11px] h-fit">
                <tbody>
                  <tr><td className="border border-gray-400 px-3 sm:px-2 py-2 sm:py-1.5 font-semibold text-gray-600">Total HT</td><td className="border border-gray-400 px-3 sm:px-2 py-2 sm:py-1.5 text-right font-bold">{fmt(totals.totalHT)}€</td></tr>
                  <tr><td className="border border-gray-400 px-3 sm:px-2 py-2 sm:py-1.5 font-semibold text-gray-600">TVA 8,5%</td><td className="border border-gray-400 px-3 sm:px-2 py-2 sm:py-1.5 text-right font-bold">{fmt(totals.tva)}€</td></tr>
                  <tr className="bg-primary/5"><td className="border border-gray-400 px-3 sm:px-2 py-2 sm:py-1.5 font-bold text-primary">Total TTC</td><td className="border border-gray-400 px-3 sm:px-2 py-2 sm:py-1.5 text-right font-black text-primary text-base sm:text-[13px]">{fmt(totals.totalTTC)}€</td></tr>
                </tbody>
              </table>
            </div>

            {/* Date + Signature */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-1.5 print-grid-2">
              <div className="text-sm sm:text-[11px] text-gray-600 self-end">
                <p>Fait le {new Date().toLocaleDateString('fr-FR')} à Fort-de-France</p>
              </div>
              <div className="border border-gray-400 rounded p-3 sm:p-2">
                <p className="text-xs sm:text-[10px] font-bold text-gray-600">SIGNATURE DU RESPONSABLE</p>
                <SignaturePad onSignatureChange={(sig) => { setSignature(sig); setSignatureAlert(null) }} label="Votre signature" />
              </div>
            </div>

            {/* Pied de page */}
            <div className="mt-3 sm:mt-2 pt-1 border-t border-gray-200 text-center text-[6.5px] sm:text-[8px] text-gray-400 leading-snug">
              {FOOTER}
            </div>

          </div>
          <PageNumber n={1} total={3} />
        </div>

        {/* ==================== PAGE 2 : CGV (partie 1) ==================== */}
        <div className={PAGE + " page-break-before mt-6"}>
          <div className="a4-inner p-5 sm:p-[12mm]">
            <CGVPage1 />
            <div className="mt-3 sm:mt-2 pt-1 border-t border-gray-200 text-center text-[6.5px] sm:text-[8px] text-gray-400 leading-snug">
              {FOOTER}
            </div>
          </div>
          <PageNumber n={2} total={3} />
        </div>

        {/* ==================== PAGE 3 : CGV (partie 2) + signatures ==================== */}
        <div className={PAGE + " page-break-before mt-6"}>
          <div className="a4-inner p-5 sm:p-[12mm]">
            <CGVPage2 />

            {/* Acceptation + Signature CGV */}
            <div className="mt-5 sm:mt-4 pt-3 border-t-2 border-primary">
              <div className="flex items-start gap-3 sm:gap-2 mb-3">
                <input type="checkbox" {...register('luEtApprouve')} id="luEtApprouve" className="w-5 h-5 sm:w-4 sm:h-4 mt-0.5 accent-primary shrink-0" />
                <label htmlFor="luEtApprouve" className="text-sm sm:text-[12px] text-gray-700 cursor-pointer leading-snug">
                  <strong>Lu et approuvé.</strong> Je confirme avoir pris connaissance des conditions générales de vente et de participation au Salon des CSE &amp; COS de Martinique 2026 et en accepte les termes sans réserve.
                </label>
              </div>
              {errors.luEtApprouve && <p className={errS}>{errors.luEtApprouve.message}</p>}

              <div className="sm:max-w-[220px]">
                <SignaturePad onSignatureChange={(sig) => { setSignatureCGV(sig); setSignatureAlert(null) }} label="SIGNATURE DU RESPONSABLE" />
              </div>
            </div>

            <div className="mt-3 sm:mt-2 pt-1 border-t border-gray-200 text-center text-[6.5px] sm:text-[8px] text-gray-400 leading-snug">
              {FOOTER}
            </div>
          </div>
          <PageNumber n={3} total={3} />
        </div>

      </div>

      {/* Boutons d'action */}
      <div className="max-w-[210mm] mx-auto mt-6 px-4 sm:px-0 no-print">
        {signatureAlert && (
          <div className="flex items-center gap-2 bg-amber-50 border border-amber-300 rounded-xl p-3 mb-3 animate-fade-up">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <p className="text-sm text-amber-800 font-medium">{signatureAlert}</p>
          </div>
        )}
        {Object.keys(errors).length > 0 && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl p-3 mb-3 animate-fade-up">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
            <p className="text-sm text-red-700 font-medium">Veuillez compléter tous les champs obligatoires avant d&apos;envoyer.</p>
          </div>
        )}
        {submitError && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl p-3 mb-3">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
            <p className="text-xs text-red-700">{submitError}</p>
          </div>
        )}
        <div className="flex flex-col sm:flex-row gap-3">
          <button type="button" onClick={handlePrint} className="flex items-center justify-center gap-2 btn-outline-primary flex-1">
            <Printer className="w-4 h-4" /> Imprimer le bulletin + CGV
          </button>
          <button type="submit" disabled={isSubmitting} className="flex items-center justify-center gap-2 btn-accent flex-1 disabled:opacity-50 disabled:cursor-not-allowed">
            {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Envoi en cours...</> : <><Send className="w-4 h-4" /> Signer et envoyer mon inscription</>}
          </button>
        </div>
        <p className="text-sm sm:text-base text-gray-600 text-center mt-4 leading-relaxed">
          En soumettant ce formulaire d&apos;inscription, votre bulletin sera envoyé à l&apos;équipe du Salon des CSE &amp; COS de Martinique. Après réception et vérification, vous recevrez une confirmation par email.
        </p>
        <p className="text-sm sm:text-base text-gray-600 text-center mt-2 leading-relaxed">
          Votre inscription sera définitive une fois que vous aurez procédé au virement d&apos;acompte de 50%. Les virements doivent être émis à l&apos;ordre de ANTILLES SALONS (<a href="/docs/rib-antilles-salons.pdf" download className="text-primary underline hover:text-accent font-semibold">voir notre RIB</a>).
        </p>
      </div>
    </form>
  )
}

function PageNumber({ n, total }: { n: number; total: number }) {
  return <div className="absolute bottom-2 right-4 text-[8px] text-gray-400">Page {n} sur {total}</div>
}

function MobileField({ label, inp, reg, ph, err, errS, type, max }: {
  label: string; inp: string; reg: ReturnType<typeof useForm<InscriptionData>>['register'] extends (...args: infer A) => infer R ? R : never
  ph: string; err?: string; errS: string; type?: string; max?: number
}) {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-1.5 print-field-inline">
        <label className="text-sm sm:text-[11px] font-bold text-gray-700 sm:w-[130px] sm:shrink-0">{label} :</label>
        <input {...reg} type={type || 'text'} className={inp} placeholder={ph} maxLength={max} />
      </div>
      {err && <p className={errS + " sm:ml-[115px]"}>{err}</p>}
    </div>
  )
}

function OptRow({ reg, name, t, d, p }: {
  reg: ReturnType<typeof useForm<InscriptionData>>['register']
  name: 'optionLogo' | 'optionFacebook' | 'optionRadio' | 'optionEmailing' | 'optionSacs'
  t: string; d: string; p: string
}) {
  return (
    <tr>
      <td className="border border-gray-400 px-2 sm:px-1.5 py-2 sm:py-1"><span className="font-bold text-sm sm:text-[10px] underline">{t}</span><br /><span className="text-gray-500">{d}</span></td>
      <td className="border border-gray-400 px-2 sm:px-1 py-2 sm:py-1 text-center font-bold text-sm sm:text-[11px]">{p}</td>
      <td className="border border-gray-400 px-2 sm:px-1 py-2 sm:py-1 text-center"><input type="checkbox" {...reg(name)} className="w-5 h-5 sm:w-3.5 sm:h-3.5 accent-primary cursor-pointer" /></td>
    </tr>
  )
}
