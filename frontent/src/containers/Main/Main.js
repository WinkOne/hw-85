import React, {Component} from 'react';
import '../../App.css'
import './Main.css'
import {Badge, Container, Modal, ModalHeader} from "reactstrap";
import {connect} from "react-redux";
import {getArtist} from "../../store/action/action";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import PublicIcon from '@material-ui/icons/Public';
import {deleteArtistGet, publicArtist} from "../../store/action/artistAction";


class Main extends Component {
    state = {
        modal: false
    };
    publishedArtist = (id, name, img, description) => {
        this.props.publicArtist(id, {nameArtist: name, imageArtist: img, infoArtist: description, published: false});
        this.props.deleteArtistGet(id)
    };

    componentDidMount(): void {
        this.props.getArtist()
    }

    routerHandler = (id) => {
        this.props.history.push('/albums/' + id)
    };
    toggle = () => {
        this.setState({modal: false})
    };
    toggleOpen = () => {
        this.setState({modal: true})
    };
    deleteHandler = (id) => {
        this.props.deleteArtistGet(id)
    };

    render() {

        return (
            <>
                <Container>
                    <div className="headerBlockTitle">
                        <h1><Badge color="secondary">Artists</Badge></h1>
                    </div>
                    <hr className="HRColor"/>
                    <div className="blockWindow">
                        {this.props.artistThis && this.props.artistThis.map(item => (
                            <Card key={item._id} style={{width: '320px', margin: '10px'}}>
                                <CardActionArea>
                                    <CardMedia
                                        onClick={!item.published ? () => this.publishedArtist(item._id, item.nameArtist, item.imageArtist, item.infoArtist, item.published) : this.toggleOpen}
                                        style={{height: '200px'}}
                                        image={"http://localhost:5556/uploads/" + item.imageArtist}
                                        title="Contemplative Reptile"
                                    />
                                    <CardContent
                                        onClick={!item.published ? () => this.publishedArtist(item._id, item.nameArtist, item.imageArtist, item.infoArtist, item.published) : this.toggleOpen}
                                    >
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {item.nameArtist}<span style={{float: 'right'}}>{item.published ?
                                            <PublicIcon/> : <NotInterestedIcon/>}</span>
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {item.infoArtist}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button onClick={() => this.routerHandler(item._id)} size="small"
                                            color="primary">
                                        Watch albums
                                    </Button>
                                    {this.props.user && this.props.user.role === 'admin' ?
                                        <Button onClick={() => this.deleteHandler(item._id)}
                                                size="small">Delete</Button> : null}
                                </CardActions>
                            </Card>
                        ))}
                    </div>
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                        {this.props.user && this.props.user.role === 'admin' ?
                            <ModalHeader toggle={this.toggle}>Already published</ModalHeader> :
                            <ModalHeader toggle={this.toggle}>You not Admin</ModalHeader>}
                    </Modal>
                </Container>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.users.user,
        artistThis: state.reducer.artist
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getArtist: () => dispatch(getArtist()),
        publicArtist: (id, put) => dispatch(publicArtist(id, put)),
        deleteArtistGet: (id) => dispatch(deleteArtistGet(id))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Main);