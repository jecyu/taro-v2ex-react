import { Component } from "react";
import { View } from "@tarojs/components";
import { Thread } from "./thread";
import { Loading } from "./loading";

import "./thread.scss";

export interface ThreadP {
  id: number;
  node: {
    title: string;
  };
  title: string;
  last_modified: number;
  replies: number;
  member: { username: string; avatar_large: string };
}

export interface ThreadListProps {
  loading: boolean;
  threads: ThreadP[];
}

class ThreadList extends Component<ThreadListProps> {
  static defaultProps = {
    threads: [],
    loading: true,
  };

  render() {
    const { loading, threads } = this.props;

    if (loading) {
      return <Loading />;
    }

    const element = threads.map((thread) => {
      return (
        <Thread
          key={thread.id}
          node={thread.node}
          title={thread.title}
          last_modified={thread.last_modified}
          replies={thread.replies}
          tid={thread.id}
          member={thread.member}
        ></Thread>
      );
    });

    return <View className="thread-list">{element}</View>;
  }
}

export { ThreadList };
