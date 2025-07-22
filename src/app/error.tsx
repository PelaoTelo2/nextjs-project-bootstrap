'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-red-600 text-2xl">Error del Sistema</CardTitle>
          <CardDescription className="text-lg">
            Ha ocurrido un problema en la aplicación agrícola
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-6xl mb-4">🚜</div>
            <p className="text-gray-600">
              Nuestro sistema está experimentando dificultades técnicas. 
              Por favor, intenta nuevamente o regresa al panel principal.
            </p>
          </div>
          
          {error.message && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-800 font-medium">Detalles del error:</p>
              <p className="text-sm text-red-600 mt-1">{error.message}</p>
            </div>
          )}

          <div className="flex flex-col space-y-3">
            <Button
              onClick={reset}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Reintentar
            </Button>
            <Link href="/dashboard">
              <Button variant="outline" className="w-full">
                Volver al Dashboard
              </Button>
            </Link>
            <Link href="/practices">
              <Button variant="ghost" className="w-full">
                Ver Buenas Prácticas
              </Button>
            </Link>
          </div>

          <div className="text-center text-sm text-gray-500">
            <p>Si el problema persiste, contacta al administrador del sistema</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
