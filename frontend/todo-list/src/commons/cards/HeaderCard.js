import React from "react";

import { Card } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const HeaderCard = ({title}) => {
    return <>
        <Card sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            boxShadow: '0 0 1.0px black',
            borderRadius: '10px',
            background: 'rgb(48, 106, 212)'
        }}>
            <CardContent sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Typography variant="h4" component="div" sx={{color: 'white', alignItems: 'center', textAlign: 'center', fontFamily: ['-apple-system',
                    'Arial',
                    'sans-serif',
                    '"Apple Color Emoji"',
                    '"Segoe UI Emoji"',
                    '"Segoe UI Symbol"',].join(',')}}>
                    {title}
                </Typography>
            </CardContent>
        </Card>
    </>
} 

export {HeaderCard}