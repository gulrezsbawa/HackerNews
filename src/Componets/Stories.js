import axios from "axios";

import React, { Component } from "react";
import Story from "../Componets/Story";
import Comments from "./Comments";
import "../CSS/Stories.css";
const $ = require("jquery");
export class Stories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storiesRes: [],
      topStoriesRes: [],
      selectedKids: [],
      selectedId: 0,
    };
  }
  setSelectedKids = (selectedKids, id, name) => {
    this.setState({ selectedKids, selectedId: id }, () => {
      this.OpenModal(name);
    });
  };
  componentDidMount = async () => {
    console.log("ComponentDidMount");
    await this.getTopStories();
    console.log("got All Stories");
    // this.getMaxStoryID();
  };

  getTopStories = async () => {
    axios
      .get("https://hacker-news.firebaseio.com/v0/topstories.json")
      .then((res) => {
        console.log(res.data.length);
        let topRes = res.data.slice(0, 10);
        let length = topRes.length;
        topRes.forEach((element, index) => {
          this.getStoryDetails(element, index, length);
        });
      })
      .then((res) => {
        console.log("data captured over");
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  getMaxStoryID = () => {
    axios
      .get("https://hacker-news.firebaseio.com/v0/maxitem.json")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  getStoryDetails = (ID, index, length) => {
    axios
      .get(`https://hacker-news.firebaseio.com/v0/item/${ID}.json`)
      .then((res) => {
        // let dataRet = res.data;
        // let childs = res.data.children.slice(0, 20);
        this.setState(
          {
            storiesRes: [...this.state.storiesRes, res.data],
          },
          () => {
            // console.log(this.state.storiesRes);
            if (index === length - 1) {
              //console.log("Getting of data is finished");
              this.setState(
                {
                  topStoriesRes: this.state.storiesRes
                    .sort((a, b) => b.score - a.score)
                    .slice(0, 10),
                },
                () => {
                  // console.log(this.state.topStoriesRes);
                }
              );
            }
          }
        );
      })
      .catch((err) => console.log(err));
  };
  OpenModal = (name) => {
    $("#" + name).modal({
      show: true,
      backdrop: "static",
      keyboard: false,
    });
  };
  CloseModal = (name) => {
    $("#" + name).modal("hide");
    this.setState({ selectedKids: [] });
  };
  render() {
    return (
      <div className="TopPlaceholder">
        <div className="TopPlaceholderLabel">HACKER NEWS API</div>
        <div className="TopPlaceholderLabel">TOP STORIES</div>
        {this.state.topStoriesRes.length > 0
          ? this.state.topStoriesRes.map((items) => {
              return (
                <Story
                  items={items}
                  setSelectedKids={this.setSelectedKids}
                  OpenModal={this.OpenModal}
                />
              );
            })
          : null}
        {this.state.selectedKids.length > 0 ? (
          <Comments
            kids={this.state.selectedKids}
            Id={this.state.selectedId}
            setSelectedKids={this.setSelectedKids}
            OpenModal={this.OpenModal}
            CloseModal={this.CloseModal}
          />
        ) : null}
      </div>
    );
  }
}

export default Stories;
