import DetailsColumn from "../components/DetailsColumn";
import AuthButton from "../components/AuthButton";
import React, { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";

const GET_USER_BY_ID = gql`
  query getUser($id: ID!) {
    getUser(id: $id) {
      id
      email
      codigoUniversitario
      username
      nombre
      apellido
      interests{
        tags
      }
      totalPuntos
    }
  }
`;

//const ProfileUser = ({ id }) => {

const ProfileUser = () => {

  const fixedId = "674be8cf539d7cac050126e2";

  const { loading, error, data } = useQuery(GET_USER_BY_ID, {
    variables: { id: fixedId },
  });

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const user = data.getUser;
  console.log(user);

    // Extraer datos del usuario para mostrarlos
    const { email, codigoUniversitario, username, nombre, apellido, interests, totalPuntos } = user;

      // Manejar intereses
    const formattedInterests =
    interests?.tags && interests.tags.length > 0
      ? interests.tags.join(", ")
      : "No especificado";

  return (
    <section className="w-full overflow-hidden dark:bg-gray-900">
    <div className="flex flex-col">
      {/* Cover Image */}
      <img
        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw5fHxjb3ZlcnxlbnwwfDB8fHwxNzEwNzQxNzY0fDA&ixlib=rb-4.0.3&q=80&w=1080"
        alt="User Cover"
        className="w-full xl:h-[20rem] lg:h-[18rem] md:h-[16rem] sm:h-[14rem] xs:h-[11rem]"
      />

    <div className="sm:w-[80%] xs:w-[90%] mx-auto flex">
      <div
        className="flex flex-col justify-center items-center bg-blue-500 text-white font-bold rounded-md 
                  lg:w-[12rem] lg:h-[12rem] md:w-[10rem] md:h-[10rem] sm:w-[8rem] sm:h-[8rem] 
                  xs:w-[7rem] xs:h-[7rem] outline outline-2 outline-offset-2 outline-blue-500 
                  relative lg:bottom-[5rem] sm:bottom-[4rem] xs:bottom-[3rem] space-y-1"
      >
        <span>Total Puntos</span>
        <span>{user.totalPuntos != null ? user.totalPuntos : "0"}</span>
      </div>

      <h1 className="w-[23rem] text-left my-4 sm:mx-4 xs:pl-4 text-gray-800 dark:text-white lg:text-4xl md:text-3xl sm:text-3xl xs:text-xl font-serif">
        {user.username}
      </h1>

      {/* Botón Editar Perfil ajustado */}
      <div className="items-top flex bg-green-400 justify-start mb-auto mt-4">
        <AuthButton
          text="Editar Perfil"
          className="px-4 py-2 text-sm font-semibold bg-blue-500 text-white rounded-md hover:bg-blue-600"
          to="/search"
        />
      </div>
    </div>


      <div className="xl:w-[80%] lg:w-[90%] md:w-[90%] sm:w-[92%] xs:w-[90%] mx-auto flex flex-col gap-4 items-center relative lg:-top-8 md:-top-6 sm:-top-4 xs:-top-4">
        {/* Description */}
        <p className="w-fit text-gray-700 dark:text-gray-400 text-md hidden">
        Hola, mi nombre es {user.nombre} {user.apellido}, soy una persona apasionada por ayudar a los demás y contribuir al bienestar de mi comunidad. Desde siempre he sentido un profundo interés por involucrarme en actividades que generen un impacto positivo en la sociedad. Creo firmemente que, a través del voluntariado, no solo puedo aportar con mi tiempo y habilidades, sino también aprender de las experiencias y valores de las personas con las que trabaje.
        Me motiva especialmente la posibilidad de formar parte de un equipo comprometido, en el que podamos trabajar juntos hacia un objetivo común, enfrentando retos y creciendo tanto personal como profesionalmente. Además, considero que el voluntariado es una oportunidad única para retribuir a la sociedad y promover un entorno más solidario y justo.
        </p>

        {/* Details */}
        <div className="w-full my-auto py-6 flex flex-col justify-center gap-2">
          <div className="w-full flex sm:flex-row xs:flex-col gap-2 justify-center">
            <DetailsColumn
              details={[
                { title: 'Nombre', value: nombre},
                { title: 'Apellido', value: apellido },
                { title: 'Código', value: codigoUniversitario },
              ]}
            />
            <DetailsColumn
              details={[
                { title: 'Correo', value: email },
                { title: "Intereses",
                  value: formattedInterests
                },
              ]}
            />
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <AuthButton text="Ver mis voluntariados" className="max-w-xs" to="/search" />
          <AuthButton text="Ver voluntariados creados" className="max-w-xs" to="/dashboard-volunteering" />
        </div>

      </div>
    </div>
  </section>
);
};


export default ProfileUser;
