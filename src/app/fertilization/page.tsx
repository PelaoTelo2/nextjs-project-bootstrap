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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

interface FertilizationRecord {
  id: string
  field: string
  crop: string
  fertilizerType: string
  composition: string
  applicationRate: number
  totalAmount: number
  applicationMethod: string
  applicationDate: string
  nextApplicationDate: string
  cost: number
  appliedBy: string
  notes: string
  status: 'programada' | 'aplicada' | 'vencida'
}

interface FertilizerType {
  name: string
  composition: string
  recommendedRate: string
  cost: number
}

export default function FertilizationPage() {
  const [records, setRecords] = useState<FertilizationRecord[]>([
    {
      id: 'F-001',
      field: 'Cuartel Norte',
      crop: 'Maíz',
      fertilizerType: 'NPK 15-15-15',
      composition: '15% N, 15% P2O5, 15% K2O',
      applicationRate: 200,
      totalAmount: 500,
      applicationMethod: 'Aplicación al suelo',
      applicationDate: '2024-02-01',
      nextApplicationDate: '2024-03-15',
      cost: 150000,
      appliedBy: 'Juan Pérez',
      notes: 'Aplicación base antes de siembra',
      status: 'aplicada'
    },
    {
      id: 'F-002',
      field: 'Cuartel Sur',
      crop: 'Soja',
      fertilizerType: 'Urea 46%',
      composition: '46% N',
      applicationRate: 150,
      totalAmount: 300,
      applicationMethod: 'Aplicación foliar',
      applicationDate: '2024-02-15',
      nextApplicationDate: '2024-03-01',
      cost: 90000,
      appliedBy: 'María González',
      notes: 'Aplicación de nitrógeno en etapa vegetativa',
      status: 'programada'
    },
    {
      id: 'F-003',
      field: 'Cuartel Este',
      crop: 'Trigo',
      fertilizerType: 'Fosfato Diamónico',
      composition: '18% N, 46% P2O5',
      applicationRate: 180,
      totalAmount: 450,
      applicationMethod: 'Aplicación al suelo',
      applicationDate: '2024-01-20',
      nextApplicationDate: '2024-02-20',
      cost: 135000,
      appliedBy: 'Carlos Rodríguez',
      notes: 'Aplicación de fósforo para desarrollo radicular',
      status: 'vencida'
    }
  ])

  const [isAddingRecord, setIsAddingRecord] = useState(false)
  const [newRecord, setNewRecord] = useState({
    field: '',
    crop: '',
    fertilizerType: '',
    applicationRate: 0,
    totalAmount: 0,
    applicationMethod: '',
    applicationDate: new Date(),
    nextApplicationDate: new Date(),
    cost: 0,
    appliedBy: '',
    notes: ''
  })

  const fertilizerTypes: FertilizerType[] = [
    {
      name: 'NPK 15-15-15',
      composition: '15% N, 15% P2O5, 15% K2O',
      recommendedRate: '150-250 kg/ha',
      cost: 300
    },
    {
      name: 'Urea 46%',
      composition: '46% N',
      recommendedRate: '100-200 kg/ha',
      cost: 280
    },
    {
      name: 'Fosfato Diamónico',
      composition: '18% N, 46% P2O5',
      recommendedRate: '120-200 kg/ha',
      cost: 320
    },
    {
      name: 'Cloruro de Potasio',
      composition: '60% K2O',
      recommendedRate: '80-150 kg/ha',
      cost: 250
    },
    {
      name: 'Sulfato de Amonio',
      composition: '21% N, 24% S',
      recommendedRate: '150-300 kg/ha',
      cost: 260
    }
  ]

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'programada': { label: 'Programada', className: 'bg-blue-100 text-blue-800' },
      'aplicada': { label: 'Aplicada', className: 'bg-green-100 text-green-800' },
      'vencida': { label: 'Vencida', className: 'bg-red-100 text-red-800' }
    }
    const config = statusConfig[status as keyof typeof statusConfig]
    return <Badge className={config.className}>{config.label}</Badge>
  }

  const addNewRecord = () => {
    const selectedFertilizer = fertilizerTypes.find(f => f.name === newRecord.fertilizerType)
    
    const record: FertilizationRecord = {
      id: `F-${String(records.length + 1).padStart(3, '0')}`,
      field: newRecord.field,
      crop: newRecord.crop,
      fertilizerType: newRecord.fertilizerType,
      composition: selectedFertilizer?.composition || '',
      applicationRate: newRecord.applicationRate,
      totalAmount: newRecord.totalAmount,
      applicationMethod: newRecord.applicationMethod,
      applicationDate: format(newRecord.applicationDate, 'yyyy-MM-dd'),
      nextApplicationDate: format(newRecord.nextApplicationDate, 'yyyy-MM-dd'),
      cost: newRecord.cost,
      appliedBy: newRecord.appliedBy,
      notes: newRecord.notes,
      status: 'programada'
    }

    setRecords(prev => [...prev, record])
    setIsAddingRecord(false)
    setNewRecord({
      field: '',
      crop: '',
      fertilizerType: '',
      applicationRate: 0,
      totalAmount: 0,
      applicationMethod: '',
      applicationDate: new Date(),
      nextApplicationDate: new Date(),
      cost: 0,
      appliedBy: '',
      notes: ''
    })
  }

  const updateRecordStatus = (recordId: string, newStatus: string) => {
    setRecords(prev => prev.map(record => 
      record.id === recordId ? { ...record, status: newStatus as FertilizationRecord['status'] } : record
    ))
  }

  const calculateTotalCost = () => {
    return records.reduce((total, record) => total + record.cost, 0)
  }

  const getUpcomingApplications = () => {
    const today = new Date()
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
    
    return records.filter(record => {
      const nextDate = new Date(record.nextApplicationDate)
      return nextDate >= today && nextDate <= nextWeek && record.status !== 'vencida'
    })
  }

  const programmedRecords = records.filter(r => r.status === 'programada').length
  const appliedRecords = records.filter(r => r.status === 'aplicada').length
  const overdueRecords = records.filter(r => r.status === 'vencida').length

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Aplicación de Fertilización</h1>
          <p className="text-gray-600 mt-2">
            Gestión y seguimiento de programas de fertilización
          </p>
        </div>
        <Dialog open={isAddingRecord} onOpenChange={setIsAddingRecord}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              Nueva Aplicación
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Programar Nueva Aplicación</DialogTitle>
              <DialogDescription>
                Registra una nueva aplicación de fertilizante
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="field">Campo/Cuartel</Label>
                  <Input
                    id="field"
                    value={newRecord.field}
                    onChange={(e) => setNewRecord(prev => ({ ...prev, field: e.target.value }))}
                    placeholder="Ej: Cuartel Norte"
                  />
                </div>
                <div>
                  <Label htmlFor="crop">Cultivo</Label>
                  <Input
                    id="crop"
                    value={newRecord.crop}
                    onChange={(e) => setNewRecord(prev => ({ ...prev, crop: e.target.value }))}
                    placeholder="Ej: Maíz, Soja, Trigo"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fertilizerType">Tipo de Fertilizante</Label>
                  <Select value={newRecord.fertilizerType} onValueChange={(value) => setNewRecord(prev => ({ ...prev, fertilizerType: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar fertilizante" />
                    </SelectTrigger>
                    <SelectContent>
                      {fertilizerTypes.map((fertilizer) => (
                        <SelectItem key={fertilizer.name} value={fertilizer.name}>
                          {fertilizer.name} - {fertilizer.composition}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="applicationMethod">Método de Aplicación</Label>
                  <Select value={newRecord.applicationMethod} onValueChange={(value) => setNewRecord(prev => ({ ...prev, applicationMethod: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar método" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Aplicación al suelo">Aplicación al suelo</SelectItem>
                      <SelectItem value="Aplicación foliar">Aplicación foliar</SelectItem>
                      <SelectItem value="Fertirrigación">Fertirrigación</SelectItem>
                      <SelectItem value="Incorporado">Incorporado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="applicationRate">Dosis (kg/ha)</Label>
                  <Input
                    id="applicationRate"
                    type="number"
                    value={newRecord.applicationRate}
                    onChange={(e) => setNewRecord(prev => ({ ...prev, applicationRate: parseFloat(e.target.value) || 0 }))}
                    placeholder="200"
                  />
                </div>
                <div>
                  <Label htmlFor="totalAmount">Cantidad Total (kg)</Label>
                  <Input
                    id="totalAmount"
                    type="number"
                    value={newRecord.totalAmount}
                    onChange={(e) => setNewRecord(prev => ({ ...prev, totalAmount: parseFloat(e.target.value) || 0 }))}
                    placeholder="500"
                  />
                </div>
                <div>
                  <Label htmlFor="cost">Costo Total ($)</Label>
                  <Input
                    id="cost"
                    type="number"
                    value={newRecord.cost}
                    onChange={(e) => setNewRecord(prev => ({ ...prev, cost: parseFloat(e.target.value) || 0 }))}
                    placeholder="150000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Fecha de Aplicación</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        {format(newRecord.applicationDate, 'PPP', { locale: es })}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={newRecord.applicationDate}
                        onSelect={(date) => date && setNewRecord(prev => ({ ...prev, applicationDate: date }))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label>Próxima Aplicación</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        {format(newRecord.nextApplicationDate, 'PPP', { locale: es })}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={newRecord.nextApplicationDate}
                        onSelect={(date) => date && setNewRecord(prev => ({ ...prev, nextApplicationDate: date }))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div>
                <Label htmlFor="appliedBy">Aplicado por</Label>
                <Input
                  id="appliedBy"
                  value={newRecord.appliedBy}
                  onChange={(e) => setNewRecord(prev => ({ ...prev, appliedBy: e.target.value }))}
                  placeholder="Nombre del responsable"
                />
              </div>

              <div>
                <Label htmlFor="notes">Notas</Label>
                <Textarea
                  id="notes"
                  value={newRecord.notes}
                  onChange={(e) => setNewRecord(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Observaciones adicionales sobre la aplicación"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAddingRecord(false)}>
                Cancelar
              </Button>
              <Button onClick={addNewRecord} className="bg-green-600 hover:bg-green-700">
                Programar Aplicación
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-blue-600">{programmedRecords}</CardTitle>
            <CardDescription>Aplicaciones Programadas</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-green-600">{appliedRecords}</CardTitle>
            <CardDescription>Aplicaciones Completadas</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-red-600">{overdueRecords}</CardTitle>
            <CardDescription>Aplicaciones Vencidas</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-purple-600">
              ${calculateTotalCost().toLocaleString()}
            </CardTitle>
            <CardDescription>Costo Total Invertido</CardDescription>
          </CardHeader>
        </Card>
      </div>

      <Tabs defaultValue="records" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="records">Registros de Aplicación</TabsTrigger>
          <TabsTrigger value="fertilizers">Tipos de Fertilizantes</TabsTrigger>
          <TabsTrigger value="schedule">Programación</TabsTrigger>
        </TabsList>

        <TabsContent value="records" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Aplicaciones</CardTitle>
              <CardDescription>Registro completo de todas las aplicaciones de fertilizantes</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Campo</TableHead>
                    <TableHead>Cultivo</TableHead>
                    <TableHead>Fertilizante</TableHead>
                    <TableHead>Dosis</TableHead>
                    <TableHead>Fecha Aplicación</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Costo</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {records.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.id}</TableCell>
                      <TableCell>{record.field}</TableCell>
                      <TableCell>{record.crop}</TableCell>
                      <TableCell>{record.fertilizerType}</TableCell>
                      <TableCell>{record.applicationRate} kg/ha</TableCell>
                      <TableCell>{record.applicationDate}</TableCell>
                      <TableCell>{getStatusBadge(record.status)}</TableCell>
                      <TableCell>${record.cost.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {record.status === 'programada' && (
                            <Button
                              size="sm"
                              onClick={() => updateRecordStatus(record.id, 'aplicada')}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              Marcar Aplicada
                            </Button>
                          )}
                          {record.status === 'vencida' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateRecordStatus(record.id, 'programada')}
                            >
                              Reprogramar
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fertilizers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Catálogo de Fertilizantes</CardTitle>
              <CardDescription>Información sobre los fertilizantes disponibles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {fertilizerTypes.map((fertilizer) => (
                  <Card key={fertilizer.name}>
                    <CardHeader>
                      <CardTitle className="text-lg">{fertilizer.name}</CardTitle>
                      <CardDescription>{fertilizer.composition}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm font-medium text-gray-500">Dosis recomendada:</span>
                          <p className="text-sm">{fertilizer.recommendedRate}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">Costo por kg:</span>
                          <p className="text-sm font-medium text-green-600">${fertilizer.cost}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Próximas Aplicaciones</CardTitle>
              <CardDescription>Aplicaciones programadas para los próximos 7 días</CardDescription>
            </CardHeader>
            <CardContent>
              {getUpcomingApplications().length > 0 ? (
                <div className="space-y-3">
                  {getUpcomingApplications().map((record) => (
                    <div key={record.id} className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div>
                        <p className="font-medium text-blue-800">
                          {record.field} - {record.crop}
                        </p>
                        <p className="text-sm text-blue-600">
                          {record.fertilizerType} - {record.applicationRate} kg/ha
                        </p>
                        <p className="text-xs text-blue-500">
                          Programado para: {record.nextApplicationDate}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => updateRecordStatus(record.id, 'aplicada')}
                      >
                        Marcar como Aplicada
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  No hay aplicaciones programadas para los próximos 7 días
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
