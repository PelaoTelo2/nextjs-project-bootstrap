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
import { Progress } from '@/components/ui/progress'

interface Field {
  id: string
  name: string
  area: number
  cropType: string
  soilType: string
  irrigationSystem: string
  status: 'activo' | 'descanso' | 'preparacion' | 'cosecha'
  plantingDate: string
  expectedHarvestDate: string
  lastSoilAnalysis: string
  ph: number
  organicMatter: number
  nitrogen: number
  phosphorus: number
  potassium: number
  productivity: number
  notes: string
  coordinates: {
    lat: number
    lng: number
  }
}

export default function FieldsPage() {
  const [fields, setFields] = useState<Field[]>([
    {
      id: 'C-001',
      name: 'Cuartel Norte',
      area: 25.5,
      cropType: 'Maíz',
      soilType: 'Franco arcilloso',
      irrigationSystem: 'Riego por goteo',
      status: 'activo',
      plantingDate: '2024-01-15',
      expectedHarvestDate: '2024-06-15',
      lastSoilAnalysis: '2024-01-01',
      ph: 6.8,
      organicMatter: 3.2,
      nitrogen: 45,
      phosphorus: 25,
      potassium: 180,
      productivity: 85,
      notes: 'Campo con buen drenaje, ideal para maíz',
      coordinates: { lat: -34.6037, lng: -58.3816 }
    },
    {
      id: 'C-002',
      name: 'Cuartel Sur',
      area: 18.3,
      cropType: 'Soja',
      soilType: 'Franco limoso',
      irrigationSystem: 'Riego por aspersión',
      status: 'activo',
      plantingDate: '2024-02-01',
      expectedHarvestDate: '2024-07-01',
      lastSoilAnalysis: '2023-12-15',
      ph: 7.1,
      organicMatter: 2.8,
      nitrogen: 38,
      phosphorus: 22,
      potassium: 165,
      productivity: 78,
      notes: 'Requiere monitoreo de plagas',
      coordinates: { lat: -34.6137, lng: -58.3716 }
    },
    {
      id: 'C-003',
      name: 'Cuartel Este',
      area: 32.1,
      cropType: 'Trigo',
      soilType: 'Franco arenoso',
      irrigationSystem: 'Riego por surcos',
      status: 'preparacion',
      plantingDate: '2024-03-01',
      expectedHarvestDate: '2024-08-15',
      lastSoilAnalysis: '2024-01-10',
      ph: 6.5,
      organicMatter: 2.5,
      nitrogen: 42,
      phosphorus: 28,
      potassium: 155,
      productivity: 72,
      notes: 'En preparación para siembra de trigo',
      coordinates: { lat: -34.5937, lng: -58.3916 }
    },
    {
      id: 'C-004',
      name: 'Cuartel Oeste',
      area: 22.7,
      cropType: 'Girasol',
      soilType: 'Franco',
      irrigationSystem: 'Riego por goteo',
      status: 'descanso',
      plantingDate: '',
      expectedHarvestDate: '',
      lastSoilAnalysis: '2023-11-20',
      ph: 7.0,
      organicMatter: 3.5,
      nitrogen: 35,
      phosphorus: 20,
      potassium: 170,
      productivity: 0,
      notes: 'Campo en descanso, rotación de cultivos',
      coordinates: { lat: -34.6237, lng: -58.3616 }
    }
  ])

  const [isAddingField, setIsAddingField] = useState(false)
  const [selectedField, setSelectedField] = useState<Field | null>(null)
  const [newField, setNewField] = useState({
    name: '',
    area: 0,
    cropType: '',
    soilType: '',
    irrigationSystem: '',
    plantingDate: '',
    expectedHarvestDate: '',
    notes: '',
    coordinates: { lat: 0, lng: 0 }
  })

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'activo': { label: 'Activo', className: 'bg-green-100 text-green-800' },
      'descanso': { label: 'En Descanso', className: 'bg-gray-100 text-gray-800' },
      'preparacion': { label: 'Preparación', className: 'bg-yellow-100 text-yellow-800' },
      'cosecha': { label: 'Cosecha', className: 'bg-blue-100 text-blue-800' }
    }
    const config = statusConfig[status as keyof typeof statusConfig]
    return <Badge className={config.className}>{config.label}</Badge>
  }

  const getProductivityColor = (productivity: number) => {
    if (productivity >= 80) return 'text-green-600'
    if (productivity >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getSoilHealthScore = (field: Field) => {
    const phScore = field.ph >= 6.0 && field.ph <= 7.5 ? 25 : 15
    const omScore = field.organicMatter >= 3.0 ? 25 : field.organicMatter >= 2.0 ? 20 : 10
    const nScore = field.nitrogen >= 40 ? 25 : field.nitrogen >= 30 ? 20 : 10
    const pScore = field.phosphorus >= 20 ? 25 : field.phosphorus >= 15 ? 20 : 10
    
    return phScore + omScore + nScore + pScore
  }

  const addNewField = () => {
    const field: Field = {
      id: `C-${String(fields.length + 1).padStart(3, '0')}`,
      name: newField.name,
      area: newField.area,
      cropType: newField.cropType,
      soilType: newField.soilType,
      irrigationSystem: newField.irrigationSystem,
      status: 'preparacion',
      plantingDate: newField.plantingDate,
      expectedHarvestDate: newField.expectedHarvestDate,
      lastSoilAnalysis: new Date().toISOString().split('T')[0],
      ph: 7.0,
      organicMatter: 2.5,
      nitrogen: 40,
      phosphorus: 20,
      potassium: 160,
      productivity: 0,
      notes: newField.notes,
      coordinates: newField.coordinates
    }

    setFields(prev => [...prev, field])
    setIsAddingField(false)
    setNewField({
      name: '',
      area: 0,
      cropType: '',
      soilType: '',
      irrigationSystem: '',
      plantingDate: '',
      expectedHarvestDate: '',
      notes: '',
      coordinates: { lat: 0, lng: 0 }
    })
  }

  const updateFieldStatus = (fieldId: string, newStatus: string) => {
    setFields(prev => prev.map(field => 
      field.id === fieldId ? { ...field, status: newStatus as Field['status'] } : field
    ))
  }

  const totalArea = fields.reduce((sum, field) => sum + field.area, 0)
  const activeFields = fields.filter(f => f.status === 'activo').length
  const averageProductivity = fields.filter(f => f.productivity > 0).reduce((sum, field) => sum + field.productivity, 0) / fields.filter(f => f.productivity > 0).length || 0

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Cuarteles</h1>
          <p className="text-gray-600 mt-2">
            Administración y monitoreo de campos y sectores productivos
          </p>
        </div>
        <Dialog open={isAddingField} onOpenChange={setIsAddingField}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              Nuevo Cuartel
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Agregar Nuevo Cuartel</DialogTitle>
              <DialogDescription>
                Registra un nuevo campo o sector productivo
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nombre del Cuartel</Label>
                  <Input
                    id="name"
                    value={newField.name}
                    onChange={(e) => setNewField(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Ej: Cuartel Norte"
                  />
                </div>
                <div>
                  <Label htmlFor="area">Área (hectáreas)</Label>
                  <Input
                    id="area"
                    type="number"
                    step="0.1"
                    value={newField.area}
                    onChange={(e) => setNewField(prev => ({ ...prev, area: parseFloat(e.target.value) || 0 }))}
                    placeholder="25.5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cropType">Tipo de Cultivo</Label>
                  <Select value={newField.cropType} onValueChange={(value) => setNewField(prev => ({ ...prev, cropType: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar cultivo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Maíz">Maíz</SelectItem>
                      <SelectItem value="Soja">Soja</SelectItem>
                      <SelectItem value="Trigo">Trigo</SelectItem>
                      <SelectItem value="Girasol">Girasol</SelectItem>
                      <SelectItem value="Sorgo">Sorgo</SelectItem>
                      <SelectItem value="Cebada">Cebada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="soilType">Tipo de Suelo</Label>
                  <Select value={newField.soilType} onValueChange={(value) => setNewField(prev => ({ ...prev, soilType: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo de suelo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Franco">Franco</SelectItem>
                      <SelectItem value="Franco arcilloso">Franco arcilloso</SelectItem>
                      <SelectItem value="Franco limoso">Franco limoso</SelectItem>
                      <SelectItem value="Franco arenoso">Franco arenoso</SelectItem>
                      <SelectItem value="Arcilloso">Arcilloso</SelectItem>
                      <SelectItem value="Arenoso">Arenoso</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="irrigationSystem">Sistema de Riego</Label>
                <Select value={newField.irrigationSystem} onValueChange={(value) => setNewField(prev => ({ ...prev, irrigationSystem: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar sistema de riego" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Riego por goteo">Riego por goteo</SelectItem>
                    <SelectItem value="Riego por aspersión">Riego por aspersión</SelectItem>
                    <SelectItem value="Riego por surcos">Riego por surcos</SelectItem>
                    <SelectItem value="Riego por inundación">Riego por inundación</SelectItem>
                    <SelectItem value="Sin riego">Sin riego</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="plantingDate">Fecha de Siembra</Label>
                  <Input
                    id="plantingDate"
                    type="date"
                    value={newField.plantingDate}
                    onChange={(e) => setNewField(prev => ({ ...prev, plantingDate: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="expectedHarvestDate">Fecha Esperada de Cosecha</Label>
                  <Input
                    id="expectedHarvestDate"
                    type="date"
                    value={newField.expectedHarvestDate}
                    onChange={(e) => setNewField(prev => ({ ...prev, expectedHarvestDate: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Notas</Label>
                <Textarea
                  id="notes"
                  value={newField.notes}
                  onChange={(e) => setNewField(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Observaciones sobre el cuartel"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAddingField(false)}>
                Cancelar
              </Button>
              <Button onClick={addNewField} className="bg-green-600 hover:bg-green-700">
                Crear Cuartel
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-green-600">{fields.length}</CardTitle>
            <CardDescription>Total de Cuarteles</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-blue-600">{activeFields}</CardTitle>
            <CardDescription>Cuarteles Activos</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-purple-600">{totalArea.toFixed(1)} ha</CardTitle>
            <CardDescription>Área Total</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className={`text-2xl font-bold ${getProductivityColor(averageProductivity)}`}>
              {averageProductivity.toFixed(1)}%
            </CardTitle>
            <CardDescription>Productividad Promedio</CardDescription>
          </CardHeader>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Vista General</TabsTrigger>
          <TabsTrigger value="soil">Análisis de Suelo</TabsTrigger>
          <TabsTrigger value="productivity">Productividad</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fields.map((field) => (
              <Card key={field.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{field.name}</CardTitle>
                      <CardDescription>{field.id}</CardDescription>
                    </div>
                    {getStatusBadge(field.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500">Área:</span>
                        <p className="font-medium">{field.area} ha</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Cultivo:</span>
                        <p className="font-medium">{field.cropType}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Suelo:</span>
                        <p className="font-medium">{field.soilType}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Riego:</span>
                        <p className="font-medium">{field.irrigationSystem}</p>
                      </div>
                    </div>
                    
                    {field.status === 'activo' && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Productividad:</span>
                          <span className={`font-medium ${getProductivityColor(field.productivity)}`}>
                            {field.productivity}%
                          </span>
                        </div>
                        <Progress value={field.productivity} className="h-2" />
                      </div>
                    )}

                    <div className="flex space-x-2 pt-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedField(field)}
                            className="flex-1"
                          >
                            Ver Detalles
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                          <DialogHeader>
                            <DialogTitle>{field.name}</DialogTitle>
                            <DialogDescription>Información detallada del cuartel {field.id}</DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-6">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-medium text-gray-900 mb-2">Información General</h4>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">Estado:</span>
                                    {getStatusBadge(field.status)}
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">Área:</span>
                                    <span>{field.area} hectáreas</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">Cultivo:</span>
                                    <span>{field.cropType}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">Tipo de suelo:</span>
                                    <span>{field.soilType}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">Sistema de riego:</span>
                                    <span>{field.irrigationSystem}</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="font-medium text-gray-900 mb-2">Análisis de Suelo</h4>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">pH:</span>
                                    <span>{field.ph}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">Materia orgánica:</span>
                                    <span>{field.organicMatter}%</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">Nitrógeno:</span>
                                    <span>{field.nitrogen} ppm</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">Fósforo:</span>
                                    <span>{field.phosphorus} ppm</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">Potasio:</span>
                                    <span>{field.potassium} ppm</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">Último análisis:</span>
                                    <span>{field.lastSoilAnalysis}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            {field.status === 'activo' && (
                              <div>
                                <h4 className="font-medium text-gray-900 mb-2">Cronograma de Cultivo</h4>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <span className="text-gray-500">Fecha de siembra:</span>
                                    <p>{field.plantingDate}</p>
                                  </div>
                                  <div>
                                    <span className="text-gray-500">Cosecha esperada:</span>
                                    <p>{field.expectedHarvestDate}</p>
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            {field.notes && (
                              <div>
                                <h4 className="font-medium text-gray-900 mb-2">Notas</h4>
                                <p className="text-sm text-gray-600">{field.notes}</p>
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      {field.status !== 'activo' && (
                        <Button
                          size="sm"
                          onClick={() => updateFieldStatus(field.id, 'activo')}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Activar
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="soil" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Estado de Salud del Suelo</CardTitle>
              <CardDescription>Análisis comparativo de los parámetros del suelo por cuartel</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {fields.map((field) => {
                  const healthScore = getSoilHealthScore(field)
                  return (
                    <div key={field.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">{field.name}</h4>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">Salud del suelo:</span>
                          <Badge className={healthScore >= 80 ? 'bg-green-100 text-green-800' : healthScore >= 60 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}>
                            {healthScore}/100
                          </Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">pH:</span>
                          <p className="font-medium">{field.ph}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">M.O.:</span>
                          <p className="font-medium">{field.organicMatter}%</p>
                        </div>
                        <div>
                          <span className="text-gray-500">N:</span>
                          <p className="font-medium">{field.nitrogen} ppm</p>
                        </div>
                        <div>
                          <span className="text-gray-500">P:</span>
                          <p className="font-medium">{field.phosphorus} ppm</p>
                        </div>
                        <div>
                          <span className="text-gray-500">K:</span>
                          <p className="font-medium">{field.potassium} ppm</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="productivity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análisis de Productividad</CardTitle>
              <CardDescription>Rendimiento y eficiencia por cuartel</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {fields.filter(f => f.status === 'activo').map((field) => (
                  <div key={field.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{field.name}</h4>
                        <p className="text-sm text-gray-500">{field.cropType} - {field.area} ha</p>
                      </div>
                      <div className="text-right">
                        <p className={`text-2xl font-bold ${getProductivityColor(field.productivity)}`}>
                          {field.productivity}%
                        </p>
                        <p className="text-sm text-gray-500">Productividad</p>
                      </div>
                    </div>
                    <Progress value={field.productivity} className="h-3 mb-2" />
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Siembra:</span>
                        <p className="font-medium">{field.plantingDate}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Cosecha esperada:</span>
                        <p className="font-medium">{field.expectedHarvestDate}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Días restantes:</span>
                        <p className="font-medium">
                          {Math.ceil((new Date(field.expectedHarvestDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24))} días
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                {fields.filter(f => f.status === 'activo').length === 0 && (
                  <p className="text-gray-500 text-center py-8">No hay cuarteles activos para mostrar productividad</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
