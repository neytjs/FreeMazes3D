function GUI_DisplayAchievements(achievements, global_language) {
  let text = "";
  let completionist_counter = 0;
  for (let i = 0, length = achievements.length; i < length; i++) {
    if (achievements[i].completed && (i < (achievements.length - 1))) {
      completionist_counter = completionist_counter + 1;
    }
    if (achievements[i].id === 13) {
      achievements[i].status.completed = completionist_counter;
      achievements[i].status.total = achievements.length - 1;
    }
    if (i === 0 || i === 3 || i === 6 || i === 9 || i === 12) {
      text += '<tr rowspan="3">';
    }
    let achieved = achievements[i].completed ? '<td class="achieved">' : '<td class="not_achieved">';
    let bottom = achievements[i].completed ? '' : '<br><br>';
    if (achievements[i].status) {
      let status_completed = (achievements[i].id === 13) ? achievements[i].status.completed : Object.keys(achievements[i].status.completed).length;
      text += achieved + "<b>" + global_language.text.menu.achievements.achieves[i].name + "</b><br><i>" + global_language.text.menu.achievements.achieves[i].description + "</i><br>" + global_language.text.menu.achievements.progress.part1 + status_completed + global_language.text.menu.achievements.progress.part2 +  achievements[i].status.total + ".<br>" + (achievements[i].date_accomplished !== 0 ? ("<br>" + achievements[i].date_accomplished.toLocaleDateString("en-US", {year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric"})) : "<br>") + bottom + "</td>";
    } else {
      text += achieved + "<b>" + global_language.text.menu.achievements.achieves[i].name + "</b><br><i>" + global_language.text.menu.achievements.achieves[i].description + "</i><br>" + (achievements[i].date_accomplished !== 0 ? ("<br>" + achievements[i].date_accomplished.toLocaleDateString("en-US", {year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric"})) : "") + bottom + "</td>";
    }
  }
  document.getElementById("achieves_list").innerHTML = text;
}

export {GUI_DisplayAchievements};
