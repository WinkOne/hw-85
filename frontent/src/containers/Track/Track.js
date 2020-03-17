import React, {Component} from 'react';
import '../../App.css'
import './Track.css'
import {Redirect} from 'react-router-dom'
import {connect} from "react-redux";
import {Badge, Container, ListGroup} from "reactstrap";
import {getTrack, getNameAlbum} from "../../store/action/action";
import imagePlay from '../../assets/image/play-button (1).png'
import imagePause from '../../assets/image/pause (1).png'
import {trackHistoryPush} from "../../store/action/trackHistoryActions";


class Track extends Component {

    state = {
        artist: ''
    };

    async componentDidMount() {
        this.getNameAlbumHandler();
        await this.props.getTrack(this.props.match.params.id)
        //     .then(async () => {
        //     if (!this.props.nameArtist.executor.nameArtist){
        //        await this.setState({
        //             artist: "Sorry error request on the server, fix it soon"
        //         })
        //     } else {
        //       await this.setState({
        //             artist: this.props.nameArtist.executor.nameArtist
        //         })
        //     }
        //
        // });
    }

    getNameAlbumHandler = () => {
        this.props.getNameAlbum(this.props.match.params.id)
    };

    getPushTrackHistory = (id) => {
      this.props.trackHistoryPush(id)
    };

    render() {
        if (!this.props.user) {
            return <Redirect to='/login'/>
        } else {
            return this.props.trackThis.artistAlbum && (
                <Container>
                    <div style={{display: "flex", justifyContent: 'space-around', marginTop: '35px'}}>
                        {this.state.artist && <h1>Artist: <Badge color="secondary">{this.state.artist}</Badge></h1>}
                        {this.props.trackThis.artistAlbum.titleAlbum &&
                        <h1>Album: <Badge color="secondary">{this.props.trackThis.artistAlbum.titleAlbum}</Badge></h1>}
                    </div>
                    <hr className="HRColor"/>
                    <ListGroup>
                        {this.props.trackThis.track && this.props.trackThis.track.map(item => (
                            <div key={item._id} className="alert alert-dark">
                                <div style={{margin: '0'}}>
                                    <span>{item.number}</span> | <b>{item.titleTrack}</b> | <span> {item.duration}</span>
                                    <div style={{float: 'right'}}>
                                        <span onClick={() => this.getPushTrackHistory(item._id)} style={{margin: '2.5px'}}><img src={imagePlay} alt=""/></span>
                                        <span style={{margin: '2.5px'}}><img src={imagePause} alt=""/></span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </ListGroup>
                </Container>
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        user: state.users.user,
        trackThis: state.reducer,
        nameArtist: state.reducer.artistAlbum
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getTrack: (id) => dispatch(getTrack(id)),
        getNameAlbum: (id) => dispatch(getNameAlbum(id)),
        trackHistoryPush: (id) => dispatch(trackHistoryPush(id))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Track);