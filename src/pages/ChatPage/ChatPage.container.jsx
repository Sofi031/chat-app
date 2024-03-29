import "./ChatPage.styles.scss";

import { Message as MessageModel } from "../../models/Message";
import { useUser } from "../../contexts/UserContext";
import { useState } from "react";
import { useEffect } from "react";
import { ChatPage as Component } from "./ChatPage.component";

export function ChatPage() {
  const { user } = useUser();
  const [state, setState] = useState([]);
  const [drone, setDrone] = useState(null);
  const [error, setError] = useState(null);
  const [joinedRoom, setJoinedRoom] = useState(false);
  

  const sendMessage = (formState) => {
    const message = new MessageModel({
      messageText: formState.message,
      user,
    });

    if (drone !== null) {
      drone.publish({
        room: `${user.genre}`,
        message: message
      });
    }
  }

  useEffect(() => {
    if (drone !== null) return;
    setDrone(new window.Scaledrone('0qmn0gapd5CMKKeM'));
  }, [drone, setDrone]);
  
  useEffect(() => {
    if (drone === null) return;

    const room = drone.subscribe(`${user.genre}`);

    room.on('open', error => {
      if (error) {
        return setError(error);
      }
      setJoinedRoom(true);
    });
  
    room.on('message', message => {
      console.log('Message received', message.data);
      

      setState((state) => [
        ...state,
        MessageModel.fromObject({ ...message.data, id: message.id })
      ]);
    });
  }, [drone,user]);

  return (
    <Component
      messages={state}
      onSendMessage={sendMessage}
      error={error}
      joinedRoom={joinedRoom}
      genre={user.genre}
    />
  );
}