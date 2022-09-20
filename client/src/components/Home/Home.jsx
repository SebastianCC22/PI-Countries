import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCountries,
  getActivitiesList,
  allFilters,
} from "../../redux/actions";
import { Link } from "react-router-dom";

//Importacion de estilos
import styles from "./Home.module.css";

//Importación de componentes

import CountriesCards from "../Cards/Cards";
import CountrySort from "../Sort/Sort";
import ContinentFilter from "../ContinentFilter/ContinentFilter";
import SearchBar from "../SearchBar/SearchBar";
import ActivityFilter from "../ActivityFilter/ActivityFilter";

//Importacion del Paginado
import Paged from "../Paged/Paged";

import loadingIMG from "../../img/GIF_Mundo_Banderas.gif";

const Home = () => {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);
  const [show, setShow] = useState(false);
  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivitiesList());
  }, [dispatch]);

  //Estado local para los filtros
  const [filterState, setFilterState] = useState({
    continent: [],
    sort: "Orden",
    activity: "All",
    countrySearch: "",
  });

  useEffect(() => {
    setLoading((loading)=>!loading);
    dispatch(allFilters(filterState));
  }, [filterState, dispatch]);

  const handleClick = (event) => {
    dispatch(getCountries());
    window.location.reload();
  }; //Funcion para resetear el State, para que vuelva a traer todos los países

  // Estados locales para setear el paginado
  const [currentPage, setCurrentPage] = useState(1); //Setea la página actual en 1
  const countriesPerPage = 9; // Setea la cantidad de paises por pagina
  let indFirstCountry = 0; //Para restar al primer indice de los paises despues de la pag 1
  let indLastCountry = 0; //Para restar al ultimo indice de los paises despues de la pag 1

  
  if (currentPage === 1) {
    indFirstCountry = 0;
    indLastCountry = 0;
  } else {
    indFirstCountry = currentPage - 2;
    indLastCountry = currentPage - 1;
  }
  const indexOfLastCountry = currentPage * countriesPerPage; //Para setear el el índice del último país en la pagina actual
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage; // Para setear el índice del primer paíes ne la página

  const currentCountries = !allCountries.length >0
    ? []
    : allCountries.slice(
        indexOfFirstCountry + indFirstCountry,
        indexOfLastCountry + indLastCountry
      ); //deja solo la cantidad de países que necesito en cada página
console.log('array current countries',currentCountries )


  const paged = (pageNumber) => {
    setCurrentPage(pageNumber);
  }; //Setea el número de la página a mostrar
  //Final de las funciones de paginado


  //funcion loading

  const [loading, setLoading] = useState(false);
  console.log('show ', show)
  useEffect(() => {
    setShow((show)=>!show);
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [loading]);



  return (
    <div className={styles.homeBox}>
      <div className={styles.homeTitleBox}>
        <div className={styles.buttonReset}>
          <button
            onClick={(event) => {
              handleClick(event);
            }}
          >
            Volver a Cargar
          </button>
        </div>

        <div className={styles.titleH2}>
          <h2>Welcome to Countries App</h2>
        </div>
        {/* SearchBar */}
        <div className={styles.searchCreateAct}>
          <SearchBar
            setCurrentPage={setCurrentPage}
            setFilterState={setFilterState}
            filterState={filterState}
          />

          <Link to="/activity">
            <button>Crear actividad Turística</button>
          </Link>
        </div>
      </div>

      <div className={styles.homeContentBox}>
        <div className={styles.leftMenu}>
          {/* Filtrado por Continente */}

          <ContinentFilter
            setCurrentPage={setCurrentPage}
            setFilterState={setFilterState}
            filterState={filterState}
          />

          {/* Orden alfabetico o por poblacion ascendente o descendente */}

          <CountrySort
            setCurrentPage={setCurrentPage}
            setFilterState={setFilterState}
            filterState={filterState}
          />
        </div>

        <div className={styles.dataCards}>
          {/* Área para el mapeo de las cartas */}

          {currentCountries.length === 0 && !show?
            <div className={styles.sinCoincidencias}>
              <img src={loadingIMG} alt="" />
            </div>:
          currentCountries.length > 0 ?       <CountriesCards currentCountries={currentCountries} />
          :   <div className={styles.sinCoincidencias}>
               <img src={loadingIMG} alt=""  />
              <h4>"No hay coincidencias"</h4>
            </div>
         }
          {/* Mapeo del Paginado */}

          <Paged
            countriesPerPage={countriesPerPage}
            allCountries={allCountries}
            paged={paged}
            key={"page" + currentPage}
            currentPage={currentPage}
          />
        </div>

        <div className={styles.filterActivity}>
          {/* Filtrado por Actividad */}

          <ActivityFilter
            setCurrentPage={setCurrentPage}
            setFilterState={setFilterState}
            filterState={filterState}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
