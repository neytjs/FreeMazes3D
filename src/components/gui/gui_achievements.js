import {playSound} from "../assets/playSound.js";

function calcAchievements(achievements, scene, score, map_size, timer, treasure_stats, secret_data, puzzles, app_data) {
  let achieved = [];
  let completionist_counter = 0;
  function setAchieved(achievement) {
    achievement.completed = true;
    achievement.date_accomplished = new Date();
    achieved.push(achievement);
  }
  for (let i = 0, length = achievements.length; i < length; i++) {
  // check for We Did It
    if (achievements[i].id === 1 && achievements[i].completed === false) {
      setAchieved(achievements[i]);
    }
  // check for Over 9000
    if (achievements[i].id === 2 && achievements[i].completed === false) {
      if (score.total > 9000) {
        setAchieved(achievements[i]);
      }
    }
  // check for Fast and Somewhat Furious
    if (achievements[i].id === 3 && achievements[i].completed === false) {
      let completed = false;
      if (map_size.type === "no" && timer.counter < 180) {
        completed = true;
      }
      if (map_size.type === "tl" && timer.counter > (timer.max_time - 180)) {
        completed = true;
      }
      if (completed) {
        setAchieved(achievements[i]);
      }
    }
  // check for That Was Easy
    if (achievements[i].id === 4 && achievements[i].completed === false) {
      if (map_size.type === "no" && map_size.size === "small") {
        if (treasure_stats.treasure_counter === treasure_stats.treasure_total && secret_data.counter === secret_data.total) {
          setAchieved(achievements[i]);
        }
      }
    }
  // check for Medium, It's Not Easy
    if (achievements[i].id === 5 && achievements[i].completed === false) {
      if (map_size.type === "no" && map_size.size === "medium") {
        if (treasure_stats.treasure_counter === treasure_stats.treasure_total && secret_data.counter === secret_data.total) {
          setAchieved(achievements[i]);
        }
      }
    }
  // check for Life is Hard
    if (achievements[i].id === 6 && achievements[i].completed === false) {
      if (map_size.type === "no" && map_size.size === "large") {
        if (treasure_stats.treasure_counter === treasure_stats.treasure_total && secret_data.counter === secret_data.total) {
          setAchieved(achievements[i]);
        }
      }
    }
  // check for That Was Easy, NOT
    if (achievements[i].id === 7 && achievements[i].completed === false) {
      if (map_size.type === "tl" && map_size.size === "small") {
        if (treasure_stats.treasure_counter === treasure_stats.treasure_total && secret_data.counter === secret_data.total) {
          setAchieved(achievements[i]);
        }
      }
    }
  // check for In The Middle
    if (achievements[i].id === 8 && achievements[i].completed === false) {
      if (map_size.type === "tl" && map_size.size === "medium") {
        if (treasure_stats.treasure_counter === treasure_stats.treasure_total && secret_data.counter === secret_data.total) {
          setAchieved(achievements[i]);
        }
      }
    }
  // check for Hard as Hell
    if (achievements[i].id === 9 && achievements[i].completed === false) {
      if (map_size.type === "tl" && map_size.size === "large") {
        if (treasure_stats.treasure_counter === treasure_stats.treasure_total && secret_data.counter === secret_data.total) {
          setAchieved(achievements[i]);
        }
      }
    }
  // check for WHY
    if (achievements[i].id === 10 && achievements[i].completed === false) {
      if (map_size.type === "tl" && map_size.size === "small") {
        for (let j = 0, jlength = puzzles.length; j < jlength; j++) {
          achievements[i].status.completed[puzzles[j]] = "";
        }
        if (Object.keys(achievements[i].status.completed).length === achievements[i].status.total) {
          setAchieved(achievements[i]);
        }
      }
    }
  // check for Medium Rare
    if (achievements[i].id === 11 && achievements[i].completed === false) {
      if (map_size.type === "tl" && map_size.size === "medium") {
        for (let j = 0, jlength = puzzles.length; j < jlength; j++) {
          achievements[i].status.completed[puzzles[j]] = "";
        }
        if (Object.keys(achievements[i].status.completed).length === achievements[i].status.total) {
          setAchieved(achievements[i]);
        }
      }
    }
  // check for You Really Just Did That
    if (achievements[i].id === 12 && achievements[i].completed === false) {
      if (map_size.type === "tl" && map_size.size === "large") {
        for (let j = 0, jlength = puzzles.length; j < jlength; j++) {
          achievements[i].status.completed[puzzles[j]] = "";
        }
        if (Object.keys(achievements[i].status.completed).length === achievements[i].status.total) {
          setAchieved(achievements[i]);
        }
      }
    }
  }
// check for The Completionist
  for (let i = 0, length = achievements.length; i < length; i++) {
    if (achievements[i].completed && (i < (achievements.length - 1))) {
      completionist_counter = completionist_counter + 1;
    }
    if (achievements[i].id === 13 && achievements[i].completed === false) {
      if (completionist_counter === (achievements.length - 1)) {
        setAchieved(achievements[i]);
      }
    }
  }
// long term persist the data
  app_data.update({}, {$set:{achievements: achievements}});

  return achieved;
}

function GUI_ShowAchievements(achievements, scene, score, map_size, timer, treasure_stats, secret_data, puzzles, app_data) {
  let achieved = calcAchievements(achievements, scene, score, map_size, timer, treasure_stats, secret_data, puzzles, app_data);
  if (achieved.length > 0) {
    let counter = 0;
    function iterateAchievements() {
      let text = "";
      for (let i = 0, length = achievements.length; i < length; i++) {
        if (achievements[i].id === achieved[counter].id) {
          if (achievements[i].status) {
            let status_completed = (achievements[i].id === 13) ? achievements[i].status.completed : Object.keys(achievements[i].status.completed).length;
            text += "<h3>Achievement!</h3><b>" + achievements[i].name + "</b><br><i>" + achievements[i].description + "</i><br> Progress: " + status_completed + " of " +  achievements[i].status.total + ".<b>" + (achievements[i].date_accomplished !== 0 ? ("<br>" + achievements[i].date_accomplished.toLocaleDateString("en-US", {year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric"})) : "");
          } else {
            text += "<h3>Achievement!</h3><b>" + achievements[i].name + "</b><br><i>" + achievements[i].description + "</i><br>" + (achievements[i].date_accomplished !== 0 ? ("<br>" + achievements[i].date_accomplished.toLocaleDateString("en-US", {year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric"})) : "");
          }
          break;
        }
      }
      playSound("magnet_action", 2400, scene);
      document.getElementById("achiev1").style.left = "25%";
      document.getElementById("achiev1").innerHTML = text;
      counter = counter + 1;

      if (counter < achieved.length) {
        setTimeout(() => {
          document.getElementById("achiev1").style.left = -10000;
          iterateAchievements();
        }, 3000);
      } else {
        setTimeout(() => {
          document.getElementById("achiev1").style.left = -10000;
        }, 3000);
      }
    }
    setTimeout(() => {
      iterateAchievements();
    }, 1200);
  }
}

export {GUI_ShowAchievements};
