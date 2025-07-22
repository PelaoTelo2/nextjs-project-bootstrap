import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'

export default function PracticesPage() {
  const practiceCategories = [
    {
      id: 'soil',
      title: 'Manejo del Suelo',
      practices: [
        {
          title: 'Análisis de Suelo Regular',
          description: 'Realizar análisis químicos y físicos del suelo cada 6 meses para determinar pH, nutrientes y estructura.',
          importance: 'Alta',
          frequency: 'Semestral'
        },
        {
          title: 'Rotación de Cultivos',
          description: 'Alternar diferentes tipos de cultivos para mantener la fertilidad del suelo y reducir plagas.',
          importance: 'Alta',
          frequency: 'Por temporada'
        },
        {
          title: 'Cobertura Vegetal',
          description: 'Mantener cobertura vegetal para prevenir erosión y mejorar la estructura del suelo.',
          importance: 'Media',
          frequency: 'Continua'
        }
      ]
    },
    {
      id: 'water',
      title: 'Gestión del Agua',
      practices: [
        {
          title: 'Riego por Goteo',
          description: 'Implementar sistemas de riego eficientes para optimizar el uso del agua.',
          importance: 'Alta',
          frequency: 'Diaria'
        },
        {
          title: 'Monitoreo de Humedad',
          description: 'Usar sensores para medir la humedad del suelo y programar riegos precisos.',
          importance: 'Media',
          frequency: 'Diaria'
        },
        {
          title: 'Captación de Agua de Lluvia',
          description: 'Instalar sistemas para recolectar y almacenar agua de lluvia.',
          importance: 'Media',
          frequency: 'Estacional'
        }
      ]
    },
    {
      id: 'pest',
      title: 'Control de Plagas',
      practices: [
        {
          title: 'Monitoreo Preventivo',
          description: 'Inspeccionar cultivos regularmente para detectar plagas y enfermedades temprano.',
          importance: 'Alta',
          frequency: 'Semanal'
        },
        {
          title: 'Control Biológico',
          description: 'Usar enemigos naturales y productos biológicos antes que químicos.',
          importance: 'Alta',
          frequency: 'Según necesidad'
        },
        {
          title: 'Aplicación Dirigida',
          description: 'Aplicar tratamientos solo en áreas afectadas, no en todo el campo.',
          importance: 'Media',
          frequency: 'Según necesidad'
        }
      ]
    },
    {
      id: 'nutrition',
      title: 'Nutrición de Plantas',
      practices: [
        {
          title: 'Fertilización Balanceada',
          description: 'Aplicar nutrientes según análisis de suelo y requerimientos del cultivo.',
          importance: 'Alta',
          frequency: 'Mensual'
        },
        {
          title: 'Compostaje',
          description: 'Producir y aplicar compost orgánico para mejorar la fertilidad del suelo.',
          importance: 'Media',
          frequency: 'Trimestral'
        },
        {
          title: 'Fertilización Foliar',
          description: 'Aplicar nutrientes directamente a las hojas para corrección rápida de deficiencias.',
          importance: 'Media',
          frequency: 'Según necesidad'
        }
      ]
    }
  ]

  const getImportanceBadge = (importance: string) => {
    const colors = {
      'Alta': 'bg-red-100 text-red-800',
      'Media': 'bg-yellow-100 text-yellow-800',
      'Baja': 'bg-green-100 text-green-800'
    }
    return colors[importance as keyof typeof colors] || colors['Media']
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Buenas Prácticas Agrícolas</h1>
        <p className="text-gray-600 mt-2">
          Guías y recomendaciones para optimizar la producción agrícola de manera sostenible
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-green-600">Sostenibilidad</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Prácticas que preservan el medio ambiente y aseguran la productividad a largo plazo
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-blue-600">Eficiencia</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Optimización de recursos como agua, fertilizantes y tiempo de trabajo
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-purple-600">Calidad</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Técnicas para mejorar la calidad y valor nutricional de los productos
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-orange-600">Rentabilidad</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Estrategias para maximizar los beneficios económicos de la producción
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Practices */}
      <Tabs defaultValue="soil" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="soil">Suelo</TabsTrigger>
          <TabsTrigger value="water">Agua</TabsTrigger>
          <TabsTrigger value="pest">Plagas</TabsTrigger>
          <TabsTrigger value="nutrition">Nutrición</TabsTrigger>
        </TabsList>

        {practiceCategories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{category.title}</h2>
              <div className="grid gap-6">
                {category.practices.map((practice, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{practice.title}</CardTitle>
                          <CardDescription className="mt-2">
                            {practice.description}
                          </CardDescription>
                        </div>
                        <div className="flex flex-col gap-2 ml-4">
                          <Badge className={getImportanceBadge(practice.importance)}>
                            {practice.importance}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {practice.frequency}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Additional Resources */}
      <Card>
        <CardHeader>
          <CardTitle>Recursos Adicionales</CardTitle>
          <CardDescription>
            Documentos y enlaces útiles para profundizar en las buenas prácticas agrícolas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900">Manual de Agricultura Sostenible</h4>
              <p className="text-sm text-gray-600 mt-1">
                Guía completa sobre técnicas de agricultura sostenible y conservación de recursos
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900">Calendario de Actividades Agrícolas</h4>
              <p className="text-sm text-gray-600 mt-1">
                Cronograma de actividades recomendadas según la época del año
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900">Guía de Identificación de Plagas</h4>
              <p className="text-sm text-gray-600 mt-1">
                Manual visual para identificar y tratar las plagas más comunes
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900">Calculadora de Fertilizantes</h4>
              <p className="text-sm text-gray-600 mt-1">
                Herramienta para calcular las dosis correctas de fertilizantes
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
