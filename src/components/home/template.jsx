import React, {useEffect, useState} from 'react';
import {Box, Container, Grid, Typography} from "@mui/material";
import img from '../../assets/home/image 21.png';
import text from '../../assets/home/Group 979 (1).png';
import moon from '../../assets/home/Group 978.png';
import axios from "axios";

function Template() {
    const [data, setData] = useState([]);
    const [acharyas, setAcharyas] = useState([]);
    const [adhayax, setAdhayax] = useState([]);

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

    // Group samitis without Lodash
    const groupedSamitis = data.reduce((acc, curr) => {
        if (!acc[curr.samiti]) acc[curr.samiti] = [];
        acc[curr.samiti].push(curr);
        return acc;
    }, {});

    return (
        <Box>
            <Container maxWidth={'lg'}>
                <Box sx={{backgroundColor: '#3F6F7D'}}>
                    <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <Box>
                            <img src={img}/>
                        </Box>
                        <Box sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column"
                        }}>
                            <Typography sx={{fontSize: '26px', color: '#fff', fontWeight: 600, textWrap: 'nowrap'}}>
                                || જય બાબા સ્વામી ||
                            </Typography>
                            <Typography sx={{fontSize: '20px', color: '#fff', fontWeight: 600, mt: 2}}>
                                સમર્પણ પરિવાર વરાછા ઝોન, સુરત.
                            </Typography>
                            <Box sx={{height: '200px'}}>
                                <img src={text} style={{width: '100%', height: '100%'}}/>
                            </Box>
                        </Box>
                        <Box sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexDirection: "column"
                        }}>
                            <Box>
                                <img src={moon}/>
                            </Box>
                            <Box sx={{width: '335px'}}>
                                <Typography sx={{fontSize: '20px', color: '#fff', fontWeight: 600}}>
                                    સમય: સવારે 5 : 00
                                </Typography>
                                <Typography sx={{fontSize: '20px', color: '#fff', fontWeight: 600}}>
                                    સમય: S.M.C કોમ્યુનિટી હોલ, સુદામા ચોક થી ફાયર સ્ટેશન રોડ, વર્ણી પ્લાઝા ની સામે મોટા
                                    વરાછા, સુરત.
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>

                        <Box sx={{
                            backgroundColor: '#FFF',
                            borderRadius: '25px',
                            m: 3,
                            width: '100%'
                        }}>
                            {acharyas.map((item, index) => (
                                <Box sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}>
                                    <Box sx={{
                                        fontWeight: 600,
                                        fontSize: '20px',
                                        lineHeight: '40px',
                                        px: 2
                                    }}
                                         key={index + 1}
                                    >
                                        આચાર્ય : {item.name}
                                    </Box>
                                    <Box sx={{
                                        fontWeight: 600,
                                        fontSize: '20px',
                                        lineHeight: '40px',
                                        px: 2
                                    }}
                                         key={index + 1}
                                    >
                                        {item.number}
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                        <Box sx={{
                            backgroundColor: '#FFF',
                            borderRadius: '25px',
                            m: 3,
                            width: '100%'
                        }}>
                            {adhayax.map((item, index) => (
                                <Box key={index + 1} sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}>
                                    <Box sx={{
                                        px: 2,
                                        fontWeight: 600,
                                        fontSize: '20px',
                                        lineHeight: '40px',
                                    }}>
                                        અધ્યક્ષ : {item.name}
                                    </Box>
                                    <Box sx={{
                                        px: 2,
                                        fontWeight: 600,
                                        fontSize: '20px',
                                        lineHeight: '40px',
                                    }}>
                                        {item.number}
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Box>

                    {/* Samiti Section */}
                    <Grid container spacing={2} sx={{p: 2}}>
                        {Object.entries(groupedSamitis).map(([samitiName, members], index) => (
                            <Grid item size={{xs: 12, sm: 6, md: 4}} key={index}>
                                <Box sx={{
                                    backgroundColor: '#FFF',
                                    borderRadius: '12px',
                                    p: 2,
                                }}>
                                    <Typography sx={{
                                        fontWeight: 'bold',
                                        fontSize: '18px',
                                        color: '#ED174F',
                                        borderBottom: '2px solid #ED174F',
                                        pb: 1,
                                        mb: 1,
                                        textAlign: 'center'
                                    }}>
                                        {samitiName}
                                    </Typography>
                                    {members.map((member, idx) => (
                                        <Box key={idx} sx={{display: 'flex', justifyContent: 'space-between', mb: 1}}>
                                            <Typography
                                                sx={{fontSize: '16px', fontWeight: 600}}>{member.name}</Typography>
                                            <Typography sx={{fontSize: '16px'}}>{member.number}</Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
}

export default Template;
