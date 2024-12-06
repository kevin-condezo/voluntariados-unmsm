import { useNavigate, useParams } from "react-router-dom";
const SidebarDashboard = ({ setActiveSection }) => {
const navigate = useNavigate();
const { organizationId } = useParams();


  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="flex flex-col w-64 bg-gray-800 text-white">
        <div className="p-4 text-center text-lg font-bold border-b border-gray-700">
          DASHBOARD
        </div>
        <nav className="mt-4 flex-grow">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActiveSection("overview")}
                className="block w-full text-left py-2 px-4 hover:bg-gray-700 rounded transition"
              >
                Descripción General
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection("content")}
                className="block w-full text-left py-2 px-4 hover:bg-gray-700 rounded transition"
              >
                Organizaciones
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection("volunteers")}
                className="block w-full text-left py-2 px-4 hover:bg-gray-700 rounded transition"
              >
                Voluntariados
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection("Participants")}
                className="block w-full text-left py-2 px-4 hover:bg-gray-700 rounded transition"
              >
                Participantes
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection("activities")}
                className="block w-full text-left py-2 px-4 hover:bg-gray-700 rounded transition"
              >
                Actividades
              </button>
            </li>
          </ul>
        </nav>
        {/* Botón Retornar al final */}
        <button
          onClick={() => navigate(`/${organizationId}/management`)} // Retorna a la página anterior
          className="mt-auto block w-full text-left py-2 px-4 hover:bg-red-500 rounded transition"
        >
          Retornar
        </button>
      </aside>
    </div>
  );
};

export default SidebarDashboard;
