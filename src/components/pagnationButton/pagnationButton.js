import React from 'react';
import { useNavigate } from "react-router-dom";

const PagnationButton = ({ isButtonActive, page, name }) => {
  const navigate = useNavigate();  
  const colorClass = isButtonActive ? 'bg-slate-300' : 'bg-[#ff6600]';
  const pageOperation = name === 'Next' ? page + 1 : page - 1;

  return (
    <button className={`rounded pl-2 pr-2 font-bold ${colorClass}`} onClick={() => {navigate(`/new/${pageOperation}`)}} disabled={isButtonActive}>{name}</button>
  );
};

export default PagnationButton;