import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import styles from "../styles/components/CompletedChallenges.module.css";

export function CompletedChallenges(){
  const {challengeCompleted} = useContext(ChallengesContext)
  return (
    <div className={styles.completedChallengesContainer}>
      <span>Desafio Completos</span>
      <span>{challengeCompleted}</span>
    </div>
  );
}