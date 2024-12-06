import React, { useEffect, useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const GET_VOLUNTEERS = gql`
  query GetVolunteers {
    getVolunteers {
      id
      title
      date_create
      date_start
      date_end
      location
      category
      users {
        userId {
          id
        }
        approved
      }
    }
  }
`;

const UserParticipation = () => {
  const navigate = useNavigate();

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Obtiene el ID del usuario desde localStorage
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);
  }, []);

  const { loading, error, data, refetch } = useQuery(GET_VOLUNTEERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Filtrar los voluntariados donde el usuario está inscrito
  const userVolunteers = data.getVolunteers.filter((volunteer) =>
    volunteer.users.some((user) => user.userId.id === userId)
  );

  return (
    <div className="text-gray-900 bg-gray-200">
      <div className="p-4 flex items-center">
        <h1 className="text-3xl">Mis Participaciones</h1>
        <button
          onClick={() => navigate("/profile-user")}
          className="ml-auto text-white bg-blue-500 hover:bg-blue-700 font-medium rounded-lg text-sm px-4 py-2"
        >
          Volver a mi perfil
        </button>
      </div>
      <div className="px-3 py-4 flex justify-center">
        <table className="w-full text-md bg-white shadow-md rounded mb-4">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3 px-5">#</th>
              <th className="text-left p-3 px-5">Título</th>
              <th className="text-left p-3 px-5">Categoría</th>
              <th className="text-left p-3 px-5">Ubicación</th>
              <th className="text-left p-3 px-5">Día Inicio</th>
              <th className="text-left p-3 px-5">Día Fin</th>
              <th className="text-left p-3 px-5">Solicitud</th>
            </tr>
          </thead>
          <tbody>
            {userVolunteers.map((volunteer, index) => (
              <tr key={volunteer.id} className="border-b hover:bg-orange-100">
                <td className="p-3 px-5">{index + 1}</td>
                <td className="p-3 px-5">{volunteer.title}</td>
                <td className="p-3 px-5">{volunteer.category}</td>
                <td className="p-3 px-5">{volunteer.location}</td>
                <td className="p-3 px-5">
                  {new Date(parseInt(volunteer.date_start)).toLocaleDateString(
                    "es-ES",
                    { timeZone: "UTC" }
                  )}
                </td>
                <td className="p-3 px-5">
                  {new Date(parseInt(volunteer.date_end)).toLocaleDateString(
                    "es-ES",
                    { timeZone: "UTC" }
                  )}
                </td>
                <td className="p-3 px-5">{volunteer.approved ? "Aprobada" : "Desaprobada"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserParticipation;
