import React from "react";
import {ArrowsUpDownIcon} from '@heroicons/react/24/outline'
import Arrow from "../icons/Arrow";
import styles from "./index.module.scss";


export default function SwitchButton({ onClick }:{onClick:()=>void}){
  return <button
    className={styles.switchButton}
    onClick={onClick}>
    <ArrowsUpDownIcon className="w-10 h-10"/>    
  </button>;
}