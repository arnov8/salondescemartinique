export default function InscriptionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <style>{`
        header { display: none !important; }
        footer { display: none !important; }
        main { padding-top: 0 !important; }
      `}</style>
      {children}
    </>
  )
}
