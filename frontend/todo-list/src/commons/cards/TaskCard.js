import React from 'react';

import { Card, CardContent, Typography} from '@mui/material';

const  TaskCard = ({taskName, description}) => {
    
    return <Card sx={{
        height: 80,
        width: '100%',
        border: 'solid 1px'
    }}>
        <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
                {taskName}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" width={'100%'}>
                {description}
            </Typography>
        </CardContent>
    </Card>
}

export { TaskCard };