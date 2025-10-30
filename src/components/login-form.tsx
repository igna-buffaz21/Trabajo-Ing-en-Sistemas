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
import { use, useEffect, useState } from "react"
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


export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const [valorPedido, setValorPedido] = useState<number>(0);
  const [altura, setAltura] = useState<number>(0);
  const [ancho, setAncho] = useState<number>(0);
  const [largo, setLargo] = useState<number>(0);
  const [peso, setPeso] = useState<number>(0);
  const [precioTotal, setPrecioTotal] = useState<number>(0);
  const navigate = useNavigate();

  const [openDialogAlert, setOpenDialogAlert] = useState(false);
  const [openDialogSuccess, setOpenDialogSuccess] = useState(false);

  function calcularPrecio(e: React.FormEvent) {
    e.preventDefault();

    if (altura > 0 && ancho > 0 && largo > 0 && peso > 0) {
      const pesoVolumetrico = (ancho * altura * largo) / 5000;

      const volumenTotal = ancho * altura * largo;
      console.log("Volumen Total: " + volumenTotal + " cm³");
      
      const pesoFacturable = Math.max(peso, pesoVolumetrico);
    
      const tarifaBase = 4000;
      const costoPorKg = 500;

      const porcentajeValorSeguro = (valorPedido * 10) / 100;
      
      setPrecioTotal(tarifaBase + pesoFacturable * costoPorKg + porcentajeValorSeguro);

      setOpenDialogSuccess(true);
    
      return tarifaBase + pesoFacturable * costoPorKg;
    }
    else {
      setOpenDialogAlert(true);
    }
  }

  function continuarPedido() {
    localStorage.setItem("precioTotal", precioTotal.toString());

    navigate('/registro-destinatario');
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Registrar datos del pedido</CardTitle>
          <CardDescription className="text-sm">
                    Completá los datos del paquete. Todos los campos son requeridos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="valor">Valor del pedido</FieldLabel>
                <Input
                  id="valor-pedido"
                  type="number"
                  onChange={(e) => setValorPedido(Number(e.target.value))}
                  placeholder="Ingrese el valor del pedido"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="altura">Altura</FieldLabel>
                <Input
                  id="altura-pedido"
                  type="number"
                  onChange={(e) => setAltura(Number(e.target.value))}
                  placeholder="Ingrese la altura en cm"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="ancho">Ancho</FieldLabel>
                <Input
                  id="ancho-pedido"
                  type="number"
                  onChange={(e) => setAncho(Number(e.target.value))}
                  placeholder="Ingrese el ancho en cm"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="largo">Profundidad</FieldLabel>
                <Input
                  id="largo-pedido"
                  type="number"
                  onChange={(e) => setLargo(Number(e.target.value))}
                  placeholder="Ingrese el largo en cm"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="peso">Peso</FieldLabel>
                <Input
                  id="peso-pedido"
                  type="number"
                  onChange={(e) => setPeso(Number(e.target.value))}
                  placeholder="Ingrese el peso en kg"
                  required
                />
              </Field>
              <Field>
                <Button 
                type="submit"
                onClick={calcularPrecio}
                >Calcular Tarifa</Button>
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
              Asegúrese de ingresar: valor del pedido, altura, ancho, largo y peso.
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
              <AlertDialogTitle className="text-lg">Tarifa Calculada</AlertDialogTitle>
            </div>
            <AlertDialogDescription className="pt-4">
              <div className="flex flex-col items-center gap-2 py-4">
                <p className="text-sm text-muted-foreground">Precio Total:</p>
                <p className="text-4xl font-bold text-foreground">${precioTotal.toFixed(2)}</p>
              </div>
              <p className="text-center text-sm">
                ¿Desea continuar con este pedido?
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
            onClick={continuarPedido}
            >Continuar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
