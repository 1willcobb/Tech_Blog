const newPostDashboard = document.querySelector('#new_post_dashboard');

const new_post_card = document.querySelector('#new_post_card');

newPostDashboard.addEventListener('click', () => {
  new_post_card.style.display = 'block';
});

const handleNewBlogSubmit = async (e) => {
  e.preventDefault();

  const title = document.querySelector('#new_blog_title').value.trim();
  const text = document.querySelector('#new_blog_content').value.trim();
  const userDataElement = document.getElementById('user-data');
  var author_id = userDataElement.getAttribute('data-user-id');

  if (title && text) {
    const response = await fetch('/api/blog', {
      method: 'POST',
      body: JSON.stringify({ title, text, author_id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      alert('Missing Fields');
    }

    new_post_card.style.display = 'none';
    window.location.reload();
  }
};

const submitButton = document.querySelector('#submit_new_blog');

submitButton.addEventListener('click', handleNewBlogSubmit);
