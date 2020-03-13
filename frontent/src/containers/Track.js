import React, {Component} from 'react';
import {connect} from "react-redux";
import {Badge, Container, ListGroup, ListGroupItem} from "reactstrap";
import {getTrack, getNameAlbum} from "../store/action";

class Track extends Component {

    componentDidMount() {
        this.getNameAlbumHandler();
        this.props.getTrack(this.props.match.params.id);
    }
    getNameAlbumHandler = () => {
        this.props.getNameAlbum(this.props.match.params.id)
    };

    render() {
        return this.props.trackThis.artistAlbum && (
            <Container>
                <h1>Album <Badge color="secondary">{this.props.trackThis.artistAlbum.titleAlbum}</Badge></h1>
                <hr/>
                <ListGroup>
                    {this.props.trackThis.track && this.props.trackThis.track.map(item => (
                        <ListGroupItem key={item._id}>
                            <span>{item.number}</span> |
                            <span> Album: {this.props.trackThis.artistAlbum.titleAlbum}</span> |
                            <span> Track: {item.titleTrack}</span> |
                            <span> {item.duration}</span>
                        </ListGroupItem>
                    ))}
                </ListGroup>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        trackThis: state
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getTrack: (id) => dispatch(getTrack(id)),
        getNameAlbum: (id) => dispatch(getNameAlbum(id))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Track);