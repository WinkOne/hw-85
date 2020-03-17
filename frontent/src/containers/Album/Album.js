import React, {Component} from 'react';
import '../../App.css'
import {Card, Container, Media} from "reactstrap";
import {getAlbum} from "../../store/action/action";
import {connect} from "react-redux";


class Album extends Component {

componentDidMount(): void {
    this.props.getAlbum(this.props.match.params.id);
}

watchAlbumHandler = (id) => {
    this.props.history.push('/track/' + id)
};

render() {
    return (
        <>
            <Container>
                <div style={{marginTop: '30px'}}>
                    <h1>Albums</h1>
                </div>
                <hr className="HRColor"/>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap'
                }}
                >
                    {this.props.albumThis && this.props.albumThis.map(item => (
                        <Card
                            onClick={() => this.watchAlbumHandler(item._id)}
                            inverse
                            key={item._id}
                            style={{
                                width: '48%',
                                margin: '10px',
                                borderColor: '#333',
                                backgroundColor: '#333'
                            }}
                        >
                            <Media>
                                <Media left href="#">
                                    <Media style={{
                                        width: '200px',
                                        height: '180px'
                                    }}
                                           object
                                           src={'http://localhost:5555/uploads/' + item.imageCover}
                                           alt="Generic placeholder image"/>
                                </Media>
                                <Media body style={{margin: "0 3%"}}>
                                    <Media heading>
                                        {item.titleAlbum}
                                    </Media>
                                    Year: {item.yearOfIssueAlbum}
                                </Media>
                            </Media>
                        </Card>
                    ))}
                </div>
            </Container>
        </>
    )}
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