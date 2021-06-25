import React from "react";
import { FaSpinner } from "react-icons/fa";
import * as styles from "./Spinner.css";

function Spinner(): JSX.Element {
  return <FaSpinner className={styles.Spinner} />;
}

export default Spinner;
