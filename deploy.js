const fs = require("fs");
const ghpages = require("gh-pages");

const REPO = "https://github.com/sthobis/sleddit.git";
const BRANCH = "gh-pages";
const BUILD_DIR = "build";

// set .nojekyll files on build folder
// https://github.com/zeit/next.js/wiki/Deploying-a-Next.js-app-into-GitHub-Pages
console.log("\nStarting deployment to github pages...");
fs.writeFile(`./${BUILD_DIR}/.nojekyll`, "", function(err) {
  if (err) {
    console.log(`Failed to create '.nojekyll' on ${BUILD_DIR}`);
    console.error(err);
    return;
  }
  console.log(`Created '.nojekyll' on ${BUILD_DIR}`);

  // deploy to github
  console.log("\nPublishing...");
  ghpages.publish(
    BUILD_DIR,
    {
      repo: REPO,
      branch: BRANCH,
      dotfiles: true
    },
    function(err) {
      if (err) {
        console.log("Publish failed.");
        console.error(err);
        return;
      }
      console.log(
        `Published '${BUILD_DIR}' directory to 'origin/${BRANCH}' branch.`
      );
    }
  );
});
