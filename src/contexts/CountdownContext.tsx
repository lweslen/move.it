import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdwonContextData {
  minutes: number;
  seconds: number;
  hasFinish: boolean;
  isActive: boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
}

interface CountdwonProviderProps {
  children: ReactNode;
}

export const CountdownContext = createContext({} as CountdwonContextData);

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({children}:CountdwonProviderProps){
  const { startNewChallenge } = useContext(ChallengesContext)

  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinish, setHasFinish] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function startCountdown(){
    setIsActive(true);
  }

  function resetCountdown(){
    clearTimeout(countdownTimeout)
    setIsActive(false);
    setHasFinish(false);
    setTime(25 * 60);
  }

  useEffect(() => {
    if(isActive && time > 0){
      countdownTimeout = setTimeout(() => {
        setTime(time - 1)
      }, 1000)
    } else if(isActive && time == 0){
      setHasFinish(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time]);

  return (
    <CountdownContext.Provider 
      value={{
        minutes,
        seconds,
        hasFinish,
        isActive,
        startCountdown,
        resetCountdown
      }}
    >
      {children}
    </CountdownContext.Provider>
  );
}