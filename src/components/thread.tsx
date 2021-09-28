import { Component } from "react";
import Taro, { eventCenter } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";

import { IMember } from "../interfaces/member";
import { INode } from "../interfaces/node";
import { timeagoInst, Thread_DETAIL_NAVIGATE } from "../utils";
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
}

class Thread extends Component<IProps> {
  handleNavigate = () => {
    const { tid, not_navi } = this.props;
    if (not_navi) {
      return;
    }
    // 数据传递
    // eventCenter.trigger(Thread_DETAIL_NAVIGATE, this.props);
    // 跳转到帖子详情
    Taro.navigateTo({
      url: "/pages/thread_detail/thread_detail",
    });
  };

  render() {
    const { title, member, node, replies, last_modified, not_navi } =
      this.props;
    // const time = timeagoInst.format(last_modified * 1000, "zh");
    // console.log("time ->", time);
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
              <Text className="mr10">{last_modified}</Text>
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

export { Thread };
