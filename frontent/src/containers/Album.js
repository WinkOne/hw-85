import React, {Component} from 'react';
import {Button, Card, CardBody, CardImg, CardSubtitle, CardTitle, Container} from "reactstrap";
import {getAlbum} from "../store/action";
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
            <Container>
                <h1>Albums</h1>
                <hr/>
                <div style={{display: 'flex', flexWrap: 'wrap'}}>
                    {this.props.albumThis && this.props.albumThis.map(item => (
                        <Card key={item._id} style={{width: '30%', margin: '10px'}}>
                            <CardImg style={{width: '100%', height: "250px"}} top width="100%" src={'http://localhost:8001/uploads/' + item.imageCover} alt="Card image cap" />
                            <CardBody>
                                <CardTitle><h2>{item.titleAlbum}</h2></CardTitle>
                                <CardSubtitle>Year: {item.yearOfIssueAlbum}</CardSubtitle>
                            </CardBody>
                            <Button onClick={() => this.watchAlbumHandler(item._id)}>Watch album</Button>
                        </Card>
                    ))}
                </div>

            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        albumThis: state.album
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getAlbum: (id) => dispatch(getAlbum(id))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Album);