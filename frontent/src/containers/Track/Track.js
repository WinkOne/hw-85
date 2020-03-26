import React, {Component} from 'react';
import '../../App.css'
import './Track.css'
import {Redirect} from 'react-router-dom'
import {connect} from "react-redux";
import {Alert, Badge, Container, ListGroup} from "reactstrap";
import {getTrack, getNameAlbum} from "../../store/action/action";
import {trackHistoryPush} from "../../store/action/trackHistoryActions";





class Track extends Component {
    state = {
        loading: false
    };

    async componentDidMount() {
        this.getNameAlbumHandler();
        await this.props.getTrack(this.props.match.params.id)
    }

    getNameAlbumHandler = () => {
        this.props.getNameAlbum(this.props.match.params.id)
    };

    getPushTrackHistory = (id) => {
        this.props.trackHistoryPush(id);
    };

    render() {
        if (!this.props.user) {
            return <Redirect to='/login'/>
        } else {
            return this.props.trackThis.artistAlbum && (
                <Container>
                    <div style={{marginTop: '35px'}}>
                        {this.props.trackThis.artistAlbum.titleAlbum &&
                        <h2>{this.props.nameArtist && this.props.nameArtist.executor.nameArtist}-<Badge
                            color="secondary">{this.props.trackThis.artistAlbum.titleAlbum}</Badge></h2>
                        }
                    </div>
                    <hr className="HRColor"/>
                    <ListGroup>
                        {this.props.trackThis.track && this.props.trackThis.track.map(item => (
                            <Alert color="primary" onClick={() => this.getPushTrackHistory(item._id)} key={item._id} className="alerts">
                                <div style={{margin: '0'}}>
                                    <span>{item.number}</span> | <b>{this.props.nameArtist && this.props.nameArtist.executor.nameArtist}-{item.titleTrack}</b> | <span> {item.duration}</span>
                                </div>
                            </Alert>
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