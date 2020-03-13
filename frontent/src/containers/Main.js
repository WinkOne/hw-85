import React, {Component} from 'react';
import {Button, Card, CardBody, CardImg, CardTitle, Container} from "reactstrap";
import {connect} from "react-redux";
import {getArtist} from "../store/action";

class Main extends Component {

    componentDidMount(): void {
        this.props.getArtist()
    }

    routerHandler = (id) => {
        this.props.history.push('/' + id)
    };

    render() {
        return (
          <Container>
              <h1>Artists</h1>
              <hr/>
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                {this.props.artistThis && this.props.artistThis.map(item => (
                    <Card key={item._id} style={{width: '30%', margin: '10px'}}>
                        <CardImg style={{width: '100%', height: "250px"}} top width="100%" src={'http://localhost:8001/uploads/' + item.imageArtist} alt="Card image cap" />
                        <CardBody>
                            <CardTitle><h2>{item.nameArtist}</h2></CardTitle>
                        </CardBody>
                        <Button onClick={() => this.routerHandler(item._id)}>Watch artist</Button>
                    </Card>
                ))}
            </div>
          </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        artistThis: state.artist
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getArtist: () => dispatch(getArtist())
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Main);