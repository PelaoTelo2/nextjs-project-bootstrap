'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface Machine {
  id: string
  name: string
  type: string
  status: 'operational' | 'maintenance' | 'idle' | 'in-use'
  location: string
  lastMaintenance: string
  nextMaintenance: string
  fuelLevel: number
  hoursWorked: number
}

export default function MachineryPage() {
  const [machines, setMachines] = useState<Machine[]>([
    {
      id: 'T-001',
      name: 'Tractor John Deere 6120M',
      type: 'Tractor',
      status: 'operational',
      location: 'Cuartel Norte',
      lastMaintenance: '2024-01-15',
      nextMaintenance: '2024-04-15',
      fuelLevel: 85,
      hoursWorked: 1250
    },
    {
      id: 'T-002',
      name: 'Tractor Case IH Farmall 75A',
      type: 'Tractor',
      status: 'maintenance',
      location: 'Taller',
      lastMaintenance: '2024-01-20',
      nextMaintenance: '2024-04-20',
      fuelLevel: 45,
      hoursWorked: 980
    },
    {
      id: 'C-001',
      name: 'Cosechadora Case IH 2166',
      type: 'Cosechadora',
      status: 'idle',
      location: 'Galpón Principal',
      lastMaintenance: '2024-01-10',
      nextMaintenance: '2024-04-10',
      fuelLevel: 60,
      hoursWorked: 750
    },
    {
      id: 'P-001',
      name: 'Pulverizadora Apache 1020',
      type: 'Pulverizadora',
      status: 'in-use',
      location: 'Cuartel Sur',
      lastMaintenance: '2024-01-25',
      nextMaintenance: '2024-04-25',
      fuelLevel: 70,
      hoursWorked: 420
    },
    {
      id: 'S-001',
      name: 'Sembradora Amazone Cirrus 6003',
      type: 'Sembradora',
      status: 'operational',
      location: 'Galpón Secundario',
      lastMaintenance: '2024-01-12',
      nextMaintenance: '2024-04-12',
      fuelLevel: 90,
      hoursWorked: 320
    }
  ])

  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null)
  const [actionResult, setActionResult] = useState<{ type: 'success' | 'error', message: string } | null>(null)

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'operational': { label: 'Operativo', className: 'bg-green-100 text-green-800' },
      'maintenance': { label: 'Mantenimiento', className: 'bg-red-100 text-red-800' },
      'idle': { label: 'Inactivo', className: 'bg-gray-100 text-gray-800' },
      'in-use': { label: 'En Uso', className: 'bg-blue-100 text-blue-800' }
    }
    const config = statusConfig[status as keyof typeof statusConfig]
    return <Badge className={config.className}>{config.label}</Badge>
  }

  const getFuelLevelColor = (level: number) => {
    if (level > 70) return 'text-green-600'
    if (level > 30) return 'text-yellow-600'
    return 'text-red-600'
  }

  const handleMachineAction = (machineId: string, action: string) => {
    setMachines(prev => prev.map(machine => {
      if (machine.id === machineId) {
        let newStatus = machine.status
        switch (action) {
          case 'start':
            newStatus = machine.status === 'idle' ? 'in-use' : machine.status
            break
          case 'stop':
            newStatus = machine.status === 'in-use' ? 'idle' : machine.status
            break
          case 'maintenance':
            newStatus = 'maintenance'
            break
        }
        return { ...machine, status: newStatus }
      }
      return machine
    }))

    setActionResult({
      type: 'success',
      message: `Acción "${action}" ejecutada correctamente en ${machineId}`
    })

    setTimeout(() => setActionResult(null), 3000)
  }

  const operationalMachines = machines.filter(m => m.status === 'operational' || m.status === 'in-use').length
  const maintenanceMachines = machines.filter(m => m.status === 'maintenance').length
  const idleMachines = machines.filter(m => m.status === 'idle').length

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Control de Maquinarias</h1>
        <p className="text-gray-600 mt-2">
          Monitoreo y control en tiempo real de equipos agrícolas
        </p>
      </div>

      {actionResult && (
        <Alert className={actionResult.type === 'success' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
          <AlertDescription className={actionResult.type === 'success' ? 'text-green-800' : 'text-red-800'}>
            {actionResult.message}
          </AlertDescription>
        </Alert>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-green-600">{operationalMachines}</CardTitle>
            <CardDescription>Máquinas Operativas</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-red-600">{maintenanceMachines}</CardTitle>
            <CardDescription>En Mantenimiento</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-gray-600">{idleMachines}</CardTitle>
            <CardDescription>Inactivas</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-blue-600">{machines.length}</CardTitle>
            <CardDescription>Total de Máquinas</CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Machines Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Maquinarias</CardTitle>
          <CardDescription>Estado actual y controles de todas las máquinas</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Ubicación</TableHead>
                <TableHead>Combustible</TableHead>
                <TableHead>Horas</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {machines.map((machine) => (
                <TableRow key={machine.id}>
                  <TableCell className="font-medium">{machine.id}</TableCell>
                  <TableCell>{machine.name}</TableCell>
                  <TableCell>{machine.type}</TableCell>
                  <TableCell>{getStatusBadge(machine.status)}</TableCell>
                  <TableCell>{machine.location}</TableCell>
                  <TableCell className={getFuelLevelColor(machine.fuelLevel)}>
                    {machine.fuelLevel}%
                  </TableCell>
                  <TableCell>{machine.hoursWorked}h</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {machine.status === 'idle' && (
                        <Button
                          size="sm"
                          onClick={() => handleMachineAction(machine.id, 'start')}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Iniciar
                        </Button>
                      )}
                      {machine.status === 'in-use' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleMachineAction(machine.id, 'stop')}
                        >
                          Detener
                        </Button>
                      )}
                      {(machine.status === 'operational' || machine.status === 'idle') && (
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleMachineAction(machine.id, 'maintenance')}
                        >
                          Mantenimiento
                        </Button>
                      )}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedMachine(machine)}
                          >
                            Detalles
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{machine.name}</DialogTitle>
                            <DialogDescription>
                              Información detallada de la máquina {machine.id}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium text-gray-500">Estado</label>
                                <div className="mt-1">{getStatusBadge(machine.status)}</div>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-500">Tipo</label>
                                <p className="mt-1">{machine.type}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-500">Ubicación</label>
                                <p className="mt-1">{machine.location}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-500">Nivel de Combustible</label>
                                <p className={`mt-1 font-medium ${getFuelLevelColor(machine.fuelLevel)}`}>
                                  {machine.fuelLevel}%
                                </p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-500">Horas Trabajadas</label>
                                <p className="mt-1">{machine.hoursWorked} horas</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-500">Último Mantenimiento</label>
                                <p className="mt-1">{machine.lastMaintenance}</p>
                              </div>
                              <div className="col-span-2">
                                <label className="text-sm font-medium text-gray-500">Próximo Mantenimiento</label>
                                <p className="mt-1">{machine.nextMaintenance}</p>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Maintenance Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Alertas de Mantenimiento</CardTitle>
          <CardDescription>Máquinas que requieren atención próximamente</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {machines
              .filter(machine => {
                const nextMaintenance = new Date(machine.nextMaintenance)
                const today = new Date()
                const daysUntilMaintenance = Math.ceil((nextMaintenance.getTime() - today.getTime()) / (1000 * 3600 * 24))
                return daysUntilMaintenance <= 30
              })
              .map((machine) => {
                const nextMaintenance = new Date(machine.nextMaintenance)
                const today = new Date()
                const daysUntilMaintenance = Math.ceil((nextMaintenance.getTime() - today.getTime()) / (1000 * 3600 * 24))
                
                return (
                  <div key={machine.id} className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div>
                      <p className="font-medium text-yellow-800">{machine.name} ({machine.id})</p>
                      <p className="text-sm text-yellow-600">
                        Mantenimiento programado en {daysUntilMaintenance} días ({machine.nextMaintenance})
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-yellow-300 text-yellow-700 hover:bg-yellow-100"
                      onClick={() => handleMachineAction(machine.id, 'maintenance')}
                    >
                      Programar Ahora
                    </Button>
                  </div>
                )
              })}
            {machines.filter(machine => {
              const nextMaintenance = new Date(machine.nextMaintenance)
              const today = new Date()
              const daysUntilMaintenance = Math.ceil((nextMaintenance.getTime() - today.getTime()) / (1000 * 3600 * 24))
              return daysUntilMaintenance <= 30
            }).length === 0 && (
              <p className="text-gray-500 text-center py-4">No hay alertas de mantenimiento pendientes</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
