import React from "react";
import axios from "axios";
import Story from "../Componets/Story";
import CircularProgress from "@material-ui/core/CircularProgress";
import "../CSS/Comments.css";
class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      kids: props.kids,
      Id: props.Id,
      kidsComments: [],
    };
  }
  componentDidMount = () => {
    console.log("ComponentDidMount");

    this.getTopComments(this.props.kids);
    console.log("got All Comments");
  };
  getTopComments = async (kids) => {
    await this.setState({ kidsComments: [] });
    kids.forEach((element) => {
      this.getComments(element);
    });
  };
  componentDidUpdate = async (newProps, oldProps) => {
    // console.log(newProps, oldProps, this.props);
    // if (this.props.Id !== oldProps.Id) {
    //   // alert("child changed");
    //   // console.log(this.props);
    //   await this.setState({ kidsComments: [] });
    //   await this.getTopComments(this.props.kids);
    // }
  };
  getComments = (ID) => {
    console.log(ID);
    axios
      .get(`https://hacker-news.firebaseio.com/v0/item/${ID}.json`)
      .then((res) => {
        // console.log(res);
        this.setState(
          { kidsComments: [...this.state.kidsComments, res.data] },
          () => console.log(this.state.kidsComments)
        );
      })
      .then((res) => {
        // console.log("data captured over");
        // console.log(res);
      })
      .catch((err) => console.log(err));
  };
  render() {
    return (
      <div>
        {" "}
        <div className="modal" id="myModal">
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              {/* Modal Header */}
              <div className="modal-header">
                <h4 className="modal-title">Comments</h4>
                <button
                  type="button"
                  className="close"
                  onClick={() => this.props.CloseModal("myModal")}
                >
                  ×
                </button>
              </div>
              {/* Modal body */}
              <div
                className="modal-body"
                style={{ maxHeight: "50vh", overflowY: "auto" }}
              >
                <ul>
                  {this.state.kidsComments.length > 0 ? (
                    this.state.kidsComments.map((element, index) => {
                      return (
                        <Story
                          items={element}
                          setSelectedKids={this.props.setSelectedKids}
                          OpenModal={this.props.OpenModal}
                        />
                      );
                    })
                  ) : (
                    <>
                      <CircularProgress size={40} /> Loading....
                    </>
                  )}
                </ul>
              </div>
              {/* Modal footer */}
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  //   data-dismiss="modal"
                  onClick={() => this.props.CloseModal("myModal")}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Comments;
