import { Component } from "react";
import { View, RichText, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";

import { Thread } from "../../components/thread";
import { IThread } from "src/interfaces/thread";
import { getTopics, getReplies } from "../../utils/api";
import { IThreadProps, GlobalState, timeagoInst } from "../../utils/index";
import { Loading } from "../../components/loading";
import "./index.scss";
export interface IState {
  loading: boolean;
  replies: IThread[];
  content: string;
  thread: IThreadProps;
}

// TODO 排查图片请求问题，http-server

function prettyHTML(str) {
  const lines = ["p", "h1", "h2", "h3", "h4", "h5", "h6"];

  lines.forEach((line) => {
    const regex = new RegExp(`<${line}`, "gi");

    str = str.replace(regex, `<${line} class="line"`);
  });

  return str.replace(/<img/gi, '<img class="img"');
}
export default class ThreadDetail extends Component<{}, IState> {
  state = {
    loading: true,
    replies: [],
    content: "",
    thread: GlobalState.thread,
  } as IState;
  config = {
    navigationBarTitleText: "话题",
  };

  async componentDidMount() {
    try {
      const id = GlobalState.thread.tid;
      const [
        { data },
        {
          data: [{ content_rendered }],
        },
      ] = await Promise.all([
        Taro.request({ url: getReplies(id) }),
        Taro.request({
          url: getTopics({
            id,
          }),
        }),
      ]);
      this.setState({
        loading: false,
        replies: data[0]?.data || [],
        content: prettyHTML(content_rendered),
      });
    } catch (err) {
      Taro.showToast({
        title: "载入远程数据错误",
      });
    }
  }

  render() {
    const { thread, loading, content, replies } = this.state;
    const replieEl = replies.map((reply, index) => {
      const time = timeagoInst.format(reply.last_modified * 1000, "zh");
      return (
        <View className="reply" key={reply.id}>
          <Image src="reply.member.avatar_large" className="avatar"></Image>
          <View className="main">
            <View className="author">{reply.member.username}</View>
            <View className="time">{time}</View>
            <RichText nodes={reply.content} className="content"></RichText>
            <View className="floor">{index + 1} 楼</View>
          </View>
        </View>
      );
    });

    const contentEl = loading ? (
      <Loading />
    ) : (
      <View>
        <View className="main-content">
          <RichText nodes={content}></RichText>
        </View>
        <View className="replies">{replieEl}</View>
      </View>
    );

    return (
      <View className="detail">
        <Thread
          node={thread.node}
          title={thread.title}
          last_modified={thread.last_modified}
          replies={thread.replies}
          tid={thread.id}
          member={thread.member}
          not_navi={true}
        />
        {contentEl}
      </View>
    );
  }
}
