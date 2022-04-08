import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { List, ListItem, ListItemSecondaryAction, Radio } from "@material-ui/core";
import { Modal } from "@material-ui/core";
import { postWithAuth } from "../../services/HttpService";


const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        margin: 50,

    },
    modal: {
        display: "flex",
        maxWidth: 200
    }
});

function Avatar(props) {

    const {avatarId}=props;
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(avatarId);


    const saveAvatar = () => {
        postWithAuth("/users/"+localStorage.getItem("currentUser"),{
            avatar:selectedValue
        })
            .then((res) => res.json())
            .catch((err) => console.log(err))
    }


    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        saveAvatar();
    }

    return (

        <div>
            <Card className={classes.root}>

                <CardMedia
                    component="img"
                    alt="User Avatar"
                    image={`/avatars/avatar${selectedValue}.jpg`}
                    title="User Avatar"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        username
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        User info
                    </Typography>
                </CardContent>

                <CardActions>
                    <Button size="small" color="primary" onClick={handleOpen}>
                        change avatar
                    </Button>
                </CardActions>
            </Card>
            <Modal
                className={classes.modal}
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >

                <List dense >
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((key) => {
                        const labelId = `checkbox-list-secondary-label-${key}`;
                        return (
                            <ListItem key={key} button>
                                <CardMedia
                                    style={{ maxWidth: 100 }}
                                    component="img"
                                    alt={`Avatar n°${key}`}
                                    image={`/avatars/avatar${key}.jpg`}
                                    title="User Avatar"
                                />
                                <ListItemSecondaryAction>
                                    <Radio
                                        edge="end"
                                        value={key}
                                        onChange={handleChange}
                                        checked={"" + selectedValue === "" + key}
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                        );
                    })}
                </List>
            </Modal>
        </div>

    )
}

export default Avatar;