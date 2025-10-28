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
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { use, useEffect, useState } from "react"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const [valorPedido, setValorPedido] = useState<number>(0);
  const [altura, setAltura] = useState<number>(0);
  const [ancho, setAncho] = useState<number>(0);
  const [largo, setLargo] = useState<number>(0);
  const [peso, setPeso] = useState<number>(0);

  function calcularPrecio(e: React.FormEvent) {
    e.preventDefault(); // 👈 evita el reload automático

    if (altura > 0 && ancho > 0 && largo > 0 && peso > 0) {
      const pesoVolumetrico = (ancho * altura * largo) / 5000;
      const pesoFacturable = Math.max(peso, pesoVolumetrico);
    
      const tarifaBase = 1000;
      const costoPorKg = 250;

      console.log("El precio del envío es: " + (tarifaBase + pesoFacturable * costoPorKg));
    
      return tarifaBase + pesoFacturable * costoPorKg;
    }
    else {
      alert("Por favor, complete todos los campos con valores válidos.");
      return 0;
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Registrar datos del pedido</CardTitle>
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
                  placeholder="ingrese el valor del pedido"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="altura">Altura</FieldLabel>
                <Input
                  id="altura-pedido"
                  type="number"
                  onChange={(e) => setAltura(Number(e.target.value))}
                  placeholder="ingrese la altura en cm"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="ancho">Ancho</FieldLabel>
                <Input
                  id="ancho-pedido"
                  type="number"
                  onChange={(e) => setAncho(Number(e.target.value))}
                  placeholder="ingrese el ancho en cm"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="largo">Largo</FieldLabel>
                <Input
                  id="largo-pedido"
                  type="number"
                  onChange={(e) => setLargo(Number(e.target.value))}
                  placeholder="ingrese el largo en cm"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="peso">Peso</FieldLabel>
                <Input
                  id="peso-pedido"
                  type="number"
                  onChange={(e) => setPeso(Number(e.target.value))}
                  placeholder="ingrese el peso en kg"
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
    </div>
  )
}
