import { ReactElement } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./Details.module.css";

const Details = ({ id, children }: { id: string, children: ReactElement }) => {
  return (

    <div>
      <div className={styles.title}>
        <Link to={".."}><FaChevronLeft style={{ verticalAlign: "middle", color: "black" }} /></Link>
        <span className="title">Details about {id}</span>
      </div>
      <div>
        {children}
      </div>
    </div>


  )
};

export default Details;