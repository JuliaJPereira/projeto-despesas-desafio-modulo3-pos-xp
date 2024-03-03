import React, { useMemo } from 'react';
import useAxios from 'axios-hooks';
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const useDespesasContainer = () => {
  interface DespesaItem {
    id: number;
    descricao: string;
    categoria: string;
    valor: number;
    mes: string;
    dia: string;
  }

  const [{ data }] = useAxios<DespesaItem[]>("/despesas");
  const [year, setYear] = React.useState("");
  const [month, setMonth] = React.useState("");
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { filteredData, years } = useMemo(() => {
    const filteredData =
      data?.filter((despesa) => {
        const currentYear = despesa.mes.split("-")[0];
        const currentMonth = despesa.mes.split("-")[1];

        return (
          (!year || currentYear === year) && (!month || currentMonth === month)
        );
      }) ?? [];

    const years: string[] = [];

    data?.forEach((despesa) => {
      const currentMonth = despesa.mes.split("-")[0];
      if (!years.includes(currentMonth)) {
        years.push(currentMonth);
      }
    });

    return {
      filteredData,
      years,
    };
  }, [data, year, month]);

  const handleLogout = async () => {
    alert("tchauuu");
    await axios.post("/sessao/finalizar");
    navigate("/login");
  };

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const totalDespesaPorCategoria = useMemo(() => {
    return Array.from(
      new Set(filteredData?.map((despesa) => despesa.categoria))
    )
      .map((categoria) => {
        return {
          categoria,
          total: filteredData
            ?.filter((despesa) => despesa.categoria === categoria)
            .reduce((acc, despesa) => acc + despesa.valor, 0),
        };
      })
      .sort((a, b) => b.total - a.total);
  }, [filteredData]);

  return {
    filteredData,
    years,
    year,
    setYear,
    month,
    setMonth,
    value,
    handleChange,
    totalDespesaPorCategoria,
    handleLogout,
    a11yProps,
  };
}