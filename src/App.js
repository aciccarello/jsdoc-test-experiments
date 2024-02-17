import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { getPost } from "./api";

// IntelliJ doesn't let me jump to the Post definition
// Seems like VS Code handles it as expected but drops the description text
// I'd also like to be able to auto-import a "type import" like this for reuse in the page
/** @typedef {import('./api').Post} Post */

// An alternative syntax could work (e.g. https://github.com/microsoft/TypeScript/issues/22160)
// Personally I'd prefer to stick with ES6 semantics than try to reorder for autocomplete
// but auto import is what matters most to me, even if sticking with @typedef
/**
 * @import { Post } from "./api"
 */

// I also tried importing the whole file
/** @typedef {import('./api')} Api */

// But that doesn't seem to work
/** @type {Partial<Api.Post>} */ const usingType = {};

function App() {
  // Generics are kinda awkward. Here I have to pass undefined and cast to type postId
  const [postId, setPostId] = useState(
    /** @type {number | undefined} */ (undefined)
  );
  const [post, setPost] = useState(/** @type {Post | undefined} */ (undefined));

  useEffect(() => {
    if (postId && post?.id !== postId) {
      getPost(postId).then(setPost);
    }
  }, [postId, post]);

  return (
    <div className="App">
      {post ? (
        <article>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
          <p>Written by author ID {post.userId}</p>
          <a
            onClick={() => {
              setPostId(undefined);
              setPost(undefined);
            }}
          >
            Back
          </a>
        </article>
      ) : (
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Pick a post to view</p>
          <ul>
            <li>
              <a onClick={() => setPostId(1)}>First Post</a>
            </li>
            <li>
              <a onClick={() => setPostId(2)}>Second Post</a>
            </li>
            <li>
              <a onClick={() => setPostId(3)}>Third Post</a>
            </li>
          </ul>
        </header>
      )}
    </div>
  );
}

export default App;
