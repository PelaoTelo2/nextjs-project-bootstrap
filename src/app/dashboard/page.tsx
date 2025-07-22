import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function DashboardPage() {
  const stats = [
    {
      title: 'Maquinarias Activas',
      value: '12',
      description: '3 en mantenimiento',
      color: 'text-green-600'
    },
    {
      title: 'Tareas Pendientes',
      value: '8',
      description: '2 vencen hoy',
      color: 'text-orange-600'
    },
    {
      title: 'Aplicaciones Programadas',
      value: '5',
      description: 'Esta semana',
      color: 'text-blue-600'
    },
    {
      title: 'Cuarteles Monitoreados',
      value: '24',
      description: '2 requieren atención',
      color: 'text-purple-600'
    }
  ]

  const quickActions = [
    {
      title: 'Buenas Prácticas',
      description: 'Consultar guías y recomendaciones',
      href: '/practices',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'Control de Maquinarias',
      description: 'Monitorear y controlar equipos',
      href: '/machinery',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Gestión de Tareas',
      description: 'Programar y seguir actividades',
      href: '/tasks',
      color: 'bg-orange-500 hover:bg-orange-600'
    },
    {
      title: 'Aplicación de Fertilizantes',
      description: 'Planificar tratamientos',
      href: '/fertilization',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      title: 'Gestión de Cuarteles',
      description: 'Administrar campos y sectores',
      href: '/fields',
      color: 'bg-teal-500 hover:bg-teal-600'
    }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Agrícola</h1>
        <p className="text-gray-600 mt-2">
          Resumen general de las operaciones y estado de la finca
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className={`text-2xl font-bold ${stat.color}`}>
                {stat.value}
              </CardTitle>
              <CardDescription className="text-sm font-medium">
                {stat.title}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-500">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{action.title}</CardTitle>
                <CardDescription>{action.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href={action.href}>
                  <Button className={`w-full text-white ${action.color}`}>
                    Acceder
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Actividad Reciente</CardTitle>
          <CardDescription>Últimas acciones realizadas en el sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Aplicación de fertilizante completada</p>
                <p className="text-xs text-gray-500">Cuartel Norte - hace 2 horas</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Tractor T-001 enviado a mantenimiento</p>
                <p className="text-xs text-gray-500">hace 4 horas</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Nueva tarea de siembra programada</p>
                <p className="text-xs text-gray-500">Cuartel Sur - hace 6 horas</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
