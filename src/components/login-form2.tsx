import React, { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { useNavigate } from "react-router-dom"

export default function DestinatarioForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [nombre, setNombre] = useState("")
    const [dni, setDni] = useState(0)
    const [correo, setCorreo] = useState("")
    const [telefono, setTelefono] = useState(0)
    const [direccion, setDireccion] = useState("")
    const [provincia, setPronvincia] = useState("")
    const [ciudad, setCiudad] = useState("")
    const precioTotal = Number(localStorage.getItem("precioTotal")) || 0;
    const [fechaEntrega, setFechaEntre] = useState<any>("");
    const [nroPedido, setNroPedido] = useState<any>("");

    const [openDialogAlert, setOpenDialogAlert] = useState(false);
    const [openDialogSuccess, setOpenDialogSuccess] = useState(false);

    const navigate = useNavigate();

    function submit(e: React.FormEvent) {
        e.preventDefault();

        if (nombre != "" && dni > 0 && correo != "" && telefono > 0 && direccion != "" && ciudad != "" && provincia != "") {

            setNroPedido(Math.floor(100000 + Math.random() * 900000));
            const fechaEntrega = new Date();
            fechaEntrega.setDate(fechaEntrega.getDate() + 3);
            
            // Formateo a fecha legible (ejemplo: "02/11/2025")
            const fechaFormateada = fechaEntrega.toLocaleDateString('es-AR');
            
            // Si estás usando React:
            setFechaEntre(fechaFormateada);
            

            setOpenDialogSuccess(true);
        }
         else {
            setOpenDialogAlert(true);
        }
    }

    function aceptarSuccess() {
        localStorage.clear();
        navigate('/home');
    }


return (
    <div
        className={cn(
            "mx-auto w-full max-w-3xl p-4", 
            "flex flex-col gap-6",
            className
        )}
        {...props}
    >
        <Card className="border-muted/60">
            <CardHeader className="pb-3">
                <CardTitle className="text-xl">Registrar Destinatario</CardTitle>
                <CardDescription className="text-sm">
                    Completá los datos del destinatario. Todos los campos son requeridos.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form className="space-y-4">
                    <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Field>
                            <FieldLabel htmlFor="nombre" className="text-sm">Nombre</FieldLabel>
                            <Input
                                id="nombre"
                                onChange={(e) => setNombre(e.target.value)}
                                name="nombre"
                                placeholder="Ingrese el nombre"
                                autoComplete="name"
                                className="h-9"
                            />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="dni" className="text-sm">DNI</FieldLabel>
                            <Input
                                id="dni"
                                type="number"
                                onChange={(e) => setDni(Number(e.target.value))}
                                name="dni"
                                inputMode="numeric"
                                pattern="[0-9]{7,9}"
                                placeholder="12345678"
                                className="h-9"
                            />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="correo" className="text-sm">Correo</FieldLabel>
                            <Input
                                id="correo"
                                onChange={(e) => setCorreo(e.target.value)}
                                name="correo"
                                type="email"
                                placeholder="Ingrese el correo"
                                autoComplete="email"
                                className="h-9"
                            />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="telefono" className="text-sm">N° Teléfono</FieldLabel>
                            <Input
                                id="telefono"
                                onChange={(e) => setTelefono(Number(e.target.value))}
                                name="telefono"
                                type="tel"
                                inputMode="tel"
                                placeholder="3534920195"
                                autoComplete="tel"
                                className="h-9"
                            />
                        </Field>

                        <Field className="md:col-span-2">
                            <FieldLabel htmlFor="localidad" className="text-sm">Provincia</FieldLabel>
                            <Input
                                id="localidad"
                                onChange={(e) => setPronvincia(e.target.value)}
                                name="localidad"
                                placeholder="Ingrese la provincia"
                                autoComplete="address-level2"
                                className="h-9"
                            />
                        </Field>

                        <Field className="md:col-span-2">
                            <FieldLabel htmlFor="localidad" className="text-sm">Localidad</FieldLabel>
                            <Input
                                id="ciudad"
                                onChange={(e) => setCiudad(e.target.value)}
                                name="ciudad"
                                placeholder="Ingrese la localidad"
                                autoComplete="address-level2"
                                className="h-9"
                            />
                        </Field>

                        <Field className="md:col-span-2">
                            <FieldLabel htmlFor="direccion" className="text-sm">Dirección</FieldLabel>
                            <Input
                                id="direccion"
                                onChange={(e) => setDireccion(e.target.value)}
                                name="direccion"
                                placeholder="Ingrese la direccion"
                                autoComplete="street-address"
                                className="h-9"
                            />
                        </Field>
                        

                        {/* Espaciador para alinear el botón en 2 columnas */}
                        <div className="hidden md:block" />

                        <Field className="md:col-span-2">
                            <div className="flex items-center justify-center gap-2">
                                <Button onClick={submit}
                                    type="submit" className="h-9 px-4">
                                    Confirmar Pedido
                                </Button>
                            </div>
                        </Field>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>

        <AlertDialog open={openDialogAlert} onOpenChange={setOpenDialogAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100">
                <svg
                  className="h-6 w-6 text-yellow-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>
              </div>
              <AlertDialogTitle className="text-lg">Campos Incompletos</AlertDialogTitle>
            </div>
            <AlertDialogDescription className="pt-2">
              Por favor, complete todos los campos requeridos antes de calcular la tarifa.
              Asegúrese de ingresar: nombre, dni, correo, telefono, direccion y localidad.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Entendido</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={openDialogSuccess} onOpenChange={setOpenDialogSuccess}>
        <AlertDialogContent>
            <AlertDialogHeader>
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <svg
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                </div>
                <AlertDialogTitle className="text-lg">Solicitud Realizada con Éxito</AlertDialogTitle>
            </div>
            <AlertDialogDescription className="pt-4">
                <div className="space-y-3">
                <p className="text-sm font-medium text-foreground">Datos del Pedido:</p>
                <div className="space-y-2 rounded-md bg-muted p-3 text-sm">
                    <div className="flex justify-between">
                    <span className="text-muted-foreground">Nro Pedido: </span>
                    <span className="font-medium text-foreground">{nroPedido}</span>
                    </div>
                    <div className="flex justify-between">
                    <span className="text-muted-foreground">Fecha Entrega Aproximada: </span>
                    <span className="font-medium text-foreground">{fechaEntrega}</span>
                    </div>
                    <div className="flex justify-between">
                    <span className="text-muted-foreground">Nombre:</span>
                    <span className="font-medium text-foreground">{nombre}</span>
                    </div>
                    <div className="flex justify-between">
                    <span className="text-muted-foreground">DNI:</span>
                    <span className="font-medium text-foreground">{dni}</span>
                    </div>
                    <div className="flex justify-between">
                    <span className="text-muted-foreground">Correo:</span>
                    <span className="font-medium text-foreground">{correo}</span>
                    </div>
                    <div className="flex justify-between">
                    <span className="text-muted-foreground">Teléfono:</span>
                    <span className="font-medium text-foreground">{telefono}</span>
                    </div>
                    <div className="flex justify-between">
                    <span className="text-muted-foreground">Dirección:</span>
                    <span className="font-medium text-foreground">{direccion}, {ciudad}, {provincia}</span>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-2 py-3">
                    <p className="text-sm text-muted-foreground">Precio Total del Envío:</p>
                    <p className="text-3xl font-bold text-green-600">${precioTotal.toFixed(2)}</p>
                </div>
                </div>
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogAction
            onClick={aceptarSuccess}
            >Aceptar</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>

    </div>
)
}
