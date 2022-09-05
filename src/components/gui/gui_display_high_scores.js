function GUI_DisplayHighScores(high_scores, global_language) {
  high_scores.sort(function(a, b) {
    if (a.score < b.score) {
      return 1;
    }
    if (b.score < a.score) {
      return -1;
    }
  });

  const max = 15;
  if (high_scores.length > max) {
    high_scores.splice(max, (high_scores.length - max));
  }

  let scores = global_language.text.menu.scores.header;
  for (let i = 0, length = high_scores.length; i < length; i++) {
    scores += "<tr><td>"+ (i + 1) +"</td><td>" + high_scores[i].score.toLocaleString('en-US', {minimumFractionDigits: 0}) + "</td><td>" + high_scores[i].date.toLocaleDateString("en-US", {year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric"}) + "</td></tr>";
  }
  document.getElementById("scores_list").innerHTML = scores;
}

export {GUI_DisplayHighScores};
