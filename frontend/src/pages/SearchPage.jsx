import { MaterialSymbol } from "react-material-symbols";
import CardIcon from "../components/CardIcon";
import CardVolunteering from "../components/CardVolunteering";
import { useState } from "react";
import { gql, useQuery } from "@apollo/client";

const GET_VOLUNTEERING = gql`
  query {
    getVolunteers {
      id
      title
      organization{
        name
      }
      date_create
      date_start
      date_end
      location
      totalVac
      category
      tags
      users{
        approved
      }
}}
`

const CategoryList = [
  "Animales",
  "Arte y Cultura",
  "Cocina",
  "Adulto Mayor",
  "Deportes",
  "Educación",
  "Medio Ambiente",
  "Salud",
  "Tecnología",
  "Música",
  "Ciencia",
  "Viajes",
  "Comunidad",
  "Desarrollo Personal",
  "Ayuda Humanitaria",
];

const CategoryListCard = [
  {
    title: "Animales",
    icon: "pets",
  },
  {
    title: "Arte y Cultura",
    icon: "palette",
  },
  {
    title: "Cocina",
    icon: "restaurant",
  },
  {
    title: "Adulto Mayor",
    icon: "elderly",
  },
  {
    title: "Deportes",
    icon: "sports",
  },
  {
    title: "Educación",
    icon: "school",
  },
  {
    title: "Medio Ambiente",
    icon: "eco",
  },
  {
    title: "Salud",
    icon: "volunteer_activism",
  },
  {
    title: "Otros",
    icon: "more_horiz",
  },
];

const SearchPage = () => {
  // eslint-disable-next-line no-unused-vars
  const [filteredVolunteering, setFilteredVolunteering] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [categoryQuery, setCategoryQuery] = useState([]);
  const { loading, error, data } = useQuery(GET_VOLUNTEERING);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  const volunteeringListNew = data.getVolunteers;
  console.log(volunteeringListNew[0].id);

  if (filteredVolunteering.length === 0) {
    setFilteredVolunteering(volunteeringListNew);
  }
  
  

  // Funciones para capturar los valores del input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocationQuery(e.target.value);
  };

  // Filtrar los voluntariados en función de la búsqueda y ubicación
  const filterVolunteering = () => {
    setFilteredVolunteering(volunteeringListNew);
    let filtered = volunteeringListNew.filter((volunteering) => {
      const matchesSearch = volunteering.category
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesSearch_2 = volunteering.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesLocation = volunteering.location
        .toLowerCase()
        .includes(locationQuery.toLowerCase());

      return (
        (matchesSearch && matchesLocation) ||
        (matchesSearch_2 && matchesLocation)
      );
    });
    setFilteredVolunteering(filtered);
  };

  // Filtrar los voluntariados en función de la categoría
  const searchCategory = (category) => {
    console.log("filtro añadido: " + category);
    let updatedCategories
    let categoryList
    if (category === "Otros") {
      //no incluir categorias "medio ambienre" y "salud"
      categoryList = CategoryList.filter(
        (cat) =>
          cat !== "Animales" &&
          cat !== "Arte y Cultura" &&
          cat !== "Cocina" &&
          cat !== "Adulto Mayor" &&
          cat !== "Deportes" &&
          cat !== "Educación" &&
          cat !== "Medio Ambiente" &&
          cat !== "Salud" 
      );
    } 
    if (categoryQuery.includes(category)  || categoryQuery.includes(categoryList)) {
      updatedCategories = categoryQuery.filter((cat) => cat !== category);
    } else {
      updatedCategories = [...categoryQuery, category];
    }
    setCategoryQuery(updatedCategories);
    const result = volunteeringListNew.filter((volunteering) => {
      return updatedCategories.includes(volunteering.category);
    });
    setFilteredVolunteering(result);
    
  };

  return (
    <div className="bg-base-100 min-h-screen">
      <div className="flex flex-col">
        {/* banner */}
        <div className="relative w-full h-64">
          <img
            src="https://bicentenario.gob.pe/portal/2023/03/mar-31-23.jpg"
            alt="Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="absolute inset-10 flex flex-col items-start justify-center">
            <p className="text-white text-3xl font-semibold">Encuentra</p>
            <p className="text-white text-4xl font-bold">el voluntariado</p>
            <p className="text-white text-3xl font-semibold">
              al que quisieras
            </p>
            <p className="text-white text-3xl font-semibold">participar</p>
          </div>
        </div>
        {/* Categorías */}
        <div className="flex flex-col px-4 py-8 bg-slate-100 dark:bg-slate-800">
          <h2 className="text-xl font-bold mb-4 p-4">Categorías</h2>
          <ul className="flex gap-5 justify-around overflow-auto">
            {CategoryListCard.map((category, index) => (
              <li key={index} className="mb-2">
                <CardIcon
                  title={category.title}
                  icon={category.icon}
                  onClick={() => searchCategory(category.title)}
                />
              </li>
            ))}
          </ul>
        </div>
        {/* Filtros y Voluntariados */}
        <div className="w-full p-4">
          <div className="flex flex-col md:flex-row">
            {/* Filtros */}
            <div className="w-full md:w-1/4 p-4">
              <h2 className="text-xl font-bold mb-4">Filtros</h2>
              <ul className="flex flex-col gap-2">
                <li className="mb-2">
                  <label className="input input-bordered flex items-center gap-2">
                    <input
                      type="text"
                      className="grow"
                      placeholder="Buscar"
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                    <MaterialSymbol icon="search" size={20} fill grade={-25} />
                  </label>
                </li>
                <li className="mb-2">
                  <label className="input input-bordered flex items-center gap-2">
                    <MaterialSymbol
                      icon="location_on"
                      size={20}
                      fill
                      grade={-25}
                    />
                    <input
                      type="text"
                      className="grow"
                      placeholder="Ubicación"
                      value={locationQuery}
                      onChange={handleLocationChange}
                    />
                  </label>
                </li>
                <button
                  className="btn btn-primary"
                  onClick={filterVolunteering}
                >
                  Buscar
                </button>
              </ul>
            </div>
            {/* Voluntariados */}
            <div className="w-full md:w-3/4 p-4">
              <h2 className="text-xl font-bold mb-4">
                Voluntariados Disponibles
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredVolunteering.map((volunteering, index) => (
                  <div key={index}>
                    <CardVolunteering
                      id={volunteering.id}
                      title={volunteering.title}
                      organization={volunteering.organization.name}
                      date={ new Date(Number(volunteering.date_start)).toLocaleDateString()}
                      location={volunteering.location}
                      totalVac={volunteering.totalVac}
                      filledVac={volunteering.users.length}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
