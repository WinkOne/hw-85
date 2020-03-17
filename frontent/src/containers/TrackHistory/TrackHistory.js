import React, {Component} from 'react';
import '../../App.css'
import {connect} from "react-redux";
import {getTrackHistory} from "../../store/action/trackHistoryActions";
import {Container} from "reactstrap";
import moment from "moment";


class TrackHistory extends Component {
    componentDidMount(): void {
        this.props.getTrackHistory()
    }

    render() {
        return (
           <Container>
               <div>
                   <h1>Track History</h1>
                   <hr className="HRColor"/>
                    <div>
                        {this.props.trackHistory && this.props.trackHistory.map(item => (
                            <div key={item._id} className="alert alert-dark">
                                <div style={{margin: '0'}}>
                                    <span>{item.track.number}</span> | <b>{item.track.album.executor.nameArtist}</b>-<b>{item.track.titleTrack}</b> | <span> {moment(item.datetime).format('MMMM Do YYYY, h:mm:ss a')}</span>
                                </div>
                            </div>
                        ))}
                    </div>
               </div>
           </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        trackHistory: state.trackHistoryReducers.trackHistory
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getTrackHistory: () => dispatch(getTrackHistory())
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(TrackHistory);