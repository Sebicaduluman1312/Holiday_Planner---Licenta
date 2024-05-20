import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const CardComponent = (props) => {

    const fsq_id = props.props.fsq_id;
    const category_icon = props.props.category_icon;
    const country = props.props.country;
    const name = props.props.name;
    const locality = props.props.locality;
    const destination_category = props.props.destination_category;
    const photo_url = props.props.photo_url;

    return ( 
        <Card sx={{ width: 260 }}>
            <CardMedia
                sx={{ height: 210, objectFit: 'cover' }}
                image={photo_url}
                title={name}
            />
            <CardContent sx={{height: 100}}>
            <Typography gutterBottom variant="h7" component="div">
                {name.length > 20 ? `${name.substring(0, 20)}...` : `${name}`}
            </Typography>
            <Typography variant="body2" color="text.secondary" component="div" className="flex flex-col itmes-left">
                <div className="flex flex-col">
                    <div>
                        ({country}, {locality})
                    </div>
                    <div className='flex items-center mt-2'>
                        <img src={category_icon} alt={destination_category} className="bg-primary-black-blue mr-1 h-6 w-6" />
                        {destination_category}
                    </div>
                </div>
            </Typography>

            </CardContent>
            <CardActions
                sx={{ marginLeft: 1 }}
            >
                <Button size="small" id={fsq_id}>Details</Button>
            </CardActions>
        </Card>
    );
}
 
export default CardComponent;