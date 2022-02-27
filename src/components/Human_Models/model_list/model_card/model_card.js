import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyle = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 200,
        width: 300
    }
})

const ModalCard = ({ model }) => {
    const classes = useStyle();
    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia className={classes.media} image={model.picture} />
                <CardContent>
                    <Typography gutterBottom variant='h5' component="h2">
                        {`${model.firstName} ${model.lastName}`}
                    </Typography>
                    <Typography variant='body2' color="textSecondary" component="p">
                        Date of Birth: {model.dateOfBirth}
                    </Typography>
                    <Typography variant='body2' color="textSecondary" component="p">
                        Hair Color: {model.hairColor}
                    </Typography>
                    <Typography variant='body2' color="textSecondary" component="p">
                        Height: {model.height}
                    </Typography>
                    <Typography variant='body2' color="textSecondary" component="p">
                        Profession: {model.profession}
                    </Typography>
                    <Typography variant='body2' color="textSecondary" component="p">
                        Weight: {model.weight}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">More Info...</Button>
            </CardActions>
        </Card>
    )
}

export default ModalCard