import React from "react";
import home_styles from "./Home.module.css";

import { Component } from "react";
import { Link } from "react-router-dom";

function ScrollUpButton() {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button className={home_styles.scroll_button_up} onClick={handleClick}>
      &#x25B2;
    </button>
  );
}

function ScrollDownButton() {
  const handleClick = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  return (
    <button className={home_styles.scroll_button_down} onClick={handleClick}>
      &#x25BC;
    </button>
  );
}

export default class Home extends Component {
  render() {
    return (
      <body>
        <h1 className={home_styles.header1}>ORFEUS</h1>
        <div>
          <ScrollDownButton />
        </div>

        <div className={home_styles.home_page_a}>
          <div className={home_styles.container}>
            <h2 className={home_styles.title}>
              <span
                className={`${home_styles.title_word} ${home_styles.title_word_1}`}
              >
                Web{" "}
              </span>
              <span
                className={`${home_styles.title_word} ${home_styles.title_word_2}`}
              >
                based{" "}
              </span>
              <span
                className={`${home_styles.title_word} ${home_styles.title_word_3}`}
              >
                music{" "}
              </span>
              <span
                className={`${home_styles.title_word} ${home_styles.title_word_4}`}
              >
                generation
              </span>
            </h2>
          </div>
        </div>
        <div>
          <ScrollUpButton />
        </div>
        <div className={home_styles.music_container}>
          <div className={home_styles.music_bars}>
            <div className={home_styles.music_bar}></div>
            <div className={home_styles.music_bar}></div>
            <div className={home_styles.music_bar}></div>
            <div className={home_styles.music_bar}></div>
            <div className={home_styles.music_bar}></div>
            <div className={home_styles.music_bar}></div>
            <div className={home_styles.music_bar}></div>
            <div className={home_styles.music_bar}></div>
          </div>
        </div>
        <br></br>
        <div className={home_styles.home_page_2}>
          <text className={home_styles.generate_music_text}>
            Generate New Music With Machine Learning
            <div className={home_styles.step1}>Create an Account</div>
            <div className={home_styles.step2}>Upload your own music</div>
            <div className={home_styles.step3}>
              Pick new genres to influence your music
            </div>
            <div className={home_styles.step4}>
              Download and save music files
            </div>
          </text>
        </div>
      </body>
    );
  }
}
