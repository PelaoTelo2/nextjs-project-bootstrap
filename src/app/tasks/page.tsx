'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

interface Task {
  id: string
  title: string
  description: string
  type: 'siembra' | 'riego' | 'fertilizacion' | 'cosecha' | 'mantenimiento' | 'control-plagas'
  priority: 'alta' | 'media' | 'baja'
  status: 'pendiente' | 'en-progreso' | 'completada' | 'vencida'
  assignedTo: string
  field: string
  dueDate: string
  createdDate: string
  estimatedHours: number
  completedHours?: number
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 'T-001',
      title: 'Siembra de Maíz - Cuartel Norte',
      description: 'Preparar y sembrar maíz en el cuartel norte, verificar humedad del suelo antes de iniciar',
      type: 'siembra',
      priority: 'alta',
      status: 'pendiente',
      assignedTo: 'Juan Pérez',
      field: 'Cuartel Norte',
      dueDate: '2024-02-15',
      createdDate: '2024-02-01',
      estimatedHours: 8
    },
    {
      id: 'T-002',
      title: 'Aplicación de Fertilizante NPK',
      description: 'Aplicar fertilizante NPK 15-15-15 en el cuartel sur según análisis de suelo',
      type: 'fertilizacion',
      priority: 'alta',
      status: 'en-progreso',
      assignedTo: 'María González',
      field: 'Cuartel Sur',
      dueDate: '2024-02-12',
      createdDate: '2024-02-05',
      estimatedHours: 4,
      completedHours: 2
    },
    {
      id: 'T-003',
      title: 'Mantenimiento Tractor T-001',
      description: 'Cambio de aceite, filtros y revisión general del tractor T-001',
      type: 'mantenimiento',
      priority: 'media',
      status: 'completada',
      assignedTo: 'Carlos Rodríguez',
      field: 'Taller',
      dueDate: '2024-02-08',
      createdDate: '2024-02-01',
      estimatedHours: 6,
      completedHours: 6
    },
    {
      id: 'T-004',
      title: 'Control de Plagas - Áfidos',
      description: 'Inspección y tratamiento contra áfidos en el cuartel este',
      type: 'control-plagas',
      priority: 'alta',
      status: 'vencida',
      assignedTo: 'Ana Martínez',
      field: 'Cuartel Este',
      dueDate: '2024-02-05',
      createdDate: '2024-01-28',
      estimatedHours: 3
    },
    {
      id: 'T-005',
      title: 'Riego por Aspersión',
      description: 'Activar sistema de riego por aspersión en cuartel oeste por 4 horas',
      type: 'riego',
      priority: 'media',
      status: 'pendiente',
      assignedTo: 'Luis Torres',
      field: 'Cuartel Oeste',
      dueDate: '2024-02-14',
      createdDate: '2024-02-08',
      estimatedHours: 1
    }
  ])

  const [isAddingTask, setIsAddingTask] = useState(false)
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    type: '',
    priority: '',
    assignedTo: '',
    field: '',
    dueDate: new Date(),
    estimatedHours: 1
  })

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'pendiente': { label: 'Pendiente', className: 'bg-yellow-100 text-yellow-800' },
      'en-progreso': { label: 'En Progreso', className: 'bg-blue-100 text-blue-800' },
      'completada': { label: 'Completada', className: 'bg-green-100 text-green-800' },
      'vencida': { label: 'Vencida', className: 'bg-red-100 text-red-800' }
    }
    const config = statusConfig[status as keyof typeof statusConfig]
    return <Badge className={config.className}>{config.label}</Badge>
  }

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      'alta': { label: 'Alta', className: 'bg-red-100 text-red-800' },
      'media': { label: 'Media', className: 'bg-yellow-100 text-yellow-800' },
      'baja': { label: 'Baja', className: 'bg-green-100 text-green-800' }
    }
    const config = priorityConfig[priority as keyof typeof priorityConfig]
    return <Badge className={config.className}>{config.label}</Badge>
  }

  const getTypeLabel = (type: string) => {
    const typeLabels = {
      'siembra': 'Siembra',
      'riego': 'Riego',
      'fertilizacion': 'Fertilización',
      'cosecha': 'Cosecha',
      'mantenimiento': 'Mantenimiento',
      'control-plagas': 'Control de Plagas'
    }
    return typeLabels[type as keyof typeof typeLabels] || type
  }

  const updateTaskStatus = (taskId: string, newStatus: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status: newStatus as Task['status'] } : task
    ))
  }

  const addNewTask = () => {
    const task: Task = {
      id: `T-${String(tasks.length + 1).padStart(3, '0')}`,
      title: newTask.title,
      description: newTask.description,
      type: newTask.type as Task['type'],
      priority: newTask.priority as Task['priority'],
      status: 'pendiente',
      assignedTo: newTask.assignedTo,
      field: newTask.field,
      dueDate: format(newTask.dueDate, 'yyyy-MM-dd'),
      createdDate: format(new Date(), 'yyyy-MM-dd'),
      estimatedHours: newTask.estimatedHours
    }

    setTasks(prev => [...prev, task])
    setIsAddingTask(false)
    setNewTask({
      title: '',
      description: '',
      type: '',
      priority: '',
      assignedTo: '',
      field: '',
      dueDate: new Date(),
      estimatedHours: 1
    })
  }

  const filterTasksByStatus = (status: string) => {
    if (status === 'all') return tasks
    return tasks.filter(task => task.status === status)
  }

  const pendingTasks = tasks.filter(t => t.status === 'pendiente').length
  const inProgressTasks = tasks.filter(t => t.status === 'en-progreso').length
  const completedTasks = tasks.filter(t => t.status === 'completada').length
  const overdueTasks = tasks.filter(t => t.status === 'vencida').length

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tareas Agrícolas</h1>
          <p className="text-gray-600 mt-2">
            Gestión y seguimiento de actividades agrícolas programadas
          </p>
        </div>
        <Dialog open={isAddingTask} onOpenChange={setIsAddingTask}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              Nueva Tarea
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Crear Nueva Tarea</DialogTitle>
              <DialogDescription>
                Completa la información para programar una nueva tarea agrícola
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    value={newTask.title}
                    onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Título de la tarea"
                  />
                </div>
                <div>
                  <Label htmlFor="type">Tipo</Label>
                  <Select value={newTask.type} onValueChange={(value) => setNewTask(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="siembra">Siembra</SelectItem>
                      <SelectItem value="riego">Riego</SelectItem>
                      <SelectItem value="fertilizacion">Fertilización</SelectItem>
                      <SelectItem value="cosecha">Cosecha</SelectItem>
                      <SelectItem value="mantenimiento">Mantenimiento</SelectItem>
                      <SelectItem value="control-plagas">Control de Plagas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  value={newTask.description}
                  onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Descripción detallada de la tarea"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="priority">Prioridad</Label>
                  <Select value={newTask.priority} onValueChange={(value) => setNewTask(prev => ({ ...prev, priority: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Prioridad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alta">Alta</SelectItem>
                      <SelectItem value="media">Media</SelectItem>
                      <SelectItem value="baja">Baja</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="assignedTo">Asignado a</Label>
                  <Input
                    id="assignedTo"
                    value={newTask.assignedTo}
                    onChange={(e) => setNewTask(prev => ({ ...prev, assignedTo: e.target.value }))}
                    placeholder="Nombre del responsable"
                  />
                </div>
                <div>
                  <Label htmlFor="field">Campo/Ubicación</Label>
                  <Input
                    id="field"
                    value={newTask.field}
                    onChange={(e) => setNewTask(prev => ({ ...prev, field: e.target.value }))}
                    placeholder="Ubicación de la tarea"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Fecha de Vencimiento</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        {format(newTask.dueDate, 'PPP', { locale: es })}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={newTask.dueDate}
                        onSelect={(date) => date && setNewTask(prev => ({ ...prev, dueDate: date }))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label htmlFor="estimatedHours">Horas Estimadas</Label>
                  <Input
                    id="estimatedHours"
                    type="number"
                    min="1"
                    value={newTask.estimatedHours}
                    onChange={(e) => setNewTask(prev => ({ ...prev, estimatedHours: parseInt(e.target.value) || 1 }))}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAddingTask(false)}>
                Cancelar
              </Button>
              <Button onClick={addNewTask} className="bg-green-600 hover:bg-green-700">
                Crear Tarea
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-yellow-600">{pendingTasks}</CardTitle>
            <CardDescription>Tareas Pendientes</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-blue-600">{inProgressTasks}</CardTitle>
            <CardDescription>En Progreso</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-green-600">{completedTasks}</CardTitle>
            <CardDescription>Completadas</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-red-600">{overdueTasks}</CardTitle>
            <CardDescription>Vencidas</CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Tasks Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="pendiente">Pendientes</TabsTrigger>
          <TabsTrigger value="en-progreso">En Progreso</TabsTrigger>
          <TabsTrigger value="completada">Completadas</TabsTrigger>
          <TabsTrigger value="vencida">Vencidas</TabsTrigger>
        </TabsList>

        {['all', 'pendiente', 'en-progreso', 'completada', 'vencida'].map((status) => (
          <TabsContent key={status} value={status} className="space-y-4">
            <div className="grid gap-4">
              {filterTasksByStatus(status).map((task) => (
                <Card key={task.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <CardTitle className="text-lg">{task.title}</CardTitle>
                          {getStatusBadge(task.status)}
                          {getPriorityBadge(task.priority)}
                        </div>
                        <CardDescription className="mb-2">
                          {task.description}
                        </CardDescription>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>Tipo: {getTypeLabel(task.type)}</span>
                          <span>Asignado: {task.assignedTo}</span>
                          <span>Campo: {task.field}</span>
                          <span>Vence: {task.dueDate}</span>
                          <span>Estimado: {task.estimatedHours}h</span>
                          {task.completedHours && (
                            <span>Completado: {task.completedHours}h</span>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        {task.status === 'pendiente' && (
                          <Button
                            size="sm"
                            onClick={() => updateTaskStatus(task.id, 'en-progreso')}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            Iniciar
                          </Button>
                        )}
                        {task.status === 'en-progreso' && (
                          <Button
                            size="sm"
                            onClick={() => updateTaskStatus(task.id, 'completada')}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Completar
                          </Button>
                        )}
                        {task.status === 'vencida' && (
                          <Button
                            size="sm"
                            onClick={() => updateTaskStatus(task.id, 'en-progreso')}
                            variant="outline"
                          >
                            Reactivar
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
              {filterTasksByStatus(status).length === 0 && (
                <Card>
                  <CardContent className="text-center py-8">
                    <p className="text-gray-500">No hay tareas en esta categoría</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
