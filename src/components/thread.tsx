import { Component } from "react";
import { connect } from "react-redux";
import Taro, { eventCenter } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";

import { IMember } from "../interfaces/member";
import { INode } from "../interfaces/node";
import { IThread } from "../interfaces/thread";
import { Thread_DETAIL_NAVIGATE, timeagoInst } from "../utils/index";
import "./thread.scss";

interface IProps {
  title: string;
  member: IMember;
  node: INode;
  last_modified: number;
  tid: number;
  replies: number;
  key?: number;
  not_navi?: boolean; // 不导航到 detail
  setThread: (thread: IProps) => {};
}

class Thread extends Component<IProps, {}> {
  handleNavigate = () => {
    const { tid, not_navi } = this.props;
    if (not_navi) {
      return;
    }
    // eventCenter.trigger(Thread_DETAIL_NAVIGATE, this.props);
    this.props.setThread(this.props);
    // 跳转到帖子详情
    Taro.navigateTo({
      url: "/pages/thread_detail/thread_detail",
    });
  };

  render() {
    const { title, member, node, replies, last_modified, not_navi } =
      this.props;
    const time = timeagoInst.format(last_modified * 1000, "zh");
    const usernameCls = `author ${not_navi ? "bold" : ""}`;
    return (
      <View className="thread" onClick={this.handleNavigate}>
        <View className="info">
          <View>
            <Image src={member.avatar_large} className="avatar"></Image>
          </View>
          <View className="middle">
            <View className={usernameCls}>{member.username}</View>
            <View className="replies">
              <Text className="mr10">{time}</Text>
              <Text>评论 {replies}</Text>
            </View>
          </View>
          <View className="node">
            <Text className="tag">{node.title}</Text>
          </View>
        </View>
        <Text className="title">{title}</Text>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setThread: (thread) => dispatch({ type: "SET_CURRENT_THREAD", thread }),
  };
};

export default connect(null, mapDispatchToProps)(Thread);
