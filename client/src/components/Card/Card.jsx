import React, {useState} from "react";
import { Link } from "react-router-dom";


//Importacion de estilos
import styles from "./Card.module.css";






const CountryCard = ({ imgflag, name, continent, population, id }) => {

  const [showId, setId] = useState("off")

  function handleId () {
    if (showId === "off") {
      setId("on")
      return showId;
    }else if(showId === "on") {
      setId("off")
      return showId
    }
  }

  return (

    <div className={styles.cardBox}>
    <button onClick={handleId}>id</button>
    
    <Link to={`/home/${id}`} >
       
      <div className={styles.imgFlagBox}>
        <img src={imgflag} alt="Not Found" className={styles.imgFlag} />
      </div> 
      <div className={styles.dataContent}>
     
        {/* <label className={styles.idButton}>Id: {id}</label> */}
        {showId === "on" ? <label className={styles.idButton}>Id: {id}</label> : "" }
          
          <label>{name}</label>
        <div className={styles.cardInfo}>
          <label>Continente: {continent}</label> 
          {/* <label> </label>  */}
          <label>Población:</label> 
          <label>{population} hab.</label> 
        </div>
      </div>

        </Link>
     </div>
  );
};

export default CountryCard;
