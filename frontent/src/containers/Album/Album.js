import React, {Component} from 'react';
import '../../App.css'
import {Badge, Container} from "reactstrap";
import {getAlbum} from "../../store/action/action";
import {connect} from "react-redux";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import {NavLink} from "react-router-dom";


class Album extends Component {

    componentDidMount(): void {
        this.props.getAlbum(this.props.match.params.id);
    }

    watchAlbumHandler = (id) => {
        this.props.history.push('/track/' + id)
    };

    render() {
        return this.props.albumThis && (
            <>
                <Container>
                    <div style={{marginTop: '30px', display: 'flex', justifyContent: 'space-between'}}>
                        <h1><Badge color="secondary">Albums</Badge></h1>
                        <NavLink style={{textDecoration: 'none', color: 'black', marginTop: '20px'}} to="/addtrack">
                            <Button type={'submit'} variant="contained" color="primary"><span style={{marginRight: '8px'}}><AudiotrackIcon fontSize={"small"}/></span>  Add track</Button>
                        </NavLink>
                    </div>
                    <hr className="HRColor"/>
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap'
                    }}
                    >
                        {this.props.albumThis && this.props.albumThis.map(item => (
                            <Card key={item._id} style={{width: '320px', margin: '10px'}}>
                                <CardActionArea>
                                    <CardMedia
                                        style={{height: '200px'}}
                                        image={"http://localhost:5556/uploads/" + item.imageCover}
                                        title="Contemplative Reptile"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {item.titleAlbum}
                                        </Typography>
                                        <Typography variant="h6" component="h4">
                                            Year: {item.yearOfIssueAlbum}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {item.description}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button onClick={() => this.watchAlbumHandler(item._id)} size="small"
                                            color="primary">
                                        Watch tracks
                                    </Button>
                                    <Button size="small" color="secondary">
                                        delete
                                    </Button>
                                </CardActions>
                            </Card>
                        ))}
                    </div>
                </Container>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        albumThis: state.reducer.album
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getAlbum: (id) => dispatch(getAlbum(id))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Album);