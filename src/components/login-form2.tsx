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

export default function DestinatarioForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [nombre, setNombre] = useState("")
    const [dni, setDni] = useState(0)
    const [correo, setCorreo] = useState("")
    const [telefono, setTelefono] = useState(0)
    const [direccion, setDireccion] = useState("")
    const [localidad, setLocalidad] = useState("")

    function submit() {
        if (nombre != "" && dni > 0 && correo != "" && telefono > 0 && direccion != "" && localidad != "") {
            const numeroPedido = `PED-${Date.now()}`; // ejemplo rápido
            const fechaEntrega = new Date();
            fechaEntrega.setDate(fechaEntrega.getDate() + 3);

            alert(
                "Pedido registrado con los siguientes datos:\n\n" +
                "Número de pedido: " + numeroPedido + "\n" +
                "Fecha de entrega: " + fechaEntrega.toLocaleDateString() + "\n\n" +
                "Nombre: " + nombre + "\n" +
                "DNI: " + dni + "\n" +
                "Correo: " + correo + "\n" +
                "Teléfono: " + telefono + "\n" +
                "Dirección: " + direccion + "\n" +
                "Localidad: " + localidad
            );
        } else {
        alert("⚠️ Por favor, completá todos los campos antes de registrar el pedido.");
    }

}


return (
    <div
        className={cn(
            "mx-auto w-full max-w-3xl p-4", // limita el ancho y agrega padding
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
                                placeholder="Ingrese el Nombre"
                                autoComplete="name"
                                required
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
                                required
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
                                placeholder="Ingrese el Correo"
                                autoComplete="email"
                                required
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
                                placeholder="Ingrese el Tel (353)"
                                autoComplete="tel"
                                required
                                className="h-9"
                            />
                        </Field>

                        <Field className="md:col-span-2">
                            <FieldLabel htmlFor="direccion" className="text-sm">Dirección</FieldLabel>
                            <Input
                                id="direccion"
                                onChange={(e) => setDireccion(e.target.value)}
                                name="direccion"
                                placeholder="Ingrese Direccion"
                                autoComplete="street-address"
                                required
                                className="h-9"
                            />
                        </Field>

                        <Field className="md:col-span-2">
                            <FieldLabel htmlFor="localidad" className="text-sm">Localidad</FieldLabel>
                            <Input
                                id="localidad"
                                onChange={(e) => setLocalidad(e.target.value)}
                                name="localidad"
                                placeholder="Ingrese localidad"
                                autoComplete="address-level2"
                                required
                                className="h-9"
                            />
                        </Field>

                        {/* Espaciador para alinear el botón en 2 columnas */}
                        <div className="hidden md:block" />

                        <Field className="md:col-span-2">
                            <div className="flex items-center justify-center gap-2">
                                <Button onClick={submit}
                                    type="submit" className="h-9 px-4">
                                    Registrar Destinatario</Button>
                            </div>
                        </Field>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    </div>
)
}
