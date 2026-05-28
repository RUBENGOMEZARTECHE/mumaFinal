import { Player } from '@lottiefiles/react-lottie-player'
import { ArrowRight } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <main className="min-h-screen bg-fondo-base flex flex-col items-center justify-center px-6 text-center">
      <Player
        autoplay
        loop
        src="/animations/The Bat.json"
        style={{ width: 260, height: 260 }}
      />
      <p className="text-xs font-bold tracking-[0.3em] text-marca-principal uppercase mb-4">Error 404</p>
      <h1 className="text-4xl sm:text-5xl font-bold text-texto-titulo mb-4 leading-tight">
        Este murciélago <br /> se ha perdido.
      </h1>
      <p className="text-texto-secundario text-lg mb-10 max-w-sm">
        La página que buscas no existe o ha cambiado de ubicación.
      </p>
      <a href="/" className="inline-flex items-center gap-2 px-8 py-4 bg-marca-principal text-black font-bold rounded-xl hover:opacity-90 transition-opacity no-underline">
        Volver al inicio <ArrowRight size={16} />
      </a>
    </main>
  )
}
