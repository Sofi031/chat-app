import "./JoinPage.styles.scss";

import { JoinForm } from "../../components/JoinForm";
import { useUser } from "../../contexts/UserContext";

export function JoinPage(props) {
  const { setUser } = useUser();

  const joinWithUser = (formState) => {
    setUser({
      displayName: formState.displayName,
      genre:formState.genre,  
    });
  }

  return (
    <div className="join-page">
      <div className="join-page__title">
        Chat about music
      </div>
      <div className="join-page__form">
        <JoinForm onJoin={joinWithUser} />
      </div>
    </div>
  );
}