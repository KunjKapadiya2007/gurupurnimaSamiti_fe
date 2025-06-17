import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import html2canvas from 'html2canvas';
import img from '../../assets/home/image 21.png';
import text from '../../assets/home/Group 979 (1).png';
import moon from '../../assets/home/Group 978.png';
import DownloadIcon from '@mui/icons-material/Download';
import axios from 'axios';

function Template() {
    const [data, setData] = useState([]);
    const [acharyas, setAcharyas] = useState([]);
    const [adhayax, setAdhayax] = useState([]);
    const captureRef = useRef(null);

    useEffect(() => {
        handleGet();
        handleachary();
        handleAdhayax();
    }, []);

    function handleachary() {
        axios.get('https://gurupurnima-be.onrender.com/api/acharyas')
            .then((response) => setAcharyas(response.data))
            .catch((error) => console.log(error));
    }

    function handleAdhayax() {
        axios.get('https://gurupurnima-be.onrender.com/api/adhyakshs')
            .then((response) => setAdhayax(response.data))
            .catch((error) => console.log(error));
    }

    function handleGet() {
        axios.get('https://gurupurnima-be.onrender.com/api/samitis')
            .then((response) => setData(response.data))
            .catch((error) => console.log(error));
    }

    const groupedSamitis = data.reduce((acc, curr) => {
        if (!acc[curr.samiti]) acc[curr.samiti] = [];
        acc[curr.samiti].push(curr);
        return acc;
    }, {});

    const samitiEntries = Object.entries(groupedSamitis);
    const columns = [[], [], []];
    samitiEntries.forEach((entry, i) => {
        columns[i % 3].push(entry);
    });

    const handleCapture = async () => {
        if (!captureRef.current) return;

        html2canvas(captureRef.current, {
            useCORS: true,
            allowTaint: true,
            scrollY: -window.scrollY,
        }).then((canvas) => {
            const image = canvas.toDataURL("image/png");

            const link = document.createElement("a");
            link.href = image;
            link.download = "capture.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }).catch((err) => {
            console.error("Error capturing canvas:", err);
        });
    };

    return (
        <Box>
            <Container maxWidth={'lg'}>
                <Button
                    onClick={handleCapture}
                    variant="contained"
                    startIcon={<DownloadIcon />}
                    sx={{
                        my: 3,
                        px: 4,
                        py: 1.5,
                        fontSize: '16px',
                        fontWeight: 'bold',
                        textTransform: 'none',
                        borderRadius: '12px',
                        background: 'linear-gradient(45deg, #00c6ff 30%, #0072ff 90%)',
                        boxShadow: '0 4px 12px rgba(0, 114, 255, 0.4)',
                        '&:hover': {
                            background: 'linear-gradient(45deg, #0072ff 30%, #00c6ff 90%)',
                            boxShadow: '0 6px 18px rgba(0, 114, 255, 0.6)',
                        },
                    }}
                >
                    Download Page
                </Button>
                <Box ref={captureRef} sx={{ backgroundColor: '#3F6F7D' }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: 'wrap' }}>
                        <Box><img src={img} /></Box>
                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                            <Typography sx={{ fontSize: '26px', color: '#fff', fontWeight: 600, textWrap: 'nowrap' }}>
                                || જય બાબા સ્વામી ||
                            </Typography>
                            <Typography sx={{ fontSize: '20px', color: '#fff', fontWeight: 600, mt: 2 }}>
                                સમર્પણ પરિવાર વરાછા ઝોન, સુરત.
                            </Typography>
                            <Box sx={{ height: '200px' }}>
                                <img src={text} style={{ width: '100%', height: '100%' }} />
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "column" }}>
                            <Box><img src={moon} /></Box>
                            <Box sx={{ width: '335px' }}>
                                <Typography sx={{ fontSize: '18px', color: '#fff', fontWeight: 600 }}>
                                    સમય: સવારે 5 : 00
                                </Typography>
                                <Typography sx={{ fontSize: '18px', color: '#fff', fontWeight: 600, display: 'flex' }}>
                                    સ્થળ:
                                    <Typography sx={{ fontSize: '18px', color: '#fff', fontWeight: 600, ml: 1 }}>
                                        S.M.C કોમ્યુનિટી હોલ, <br />સુદામા ચોક થી ફાયર સ્ટેશન રોડ, <br />વર્ણી પ્લાઝા ની સામે મોટો વરાછા, સુરત.
                                    </Typography>
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Box sx={{ backgroundColor: '#FFF', borderRadius: '25px', m: 3, width: '100%' }}>
                            {acharyas.map((item, index) => (
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center",color:'#009FFF' }} key={index}>
                                    <Box sx={{ fontWeight: 600, fontSize: '20px', lineHeight: '40px', px: 2 }}>
                                        {item.gender === 'Female' ? 'આચાર્યા' : 'આચાર્ય'} : {item.name}
                                    </Box>
                                    <Box sx={{ fontWeight: 600, fontSize: '20px', lineHeight: '40px', px: 2 }}>
                                        {item.number}
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                        <Box sx={{ backgroundColor: '#FFF', borderRadius: '25px', m: 3, width: '100%' }}>
                            {adhayax.map((item, index) => (
                                <Box key={index} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center",color:'#009FFF' }}>
                                    <Box sx={{ px: 2, fontWeight: 600, fontSize: '20px', lineHeight: '40px' }}>
                                        {item.gender === 'Female' ? 'અધ્યક્ષા' : 'અધ્યક્ષ'} : {item.name}
                                    </Box>
                                    <Box sx={{ px: 2, fontWeight: 600, fontSize: '20px', lineHeight: '40px' }}>
                                        {item.number}
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: {
                                xs: 'column',
                                md: 'row',
                            },
                            gap: '16px',
                            p: 2,
                        }}
                    >
                        {columns.map((column, colIndex) => (
                            <Box
                                key={colIndex}
                                sx={{
                                    flex: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '16px',
                                }}
                            >
                                {column.map(([samitiName, members], index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            backgroundColor: '#FFF',
                                            borderRadius: '12px',
                                            p: 2,
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontWeight: 'bold',
                                                fontSize: '18px',
                                                color: '#ED174F',
                                                borderBottom: '2px solid #ED174F',
                                                pb: 1,
                                                mb: 1,
                                                textAlign: 'center',
                                            }}
                                        >
                                            {samitiName}
                                        </Typography>
                                        {[...members]
                                            .sort((a, b) => (a.color === '#392d74' ? -1 : b.color === '#392d74' ? 1 : 0))
                                            .map((member, idx) => (
                                                <Box
                                                    key={idx}
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        mb: 1,
                                                        color: member.color,
                                                    }}
                                                >
                                                    <Typography sx={{ fontSize: '16px', fontWeight: 600 }}>
                                                        {member.name}
                                                    </Typography>
                                                    <Typography sx={{ fontSize: '16px', fontWeight: 600 }}>
                                                        {member.number}
                                                    </Typography>
                                                </Box>
                                            ))}
                                    </Box>
                                ))}
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

export default Template;
