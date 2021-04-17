function GUI_Score(score_increase, score) {
  score.total = score.total + score_increase;
  document.getElementById("score").innerHTML = "Score: " + score.total.toLocaleString('en-US', {minimumFractionDigits: 0});
}

export {GUI_Score};
