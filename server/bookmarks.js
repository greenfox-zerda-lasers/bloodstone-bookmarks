const bookmarks = function bookmarks(queryFunction) {
  const saveBookmark = (userID, url, title, success) => {
    console.log("Saving bookmark."); // NOTE: Debug.
      queryFunction(`INSERT INTO bookmarks (user_id, url, title) VALUES ('${userID}', '${url}', '${title}') RETURNING (url)`, success);
  };

  const getList = (userID, success) => {
    queryFunction(`SELECT url, title, id FROM users RIGHT JOIN bookmarks ON users.user_id = bookmarks.user_id WHERE users.user_id = '${userID}'`, success)
  };

  const deleteBookmark = (bookmarkID, success) => {
    console.log('Deleting bookmark.'); // NOTE: Debug.
    queryFunction(`SELECT url, title, id FROM bookmarks WHERE id = '${bookmarkID}'`, success)
  };

  return {
    saveBookmark: saveBookmark,
    deleteBookmark: deleteBookmark,
    getList: getList,
  };
};

module.exports = bookmarks;
