const container = document.querySelector('.blog_feed');

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
  const response = await fetch(`/api/blog/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ is_editing: true }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// Attach event listener for button clicks
container.addEventListener('click', async (event) => {
  const target = event.target;
  const action = target.getAttribute('data-action');

  if (action === 'delete') {
    const blogId = target.getAttribute('data-id');
    await deleteBlog(blogId);
    // After successful deletion, you can remove the corresponding card from the UI
    target.closest('.card').remove();
  } else if (action === 'edit') {
    await OpenEditor(id);
  }

  // Handle other button clicks (e.g., comment, edit) similarly
});
