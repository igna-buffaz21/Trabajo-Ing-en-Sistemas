import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { useNavigate } from "react-router-dom"

function Page3() {
    const navigate = useNavigate();

  return (
    <>
        <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-6 max-w-md mx-auto">
        <Card 
            className="w-full cursor-pointer transition-all hover:shadow-lg hover:scale-102"
            onClick={() => navigate('/registro-pedido')}
        >
            <CardHeader>
            <CardTitle>Realizar Pedido</CardTitle>
            <CardDescription>
                Registra un nuevo pedido y calcula la tarifa de envío
            </CardDescription>
            </CardHeader>
        </Card>

        <Card 
            className="w-full cursor-pointer transition-all hover:shadow-lg hover:scale-102"
            onClick={() => {/* navegar o abrir modal para ver estado */}}
        >
            <CardHeader>
            <CardTitle>Ver Estado de Envío</CardTitle>
            <CardDescription>
                Consulta el estado actual de tus pedidos en curso
            </CardDescription>
            </CardHeader>
        </Card>

        <Card 
            className="w-full cursor-pointer transition-all hover:shadow-lg hover:scale-102"
            onClick={() => {/* navegar o abrir modal para historial */}}
        >
            <CardHeader>
            <CardTitle>Historial de Envíos</CardTitle>
            <CardDescription>
                Revisa todos los envíos realizados anteriormente
            </CardDescription>
            </CardHeader>
        </Card>
        </div>
    </>
  )
}

export default Page3