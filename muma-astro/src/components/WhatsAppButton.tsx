import { useState, useEffect } from 'react'

export default function WhatsAppButton() {
  const numero  = '34664213450'
  const mensaje = encodeURIComponent('Hola, me interesa saber más sobre MUMA BAT COMPANY.')
  const url     = `https://wa.me/${numero}?text=${mensaje}`
  const [burbujaVisible, setBurbujaVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setBurbujaVisible(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="fixed right-8 bottom-8 z-50 flex flex-row-reverse items-center gap-4">
      {burbujaVisible && (
        <div className="bg-white text-gray-800 text-sm font-medium px-4 py-2.5 rounded-2xl rounded-tr-none shadow-lg max-w-[180px] leading-snug">
          ¿Hablamos?{' '}
          <span className="text-[#25D366] font-bold">Respondemos en minutos</span>
        </div>
      )}
      <div className="relative">
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contactar por WhatsApp"
          className="relative w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="28" height="28" fill="white">
            <path d="M16 0C7.163 0 0 7.163 0 16c0 2.833.738 5.49 2.031 7.8L0 32l8.418-2.01A15.938 15.938 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 0 1-6.765-1.849l-.486-.29-5.003 1.196 1.243-4.872-.317-.5A13.267 13.267 0 0 1 2.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.273-9.97c-.398-.199-2.354-1.162-2.719-1.294-.365-.133-.631-.199-.897.199-.265.398-1.029 1.294-1.261 1.56-.232.265-.465.298-.863.1-.398-.199-1.681-.62-3.202-1.977-1.183-1.056-1.981-2.36-2.214-2.758-.232-.398-.025-.613.175-.811.18-.178.398-.465.597-.697.199-.232.265-.398.398-.664.133-.265.066-.497-.033-.697-.1-.199-.897-2.162-1.229-2.96-.324-.778-.653-.672-.897-.684l-.764-.013c-.265 0-.697.1-1.062.497-.365.398-1.394 1.362-1.394 3.324s1.427 3.856 1.626 4.122c.199.265 2.808 4.287 6.803 6.015.951.41 1.693.655 2.271.839.954.304 1.823.261 2.51.158.765-.114 2.354-.963 2.686-1.893.332-.93.332-1.727.232-1.893-.099-.166-.365-.265-.763-.464z" />
          </svg>
        </a>
      </div>
    </div>
  )
}
