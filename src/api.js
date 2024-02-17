/**
 * @typedef Post General description of the interface.
 *
 * It can span multiple lines if needed.
 *
 * @property {number} id
 * @property title {string} Article title
 * @property {string} body - Markdown formatted string
 * @property {string} [image] Optional URL for a featured image
 * @property {object} user
 * @property {number} user.id
 * @property {string} user.name
 */

/** @type {Partial<Post>} */
const seeCommentParsing = {
  title: "Interface documentation hints", // Even though syntax highlight is off, this description still shows
  body: "Text", // VS Code shows the - as a bullet (because it parses comments as markdown)
  image: "/filename.jpg",
};
// IntelliJ doesn't rename types from JSDocs

/**
 *
 * @param postId {number}
 * @return {Promise<Post>}
 */
export function getPost(postId) {
  // I can type fetchJson as a generic but can't pass the generic type since it's not an input
  // We can easily use the Post type here but for a library's complex type, passing the type would be helpful
  // See https://github.com/microsoft/TypeScript/issues/27387 for related issue
  return fetchJson(`posts/${postId}`);
}

/**
 * @template T
 * @param path {string}
 * @return {Promise<T>}
 */
async function fetchJson(path) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/${path}`);

  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Failed request");
  }
}

/**
 * @template T
 * @param url {string}
 * @return {Promise<T>}
 */
export function getData(url) {
  return fetch(url).then((res) => res.json());
}

const data = await getData("/path");
// data is typed as any

// Hide no-unused warnings
console.log(seeCommentParsing, data);
