const container = document.querySelector('.blog_feed');
const save_button = document.querySelector('.save_button');

const deleteBlog = async (id) => {
  console.log('update Blog Function ' + id);

  const response = await fetch(`/api/blog/${id}`, {
    method: 'DELETE',
    body: JSON.stringify({ id }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    return console.log('nothing to delete');
  }
};

const OpenEditor = async (id) => {
  await fetch(`/api/blog/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ is_editing: true }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

//TODO THIS ISNT WORKING YET. ALSO SAVE ONLY WORKS ON THE TOP ONE>
const handleUpdateSubmit = async (e, target, id) => {
  e.preventDefault();

  const title = document.querySelector('#new_blog_title').value.trim();
  const text = document.querySelector('#new_blog_content').value.trim();

  if (title && text) {
    const response = await fetch(`/api/blog/:${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, text }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      new_post_card.style.display = 'none';
      target.closest('.card').remove();
    } else {
      alert('Failed to create project');
    }
  }
};

save_button.addEventListener('click', () => {
  console.log('save');
});

// Attach event listener for button clicks
container.addEventListener('click', async (event) => {
  const target = event.target;
  const action = target.getAttribute('data-action');
  const blogId = target.getAttribute('data-id');

  if (action === 'delete') {
    await deleteBlog(blogId);
    // After successful deletion, you can remove the corresponding card from the UI
    target.closest('.card').remove();
  } else if (action === 'edit') {
    console.log('editing');
    await OpenEditor(blogId);
  }

  // Handle other button clicks (e.g., comment, edit) similarly
});
