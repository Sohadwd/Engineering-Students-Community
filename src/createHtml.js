function createHtml(err, topicArr) {
  let markup = "";
  if (err) {
    markup += "Sorry, we're having trouble finding topic right now";
    return markup;
  }
  topicArr.map(topics => {
    markup += `
    <article class="topic">
      <h3 class="topic__title">${topics.title}</h2>
        <p class="topic__method">${topics.body}</p>
        <footer class="topic__footer">
            <h4 class="topics__material">Material: </h4></br>
            <pclass="topic__method"> ${topics.seme_name}</p>
        </footer>
    </article>
    `;
  });
  return markup;
}

module.exports = createHtml;
