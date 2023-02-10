import { Post } from "./components/Post";
import { Header } from "./components/Header";
import styles from "./App.module.css";
import { Sidebar } from "./components/Sidebar";
import "./global.css";

const posts = [
  {
    id: 1,
    author: {
      avatarUrl: "https://github.com/LuccaMancusi.png",
      name: "Lucca Mancusi",
      role: "Front-end developer",
    },
    content: [
      { type: "paragraph", content: "Fala galeraa 👋" },
      {
        type: "paragraph",
        content:
          "Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no ignite, trilha da Rocketseat. 🚀",
      },
      { type: "link", content: "lucca.design/doctorcare" },
    ],
    publishedAt: new Date("2023/01/01 20:00:00"),
  },
  {
    id: 2,
    author: {
      avatarUrl: "https://github.com/LuccaMancusi.png",
      name: "Lucca Romano",
      role: "Front-end developer",
    },
    content: [
      { type: "paragraph", content: "Fala galeraa 👋" },
      {
        type: "paragraph",
        content:
          "Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no ignite, trilha da Rocketseat. 🚀",
      },
      { type: "link", content: "lucca.design/doctorcare" },
    ],
    publishedAt: new Date("2023/01/01 20:00:00"),
  },
];

function App() {
  return (
    <>
      <Header></Header>
      <div className={styles.wrapper}>
        <Sidebar></Sidebar>

        <main>
          {posts.map((post) => {
            return (
              <Post
                key={post.id}
                author={post.author}
                content={post.content}
                publishedAt={post.publishedAt}
              />
            );
          })}
        </main>
      </div>
    </>
  );
}

export default App;
