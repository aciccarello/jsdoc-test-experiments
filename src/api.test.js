/** @typedef {import('./api').Post} Post */

/** @type {Partial<Post>} */
const mockPost = {
  id: 123,
  title: "Mock post title",
  image: "./path.jpg",
};

/**
 *
 * @param {Post} postToLog
 */
function logPost(postToLog) {
  console.log(postToLog);
  console.log(postToLog.body);
}

// They type casting syntax is a little long but usable
logPost(/** @type {Post} */ (mockPost));

// Double casting for undefined gets noisy due to the multiple comments and parenthesis
// Don't see any related issue but one comment notes this https://github.com/microsoft/TypeScript/issues/25028#issuecomment-1427025173
logPost(
  /** @type {Post} */ (
    /** @type {unknown} */ ({
      suspicious: "TS wants me to confirm I know what I'm doing",
    })
  )
);

// Wish I could combine the type casting
logPost(/** @type {unknown as Post} */ ({ somethingElse: "Much shorter" }));
