"use server";

import { config } from "@/config/config";
import { cookies } from "next/headers";
import type { Task } from "@/types/tasks";
import type { genericResponse } from "@/types/res";
import { AlertCircle } from "lucide-react";

export default async function TaskRender() {
  const Cookies = await cookies();
  const URL = config.BACKEND_URL;
  const userId = Cookies.get("userId")?.value;
  const token = Cookies.get("authToken");

  if (!userId) {
    return (
      <div className="flex flex-col items-center justify-center p-4">
        <div className="flex items-center gap-2 text-red-500 mb-4">
          <AlertCircle size={20} />
          <p>No se ha iniciado sesión</p>
        </div>
      </div>
    );
  }

  let tasks: Task[] = [];
  let errorMessage: string | null = null;
  let noTasksAvailable = false;
  const url = `${URL}/tasks/getAll/${userId}`;
  console.log(url);

  try {
    const res = await fetch(url, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: `authToken=${token?.value}`,
      },
    });

    if (!res.ok) {
      throw new Error("Error al conectar con el servidor");
    }

    const responseData: genericResponse<Task[]> = await res.json();

    if (!responseData.success) {
      // Verificar si el mensaje de error indica que no hay tareas
      if (
        responseData.message?.toLowerCase().includes("no hay tareas") ||
        responseData.message
          ?.toLowerCase()
          .includes("no se encontraron tareas") ||
        responseData.message?.toLowerCase().includes("no existen tareas") ||
        responseData.message?.toLowerCase().includes("not tasks exist")
      ) {
        noTasksAvailable = true;
      } else {
        throw new Error(responseData.message || "Error al obtener las tareas");
      }
    } else {
      tasks = responseData.data || [];
      if (tasks.length === 0) {
        noTasksAvailable = true;
      }
    }
  } catch (error) {
    const errorMsg =
      error instanceof Error ? error.message : "Error desconocido";

    // Verificar si el mensaje de error indica que no hay tareas
    if (
      errorMsg.toLowerCase().includes("no hay tareas") ||
      errorMsg.toLowerCase().includes("no se encontraron tareas") ||
      errorMsg.toLowerCase().includes("no existen tareas") ||
      errorMsg.toLowerCase().includes("not tasks exist")
    ) {
      noTasksAvailable = true;
    } else {
      errorMessage = errorMsg;
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Tareas</h1>

      {errorMessage && (
        <div className="flex items-center gap-2 text-red-500 mb-4 p-2 border border-red-300 rounded bg-red-50">
          <AlertCircle size={20} />
          <p>{errorMessage}</p>
        </div>
      )}

      {noTasksAvailable && (
        <p className="text-gray-500">No hay tareas disponibles</p>
      )}

      {tasks.length > 0 && (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li key={task.id} className="border p-3 rounded-lg">
              <h2 className="font-semibold">{task.title}</h2>
              <p className="text-sm">{task.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
