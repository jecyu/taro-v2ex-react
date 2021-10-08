// 获取节点
// 所有的节点
// const ALL_NODE = "nodes/all.json";
// // 获取节点信息
// // 节点id :id 节点名 :name
// const NODE_INFO = "nodes/show.json";

// // 获取主题
// // 取最新的主题
// const LATEST_TOPIC = "topics/latest.json";
// // 获取热议主题
// const HOT_TOPIC = "topics/hot.json";
// // 获取主题信息  :id | (:username | :node_id | :node_name)
// const GET_TOPICS = "topics/show.json";

// // 获取回复 :topic_id (:page , :page_size)?
// const GET_REPLIES = "replies/show.json";

// // 获取用户信息
// const GET_USERINFO = "members/show.json";

// baseURL: "https://www.v2ex.com/api/",
const baseURL = "http://localhost:3000/";
export function getLatestTopic(): string {
  // return `${baseURL}topics/latest.json`;
  return `${baseURL}topics-latest`;
}

export function getReplies(id: string): string {
  // return `${baseURL}replies/show.json?topic_id=${id}`;
  return `${baseURL}replies-show?topic_id=${id}`;
}
// 获取详细帖子信息  :id | (:username | :node_id | :node_name)
export function getTopics({ id }: { id: string }): string {
  // return `${baseURL}topics/show.json?id=${id}`;
  return `${baseURL}topics-show?id=${id}`;
}
export function getDiscuss(id: Number): string {
  return `${baseURL}replies/show.json?topic_id=${id}`;
}
export function getHotThreads(): string {
  return `${baseURL}topics/hot.json`;
}
export function getNodeList(): string {
  return `${baseURL}nodes/all.json`;
}
export function getNodeDetail(id: Number): string {
  return `${baseURL}nodes/show.json?id=${id}`;
}
export function getUserProfile(id: Number): string {
  return `${baseURL}members/show.json?id=${id}`;
}
export function getNodeThreadList(id: Number): string {
  return `${baseURL}topics/show.json?node_id=${id}`;
}
export function getUserThreadList(name: string): string {
  return `${baseURL}topics/show.json?username=${name}`;
}
