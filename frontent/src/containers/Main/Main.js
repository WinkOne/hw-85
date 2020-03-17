import React, {Component} from 'react';
import '../../App.css'
import './Main.css'
import {Card, Container, Media} from "reactstrap";
import {connect} from "react-redux";
import {getArtist} from "../../store/action/action";

class Main extends Component {
componentDidMount(): void {
    this.props.getArtist()
}

routerHandler = (id) => {
    this.props.history.push('/albums/' + id)
};

render() {
    return (
        <>
            <Container>
                <div className="headerBlockTitle">
                    <h1>Artists</h1>
                </div>
                <hr className="HRColor"/>
                <div className="blockWindow">
                    {this.props.artistThis && this.props.artistThis.map(item => (
                        <Card
                            onClick={() => this.routerHandler(item._id)}
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
                                           src={'http://localhost:5555/uploads/' + item.imageArtist}
                                           alt="Generic placeholder image"/>
                                </Media>
                                <Media body style={{margin: "0 3%"}}>
                                    <Media heading>
                                        {item.nameArtist}
                                    </Media>
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
        artistThis: state.reducer.artist
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getArtist: () => dispatch(getArtist())
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Main);