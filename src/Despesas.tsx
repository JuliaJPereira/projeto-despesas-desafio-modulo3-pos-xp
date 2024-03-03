import React from "react";
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
import { useDespesasContainer } from "./hooks/useDespesasContainer";

export function Despesas(): React.JSX.Element {
  const {
    year,
    month,
    setYear,
    setMonth,
    value,
    handleChange,
    filteredData,
    years,
    totalDespesaPorCategoria,
    handleLogout,
    loading,
  } = useDespesasContainer();

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

  if (loading) return <p>Loading...</p>;

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
          Categorias
          {totalDespesaPorCategoria.map((categoria) => (
            <TableRow
              key={categoria.categoria}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <TableCell>{categoria.categoria}</TableCell>
              <TableCell>
                {categoria.total.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </TableCell>
            </TableRow>
          ))}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Detalhes
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Despesa</TableCell>
                <TableCell>Categoria</TableCell>
                <TableCell>Dia</TableCell>
                <TableCell>Valor (R$)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData
                ?.sort((a, b) => b.valor - a.valor) // Sort by highest value
                .map((despesa) => (
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
          </Table>
        </CustomTabPanel>
      </Box>
    </Container>
  );
}
