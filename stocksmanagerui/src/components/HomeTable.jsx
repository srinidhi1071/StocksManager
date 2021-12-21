import { React, useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));



function HomeTable() {
    const [tickerData, setTickerData] = useState([]);
    const [ticker, setTicker] = useState("AARTIIND");
    const [open, setOpen] = useState(true);

    useEffect(() => {
        setOpen(true)
        fetch(`/api/getStockData?ticker=${ticker}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw response.json()
            })
            .then(apiData => {
                console.log(apiData)
                setTickerData(apiData)
                setOpen(false)
            })
            .catch(error => {
                console.log("Error fetching data from server : ", error)
                setOpen(false)
            })

    }, [ticker])

    const handleDropDownChange = (event) => {
        setTicker(event.target.value);
    };

    let stocksTickerNameList = ["AARTIIND", "ABBOTINDIA", "ABFRL", "ACC", "ADANIENT", "ADANIPORTS", "ALKEM", "AMARAJABAT", "AMBUJACEM", "APLLTD", "APOLLOHOSP", "APOLLOTYRE",
        "ASHOKLEY", "ASIANPAINT", "ASTRAL", "AUBANK", "AUROPHARMA", "AXISBANK", "BAJAJ-AUTO", "BAJAJFINSV", "BAJFINANCE", "BALKRISIND", "BANDHANBNK", "BANKBARODA",
        "BATAINDIA", "BEL", "BERGEPAINT", "BHARATFORG", "BHARTIARTL", "BHEL", "BIOCON", "BOSCHLTD", "BPCL", "BRITANNIA", "CADILAHC", "CANBK", "CANFINHOME",
        "CHOLAFIN", "CIPLA", "COALINDIA", "COFORGE", "COLPAL", "CONCOR", "COROMANDEL", "CROMPTON", "CUB", "CUMMINSIND", "DABUR", "DALBHARAT",
        "DEEPAKNTR", "DELTACORP", "DIVISLAB", "DIXON", "DLF", "DRREDDY", "EICHERMOT", "ESCORTS", "EXIDEIND", "FEDERALBNK", "GAIL",
        "GLENMARK", "GMRINFRA", "GODREJCP", "GODREJPROP", "GRANULES", "GRASIM", "GUJGASLTD", "HAL", "HAVELLS", "HCLTECH", "HDFC", "HDFCAMC", "HDFCBANK", "HDFCLIFE",
        "HEROMOTOCO", "HINDALCO", "HINDPETRO", "HINDUNILVR", "IBULHSGFIN", "ICICIBANK", "ICICIGI", "ICICIPRULI", "IDEA", "IDFCFIRSTB", "IEX", "IGL",
        "INDHOTEL", "INDIACEM", "INDIAMART", "INDIGO", "INDUSINDBK", "INDUSTOWER", "INFY", "IOC", "IPCALAB", "IRCTC", "ITC", "JINDALSTEL", "JKCEMENT",
        "JSWSTEEL", "JUBLFOOD", "KOTAKBANK", "L&TFH", "LALPATHLAB", "LICHSGFIN", "LT", "LTI", "LTTS", "LUPIN", "M&M", "M&MFIN", "MANAPPURAM", "MARICO",
        "MARUTI", "MCDOWELL-N", "MCX", "METROPOLIS", "MFSL", "MGL", "MINDTREE", "MOTHERSUMI", "MPHASIS", "MRF", "MUTHOOTFIN", "NAM-INDIA", "NATIONALUM",
        "NAUKRI", "NAVINFLUOR", "NESTLEIND", "NMDC", "NTPC", "OBEROIRLTY", "OFSS", "ONGC", "PAGEIND", "PEL", "PERSISTENT", "PETRONET", "PFC",
        "PFIZER",
        "PIDILITIND",
        "PIIND",
        "PNB",
        "POLYCAB",
        "POWERGRID",
        "PVR",
        "RAMCOCEM",
        "RBLBANK",
        "RECLTD",
        "RELIANCE",
        "SAIL",
        "SBILIFE",
        "SBIN",
        "SHREECEM",
        "SIEMENS",
        "SRF",
        "SRTRANSFIN",
        "STAR",
        "SUNPHARMA",
        "SUNTV",
        "SYNGENE",
        "TATACHEM",
        "TATACONSUM",
        "TATAMOTORS",
        "TATAPOWER",
        "TATASTEEL",
        "TCS",
        "TECHM",
        "TITAN",
        "TORNTPHARM",
        "TORNTPOWER",
        "TRENT",
        "TVSMOTOR",
        "UBL",
        "ULTRACEMCO",
        "UPL",
        "VEDL",
        "VOLTAS",
        "WIPRO",
        "ZEEL",
    ]


    return (
        <Container maxWidth="xl">
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <h1>Stocks Manager</h1>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl sx={{ minWidth: 200 }}>
                            <InputLabel id="demo-simple-select-helper-label">Ticker</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={ticker}
                                label="Ticker"
                                onChange={handleDropDownChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {stocksTickerNameList.map(tickerName => (<MenuItem value={tickerName}>{tickerName}</MenuItem>))}

                            </Select>
                        </FormControl>
                    </Grid>
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={open}
                    > <CircularProgress color="inherit" />
                    </Backdrop>
                    <Grid item xs={12}>
                        <TableContainer >
                            <Table aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Date</StyledTableCell>
                                        <StyledTableCell>Symbol</StyledTableCell>
                                        <StyledTableCell>Price</StyledTableCell>
                                        <StyledTableCell>Delivery Value</StyledTableCell>
                                        <StyledTableCell>5 Day Avg Del</StyledTableCell>
                                        <StyledTableCell>Cumm OI</StyledTableCell>
                                        <StyledTableCell>OI</StyledTableCell>
                                        <StyledTableCell>% Price</StyledTableCell>
                                        <StyledTableCell>% Delivery</StyledTableCell>
                                        <StyledTableCell>% OI</StyledTableCell>
                                        <StyledTableCell>Short Covering</StyledTableCell>
                                        <StyledTableCell>Long Build Up</StyledTableCell>
                                        <StyledTableCell>Short Build Up</StyledTableCell>
                                        <StyledTableCell>Long Unwinding</StyledTableCell>
                                        <StyledTableCell>VWAP</StyledTableCell>
                                        <StyledTableCell>High</StyledTableCell>
                                        <StyledTableCell>Low</StyledTableCell>
                                        <StyledTableCell>Close</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tickerData.map((row) => (
                                        <StyledTableRow key={row.name}>
                                            <StyledTableCell component="th" scope="row">
                                                {row.date}
                                            </StyledTableCell>
                                            <StyledTableCell>{row.symbol}</StyledTableCell>
                                            <StyledTableCell>{row.close}</StyledTableCell>
                                            <StyledTableCell>{row.deliveryValue}</StyledTableCell>
                                            <StyledTableCell>{row.fiveDayAvgDel}</StyledTableCell>
                                            <StyledTableCell>{row.CummOI}</StyledTableCell>
                                            <StyledTableCell>{row.OI}</StyledTableCell>
                                            <StyledTableCell>{row.percentagePrice}</StyledTableCell>
                                            <StyledTableCell>{row.percentageDelivery}</StyledTableCell>
                                            <StyledTableCell>{row.percentageOI}</StyledTableCell>
                                            <StyledTableCell>{row.shortCovering}</StyledTableCell>
                                            <StyledTableCell>{row.longBuildUp}</StyledTableCell>
                                            <StyledTableCell>{row.shortBuildUp}</StyledTableCell>
                                            <StyledTableCell>{row.longUnwinding}</StyledTableCell>
                                            <StyledTableCell>{row.vwap}</StyledTableCell>
                                            <StyledTableCell>{row.high}</StyledTableCell>
                                            <StyledTableCell>{row.low}</StyledTableCell>
                                            <StyledTableCell>{row.close}</StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Box>
        </Container >
    );
}

export default HomeTable;