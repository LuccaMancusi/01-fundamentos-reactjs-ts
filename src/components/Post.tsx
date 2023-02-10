import { Avatar } from "./Avatar";
import { Comment } from "./Comment";
import styles from "./Post.module.css";
import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface Author {
  avatarUrl: string;
  name: string;
  role: string;
}

interface Content {
  type: string;
  content: string;
}

interface PostProps {
  author: Author;
  content: Content[];
  publishedAt: Date;
}

interface Comment {
  content: string;
  date: Date;
}

function Post({ author, content, publishedAt }: PostProps) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);

  const [num, setNum] = useState("teste");

  function handleAddComment(event: FormEvent) {
    event.preventDefault();
    const date = new Date();
    const commentObject = { content: comment, date };
    setComments([...comments, commentObject]);
    setComment("");
  }

  function handleCommentText(e: ChangeEvent<HTMLTextAreaElement>) {
    setComment(e.target.value);
  }

  function deleteComment(commentToBeDeleted: string) {
    const commentsWithoutDeletedOne = comments.filter((comment) => {
      return commentToBeDeleted !== comment.content;
    });
    setComments(commentsWithoutDeletedOne);
  }

  const publishedAtFormated = format(
    publishedAt,
    "dd 'de' MMMM 'às' HH:mm'h' ",
    {
      locale: ptBR,
    }
  );

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  const isCommentEmpty = comment === "";

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time title={publishedAtFormated} dateTime={publishedAt.toISOString()}>
          {publishedDateRelativeToNow}
        </time>
      </header>
      <div className={styles.content}>
        {content.map((line) => {
          if (line.type === "paragraph") {
            return <p key={line.content}>{line.content}</p>;
          } else if (line.type === "link") {
            return (
              <p key={line.content}>
                <a href="#">{line.content}</a>
              </p>
            );
          }
        })}
      </div>
      <form onSubmit={handleAddComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
        <textarea
          value={comment}
          onChange={handleCommentText}
          placeholder="Deixe um comentário"
        />
        <footer>
          <button disabled={isCommentEmpty} type="submit">
            Publicar
          </button>
        </footer>
      </form>
      <div className={styles.commentList}>
        {comments.map((comment) => {
          return (
            <Comment
              onDeleteComment={deleteComment}
              key={comment.content}
              content={comment.content}
              date={comment.date}
            />
          );
        })}
      </div>
    </article>
  );
}

export { Post };
