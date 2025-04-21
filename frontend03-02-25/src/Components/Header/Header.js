// import React from "react";

// import styles from "./Header.module.css";

// function Header() {
//   return (
//     <div className={styles.container}>
//       <div className={styles.left}>
//         <p className={styles.heading}>
//           A <span>Resume</span> that stands out!
//         </p>
//         <p className={styles.heading}>
//           Make your own resume. <span>It's free</span>
//         </p>
//       </div>
//       <div className={styles.right}>
//         {/* <img src={resumeSvg} alt="Resume" /> */}
//       </div>
//     </div>
//   );
// }

// export default Header;


import React from "react";
import styles from "./Header.module.css";
import resumeSvg from "../../assets/resume.svg"; // ✅ Make sure path is correct

function Header() {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h1 className={styles.heading}>
          A <span>Resume</span> that stands out!
        </h1>
        <h2 className={styles.heading}>
          Make your own resume. <span>It's free</span>
        </h2>
      </div>
      <div className={styles.right}>
        <img src={resumeSvg} alt="Resume" />
      </div>
    </div>
  );
}

export default Header;
