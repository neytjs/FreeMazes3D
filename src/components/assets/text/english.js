let english = {
  menu: {
    title: "<b><i>FreeMazes3D</i></b>",
    version: "Version 0.7.2",
    main: {
      new_game: "New Game",
      controls: "Controls",
      high_scores: "High Scores",
      achievements: "Achievements",
      credits: "Credits",
      exit_game: "Exit Game"
    },
    difficulty: {
      easy: "Easy",
      medium: "Medium",
      hard: "Hard",
      easy_tl: "Easy (Time Limit)",
      medium_tl: "Medium (Time Limit)",
      hard_tl: "Hard (Time Limit)"
    },
    ingame: {
      menu_button: "Menu (F1)",
      score: "Score: ",
      timer: "Time: ",
      inventory_text: "Inventory:"
    },
    exit: {
      difficulty: {
        easy: "Easy",
        medium: "Medium",
        hard: "Hard"
      },
      main: {
        difficulty: {
          part1: "<b>Difficulty:</b> ",
          part2: " (Time Limit)"
        },
        time_remaining: "<b>Time remaining:</b> ",
        time: "<b>Time:</b> ",
        treasure: {
          part1: "<b>Treasure:</b> ",
          part2: " out of ",
          part3: " treasure pieces picked up."
        },
        secret: {
          part1: "<b>Secrets:</b> ",
          part2: " out of ",
          part3: " secrets discovered."
        }
      },
      success: {
        time_limit: {
          part1: "Congratulations, you have earned ",
          part2: " bonus score points for completing the maze within the time limit."
        },
        normal: "Congratulations, you have completed the maze."
      },
      fail: "You have failed to complete the maze in the allotted time. No bonus score awarded. Your score will now also be reset to zero.",
      results_title: "<h1><b><i>Results</i></b></h1>",
      achievement: "<h3>Achievement!</h3><b>",
      return: "Press ESC to return to menu."
    },
    scores: {
      scores_title: "High Scores:",
      header: "<tr><th>Rank</th><th>Score</th><th>Date</th></tr>"
    },
    controls: {
      controls_title: "Key Controls:",
      notice: "Key controls can be changed by editing and saving the config.json file.",
      key_titles: {
        kc_key: "Key",
        kc_action: "Action"
      },
      key_descriptions: {
        kc_movement: "movement",
        kc_activate: "activate environment objects",
        kc_use: "use weapon",
        kc_toggleleft: "toggle left through inventory",
        kc_toggleright: "toggle right through inventory",
        kc_fps: "toggle frames per second",
        kc_esc: "view/close menu"
      },
      keys_esc: "F1/ESC"
    },
    achievements: {
      achievements_title: "Achievements:",
      progress: {
        part1: " Progress: ",
        part2: " of "
      },
      achieves: [
        {
          name: "We Did It",
          description: "Complete one maze of any difficulty."
        },
        {
          name: "Over 9000",
          description: "Complete any maze with a score of over 9000."
        },
        {
          name: "Fast and Somewhat Furious",
          description: "Complete any maze in less than three minutes."
        },
        {
          name: "That Was Easy",
          description: "Complete one regular 'Easy' difficulty maze. And find all of its treasure and secrets."
        },
        {
          name: "Medium, It's Not Easy",
          description: "Complete one regular 'Medium' difficulty maze. And find all of its treasure and secrets."
        },
        {
          name: "Life is Hard",
          description: "Complete one regular 'Hard' difficulty maze. And find all of its treasure and secrets."
        },
        {
          name: "That Was Easy, NOT",
          description: "Complete an 'Easy (Time Limit)' difficulty maze. And find all of its treasure and secrets."
        },
        {
          name: "In The Middle",
          description: "Complete a 'Medium (Time Limit)' difficulty maze. And find all of its treasure and secrets."
        },
        {
          name: "Hard as Hell",
          description: "Complete a 'Hard (Time Limit)' difficulty maze. And find all of its treasure and secrets."
        },
        {
          name: "WHY",
          description: "Solve all puzzles on 'Easy (Time Limit)' difficulty mazes."
        },
        {
          name: "Medium Rare",
          description: "Solve all puzzles on 'Medium (Time Limit)' difficulty mazes."
        },
        {
          name: "You Really Just Did That",
          description: "Solve all puzzles on 'Hard (Time Limit)' difficulty mazes."
        },
        {
          name: "The Completionist",
          description: "Complete all other achievements."
        }
      ]
    },
    credits: {
      credits_title: "Credits:",
      credits_text: `<b><u>Game Development</u>:</b><br>
                All scripting, 3D modeling, textures and game design – neytjs<br>
                <br>
                <b><u>3D Engine</u>:</b><br>
                Babylon.js – the Babylon.js team (thanks guys!)<br>
                <br>
                <b><u>Music (from opengameart.org)</u>:</b><br>
                <i>Night City Lights, Great Pyramids, Life in Forest</i> – Alexandr Zhelanov<br>
                <i>My Friends, It's Love, Good Bye, Little Party, Sea Star, The Golden Mansion</i> – Snabisch<br>
                <i>Caketown</i> – Matthew Pablo<br>
                <i>Virus Hunter Toon Level Music</i> – TyberiusGames<br>
                <i>Sonar Tuning Electro Track</i> – SouljahdeShiva<br>
                <i>Distorted Memory</i> – soled<br>
                <i>Falling Organ</i> – vandalorum<br>
                <i>Roy Batty's Boombox</i> – joeBaxterWebb<br>
                <br>
                <b><u>Sound Effects (from opengameart.org)</u>:</b><br>
                For full sound credits see the sound_music_credits txt file.`
    },
    warn: {
      restart: "Warning, starting a new game will result in losing all progress in the current maze and will reset your score to zero.",
      exit: "Warning, exiting will result in losing all progress in the current maze and will reset your score to zero.",
      okay: "Okay",
      cancel: "Cancel"
    },
    back_text: "BACK",
    loading_text: "Loading...",
    reviving_text: "Reviving..."
  },
  global: {
    door: {
      part1: "You need a ",
      part2: " key to open this door."
    },
    key_found: {
      part1: "You have found a ",
      part2: " key."
    },
    key_types: {
      copper: "copper",
      silver: "silver",
      gold: "gold"
    },
    collect_gem: "You have found a gem that can power the exit portal.",
    forcefield: "You must find a way to remove this force field.",
    gate: "You must select the correct key.",
    portal: {
      find: "You must find a special gem to power this portal.",
      powered: "You have powered the exit portal! Press again to exit.",
      select: "You must select the portal gem."
    },
    treasure: {
      part1: "You have found ",
      part2: " out of ",
      part3: " pieces of treasure."
    },
    secret: {
      part1: "You have found a secret area (",
      part2: " of ",
      part3: ")!"
    },
    success: "You have removed the barrier!",
    fail: "You have failed. Try again."
  },
  items: {
    portal_gem: "Portal Gem",
    keys: {
      copper_key: "Copper Key",
      silver_key: "Silver Key",
      gold_key: "Gold Key"
    },
    puzzles: {
      coins: {
        copper_coin: "Copper Coin",
        silver_coin: "Silver Coin",
        gold_coin: "Gold Coin"
      },
      balls: {
        pink_ball: "Pink Ball",
        blue_ball: "Blue Ball",
        red_ball: "Red Ball",
        purple_ball: "Purple Ball"
      },
      plates: {
        blue: "Blue",
        red: "Red",
        green: "Green"
      },
      powder: " Magic Powder",
      holy_water: "Holy Water",
      potions: {
        red: "Red",
        blue: "Blue",
        green: "Green",
        yellow: "Yellow",
        magic: " Magic Potion"
      },
      purify: {
        fuel_tank: "Fuel Tank",
        gem: "Purification Gem",
        powder: "Purification Powder"
      },
      water_pail: "Water Pail"
    }
  },
  puzzles: {
    ob1: {
      warn: "Seven is the lucky number."
    },
    ob2: {
      hint: "This MUST be a hint..."
    },
    ob4: {
      warn: "You must find a way to access this button."
    },
    ob5: {
      warn: "The ghosts will not allow you to approach any closer."
    },
    ob7: {
      warn: "Three bright beams of light block your path."
    },
    ob8: {
      warn: "You are out of water."
    },
    ob9: {
      warn: "A mysterious force stops you."
    },
    ob13: {
      warn1: "You have already pressed this button.",
      warn2: "That does not go here.",
      remaining: {
        alert1: "Two buttons remaining.",
        alert2: "One button remaining.",
        alert3: "You have clicked all the buttons."
      }
    },
    ob14: {
      warn: "A ghost haunts this sarcophagus.",
      alert: "You have calmed a restless spirit."
    },
    ob15: {
      warn: "Make four perfect shots from the platform."
    },
    ob16: {
      warn: {
        part1: "You have ",
        part2: " seconds."
      }
    },
    ob18: {
      warn: "The button appears to be stuck inside the crystal."
    },
    ob19: {
      warn: "You can not use the portal while carrying a crystal."
    },
    ob20: {
      hint: "Hmm, this must mean something..."
    },
    ob21: {
      warn: "You need more fuel to start the machine.",
      fail: "The machine is powering down."
    },
    ob22: {
      alert: "You have purified the garden!",
      warn1: "You must find something to insert.",
      warn2: "You must first put in fuel.",
      warn3: "You must first fuel the machine.",
      warn4: "You must insert something for the machine to crush."
    },
    ob23: {
      alert: "You have cured the tree."
    },
    ob24: {
      warn: "The wheel is too hot to touch.",
      alert: "You have cooled the metal."
    }
  }
};

export {english};
