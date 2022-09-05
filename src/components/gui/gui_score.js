function GUI_Score(score_increase, score, global_language) {
  score.total = score.total + score_increase;
  document.getElementById("score").innerHTML = global_language.text.menu.ingame.score + score.total.toLocaleString('en-US', {minimumFractionDigits: 0});
}

export {GUI_Score};
