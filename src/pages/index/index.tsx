import { Component } from "react";
import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";

import { IThread } from "src/interfaces/thread";
import { ThreadList } from "../../components/thread_list";
import { getLatestTopic } from "../../utils/api";

import "./index.scss";

export default class Index extends Component {
  config = {
    navigationBarTitleText: "首页",
  };

  state = {
    loading: true,
    threads: [],
  };

  componentWillMount() {}

  async componentDidMount() {
    try {
      const res = await Taro.request<IThread[]>({ url: getLatestTopic() });
      this.setState({
        threads: res.data,
        loading: false,
      });
    } catch (error) {
      Taro.showModal({
        title: "载入远程数据错误",
      });
    }
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const { threads, loading } = this.state;
    return (
      <View className="index">
        <ThreadList threads={threads} loading={loading}></ThreadList>
      </View>
    );
  }
}
