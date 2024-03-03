import React, { useMemo } from 'react';
import useAxios from 'axios-hooks';
import {
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface DespesaItem {
  id: number;
  descricao: string;
  categoria: string;
  valor: number;
  mes: string;
  dia: string;
}

export function Despesas(): React.JSX.Element {
  const [{ data, loading }] = useAxios<DespesaItem[]>("/despesas");
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

  if (loading) return <p>Loading...</p>;

  /* ---- TABS ---- */
  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <Container>
      <div style={{ cursor: "pointer" }}>
        <button onClick={handleLogout}>Sair</button>
      </div>
      <h1 style={{ textAlign: "center" }}>Despesas</h1>

      <Grid container spacing={2} style={{ marginBottom: 60 }}>
        <Grid item xs={8}>
          <FormControl style={{ marginRight: 10 }}>
            <InputLabel id="year-label">Ano</InputLabel>
            <Select
              labelId="year-label"
              id="year-select"
              label="Ano"
              value={year}
              onChange={(v) => setYear(v.target.value)}
              style={{ width: 100 }}
            >
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="month-label">Mês</InputLabel>
            <Select
              labelId="month-label"
              id="month-select"
              label="Mês"
              value={month}
              onChange={(v) => setMonth(v.target.value)}
              style={{ width: 100 }}
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="01">Janeiro</MenuItem>
              <MenuItem value="02">Fevereiro</MenuItem>
              <MenuItem value="03">Março</MenuItem>
              <MenuItem value="04">Abril</MenuItem>
              <MenuItem value="05">Maio</MenuItem>
              <MenuItem value="06">Junho</MenuItem>
              <MenuItem value="07">Julho</MenuItem>
              <MenuItem value="08">Agosto</MenuItem>
              <MenuItem value="09">Setembro</MenuItem>
              <MenuItem value="10">Outubro</MenuItem>
              <MenuItem value="11">Novembro</MenuItem>
              <MenuItem value="12">Dezembro</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid
          item
          xs={4}
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <span>
            Despesa total:{" "}
            {filteredData
              ?.reduce((acc, x) => acc + x.valor, 0)
              .toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
          </span>
        </Grid>
      </Grid>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Resumo" {...a11yProps(0)} />
            <Tab label="Detalhes" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          {Array.from(
            new Set(filteredData?.map((despesa) => despesa.categoria))
          ).map((categoria) => (
            <TableRow
              key={categoria}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <TableCell>{categoria}</TableCell>
              <TableCell>
                {filteredData
                  ?.filter((despesa) => despesa.categoria === categoria)
                  .reduce((acc, despesa) => acc + despesa.valor, 0)
                  .toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
              </TableCell>
            </TableRow>
          ))}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Detalhes
        </CustomTabPanel>
      </Box>
      {/* <Table>
        <TableHead>
          <TableRow>
            <TableCell>Despesa</TableCell>
            <TableCell>Categoria</TableCell>
            <TableCell>Dia</TableCell>
            <TableCell>Valor (R$)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData?.map((despesa) => (
            <TableRow key={despesa.id}>
              <TableCell>{despesa.descricao}</TableCell>
              <TableCell>{despesa.categoria}</TableCell>
              <TableCell>{despesa.dia}</TableCell>
              <TableCell>
                {despesa.valor.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table> */}
    </Container>
  );
}
