import { ThumbsUp, Trash } from "phosphor-react";
import { Avatar } from "./Avatar";
import styles from "./Comment.module.css";
import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { useState } from "react";

interface CommentProps {
  content: string;
  date: Date;
  onDeleteComment: (content: string) => void;
}

export function Comment({ content, date, onDeleteComment }: CommentProps) {
  const [likeCount, setLikeCount] = useState(0);

  const dateFormated = format(date, "dd 'de' MMMM 'às' HH:mm'h' ", {
    locale: ptBR,
  });

  const dateRelativeToNow = formatDistanceToNow(date, {
    locale: ptBR,
    addSuffix: true,
  });

  function handleDeleteComment() {
    onDeleteComment(content);
  }

  function handleAddLike() {
    setLikeCount((state) => {
      return state + 1;
    });
  }

  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="https://github.com/LuccaMancusi.png" />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Lucca Mancusi</strong>
              <time title={dateFormated} dateTime={dateFormated}>
                {dateRelativeToNow}
              </time>
            </div>
            <button onClick={handleDeleteComment} title="Deletar comentário">
              <Trash size={24}></Trash>
            </button>
          </header>
          <p>{content}</p>
        </div>
        <footer>
          <button onClick={handleAddLike}>
            <ThumbsUp></ThumbsUp>
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
