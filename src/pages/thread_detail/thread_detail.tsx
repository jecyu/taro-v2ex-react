import { Component } from "react";
import { View } from "@tarojs/components";
import { IThread } from "src/interfaces/thread";
import { IThreadProps, GlobalState } from "../../utils/index";

export interface IState {
  loading: boolean;
  replies: IThread[];
  content: string;
  thread: IThreadProps;
}
export default class ThreadDetail extends Component<{}, IState> {
  state = {
    loading: true,
    replies: [],
    content: "",
    thread: {} as IThreadProps,
  } as IState;
  config = {
    navigationBarTitleText: "话题",
  };

  componentWillUnmount() {
    // console.log("GlobalState ->", GlobalState);
  }

  componentDidMount() {}

  render() {
    return <View>thread detail</View>;
  }
}
